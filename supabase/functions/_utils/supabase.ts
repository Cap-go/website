import { createClient } from 'https://esm.sh/@supabase/supabase-js@^1.33.1'
import type { definitions } from './types_supabase.ts'

// Import Supabase client

export const supabaseClient = createClient(
  // Supabase API URL - env var exported by default.
  Deno.env.get('SUPABASE_URL') ?? '',
  // Supabase API ANON KEY - env var exported by default.
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
)

// WARNING: The service role key has admin priviliges and should only be used in secure server environments!
export const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

export const updateOrCreateVersion = async(update: Partial<definitions['app_versions']>) => {
  // eslint-disable-next-line no-console
  console.log('updateOrCreateVersion', update)
  const { data, error } = await supabaseAdmin
    .from<definitions['app_versions']>('app_versions')
    .select()
    .eq('app_id', update.app_id)
    .eq('name', update.name)
  if (data && data.length && !error) {
  // eslint-disable-next-line no-console
    console.log('update Version')
    update.deleted = false
    return supabaseAdmin
      .from<definitions['app_versions']>('app_versions')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('name', update.name)
  }
  else {
    return supabaseAdmin
      .from<definitions['app_versions']>('app_versions')
      .insert(update)
  }
}

export const updateOrCreateChannel = async(update: Partial<definitions['channels']>) => {
  // eslint-disable-next-line no-console
  console.log('updateOrCreateChannel', update)
  if (!update.app_id || !update.name || !update.created_by) {
    console.error('missing app_id, name, or created_by')
    return Promise.reject(new Error('missing app_id, name, or created_by'))
  }
  const { data, error } = await supabaseAdmin
    .from<definitions['channels']>('channels')
    .select()
    .eq('app_id', update.app_id)
    .eq('name', update.name)
    .eq('created_by', update.created_by)
  if (data && data.length && !error) {
    return supabaseAdmin
      .from<definitions['channels']>('channels')
      .update(update)
      .eq('app_id', update.app_id)
      .eq('name', update.name)
      .eq('created_by', update.created_by)
  }
  else {
    return supabaseAdmin
      .from<definitions['channels']>('channels')
      .insert(update)
  }
}
