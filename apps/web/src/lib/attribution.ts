export type CapgoAttribution = {
  ref?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export const ATTRIBUTION_COOKIE_NAME = 'capgo_attribution'
export const ATTRIBUTION_STORAGE_KEY = 'capgo_attribution'
export const ATTRIBUTION_MAX_AGE_SECONDS = 180 * 24 * 60 * 60

const TRACKED_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign'] as const

export function hasAttributionValues(data: CapgoAttribution | null | undefined): boolean {
  if (!data) return false
  return Boolean(data.ref || data.utm_source || data.utm_medium || data.utm_campaign)
}

export function parseAttributionFromSearch(search: string): CapgoAttribution {
  const normalized = search.startsWith('?') ? search.slice(1) : search
  const params = new URLSearchParams(normalized)
  const data: CapgoAttribution = {}
  for (const key of TRACKED_KEYS) {
    const value = params.get(key)?.trim()
    if (value) {
      data[key] = value
    }
  }
  return data
}

export function signupPluginFromRef(ref?: string): string | undefined {
  if (!ref) return undefined
  const prefix = 'plugin_'
  if (!ref.startsWith(prefix)) return undefined
  const plugin = ref.slice(prefix.length)
  return plugin || undefined
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
  return props
}

export function serializeAttribution(data: CapgoAttribution): string {
  return JSON.stringify(data)
}

export function deserializeAttribution(raw: string | null | undefined): CapgoAttribution | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const data: CapgoAttribution = {}
    for (const key of TRACKED_KEYS) {
      const value = parsed[key]
      if (typeof value === 'string' && value.trim()) {
        data[key] = value.trim()
      }
    }
    return hasAttributionValues(data) ? data : null
  } catch {
    return null
  }
}

export function mergeFirstTouch(existing: CapgoAttribution | null, fromUrl: CapgoAttribution): CapgoAttribution | null {
  if (hasAttributionValues(existing)) return existing
  return hasAttributionValues(fromUrl) ? fromUrl : existing
}

export function isRegisterOrConsoleLink(href: string): boolean {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false
  }
  const lower = href.toLowerCase()
  if (lower.includes('console.capgo.app')) return true
  try {
    const url = new URL(href, 'https://capgo.app')
    return /\/register(\/|$|\?)/.test(url.pathname)
  } catch {
    return /\/register(\/|$|\?)/.test(href)
  }
}

export function appendAttributionToUrl(href: string, data: CapgoAttribution, baseOrigin = 'https://capgo.app'): string {
  if (!hasAttributionValues(data) || !isRegisterOrConsoleLink(href)) {
    return href
  }

  const url = new URL(href, baseOrigin)
  for (const key of TRACKED_KEYS) {
    const value = data[key]
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value)
    }
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return url.toString()
  }
  if (href.startsWith('//')) {
    return `//${url.host}${url.pathname}${url.search}${url.hash}`
  }
  return `${url.pathname}${url.search}${url.hash}`
}

function readCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null
  const prefix = `${name}=`
  const parts = document.cookie.split(';')
  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length))
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
  if (fromCookie) return fromCookie
  try {
    return deserializeAttribution(localStorage.getItem(ATTRIBUTION_STORAGE_KEY))
  } catch {
    return null
  }
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
  const fromUrl = parseAttributionFromSearch(window.location.search)
  const merged = mergeFirstTouch(existing, fromUrl)
  if (merged && merged !== existing) {
    persistAttribution(merged)
  }
  return merged ?? existing
}

export function getSignupRefForRegistration(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const fromUrl = new URLSearchParams(window.location.search).get('ref')?.trim()
  if (fromUrl) return fromUrl
  return readStoredAttribution()?.ref
}

export function getSignupAttributionForEvents(): { signup_ref?: string; signup_plugin?: string } {
  const ref = getSignupRefForRegistration()
  if (!ref) return {}
  const plugin = signupPluginFromRef(ref)
  return plugin ? { signup_ref: ref, signup_plugin: plugin } : { signup_ref: ref }
}

export function decorateAttributionLinks(root: ParentNode = document): void {
  if (typeof document === 'undefined') return
  const data = readStoredAttribution()
  if (!hasAttributionValues(data)) return

  root.querySelectorAll('a[href]').forEach((anchor) => {
    const el = anchor as HTMLAnchorElement
    const href = el.getAttribute('href')
    if (!href || !isRegisterOrConsoleLink(href)) return
    const next = appendAttributionToUrl(href, data!, window.location.origin)
    if (next !== href) {
      el.setAttribute('href', next)
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
