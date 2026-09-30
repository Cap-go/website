// First-party reverse proxy for PostHog (EU cloud), so analytics scripts and events load from capgo.app.
// Setup and verification steps: docs/posthog-proxy-setup.md
// Static SDK files come from the assets host, everything else (events, flags, replay) from the ingestion host.
// The path avoids words like "analytics" or "posthog" that ad blockers match on.

export const POSTHOG_PROXY_PREFIX = '/cg-relay'

const POSTHOG_API_HOST = 'eu.i.posthog.com'
const POSTHOG_ASSETS_HOST = 'eu-assets.i.posthog.com'

type CacheStorageWithDefault = CacheStorage & { default?: Cache }
type BackgroundContext = { waitUntil?: (promise: Promise<unknown>) => void }

export function isPostHogProxyPath(pathname: string): boolean {
  return pathname === POSTHOG_PROXY_PREFIX || pathname.startsWith(`${POSTHOG_PROXY_PREFIX}/`)
}

export async function handlePostHogProxy(request: Request, ctx?: BackgroundContext): Promise<Response> {
  const url = new URL(request.url)
  const upstreamPath = url.pathname.slice(POSTHOG_PROXY_PREFIX.length) || '/'
  const isStatic = upstreamPath.startsWith('/static/')
  const upstreamUrl = new URL(`https://${isStatic ? POSTHOG_ASSETS_HOST : POSTHOG_API_HOST}${upstreamPath}${url.search}`)

  const headers = new Headers(request.headers)
  headers.delete('cookie')
  headers.set('host', upstreamUrl.host)
  const clientIp = request.headers.get('cf-connecting-ip')
  if (clientIp) headers.set('x-forwarded-for', clientIp)

  const upstreamRequest = new Request(upstreamUrl.toString(), {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
    // Pass upstream redirects back to the client: a streamed POST body cannot be replayed on 307/308.
    redirect: 'manual',
  })

  const cacheStorage = typeof caches === 'undefined' ? undefined : (caches as CacheStorageWithDefault)
  const cache = isStatic && request.method === 'GET' ? cacheStorage?.default : undefined
  if (cache) {
    const cached = await cache.match(upstreamRequest)
    if (cached) return cached
  }

  const response = await fetch(upstreamRequest)
  if (cache && response.ok) {
    const cacheable = new Response(response.body, response)
    cacheable.headers.set('Cache-Control', 'public, max-age=14400')
    const put = cache.put(upstreamRequest, cacheable.clone())
    if (ctx?.waitUntil) ctx.waitUntil(put)
    else await put
    return cacheable
  }
  return response
}
