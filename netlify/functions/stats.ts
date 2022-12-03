import type { Handler } from '@netlify/functions'
import semver from 'semver'
import { updateVersionStats, useSupabase } from '../services/supabase'
import type { definitions } from '../../types/supabase'
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

  const device: Partial<definitions['devices'] | definitions['devices_onprem']> = {
    platform: platform as definitions['stats']['platform'],
    device_id,
    app_id,
    plugin_version,
    os_version: version_os,
    ...(custom_id ? { custom_id } : {}),
    is_emulator: is_emulator === undefined ? false : is_emulator,
    is_prod: is_prod === undefined ? true : is_prod,
  }

  const stat: Partial<definitions['stats']> = {
    platform: platform as definitions['stats']['platform'],
    device_id,
    action,
    app_id,
    version_build,
  }

  const all = []
  const { data, error } = await supabase
    .from<definitions['app_versions']>('app_versions')
    .select()
    .eq('app_id', app_id)
    .eq('name', version_name || 'unknown')
  if (data && data.length && !error) {
    stat.version = data[0].id
    device.version = data[0].id
    if (!device.is_emulator && device.is_prod) {
      const { data: deviceData, error: deviceError } = await supabase
        .from<definitions['devices']>(deviceDb)
        .select()
        .eq('app_id', app_id)
        .eq('device_id', device_id)
        .single()
      if (deviceData && !deviceError) {
        all.push(updateVersionStats(supabase, {
          app_id,
          version_id: deviceData.version,
          devices: -1,
        }))
      }
      all.push(updateVersionStats(supabase, {
        app_id,
        version_id: data[0].id,
        devices: 1,
      }))
    }
  }
  else {
    console.error('switch to onprem', app_id)
    device.version = version_name || 'unknown' as any
    stat.version = version || 0
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
