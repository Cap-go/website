/* eslint-disable no-console */
// https://api.github.com/repos/Cap-go/capacitor-updater
// stargazers_count
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Handler } from '@netlify/functions'
import { useSupabase } from '../services/supabase'
import type { Database } from '../../types/supabase.types'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'

// Get all the paid plans
const get = async (supabase: SupabaseClient<Database>) => {
  const { data: plans } = await supabase
    .from('plans')
    .select().neq('name', 'Free')
    .order('price_m')
  console.log('plans', plans)
  return sendRes(plans) || sendRes([])
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
