import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase.types'
import { addEventPerson } from './crisp'
import { logsnag } from './logsnag'
import { sendNotif } from './notifications'
export interface VersionStatsIncrement {
  app_id: string
  version_id: number
  devices: number
}
export interface StatsV2 {
  mau: number
  storage: number
  bandwidth: number
}
const planToInt = (plan: string) => {
  switch (plan) {
    case 'Free':
      return 0
    case 'Solo':
      return 1
    case 'Maker':
      return 2
    case 'Team':
      return 3
    case 'Pay as you go':
      return 4
    default:
      return 0
  }
}

export const useSupabase = (url: string, key: string) => {
  const options = {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
  return createClient<Database>(url, key, options)
}

export const updateOrCreateVersion = async (supabase: SupabaseClient<Database>,
  update: Database['public']['Tables']['app_versions']['Insert']) => {
  // eslint-disable-next-line no-console
  console.log('updateOrCreateVersion', update)
  const { data } = await supabase
    .from('app_versions')
    .select()
    .eq('app_id', update.app_id)
    .eq('name', update.name)
    .single()
  if (data) {
    return supabase
      .from('app_versions')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('name', update.name)
      .eq('deleted', false)
      .select()
      .single()
  }
  else {
    return supabase
      .from('app_versions')
      .insert(update)
      .select()
      .single()
  }
}

export const updateVersionStats = async (supabase: SupabaseClient<Database>, increment: VersionStatsIncrement) => {
  const { error } = await supabase
    .rpc('increment_version_stats', increment)
  if (error)
    console.error('increment_stats', error)
}

export const updateOrCreateChannel = async (supabase: SupabaseClient<Database>,
  update: Database['public']['Tables']['channels']['Insert']) => {
  // eslint-disable-next-line no-console
  console.log('updateOrCreateChannel', update)
  if (!update.app_id || !update.name || !update.created_by)
    return Promise.reject(Error('updateOrCreateChannel: missing required fields'))
  const { data } = await supabase
    .from('channels')
    .select()
    .eq('app_id', update.app_id)
    .eq('name', update.name)
    .eq('created_by', update.created_by)
    .single()
  if (data) {
    return supabase
      .from('channels')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('name', update.name)
      .eq('created_by', update.created_by)
      .select()
      .single()
  }
  else {
    return supabase
      .from('channels')
      .insert(update)
      .select()
      .single()
  }
}

export const updateOrCreateDevice = async (supabase: SupabaseClient<Database>,
  update: Database['public']['Tables']['devices']['Insert']) => {
  // console.log('updateOrCreateDevice', update)
  const { data } = await supabase
    .from('devices')
    .select()
    .eq('app_id', update.app_id)
    .eq('device_id', update.device_id)
    .single()
  if (data) {
    return supabase
      .from('devices')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('device_id', update.device_id)
      .select()
      .single()
  }
  else {
    return supabase
      .from('devices')
      .insert(update)
      .select()
      .single()
  }
}

export const isGoodPlan = async (supabase: SupabaseClient<Database>, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('is_good_plan_v2', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || false
}

export const isTrial = async (supabase: SupabaseClient<Database>, userId: string): Promise<number> => {
  const { data, error } = await supabase
    .rpc('is_trial', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || 0
}

export const isPaying = async (supabase: SupabaseClient<Database>, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('is_paying', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || false
}

export const isAllowedAction = async (supabase: SupabaseClient<Database>, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('is_allowed_action_user', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data
}

export const sendStats = async (supabase: SupabaseClient<Database>, action: string, platform: string, device_id: string, app_id: string, version_build: string, versionId: number) => {
  const stat: Database['public']['Tables']['stats']['Insert'] = {
    platform: platform as Database['public']['Enums']['platform_os'],
    device_id,
    action,
    app_id,
    version_build,
    version: versionId,
  }
  try {
    const { error } = await supabase
      .from('stats')
      .insert(stat)
    if (error)
      console.error('Cannot insert stat', app_id, version_build, error)
  }
  catch (err) {
    console.error('Cannot insert stats', app_id, err)
  }
}

export const findBestPlan = async (supabase: SupabaseClient<Database>,
  stats: Database['public']['Functions']['get_total_stats']['Returns'][0]): Promise<string> => {
  const storage = Math.round((stats.storage || 0) / 1024 / 1024 / 1024)
  const bandwidth = Math.round((stats.bandwidth || 0) / 1024 / 1024 / 1024)
  const { data, error } = await supabase
    .rpc('find_best_plan_v2', {
      mau: stats.mau || 0,
      storage,
      bandwidth,
    })
    .single()
  if (error)
    throw new Error(error.message)

  return data || 'Team'
}

export const getMaxstats = async (supabase: SupabaseClient<Database>,
  userId: string, dateId: string): Promise<Database['public']['Functions']['get_total_stats']['Returns'][0]> => {
  const { data, error } = await supabase
    .rpc('get_total_stats', { userid: userId, dateid: dateId })
    .single()
  if (error)
    throw new Error(error.message)

  return data[0] || {
    mau: 0,
    storage: 0,
    bandwidth: 0,
  }
}

export const getCurrentPlanName = async (supabase: SupabaseClient<Database>, userId: string): Promise<string> => {
  const { data, error } = await supabase
    .rpc('get_current_plan_name', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || 'Free'
}

export const checkPlan = async (supabase: SupabaseClient<Database>, userId: string): Promise<void> => {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .single()
    if (userError)
      throw new Error(userError.message)
    if (await isTrial(supabase, userId)) {
      await supabase
        .from('stripe_info')
        .update({ is_good_plan: true })
        .eq('customer_id', user.customer_id)
        .then()
      return Promise.resolve()
    }
    const is_good_plan = await isGoodPlan(supabase, userId)
    if (!is_good_plan) {
      // eslint-disable-next-line no-console
      console.log('is_good_plan_v2', userId, is_good_plan)
      // create dateid var with yyyy-mm with dayjs
      const dateid = new Date().toISOString().slice(0, 7)
      const get_max_stats = await getMaxstats(supabase, userId, dateid)
      const current_plan = await getCurrentPlanName(supabase, userId)
      if (get_max_stats) {
        const best_plan = await findBestPlan(supabase, get_max_stats)
        const bestPlanKey = best_plan.toLowerCase().replace(' ', '_')
        // TODO create a rpc method to calculate % of plan usage.
        // TODO send email for 50%, 70%, 90% of current plan usage.
        // TODO Allow upgrade email to be send again every 30 days
        // TODO send to logsnag maker opportunity by been in crisp

        if (best_plan === 'Free' && current_plan === 'Free') {
          await addEventPerson(user.email, {}, 'user:need_more_time', 'blue')
          // eslint-disable-next-line no-console
          console.log('best_plan is free', userId)
          await logsnag.publish({
            channel: 'usage',
            event: 'User need more time',
            icon: '⏰',
            tags: {
              'user-id': userId,
            },
            notify: false,
          }).catch()
        }
        else if (planToInt(best_plan) > planToInt(current_plan)) {
          await sendNotif(supabase, `user:upgrade_to_${bestPlanKey}`, userId, '* * * * *', 'red')
          // await addEventPerson(user.email, {}, `user:upgrade_to_${bestPlanKey}`, 'red')
          // eslint-disable-next-line no-console
          console.log(`user:upgrade_to_${bestPlanKey}`, userId)
          await logsnag.publish({
            channel: 'usage',
            event: `User need upgrade to ${bestPlanKey}`,
            icon: '⚠️',
            tags: {
              'user-id': userId,
            },
            notify: false,
          }).catch()
        }
      }
    }
    return supabase
      .from('stripe_info')
      .update({ is_good_plan: !!is_good_plan })
      .eq('customer_id', user.customer_id)
      .then()
  }
  catch (e) {
    console.error('Error checkPlan', e)
    return Promise.resolve()
  }
}
