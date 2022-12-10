import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import semver from 'semver'
import type { Database } from '../../types/supabase.types'
import { sendStats, updateOrCreateDevice, useSupabase } from '../services/supabase'
import type { AppInfos } from '../services/utils'
import { findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'

interface DeviceLink extends AppInfos {
  channel?: string
}

const post = async (event: any, supabase: SupabaseClient<Database>): Promise<any> => {
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
  if (coerce) {
    version_build = coerce.version
  }
  else {
    return sendRes({
      message: `Native version: ${version_build} doesn't follow semver convention, please follow https://semver.org to allow Capgo compare version number`,
      error: 'semver_error',
    }, 400)
  }
  version_name = (version_name === 'builtin' || !version_name) ? version_build : version_name

  if (!device_id || !app_id) {
    return sendRes({
      message: 'Cannot find device_id or appi_id',
      error: 'missing_info',
    }, 400)
  }
  // find device
  const { data: dataDevice } = await supabase
    .from('devices')
    .select()
    .eq('app_id', app_id)
    .eq('device_id', device_id)
    .single()
  const { data: dataChannelOverride } = await supabase
    .from('channel_devices')
    .select(`
    device_id,
    app_id,
    channel_id (
      id,
      allow_device_self_set,
      name
    )
  `)
    .eq('app_id', app_id)
    .eq('device_id', device_id)
    .single()
  if (!dataDevice) {
    const { data: version } = await supabase
      .from('app_versions')
      .select()
      .eq('app_id', app_id)
      .eq('name', version_name || 'unknown')
      .single()

    if (!version) {
      return sendRes({
        message: `Version ${version_name} doesn't exist`,
        error: 'version_error',
      }, 400)
    }
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
      platform: platform as Database['public']['Enums']['platform_os'],
      updated_at: new Date().toISOString(),
    })
  }
  if (!channel || (dataChannelOverride
    && !(dataChannelOverride?.channel_id as Database['public']['Tables']['channels']['Row']).allow_device_self_set)) {
    return sendRes({
      message: 'Cannot change device override current channel don\t allow it',
      error: 'cannot_override',
    }, 400)
  }
  // if channel set channel_override to it
  if (channel) {
    // get channel by name
    const { data: dataChannel, error: dbError } = await supabase
      .from('channels')
      .select()
      .eq('app_id', app_id)
      .eq('name', channel)
      .eq('allow_device_self_set', true)
      .single()
    if (dbError || !dataChannel)
      return sendRes({ message: `Cannot find channel ${JSON.stringify(dbError)}`, error: 'channel_not_found' }, 400)

    const { error: dbErrorDev } = await supabase
      .from('channel_devices')
      .upsert({
        device_id,
        channel_id: dataChannel.id,
        app_id,
        created_by: dataChannel.created_by,
      })
    if (dbErrorDev)
      return sendRes({ message: `Cannot do channel override ${JSON.stringify(dbErrorDev)}`, error: 'override_not_allowed' }, 400)
  }
  const { data: dataVersion, error: errorVersion } = await supabase
    .from('app_versions')
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

const put = async (event: any, supabase: SupabaseClient<Database>): Promise<any> => {
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
  if (coerce) {
    version_build = coerce.version
  }
  else {
    return sendRes({
      message: `Native version: ${version_build} doesn't follow semver convention, please follow https://semver.org to allow Capgo compare version number`,
      error: 'semver_error',
    }, 400)
  }
  version_name = (version_name === 'builtin' || !version_name) ? version_build : version_name
  if (!device_id || !app_id)
    return sendRes({ message: 'Cannot find device_id or appi_id', error: 'missing_info' }, 400)

  const { data: dataChannel, error: errorChannel } = await supabase
    .from('channels')
    .select()
    .eq('app_id', app_id)
    .eq('public', true)
    .single()
  const { data: dataChannelOverride } = await supabase
    .from('channel_devices')
    .select(`
      app_id,
      device_id,
      channel_id (
        id,
        allow_device_self_set,
        name
      )
    `)
    .eq('app_id', app_id)
    .eq('device_id', device_id)
    .single()
  if (dataChannelOverride && dataChannelOverride.channel_id) {
    const channelId = dataChannelOverride.channel_id as Database['public']['Tables']['channels']['Row']
    return sendRes({
      channel: channelId.name,
      status: 'override',
      allowSet: channelId.allow_device_self_set,
    })
  }
  if (errorChannel) {
    return sendRes({
      message: `Cannot find channel ${JSON.stringify(errorChannel)}`,
      error: 'channel_not_found',
    }, 400)
  }
  else if (dataChannel) {
    const { data: dataVersion, error: errorVersion } = await supabase
      .from('app_versions')
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
    message: 'Cannot find channel',
    error: 'channel_not_found',
  }, 400)
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
    else if (event.httpMethod === 'PUT')
      return put(event, supabase)
  }
  catch (e) {
    return sendRes({ message: `Error ${JSON.stringify(e)}`, error: 'general_error' }, 400)
  }
  return sendRes({ message: 'Method now allowed', error: 'not_allowed' }, 400)
}

