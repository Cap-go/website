import { trackAICrawlerResponse } from '@datafast/ai-crawl'
import {
  markdownNotFoundResponse,
  MCP_MANIFEST_PATHS,
  OAUTH_PROTECTED_RESOURCE_PATH,
  OPENAPI_ALIAS_PATHS,
  OPENAPI_ASSET_PATH,
  prefersMarkdown,
} from '../../../shared/agentDiscovery'
import { isGonePath } from '../../../shared/gonePaths'
import { resolveLocalizedLegacyRedirectPath, splitLocalePath } from '../../../shared/localizedLegacyPathRedirect'
import { resolveNotFoundRecoveryRedirect } from '../../../shared/notFoundRecovery'
import { permanentTrailingSlashLocation } from '../../../shared/trailingSlashRedirect'
import { handleToolApiRequest } from '../lib/tools/api'
import { withAbTest } from './abtest'
import { agentAuthUpstreamPath, proxyAgentAuthRequest } from './agent-auth-proxy'
import { BUILDER_METRICS_PATH, handleBuilderMetrics } from './builder-metrics'
import { workerCache } from './cached-json'
import { CURRENCY_PATH, handleCurrency } from './currency'
import { GITHUB_RELEASES_PATH, handleGithubReleases } from './github-releases'
import { handleLiveUpdateMetrics, LIVE_UPDATE_METRICS_PATH } from './live-update-metrics'
import { handleMcpManifestRequest, handleOAuthProtectedResourceRequest } from './mcp'
import { handleMtaStsRequest } from './mta-sts'
import { handleAuthorizationServerMetadataRequest, OAUTH_AUTHORIZATION_SERVER_PATH } from './oauth-discovery'
import { handlePublicMcp, PUBLIC_MCP_PATH, type PublicMcpEnv } from './public-mcp'
import { handleReadmeBanner } from './readme-banner'
import type { BackgroundContext } from './types'
import { withVideoRange } from './video-ranges'
import { handleSignaturesDirectoryRequest, HTTP_MESSAGE_SIGNATURES_DIRECTORY, signedFetch } from './web-bot-auth'

interface Env extends PublicMcpEnv {
  AB_FLAG?: string
  AB_VARIANT?: string
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
  PERSONAL_ACCESS_TOKEN?: string
  CF_ACCOUNT_ANALYTICS_ID?: string
  CF_ANALYTICS_TOKEN?: string
  BUILDER_DB?: import('../lib/builderMetricsD1').BuilderD1Database
  IOS_UDID_PROFILE_SIGNING_CERT_PEM?: string
  IOS_UDID_PROFILE_SIGNING_KEY_PEM?: string
  IOS_UDID_PROFILE_SIGNING_CHAIN_PEM?: string
  WEB_BOT_AUTH_PRIVATE_JWK?: string
  /** Service binding to the Capgo API worker (capgo_api-prod) for the auth.md agent registration paths. */
  CAPGO_API?: import('./agent-auth-proxy').ServiceBinding
}

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
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
    const response = await signedFetch(env, 'https://api.github.com/graphql', {
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

async function handleStatus(env: Env): Promise<Response> {
  try {
    const response = await signedFetch(env, 'https://status.capgo.app/status.json')
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

type RouteDefinition = {
  methods: readonly string[]
  handle: (request: Request, env: Env, ctx?: BackgroundContext) => Promise<Response>
}

type LinkDefinition = {
  href: string
  rel: string
  type?: string
}

const HOMEPAGE_LINK_HEADERS: LinkDefinition[] = [
  { href: '/docs/public-api/', rel: 'service-doc', type: 'text/html' },
  { href: '/openapi.json', rel: 'service-desc', type: 'application/openapi+json' },
  { href: '/.well-known/mcp.json', rel: 'describedby', type: 'application/json' },
  { href: '/llms.txt', rel: 'describedby', type: 'text/plain' },
]

const GLOBAL_CSS_PATH = '/_astro/global.css'
const LEGACY_GLOBAL_CSS_PATH_PATTERN = /^\/_astro\/global\.[A-Za-z0-9_-]+\.css$/

const routeDefinitions: Record<string, RouteDefinition> = {
  '/sponsors.json': {
    methods: ['GET'],
    handle: async (_request, env) => await handleSponsors(env),
  },
  '/status.json': {
    methods: ['GET'],
    handle: async (_request, env) => await handleStatus(env),
  },
  '/readme-banner.svg': {
    methods: ['GET', 'HEAD'],
    handle: async (request, _env, ctx) => await handleReadmeBanner(request, ctx),
  },
  [LIVE_UPDATE_METRICS_PATH]: {
    methods: ['GET', 'HEAD'],
    handle: async (request, env, ctx) => {
      const response = await handleLiveUpdateMetrics(request, env, ctx)
      if (request.method === 'HEAD') return new Response(null, { status: response.status, headers: response.headers })
      return response
    },
  },
  [BUILDER_METRICS_PATH]: {
    methods: ['GET', 'HEAD'],
    handle: async (request, env, ctx) => {
      const response = await handleBuilderMetrics(request, env, ctx)
      if (request.method === 'HEAD') return new Response(null, { status: response.status, headers: response.headers })
      return response
    },
  },
  [CURRENCY_PATH]: {
    methods: ['GET', 'HEAD'],
    handle: async (request, _env, ctx) => await handleCurrency(request, ctx),
  },
  [GITHUB_RELEASES_PATH]: {
    methods: ['GET', 'HEAD'],
    handle: async (request, env, ctx) => {
      const response = await handleGithubReleases(request, env, ctx)
      if (request.method === 'HEAD') return new Response(null, { status: response.status, headers: response.headers })
      return response
    },
  },
}

function isGlobalCssPath(pathname: string): boolean {
  return pathname === GLOBAL_CSS_PATH || LEGACY_GLOBAL_CSS_PATH_PATTERN.test(pathname)
}

function globalCssRequest(request: Request): Request {
  const url = new URL(request.url)
  url.pathname = GLOBAL_CSS_PATH
  return new Request(url.toString(), request)
}

function withGlobalCssCacheHeaders(response: Response): Response {
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', 'public, max-age=300, must-revalidate')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

const DATAFAST_WEBSITE_ID = 'dfid_hu0aLqOvk52g6hykzIZei'
const SKIP_AI_CRAWLER_TRACKING_HEADER = 'X-Capgo-Skip-AI-Crawler-Tracking'

function trackAICrawler(request: Request, response: Response, ctx?: BackgroundContext): Response {
  if (request.headers.get(SKIP_AI_CRAWLER_TRACKING_HEADER) !== '1') {
    trackAICrawlerResponse(request, response, ctx, { websiteId: DATAFAST_WEBSITE_ID })
  }
  return response
}

async function handleRouteRequest(request: Request, env: Env, pathname: string, ctx?: BackgroundContext): Promise<Response | null> {
  const route = routeDefinitions[pathname]
  if (!route) return null
  if (!route.methods.includes(request.method)) return webJson({ error: 'Method not allowed.' }, 405)
  return await route.handle(request, env, ctx)
}

function withLinkHeaders(response: Response, links: LinkDefinition[]): Response {
  if (!links.length) return response

  const headers = new Headers(response.headers)
  for (const link of links) {
    const valueParts = [`<${link.href}>`, `rel="${link.rel}"`]
    if (link.type) valueParts.push(`type="${link.type}"`)
    const value = valueParts.join('; ')
    const existingLinkHeader = headers.get('Link')
    if (!existingLinkHeader || !existingLinkHeader.includes(value)) {
      headers.append('Link', value)
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function redirectToPath(request: Request, pathname: string, status = 301): Response {
  const url = new URL(request.url)
  const hashIndex = pathname.indexOf('#')
  const pathOnly = hashIndex === -1 ? pathname : pathname.slice(0, hashIndex)
  const hash = hashIndex === -1 ? '' : pathname.slice(hashIndex)
  const target = new URL(`${pathOnly}${hash}`, request.url)
  if (!target.search) target.search = url.search
  return Response.redirect(target.toString(), status)
}

async function assetExists(env: Env, request: Request, pathname: string): Promise<boolean> {
  const url = new URL(request.url)
  url.pathname = pathname.endsWith('/') || pathname.includes('.') ? pathname : `${pathname}/`
  const response = await env.ASSETS.fetch(new Request(url.toString(), { method: 'GET' }))
  return response.ok
}

function redirectToAbsolute(url: string, status = 301): Response {
  return Response.redirect(url, status)
}

const PLUGIN_DOCS_REDIRECTS: Record<string, string> = {
  'capacitor-supabase': '/docs/plugins/supabase/',
  supabase: '/docs/plugins/supabase/',
  'capacitor-neon': '/docs/plugins/neon/',
  neon: '/docs/plugins/neon/',
  'capacitor-pretty-toast': '/docs/plugins/pretty-toast/',
  'pretty-toast': '/docs/plugins/pretty-toast/',
  'capacitor-sheets': '/docs/plugins/sheets/',
  sheets: '/docs/plugins/sheets/',
}

export function staticLegacyRedirect(request: Request, pathname: string): Response | null {
  // Former _redirects splat: /en/* → /:splat (must stay out of _redirects; CF dynamic-rule cap)
  if (pathname === '/en' || pathname === '/en/') {
    return redirectToPath(request, '/')
  }
  if (pathname.startsWith('/en/')) {
    return redirectToPath(request, pathname.slice(3) || '/')
  }

  const { localePrefix, path } = splitLocalePath(pathname)
  if (path === '/home' || path === '/home/') {
    return redirectToPath(request, `${localePrefix}/`)
  }
  if (path === '/terms' || path === '/terms/') {
    return redirectToPath(request, `${localePrefix}/tos/`)
  }
  if (path === '/build-status' || path === '/build-status/') {
    return redirectToPath(request, `${localePrefix}/builder-data/`)
  }
  if (path === '/app/apikeys' || path === '/app/apikeys/') {
    const search = new URL(request.url).search
    return redirectToAbsolute(`https://console.capgo.app/apikeys${search}`)
  }
  const pluginMatch = path.match(/^\/plugins\/([^/]+)\/?$/)
  if (pluginMatch) {
    const docsPath = PLUGIN_DOCS_REDIRECTS[pluginMatch[1]]
    if (docsPath) {
      return redirectToPath(request, `${localePrefix}${docsPath}`)
    }
  }
  const localizedLegacyTarget = resolveLocalizedLegacyRedirectPath(pathname)
  if (localizedLegacyTarget) {
    return redirectToPath(request, localizedLegacyTarget)
  }
  return null
}

function shouldServeBrandedNotFound(pathname: string): boolean {
  // Keep normal asset 404s for missing build artifacts, images, fonts, etc.
  if (/\.[a-z0-9]{2,8}$/i.test(pathname) && !pathname.endsWith('.html')) return false
  return true
}

async function brandedErrorPageResponse(
  request: Request,
  env: Env,
  pathname: string,
  assetPath: string,
  status: 404 | 410,
  statusText: 'Not Found' | 'Gone',
): Promise<Response | null> {
  if (status === 404 && prefersMarkdown(request)) return markdownNotFoundResponse(request)

  const { localePrefix } = splitLocalePath(pathname)
  const asset = await env.ASSETS.fetch(new URL(assetPath, request.url))
  if (!(asset.ok || asset.status === status)) return null

  const isHead = request.method === 'HEAD'
  let body = isHead ? null : await asset.text()
  if (!isHead && localePrefix && typeof body === 'string') {
    body = body
      .replaceAll('href="/"', `href="${localePrefix}/"`)
      .replaceAll('href="/docs/"', `href="${localePrefix}/docs/"`)
      .replaceAll('href="/plugins/"', `href="${localePrefix}/plugins/"`)
  }

  const headers = new Headers(asset.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.append('Vary', 'Accept')
  headers.delete('Content-Length')
  return new Response(body, {
    status,
    statusText,
    headers,
  })
}

async function brandedNotFoundResponse(request: Request, env: Env, pathname: string): Promise<Response | null> {
  return brandedErrorPageResponse(request, env, pathname, '/404.html', 404, 'Not Found')
}

async function brandedGoneResponse(request: Request, env: Env, pathname: string): Promise<Response | null> {
  return brandedErrorPageResponse(request, env, pathname, '/410/index.html', 410, 'Gone')
}

async function notFoundLegacyRedirect(request: Request, env: Env, pathname: string): Promise<Response | null> {
  const recoveryTarget = resolveNotFoundRecoveryRedirect(pathname)
  if (recoveryTarget) {
    return redirectToPath(request, recoveryTarget)
  }

  const { localePrefix, path } = splitLocalePath(pathname)

  const pluginMatch = path.match(/^\/plugins\/([^/]+)\/?$/)
  if (pluginMatch) {
    const slug = pluginMatch[1]
    const pluginTargets: string[] = []
    if (!slug.startsWith('capacitor-')) {
      pluginTargets.push(`${localePrefix}/plugins/capacitor-${slug}/`)
      if (!slug.endsWith('-plugin')) {
        pluginTargets.push(`${localePrefix}/plugins/capacitor-${slug}-plugin/`)
      }
    } else if (!slug.endsWith('-plugin')) {
      pluginTargets.push(`${localePrefix}/plugins/${slug}-plugin/`)
    }
    for (const target of pluginTargets) {
      if (await assetExists(env, request, target)) {
        return redirectToPath(request, target)
      }
    }
  }

  return null
}

async function openApiAliasResponse(request: Request, env: Env): Promise<Response> {
  const asset = await env.ASSETS.fetch(new Request(new URL(OPENAPI_ASSET_PATH, request.url), request))
  const headers = new Headers(asset.headers)
  headers.set('Content-Type', 'application/openapi+json; charset=utf-8')
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, HEAD')
  headers.set('Cache-Control', 'public, max-age=3600')
  return new Response(request.method === 'HEAD' ? null : asset.body, {
    status: asset.status,
    statusText: asset.statusText,
    headers,
  })
}

export async function agentSurfaceResponse(request: Request, env: Env, pathname: string, ctx?: BackgroundContext): Promise<Response | null> {
  if (pathname === PUBLIC_MCP_PATH || pathname === `${PUBLIC_MCP_PATH}/`) return handlePublicMcp(request, env, fetch, typeof caches === 'undefined' ? undefined : workerCache())
  if (MCP_MANIFEST_PATHS.has(pathname)) return handleMcpManifestRequest(request)
  if (pathname === OAUTH_PROTECTED_RESOURCE_PATH) return handleOAuthProtectedResourceRequest(request)
  if (pathname === OAUTH_AUTHORIZATION_SERVER_PATH) return handleAuthorizationServerMetadataRequest(request, ctx)
  if (OPENAPI_ALIAS_PATHS.has(pathname)) return openApiAliasResponse(request, env)
  if (pathname === HTTP_MESSAGE_SIGNATURES_DIRECTORY) return handleSignaturesDirectoryRequest(request, env)
  const agentAuthPath = agentAuthUpstreamPath(pathname)
  if (agentAuthPath) return proxyAgentAuthRequest(request, agentAuthPath, env.CAPGO_API)
  return null
}

async function handleRequest(request: Request, env: Env, ctx?: BackgroundContext): Promise<Response> {
  const mtaStsResponse = handleMtaStsRequest(request)
  if (mtaStsResponse) return mtaStsResponse
  const pathname = new URL(request.url).pathname
  const agentSurface = await agentSurfaceResponse(request, env, pathname, ctx)
  if (agentSurface) return trackAICrawler(request, agentSurface, ctx)
  const staticRedirect = staticLegacyRedirect(request, pathname)
  if (staticRedirect) return trackAICrawler(request, staticRedirect, ctx)
  if (isGonePath(pathname)) {
    const goneResponse = await brandedGoneResponse(request, env, pathname)
    if (goneResponse) return trackAICrawler(request, goneResponse, ctx)
  }
  const toolRouteResponse = await handleToolApiRequest(
    request,
    {
      IOS_UDID_PROFILE_SIGNING_CERT_PEM: env.IOS_UDID_PROFILE_SIGNING_CERT_PEM,
      IOS_UDID_PROFILE_SIGNING_KEY_PEM: env.IOS_UDID_PROFILE_SIGNING_KEY_PEM,
      IOS_UDID_PROFILE_SIGNING_CHAIN_PEM: env.IOS_UDID_PROFILE_SIGNING_CHAIN_PEM,
    },
    pathname,
  )
  if (toolRouteResponse) return trackAICrawler(request, toolRouteResponse, ctx)
  const routeResponse = await handleRouteRequest(request, env, pathname, ctx)
  if (routeResponse) return trackAICrawler(request, routeResponse, ctx)
  const assetResponse = await env.ASSETS.fetch(isGlobalCssPath(pathname) ? globalCssRequest(request) : request)
  const permanentTrailingSlashTarget = permanentTrailingSlashLocation(request.url, assetResponse)
  if (permanentTrailingSlashTarget) {
    return trackAICrawler(request, redirectToPath(request, permanentTrailingSlashTarget), ctx)
  }
  if (assetResponse.status === 404) {
    const legacyRedirect = await notFoundLegacyRedirect(request, env, pathname)
    if (legacyRedirect) return trackAICrawler(request, legacyRedirect, ctx)
    if (shouldServeBrandedNotFound(pathname)) {
      const brandedNotFound = await brandedNotFoundResponse(request, env, pathname)
      if (brandedNotFound) return trackAICrawler(request, brandedNotFound, ctx)
    }
  }
  if (isGlobalCssPath(pathname)) return trackAICrawler(request, withGlobalCssCacheHeaders(assetResponse), ctx)
  if (pathname.startsWith('/channel-videos/') && pathname.endsWith('.mp4')) {
    return trackAICrawler(request, await withVideoRange(request, assetResponse), ctx)
  }
  if (pathname === '/' || pathname === '/index.html') {
    return trackAICrawler(request, withLinkHeaders(assetResponse, HOMEPAGE_LINK_HEADERS), ctx)
  }
  return trackAICrawler(request, assetResponse, ctx)
}

export default {
  async fetch(request: Request, env: Env, ctx?: BackgroundContext): Promise<Response> {
    return withAbTest(request, await handleRequest(request, env, ctx), env)
  },
}
