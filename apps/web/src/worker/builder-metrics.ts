import { normalizeBuilderMetrics } from '../lib/builderMetrics'
import { fetchPublicBuilderMetricsFromD1, type BuilderD1Database } from '../lib/builderMetricsD1'
import { BUILDER_METRICS_CACHE_TTL_SECONDS, BUILDER_METRICS_PATH } from '../lib/publicBuilderMetrics'
import { cachedJsonResponse, unavailableJson } from './cached-json'

export interface BuilderMetricsEnv {
  BUILDER_DB?: BuilderD1Database
}

export async function handleBuilderMetrics(request: Request, env: BuilderMetricsEnv): Promise<Response> {
  if (!env.BUILDER_DB) return unavailableJson('Builder metrics misconfigured')

  return cachedJsonResponse(
    request,
    BUILDER_METRICS_PATH,
    BUILDER_METRICS_CACHE_TTL_SECONDS,
    async () => {
      const payload = await fetchPublicBuilderMetricsFromD1({ db: env.BUILDER_DB! })
      const metrics = normalizeBuilderMetrics(payload)
      if (!metrics) throw new Error('Invalid builder metrics payload')
      return metrics
    },
    'Builder metrics are temporarily unavailable',
  )
}

export { BUILDER_METRICS_PATH }
