type RateLimitEntry = {
  count: number
  lastAccess: number
  resetAt: number
}

const SUBSCRIBE_RATE_LIMIT = 5
const SUBSCRIBE_RATE_WINDOW_MS = 10 * 60 * 1000
const SUBSCRIBE_RATE_MAX_ENTRIES = 2048

const subscribeEntries = new Map<string, RateLimitEntry>()
let subscribeNextPruneAt = 0

function getClientIdentifier(request: Request): string {
  const forwardedFor =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('true-client-ip')

  if (forwardedFor) {
    const [firstHop] = forwardedFor.split(',')
    const normalized = firstHop?.trim()
    if (normalized) return normalized
  }

  const userAgent = request.headers.get('user-agent')?.trim()
  return userAgent ? `ua:${userAgent}` : 'anonymous'
}

function pruneExpired(entries: Map<string, RateLimitEntry>, now: number): void {
  for (const [key, entry] of entries) {
    if (entry.resetAt <= now) entries.delete(key)
  }
}

export function securityAdvisorySubscribeRateLimitResponse(request: Request): Response | null {
  const now = Date.now()
  if (now >= subscribeNextPruneAt) {
    pruneExpired(subscribeEntries, now)
    subscribeNextPruneAt = now + SUBSCRIBE_RATE_WINDOW_MS
  }

  const clientId = getClientIdentifier(request)
  const existing = subscribeEntries.get(clientId)

  if (!existing || existing.resetAt <= now) {
    subscribeEntries.set(clientId, { count: 1, lastAccess: now, resetAt: now + SUBSCRIBE_RATE_WINDOW_MS })
    return null
  }

  existing.lastAccess = now
  if (existing.count >= SUBSCRIBE_RATE_LIMIT) {
    const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    return new Response(JSON.stringify({ error: 'rate_limited' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Retry-After': String(retryAfter),
      },
    })
  }

  existing.count += 1
  return null
}
