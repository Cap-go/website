import type { SupabaseClient } from '@supabase/supabase-js'
import keys from '../../configs.json'
import type { Database } from '../../types/supabase.types'

export const fetchLimit = 50
export interface AppInfos {
  version_name: string
  version_build: string
  version_os: string
  plugin_version: string
  platform: string
  app_id: string
  device_id: string
  custom_id?: string
  is_prod?: boolean
  is_emulator?: boolean
}

export const getRightKey = (env: string, keyname: 'base_domain' | 'supa_anon' | 'supa_url'): string => {
  // eslint-disable-next-line no-console
  console.log('env', env)
  if (env === 'development')
    return keys[keyname].development
  else if (env === 'local')
    return keys[keyname].local
  return keys[keyname].prod
}

export const findEnv = (url: string): string => {
  if (url.includes('localhost'))
    return 'local'
  else if (url.includes('development'))
    return 'development'
  else
    return 'prod'
}

export const transformEnvVar = (env: string, v: string): string => {
  if (env === 'prod')
    return process.env[v] || v
  // uppercase env and check if env_v is defined, if yes return it otherwise return v
  return process.env[`${env.toUpperCase()}_${v}`] || v
}

export const basicHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, cap_version_name, cap_plugin_version, cap_platform, cap_app_id, cap_device_id, cap_versin_build, cap_version_os',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
}
// authorization

export const sendRes = (data: any = { status: 'ok' }, statusCode = 200) => ({
  statusCode,
  headers: basicHeaders,
  body: JSON.stringify(data),
})

export const checkKey = async (authorization: string | undefined,
  supabase: SupabaseClient<Database>, allowed: Database['public']['Enums']['key_mode'][]): Promise<Database['public']['Tables']['apikeys']['Row'] | null> => {
  if (!authorization) {
    console.error('checkKey missing authorization')
    return null
  }
  try {
    const { data, error } = await supabase
      .from('apikeys')
      .select()
      .eq('key', authorization)
      .in('mode', allowed)
      .single()
    if (!data || error) {
      console.error('checkKey db error', error)
      return null
    }
    return data
  }
  catch (error) {
    console.error('checkKey error', error)
    return null
  }
}

export const checkAppOwner = async (userId: string | undefined, appId: string | undefined, supabase: SupabaseClient<Database>): Promise<boolean> => {
  if (!appId || !userId)
    return false
  try {
    const { data, error } = await supabase
      .from('apps')
      .select()
      .eq('user_id', userId)
      .eq('app_id', appId)
      .single()
    if (!data || error) {
      console.error('checkAppOwner db error', error)
      return false
    }
    return true
  }
  catch (error) {
    console.error(error)
    return false
  }
}
