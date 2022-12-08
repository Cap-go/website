import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, fetchLimit, findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { Database } from '../../types/supabase.types'

interface DeviceLink {
  app_id: string
  device_id: string
  version_id?: string
  channel?: string
}

interface GetDevice {
  app_id: string
  device_id?: string
  page?: number
}

const get = async (event: any, supabase: SupabaseClient<Database>): Promise<any> => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['read', 'all'])
  if (!apikey) {
    console.error('Cannot Verify User')
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = event.queryStringParameters as any as GetDevice
  if (!body.app_id || !(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
    console.error('You can\'t access this app', body.app_id)
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)
  }
  // if device_id get one device
  if (body.device_id) {
    const { data: dataDevice, error: dbError } = await supabase
      .from('devices')
      .select(`
          created_at,
          updated_at,
          device_id,
          version (
            name,
            id
          ),
          app_id,
          platform,
          plugin_version,
          os_version,
          version_build,
          is_emulator,
          is_prod
      `)
      .eq('app_id', body.app_id)
      .eq('device_id', body.device_id)
      .single()
    if (dbError || !dataDevice) {
      console.error('Cannot find device')
      return sendRes({ status: 'Cannot find device', error: dbError }, 400)
    }
    return sendRes(dataDevice)
  }
  else {
    // get all devices
    const fetchOffset = body.page === undefined ? 0 : body.page
    const from = fetchOffset * fetchLimit
    const to = (fetchOffset + 1) * fetchLimit - 1
    //  page 0 from = 0 to = 49 [0,1,...,49]
    //  page 1 from = 50 to = 99 [50,51,...,99]
    //  page 2 from = 100 to = 149 [100,101,...,149]
    const { data: dataDevices, error: dbError } = await supabase
      .from('devices')
      .select(`
          created_at,
          updated_at,
          device_id,
          version (
            name,
            id
          ),
          app_id,
          platform,
          plugin_version,
          os_version,
          version_build,
          is_emulator,
          is_prod
      `)
      .eq('app_id', body.app_id)
      .range(from, to)
      .order('created_at', { ascending: true })
    if (dbError || !dataDevices || !dataDevices.length)
      return sendRes([])
    return sendRes(dataDevices)
  }
}

const post = async (event: any, supabase: SupabaseClient<Database>): Promise<any> => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body) {
    console.error('Cannot Verify User', event.headers.authorization)
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = JSON.parse(event.body || '{}') as DeviceLink
  if (!body.device_id || !body.app_id) {
    console.error('Cannot find device')
    return sendRes({ status: 'Cannot find device' }, 400)
  }
  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
    console.error('You can\'t access this app', body.app_id)
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)
  }
  // find device
  const { data: dataDevice, error: dbError } = await supabase
    .from('devices')
    .select()
    .eq('app_id', body.app_id)
    .eq('device_id', body.device_id)
    .single()
  if (dbError || !dataDevice) {
    console.error('Cannot find device', dbError)
    return sendRes({ status: 'Cannot find device', error: dbError }, 400)
  }
  // if version_id set device_override to it
  if (body.version_id) {
    const { data: dataVersion, error: dbError } = await supabase
      .from('app_versions')
      .select()
      .eq('app_id', body.app_id)
      .eq('name', body.version_id)
      .single()
    if (dbError || !dataVersion) {
      console.error('Cannot find version', dbError)
      return sendRes({ status: 'Cannot find version', error: dbError }, 400)
    }
    const { error: dbErrorDev } = await supabase
      .from('devices_override')
      .upsert({
        device_id: body.device_id,
        version: dataVersion.id,
        app_id: body.app_id,
        created_by: apikey.user_id,
      })
    if (dbErrorDev) {
      console.error('Cannot save device override', dbErrorDev)
      return sendRes({ status: 'Cannot save device override', error: dbErrorDev }, 400)
    }
  }
  // if channel_id set channel_override to it
  if (body.channel) {
    // get channel by name
    const { data: dataChannel, error: dbError } = await supabase
      .from('channels')
      .select()
      .eq('app_id', body.app_id)
      .eq('name', body.channel)
      .single()
    if (dbError || !dataChannel) {
      console.error('Cannot find channel', dbError)
      return sendRes({ status: 'Cannot find channel', error: dbError }, 400)
    }
    const { error: dbErrorDev } = await supabase
      .from('channel_devices')
      .upsert({
        device_id: body.device_id,
        channel_id: dataChannel.id,
        app_id: body.app_id,
        created_by: apikey.user_id,
      })
    if (dbErrorDev) {
      console.error('Cannot find channel override', dbErrorDev)
      return sendRes({ status: 'Cannot save channel override', error: dbErrorDev }, 400)
    }
  }
  else {
    // delete channel_override
    await supabase
      .from('channel_devices')
      .delete()
      .eq('device_id', body.device_id)
      .eq('app_id', body.app_id)
  }
  return sendRes()
}

export const deleteDev = async (event: any, supabase: SupabaseClient<Database>) => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body) {
    console.error('Cannot Verify User', event.headers.authorization)
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = JSON.parse(event.body || '{}') as DeviceLink
  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
    console.error('You can\'t access this app', body.app_id)
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)
  }
  try {
    const { error } = await supabase
      .from('devices_override')
      .delete()
      .eq('app_id', body.app_id)
      .eq('device_id', body.device_id)
    if (error) {
      console.error('Cannot delete override')
      return sendRes({ status: 'Cannot delete override', error: JSON.stringify(error) }, 400)
    }
    const { error: errorChannel } = await supabase
      .from('channel_devices')
      .delete()
      .eq('app_id', body.app_id)
      .eq('device_id', body.device_id)
    if (errorChannel) {
      console.error('Cannot delete override')
      return sendRes({ status: 'Cannot delete override', error: JSON.stringify(error) }, 400)
    }
  }
  catch (e) {
    console.error('Cannot delete override', e)
    return sendRes({ status: 'delete override', error: e }, 500)
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
      return deleteDev(event, supabase)
  }
  catch (e) {
    console.error('Error', JSON.stringify(e))
    return sendRes({ status: 'Error', error: JSON.stringify(e) }, 500)
  }
  console.error('Method now allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}
