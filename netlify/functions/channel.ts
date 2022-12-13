import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase.types'
import { updateOrCreateChannel, useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, fetchLimit, findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'

interface ChannelSet {
  app_id?: string
  channel: string
  version?: string
  public?: boolean
  disableAutoUpdateUnderNative?: boolean
  disableAutoUpdateToMajor?: boolean
  ios?: boolean
  android?: boolean
  allow_device_self_set?: boolean
  allow_emulator?: boolean
  allow_dev?: boolean
}
interface GetDevice {
  app_id?: string
  channel?: string
  page?: number
}

export const get = async (event: any, supabase: SupabaseClient<Database>) => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = event.queryStringParameters as any as GetDevice
  if (!body.app_id || !(await checkAppOwner(apikey.user_id, body.app_id, supabase)))
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)

  // get one channel or all channels
  if (body.channel) {
    const { data: dataChannel, error: dbError } = await supabase
      .from('channels')
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
      .single()
    if (dbError || !dataChannel)
      return sendRes({ status: 'Cannot find channel', error: JSON.stringify(dbError) }, 400)

    return sendRes(dataChannel)
  }
  else {
    const fetchOffset = body.page == null ? 0 : body.page
    const from = fetchOffset * fetchLimit
    const to = (fetchOffset + 1) * fetchLimit - 1
    const { data: dataChannels, error: dbError } = await supabase
      .from('channels')
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

export const deleteChannel = async (event: any, supabase: SupabaseClient<Database>) => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = JSON.parse(event.body || '{}') as ChannelSet

  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase)))
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)

  try {
    const { error: dbError } = await supabase
      .from('channels')
      .delete()
      .eq('app_id', body.app_id || '')
      .eq('name', body.channel)
    if (dbError)
      return sendRes({ status: 'Cannot delete channel', error: JSON.stringify(dbError) }, 400)
  }
  catch (e) {
    return sendRes({ status: 'Cannot delete channels', error: JSON.stringify(e) }, 500)
  }
  return sendRes()
}

export const post = async (event: any, supabase: SupabaseClient<Database>) => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = JSON.parse(event.body || '{}') as ChannelSet

  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase)))
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)

  const channel: Database['public']['Tables']['channels']['Insert'] = {
    created_by: apikey.user_id,
    app_id: body.app_id || '',
    name: body.channel,
    version: -1,
    ...(body.public == null ? {} : { public: body.public }),
    ...(body.disableAutoUpdateUnderNative == null ? {} : { disableAutoUpdateUnderNative: body.disableAutoUpdateUnderNative }),
    ...(body.disableAutoUpdateToMajor == null ? {} : { disableAutoUpdateToMajor: body.disableAutoUpdateToMajor }),
    ...(body.allow_device_self_set == null ? {} : { allow_device_self_set: body.allow_device_self_set }),
    ...(body.allow_emulator == null ? {} : { allow_emulator: body.allow_emulator }),
    ...(body.allow_dev == null ? {} : { allow_dev: body.allow_dev }),
    ...(body.ios == null ? {} : { ios: body.ios }),
    ...(body.android == null ? {} : { android: body.android }),
  }
  if (body.version) {
    const { data, error: vError } = await supabase
      .from('app_versions')
      .select()
      .eq('app_id', body.app_id)
      .eq('name', body.version)
      .eq('user_id', apikey.user_id)
      .eq('deleted', false)
      .single()
    if (vError || !data)
      return sendRes({ status: `Cannot find version ${body.version}`, error: JSON.stringify(vError) }, 400)

    channel.version = data.id
  }

  try {
    const { error: dbError } = await updateOrCreateChannel(supabase, channel)
    if (dbError)
      return sendRes({ status: 'Cannot create channel', error: JSON.stringify(dbError) }, 400)
  }
  catch (e) {
    return sendRes({ status: 'Cannot set channels', error: JSON.stringify(e) }, 500)
  }
  return sendRes()
}

export const handler: Handler = async (event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
  try {
    if (event.httpMethod === 'POST')
      return post(event, supabase)
    else if (event.httpMethod === 'GET')
      return get(event, supabase)
    else if (event.httpMethod === 'DELETE')
      return deleteChannel(event, supabase)
  }
  catch (e) {
    return sendRes({ status: 'Error', error: JSON.stringify(e) }, 500)
  }
  return sendRes({ status: 'Method now allowed' }, 400)
}
