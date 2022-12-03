import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useSupabase } from '../services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { definitions } from '../../types/supabase'

interface DeviceLink {
  app_id: string
  device_id: string
  channel?: string
}

interface DeviceChannel {
  channel_id: definitions['channels']
}

const post = async (event: any, supabase: SupabaseClient): Promise<any> => {
  const body = JSON.parse(event.body || '{}') as DeviceLink
  if (!body.device_id || !body.app_id) {
    console.error('Cannot find device_id or appi_id')
    return sendRes({ status: 'Cannot find device_id or appi_id' }, 400)
  }
  // find device
  const { data: dataDevice, error: dbError } = await supabase
    .from<definitions['devices']>('devices')
    .select()
    .eq('app_id', body.app_id)
    .eq('device_id', body.device_id)
    .single()
  const { data: dataChannelOverride } = await supabase
    .from<definitions['channel_devices'] & DeviceChannel>('channel_devices')
    .select(`
      channel_id (
        allow_device_self_set,
        name
      ),
    `)
    .eq('app_id', body.app_id)
    .eq('device_id', body.device_id)
    .single()
  if (dbError || !dataDevice) {
    console.error('Cannot find device', body, dbError)
    return sendRes({ status: 'Cannot find device', error: dbError, payload: body }, 400)
  }
  if (!body.channel || (dataChannelOverride && !dataChannelOverride?.channel_id.allow_device_self_set))
    return sendRes({ status: 'Nothing to update' }, 400)
  // if channel set channel_override to it
  if (body.channel) {
    // get channel by name
    const { data: dataChannel, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select()
      .eq('app_id', body.app_id)
      .eq('name', body.channel)
      .eq('allow_device_self_set', true)
      .single()
    if (dbError || !dataChannel) {
      console.error('Cannot find channel', dbError)
      return sendRes({ status: 'Cannot find channel', error: dbError }, 400)
    }
    const { data: dataChannelDev, error: dbErrorDev } = await supabase
      .from<definitions['channel_devices']>('channel_devices')
      .upsert({
        device_id: body.device_id,
        channel_id: dataChannel.id,
        app_id: body.app_id,
        created_by: dataChannel.created_by,
      })
    if (dbErrorDev || !dataChannelDev) {
      console.error('Cannot do channel override', dbErrorDev)
      return sendRes({ status: 'Cannot do channel override', error: dbErrorDev }, 400)
    }
  }
  return sendRes()
}

const put = async (event: any, supabase: SupabaseClient): Promise<any> => {
  const body = JSON.parse(event.body || '{}') as DeviceLink
  if (!body.device_id || !body.app_id) {
    console.error('Cannot find device or appi_id')
    return sendRes({ status: 'Cannot find device_id or appi_id' }, 400)
  }
  const { data: dataChannel, error: errorChannel } = await supabase
    .from<definitions['channels'] & DeviceChannel>('channels')
    .select()
    .eq('app_id', body.app_id)
    .eq('public', true)
    .single()
  const { data: dataChannelOverride, error } = await supabase
    .from<definitions['channel_devices'] & DeviceChannel>('channel_devices')
    .select(`
      channel_id (
        allow_device_self_set,
        name
      ),
    `)
    .eq('app_id', body.app_id)
    .eq('device_id', body.device_id)
    .single()
  if (error) {
    return sendRes({
      error,
    }, 400)
  }
  else if (dataChannelOverride && dataChannelOverride.channel_id) {
    return sendRes({
      channel: dataChannelOverride.channel_id.name,
      status: 'override',
      allowSet: dataChannelOverride.channel_id.allow_device_self_set,
    })
  }
  if (errorChannel) {
    return sendRes({
      error,
    }, 400)
  }
  else if (dataChannel) {
    return sendRes({
      channel: dataChannel.name,
      status: 'default',
    })
  }
  return sendRes({
    error: 'no channel',
  }, 400)
}

export const handler: Handler = async (event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))

  if (event.httpMethod === 'POST')
    return post(event, supabase)
  else if (event.httpMethod === 'PUT')
    return put(event, supabase)
  console.error('Method now allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}

