import { useRuntimeConfig } from '@/config/app'
import type { Database } from '@/services/supabase.types'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supaClient: SupabaseClient<Database> = null as any

interface CapgoConfig {
  supaHost: string
  supaKey: string
  supbaseId: string
}

export function parseSupabaseProjectId(supaHost?: string): string {
  if (!supaHost) return ''
  return supaHost.split('//')[1]?.split('.')[0]?.split(':')[0] || ''
}

export function isSupabaseConfigured(config: Pick<CapgoConfig, 'supaHost' | 'supaKey'>): boolean {
  return Boolean(config.supaHost?.trim() && config.supaKey?.trim())
}

const getLocalConfig = (): CapgoConfig => {
  const supaHost = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || ''
  const supaKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || ''
  return {
    supaHost,
    supaKey,
    supbaseId: parseSupabaseProjectId(supaHost),
  }
}

let config: CapgoConfig = getLocalConfig()

const remoteConfigTimeoutMs = 10_000

export async function getRemoteConfig() {
  const runtimeConfig = useRuntimeConfig()
  const localConfig = getLocalConfig()
  try {
    const res = await fetch(`${runtimeConfig.public.baseApiUrl}/private/config`, {
      signal: AbortSignal.timeout(remoteConfigTimeoutMs),
    })
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
  if (!isSupabaseConfigured(config)) {
    throw new Error('Supabase is not configured')
  }
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
