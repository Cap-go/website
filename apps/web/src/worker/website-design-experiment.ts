import {
  createWebsiteDesignAssignment,
  isWebsiteExperimentBot,
  LANDING_POSTHOG_PROJECT_KEY,
  readWebsiteDesignAssignment,
  WEBSITE_DESIGN_EXPERIMENT,
  WEBSITE_DESIGN_INTERNAL_PREFIX,
  WEBSITE_DESIGN_SIGNUP_PATH,
  websiteDesignCookie,
  websiteDesignProperties,
  websiteDesignRoute,
  type WebsiteDesignAssignment,
} from '../lib/websiteDesignExperiment'
import type { BackgroundContext } from './types'

export interface WebsiteDesignEnv {
  ASSETS: { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> }
  WEBSITE_DESIGN_EXPERIMENT?: string
}

const noStore = { 'Cache-Control': 'private, no-store' }
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...noStore, 'Content-Type': 'application/json' } })

function isPreview(url: URL) {
  return ['localhost', '127.0.0.1', 'development.capgo.app'].includes(url.hostname)
}

function metadataHtml(assignment: WebsiteDesignAssignment) {
  return `<meta name="website-design-experiment" content="${WEBSITE_DESIGN_EXPERIMENT}"><meta name="website-design-variant" content="${assignment.variant}"><meta name="website-design-visitor" content="${assignment.visitorId}"><meta name="website-design-issued-at" content="${assignment.issuedAt}">`
}

export async function websiteDesignHtmlResponse(request: Request, env: WebsiteDesignEnv): Promise<Response | null> {
  const url = new URL(request.url)
  let decodedPath: string
  try {
    decodedPath = decodeURIComponent(url.pathname)
  } catch {
    return new Response('Bad path', { status: 400 })
  }
  if (/^\/+website-experiment(?:\/|$)/.test(decodedPath)) {
    return new Response('Not found', { status: 404, headers: { ...noStore, 'X-Robots-Tag': 'noindex' } })
  }
  if (env.WEBSITE_DESIGN_EXPERIMENT !== WEBSITE_DESIGN_EXPERIMENT || request.method !== 'GET') return null
  if (url.hostname !== 'capgo.app' && !isPreview(url)) return null
  // Translated pages have a separate shared HTML cache; never personalize its English source.
  const translationLocale = request.headers.get('X-Capgo-Translation-Locale')
  // Also fail closed for older translation deployments that do not distinguish
  // English pass-through from translated source fetches yet.
  if ((translationLocale && translationLocale !== 'en') || (!translationLocale && request.headers.has('X-Capgo-Translation-Origin'))) return null
  const forced = isPreview(url) ? url.searchParams.get('website_variant') : null
  if (isWebsiteExperimentBot(request.headers.get('user-agent') || '') && !forced) return null
  const route = websiteDesignRoute(url.pathname)
  if (!route) return null
  if (url.pathname !== route) {
    url.pathname = route
    return new Response(null, { status: 301, headers: { ...noStore, Location: url.toString() } })
  }
  const saved = readWebsiteDesignAssignment(request.headers.get('cookie'))
  const assignment = saved ?? createWebsiteDesignAssignment()
  if (forced === 'control' || forced === 'test') assignment.variant = forced
  const assetUrl = new URL(request.url)
  assetUrl.search = ''
  assetUrl.pathname = assignment.variant === 'control' ? `${WEBSITE_DESIGN_INTERNAL_PREFIX}${route}` : route
  const asset = await env.ASSETS.fetch(new Request(assetUrl, { method: 'GET' }))
  if (!asset.ok || !asset.headers.get('content-type')?.includes('text/html')) return null
  const headers = new Headers(asset.headers)
  headers.delete('ETag')
  headers.delete('Last-Modified')
  headers.delete('Content-Length')
  headers.set('Cache-Control', 'private, no-store')
  headers.append('Vary', 'Cookie')
  headers.set('X-Website-Design-Variant', assignment.variant)
  if (!saved) headers.append('Set-Cookie', websiteDesignCookie(assignment, url.protocol === 'https:'))
  const response = new Response(asset.body, { status: asset.status, headers })
  return new HTMLRewriter()
    .on('head', {
      element(element) {
        element.prepend(metadataHtml(assignment), { html: true })
      },
    })
    .on('meta[name="robots"]', {
      element(element) {
        element.setAttribute('content', 'index, follow')
      },
    })
    .transform(response)
}

interface SupabaseConfig {
  supaHost: string
  supaKey: string
}
let configCache: { value: SupabaseConfig; expires: number } | undefined

async function signupConfig(fetcher: typeof fetch): Promise<SupabaseConfig> {
  if (configCache && configCache.expires > Date.now()) return configCache.value
  const response = await fetcher('https://api.capgo.app/private/config', { signal: AbortSignal.timeout(5000) })
  if (!response.ok) throw new Error('Signup config unavailable')
  const value = (await response.json()) as SupabaseConfig
  const host = new URL(value.supaHost)
  if (host.protocol !== 'https:' || !value.supaKey || !(/\.supabase\.co$/.test(host.hostname) || host.hostname === 'sb.capgo.app')) throw new Error('Invalid signup config')
  configCache = { value, expires: Date.now() + 300_000 }
  return value
}

export async function websiteDesignSignupResponse(request: Request, env: WebsiteDesignEnv, ctx?: BackgroundContext, fetcher: typeof fetch = fetch): Promise<Response | null> {
  const url = new URL(request.url)
  if (url.pathname !== WEBSITE_DESIGN_SIGNUP_PATH) return null
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  if (url.hostname !== 'capgo.app' || env.WEBSITE_DESIGN_EXPERIMENT !== WEBSITE_DESIGN_EXPERIMENT) return json({ error: 'Experiment disabled' }, 404)
  if (request.headers.get('origin') !== url.origin || request.headers.get('sec-fetch-site') === 'cross-site') return json({ error: 'Invalid origin' }, 403)
  const assignment = readWebsiteDesignAssignment(request.headers.get('cookie'))
  const authorization = request.headers.get('authorization')
  if (!assignment || !authorization?.startsWith('Bearer ') || authorization.length > 8192) return json({ error: 'Missing signup context' }, 401)
  try {
    const config = await signupConfig(fetcher)
    const verification = await fetcher(`${config.supaHost.replace(/\/$/, '')}/auth/v1/user`, {
      headers: { Authorization: authorization, apikey: config.supaKey },
      signal: AbortSignal.timeout(5000),
    })
    if (!verification.ok) return json({ error: 'Signup not verified' }, 401)
    const user = (await verification.json()) as { id: string; created_at: string; user_metadata?: Record<string, unknown> }
    const metadata = user.user_metadata ?? {}
    const anonymousId = metadata.website_design_anonymous_id
    const created = Date.parse(user.created_at)
    if (
      !/^[0-9a-f-]{36}$/.test(user.id) ||
      !Number.isFinite(created) ||
      created < assignment.issuedAt - 60_000 ||
      created < Date.now() - 600_000 ||
      created > Date.now() + 60_000 ||
      metadata.website_design_experiment !== WEBSITE_DESIGN_EXPERIMENT ||
      metadata.website_design_visitor_id !== assignment.visitorId ||
      metadata.website_design_variant !== assignment.variant ||
      typeof anonymousId !== 'string' ||
      anonymousId.length < 1 ||
      anonymousId.length > 200 ||
      /[\r\n]/.test(anonymousId)
    ) {
      return json({ error: 'Account does not match exposure' }, 409)
    }
    const send = fetcher('https://eu.i.posthog.com/i/v0/e/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        api_key: LANDING_POSTHOG_PROJECT_KEY,
        event: 'user_signed_up',
        distinct_id: anonymousId,
        uuid: user.id,
        timestamp: user.created_at,
        properties: {
          ...websiteDesignProperties(assignment),
          signup_confirmation: 'supabase_verified',
          account_id: user.id,
          $host: 'capgo.app',
          $pathname: '/register/',
          $insert_id: `${WEBSITE_DESIGN_EXPERIMENT}:${user.id}`,
        },
      }),
    }).then((response) => {
      if (!response.ok) throw new Error('Experiment capture rejected')
    })
    if (ctx) {
      ctx.waitUntil(
        send.catch(() => {
          console.error('Website experiment signup capture failed')
        }),
      )
      return json({ accepted: true }, 202)
    }
    await send
    return json({ accepted: true }, 202)
  } catch {
    return json({ error: 'Signup measurement unavailable' }, 503)
  }
}
