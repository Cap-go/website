import { splitLocalePath } from '../../../shared/localizedLegacyPathRedirect'

export type FirstTouchType = 'blog' | 'docs' | 'plugin' | 'pricing' | 'home' | 'solutions' | 'console' | 'cli' | 'other'

/** Paid-ads offer: visitors landing with `?offer=direct` get a pay-first plan (no free trial). */
export type CapgoOffer = 'direct'

export const OFFER_QUERY_PARAM = 'offer'
export const DIRECT_OFFER: CapgoOffer = 'direct'

export type CapgoAttribution = {
  ref?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  first_touch_type?: FirstTouchType
  first_touch_path?: string
  offer?: CapgoOffer
  /** ISO timestamp of when the offer was first captured; the offer expires ATTRIBUTION_MAX_AGE_SECONDS later. */
  offer_at?: string
}

export const ATTRIBUTION_COOKIE_NAME = 'capgo_attribution'
export const ATTRIBUTION_STORAGE_KEY = 'capgo_attribution'
export const ATTRIBUTION_MAX_AGE_SECONDS = 180 * 24 * 60 * 60

const TRACKED_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'first_touch_type', 'first_touch_path', 'offer', 'offer_at'] as const
/** Keys forwarded to register/console links. `offer_at` stays client-side: the offer is re-stamped when it is captured from a URL. */
const LINK_PARAM_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'first_touch_type', 'first_touch_path', 'offer'] as const

/** Only the exact value `direct` is a recognised offer; anything else (including padded or upper-case variants) is ignored. */
export function normalizeOffer(value: unknown): CapgoOffer | undefined {
  return value === DIRECT_OFFER ? DIRECT_OFFER : undefined
}

/** Tolerated clock skew for a capture timestamp that is slightly in the future. */
const OFFER_CLOCK_SKEW_MS = 24 * 60 * 60 * 1000

/** True when `capturedAt` is a valid timestamp less than ATTRIBUTION_MAX_AGE_SECONDS old. Offers without a timestamp are expired. */
export function isOfferFresh(capturedAt: unknown, now: number = Date.now()): boolean {
  if (typeof capturedAt !== 'string') return false
  const captured = Date.parse(capturedAt)
  if (!Number.isFinite(captured)) return false
  const age = now - captured
  return age > -OFFER_CLOCK_SKEW_MS && age < ATTRIBUTION_MAX_AGE_SECONDS * 1000
}

/** Returns the offer and its capture timestamp when the offer is recognised and not expired. */
function pickFreshOffer(record: { offer?: unknown; offer_at?: unknown }, now: number): Pick<CapgoAttribution, 'offer' | 'offer_at'> {
  const offer = normalizeOffer(record.offer)
  if (!offer || !isOfferFresh(record.offer_at, now)) return {}
  return { offer, offer_at: record.offer_at as string }
}

const QUERY_PARAM_KEYS = [...LINK_PARAM_KEYS, 'signup_source'] as const

export function hasAttributionValues(data: CapgoAttribution | null | undefined): boolean {
  if (!data) return false
  return Boolean(data.ref || data.utm_source || data.utm_medium || data.utm_campaign || data.first_touch_type || data.first_touch_path || data.offer)
}

export function parseAttributionFromSearch(search: string, now: number = Date.now()): CapgoAttribution {
  const normalized = search.startsWith('?') ? search.slice(1) : search
  const params = new URLSearchParams(normalized)
  const data: CapgoAttribution = {}
  for (const key of ['ref', 'utm_source', 'utm_medium', 'utm_campaign'] as const) {
    const value = params.get(key)?.trim()
    if (value) {
      data[key] = value
    }
  }
  const offer = normalizeOffer(params.get(OFFER_QUERY_PARAM))
  if (offer) {
    data.offer = offer
    data.offer_at = new Date(now).toISOString()
  }
  return data
}

export function normalizeFirstTouchPath(pathname: string): string {
  const { path } = splitLocalePath(pathname || '/')
  if (!path || path === '') return '/'
  return path.startsWith('/') ? path : `/${path}`
}

export function classifyFirstTouchType(normalizedPath: string): FirstTouchType {
  const path = normalizedPath.toLowerCase()
  if (path === '/' || path === '') return 'home'
  if (path === '/pricing' || path.startsWith('/pricing/')) return 'pricing'
  if (path === '/blog' || path.startsWith('/blog/')) return 'blog'
  if (path === '/docs' || path.startsWith('/docs/')) return 'docs'
  if (path === '/plugins' || path.startsWith('/plugins/')) return 'plugin'
  if (path === '/solutions' || path.startsWith('/solutions/')) return 'solutions'
  if (path === '/login-cli' || path.startsWith('/login-cli/')) return 'cli'
  if (path === '/login' || path.startsWith('/login/')) return 'console'
  if (path === '/register' || path.startsWith('/register/')) return 'console'
  return 'other'
}

export function parseFirstTouchFromPathname(pathname: string): Pick<CapgoAttribution, 'first_touch_type' | 'first_touch_path'> {
  const first_touch_path = normalizeFirstTouchPath(pathname)
  return {
    first_touch_path,
    first_touch_type: classifyFirstTouchType(first_touch_path),
  }
}

export function buildFirstTouchAttribution(search: string, pathname: string, now: number = Date.now()): CapgoAttribution {
  return {
    ...parseAttributionFromSearch(search, now),
    ...parseFirstTouchFromPathname(pathname),
  }
}

export function signupPluginFromRef(ref?: string): string | undefined {
  if (!ref) return undefined
  const prefix = 'plugin_'
  if (!ref.startsWith(prefix)) return undefined
  const plugin = ref.slice(prefix.length)
  return plugin || undefined
}

export function hasFirstTouch(data: CapgoAttribution | null | undefined): boolean {
  return Boolean(data?.first_touch_type && data?.first_touch_path)
}

export function deriveSignupSource(data: CapgoAttribution): string | undefined {
  const ref = data.ref?.trim()
  if (ref) return ref

  const utmSource = data.utm_source?.trim()
  if (utmSource) return utmSource

  const path = data.first_touch_path
  const type = data.first_touch_type
  if (!path || !type) return undefined

  const segments = path.split('/').filter(Boolean)
  switch (type) {
    case 'home':
      return 'home'
    case 'pricing':
      return 'pricing'
    case 'console':
      return 'console'
    case 'cli':
      return 'cli'
    case 'blog': {
      const slug = segments[segments.indexOf('blog') + 1]
      return slug ? `blog:${slug}` : 'blog'
    }
    case 'docs': {
      const docsIndex = segments.indexOf('docs')
      const section = docsIndex >= 0 ? segments.slice(docsIndex + 1).join('/') : ''
      return section ? `docs:${section}` : 'docs'
    }
    case 'plugin': {
      const slug = segments[segments.indexOf('plugins') + 1]
      return slug ? `plugin:${slug}` : 'plugin'
    }
    case 'solutions': {
      const solutionsIndex = segments.indexOf('solutions')
      const rest = solutionsIndex >= 0 ? segments.slice(solutionsIndex + 1).join('/') : ''
      return rest ? `solutions:${rest}` : 'solutions'
    }
    case 'other':
    default: {
      const compact = segments.join('/')
      return compact ? `other:${compact}` : 'other'
    }
  }
}

export function toPostHogAttributionProps(data: CapgoAttribution): Record<string, string> {
  const props: Record<string, string> = {}
  if (data.ref) {
    props.signup_ref = data.ref
    const plugin = signupPluginFromRef(data.ref)
    if (plugin) props.signup_plugin = plugin
  }
  if (data.utm_source) props.first_utm_source = data.utm_source
  if (data.utm_medium) props.first_utm_medium = data.utm_medium
  if (data.utm_campaign) props.first_utm_campaign = data.utm_campaign
  if (data.first_touch_type) props.first_touch_type = data.first_touch_type
  if (data.first_touch_path) props.first_touch_path = data.first_touch_path
  const signupSource = deriveSignupSource(data)
  if (signupSource) props.signup_source = signupSource
  if (data.offer) props.signup_offer = data.offer
  return props
}

export function serializeAttribution(data: CapgoAttribution): string {
  return JSON.stringify(data)
}

export function deserializeAttribution(raw: string | null | undefined, now: number = Date.now()): CapgoAttribution | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const data = pickTrackedAttributionFields(parsed as Record<string, unknown>, now)
    return hasAttributionValues(data) ? data : null
  } catch {
    return null
  }
}

export function pickTrackedAttributionFields(record: Record<string, unknown> | CapgoAttribution | null | undefined, now: number = Date.now()): CapgoAttribution {
  const data: CapgoAttribution = {}
  if (!record) return data
  for (const key of TRACKED_KEYS) {
    if (key === 'offer' || key === 'offer_at') continue
    const value = (record as Record<string, unknown>)[key]
    if (typeof value === 'string' && value.trim()) {
      if (key === 'first_touch_type') {
        data.first_touch_type = value.trim() as FirstTouchType
      } else {
        data[key] = value.trim()
      }
    }
  }
  return { ...data, ...pickFreshOffer(record as Record<string, unknown>, now) }
}

export function reconcileLegacyFirstTouchPair(data: CapgoAttribution): CapgoAttribution {
  if (!data.first_touch_path || data.first_touch_type !== 'other') return data
  const normalized = normalizeFirstTouchPath(data.first_touch_path)
  const expected = classifyFirstTouchType(normalized)
  if (expected === 'console' || expected === 'cli') {
    return { ...data, first_touch_type: expected, first_touch_path: normalized }
  }
  return data
}

function resolveFirstTouchPair(existing: CapgoAttribution, incoming: CapgoAttribution): Pick<CapgoAttribution, 'first_touch_type' | 'first_touch_path'> {
  if (hasFirstTouch(existing)) {
    const reconciled = reconcileLegacyFirstTouchPair(existing)
    return {
      first_touch_type: reconciled.first_touch_type,
      first_touch_path: reconciled.first_touch_path,
    }
  }
  if (existing.first_touch_path) {
    return parseFirstTouchFromPathname(existing.first_touch_path)
  }
  if (hasFirstTouch(incoming)) {
    return {
      first_touch_type: incoming.first_touch_type,
      first_touch_path: incoming.first_touch_path,
    }
  }
  return {}
}

export function mergeAttribution(existing: CapgoAttribution | null | undefined, incoming: CapgoAttribution, now: number = Date.now()): CapgoAttribution {
  const base = pickTrackedAttributionFields(existing ?? null, now)
  const merged: CapgoAttribution = { ...base, ...resolveFirstTouchPair(base, incoming) }
  for (const key of ['ref', 'utm_source', 'utm_medium', 'utm_campaign'] as const) {
    if (!merged[key] && incoming[key]) merged[key] = incoming[key]
  }
  // First touch wins: a stored, unexpired offer keeps its original capture time (no renewal on revisit).
  if (!merged.offer) Object.assign(merged, pickFreshOffer(incoming, now))
  return reconcileLegacyFirstTouchPair(merged)
}

/** Merge cookie and localStorage slices (cookie ref/utm wins; storage can supply first touch). */
export function mergeStoredAttributionSlices(cookie: CapgoAttribution | null | undefined, storage: CapgoAttribution | null | undefined): CapgoAttribution {
  return mergeAttribution(mergeAttribution(null, cookie ?? {}), storage ?? {})
}

/** @deprecated Use mergeAttribution */
export function mergeFirstTouch(existing: CapgoAttribution | null, incoming: CapgoAttribution): CapgoAttribution | null {
  const merged = mergeAttribution(existing, incoming)
  return hasAttributionValues(merged) ? merged : existing
}

function isCapgoMarketingHost(hostname: string): boolean {
  return hostname === 'capgo.app' || hostname === 'www.capgo.app' || hostname === 'localhost' || hostname.endsWith('.localhost')
}

export function isRegisterOrConsoleLink(href: string, baseUrl = 'https://capgo.app/'): boolean {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false
  }
  try {
    const url = new URL(href, baseUrl)
    if (url.hostname === 'console.capgo.app') return true
    if (isCapgoMarketingHost(url.hostname)) {
      return /\/register(\/|$)/.test(url.pathname)
    }
    return false
  } catch {
    return false
  }
}

export function attributionLinkParams(data: CapgoAttribution): Record<string, string> {
  const params: Record<string, string> = {}
  for (const key of LINK_PARAM_KEYS) {
    const value = data[key]
    if (value) params[key] = value
  }
  const signupSource = deriveSignupSource(data)
  if (signupSource) params.signup_source = signupSource
  return params
}

function formatDecoratedHref(href: string, resolved: URL, baseUrl: string): string {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return resolved.toString()
  }
  if (href.startsWith('//')) {
    return `//${resolved.host}${resolved.pathname}${resolved.search}${resolved.hash}`
  }
  if (href.startsWith('/')) {
    return `${resolved.pathname}${resolved.search}${resolved.hash}`
  }

  const base = new URL(baseUrl)
  if (resolved.origin !== base.origin) {
    return `${resolved.pathname}${resolved.search}${resolved.hash}`
  }

  const basePath = base.pathname.endsWith('/') ? base.pathname : `${base.pathname}/`
  let relativePath = resolved.pathname
  if (relativePath.startsWith(basePath)) {
    relativePath = relativePath.slice(basePath.length)
  } else if (relativePath.startsWith(base.pathname)) {
    relativePath = relativePath.slice(base.pathname.length).replace(/^\//, '')
  }
  return `${relativePath}${resolved.search}${resolved.hash}`
}

export function appendAttributionToUrl(href: string, data: CapgoAttribution, baseUrl = 'https://capgo.app/'): string {
  if (!hasAttributionValues(data) || !isRegisterOrConsoleLink(href, baseUrl)) {
    return href
  }

  const resolved = new URL(href, baseUrl)
  for (const [key, value] of Object.entries(attributionLinkParams(data))) {
    if (value && !resolved.searchParams.has(key)) {
      resolved.searchParams.set(key, value)
    }
  }

  return formatDecoratedHref(href, resolved, baseUrl)
}

function readCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null
  const prefix = `${name}=`
  const parts = document.cookie.split(';')
  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.startsWith(prefix)) {
      try {
        return decodeURIComponent(trimmed.slice(prefix.length))
      } catch {
        return null
      }
    }
  }
  return null
}

function writeAttributionCookie(json: string): void {
  if (typeof document === 'undefined') return
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; secure' : ''
  const domain = typeof location !== 'undefined' && location.hostname.endsWith('capgo.app') ? '; domain=.capgo.app' : ''
  document.cookie = `${ATTRIBUTION_COOKIE_NAME}=${encodeURIComponent(json)}; path=/; max-age=${ATTRIBUTION_MAX_AGE_SECONDS}; samesite=lax${domain}${secure}`
}

export function readStoredAttribution(): CapgoAttribution | null {
  if (typeof window === 'undefined') return null
  const fromCookie = deserializeAttribution(readCookieValue(ATTRIBUTION_COOKIE_NAME))
  let fromStorage: CapgoAttribution | null = null
  try {
    fromStorage = deserializeAttribution(localStorage.getItem(ATTRIBUTION_STORAGE_KEY))
  } catch {
    fromStorage = null
  }
  const merged = mergeStoredAttributionSlices(fromCookie, fromStorage)
  return hasAttributionValues(merged) ? merged : null
}

export function persistAttribution(data: CapgoAttribution): void {
  if (!hasAttributionValues(data) || typeof window === 'undefined') return
  const json = serializeAttribution(data)
  try {
    writeAttributionCookie(json)
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, json)
  } catch {
    /* ignore */
  }
}

export function captureFirstTouchFromLocation(): CapgoAttribution | null {
  if (typeof window === 'undefined') return null
  const existing = readStoredAttribution()
  const incoming = buildFirstTouchAttribution(window.location.search, window.location.pathname)
  const merged = mergeAttribution(existing, incoming)
  if (!hasAttributionValues(merged)) return existing
  const unchanged = existing && JSON.stringify(existing) === JSON.stringify(merged)
  if (!unchanged) persistAttribution(merged)
  return merged
}

export function getSignupUserMetadataForRegistration(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const incoming = buildFirstTouchAttribution(window.location.search, window.location.pathname)
  const merged = mergeAttribution(readStoredAttribution(), incoming)
  const props = toPostHogAttributionProps(merged)
  const metadata: Record<string, string> = {}
  if (merged.ref) metadata.ref = merged.ref
  if (props.signup_source) metadata.signup_source = props.signup_source
  if (props.signup_plugin) metadata.signup_plugin = props.signup_plugin
  if (props.first_touch_type) metadata.first_touch_type = props.first_touch_type
  if (props.first_touch_path) metadata.first_touch_path = props.first_touch_path
  if (props.first_utm_source) metadata.utm_source = props.first_utm_source
  if (props.first_utm_medium) metadata.utm_medium = props.first_utm_medium
  if (props.first_utm_campaign) metadata.utm_campaign = props.first_utm_campaign
  if (merged.offer) metadata.offer = merged.offer
  return metadata
}

export function getSignupRefForRegistration(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const fromUrl = new URLSearchParams(window.location.search).get('ref')?.trim()
  if (fromUrl) return fromUrl
  return readStoredAttribution()?.ref
}

export function getSignupAttributionForEvents(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const incoming = buildFirstTouchAttribution(window.location.search, window.location.pathname)
  const merged = mergeAttribution(readStoredAttribution(), incoming)
  const props = toPostHogAttributionProps(merged)
  const events: Record<string, string> = {}
  if (props.signup_ref) events.signup_ref = props.signup_ref
  if (props.signup_plugin) events.signup_plugin = props.signup_plugin
  if (props.signup_source) events.signup_source = props.signup_source
  if (props.first_touch_type) events.first_touch_type = props.first_touch_type
  if (props.first_touch_path) events.first_touch_path = props.first_touch_path
  if (props.signup_offer) events.signup_offer = props.signup_offer
  return events
}

export function decorateAttributionLinks(root: ParentNode = document): void {
  if (typeof document === 'undefined') return
  const data = readStoredAttribution()
  if (!hasAttributionValues(data)) return

  root.querySelectorAll('a[href]').forEach((anchor) => {
    const el = anchor as HTMLAnchorElement
    const href = el.getAttribute('href')
    if (!href || !isRegisterOrConsoleLink(href)) return
    const next = appendAttributionToUrl(href, data!, window.location.href)
    if (next !== href) {
      el.setAttribute('href', next)
      const rel = (el.getAttribute('rel') ?? '').trim()
      const tokens = rel.split(/\s+/).filter(Boolean)
      const hasNofollow = tokens.some((token) => token.toLowerCase() === 'nofollow')
      if (!hasNofollow) {
        el.setAttribute('rel', rel ? `${rel} nofollow` : 'nofollow')
      }
    }
  })
}

export function startAttributionLinkDecoration(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  const run = () => decorateAttributionLinks(document)

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run)
  } else {
    run()
  }

  const observer = new MutationObserver(() => run())
  observer.observe(document.documentElement, { childList: true, subtree: true })
}

export function hasDirectOffer(data: CapgoAttribution | null | undefined): boolean {
  return data?.offer === DIRECT_OFFER
}

export const __attributionQueryParamKeys = QUERY_PARAM_KEYS
