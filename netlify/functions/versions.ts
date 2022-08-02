import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, findEnv, sendRes, transformEnvVar } from '../services/utils'
import type { definitions } from '../../types/supabase'

interface Version {
  appid?: string
  app_id?: string
}
export const deleteVersion = async (event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body) {
    console.error('Cannot Verify User')
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = JSON.parse(event.body || '{}') as Version

  if (!(await checkAppOwner(apikey.user_id, body.appid || body.app_id, supabase))) {
    console.error('You can\'t access this app')
    return sendRes({ status: 'You can\'t access this app' }, 400)
  }
  try {
    const { error: dbError } = await supabase
      .from<definitions['app_versions']>('app_versions')
      .update({
        deleted: true,
      })
      .eq('app_id', body.appid || body.app_id)
    if (dbError) {
      console.error('Cannot delete version')
      return sendRes({ status: 'Cannot delete version', error: JSON.stringify(dbError) }, 400)
    }
  }
  catch (e) {
    console.error('Cannot delete version', e)
    return sendRes({ status: 'Cannot delete version', error: e }, 500)
  }
  return sendRes()
}

export const get = async (event: any, supabase: SupabaseClient) => {
  const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey) {
    console.error('Cannot Verify User', event.headers.authorization)
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  try {
    const body = event.queryStringParameters as any as Version
    if (!(body.appid || body.app_id)) {
      console.error('Missing app_id')
      return sendRes({ status: 'Missing app_id' }, 400)
    }

    const supabase = useSupabase(config.supa_url, transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
    const apikey: definitions['apikeys'] | null = await checkKey(event.headers.authorization, supabase, ['read', 'all'])
    if (!apikey || !body) {
      console.error('Cannot Verify User')
      return sendRes({ status: 'Cannot Verify User' }, 400)
    }
    if (!(await checkAppOwner(apikey.user_id, body.appid || body.app_id, supabase))) {
      console.error('You can\'t check this app', body.appid || body.app_id)
      return sendRes({ status: 'You can\'t check this app', app_id: body.appid || body.app_id }, 400)
    }
    const { data: dataVersions, error: dbError } = await supabase
      .from<definitions['app_versions']>('app_versions')
      .select()
      .eq('app_id', body.appid || body.app_id)
      .eq('deleted', false)
      .order('created_at', { ascending: false })
    if (dbError || !dataVersions || !dataVersions.length) {
      console.error('Cannot get versions', dbError)
      return sendRes({ status: 'Cannot get versions', error: dbError }, 400)
    }

    return sendRes({ versions: dataVersions })
  }
  catch (e) {
    console.error('Cannot get versions', e)
    return sendRes({ status: 'Cannot get versions', error: e }, 500)
  }
}

export const handler: Handler = async (event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
  if (event.httpMethod === 'GET')
    return get(event, supabase)
  else if (event.httpMethod === 'DELETE')
    return deleteVersion(event, supabase)
  console.error('Method not allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}
