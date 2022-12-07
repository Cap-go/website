import type { Handler } from '@netlify/functions'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase.types'
import { useSupabase } from '../services/supabase'
import { checkAppOwner, checkKey, fetchLimit, findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'

interface Bundle {
  app_id?: string
  page?: number
}
export const deleteBundle = async (event: any, supabase: SupabaseClient<Database>) => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey || !event.body) {
    console.error('Cannot Verify User')
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  const body = JSON.parse(event.body || '{}') as Bundle

  if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
    console.error('You can\'t access this app', body.app_id)
    return sendRes({ status: 'You can\'t access this app', app_id: body.app_id }, 400)
  }
  try {
    const fetchOffset = body.page === undefined ? 0 : body.page
    const from = fetchOffset * fetchLimit
    const to = (fetchOffset + 1) * fetchLimit - 1
    const { error: dbError } = await supabase
      .from('app_versions')
      .update({
        deleted: true,
      })
      .eq('app_id', body.app_id)
      .range(from, to)
      .order('created_at', { ascending: true })
    if (dbError) {
      console.error('Cannot delete bundle')
      return sendRes({ status: 'Cannot delete bundle', error: JSON.stringify(dbError) }, 400)
    }
  }
  catch (e) {
    console.error('Cannot delete Bundle', e)
    return sendRes({ status: 'Cannot delete bundle', error: e }, 500)
  }
  return sendRes()
}

export const get = async (event: any, supabase: SupabaseClient<Database>) => {
  const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['write', 'all'])
  if (!apikey) {
    console.error('Cannot Verify User', event.headers.authorization)
    return sendRes({ status: 'Cannot Verify User' }, 400)
  }

  try {
    const body = event.queryStringParameters as any as Bundle
    if (!body.app_id) {
      console.error('Missing app_id')
      return sendRes({ status: 'Missing app_id' }, 400)
    }

    const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
    const apikey: Database['public']['Tables']['apikeys']['Row'] | null = await checkKey(event.headers.authorization, supabase, ['read', 'all'])
    if (!apikey || !body) {
      console.error('Cannot Verify User')
      return sendRes({ status: 'Cannot Verify User' }, 400)
    }
    if (!(await checkAppOwner(apikey.user_id, body.app_id, supabase))) {
      console.error('You can\'t check this app', body.app_id)
      return sendRes({ status: 'You can\'t check this app', app_id: body.app_id }, 400)
    }
    const { data: dataBundles, error: dbError } = await supabase
      .from('app_versions')
      .select()
      .eq('app_id', body.app_id)
      .eq('deleted', false)
      .order('created_at', { ascending: false })
    if (dbError || !dataBundles || !dataBundles.length) {
      console.error('Cannot get bundles', dbError)
      return sendRes({ status: 'Cannot get bundles', error: dbError }, 400)
    }

    return sendRes(dataBundles)
  }
  catch (e) {
    console.error('Cannot get bundles', e)
    return sendRes({ status: 'Cannot get bundles', error: e }, 500)
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
    return deleteBundle(event, supabase)
  console.error('Method not allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}
