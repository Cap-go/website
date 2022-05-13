import type { SupabaseClient } from '@supabase/supabase-js'
import type { definitions } from '~/types/supabase'

export const basicHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, cap_version_name, cap_plugin_version, cap_platform, cap_app_id, cap_device_id, cap_version_build',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
}
// authorization

export const sendRes = (data: any = { status: 'ok' }, statusCode = 200) => ({
  statusCode,
  headers: basicHeaders,
  body: JSON.stringify(data),
})

export const checkKey = async(authorization: string | undefined, supabase: SupabaseClient, allowed: definitions['apikeys']['mode'][]): Promise<definitions['apikeys'] | null> => {
  if (!authorization)
    return null
  try {
    const { data, error } = await supabase
      .from<definitions['apikeys']>('apikeys')
      .select()
      .eq('key', authorization)
    if (!data || !data.length || error || !allowed.includes(data[0].mode))
      return null
    return data[0]
  }
  catch (error) {
    console.error(error)
    return null
  }
}

export const checkAppOwner = async(userId: string | undefined, appId: string | undefined, supabase: SupabaseClient): Promise<boolean> => {
  if (!appId || !userId)
    return false
  try {
    const { data, error } = await supabase
      .from<definitions['apps']>('apps')
      .select()
      .eq('user_id', userId)
      .eq('app_id', appId)
    if (!data || !data.length || error)
      return false
    return true
  }
  catch (error) {
    console.error(error)
    return false
  }
}
