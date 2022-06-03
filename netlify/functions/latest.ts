import type { Handler } from '@netlify/functions'
import { useSupabase } from '../services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface Channel {
  version: definitions['app_versions']
}
interface GetLatest {
  appid: string
  channel: string
}

export const handler: Handler = async(event) => {
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  try {
    const body = event.queryStringParameters as any as GetLatest
    if (!body.appid || !body.channel) {
      console.error('missing appid or channel')
      return sendRes({ message: 'missing appid or channel' }, 400)
    }

    const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))

    const { data: channels, error: dbError } = await supabase
      .from<definitions['channels'] & Channel>('channels')
      .select(`
        id,
        created_at,
        name,
        app_id,
        version (
          id,
          name,
          user_id,
          bucket_id,
          external_url
        )
      `)
      .eq('app_id', body.appid)
      .eq('name', body.channel)
      .eq('public', true)
    if (dbError || !channels || !channels.length) {
      console.error('Cannot get channe', body.appid, body.channel, dbError)
      return sendRes({
        message: 'Cannot get channel',
        err: JSON.stringify(dbError),
      }, 400)
    }
    const channel = channels[0]
    if (!channel.version.bucket_id && !channel.version.external_url) {
      console.error('Cannot get bucket_id or external_url', body.appid, body.channel)
      return sendRes({
        message: 'Cannot get bucket_id or external_url',
        err: JSON.stringify(dbError),
      }, 400)
    }
    const stat: Partial<definitions['stats']> = {
      platform: 'ios',
      device_id: 'unknow',
      action: 'get',
      app_id: body.appid,
      version_build: '',
      version: channel.version.id,
    }
    try {
      const { error } = await supabase
        .from<definitions['stats']>('stats')
        .insert(stat)
      if (error)
        console.error('Cannot insert stat', body.appid, body.channel, error)
    }
    catch (err) {
      console.error('Cannot insert stats', body.appid, err)
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
    // eslint-disable-next-line no-console
    console.log('body.appid', body.appid)
    return sendRes({
      version: channel.version.name,
      url: signedURL,
    })
  }
  catch (e) {
    console.error('Cannot get latest version', e)
    return sendRes({
      message: 'Cannot get latest version',
      err: `${e}!`,
    }, 500)
  }
}
