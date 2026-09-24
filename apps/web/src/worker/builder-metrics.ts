import { normalizeBuilderMetrics } from '../lib/builderMetrics'
import * as builderMetricsDatabase from '../lib/builderMetricsDatabase'
import { BUILDER_METRICS_CACHE_TTL_SECONDS, BUILDER_METRICS_PATH } from '../lib/publicBuilderMetrics'
import { cachedJsonResponse, unavailableJson } from './cached-json'

export interface BuilderMetricsEnv {
  BUILDER_DATABASE_URL?: string
}

export async function handleBuilderMetrics(request: Request, env: BuilderMetricsEnv): Promise<Response> {
  const databaseUrl = env.BUILDER_DATABASE_URL?.trim() ?? ''
  if (!databaseUrl) return unavailableJson('Builder metrics misconfigured')

  return cachedJsonResponse(
    request,
    BUILDER_METRICS_PATH,
    BUILDER_METRICS_CACHE_TTL_SECONDS,
    async () => {
      const payload = await builderMetricsDatabase.fetchPublicBuilderMetricsFromDatabase({ databaseUrl })
      const metrics = normalizeBuilderMetrics(payload)
      if (!metrics) throw new Error('Invalid builder metrics payload')
      return metrics
    },
    'Builder metrics are temporarily unavailable',
  )
}

export { BUILDER_METRICS_PATH }
