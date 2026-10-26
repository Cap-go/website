import { normalizeLiveUpdateMetrics } from '../lib/liveUpdateMetrics'
import { LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS, LIVE_UPDATE_METRICS_PATH } from '../lib/publicLiveUpdateMetrics'
import { cachedJsonResponse, unavailableJson } from './cached-json'
import type { BackgroundContext } from './types'
import { fetchUpstreamJson } from './upstream-json'

export interface LiveUpdateMetricsEnv {
  // Capgo GET /private/website_stats/live_updates.
  LIVE_UPDATE_METRICS_URL?: string
}

export async function handleLiveUpdateMetrics(request: Request, env: LiveUpdateMetricsEnv, ctx?: BackgroundContext, fetchImpl?: typeof fetch): Promise<Response> {
  const url = env.LIVE_UPDATE_METRICS_URL?.trim()
  if (!url) return unavailableJson('Live update metrics are temporarily unavailable')

  return cachedJsonResponse(
    request,
    LIVE_UPDATE_METRICS_PATH,
    LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS,
    async () => {
      const payload = await fetchUpstreamJson(url, fetchImpl)
      // A malformed answer must not replace the last good payload; every reader gets the normalized one.
      const metrics = normalizeLiveUpdateMetrics(payload)
      if (!metrics) throw new Error('Invalid live update metrics payload')
      return metrics
    },
    'Live update metrics are temporarily unavailable',
    ctx,
  )
}

export { LIVE_UPDATE_METRICS_PATH }
