import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { definitions } from '~/types/supabase'

interface DeviceLink {
  app_id: string
  device_id: string
  version_id?: string
  channel?: string
}
interface GetDevice {
  app_id: string
  device_id?: string
}

const get = async(event: any, supabase: SupabaseClient): Promise<any> => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['read', 'all'])
  if (!apikey)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = event.queryStringParameters as any as GetDevice
  if (!body.app_id || !(await checkAppOwner(apikey.user_id, body.app_id, supabase)))
    return sendRes({ status: 'You can\'t access this app' }, 400)
  // if device_id get one device
  if (body.device_id) {
    const { data: dataDevice, error: dbError } = await supabase
      .from<definitions['devices']>('devices')
      .select()
      .eq('app_id', body.app_id)
      .eq('device_id', body.device_id)
      .single()
    if (dbError || !dataDevice)
      return sendRes({ status: 'Cannot find device', error: dbError }, 400)
    return sendRes(dataDevice)
  }
  else {
    // get all devices
    const { data: dataDevices, error: dbError } = await supabase
      .from<definitions['devices']>('devices')
      .select()
      .eq('app_id', body.app_id)
    if (dbError || !dataDevices || !dataDevices.length)
      return sendRes([])
    return sendRes(dataDevices)
  }
}

const post = async(event: any, supabase: SupabaseClient): Promise<any> => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = JSON.parse(event.body || '{}') as DeviceLink
  if (!body.device_id || !body.app_id)
    return sendRes({ status: 'Cannot find device' }, 400)
  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase)))
    return sendRes({ status: 'You can\'t access this app' }, 400)
  // find device
  const { data: dataDevice, error: dbError } = await supabase
    .from<definitions['devices']>('devices')
    .select()
    .eq('app_id', body.app_id)
    .eq('device_id', body.device_id)
    .single()
  if (dbError || !dataDevice)
    return sendRes({ status: 'Cannot find device', error: dbError }, 400)
  // if version_id set device_override to it
  if (body.version_id) {
    const { data: dataVersion, error: dbError } = await supabase
      .from<definitions['app_versions']>('app_versions')
      .select()
      .eq('app_id', body.app_id)
      .eq('name', body.version_id)
      .single()
    if (dbError || !dataVersion)
      return sendRes({ status: 'Cannot find version', error: dbError }, 400)
    supabase
      .from<definitions['devices_override']>('devices_override')
      .upsert({
        device_id: body.device_id,
        version: dataVersion.id,
        app_id: body.app_id,
      })
  }
  else {
    // delete device_override
    supabase
      .from<definitions['devices_override']>('devices_override')
      .delete()
      .eq('device_id', body.device_id)
      .eq('app_id', body.app_id)
  }
  // if channel_id set channel_override to it
  if (body.channel) {
    // get channel by name
    const { data: dataChannel, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select()
      .eq('app_id', body.app_id)
      .eq('name', body.channel)
      .single()
    if (dbError || !dataChannel)
      return sendRes({ status: 'Cannot find channel', error: dbError }, 400)
    supabase
      .from<definitions['channel_devices']>('channel_devices')
      .upsert({
        device_id: body.device_id,
        channel_id: dataChannel.id,
        app_id: body.app_id,
      })
  }
  else {
    // delete channel_override
    supabase
      .from<definitions['channel_devices']>('channel_devices')
      .delete()
      .eq('device_id', body.device_id)
      .eq('app_id', body.app_id)
  }
  return sendRes()
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod, 'headers', event.headers)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
  if (event.httpMethod === 'POST')
    return post(event, supabase)
  else if (event.httpMethod === 'GET')
    return get(event, supabase)
  return sendRes({ status: 'Method now allowed' }, 400)
}
