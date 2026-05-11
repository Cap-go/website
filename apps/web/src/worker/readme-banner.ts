import { actions, pluginCountLabel, type Action } from '../config/plugins'
import { README_BANNER_LOGO_PNG, README_BANNER_PHONE_PNG } from './readme-banner-assets'
import type { BackgroundContext } from './types'

type BannerCampaign = 'build' | 'live-update'

type BannerContext = {
  campaign: BannerCampaign
  plugin?: Action
  repo?: string
}

const FRESH_SECONDS = 300
const STALE_SECONDS = 86_400
const BANNER_WIDTH = 2048
const BANNER_HEIGHT = 296
const COPY_SAFE_RIGHT_EDGE = 1504
const TITLE_MAX_LENGTH = 34
const DETAIL_MAX_LENGTH = 62
const SVG_CONTENT_TYPE = 'image/svg+xml; charset=utf-8'
const CACHE_KEY_PARAMS = ['ad', 'campaign', 'package', 'pkg', 'repo', 'repository']
const GITHUB_REPO_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/

const workerCache = (): Cache | undefined => {
  return (globalThis as typeof globalThis & { caches?: { default?: Cache } }).caches?.default
}

const pluginRepoMap = actions.reduce<Record<string, Action[]>>((repos, action) => {
  const repo = normalizeRepo(repoFromUrl(action.href))
  if (!repo) return repos
  const key = repo.toLowerCase()
  repos[key] = [...(repos[key] ?? []), action]
  return repos
}, {})

function normalizeRepo(repo: string | null | undefined): string | undefined {
  if (!repo) return undefined
  const cleanRepo = repo
    .trim()
    .replace(/^https?:\/\/github\.com\//i, '')
    .replace(/^github\.com\//i, '')
    .replace(/\/(?:tree|blob)\/.*$/i, '')
    .replace(/\.git$/i, '')
    .replace(/^\/+|\/+$/g, '')

  const [owner, name] = cleanRepo.split('/')
  if (!owner || !name) return undefined
  const normalized = `${owner}/${name}`
  return GITHUB_REPO_RE.test(normalized) ? normalized : undefined
}

function repoFromUrl(value: string): string | undefined {
  try {
    const url = new URL(value)
    if (url.hostname !== 'github.com') return undefined
    return normalizeRepo(url.pathname)
  } catch {
    return normalizeRepo(value)
  }
}

function repoFromReferer(request: Request): string | undefined {
  const referer = request.headers.get('Referer')
  if (!referer) return undefined

  try {
    const url = new URL(referer)
    if (url.hostname !== 'github.com') return undefined
    return normalizeRepo(url.pathname)
  } catch {
    return undefined
  }
}

function pluginFromRequest(url: URL, repo: string | undefined): Action | undefined {
  const packageName = (url.searchParams.get('package') ?? url.searchParams.get('pkg'))?.trim()
  if (packageName) return actions.find((action) => action.name === packageName)
  if (!repo) return undefined

  const matches = pluginRepoMap[repo.toLowerCase()]
  return matches?.length === 1 ? matches[0] : undefined
}

function explicitCampaign(url: URL): BannerCampaign | undefined {
  const campaign = (url.searchParams.get('campaign') ?? url.searchParams.get('ad'))?.toLowerCase()
  if (!campaign) return undefined
  if (campaign === 'build' || campaign === 'native-build' || campaign === 'capgo-build') return 'build'
  if (campaign === 'live' || campaign === 'live-update' || campaign === 'updater' || campaign === 'ota') return 'live-update'
  return undefined
}

function hashString(value: string): number {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }
  return Math.abs(hash)
}

function pickCampaign(url: URL, repo: string | undefined): BannerCampaign {
  const requestedCampaign = explicitCampaign(url)
  if (requestedCampaign) return requestedCampaign

  const repoName = repo?.split('/')[1]?.toLowerCase() ?? ''
  if (repoName.includes('build')) return 'build'
  if (repoName.includes('updater') || repoName.includes('live-update') || repoName.includes('live-reload')) return 'live-update'

  const fiveMinuteBucket = Math.floor(Date.now() / (FRESH_SECONDS * 1000))
  return hashString(`${repoName || 'capgo'}:${fiveMinuteBucket}`) % 4 === 0 ? 'build' : 'live-update'
}

function bannerContext(request: Request): BannerContext {
  const url = new URL(request.url)
  const repo = normalizeRepo(url.searchParams.get('repo') ?? url.searchParams.get('repository')) ?? repoFromReferer(request)
  const plugin = pluginFromRequest(url, repo)
  return {
    campaign: pickCampaign(url, repo),
    plugin,
    repo,
  }
}

function canonicalCacheKey(request: Request): Request {
  const sourceUrl = new URL(request.url)
  const cacheUrl = new URL(sourceUrl.origin)
  cacheUrl.pathname = sourceUrl.pathname

  for (const param of CACHE_KEY_PARAMS) {
    const value = sourceUrl.searchParams.get(param)
    if (value) cacheUrl.searchParams.set(param, value)
  }

  const repo = normalizeRepo(sourceUrl.searchParams.get('repo') ?? sourceUrl.searchParams.get('repository')) ?? repoFromReferer(request)
  if (repo && !cacheUrl.searchParams.has('repo')) cacheUrl.searchParams.set('repo', repo)

  return new Request(cacheUrl.toString(), { method: 'GET' })
}

function generatedAt(response: Response): number {
  const value = response.headers.get('X-Capgo-Generated-At')
  if (!value) return 0
  const timestamp = Number.parseInt(value, 10)
  return Number.isFinite(timestamp) ? timestamp : 0
}

function isFresh(response: Response): boolean {
  return Date.now() - generatedAt(response) < FRESH_SECONDS * 1000
}

function escapeSvg(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength - 1).trimEnd()}...`
}

function buildCopy(context: BannerContext): { title: string; detail: string; cta: string } {
  if (context.plugin) {
    const title = `${context.plugin.title} for Capacitor`
    return {
      title,
      detail:
        context.campaign === 'build'
          ? `Native build, AppStore publishing, ${pluginCountLabel} Free plugins:`
          : `OTA, Native build, AppStore publishing, ${pluginCountLabel} Free plugins:`,
      cta: context.campaign === 'build' ? 'Click to try Capgo Build' : 'Click to check out Capgo',
    }
  }

  if (context.campaign === 'build') {
    return {
      title: 'Native builds for Capacitor',
      detail: `Native iOS/Android builds, App Store publishing, ${pluginCountLabel} free plugins:`,
      cta: 'Click to try Capgo Build',
    }
  }

  return {
    title: 'Instant updates for Capacitor',
    detail: `OTA, Native build, AppStore publishing, ${pluginCountLabel} Free plugins:`,
    cta: 'Click to check out Capgo',
  }
}

function renderBannerSvg(context: BannerContext): string {
  const copy = buildCopy(context)
  const title = escapeSvg(truncate(copy.title, TITLE_MAX_LENGTH))
  const detail = escapeSvg(truncate(copy.detail, DETAIL_MAX_LENGTH))
  const cta = escapeSvg(copy.cta)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" viewBox="0 0 ${BANNER_WIDTH} ${BANNER_HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${detail} ${cta}</desc>
  <defs>
    <clipPath id="copy-safe-area">
      <rect x="0" y="0" width="${COPY_SAFE_RIGHT_EDGE}" height="${BANNER_HEIGHT}"/>
    </clipPath>
  </defs>
  <rect width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" fill="#002444"/>
  <image href="${README_BANNER_LOGO_PNG}" x="20" y="20" width="155" height="155" preserveAspectRatio="none"/>
  <g fill="#f8fbff" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" clip-path="url(#copy-safe-area)">
    <text x="198" y="108" font-size="74" font-weight="400">${title}</text>
    <text x="134" y="217" font-size="50" font-weight="400">${detail}</text>
    <text x="134" y="277" font-size="50" font-weight="400">${cta.replace('Capgo', '<tspan font-weight="800">Capgo</tspan>')}</text>
  </g>
  <image href="${README_BANNER_PHONE_PNG}" x="1558" y="64" width="400" height="232" preserveAspectRatio="none"/>
</svg>`
}

function internalCachedResponse(svg: string): Response {
  return new Response(svg, {
    headers: {
      'Content-Type': SVG_CONTENT_TYPE,
      'Cache-Control': `public, max-age=${STALE_SECONDS}`,
      'X-Capgo-Generated-At': Date.now().toString(),
    },
  })
}

function publicBannerResponse(response: Response, cacheState: 'HIT' | 'MISS' | 'STALE' | 'BYPASS', isHead: boolean): Response {
  const headers = new Headers(response.headers)
  headers.set('Content-Type', SVG_CONTENT_TYPE)
  headers.set('Cache-Control', `public, max-age=${FRESH_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`)
  headers.set('X-Capgo-Cache', cacheState)

  return new Response(isHead ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

async function regenerateBanner(request: Request, cacheKey: Request): Promise<Response> {
  const response = internalCachedResponse(renderBannerSvg(bannerContext(request)))
  await workerCache()?.put(cacheKey, response.clone())
  return response
}

function regenerateBannerSafely(request: Request, cacheKey: Request): Promise<void> {
  return regenerateBanner(request, cacheKey)
    .then(() => undefined)
    .catch((error) => {
      console.error('Failed to refresh README banner cache:', error)
    })
}

export async function handleReadmeBanner(request: Request, ctx?: BackgroundContext): Promise<Response> {
  const isHead = request.method === 'HEAD'
  const cache = workerCache()
  if (!cache) {
    return publicBannerResponse(internalCachedResponse(renderBannerSvg(bannerContext(request))), 'BYPASS', isHead)
  }

  const cacheKey = canonicalCacheKey(request)
  const cached = await cache.match(cacheKey)
  if (cached) {
    if (isFresh(cached)) return publicBannerResponse(cached, 'HIT', isHead)
    ctx?.waitUntil(regenerateBannerSafely(request, cacheKey))
    return publicBannerResponse(cached, 'STALE', isHead)
  }

  return publicBannerResponse(await regenerateBanner(request, cacheKey), 'MISS', isHead)
}
