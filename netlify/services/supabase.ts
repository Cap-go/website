import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import type { definitions } from '~/types/supabase'

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
    .rpc<boolean>('is_good_plan', { userid: userId })
    .single()
  if (error)
    throw error

  return data || false
}

export const isTrial = async (supabase: SupabaseClient, userId: string): Promise<number> => {
  const { data, error } = await supabase
    .rpc<number>('is_trial', { userid: userId })
    .single()
  if (error)
    throw error

  return data || 0
}

export const sendStats = async(supabase: SupabaseClient, action: string, platform: string, device_id: string, app_id: string, version_build: string, versionId: number) => {
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
