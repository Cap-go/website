// Shared with the translation writer: keep the existing R2 namespace so ready
// pages are discovered immediately, without backfilling an availability index.
export const TRANSLATION_CACHE_VERSION = '2026-10-22-deepseek-style-guides-v1'
export const TRANSLATED_LOCALES = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'] as const
export const TRANSLATION_SOURCE_REQUEST_HEADER = 'X-Capgo-Skip-AI-Crawler-Tracking'
export type TranslationStoreReader = { get(key: string): Promise<{ text(): Promise<string> } | null> }
const CACHE_SECONDS = 300

export function translationBasePath(pathname: string): string {
  const path = pathname.replace(/^\/(?:en|de|es|fr|id|it|ja|ko|zh)(?=\/|$)/, '') || '/'
  return path.endsWith('/') ? path : `${path}/`
}

export function translationUrl(url: URL, locale: string): URL {
  const result = new URL(url.origin)
  const path = translationBasePath(url.pathname)
  result.pathname = locale === 'en' ? path : `/${locale}${path}`
  return result
}

export async function storedTranslationPageKey(canonicalUrl: string, locale: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonicalUrl))
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `pages/${TRANSLATION_CACHE_VERSION}/${locale}/${hash}.json`
}

function attribute(tag: string, name: string): string | undefined {
  return new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i').exec(tag)?.[2]
}

export function isReadyTranslation(value: unknown, url: URL, locale: string): boolean {
  if (!value || typeof value !== 'object') return false
  const page = value as Record<string, unknown>
  if (page.cacheVersion !== TRANSLATION_CACHE_VERSION || page.locale !== locale || page.status !== 200 || page.bodyEncoding !== 'text' || typeof page.body !== 'string')
    return false
  if (!Array.isArray(page.headers)) return false
  const headers = new Headers(page.headers as [string, string][])
  if (!headers.get('content-type')?.includes('text/html') || headers.has('X-Capgo-Translation-Fallback') || /noindex|none/i.test(headers.get('X-Robots-Tag') || '')) return false
  const html = page.body
  if (attribute(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang') !== locale) return false
  const tags = html.match(/<(?:link|meta)\b[^>]*>/gi) || []
  if (tags.some((tag) => /^(?:robots|googlebot)$/i.test(attribute(tag, 'name') || '') && /noindex|none/i.test(attribute(tag, 'content') || ''))) return false
  return tags.some((tag) => attribute(tag, 'rel') === 'canonical' && attribute(tag, 'href') === url.toString())
}

export async function readyTranslationLocales(store: TranslationStoreReader | undefined, url: URL, cache?: Cache): Promise<string[]> {
  if (!store) return ['en']
  const key = new Request(`${url.origin}/__capgo-ready/${TRANSLATION_CACHE_VERSION}${translationBasePath(url.pathname)}`)
  try {
    const cached = await cache?.match(key)
    if (cached) return (await cached.json()) as string[]
  } catch {
    /* Cache availability must not affect page availability. */
  }
  let failed = false
  const ready = await Promise.all(
    TRANSLATED_LOCALES.map(async (locale) => {
      try {
        const localized = translationUrl(url, locale)
        const object = await store.get(await storedTranslationPageKey(localized.toString(), locale))
        return object && isReadyTranslation(JSON.parse(await object.text()), localized, locale) ? locale : null
      } catch {
        failed = true
        return null
      }
    }),
  )
  const locales = ['en', ...ready.filter((locale): locale is (typeof TRANSLATED_LOCALES)[number] => locale !== null)]
  // Fail closed on a storage error, but retry quickly instead of caching an outage.
  if (!failed) {
    await cache?.put(key, new Response(JSON.stringify(locales), { headers: { 'Cache-Control': `public, max-age=${CACHE_SECONDS}` } })).catch(() => {})
  }
  return locales
}

export function rewriteReadyAlternates(html: string, url: URL, locales: readonly string[]): string {
  const clean = html.replace(/<link\b[^>]*>/gi, (tag) => (attribute(tag, 'hreflang') ? '' : tag))
  const links = [...locales, 'x-default']
    .map((locale) => {
      const href = translationUrl(url, locale === 'x-default' ? 'en' : locale)
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
      return `<link rel="alternate" hreflang="${locale}" href="${href}" />`
    })
    .join('\n')
  return clean.replace(/<\/head\s*>/i, `${links}\n</head>`)
}

export async function withTranslationReadiness(request: Request, response: Response, store?: TranslationStoreReader, cache?: Cache): Promise<Response> {
  if (
    request.headers.get(TRANSLATION_SOURCE_REQUEST_HEADER) === '1' ||
    request.method !== 'GET' ||
    response.status !== 200 ||
    !response.headers.get('Content-Type')?.includes('text/html')
  )
    return response
  const html = await response.text()
  let url = new URL(request.url)
  const canonicalTag = (html.match(/<link\b[^>]*>/gi) || []).find((tag) => attribute(tag, 'rel') === 'canonical')
  const canonical = canonicalTag && attribute(canonicalTag, 'href')
  if (canonical) {
    try {
      const canonicalUrl = new URL(canonical, url)
      if (canonicalUrl.origin === url.origin) url = canonicalUrl
    } catch {
      /* Keep the requested path when source metadata is malformed. */
    }
  }
  const locales = await readyTranslationLocales(store, url, cache)
  const headers = new Headers(response.headers)
  for (const name of ['Content-Length', 'Content-Encoding', 'ETag', 'Last-Modified']) headers.delete(name)
  if (!/private|no-store/i.test(headers.get('Cache-Control') || '')) headers.set('Cache-Control', `public, max-age=${CACHE_SECONDS}`)
  return new Response(rewriteReadyAlternates(html, url, locales), { status: response.status, headers })
}
