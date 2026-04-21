import { defaultLocale, locales } from '../../services/locale'
import { ToolInputError, createAndroidKeystoreBundle, createIosCertificateBundle, normalizeAndroidKeystoreInput, normalizeIosCertificateInput } from './signing'
import { createUdidMobileconfig, decodePayload, encodePayload, extractPlistXml, parseUdidDevicePayload, signMobileconfig } from './udid'

export interface ToolApiEnv {
  IOS_UDID_PROFILE_SIGNING_CERT_PEM?: string
  IOS_UDID_PROFILE_SIGNING_KEY_PEM?: string
  IOS_UDID_PROFILE_SIGNING_CHAIN_PEM?: string
}

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store',
}

const UDID_RESULT_COOKIE = 'ios_udid_payload'
const UDID_CHALLENGE_COOKIE = 'ios_udid_challenge'
const UDID_RESULT_PATH = '/tools/ios-udid-finder/result/'
const UDID_RESULT_API_PATH = '/api/tools/ios-udid-finder/result'
const UDID_CALLBACK_PATH = '/api/tools/ios-udid-finder/callback'
const HEAVY_TOOL_RATE_LIMIT = 10
const HEAVY_TOOL_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const HEAVY_TOOL_RATE_LIMIT_MAX_ENTRIES = 2048

type RequestGuard = (request: Request) => Response | null

type RateLimiterOptions = {
  limit: number
  windowMs: number
  maxEntries?: number
  errorMessage?: string
}

type RateLimitEntry = {
  count: number
  lastAccess: number
  resetAt: number
}

function webJson(body: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...headers,
    },
  })
}

function redirect(path: string, status = 302, headers: HeadersInit = {}): Response {
  return new Response(null, {
    status,
    headers: {
      ...NO_STORE_HEADERS,
      ...headers,
      Location: path,
    },
  })
}

function getCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get('Cookie')
  if (!cookies) return null

  const prefix = `${name}=`
  for (const cookie of cookies.split(';')) {
    const trimmed = cookie.trim()
    if (trimmed.startsWith(prefix)) {
      return trimmed.slice(prefix.length)
    }
  }

  return null
}

function getClientIdentifier(request: Request): string {
  const forwardedFor =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('true-client-ip') ??
    request.headers.get('fly-client-ip')

  if (forwardedFor) {
    const [firstHop] = forwardedFor.split(',')
    const normalized = firstHop?.trim()
    if (normalized) {
      return normalized
    }
  }

  const userAgent = request.headers.get('user-agent')?.trim()
  return userAgent ? `ua:${userAgent}` : 'anonymous'
}

function pruneExpiredRateLimitEntries(entries: Map<string, RateLimitEntry>, now: number): void {
  for (const [key, entry] of entries) {
    if (entry.resetAt <= now) {
      entries.delete(key)
    }
  }
}

function evictLeastRecentlyUsedEntry(entries: Map<string, RateLimitEntry>): void {
  let oldestKey: string | null = null
  let oldestAccess = Number.POSITIVE_INFINITY

  for (const [key, entry] of entries) {
    if (entry.lastAccess < oldestAccess) {
      oldestKey = key
      oldestAccess = entry.lastAccess
    }
  }

  if (oldestKey) {
    entries.delete(oldestKey)
  }
}

function createRateLimiter({
  limit,
  windowMs,
  maxEntries = HEAVY_TOOL_RATE_LIMIT_MAX_ENTRIES,
  errorMessage = 'Too many requests. Please wait a few minutes and try again.',
}: RateLimiterOptions): RequestGuard {
  const entries = new Map<string, RateLimitEntry>()
  let nextPruneAt = 0

  return (request) => {
    const now = Date.now()
    if (now >= nextPruneAt) {
      pruneExpiredRateLimitEntries(entries, now)
      nextPruneAt = now + windowMs
    }

    const clientId = getClientIdentifier(request)
    const existing = entries.get(clientId)

    if (!existing || existing.resetAt <= now) {
      if (!existing && entries.size >= maxEntries) {
        evictLeastRecentlyUsedEntry(entries)
      }

      entries.set(clientId, {
        count: 1,
        lastAccess: now,
        resetAt: now + windowMs,
      })
      return null
    }

    existing.lastAccess = now

    if (existing.count >= limit) {
      const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
      return webJson({ error: errorMessage }, 429, {
        'Retry-After': String(retryAfter),
      })
    }

    existing.count += 1
    return null
  }
}

function appendCookie(headers: Headers, name: string, value: string, path: string, maxAge: number, secure: boolean, httpOnly = false): void {
  headers.append('Set-Cookie', `${name}=${value}; Max-Age=${maxAge}; Path=${path}; SameSite=Lax${secure ? '; Secure' : ''}${httpOnly ? '; HttpOnly' : ''}`)
}

function hasMatchingChallenge(expectedChallenge: string, cookieChallenge: string | null, payloadChallenge: string | undefined): boolean {
  return Boolean(expectedChallenge) && Boolean(cookieChallenge) && Boolean(payloadChallenge) && expectedChallenge === cookieChallenge && payloadChallenge === expectedChallenge
}

function normalizeLocale(locale: string | null): string | null {
  if (!locale) return null
  const normalized = locale.trim().toLowerCase()
  return locales.includes(normalized as (typeof locales)[number]) ? normalized : null
}

function getUdidResultPath(locale: string | null): string {
  return locale && locale !== defaultLocale ? `/${locale}${UDID_RESULT_PATH}` : UDID_RESULT_PATH
}

async function parseJsonBody(request: Request): Promise<Record<string, unknown>> {
  const body = await request.json()
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new SyntaxError('Invalid body')
  }
  return body as Record<string, unknown>
}

async function handleSigningRequest<TInput, TResponse>(
  request: Request,
  normalize: (input: Record<string, unknown>) => TInput,
  create: (input: TInput) => Promise<TResponse>,
  validationMessage: string,
  internalErrorMessage: string,
  logLabel: string,
): Promise<Response> {
  try {
    const body = await parseJsonBody(request)
    const input = normalize(body)
    const payload = await create(input)
    return webJson(payload)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return webJson({ error: validationMessage }, 400)
    }

    if (error instanceof ToolInputError) {
      return webJson({ error: error.message }, 400)
    }

    console.error(logLabel, error)
    return webJson({ error: internalErrorMessage }, 500)
  }
}

async function handleUdidProfile(request: Request, env: ToolApiEnv): Promise<Response> {
  try {
    const baseUrl = new URL(request.url)
    const challenge = crypto.randomUUID()
    const locale = normalizeLocale(baseUrl.searchParams.get('locale'))
    const callbackUrl = new URL(UDID_CALLBACK_PATH, baseUrl)
    callbackUrl.searchParams.set('challenge', challenge)
    if (locale) {
      callbackUrl.searchParams.set('locale', locale)
    }

    const profile = createUdidMobileconfig({
      callbackUrl: callbackUrl.toString(),
      organization: 'Capgo',
      displayName: 'Capgo Device Identifier',
      description: 'Install this profile to retrieve your iPhone or iPad UDID and device details.',
      challenge,
    })

    const signedProfile = await signMobileconfig(profile, {
      certificatePem: env.IOS_UDID_PROFILE_SIGNING_CERT_PEM,
      privateKeyPem: env.IOS_UDID_PROFILE_SIGNING_KEY_PEM,
      chainPem: env.IOS_UDID_PROFILE_SIGNING_CHAIN_PEM,
    })

    const secure = baseUrl.protocol === 'https:'
    const headers = new Headers({
      'Cache-Control': 'no-store',
      'Content-Disposition': 'attachment; filename="capgo-udid.mobileconfig"',
      'Content-Type': 'application/x-apple-aspen-config',
    })
    appendCookie(headers, UDID_CHALLENGE_COOKIE, challenge, UDID_CALLBACK_PATH, 300, secure, true)

    return new Response(signedProfile ? new Uint8Array(signedProfile) : profile, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Unexpected UDID profile generation failure', error)
    return webJson({ error: 'Internal server error generating the UDID profile.' }, 500)
  }
}

async function handleUdidCallback(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const locale = normalizeLocale(requestUrl.searchParams.get('locale'))

  if (request.method === 'GET') {
    return redirect(locale && locale !== defaultLocale ? `/${locale}/tools/ios-udid-finder/` : '/tools/ios-udid-finder/')
  }

  const rawBody = await request.text()
  const plistXml = extractPlistXml(rawBody)
  if (!plistXml) {
    return webJson({ error: 'The device response did not include a plist payload.' }, 400)
  }

  const payload = parseUdidDevicePayload(plistXml)
  const expectedChallenge = requestUrl.searchParams.get('challenge') ?? ''
  const cookieChallenge = getCookie(request, UDID_CHALLENGE_COOKIE)

  if (!hasMatchingChallenge(expectedChallenge, cookieChallenge, payload.challenge)) {
    return webJson({ error: 'The device response challenge did not match the active UDID session.' }, 400)
  }

  const secure = requestUrl.protocol === 'https:'
  const headers = new Headers({
    ...NO_STORE_HEADERS,
    Location: getUdidResultPath(locale),
  })
  appendCookie(headers, UDID_RESULT_COOKIE, encodePayload(payload), UDID_RESULT_API_PATH, 300, secure, true)
  appendCookie(headers, UDID_CHALLENGE_COOKIE, '', UDID_CALLBACK_PATH, 0, secure, true)

  return new Response(null, {
    status: 302,
    headers,
  })
}

async function handleUdidResult(request: Request): Promise<Response> {
  const secure = new URL(request.url).protocol === 'https:'
  const headers = new Headers(NO_STORE_HEADERS)
  appendCookie(headers, UDID_RESULT_COOKIE, '', UDID_RESULT_API_PATH, 0, secure, true)
  return webJson({ payload: decodePayload(getCookie(request, UDID_RESULT_COOKIE)) }, 200, headers)
}

function methodNotAllowed(): Response {
  return webJson({ error: 'Method not allowed.' }, 405)
}

type RouteHandler = (request: Request, env: ToolApiEnv) => Promise<Response>

type RouteDefinition = {
  methods: readonly string[]
  handle: RouteHandler
}

function withRequestGuard(guard: RequestGuard, handle: RouteHandler): RouteHandler {
  return async (request, env) => {
    const response = guard(request)
    if (response) {
      return response
    }

    return await handle(request, env)
  }
}

const iosCertificateRateLimiter = createRateLimiter({
  limit: HEAVY_TOOL_RATE_LIMIT,
  maxEntries: HEAVY_TOOL_RATE_LIMIT_MAX_ENTRIES,
  windowMs: HEAVY_TOOL_RATE_LIMIT_WINDOW_MS,
})

const androidKeystoreRateLimiter = createRateLimiter({
  limit: HEAVY_TOOL_RATE_LIMIT,
  maxEntries: HEAVY_TOOL_RATE_LIMIT_MAX_ENTRIES,
  windowMs: HEAVY_TOOL_RATE_LIMIT_WINDOW_MS,
})

const iosUdidProfileRateLimiter = createRateLimiter({
  limit: HEAVY_TOOL_RATE_LIMIT,
  maxEntries: HEAVY_TOOL_RATE_LIMIT_MAX_ENTRIES,
  windowMs: HEAVY_TOOL_RATE_LIMIT_WINDOW_MS,
})

const toolRouteDefinitions: Record<string, RouteDefinition> = {
  '/api/tools/android-keystore-generator': {
    methods: ['POST'],
    handle: withRequestGuard(
      androidKeystoreRateLimiter,
      async (request) =>
        await handleSigningRequest(
          request,
          normalizeAndroidKeystoreInput,
          createAndroidKeystoreBundle,
          'Unable to validate the Android keystore request.',
          'Internal server error generating the Android keystore.',
          'Unexpected Android keystore generation failure',
        ),
    ),
  },
  '/api/tools/ios-certificate-generator': {
    methods: ['POST'],
    handle: withRequestGuard(
      iosCertificateRateLimiter,
      async (request) =>
        await handleSigningRequest(
          request,
          normalizeIosCertificateInput,
          createIosCertificateBundle,
          'Unable to validate the iOS certificate request.',
          'Internal server error generating the iOS certificate request.',
          'Unexpected iOS certificate generation failure',
        ),
    ),
  },
  '/api/tools/ios-udid-finder/profile': {
    methods: ['GET'],
    handle: withRequestGuard(iosUdidProfileRateLimiter, async (request, env) => await handleUdidProfile(request, env)),
  },
  '/api/tools/ios-udid-finder/callback': {
    methods: ['GET', 'POST'],
    handle: async (request) => await handleUdidCallback(request),
  },
  '/api/tools/ios-udid-finder/result': {
    methods: ['GET'],
    handle: async (request) => await handleUdidResult(request),
  },
}

export async function handleToolApiRequest(request: Request, env: ToolApiEnv, pathname = new URL(request.url).pathname): Promise<Response | null> {
  const route = toolRouteDefinitions[pathname]
  if (!route) return null
  if (!route.methods.includes(request.method)) return methodNotAllowed()
  return await route.handle(request, env)
}
