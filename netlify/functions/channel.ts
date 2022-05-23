import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'
import type { definitions } from '~/types/supabase'
interface GetDevice {
  appid: string
  channel?: string
}

export const get = async(event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body)
    return sendRes({ status: 'Cannot Verify User' }, 400)

  const body = event.queryStringParameters as any as GetDevice
  if (!body.appid || await checkAppOwner(apikey.user_id, body.appid, supabase))
    return sendRes({ status: 'You can\'t access this app' }, 400)
  // get one channel or all channels
  if (body.channel) {
    const { data: dataChannel, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select()
      .eq('app_id', body.appid)
      .eq('name', body.channel)
    if (dbError || !dataChannel || !dataChannel.length)
      return sendRes({ status: 'Cannot find channel', error: dbError }, 400)
    return sendRes(dataChannel[0])
  }
  else {
    const { data: dataChannels, error: dbError } = await supabase
      .from<definitions['channels']>('channels')
      .select()
      .eq('app_id', body.appid)
    if (dbError || !dataChannels || !dataChannels.length)
      return sendRes([])
    return sendRes(dataChannels)
  }
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
  if (event.httpMethod === 'GET')
    return get(event, supabase)
  return sendRes({ status: 'Method now allowed' }, 400)
}
