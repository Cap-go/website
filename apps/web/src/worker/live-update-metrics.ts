import {
  getPublicLiveUpdateMetrics,
  LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS,
  LIVE_UPDATE_METRICS_PATH,
} from '../lib/publicLiveUpdateMetrics'
import { cachedJsonResponse, unavailableJson } from './cached-json'

export interface LiveUpdateMetricsEnv {
  CF_ACCOUNT_ANALYTICS_ID?: string
  CF_ANALYTICS_TOKEN?: string
}

export async function handleLiveUpdateMetrics(request: Request, env: LiveUpdateMetricsEnv): Promise<Response> {
  const accountId = env.CF_ACCOUNT_ANALYTICS_ID?.trim()
  const token = env.CF_ANALYTICS_TOKEN?.trim()
  if (!accountId || !token)
    return unavailableJson('Live update metrics are temporarily unavailable')

  return cachedJsonResponse(
    request,
    LIVE_UPDATE_METRICS_PATH,
    LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS,
    () => getPublicLiveUpdateMetrics({ accountId, token }),
    'Live update metrics are temporarily unavailable',
  )
}

export { LIVE_UPDATE_METRICS_PATH }
