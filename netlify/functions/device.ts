import type { Handler } from '@netlify/functions'
import { useSupabase } from '../services/supabase'
import { checkKey, sendRes } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface DeviceLink {
  app_id: string
  device_id: string
  version_id?: string
  channel_id?: string
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase()
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = JSON.parse(event.body || '{}') as DeviceLink
  if (!body.device_id || !body.app_id)
    return sendRes({ status: 'Cannot find device' }, 400)
  // find device
  const { data: dataDevice, error: dbError } = await supabase
    .from<definitions['devices']>('devices')
    .select()
    .eq('app_id', body.app_id)
    .eq('device_id', body.device_id)
  if (dbError || !dataDevice || !dataDevice.length)
    return sendRes({ status: 'Cannot find device', error: dbError }, 400)
  // if version_id set device_override to it
  if (body.version_id) {
    supabase
      .from<definitions['devices_override']>('devices_override')
      .upsert({
        device_id: body.device_id,
        version: body.version_id,
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
  if (body.channel_id) {
    supabase
      .from<definitions['channel_devices']>('channel_devices')
      .upsert({
        device_id: body.device_id,
        channel: body.channel_id,
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
