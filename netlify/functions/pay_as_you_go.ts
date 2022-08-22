/* eslint-disable no-console */
// https://api.github.com/repos/Cap-go/capacitor-updater
// stargazers_count
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Handler } from '@netlify/functions'
import type { definitions } from '../../types/supabase'
import { useSupabase } from '../services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from '../services/utils'

// Get the pay as you go plan datas
const get = async (supabase: SupabaseClient) => {
  const { data: pay_as_you_go } = await supabase
    .from<definitions['pay_as_you_go']>('pay_as_you_go')
    .select()
  return sendRes(pay_as_you_go) || sendRes([])
}

export const handler: Handler = async (event) => {
  console.log(event.httpMethod, event.path)
  if (event.httpMethod === 'OPTIONS')
    return sendRes()
  const adminKey = transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY')
  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), adminKey)
  if (event.httpMethod === 'GET')
    return get(supabase)
  console.error('Method not allowed')
  return sendRes({ status: 'Method now allowed' }, 400)
}
