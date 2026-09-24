import { normalizeBuilderMetrics } from '../lib/builderMetrics'
import {
  BUILDER_METRICS_CACHE_TTL_SECONDS,
  BUILDER_METRICS_PATH,
  fetchPublicBuilderMetricsFromRpc,
  PUBLIC_BUILDER_SUPABASE_URL,
} from '../lib/publicBuilderMetrics'
import { cachedJsonResponse, unavailableJson } from './cached-json'

export interface BuilderMetricsEnv {
  SUPABASE_URL?: string
  SUPABASE_SERVICE_ROLE_KEY?: string
}

export async function handleBuilderMetrics(request: Request, env: BuilderMetricsEnv): Promise<Response> {
  const supabaseUrl = (env.SUPABASE_URL || PUBLIC_BUILDER_SUPABASE_URL).trim()
  const apiKey = env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? ''
  if (!apiKey)
    return unavailableJson('Builder metrics misconfigured')

  return cachedJsonResponse(
    request,
    BUILDER_METRICS_PATH,
    BUILDER_METRICS_CACHE_TTL_SECONDS,
    async () => {
      const payload = await fetchPublicBuilderMetricsFromRpc({ supabaseUrl, apiKey })
      const metrics = normalizeBuilderMetrics(payload)
      if (!metrics)
        throw new Error('Invalid builder metrics payload')
      return metrics
    },
    'Builder metrics are temporarily unavailable',
  )
}

export { BUILDER_METRICS_PATH }
