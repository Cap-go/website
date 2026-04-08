import { useRuntimeConfig } from '@/config/app'
import type { Database } from '@/services/supabase.types'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supaClient: SupabaseClient<Database> = null as any

interface CapgoConfig {
  supaHost: string
  supaKey: string
  supbaseId: string
}

const getLocalConfig = (): CapgoConfig => ({
  supaHost: import.meta.env.VITE_SUPABASE_URL as string,
  supaKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  supbaseId: import.meta.env.VITE_SUPABASE_URL?.split('//')[1].split('.')[0].split(':')[0] as string,
})

let config: CapgoConfig = getLocalConfig()

export async function getRemoteConfig() {
  const runtimeConfig = useRuntimeConfig()
  const localConfig = getLocalConfig()
  try {
    const res = await fetch(`${runtimeConfig.public.baseApiUrl}/private/config`)
    if (!res.ok) throw new Error('Failed to fetch config')
    const remoteConfig = await res.json() as CapgoConfig
    config = { ...localConfig, ...remoteConfig }
  } catch {
    console.log('Local config', localConfig)
    config = localConfig
  }
  return config
}

export function useSupabase() {
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
  if (supaClient) return supaClient
  supaClient = createClient<Database>(config.supaHost, config.supaKey, options)
  return supaClient
}
