import {
  ToolInputError,
  createAndroidKeystoreBundle,
  createIosCertificateBundle,
  normalizeAndroidKeystoreInput,
  normalizeIosCertificateInput,
} from '../lib/tools/signing'
import {
  createUdidMobileconfig,
  decodePayload,
  encodePayload,
  extractPlistXml,
  parseUdidDevicePayload,
  signMobileconfig,
} from '../lib/tools/udid'
import { defaultLocale, locales } from '../services/locale'

interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
  PERSONAL_ACCESS_TOKEN?: string
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

function appendCookie(headers: Headers, name: string, value: string, path: string, maxAge: number, secure: boolean, httpOnly = false): void {
  headers.append(
    'Set-Cookie',
    `${name}=${value}; Max-Age=${maxAge}; Path=${path}; SameSite=Lax${secure ? '; Secure' : ''}${httpOnly ? '; HttpOnly' : ''}`,
  )
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

async function handleSponsors(env: Env): Promise<Response> {
  const token = env.PERSONAL_ACCESS_TOKEN?.trim()
  if (!token) {
    return webJson([], 500)
  }

  const query = `
    query {
      riderx: user(login: "riderx") {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              ... on User {
                login
                name
                url
                avatarUrl
              }
              ... on Organization {
                login
                avatarUrl
                url
                name
              }
            }
            isActive
            tier {
              monthlyPriceInDollars
            }
          }
        }
      }
      capgo: organization(login: "Cap-go") {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              ... on User {
                login
                name
                avatarUrl
                url
              }
              ... on Organization {
                login
                avatarUrl
                url
                name
              }
            }
            isActive
            tier {
              monthlyPriceInDollars
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('GitHub API error:', response.status, response.statusText, body)
      return webJson([], 500)
    }

    const data = await response.json()
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      return webJson([], 500)
    }

    const riderxNodes = data?.data?.riderx?.sponsorshipsAsMaintainer?.nodes || []
    const capgoNodes = data?.data?.capgo?.sponsorshipsAsMaintainer?.nodes || []
    const allSponsors = [...riderxNodes, ...capgoNodes]
    const calculateTier = (sponsorship: any) => {
      const tier = sponsorship?.tier?.monthlyPriceInDollars ?? 0
      if (tier >= 100) return 'platinum'
      if (tier >= 50) return 'gold'
      if (tier >= 25) return 'silver'
      return 'baker'
    }

    return webJson(
      allSponsors.map((sponsorship) => {
        const sponsor = sponsorship.sponsorEntity
        return {
          id: sponsor.login,
          name: sponsor.name || sponsor.login,
          imageUrl: sponsor.avatarUrl,
          url: sponsor.url,
          tier: calculateTier(sponsorship),
        }
      }),
    )
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return webJson([], 500)
  }
}

async function handleStatus(): Promise<Response> {
  try {
    const response = await fetch('https://status.capgo.app/status.json')
    if (!response.ok) {
      console.error('Status API error:', response.status, response.statusText)
      return webJson({ indicator: 'unknown', uptime: 'N/A' }, 500)
    }
    const data = await response.json()
    return webJson(data)
  } catch (error) {
    console.error('Error fetching status:', error)
    return webJson({ indicator: 'unknown', uptime: 'N/A' }, 500)
  }
}

async function handleUdidProfile(request: Request, env: Env): Promise<Response> {
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

type RouteDefinition = {
  methods: readonly string[],
  handle: (request: Request, env: Env) => Promise<Response>,
}

const routeDefinitions: Record<string, RouteDefinition> = {
  '/sponsors.json': {
    methods: ['GET'],
    handle: async (_request, env) => await handleSponsors(env),
  },
  '/status.json': {
    methods: ['GET'],
    handle: async () => await handleStatus(),
  },
  '/api/tools/android-keystore-generator': {
    methods: ['POST'],
    handle: async (request) => await handleSigningRequest(
      request,
      normalizeAndroidKeystoreInput,
      createAndroidKeystoreBundle,
      'Unable to validate the Android keystore request.',
      'Internal server error generating the Android keystore.',
      'Unexpected Android keystore generation failure',
    ),
  },
  '/api/tools/ios-certificate-generator': {
    methods: ['POST'],
    handle: async (request) => await handleSigningRequest(
      request,
      normalizeIosCertificateInput,
      createIosCertificateBundle,
      'Unable to validate the iOS certificate request.',
      'Internal server error generating the iOS certificate request.',
      'Unexpected iOS certificate generation failure',
    ),
  },
  '/api/tools/ios-udid-finder/profile': {
    methods: ['GET'],
    handle: async (request, env) => await handleUdidProfile(request, env),
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

async function handleRouteRequest(request: Request, env: Env, pathname: string): Promise<Response | null> {
  const route = routeDefinitions[pathname]
  if (!route) return null
  if (!route.methods.includes(request.method)) return methodNotAllowed()
  return await route.handle(request, env)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname
    const routeResponse = await handleRouteRequest(request, env, pathname)
    if (routeResponse) return routeResponse
    return await env.ASSETS.fetch(request)
  },
}
