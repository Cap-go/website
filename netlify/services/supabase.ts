import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import type { definitions } from '../../types/supabase'
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
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  }
  return createClient(url, key, options)
}

export const updateOrCreateVersion = async (supabase: SupabaseClient, update: Partial<definitions['app_versions']>) => {
  // eslint-disable-next-line no-console
  console.log('updateOrCreateVersion', update)
  const { data, error } = await supabase
    .from<definitions['app_versions']>('app_versions')
    .select()
    .eq('app_id', update.app_id)
    .eq('name', update.name)
  if (data && data.length && !error) {
    return supabase
      .from<definitions['app_versions']>('app_versions')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('name', update.name)
      .eq('deleted', false)
  }
  else {
    return supabase
      .from<definitions['app_versions']>('app_versions')
      .insert(update)
  }
}

export const updateVersionStats = async (supabase: SupabaseClient, increment: VersionStatsIncrement) => {
  const { error } = await supabase
    .rpc('increment_version_stats', increment)
  if (error)
    console.error('increment_stats', error)
}

export const updateOrCreateChannel = async (supabase: SupabaseClient, update: Partial<definitions['channels']>) => {
  // eslint-disable-next-line no-console
  console.log('updateOrCreateChannel', update)
  if (!update.app_id || !update.name || !update.created_by)
    return Promise.reject(Error('updateOrCreateChannel: missing required fields'))
  const { data, error } = await supabase
    .from<definitions['channels']>('channels')
    .select()
    .eq('app_id', update.app_id)
    .eq('name', update.name)
    .eq('created_by', update.created_by)
  if (data && data.length && !error) {
    return supabase
      .from<definitions['channels']>('channels')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('name', update.name)
      .eq('created_by', update.created_by)
  }
  else {
    return supabase
      .from<definitions['channels']>('channels')
      .insert(update)
  }
}

export const updateOrCreateDevice = async (supabase: SupabaseClient, update: Partial<definitions['devices']>) => {
  // console.log('updateOrCreateDevice', update)
  const { data, error } = await supabase
    .from<definitions['devices']>('devices')
    .select()
    .eq('app_id', update.app_id)
    .eq('device_id', update.device_id)
  if (!data || !data.length || error) {
    return supabase
      .from<definitions['devices']>('devices')
      .insert(update)
  }
  else {
    return supabase
      .from<definitions['devices']>('devices')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('device_id', update.device_id)
  }
}

export const isGoodPlan = async (supabase: SupabaseClient, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc<boolean>('is_good_plan_v2', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || false
}

export const isTrial = async (supabase: SupabaseClient, userId: string): Promise<number> => {
  const { data, error } = await supabase
    .rpc<number>('is_trial', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || 0
}

export const isPaying = async (supabase: SupabaseClient, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc<boolean>('is_paying', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || false
}

export const checkPlanValid = async (supabase: SupabaseClient, userId: string) => {
  const validPlan = await isGoodPlan(supabase, userId)
  const paying = await isPaying(supabase, userId)
  const trialDays = await isTrial(supabase, userId)
  return (paying && validPlan) || (!paying && trialDays > 0)
}

export const sendStats = async (supabase: SupabaseClient, action: string, platform: string, device_id: string, app_id: string, version_build: string, versionId: number) => {
  const stat: Partial<definitions['stats']> = {
    platform: platform as definitions['stats']['platform'],
    device_id,
    action,
    app_id,
    version_build,
    version: versionId,
  }
  try {
    const { error } = await supabase
      .from<definitions['stats']>('stats')
      .insert(stat)
    if (error)
      console.error('Cannot insert stat', app_id, version_build, error)
  }
  catch (err) {
    console.error('Cannot insert stats', app_id, err)
  }
}

export const findBestPlan = async (supabase: SupabaseClient, stats: StatsV2): Promise<string> => {
  const storage = Math.round((stats.storage || 0) / 1024 / 1024 / 1024)
  const bandwidth = Math.round((stats.bandwidth || 0) / 1024 / 1024 / 1024)
  const { data, error } = await supabase
    .rpc<string>('find_best_plan_v2', {
      mau: stats.mau || 0,
      storage,
      bandwidth,
    })
    .single()
  if (error)
    throw new Error(error.message)

  return data || 'Team'
}

export const getMaxstats = async (supabase: SupabaseClient, userId: string, dateId: string): Promise<StatsV2> => {
  const { data, error } = await supabase
    .rpc<StatsV2>('get_total_stats', { userid: userId, dateid: dateId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || {
    mau: 0,
    storage: 0,
    bandwidth: 0,
  }
}

export const getCurrentPlanName = async (supabase: SupabaseClient, userId: string): Promise<string> => {
  const { data, error } = await supabase
    .rpc<string>('get_current_plan_name', { userid: userId })
    .single()
  if (error)
    throw new Error(error.message)

  return data || 'Free'
}

export const checkPlan = async (supabase: SupabaseClient, userId: string): Promise<void> => {
  try {
    const { data: user, error: userError } = await supabase
      .from<definitions['users']>('users')
      .select()
      .eq('id', userId)
      .single()
    if (userError)
      throw new Error(userError.message)
    if (await isTrial(supabase, userId)) {
      await supabase
        .from<definitions['stripe_info']>('stripe_info')
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
      .from<definitions['stripe_info']>('stripe_info')
      .update({ is_good_plan: !!is_good_plan })
      .eq('customer_id', user.customer_id)
      .then()
  }
  catch (e) {
    console.error('Error checkPlan', e)
    return Promise.resolve()
  }
}
