import type { Handler } from '@netlify/functions'
import semver from 'semver'
import type { Database } from '../../types/supabase.types'
import { updateVersionStats, useSupabase } from '../services/supabase'
import type { AppInfos } from './../services/utils'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'

interface AppStats extends AppInfos {
  action: string
  version?: number
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS')
    return sendRes()

  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))

  let statsDb = 'stats'
  let deviceDb = 'devices'

  // eslint-disable-next-line no-console
  console.log('event.body', event.body)
  const body = JSON.parse(event.body || '{}') as AppStats
  let {
    version_name,
    version_build,
  } = body
  const {
    platform,
    app_id,
    version_os,
    version,
    device_id,
    action,
    plugin_version = '2.3.3',
    custom_id,
    is_emulator = false,
    is_prod = true,
  } = body
  // if version_build is not semver, then make it semver
  const coerce = semver.coerce(version_build)
  if (coerce)
    version_build = coerce.version
  version_name = (version_name === 'builtin' || !version_name) ? version_build : version_name

  const device: Database['public']['Tables']['devices']['Insert'] | Database['public']['Tables']['devices_onprem']['Insert'] = {
    platform: platform as Database['public']['Enums']['platform_os'],
    device_id,
    app_id,
    plugin_version,
    os_version: version_os,
    version: version_name || 'unknown' as any,
    ...(custom_id != null ? { custom_id } : {}),
    is_emulator: is_emulator == null ? false : is_emulator,
    is_prod: is_prod == null ? true : is_prod,
  }

  const stat: Database['public']['Tables']['stats']['Insert'] = {
    platform: platform as Database['public']['Enums']['platform_os'],
    device_id,
    version: version || 0,
    action,
    app_id,
    version_build,
  }

  const all = []
  const { data } = await supabase
    .from('app_versions')
    .select('id')
    .eq('app_id', app_id)
    .or(`name.eq.${version_name},name.eq.builtin`)
    .order('id', { ascending: false })
    .limit(1)
    .single()
  if (data) {
    stat.version = data.id
    device.version = data.id
    if (!device.is_emulator && device.is_prod) {
      const { data: deviceData } = await supabase
        .from(deviceDb)
        .select()
        .eq('app_id', app_id)
        .eq('device_id', device_id)
        .single()
      if (deviceData && deviceData.version !== data.id) {
        all.push(updateVersionStats(supabase, {
          app_id,
          version_id: deviceData.version,
          devices: -1,
        }))
      }
      if (!deviceData || deviceData.version !== data.id) {
        all.push(updateVersionStats(supabase, {
          app_id,
          version_id: data.id,
          devices: 1,
        }))
      }
    }
  }
  else {
    console.error('switch to onprem', app_id)
    statsDb = `${statsDb}_onprem`
    deviceDb = `${deviceDb}_onprem`
  }
  console.error('stats', body)
  all.push(supabase
    .from(deviceDb)
    .upsert(device))
  all.push(supabase
    .from(statsDb)
    .insert(stat))
  await Promise.all(all)
  return sendRes()
}
