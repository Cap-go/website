import type { BackgroundContext } from './types'

// Last good payload is kept this long so a cold or failing refresh never leaves clients empty.
const STALE_TTL_SECONDS = 7 * 24 * 60 * 60
// Browsers re-check stale payloads quickly so they pick up the background refresh.
const STALE_CLIENT_TTL_SECONDS = 60

const inFlightRefreshes = new Map<string, Promise<string>>()

export function workerCache(): Cache | undefined {
  const store = caches as CacheStorage & { default?: Cache }
  return store.default
}

export function jsonCacheHeaders(ttlSeconds: number) {
  return {
    'Content-Type': 'application/json',
    'Cache-Control': `public, max-age=${ttlSeconds}, s-maxage=${ttlSeconds}, stale-while-revalidate=600`,
  }
}

export function unavailableJson(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 503,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function jsonResponse(body: string, ttlSeconds: number) {
  return new Response(body, { status: 200, headers: jsonCacheHeaders(ttlSeconds) })
}

export async function cachedJsonResponse(
  request: Request,
  path: string,
  ttlSeconds: number,
  load: () => Promise<unknown>,
  unavailableMessage: string,
  ctx?: BackgroundContext,
): Promise<Response> {
  const cache = workerCache()
  const freshKey = new Request(new URL(path, request.url), { method: 'GET' })
  const staleKey = new Request(new URL(`${path}?stale`, request.url), { method: 'GET' })
  const cached = cache ? await cache.match(freshKey) : undefined
  if (cached)
    return cached

  const stale = cache ? await cache.match(staleKey) : undefined
  const staleBody = stale ? await stale.text() : null

  const refresh = () => {
    const existing = inFlightRefreshes.get(path)
    if (existing)
      return existing
    const promise = (async () => {
      const body = JSON.stringify(await load())
      await Promise.all([
        cache?.put(freshKey, jsonResponse(body, ttlSeconds)),
        cache?.put(staleKey, new Response(body, { headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${STALE_TTL_SECONDS}` } })),
      ])
      return body
    })().finally(() => inFlightRefreshes.delete(path))
    inFlightRefreshes.set(path, promise)
    return promise
  }

  if (staleBody !== null && ctx) {
    ctx.waitUntil(refresh().catch((error) => console.error(unavailableMessage, error)))
    return jsonResponse(staleBody, STALE_CLIENT_TTL_SECONDS)
  }

  try {
    return jsonResponse(await refresh(), ttlSeconds)
  }
  catch (error) {
    console.error(unavailableMessage, error)
    if (staleBody !== null)
      return jsonResponse(staleBody, STALE_CLIENT_TTL_SECONDS)
    return unavailableJson(unavailableMessage)
  }
}
