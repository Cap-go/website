import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import semver from 'semver'
import { sendStats, updateOrCreateDevice, useSupabase } from '../services/supabase'
import type { AppInfos } from '../services/utils'
import { findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { definitions } from '../../types/supabase'

interface DeviceLink extends AppInfos {
  channel?: string
}

interface DeviceChannel {
  channel_id: definitions['channels']
}

const post = async (event: any, supabase: SupabaseClient): Promise<any> => {
  const body = JSON.parse(event.body || '{}') as DeviceLink
  let {
    version_name,
    version_build,
  } = body
  const {
    platform,
    app_id,
    version_os,
    channel,
    device_id,
    plugin_version,
    custom_id,
    is_emulator = false,
    is_prod = true,
  } = body
  const coerce = semver.coerce(version_build)
  if (coerce)
    version_build = coerce.version
  else
    return sendRes({ message: `Native version: ${version_build} doesn't follow semver convention, please follow https://semver.org to allow Capgo compare version number` }, 400)
  version_name = (version_name === 'builtin' || !version_name) ? version_build : version_name

  if (!device_id || !app_id) {
    console.error('Cannot find device_id or appi_id')
    return sendRes({ status: 'Cannot find device_id or appi_id' }, 400)
  }
  // find device
  const { data: dataDevice } = await supabase
    .from<definitions['devices']>('devices')
    .select()
    .eq('app_id', app_id)
    .eq('device_id', device_id)
    .single()
  const { data: dataChannelOverride } = await supabase
    .from<definitions['channel_devices'] & DeviceChannel>('channel_devices')
    .select(`
      app_id,
      device_id,
      channel_id (
        allow_device_self_set,
        name
      ),
    `)
    .eq('app_id', app_id)
    .eq('device_id', device_id)
    .single()
  if (!dataDevice) {
    const { data: version } = await supabase
      .from<definitions['app_versions']>('app_versions')
      .select()
      .eq('app_id', app_id)
      .eq('name', version_name || 'unknown')
      .single()

    if (!version) {
      return sendRes({
        message: `Version ${version_name} doesn't exist`,
      }, 400)
    }
    // console.error('Cannot find device', body, dbError)
    // return sendRes({ status: 'Cannot find device', error: dbError, payload: body }, 400)
    await updateOrCreateDevice(supabase, {
      app_id,
      device_id,
      plugin_version,
      version: version.id,
      ...(custom_id ? { custom_id } : {}),
      ...(is_emulator !== undefined ? { is_emulator } : {}),
      ...(is_prod !== undefined ? { is_prod } : {}),
      version_build,
      os_version: version_os,
      platform: platform as definitions['devices']['platform'],
      updated_at: new Date().toISOString(),
    })
  }
  if (!channel || (dataChannelOverride && !dataChannelOverride?.channel_id.allow_device_self_set))
    return sendRes({ status: 'Cannot change device override current channel don\t allow it' }, 400)
  // if channel set channel_override to it
  if (channel) {
    // get channel by name
    const { data: dataChannel, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select()
      .eq('app_id', app_id)
      .eq('name', channel)
      .eq('allow_device_self_set', true)
      .single()
    if (dbError || !dataChannel) {
      console.error('Cannot find channel', dbError)
      return sendRes({ status: 'Cannot find channel', error: dbError }, 400)
    }
    const { data: dataChannelDev, error: dbErrorDev } = await supabase
      .from<definitions['channel_devices']>('channel_devices')
      .upsert({
        device_id,
        channel_id: dataChannel.id,
        app_id,
        created_by: dataChannel.created_by,
      })
    if (dbErrorDev || !dataChannelDev) {
      console.error('Cannot do channel override', dbErrorDev)
      return sendRes({ status: 'Cannot do channel override', error: dbErrorDev }, 400)
    }
  }
  const { data: dataVersion, error: errorVersion } = await supabase
    .from<definitions['app_versions']>('app_versions')
    .select()
    .eq('app_id', app_id)
    .eq('name', version_name || 'unknown')
    .single()
  if (dataVersion && !errorVersion) {
    await sendStats(supabase, 'setChannel', platform, device_id, app_id, version_build, dataVersion.id)
  }
  else {
    // eslint-disable-next-line no-console
    console.log('Cannot find app version', errorVersion)
  }
  return sendRes()
}

const put = async (event: any, supabase: SupabaseClient): Promise<any> => {
  const body = JSON.parse(event.body || '{}') as DeviceLink
  let {
    version_name,
    version_build,
  } = body
  const {
    app_id,
    platform,
    device_id,
  } = body
  const coerce = semver.coerce(version_build)
  if (coerce)
    version_build = coerce.version
  else
    return sendRes({ message: `Native version: ${version_build} doesn't follow semver convention, please follow https://semver.org to allow Capgo compare version number` }, 400)
  version_name = (version_name === 'builtin' || !version_name) ? version_build : version_name
  if (!device_id || !app_id) {
    console.error('Cannot find device or appi_id')
    return sendRes({ status: 'Cannot find device_id or appi_id' }, 400)
  }
  const { data: dataChannel, error: errorChannel } = await supabase
    .from<definitions['channels'] & DeviceChannel>('channels')
    .select()
    .eq('app_id', app_id)
    .eq('public', true)
    .single()
  const { data: dataChannelOverride } = await supabase
    .from<definitions['channel_devices'] & DeviceChannel>('channel_devices')
    .select(`
      app_id,
      device_id,
      channel_id (
        allow_device_self_set,
        name
      ),
    `)
    .eq('app_id', app_id)
    .eq('device_id', device_id)
    .single()
  if (dataChannelOverride && dataChannelOverride.channel_id) {
    return sendRes({
      channel: dataChannelOverride.channel_id.name,
      status: 'override',
      allowSet: dataChannelOverride.channel_id.allow_device_self_set,
    })
  }
  if (errorChannel) {
    return sendRes({
      message: 'Cannot find channel',
      error: errorChannel,
    }, 400)
  }
  else if (dataChannel) {
    const { data: dataVersion, error: errorVersion } = await supabase
      .from<definitions['app_versions']>('app_versions')
      .select()
      .eq('app_id', app_id)
      .eq('name', version_name || 'unknown')
      .single()

    if (dataVersion && !errorVersion) {
      await sendStats(supabase, 'getChannel', platform, device_id, app_id, version_build, dataVersion.id)
    }
    else {
      // eslint-disable-next-line no-console
      console.log('Cannot find app version', errorVersion)
    }
    return sendRes({
      channel: dataChannel.name,
      status: 'default',
    })
  }
  return sendRes({
    message: 'no channel',
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

