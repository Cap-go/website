import type { Handler } from '@netlify/functions'
import { useSupabase } from '../services/supabase'
import { sendRes } from './../services/utils'
import type { definitions } from '~/types/supabase'

interface AppStats {
  platform: string
  action: string
  device_id: string
  version_name?: string
  plugin_version?: string
  version: number
  version_build: string
  app_id: string
}

export const handler: Handler = async(event) => {
  if (event.httpMethod === 'OPTIONS')
    return sendRes()
  const supabase = useSupabase()
  let statsDb = 'stats'
  let deviceDb = 'devices'
  const onprem = false

  // eslint-disable-next-line no-console
  console.log('event.body', event.body)
  const body = JSON.parse(event.body || '{}') as AppStats
  const device: Partial<definitions['devices'] | definitions['devices_onprem']> = {
    platform: body.platform as definitions['stats']['platform'],
    device_id: body.device_id,
    app_id: body.app_id,
    plugin_version: body.plugin_version || '2.3.3',
  }

  const stat: Partial<definitions['stats']> = {
    platform: body.platform as definitions['stats']['platform'],
    device_id: body.device_id,
    action: body.action,
    app_id: body.app_id,
    version_build: body.version_build,
  }

  const { data, error } = await supabase
    .from<definitions['app_versions']>('app_versions')
    .select()
    .eq('app_id', body.app_id)
    .eq('name', body.version_name || 'unknown')
  if (data && data.length && !error) {
    stat.version = data[0].id
    device.version = data[0].id
  }
  else {
    device.version = body.version_name || 'unknown'
    statsDb = `${statsDb}_onprem`
    deviceDb = `${deviceDb}_onprem`
  }
  await supabase
    .from(deviceDb)
    .upsert(device)
  if (!onprem) {
    await supabase
      .from<definitions['stats']>(statsDb)
      .insert(stat)
  }
  return sendRes()
}
