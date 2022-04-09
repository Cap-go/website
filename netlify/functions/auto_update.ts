import type { Handler } from '@netlify/functions'
import semver from 'semver'
import { useSupabase } from '../services/supabase'
import { sendRes } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface Channel {
  version: definitions['app_versions']
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  let {
    cap_version_name,
    cap_plugin_version,
  } = event.headers
  const {
    cap_platform,
    cap_app_id,
    cap_device_id,
    cap_version_build,
  } = event.headers
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

    const supabase = useSupabase()

    const { data: channels, error: dbError } = await supabase
      .from<definitions['channels'] & Channel>('channels')
      .select(`
        id,
        created_at,
        name,
        app_id,
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
    if (dbError || !channels || !channels.length) {
      console.error('Cannot get channel', dbError)
      return sendRes({
        message: 'Cannot get channel',
        err: JSON.stringify(dbError),
      }, 200)
    }
    const channel = channels[0]
    if (!channel.version.bucket_id && !channel.version.external_url) {
      console.error('Cannot get zip file')
      return sendRes({
        message: 'Cannot get zip file',
      }, 200)
    }
    const { data: dataDevice, error: errorDevice } = await supabase
      .from<definitions['devices']>('devices')
      .select()
      .eq('app_id', cap_app_id)
      .eq('device_id', cap_device_id)
    if (!dataDevice || !dataDevice.length || errorDevice) {
      await supabase
        .from<definitions['devices']>('devices')
        .insert({
          app_id: cap_app_id,
          device_id: cap_device_id,
          platform: cap_platform,
          plugin_version: cap_plugin_version,
          version: channel.version.id,
        })
    }
    else if (dataDevice[0].version !== channel.version.id || dataDevice[0].plugin_version !== cap_plugin_version) {
      await supabase
        .from<definitions['devices']>('devices')
        .update({
          plugin_version: cap_plugin_version,
          version: channel.version.id,
        })
        .eq('app_id', cap_app_id)
        .eq('device_id', cap_device_id)
    }
    let signedURL = channel.version.external_url || ''
    if (channel.version.bucket_id && !channel.version.external_url) {
      const res = await supabase
        .storage
        .from(`apps/${channel.version.user_id}/${channel.app_id}/versions`)
        .createSignedUrl(channel.version.bucket_id, 60)
      if (res && res.signedURL)
        signedURL = res.signedURL
    }

    if (cap_version_name === channel.version.name) {
      return sendRes({
        message: 'No new version available',
      }, 200)
    }
    if (!channel.disableAutoUpdateToMajor && semver.major(channel.version.name) > semver.major(cap_version_name)) {
      return sendRes({
        major: true,
        message: 'Cannot upgrade major version',
        version: channel.version.name,
      }, 200)
    }
    if (!channel.disableAutoUpdateUnderNative && semver.lt(cap_version_build, channel.version.name)) {
      return sendRes({
        message: 'Cannot revert under native version',
        version: channel.version.name,
      }, 200)
    }
    // eslint-disable-next-line no-console
    console.log('New version available', channel.version.name, signedURL)
    return sendRes({
      version: channel.version.name,
      url: signedURL,
    })
  }
  catch (e) {
    return sendRes({
      message: 'Cannot get latest version',
      err: `${e}!`,
    }, 500)
  }
}
