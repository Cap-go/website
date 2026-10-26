import { normalizeBuilderMetrics } from '../lib/builderMetrics'
import { BUILDER_METRICS_CACHE_TTL_SECONDS, BUILDER_METRICS_PATH } from '../lib/publicBuilderMetrics'
import { cachedJsonResponse, unavailableJson } from './cached-json'
import type { BackgroundContext } from './types'
import { fetchUpstreamJson } from './upstream-json'

export interface BuilderMetricsEnv {
  // Builder GET /stats/public.
  BUILDER_METRICS_URL?: string
}

export async function handleBuilderMetrics(request: Request, env: BuilderMetricsEnv, ctx?: BackgroundContext, fetchImpl?: typeof fetch): Promise<Response> {
  const url = env.BUILDER_METRICS_URL?.trim()
  if (!url) return unavailableJson('Builder metrics misconfigured')

  return cachedJsonResponse(
    request,
    BUILDER_METRICS_PATH,
    BUILDER_METRICS_CACHE_TTL_SECONDS,
    async () => {
      const payload = await fetchUpstreamJson(url, fetchImpl)
      // A malformed answer must not replace the last good payload.
      if (!normalizeBuilderMetrics(payload)) throw new Error('Invalid builder metrics payload')
      return payload
    },
    'Builder metrics are temporarily unavailable',
    ctx,
  )
}

export { BUILDER_METRICS_PATH }
