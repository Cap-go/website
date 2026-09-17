import {
  getPublicLiveUpdateMetrics,
  LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS,
  LIVE_UPDATE_METRICS_PATH,
} from '../lib/publicLiveUpdateMetrics'

export interface LiveUpdateMetricsEnv {
  CF_ACCOUNT_ANALYTICS_ID?: string
  CF_ANALYTICS_TOKEN?: string
}

const CACHE_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': `public, max-age=${LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS}, s-maxage=${LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS}, stale-while-revalidate=600`,
}

export async function handleLiveUpdateMetrics(request: Request, env: LiveUpdateMetricsEnv): Promise<Response> {
  const cache = typeof caches !== 'undefined' ? caches.default : undefined
  const cacheKey = new Request(new URL(LIVE_UPDATE_METRICS_PATH, request.url), { method: 'GET' })
  const cached = cache ? await cache.match(cacheKey) : undefined
  if (cached)
    return cached

  const accountId = env.CF_ACCOUNT_ANALYTICS_ID?.trim()
  const token = env.CF_ANALYTICS_TOKEN?.trim()
  if (!accountId || !token) {
    return new Response(JSON.stringify({ error: 'Live update metrics are temporarily unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  }

  try {
    const metrics = await getPublicLiveUpdateMetrics({ accountId, token })
    const response = new Response(JSON.stringify(metrics), { status: 200, headers: CACHE_HEADERS })
    cache?.put(cacheKey, response.clone())
    return response
  }
  catch (error) {
    console.error('Live update metrics query failed', error)
    return new Response(JSON.stringify({ error: 'Live update metrics are temporarily unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  }
}

export { LIVE_UPDATE_METRICS_PATH }
