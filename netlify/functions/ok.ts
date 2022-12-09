import type { Handler } from '@netlify/functions'
import { useSupabase } from '../services/supabase'
import { findEnv, getRightKey, sendRes, transformEnvVar } from './../services/utils'

interface Params {
  service: string
}

export const handler: Handler = async (event) => {
  const body = event.queryStringParameters as any as Params
  const supabase = useSupabase(getRightKey(findEnv(event.rawUrl), 'supa_url'), transformEnvVar(findEnv(event.rawUrl), 'SUPABASE_ADMIN_KEY'))

  const service = body.service
  // eslint-disable-next-line no-console
  console.log('service', service)
  if (service === 'database') {
    const { data, error } = await supabase
      .from('apps')
      .select()
      .eq('app_id', 'unknow.unknow')
      .single()
    if (data && !error)
      return sendRes({ status: 'ok', service })
    return sendRes({ error: 'db not answering as expected', service }, 500)
  }
  return sendRes()
}
