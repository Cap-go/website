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

  const {
    cap_app_id,
    cap_device_id,
    cap_version_build,
    cap_version_name,
  } = event.headers
  try {
    if (!cap_app_id || cap_device_id || cap_version_build || cap_version_name)
      return sendRes({ message: 'missing appid' }, 400)

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
          name,
          user_id,
          bucket_id,
          external_url
        )
      `)
      .eq('app_id', cap_app_id)
      .eq('public', true)
    if (dbError || !channels || !channels.length) {
      console.log('Cannot get channel', dbError)
      return sendRes({
        message: 'Cannot get channel',
        err: JSON.stringify(dbError),
      }, 200)
    }
    const channel = channels[0]
    if (!channel.version.bucket_id && !channel.version.external_url) {
      console.log('Cannot get zip file')
      return sendRes({
        message: 'Cannot get zip file',
      }, 200)
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
        signedURL,
      }, 200)
    }
    if (!channel.disableAutoUpdateToMajor && semver.major(channel.version.name) > semver.major(cap_version_name)) {
      return sendRes({
        major: true,
        message: 'Cannot upgrade major version',
        signedURL,
      }, 200)
    }
    if (!channel.disableAutoUpdateUnderNative && semver.lt(cap_version_build, channel.version.name)) {
      return sendRes({
        message: 'Cannot revert under native version',
        signedURL,
      }, 200)
    }
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
