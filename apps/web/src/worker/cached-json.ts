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

export async function cachedJsonResponse(
  request: Request,
  path: string,
  ttlSeconds: number,
  load: () => Promise<unknown>,
  unavailableMessage: string,
): Promise<Response> {
  const cache = workerCache()
  const cacheKey = new Request(new URL(path, request.url), { method: 'GET' })
  const cached = cache ? await cache.match(cacheKey) : undefined
  if (cached)
    return cached

  try {
    const payload = await load()
    const response = new Response(JSON.stringify(payload), { status: 200, headers: jsonCacheHeaders(ttlSeconds) })
    await cache?.put(cacheKey, response.clone())
    return response
  }
  catch (error) {
    console.error(unavailableMessage, error)
    return unavailableJson(unavailableMessage)
  }
}
