// https://api.github.com/repos/Cap-go/capacitor-updater
// stargazers_count
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Handler } from '@netlify/functions'
import { useSupabase } from 'netlify/services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'
import type { definitions } from '~/types/supabase'

const get = async(supabase: SupabaseClient) => {
  const date_id = new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from<definitions['global_stats']>('global_stats')
    .select()
    .eq('date_id', date_id)
    .single()
  if (data && !error)
    return sendRes(data)
  return sendRes({
    apps: 190,
    updates: 130000,
    stars: 125,
  })
}

export const handler: Handler = async(event) => {
  // eslint-disable-next-line no-console
  console.log(event.httpMethod)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))
  if (event.httpMethod === 'GET')
    return get(supabase)
  console.error('Method not allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}
