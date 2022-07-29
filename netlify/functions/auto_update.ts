import type { Handler } from '@netlify/functions'
import semver from 'semver'
import type { SupabaseClient } from '@supabase/supabase-js'
import { isGoodPlan, isTrial, sendStats, updateOrCreateDevice, useSupabase } from '../services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface Channel {
  version: definitions['app_versions']
}
interface ChannelDev {
  channel_id: Channel
}
interface AppInfos {
  version_name: string
  version_build: string
  plugin_version: string
  platform: string
  app_id: string
  device_id: string
}

export const post = async(event: any, supabase: SupabaseClient) => {
  const body = JSON.parse(event.body || '{}') as AppInfos

  let {
    version_name,
    version_build,
    plugin_version,
  } = body
  const {
    platform,
    app_id,
    device_id,
  } = body
  // if version_build is not semver, then make it semver
  const coerce = semver.coerce(version_build)
  if (coerce)
    version_build = coerce.version
  else
    return sendRes({ message: `Native version: ${version_build} doesn't follow semver convention, please follow https://semver.org to allow Capgo compare version number` }, 400)
  version_name = (version_name === 'builtin' || !version_name) ? version_build : version_name
  plugin_version = plugin_version || '2.3.3'
  try {
    if (!app_id || !device_id || !version_build || !version_name || !platform) {
      console.error('Cannot get all headers', platform,
        app_id,
        device_id,
        version_build,
        version_name)
      return sendRes({ message: 'missing appid' }, 400)
    }
    // eslint-disable-next-line no-console
    console.log('Headers', platform,
      app_id,
      device_id,
      version_build,
      plugin_version,
      version_name)

    const { data: channel, error: dbError } = await supabase
      .from<definitions['channels'] & Channel>('channels')
      .select(`
        id,
        created_at,
        created_by,
        name,
        app_id,
        beta,
        disableAutoUpdateUnderNative,
        disableAutoUpdateToMajor,
        version (
          id,
          name,
          user_id,
          bucket_id,
          external_url
        )
      `)
      .eq('app_id', app_id)
      .eq('public', true)
      .single()
    const { data: channelOverride } = await supabase
      .from<definitions['channel_devices'] & ChannelDev>('channel_devices')
      .select(`
        device_id,
        app_id,
        channel_id (
          name,
          version (
            id,
            name,
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
    const { data: devicesOverride } = await supabase
      .from<definitions['devices_override'] & Channel>('devices_override')
      .select(`
        device_id,
        app_id,
        created_at,
        updated_at,
        version (
          id,
          name,
          user_id,
          bucket_id,
          external_url
        )
      `)
      .eq('device_id', device_id)
      .eq('app_id', app_id)
    if (dbError || !channel) {
      console.error('Cannot get channel', app_id, `no public channel ${JSON.stringify(dbError)}`)
      return sendRes({
        message: 'Cannot get channel',
        err: `no public channel ${JSON.stringify(dbError)}`,
      }, 200)
    }
    const trial = await isTrial(supabase, channel.created_by)
    const paying = await isGoodPlan(supabase, channel.created_by)
    let version: definitions['app_versions'] = channel.version as definitions['app_versions']
    if (!paying && !trial) {
      await sendStats(supabase, 'needUpgrade', platform, device_id, app_id, version_build, version.id)
      console.error('Cannot update, upgrade plan to continue to update', app_id)
      return sendRes({
        message: 'Cannot update, upgrade plan to continue to update',
        err: 'not good plan',
      }, 200)
    }
    if (channelOverride && channelOverride.length) {
      // eslint-disable-next-line no-console
      console.log('Set channel override', app_id, channelOverride[0].channel_id.version.name)
      version = channelOverride[0].channel_id.version as definitions['app_versions']
    }
    if (devicesOverride && devicesOverride.length) {
      // eslint-disable-next-line no-console
      console.log('Set device override', app_id, devicesOverride[0].version.name)
      version = devicesOverride[0].version as definitions['app_versions']
    }

    if (!version.bucket_id && !version.external_url) {
      console.error('Cannot get zip file', app_id)
      return sendRes({
        message: 'Cannot get zip file',
      }, 200)
    }
    await updateOrCreateDevice(supabase, {
      app_id,
      device_id,
      plugin_version,
      version: version.id,
      platform: platform as definitions['devices']['platform'],
    })
    // eslint-disable-next-line no-console
    // console.log('updateOrCreateDevice done')
    let signedURL = version.external_url || ''
    if (version.bucket_id && !version.external_url) {
      const res = await supabase
        .storage
        .from(`apps/${version.user_id}/${app_id}/versions`)
        .createSignedUrl(version.bucket_id, 60)
      if (res && res.signedURL)
        signedURL = res.signedURL
    }
    // eslint-disable-next-line no-console
    // console.log('signedURL', device_id, signedURL, version_name, version.name)
    if (version_name === version.name) {
      await sendStats(supabase, 'noNew', platform, device_id, app_id, version_build, version.id)
      // eslint-disable-next-line no-console
      console.log('No new version available', device_id, version_name, version.name)
      return sendRes({
        message: 'No new version available',
      }, 200)
    }
    // eslint-disable-next-line no-console
    // console.log('check disableAutoUpdateToMajor', device_id)
    if (channel.disableAutoUpdateToMajor && semver.major(version.name) > semver.major(version_name)) {
      await sendStats(supabase, 'disableAutoUpdateToMajor', platform, device_id, app_id, version_build, version.id)
      // eslint-disable-next-line no-console
      console.log('Cannot upgrade major version', device_id)
      return sendRes({
        major: true,
        message: 'Cannot upgrade major version',
        version: version.name,
        old: version_name,
      }, 200)
    }
    // eslint-disable-next-line no-console
    console.log('check disableAutoUpdateUnderNative', device_id)
    if (channel.disableAutoUpdateUnderNative && semver.lt(version.name, version_build)) {
      await sendStats(supabase, 'disableAutoUpdateUnderNative', platform, device_id, app_id, version_build, version.id)
      // eslint-disable-next-line no-console
      console.log('Cannot revert under native version', device_id)
      return sendRes({
        message: 'Cannot revert under native version',
        version: version.name,
        old: version_name,
      }, 200)
    }
    // eslint-disable-next-line no-console
    // console.log('save stats', device_id)
    await sendStats(supabase, 'get', platform, device_id, app_id, version_build, version.id)

    // eslint-disable-next-line no-console
    console.log('New version available', app_id, version.name, signedURL)
    return sendRes({
      version: version.name,
      url: signedURL,
    })
  }
  catch (e) {
    console.error('error', app_id, e)
    return sendRes({
      message: 'Cannot get latest version',
      err: `${e}!`,
    }, 500)
  }
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
  if (event.httpMethod === 'POST') { return post(event, supabase) }
  else if (event.httpMethod === 'GET') {
    const {
      cap_version_name,
      cap_version_build,
      cap_plugin_version,
      cap_platform,
      cap_app_id,
      cap_device_id,
    } = event.headers
    event.body = JSON.stringify({
      version_name: cap_version_name,
      version_build: cap_version_build,
      plugin_version: cap_plugin_version,
      platform: cap_platform,
      app_id: cap_app_id,
      device_id: cap_device_id,
    })
    return post(event, supabase)
  }
  console.error('Method not allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}
