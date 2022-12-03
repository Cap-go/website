import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { updateOrCreateChannel, useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, fetchLimit, findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { definitions } from '../../types/supabase'

interface ChannelSet {
  app_id?: string
  channel: string
  version?: string
  public?: boolean
}
interface GetDevice {
  app_id?: string
  channel?: string
  page?: number
}

export const get = async (event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey) {
    console.error('Cannot Verify User')
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = event.queryStringParameters as any as GetDevice
  if (!body.app_id || !(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
    console.error('You can\'t access this app', body.app_id)
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)
  }
  // get one channel or all channels
  if (body.channel) {
    const { data: dataChannel, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select(`
          id,
          created_at,
          name,
          app_id,
          created_by,
          updated_at,
          public,
          disableAutoUpdateUnderNative,
          disableAutoUpdateToMajor,
          is_emulator,
          is_prod,
          version (
            name,
            id
          )
      `)
      .eq('app_id', body.app_id || '')
      .eq('name', body.channel)
    if (dbError || !dataChannel || !dataChannel.length) {
      console.error('Cannot find channel')
      return sendRes({ status: 'Cannot find channel', error: dbError }, 400)
    }
    return sendRes(dataChannel[0])
  }
  else {
    const fetchOffset = body.page === undefined ? 0 : body.page
    const from = fetchOffset * fetchLimit
    const to = (fetchOffset + 1) * fetchLimit - 1
    const { data: dataChannels, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select(`
          id,
          created_at,
          name,
          app_id,
          created_by,
          updated_at,
          public,
          disableAutoUpdateUnderNative,
          disableAutoUpdateToMajor,
          allow_emulator,
          allow_dev,
          version (
            name,
            id
          )
      `)
      .eq('app_id', body.app_id || '')
      .range(from, to)
      .order('created_at', { ascending: true })

    if (dbError || !dataChannels || !dataChannels.length)
      return sendRes([])
    return sendRes(dataChannels)
  }
}

export const deleteChannel = async (event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body) {
    console.error('Cannot Verify User')
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = JSON.parse(event.body || '{}') as ChannelSet

  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
    console.error('You can\'t access this app', body.app_id)
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)
  }
  try {
    const { error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .delete()
      .eq('app_id', body.app_id || '')
      .eq('name', body.channel)
    if (dbError) {
      console.error('Cannot delete channel')
      return sendRes({ status: 'Cannot delete channel', error: JSON.stringify(dbError) }, 400)
    }
  }
  catch (e) {
    console.error('Cannot delete channel', e)
    return sendRes({ status: 'Cannot delete channels', error: e }, 500)
  }
  return sendRes()
}

export const post = async (event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body) {
    console.error('Cannot Verify User')
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = JSON.parse(event.body || '{}') as ChannelSet

  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
    console.error('You can\'t access this app', body.app_id)
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)
  }
  const channel: Partial<definitions['channels']> = {
    created_by: apikey.user_id,
    app_id: body.app_id,
    name: body.channel,
  }
  if (body.version) {
    const { data, error: vError } = await supabase
      .from<definitions['app_versions']>('app_versions')
      .select()
      .eq('app_id', body.app_id)
      .eq('name', body.version)
      .eq('user_id', apikey.user_id)
      .eq('deleted', false)
      .single()
    if (vError || !data) {
      console.error(`Cannot find version ${body.version}`)
      return sendRes({ status: `Cannot find version ${body.version}`, error: JSON.stringify(vError) }, 400)
    }
    channel.version = data.id
  }
  if (body.public !== undefined)
    channel.public = body.public

  try {
    const { error: dbError } = await updateOrCreateChannel(supabase, channel)
    if (dbError) {
      console.error('Cannot create channel')
      return sendRes({ status: 'Cannot create channel', error: JSON.stringify(dbError) }, 400)
    }
  }
  catch (e) {
    console.error('Cannot create channel', e)
    return sendRes({ status: 'Cannot set channels', error: e }, 500)
  }
  return sendRes()
}

export const handler: Handler = async (event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))

  if (event.httpMethod === 'POST')
    return post(event, supabase)
  else if (event.httpMethod === 'GET')
    return get(event, supabase)
  else if (event.httpMethod === 'DELETE')
    return deleteChannel(event, supabase)
  console.error('Method not allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}
