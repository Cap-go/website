import type { Handler } from '@netlify/functions'
import { updateOrCreateDevice, useSupabase } from '../services/supabase'
import { sendRes } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface Channel {
  version: definitions['app_versions']
}
interface GetLatest {
  appid: string
  channel: string
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  try {
    const body = event.queryStringParameters as any as GetLatest
    if (!body.appid || !body.channel)
      return sendRes({ message: 'missing appid or channel' }, 400)

    const supabase = useSupabase()

    const { data: channels, error: dbError } = await supabase
      .from<definitions['channels'] & Channel>('channels')
      .select(`
        id,
        created_at,
        name,
        app_id,
        version (
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
      return sendRes({
        message: 'Cannot get channel',
        err: JSON.stringify(dbError),
      }, 400)
    }
    const channel = channels[0]
    if (!channel.version.bucket_id && !channel.version.external_url) {
      return sendRes({
        message: 'Cannot get bucket_id',
        err: JSON.stringify(dbError),
      }, 400)
    }
    // await updateOrCreateDevice({
    //   app_id: body.appid,
    //   device_id: 'unknown',
    //   platform: 'unknow',
    //   plugin_version: '2.3.3',
    //   version: channel.version.id,
    // })
    let signedURL = channel.version.external_url || ''
    if (channel.version.bucket_id && !channel.version.external_url) {
      const res = await supabase
        .storage
        .from(`apps/${channel.version.user_id}/${channel.app_id}/versions`)
        .createSignedUrl(channel.version.bucket_id, 60)
      if (res && res.signedURL)
        signedURL = res.signedURL
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
