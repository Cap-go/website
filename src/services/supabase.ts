import ky from 'ky'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase.types'
import { useRuntimeConfig } from '../config/app'

let supaClient: SupabaseClient<Database> = null as any

interface CapgoConfig {
  supaHost: string
  supaKey: string
  supbaseId: string
}

function getLocalConfig() {
  return {
    supaHost: import.meta.env.VITE_SUPABASE_URL as string,
    supaKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
    supbaseId: import.meta.env.VITE_SUPABASE_URL?.split('//')[1].split('.')[0].split(':')[0] as string,
  } as CapgoConfig
}

let config: CapgoConfig = getLocalConfig()

export async function getRemoteConfig() {
  const runtimeConfig = useRuntimeConfig()
  // call host + /api/private/config and parse the result as json using ky
  const localConfig = await getLocalConfig()
  const data = await ky
    .get(`${runtimeConfig.public.baseApiUrl}/private/config`)
    .then(res => res.json<CapgoConfig>())
    .then(d => ({ ...localConfig, ...d } as CapgoConfig))
    .catch(() => {
      console.log('Local config', localConfig)
      return localConfig as CapgoConfig
    })
  config = data
  return data
}

export function useSupabase() {
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
  if (supaClient)
    return supaClient

  supaClient = createClient<Database>(config.supaHost, config.supaKey, options)
  return supaClient
}
