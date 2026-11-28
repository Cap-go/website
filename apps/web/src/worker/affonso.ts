// Affonso affiliate clicks, tracked from the Worker instead of Affonso's browser pixel.
// The pixel failed whenever it loaded late or was blocked, so referred visitors were
// sometimes never recorded. The Worker records the click with Affonso's API and stores
// the click id in the same `affonso_referral` cookie the pixel used, so the console and
// Stripe Checkout keep reading it unchanged. The Capgo API records the signup.

export interface AffonsoEnv {
  AFFONSO_API_KEY?: string
}

export const AFFONSO_REFERRAL_COOKIE = 'affonso_referral'
export const AFFONSO_PROGRAM_ID = 'cmrf1otzw000iftgnev91n1xa'
const AFFONSO_CLICKS_URL = 'https://api.affonso.io/v1/clicks'
// Same lifetime the pixel used (data-cookie_duration="30").
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30
const REQUEST_TIMEOUT_MS = 1500
// Query parameters the Affonso pixel accepted as the affiliate tracking id, in its order.
const TRACKING_PARAMS = ['affonso', 'atp', 'aff', 'via', 'ref'] as const
const TRACKING_ID = /^[\w.-]{1,255}$/
const CLICK_ID = /^[\w-]{1,200}$/

const OPTIONAL_PARAMS: Record<string, string> = {
  sub1: 'sub1',
  sub2: 'sub2',
  sub3: 'sub3',
  sub4: 'sub4',
  sub5: 'sub5',
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
  gclid: 'gclid',
  fbclid: 'fbclid',
  msclkid: 'msclkid',
  ttclid: 'ttclid',
}

type FetchLike = (input: string, init: RequestInit) => Promise<Response>

export function getAffonsoTrackingId(url: URL): string | null {
  for (const name of TRACKING_PARAMS) {
    const value = url.searchParams.get(name)?.trim()
    if (value) return TRACKING_ID.test(value) ? value : null
  }
  return null
}

// Only real page navigations count as a click. Crawlers and prefetches do not send
// these headers, and the pixel never ran for them either.
function isBrowserNavigation(request: Request): boolean {
  if (request.method !== 'GET') return false
  if (request.headers.get('Sec-Fetch-Dest') !== 'document') return false
  const purpose = `${request.headers.get('Sec-Purpose') ?? ''} ${request.headers.get('Purpose') ?? ''}`
  return !/prefetch|prerender/i.test(purpose)
}

// Shared with console.capgo.app, which reads the cookie when it starts a checkout.
function cookieDomain(hostname: string): string {
  return hostname === 'capgo.app' || hostname.endsWith('.capgo.app') ? '; Domain=capgo.app' : ''
}

export function affonsoReferralCookie(clickId: string, url: URL): string {
  const secure = url.protocol === 'https:' ? '; Secure' : ''
  // Not HttpOnly: the console reads it from document.cookie.
  return `${AFFONSO_REFERRAL_COOKIE}=${encodeURIComponent(clickId)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}${cookieDomain(url.hostname)}; SameSite=Lax${secure}`
}

function buildClickBody(request: Request, url: URL, trackingId: string): Record<string, string> {
  const body: Record<string, string> = { programId: AFFONSO_PROGRAM_ID, trackingId }
  const referrer = request.headers.get('Referer')
  if (referrer) body.referrer = referrer.slice(0, 2000)
  const userAgent = request.headers.get('User-Agent')
  if (userAgent) body.userAgent = userAgent.slice(0, 1000)
  // Affonso uses the visitor IP for its fraud checks, as it did when the pixel called it.
  const ip = request.headers.get('CF-Connecting-IP')
  if (ip) body.ip = ip.slice(0, 45)
  for (const [param, field] of Object.entries(OPTIONAL_PARAMS)) {
    const value = url.searchParams.get(param)
    if (value) body[field] = value.slice(0, 255)
  }
  return body
}

export async function trackAffonsoClick(request: Request, url: URL, trackingId: string, apiKey: string, fetcher: FetchLike = fetch): Promise<string | null> {
  try {
    const response = await fetcher(AFFONSO_CLICKS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildClickBody(request, url, trackingId)),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    if (!response.ok) {
      // 4xx means an unknown or unapproved tracking id; ?ref= is also used by non-affiliate links.
      console.warn('Affonso click not recorded', response.status, trackingId)
      return null
    }
    const payload = (await response.json()) as { data?: { id?: unknown } }
    const clickId = payload?.data?.id
    return typeof clickId === 'string' && CLICK_ID.test(clickId) ? clickId : null
  } catch (error) {
    console.error('Affonso click tracking failed', error)
    return null
  }
}

export async function withAffonsoClick(request: Request, response: Response, env: AffonsoEnv, fetcher: FetchLike = fetch): Promise<Response> {
  const apiKey = env.AFFONSO_API_KEY?.trim()
  if (!apiKey || !isBrowserNavigation(request)) return response
  if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return response
  const url = new URL(request.url)
  const trackingId = getAffonsoTrackingId(url)
  if (!trackingId) return response

  const clickId = await trackAffonsoClick(request, url, trackingId, apiKey, fetcher)
  if (!clickId) return response
  const headers = new Headers(response.headers)
  headers.append('Set-Cookie', affonsoReferralCookie(clickId, url))
  // The cookie is per visitor: never let a shared cache store this response.
  headers.set('Cache-Control', 'private, no-store')
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}
