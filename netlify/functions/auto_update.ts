import type { Handler } from '@netlify/functions'
import semver from 'semver'
import { isGoodPlan, isTrial, updateOrCreateDevice, useSupabase } from '../services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface Channel {
  version: definitions['app_versions']
}
interface ChannelDev {
  channel_id: Channel
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  // console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  let {
    cap_version_name,
    cap_version_build,
    cap_plugin_version,
  } = event.headers
  const {
    cap_platform,
    cap_app_id,
    cap_device_id,
  } = event.headers
    // if cap_version_build is not semver, then make it semver
  const coerce = semver.coerce(cap_version_build)
  if (coerce)
    cap_version_build = coerce.version
  cap_version_name = cap_version_name === 'builtin' ? cap_version_build : cap_version_name
  cap_plugin_version = cap_plugin_version || '2.3.3'
  try {
    if (!cap_app_id || !cap_device_id || !cap_version_build || !cap_version_name || !cap_platform) {
      console.error('Cannot get all headers', cap_platform,
        cap_app_id,
        cap_device_id,
        cap_version_build,
        cap_version_name)
      return sendRes({ message: 'missing appid' }, 400)
    }
    // eslint-disable-next-line no-console
    console.log('Headers', cap_platform,
      cap_app_id,
      cap_device_id,
      cap_version_build,
      cap_plugin_version,
      cap_version_name)

    const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))

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
      .eq('app_id', cap_app_id)
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
      .eq('device_id', cap_device_id)
      .eq('app_id', cap_app_id)
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
      .eq('device_id', cap_device_id)
      .eq('app_id', cap_app_id)
    if (dbError || !channel) {
      console.error('Cannot get channel', cap_app_id, dbError || 'no channel')
      return sendRes({
        message: 'Cannot get channel',
        err: JSON.stringify(dbError),
      }, 200)
    }
    const trial = await isTrial(supabase, channel.created_by)
    const paying = await isGoodPlan(supabase, channel.created_by)
    if (!paying && !trial) {
      console.error('Cannot update, upgrade plan to continue to update', cap_app_id)
      return sendRes({
        message: 'Cannot update, upgrade plan to continue to update',
        err: 'not good plan',
      }, 200)
    }
    let version: definitions['app_versions'] = channel.version as definitions['app_versions']
    if (channelOverride && channelOverride.length) {
      // eslint-disable-next-line no-console
      console.log('Set channel override', cap_app_id, channelOverride[0].channel_id.version.name)
      version = channelOverride[0].channel_id.version as definitions['app_versions']
    }
    if (devicesOverride && devicesOverride.length) {
      // eslint-disable-next-line no-console
      console.log('Set device override', cap_app_id, devicesOverride[0].version.name)
      version = devicesOverride[0].version as definitions['app_versions']
    }

    if (!version.bucket_id && !version.external_url) {
      console.error('Cannot get zip file', cap_app_id)
      return sendRes({
        message: 'Cannot get zip file',
      }, 200)
    }
    await updateOrCreateDevice(supabase, {
      app_id: cap_app_id,
      device_id: cap_device_id,
      platform: cap_platform as definitions['devices']['platform'],
      plugin_version: cap_plugin_version,
      version: version.id,
    })
    // eslint-disable-next-line no-console
    console.log('updateOrCreateDevice done')
    let signedURL = version.external_url || ''
    if (version.bucket_id && !version.external_url) {
      const res = await supabase
        .storage
        .from(`apps/${version.user_id}/${cap_app_id}/versions`)
        .createSignedUrl(version.bucket_id, 60)
      if (res && res.signedURL)
        signedURL = res.signedURL
    }
    // eslint-disable-next-line no-console
    console.log('signedURL', cap_device_id, signedURL, cap_version_name, version.name)
    if (cap_version_name === version.name) {
      // eslint-disable-next-line no-console
      console.log('No new version available', cap_device_id, cap_version_name, version.name)
      return sendRes({
        message: 'No new version available',
      }, 200)
    }
    // eslint-disable-next-line no-console
    console.log('check disableAutoUpdateToMajor', cap_device_id)
    if (channel.disableAutoUpdateToMajor && semver.major(version.name) > semver.major(cap_version_name)) {
      // eslint-disable-next-line no-console
      console.log('Cannot upgrade major version', cap_device_id)
      return sendRes({
        major: true,
        message: 'Cannot upgrade major version',
        version: version.name,
        old: cap_version_name,
      }, 200)
    }
    // eslint-disable-next-line no-console
    console.log('check disableAutoUpdateUnderNative', cap_device_id)
    if (channel.disableAutoUpdateUnderNative && semver.lt(version.name, cap_version_build)) {
      // eslint-disable-next-line no-console
      console.log('Cannot revert under native version', cap_device_id)
      return sendRes({
        message: 'Cannot revert under native version',
        version: version.name,
        old: cap_version_name,
      }, 200)
    }
    // eslint-disable-next-line no-console
    console.log('save stats', cap_device_id)
    const stat: Partial<definitions['stats']> = {
      platform: cap_platform as definitions['stats']['platform'],
      device_id: cap_device_id,
      action: 'get',
      app_id: cap_app_id,
      version_build: cap_version_build,
      version: version.id,
    }
    try {
      const { error } = await supabase
        .from<definitions['stats']>('stats')
        .insert(stat)
      if (error)
        console.error('Cannot insert stat', cap_app_id, cap_version_build, error)
    }
    catch (err) {
      console.error('Cannot insert stats', cap_app_id, err)
    }

    // eslint-disable-next-line no-console
    console.log('New version available', cap_app_id, version.name, signedURL)
    return sendRes({
      version: version.name,
      url: signedURL,
    })
  }
  catch (e) {
    console.error('error', cap_app_id, e)
    return sendRes({
      message: 'Cannot get latest version',
      err: `${e}!`,
    }, 500)
  }
}
