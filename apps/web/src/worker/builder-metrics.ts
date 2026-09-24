import { normalizeBuilderMetrics } from '../lib/builderMetrics'
import {
  BUILDER_METRICS_CACHE_TTL_SECONDS,
  BUILDER_METRICS_PATH,
  fetchPublicBuilderMetricsFromRpc,
  PUBLIC_BUILDER_SUPABASE_ANON_KEY,
  PUBLIC_BUILDER_SUPABASE_URL,
} from '../lib/publicBuilderMetrics'
import { cachedJsonResponse, unavailableJson } from './cached-json'

export interface BuilderMetricsEnv {
  SUPABASE_URL?: string
  SUPABASE_ANON_KEY?: string
}

export async function handleBuilderMetrics(request: Request, env: BuilderMetricsEnv): Promise<Response> {
  const supabaseUrl = (env.SUPABASE_URL || PUBLIC_BUILDER_SUPABASE_URL).trim()
  const anonKey = (env.SUPABASE_ANON_KEY?.trim() || PUBLIC_BUILDER_SUPABASE_ANON_KEY).trim()
  if (!anonKey)
    return unavailableJson('Builder metrics misconfigured')

  return cachedJsonResponse(
    request,
    BUILDER_METRICS_PATH,
    BUILDER_METRICS_CACHE_TTL_SECONDS,
    async () => {
      const payload = await fetchPublicBuilderMetricsFromRpc({ supabaseUrl, anonKey })
      const metrics = normalizeBuilderMetrics(payload)
      if (!metrics)
        throw new Error('Invalid builder metrics payload')
      return metrics
    },
    'Builder metrics are temporarily unavailable',
  )
}

export { BUILDER_METRICS_PATH }
