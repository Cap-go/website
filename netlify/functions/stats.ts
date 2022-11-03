import type { Handler } from '@netlify/functions'
import { updateVersionStats, useSupabase } from '../services/supabase'
import type { definitions } from '../../types/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'

interface AppStats {
  platform: string
  action: string
  device_id: string
  custom_id?: string
  version_name?: string
  plugin_version?: string
  version_os?: string
  version: number
  version_build: string
  app_id: string
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
  const device: Partial<definitions['devices'] | definitions['devices_onprem']> = {
    platform: body.platform as definitions['stats']['platform'],
    device_id: body.device_id,
    custom_id: body.custom_id || '',
    app_id: body.app_id,
    plugin_version: body.plugin_version || '2.3.3',
    os_version: body.version_os,
  }

  const stat: Partial<definitions['stats']> = {
    platform: body.platform as definitions['stats']['platform'],
    device_id: body.device_id,
    action: body.action,
    app_id: body.app_id,
    version_build: body.version_build,
  }

  const all = []
  const { data, error } = await supabase
    .from<definitions['app_versions']>('app_versions')
    .select()
    .eq('app_id', body.app_id)
    .eq('name', body.version_name || 'unknown')
  if (data && data.length && !error) {
    stat.version = data[0].id
    device.version = data[0].id
    all.push(updateVersionStats(supabase, {
      app_id: body.app_id,
      version_id: data[0].id,
      devices: 1,
    }))
    const { data: deviceData, error: deviceError } = await supabase
      .from<definitions['devices']>(deviceDb)
      .select()
      .eq('app_id', body.app_id)
      .eq('device_id', body.device_id)
      .single()
    if (deviceData && !deviceError) {
      all.push(updateVersionStats(supabase, {
        app_id: body.app_id,
        version_id: deviceData.version,
        devices: -1,
      }))
    }
  }
  else {
    console.error('switch to onprem', body.app_id)
    device.version = body.version_name || 'unknown' as any
    stat.version = body.version || 0
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
