import type { Handler } from '@netlify/functions'
import semver from 'semver'
import type { SupabaseClient } from '@supabase/supabase-js'
import { checkPlan, isAllowedAction, sendStats, updateOrCreateDevice, useSupabase } from '../services/supabase'
import { invalidIp } from '../services/invalids_ip'
import type { AppInfos } from '../services/utils'
import { findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { Database } from '../../types/supabase.types'

export const post = async (id: string, event: any, supabase: SupabaseClient<Database>) => {
  const body = JSON.parse(event.body || '{}') as AppInfos

  let {
    version_name,
    version_build,
  } = body
  const {
    platform,
    app_id,
    version_os,
    device_id,
    plugin_version = '2.3.3',
    custom_id,
    is_emulator = false,
    is_prod = true,
  } = body
  // if version_build is not semver, then make it semver
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
  try {
    if (!app_id || !device_id || !version_build || !version_name || !platform) {
      return sendRes({
        message: 'Cannot find device_id or appi_id',
        error: 'missing_info',
      }, 400)
    }
    // eslint-disable-next-line no-console
    console.log(id, 'Headers', platform,
      app_id,
      device_id,
      custom_id,
      version_build,
      plugin_version,
      version_name)

    const { data: versionData } = await supabase
      .from('app_versions')
      .select('id')
      .eq('app_id', app_id)
      .or(`name.eq.${version_name},custom_id.eq.builtin`)
      .single()
    const { data: channelData, error: dbError } = await supabase
      .from('channels')
      .select(`
        id,
        created_at,
        created_by,
        name,
        app_id,
        allow_dev,
        allow_emulator,
        disableAutoUpdateUnderNative,
        disableAutoUpdateToMajor,
        ios,
        android,
        version (
          id,
          name,
          checksum,
          session_key,
          user_id,
          bucket_id,
          external_url
        )
      `)
      .eq('app_id', app_id)
      .eq('public', true)
      .single()
    const { data: channelOverride } = await supabase
      .from('channel_devices')
      .select(`
        device_id,
        app_id,
        channel_id (
          id,
          created_at,
          created_by,
          name,
          app_id,
          allow_dev,
          allow_emulator,
          disableAutoUpdateUnderNative,
          disableAutoUpdateToMajor,
          ios,
          android,
          version (
            id,
            name,
            checksum,
            session_key,
            user_id,
            bucket_id,
            external_url
          )
        ),
        created_at,
        updated_at
      `)
      .eq('device_id', device_id)
      .eq('app_id', app_id)
      .single()
    const { data: devicesOverride } = await supabase
      .from('devices_override')
      .select(`
        device_id,
        app_id,
        created_at,
        updated_at,
        version (
          id,
          name,
          checksum,
          session_key,
          user_id,
          bucket_id,
          external_url
        )
      `)
      .eq('device_id', device_id)
      .eq('app_id', app_id)
      .single()

    if (dbError || !channelData) {
      console.error(id, 'Cannot get channel', app_id, `no default channel ${JSON.stringify(dbError)}`)
      return sendRes({
        message: `no public channel ${JSON.stringify(dbError)}`,
        error: 'channel_not_found',
      }, 200)
    }
    let channel = channelData
    const planValid = await isAllowedAction(supabase, channel.created_by)
    await checkPlan(supabase, channel.created_by)
    let version = channel.version as Database['public']['Tables']['app_versions']['Row']
    const versionId = versionData ? versionData.id : version.id
    const xForwardedFor = event.headers['x-forwarded-for'] || ''
    // check if version is created_at more than 4 hours
    const isOlderEnought = (new Date(version.created_at || Date.now()).getTime() + 4 * 60 * 60 * 1000) < Date.now()

    if (!isOlderEnought && await invalidIp(xForwardedFor.split(',')[0])) {
      await sendStats(supabase, 'invalidIP', platform, device_id, app_id, version_build, versionId)
      return sendRes({
        message: `invalid ip ${xForwardedFor}`,
        error: 'invalid_ip',
      }, 400)
    }
    await updateOrCreateDevice(supabase, {
      app_id,
      device_id,
      plugin_version,
      version: versionId,
      ...(custom_id != null ? { custom_id } : {}),
      ...(is_emulator != null ? { is_emulator } : {}),
      ...(is_prod != null ? { is_prod } : {}),
      version_build,
      os_version: version_os,
      platform: platform as Database['public']['Enums']['platform_os'],
      updated_at: new Date().toISOString(),
    })
    if (!planValid) {
      await sendStats(supabase, 'needPlanUpgrade', platform, device_id, app_id, version_build, versionId)
      console.error(id, 'Cannot update, upgrade plan to continue to update', app_id)
      return sendRes({
        message: `Cannot update, upgrade plan to continue to update ${app_id}`,
        error: 'not_good_plan',
      }, 200)
    }
    if (channelOverride && channelOverride.channel_id) {
      const channelId = channelOverride.channel_id as Database['public']['Tables']['channels']['Row'] & {
        version: Database['public']['Tables']['app_versions']['Row']
      }

      // eslint-disable-next-line no-console
      console.log(id, 'Set channel override', app_id, channelId.version.name)
      version = channelId.version
      channel = channelId
    }
    if (devicesOverride && devicesOverride.version) {
      const deviceVersion = devicesOverride.version as Database['public']['Tables']['app_versions']['Row']
      // eslint-disable-next-line no-console
      console.log(id, 'Set device override', app_id, deviceVersion.name)
      version = devicesOverride.version as Database['public']['Tables']['app_versions']['Row']
    }

    if (!version.bucket_id && !version.external_url) {
      console.error(id, 'Cannot get zip file', app_id)
      return sendRes({
        id,
        message: `Cannot get zip file ${app_id}`,
        error: 'zip_not_found',
      }, 200)
    }

    // console.log('updateOrCreateDevice done')
    let signedURL = version.external_url || ''
    if (version.bucket_id && !version.external_url) {
      const { data } = await supabase
        .storage
        .from(`apps/${version.user_id}/${app_id}/versions`)
        .createSignedUrl(version.bucket_id, 60)
      if (data?.signedUrl)
        signedURL = data.signedUrl
    }

    // console.log('signedURL', device_id, signedURL, version_name, version.name)
    if (version_name === version.name) {
      await sendStats(supabase, 'noNew', platform, device_id, app_id, version_build, versionId)
      // eslint-disable-next-line no-console
      console.log(id, 'No new version available', device_id, version_name, version.name)
      return sendRes({
        message: 'No new version available',
        error: 'no_new_version',
      }, 200)
    }

    if (!devicesOverride && !channel.ios && platform === 'ios') {
      // eslint-disable-next-line no-console
      console.log(id, 'Cannot update ios is disabled', device_id)
      await sendStats(supabase, 'disablePlatformIos', platform, device_id, app_id, version_build, versionId)
      return sendRes({
        major: true,
        message: 'Cannot update ios is disabled',
        error: 'disabled_platform_ios',
        version: version.name,
        old: version_name,
      }, 200)
    }
    if (!devicesOverride && !channel.android && platform === 'android') {
      // eslint-disable-next-line no-console
      console.log(id, 'Cannot update, android is disabled', device_id)
      await sendStats(supabase, 'disablePlatformAndroid', platform, device_id, app_id, version_build, versionId)
      return sendRes({
        major: true,
        message: 'Cannot update, android is disabled',
        error: 'disable_platform_android',
        version: version.name,
        old: version_name,
      }, 200)
    }
    // console.log('check disableAutoUpdateToMajor', device_id)
    if (!devicesOverride && channel.disableAutoUpdateToMajor && semver.major(version.name) > semver.major(version_name)) {
      await sendStats(supabase, 'disableAutoUpdateToMajor', platform, device_id, app_id, version_build, versionId)
      // eslint-disable-next-line no-console
      console.log(id, 'Cannot update major version', device_id)
      return sendRes({
        major: true,
        message: 'Cannot update major version',
        error: 'disable_auto_update_to_major',
        version: version.name,
        old: version_name,
      }, 200)
    }

    // console.log(id, 'check disableAutoUpdateUnderNative', device_id)
    if (!devicesOverride && channel.disableAutoUpdateUnderNative && semver.lt(version.name, version_build)) {
      await sendStats(supabase, 'disableAutoUpdateUnderNative', platform, device_id, app_id, version_build, versionId)
      // eslint-disable-next-line no-console
      console.log(id, 'Cannot revert under native version', device_id)
      return sendRes({
        message: 'Cannot revert under native version',
        error: 'disable_auto_update_under_native',
        version: version.name,
        old: version_name,
      }, 200)
    }
    if (!devicesOverride && !channel.allow_dev && !is_prod) {
      // eslint-disable-next-line no-console
      console.log(id, 'Cannot update dev build is disabled', device_id)
      await sendStats(supabase, 'disableDevBuild', platform, device_id, app_id, version_build, versionId)
      return sendRes({
        major: true,
        message: 'Cannot update, dev build is disabled',
        error: 'disable_dev_build',
        version: version.name,
        old: version_name,
      }, 200)
    }
    if (!devicesOverride && !channel.allow_emulator && is_emulator) {
      // eslint-disable-next-line no-console
      console.log(id, 'Cannot update emulator is disabled', device_id)
      await sendStats(supabase, 'disableEmulator', platform, device_id, app_id, version_build, versionId)
      return sendRes({
        major: true,
        message: 'Cannot update, emulator is disabled',
        error: 'disable_emulator',
        version: version.name,
        old: version_name,
      }, 200)
    }

    // console.log('save stats', device_id)
    await sendStats(supabase, 'get', platform, device_id, app_id, version_build, version.id)

    // eslint-disable-next-line no-console
    console.log(id, 'New version available', app_id, version.name, signedURL)
    return sendRes({
      version: version.name,
      ...(version.session_key ? { session_key: version.session_key } : {}),
      checksum: version.checksum,
      url: signedURL,
    })
  }
  catch (e) {
    return sendRes({
      id,
      app_id,
      message: `Cannot get latest version ${e}!`,
      error: 'cannot_get_latest_version',
    }, 500)
  }
}

export const handler: Handler = async (event) => {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  // eslint-disable-next-line no-console
  console.log(id, event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))

  if (event.httpMethod === 'POST') {
    return post(id, event, supabase)
  }
  else if (event.httpMethod === 'GET') {
    const {
      cap_version_name,
      cap_version_build,
      cap_plugin_version,
      cap_platform,
      cap_app_id,
      cap_version_os,
      cap_device_id,
    } = event.headers
    event.body = JSON.stringify({
      version_name: cap_version_name,
      version_build: cap_version_build,
      plugin_version: cap_plugin_version,
      platform: cap_platform,
      app_id: cap_app_id,
      version_os: cap_version_os,
      device_id: cap_device_id,
    })
    return post(id, event, supabase)
  }
  return sendRes({ message: 'Method now allowed', error: 'not_allowed' }, 400)
}
