const SUPPORTED_LOCALES = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'] as const

type Locale = (typeof SUPPORTED_LOCALES)[number]

type AiMessage = {
  role: 'system' | 'user'
  content: string
}

type AiBinding = {
  run(model: string, input: { messages: AiMessage[]; temperature?: number; max_tokens?: number; response_format?: unknown }): Promise<unknown>
}

type WorkerService = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
}

type TranslationQueueReason = 'miss' | 'stale' | 'continue'

type TranslationJob = {
  url: string
  locale: Locale
  cacheVersion: string
  reason: TranslationQueueReason
  sourceHash?: string
  priority?: boolean
}

type QueueBinding<T> = {
  send(message: T): Promise<void>
}

type DurableObjectStorageBinding = {
  get<T = unknown>(key: string): Promise<T | undefined>
  put(key: string, value: unknown): Promise<void>
  delete(key: string): Promise<boolean>
}

type DurableObjectStateBinding = {
  storage: DurableObjectStorageBinding
}

type DurableObjectStubBinding = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
}

type DurableObjectNamespaceBinding = {
  idFromName(name: string): unknown
  get(id: unknown): DurableObjectStubBinding
}

type QueueRetryOptions = {
  delaySeconds?: number
}

type QueueMessage<T> = {
  readonly id?: string
  readonly body: T
  readonly attempts?: number
  retry?: (options?: QueueRetryOptions) => void
}

type MessageBatch<T> = {
  readonly messages: readonly QueueMessage<T>[]
}

type R2ObjectBody = {
  text(): Promise<string>
}

type R2BucketBinding = {
  get(key: string): Promise<R2ObjectBody | null>
  put(key: string, value: string): Promise<unknown>
  delete(key: string): Promise<void>
}

type SourceHtmlResult = { type: 'response'; response: Response } | { type: 'html'; originResponse: Response; sourceHtml: string }

interface Env {
  AI: AiBinding
  WEB: WorkerService
  DOCS: WorkerService
  TRANSLATION_QUEUE: QueueBinding<TranslationJob>
  TRANSLATION_PRIORITY_QUEUE?: QueueBinding<TranslationJob>
  TRANSLATION_COORDINATOR?: DurableObjectNamespaceBinding
  TRANSLATION_STORE: R2BucketBinding
  TRANSLATION_MODEL?: string
  TRANSLATION_TEST_MODE?: string
}

declare global {
  interface CacheStorage {
    readonly default: Cache
  }
}

type Segment = {
  text: string
  leading: string
  trailing: string
  mode: 'text' | 'attribute'
  inBody: boolean
  quote?: string
}

type HtmlPart = string | { segmentIndex: number }
type PartialTranslationState = {
  cacheVersion: string
  locale: Locale
  sourceHash: string
  batchCount: number
  translatedBatches: string[][]
  updatedAt: number
}
type StoredTranslatedResponse = {
  cacheVersion: string
  locale: Locale
  sourceHash?: string
  translatedAt: number
  status: number
  statusText: string
  headers: [string, string][]
  bodyEncoding: 'text' | 'base64'
  body: string
}
type AttributeMatch = {
  name: string
  quote: string
  value: string
  start: number
  valueStart: number
  valueEnd: number
  end: number
}
type TranslationCoordinatorRecord = {
  cacheVersion: string
  locale: Locale
  url: string
  priority: boolean
  pendingUntil: number
  sourceHash?: string
}
type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void
}

const DEFAULT_LOCALE = 'en'
const ALL_LOCALES = [DEFAULT_LOCALE, ...SUPPORTED_LOCALES] as const
const DEFAULT_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast'
const FRESH_MS = 24 * 60 * 60 * 1000
const CACHE_KEEP_SECONDS = 7 * 24 * 60 * 60
const TRANSLATION_SOURCE_CHECK_SECONDS = 5 * 60
const TRANSLATION_PENDING_SECONDS = 10 * 60
const TRANSLATION_COORDINATOR_PENDING_MS = 15 * 60 * 1000
const TRANSLATION_CACHE_VERSION = '2026-05-04-llama-3.1-8b-json-body-v5'
const TRANSLATION_SOURCE_HASH_HEADER = 'X-Capgo-Translation-Source-Hash'
const CLIENT_NO_STORE = 'no-store, max-age=0, must-revalidate'
const MAX_HTML_BYTES = 1_500_000
const MAX_BATCH_CHARS = 1_500
const MAX_BATCH_ITEMS = 12
const TRANSLATION_BATCHES_PER_QUEUE_JOB = 96
const TRANSLATION_MODEL_ATTEMPTS = 3
const TRANSLATION_SINGLE_TEXT_ATTEMPTS = 2
const TRANSLATION_QUEUE_RETRY_DELAY_SECONDS = 60
const AI_OUTPUT_PREVIEW_CHARS = 240
const TRANSLATION_TEST_ROUTE_PREFIX = '/__translation-test__'
const PROTECTED_TRANSLATION_TOKENS = ['Cloudflare', 'Capacitor', 'GitHub', 'Capgo', 'code', 'API', 'SDK', 'CLI', 'npm', 'bun'] as const

const LANGUAGE_NAMES: Record<Locale, string> = {
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Simplified Chinese',
}

const LANGUAGE_FLAG_ENTITIES: Record<string, string> = {
  de: '&#127465;&#127466;',
  en: '&#127482;&#127480;',
  es: '&#127466;&#127480;',
  fr: '&#127467;&#127479;',
  id: '&#127470;&#127465;',
  it: '&#127470;&#127481;',
  ja: '&#127471;&#127477;',
  ko: '&#127472;&#127479;',
  zh: '&#127464;&#127475;',
}

const SKIP_TEXT_TAGS = new Set(['script', 'style', 'svg', 'pre', 'code', 'kbd', 'samp', 'textarea'])
const RAW_TEXT_SKIP_TAGS = new Set(['script', 'style', 'textarea'])
const LANGUAGE_SELECTOR_SKIP_IDS = new Set(['language-dropdown-button', 'language-dropdown', 'language-menu'])
const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
const TRANSLATABLE_META = new Set(['description', 'keywords', 'title', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image:alt'])
const TRANSLATABLE_ATTRIBUTES = new Set(['alt', 'aria-label', 'placeholder', 'title'])
const STATIC_PREFIXES = [
  '/_astro/',
  '/_docs/',
  '/api/',
  '/assets/',
  '/capgo',
  '/favicon',
  '/fonts/',
  '/icons/',
  '/images/',
  '/robots.txt',
  '/site.webmanifest',
  '/sitemap',
  '/docs-sitemap',
  '/llms',
  '/status.json',
  '/sponsors.json',
]
const IGNORED_TRANSLATION_QUERY_KEYS = new Set([
  '_branch_match_id',
  '_branch_referrer',
  '_gl',
  '_hsenc',
  '_hsmi',
  'fbclid',
  'gad_source',
  'gbraid',
  'gclid',
  'igshid',
  'mc_cid',
  'mc_eid',
  'msclkid',
  'ref',
  'ref_src',
  'session',
  'session_id',
  'sessionid',
  'twclid',
  'wbraid',
  'yclid',
])

function escapeHtmlText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeHtmlAttribute(value: string, quote = '"'): string {
  const escaped = escapeHtmlText(value)
  return quote === "'" ? escaped.replace(/'/g, '&#39;') : escaped.replace(/"/g, '&quot;')
}

function normalizePathname(pathname: string): string {
  if (!pathname.startsWith('/')) return `/${pathname}`
  return pathname
}

function isWhitespace(char: string): boolean {
  return char === ' ' || char === '\n' || char === '\r' || char === '\t' || char === '\f'
}

function hasAsciiLetter(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) return true
  }
  return false
}

function isNameChar(char: string): boolean {
  const code = char.charCodeAt(0)
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || char === '_' || char === ':' || char === '.' || char === '-'
}

function isTagNameBoundary(char: string): boolean {
  return char === '' || char === '>' || char === '/' || isWhitespace(char)
}

function textCoreBounds(value: string): { start: number; end: number } {
  let start = 0
  let end = value.length

  while (start < end && isWhitespace(value[start])) start += 1
  while (end > start && isWhitespace(value[end - 1])) end -= 1

  return { start, end }
}

function stripLocalePrefix(pathname: string): string {
  for (const locale of ALL_LOCALES) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1) || '/'
  }
  return pathname
}

function extractLocale(pathname: string): Locale | null {
  const firstSegment = pathname.split('/')[1]
  return SUPPORTED_LOCALES.includes(firstSegment as Locale) ? (firstSegment as Locale) : null
}

function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

function localizedPath(basePath: string, locale: string): string {
  const normalizedBasePath = normalizePathname(stripLocalePrefix(basePath))
  if (locale === DEFAULT_LOCALE) return normalizedBasePath
  return normalizedBasePath === '/' ? `/${locale}/` : `/${locale}${normalizedBasePath}`
}

function localizedAbsoluteUrl(requestUrl: URL, locale: string, basePath: string): string {
  const url = new URL(requestUrl)
  url.pathname = localizedPath(basePath, locale)
  url.search = ''
  return url.toString()
}

function shouldBypassTranslation(pathname: string): boolean {
  const originPath = stripLocalePrefix(pathname)
  if (STATIC_PREFIXES.some((prefix) => originPath === prefix || originPath.startsWith(prefix))) return true
  if (/\.[a-z0-9]{2,8}$/i.test(originPath) && !originPath.endsWith('.html')) return true
  return false
}

function shouldLocalizeHref(value: string): boolean {
  if (!value.startsWith('/') || value.startsWith('//')) return false
  if (value.startsWith('/#')) return false
  return !shouldBypassTranslation(value)
}

function localizeHref(value: string, locale: Locale): string {
  if (!shouldLocalizeHref(value)) return value
  const url = new URL(value, 'https://capgo.app')
  url.pathname = localizedPath(url.pathname, locale)
  return `${url.pathname}${url.search}${url.hash}`
}

function createOriginRequest(request: Request, originUrl: URL): Request {
  const headers = new Headers(request.headers)
  headers.set('Accept-Language', DEFAULT_LOCALE)
  headers.set('X-Capgo-Translation-Origin', 'english')
  headers.delete('If-None-Match')
  headers.delete('If-Modified-Since')

  return new Request(originUrl.toString(), {
    method: request.method,
    headers,
    redirect: 'manual',
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
  })
}

async function fetchEnglishOrigin(request: Request, env: Env, requestUrl: URL): Promise<Response> {
  const originUrl = new URL(requestUrl)
  originUrl.pathname = stripLocalePrefix(originUrl.pathname)

  const service = originUrl.pathname === '/docs' || originUrl.pathname.startsWith('/docs/') || originUrl.pathname.startsWith('/_docs/') ? env.DOCS : env.WEB
  return await service.fetch(createOriginRequest(request, originUrl))
}

function isHtmlResponse(response: Response): boolean {
  return response.headers.get('Content-Type')?.toLowerCase().includes('text/html') ?? false
}

function isRedirect(response: Response): boolean {
  return response.status >= 300 && response.status < 400 && response.headers.has('Location')
}

function isStableTerminalResponse(response: Response): boolean {
  return isRedirect(response) || response.ok || response.status === 404 || response.status === 410
}

function localizeRedirect(response: Response, requestUrl: URL, locale: Locale): Response {
  const headers = new Headers(response.headers)
  const location = headers.get('Location')
  if (!location) return response

  const locationUrl = new URL(location, requestUrl)
  if (locationUrl.origin === requestUrl.origin) {
    locationUrl.pathname = localizedPath(locationUrl.pathname, locale)
    headers.set('Location', `${locationUrl.pathname}${locationUrl.search}${locationUrl.hash}`)
  }

  return new Response(null, { status: response.status, statusText: response.statusText, headers })
}

function readTranslatedAt(response: Response): number {
  const value = response.headers.get('X-Capgo-Translated-At')
  if (!value) return 0
  const timestamp = Number.parseInt(value, 10)
  return Number.isFinite(timestamp) ? timestamp : 0
}

function readTranslationSourceHash(response: Response): string | null {
  const value = response.headers.get(TRANSLATION_SOURCE_HASH_HEADER)
  return value && /^[a-f0-9]{64}$/.test(value) ? value : null
}

function isTranslatedResponseFreshForJob(response: Response, job: TranslationJob): boolean {
  if (Date.now() - readTranslatedAt(response) > FRESH_MS) return false
  return !job.sourceHash || readTranslationSourceHash(response) === job.sourceHash
}

function shouldIgnoreTranslationQueryParam(name: string): boolean {
  const normalizedName = name.toLowerCase()
  return normalizedName.startsWith('utm_') || IGNORED_TRANSLATION_QUERY_KEYS.has(normalizedName)
}

function normalizedTranslationSearchParams(requestUrl: URL): URLSearchParams {
  const entries: [string, string][] = []
  requestUrl.searchParams.forEach((value, name) => {
    if (!shouldIgnoreTranslationQueryParam(name)) entries.push([name, value])
  })

  entries.sort(([leftName, leftValue], [rightName, rightValue]) => leftName.localeCompare(rightName) || leftValue.localeCompare(rightValue))

  const params = new URLSearchParams()
  for (const [name, value] of entries) {
    params.append(name, value)
  }
  return params
}

function applyNormalizedTranslationSearch(targetUrl: URL, requestUrl: URL): void {
  targetUrl.search = ''
  const params = normalizedTranslationSearchParams(requestUrl)
  params.forEach((value, name) => {
    targetUrl.searchParams.append(name, value)
  })
}

function cacheKeyFor(requestUrl: URL, locale: Locale): Request {
  const cacheUrl = new URL(requestUrl)
  cacheUrl.pathname = localizedPath(cacheUrl.pathname, locale)
  applyNormalizedTranslationSearch(cacheUrl, requestUrl)
  cacheUrl.searchParams.set('__capgo_translation_cache', TRANSLATION_CACHE_VERSION)
  return new Request(cacheUrl.toString(), { method: 'GET' })
}

function pendingKeyFor(requestUrl: URL, locale: Locale): Request {
  const pendingUrl = new URL(requestUrl)
  pendingUrl.pathname = localizedPath(pendingUrl.pathname, locale)
  applyNormalizedTranslationSearch(pendingUrl, requestUrl)
  pendingUrl.searchParams.set('__capgo_translation_pending', TRANSLATION_CACHE_VERSION)
  return new Request(pendingUrl.toString(), { method: 'GET' })
}

function sourceCheckKeyFor(requestUrl: URL, locale: Locale): Request {
  const checkUrl = new URL(requestUrl)
  checkUrl.pathname = localizedPath(checkUrl.pathname, locale)
  applyNormalizedTranslationSearch(checkUrl, requestUrl)
  checkUrl.searchParams.set('__capgo_translation_source_check', TRANSLATION_CACHE_VERSION)
  return new Request(checkUrl.toString(), { method: 'GET' })
}

function requestCfMetadata(request: Request): { verifiedBotCategory?: string } | undefined {
  return (request as Request & { cf?: { verifiedBotCategory?: string } }).cf
}

function isCrawlerRequest(request: Request): boolean {
  if (requestCfMetadata(request)?.verifiedBotCategory) return true

  const userAgent = request.headers.get('user-agent') || ''
  return /\b(?:bot|crawler|spider|crawl|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|linkedinbot|pinterest|petalbot|ahrefsbot|semrushbot|bytespider|gptbot|claudebot|perplexitybot)\b/i.test(
    userAgent,
  )
}

function shouldUsePriorityTranslationQueue(request: Request): boolean {
  return !isCrawlerRequest(request)
}

async function putTranslationPendingMarker(requestUrl: URL, locale: Locale, reason: TranslationQueueReason, priority: boolean, sourceHash?: string): Promise<void> {
  const headers = new Headers({
    'Cache-Control': `public, max-age=${TRANSLATION_PENDING_SECONDS}`,
    'X-Capgo-Translation-Pending': reason,
    'X-Capgo-Translation-Priority': priority ? '1' : '0',
  })
  if (sourceHash) headers.set(TRANSLATION_SOURCE_HASH_HEADER, sourceHash)

  await caches.default.put(pendingKeyFor(requestUrl, locale), new Response(reason, { headers }))
}

async function putTranslationPendingMarkerSafely(requestUrl: URL, locale: Locale, reason: TranslationQueueReason, priority: boolean, sourceHash?: string): Promise<void> {
  try {
    await putTranslationPendingMarker(requestUrl, locale, reason, priority, sourceHash)
  } catch (error) {
    console.error('Failed to refresh translated page pending marker', { pathname: requestUrl.pathname, locale, reason, error: errorMessage(error) })
  }
}

function canonicalTranslationStoreUrl(requestUrl: URL, locale: Locale): string {
  const storeUrl = new URL(requestUrl)
  storeUrl.pathname = localizedPath(storeUrl.pathname, locale)
  applyNormalizedTranslationSearch(storeUrl, requestUrl)
  storeUrl.hash = ''
  return storeUrl.toString()
}

async function translationStoreKey(kind: 'pages' | 'state', requestUrl: URL, locale: Locale): Promise<string> {
  const urlHash = await sha256Hex(canonicalTranslationStoreUrl(requestUrl, locale))
  return `${kind}/${TRANSLATION_CACHE_VERSION}/${locale}/${urlHash}.json`
}

function withResponseHeaders(response: Response, cacheState: 'MISS' | 'HIT' | 'STALE' | 'BYPASS', isHead = false): Response {
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', CLIENT_NO_STORE)
  headers.set('CDN-Cache-Control', CLIENT_NO_STORE)
  headers.set('Cloudflare-CDN-Cache-Control', CLIENT_NO_STORE)
  headers.set('Pragma', 'no-cache')
  headers.set('Expires', '0')
  headers.set('X-Capgo-Translation-Cache', cacheState)
  headers.delete('ETag')
  headers.delete('Last-Modified')
  headers.delete('Content-Length')
  return new Response(isHead ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function temporaryEnglishRedirectResponse(requestUrl: URL, isHead = false): Response {
  const headers = new Headers({
    Location: localizedPath(requestUrl.pathname, DEFAULT_LOCALE) + requestUrl.search,
    'X-Capgo-Translation-Fallback': 'temporary-english-redirect',
  })
  return withResponseHeaders(new Response(null, { status: 302, headers }), 'BYPASS', isHead)
}

function toCachedResponse(response: Response, sourceHash?: string): Response {
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', `public, max-age=${CACHE_KEEP_SECONDS}`)
  headers.set('X-Capgo-Translated-At', Date.now().toString())
  if (sourceHash) headers.set(TRANSLATION_SOURCE_HASH_HEADER, sourceHash)
  headers.delete('Content-Length')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function splitLongCoreText(value: string): string[] {
  const chunks: string[] = []
  let cursor = 0

  while (cursor < value.length) {
    let end = Math.min(cursor + MAX_BATCH_CHARS, value.length)
    if (end < value.length) {
      let splitIndex = end - 1
      const minimumSplitIndex = cursor + Math.floor(MAX_BATCH_CHARS * 0.6)
      while (splitIndex > minimumSplitIndex && !isWhitespace(value[splitIndex])) splitIndex -= 1
      if (splitIndex > cursor) end = splitIndex + 1
    }

    chunks.push(value.slice(cursor, end))
    cursor = end
  }

  return chunks
}

function addSegment(parts: HtmlPart[], segments: Segment[], text: string, mode: Segment['mode'], inBody: boolean, quote?: string): void {
  if (!hasAsciiLetter(text)) {
    parts.push(text)
    return
  }

  const { start, end } = textCoreBounds(text)
  const leading = text.slice(0, start)
  const trailing = text.slice(end)
  const core = text.slice(start, end)
  if (!core || !hasAsciiLetter(core)) {
    parts.push(text)
    return
  }

  const chunks = splitLongCoreText(core)
  for (let index = 0; index < chunks.length; index += 1) {
    const segmentIndex =
      segments.push({
        text: chunks[index],
        leading: index === 0 ? leading : '',
        trailing: index === chunks.length - 1 ? trailing : '',
        mode,
        inBody,
        quote,
      }) - 1
    parts.push({ segmentIndex })
  }
}

function tagNameOf(tag: string): string | null {
  if (!tag.startsWith('<')) return null
  let index = tag.startsWith('</') ? 2 : 1
  while (index < tag.length && isWhitespace(tag[index])) index += 1

  const start = index
  while (index < tag.length && isNameChar(tag[index])) index += 1
  if (index === start) return null

  return tag.slice(start, index).toLowerCase()
}

function isClosingTag(tag: string): boolean {
  return tag.startsWith('</')
}

function isSelfClosingTag(tag: string, tagName: string): boolean {
  return tag.endsWith('/>') || VOID_TAGS.has(tagName)
}

function collectQuotedAttributes(tag: string): AttributeMatch[] {
  const attributes: AttributeMatch[] = []
  let index = 0

  while (index < tag.length) {
    const equalsIndex = tag.indexOf('=', index)
    if (equalsIndex === -1) break

    let nameEnd = equalsIndex
    while (nameEnd > index && isWhitespace(tag[nameEnd - 1])) nameEnd -= 1

    let nameStart = nameEnd
    while (nameStart > 0 && isNameChar(tag[nameStart - 1])) nameStart -= 1

    let quoteIndex = equalsIndex + 1
    while (quoteIndex < tag.length && isWhitespace(tag[quoteIndex])) quoteIndex += 1

    const quote = tag[quoteIndex]
    if (nameStart === nameEnd || (quote !== '"' && quote !== "'")) {
      index = equalsIndex + 1
      continue
    }

    const valueStart = quoteIndex + 1
    const valueEnd = tag.indexOf(quote, valueStart)
    if (valueEnd === -1) break

    attributes.push({
      name: tag.slice(nameStart, nameEnd),
      quote,
      value: tag.slice(valueStart, valueEnd),
      start: nameStart,
      valueStart,
      valueEnd,
      end: valueEnd + 1,
    })
    index = valueEnd + 1
  }

  return attributes
}

function readAttributeValue(tag: string, attrName: string): string | null {
  const normalizedAttr = attrName.toLowerCase()
  const attribute = collectQuotedAttributes(tag).find((item) => item.name.toLowerCase() === normalizedAttr)
  return attribute?.value ?? null
}

function isSupportedLanguagePath(value: string): boolean {
  return (ALL_LOCALES as readonly string[]).includes(value)
}

function languageSelectorTargetLocale(tag: string): string | null {
  const dataLanguage = readAttributeValue(tag, 'data-language')
  if (dataLanguage && isSupportedLanguagePath(dataLanguage)) return dataLanguage

  const id = readAttributeValue(tag, 'id')
  if (!id?.startsWith('language_')) return null

  const idLocale = id.slice('language_'.length)
  return isSupportedLanguagePath(idLocale) ? idLocale : null
}

function shouldSkipElementText(tag: string, tagName: string): boolean {
  if (SKIP_TEXT_TAGS.has(tagName)) return true

  const id = readAttributeValue(tag, 'id')
  if (id && (LANGUAGE_SELECTOR_SKIP_IDS.has(id) || id.startsWith('language_'))) return true

  return languageSelectorTargetLocale(tag) !== null
}

function getMetaKey(tag: string): string | null {
  return readAttributeValue(tag, 'name')?.toLowerCase() ?? readAttributeValue(tag, 'property')?.toLowerCase() ?? null
}

function shouldTranslateAttribute(tag: string, tagName: string, attrName: string, attrValue: string): boolean {
  const normalizedAttr = attrName.toLowerCase()
  const trimmed = attrValue.trim()
  if (!trimmed || !hasAsciiLetter(trimmed)) return false
  const lowerTrimmed = trimmed.toLowerCase()
  if (lowerTrimmed.startsWith('http:') || lowerTrimmed.startsWith('https:') || lowerTrimmed.startsWith('mailto:') || lowerTrimmed.startsWith('tel:')) return false
  if (trimmed.startsWith('#') || trimmed.startsWith('/') || trimmed.startsWith('{') || trimmed.startsWith('[')) return false

  if (tagName === 'meta' && normalizedAttr === 'content') {
    const metaKey = getMetaKey(tag)
    return Boolean(metaKey && TRANSLATABLE_META.has(metaKey))
  }

  return TRANSLATABLE_ATTRIBUTES.has(normalizedAttr)
}

function appendTag(parts: HtmlPart[], segments: Segment[], tag: string, skipText: boolean, inBody: boolean): void {
  const tagName = tagNameOf(tag)
  if (!tagName || skipText || isClosingTag(tag)) {
    parts.push(tag)
    return
  }

  let lastIndex = 0
  let matched = false

  for (const attribute of collectQuotedAttributes(tag)) {
    if (!shouldTranslateAttribute(tag, tagName, attribute.name, attribute.value)) continue

    parts.push(tag.slice(lastIndex, attribute.start), tag.slice(attribute.start, attribute.valueStart))
    addSegment(parts, segments, attribute.value, 'attribute', inBody, attribute.quote)
    parts.push(attribute.quote)
    lastIndex = attribute.end
    matched = true
  }

  if (!matched) {
    parts.push(tag)
    return
  }

  parts.push(tag.slice(lastIndex))
}

function findTagEnd(html: string, tagStartIndex: number): number | null {
  let quote: '"' | "'" | null = null

  for (let index = tagStartIndex + 1; index < html.length; index += 1) {
    const char = html[index]

    if (quote) {
      if (char === quote) quote = null
      continue
    }

    if (char === '"' || char === "'") {
      quote = char
      continue
    }

    if (char === '>') return index
  }

  return null
}

function findNextHtmlTag(html: string, startIndex: number): { index: number; end: number; tag: string } | null {
  const index = html.indexOf('<', startIndex)
  if (index === -1) return null

  if (html.startsWith('<!--', index)) {
    const commentEnd = html.indexOf('-->', index + 4)
    const end = commentEnd === -1 ? html.length : commentEnd + 3
    return { index, end, tag: html.slice(index, end) }
  }

  if (html.startsWith('<![CDATA[', index)) {
    const cdataEnd = html.indexOf(']]>', index + 9)
    const end = cdataEnd === -1 ? html.length : cdataEnd + 3
    return { index, end, tag: html.slice(index, end) }
  }

  const tagEnd = findTagEnd(html, index)
  if (tagEnd === null) return null
  const end = tagEnd + 1
  return { index, end, tag: html.slice(index, end) }
}

function findNamedTag(html: string, startIndex: number, needle: string): { index: number; end: number; tag: string } | null {
  const lowerHtml = html.toLowerCase()
  const lowerNeedle = needle.toLowerCase()
  let searchIndex = startIndex

  while (searchIndex < html.length) {
    const index = lowerHtml.indexOf(lowerNeedle, searchIndex)
    if (index === -1) return null

    const boundary = html[index + lowerNeedle.length] ?? ''
    if (!isTagNameBoundary(boundary)) {
      searchIndex = index + lowerNeedle.length
      continue
    }

    const tagEnd = findTagEnd(html, index)
    if (tagEnd === null) return null

    const end = tagEnd + 1
    return { index, end, tag: html.slice(index, end) }
  }

  return null
}

function findClosingTag(html: string, startIndex: number, tagName: string): { index: number; end: number; tag: string } | null {
  if (RAW_TEXT_SKIP_TAGS.has(tagName)) return findNamedTag(html, startIndex, `</${tagName}`)

  let depth = 1
  let cursor = startIndex

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) return null

    const nextTagName = tagNameOf(nextTag.tag)
    if (nextTagName === tagName) {
      if (isClosingTag(nextTag.tag)) {
        depth -= 1
        if (depth === 0) return nextTag
      } else if (!isSelfClosingTag(nextTag.tag, tagName)) {
        depth += 1
      }
    }

    cursor = nextTag.end
  }

  return null
}

function collectSegments(html: string): { parts: HtmlPart[]; segments: Segment[] } {
  const parts: HtmlPart[] = []
  const segments: Segment[] = []
  const skipStack: string[] = []
  let insideBody = false
  let lastIndex = 0

  while (lastIndex < html.length) {
    const skippedTagName = skipStack[skipStack.length - 1]
    if (skippedTagName) {
      const closingTag = findClosingTag(html, lastIndex, skippedTagName)
      if (!closingTag) {
        parts.push(html.slice(lastIndex))
        lastIndex = html.length
        break
      }

      parts.push(html.slice(lastIndex, closingTag.index), closingTag.tag)
      skipStack.pop()
      lastIndex = closingTag.end
      continue
    }

    const nextTag = findNextHtmlTag(html, lastIndex)
    if (!nextTag) break

    const { tag } = nextTag
    const text = html.slice(lastIndex, nextTag.index)

    if (text) {
      addSegment(parts, segments, text, 'text', insideBody)
    }

    const tagName = tagNameOf(tag)

    appendTag(parts, segments, tag, false, insideBody)

    if (tagName === 'body' && isClosingTag(tag)) {
      insideBody = false
    }

    if (tagName && !isClosingTag(tag) && !isSelfClosingTag(tag, tagName) && shouldSkipElementText(tag, tagName)) {
      skipStack.push(tagName)
    }

    if (tagName === 'body' && !isClosingTag(tag) && !isSelfClosingTag(tag, tagName)) {
      insideBody = true
    }

    lastIndex = nextTag.end
  }

  const tail = html.slice(lastIndex)
  if (tail) {
    if (skipStack.length > 0) parts.push(tail)
    else addSegment(parts, segments, tail, 'text', insideBody)
  }

  return { parts, segments }
}

function buildBatches(segments: Segment[]): string[][] {
  const batches: string[][] = []
  let currentBatch: string[] = []
  let currentLength = 0

  for (const segment of segments) {
    const nextLength = currentLength + segment.text.length
    if (currentBatch.length > 0 && (nextLength > MAX_BATCH_CHARS || currentBatch.length >= MAX_BATCH_ITEMS)) {
      batches.push(currentBatch)
      currentBatch = []
      currentLength = 0
    }
    currentBatch.push(segment.text)
    currentLength += segment.text.length
  }

  if (currentBatch.length > 0) batches.push(currentBatch)
  return batches
}

function recordOf(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null
}

function extractContentText(content: unknown): string {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''

  return content
    .map((item) => {
      if (typeof item === 'string') return item
      const itemRecord = recordOf(item)
      return typeof itemRecord?.text === 'string' ? itemRecord.text : ''
    })
    .join('')
}

function extractChoiceText(choice: unknown): string {
  const choiceRecord = recordOf(choice)
  if (!choiceRecord) return ''
  if (typeof choiceRecord.text === 'string') return choiceRecord.text

  const message = recordOf(choiceRecord.message)
  return message ? extractContentText(message.content) : ''
}

function extractChoicesText(choices: unknown): string {
  if (!Array.isArray(choices)) return ''

  for (const choice of choices) {
    const text = extractChoiceText(choice)
    if (text) return text
  }
  return ''
}

function extractAiPayload(result: unknown): unknown {
  if (typeof result === 'string' || Array.isArray(result)) return result

  const record = recordOf(result)
  if (!record) return ''

  for (const key of ['response', 'text', 'result', 'output']) {
    const value = record[key]
    if (Array.isArray(value)) {
      const text = extractContentText(value)
      return text || value
    }
    if (typeof value === 'string' || Array.isArray(value) || recordOf(value)) return value
  }

  const choicesText = extractChoicesText(record.choices)
  return choicesText || record
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    const base = `${error.name}: ${error.message}`
    return error.stack ? `${base}\n${error.stack}` : base
  }
  if (typeof error === 'string') return error
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

function stripJsonFence(value: string): string {
  let trimmed = value.trim()
  const lowerTrimmed = trimmed.toLowerCase()

  if (lowerTrimmed.startsWith('```json')) {
    trimmed = trimmed.slice(7).trimStart()
  } else if (trimmed.startsWith('```')) {
    trimmed = trimmed.slice(3).trimStart()
  }

  if (trimmed.endsWith('```')) {
    trimmed = trimmed.slice(0, -3).trimEnd()
  }

  return trimmed
}

function extractJsonArray(value: string): string | null {
  const start = value.indexOf('[')
  const end = value.lastIndexOf(']')
  if (start === -1 || end <= start) return null
  return value.slice(start, end + 1)
}

function parseJsonValue(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function stringArrayFromUnknown(value: unknown): string[] | null {
  return Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : null
}

function translationArrayFromUnknown(value: unknown): string[] | null {
  const directArray = stringArrayFromUnknown(value)
  if (directArray) return directArray

  const record = recordOf(value)
  if (!record) return null

  for (const key of ['translations', 'translated', 'translatedTexts', 'items', 'result', 'response', 'data']) {
    const nestedArray = stringArrayFromUnknown(record[key])
    if (nestedArray) return nestedArray
  }

  return null
}

function parseTranslationArray(rawValue: unknown): string[] | null {
  const directArray = translationArrayFromUnknown(rawValue)
  if (directArray) return directArray
  if (typeof rawValue !== 'string') return null

  const trimmed = stripJsonFence(rawValue)
  const parsed = translationArrayFromUnknown(parseJsonValue(trimmed))
  if (parsed) return parsed

  const jsonArray = extractJsonArray(trimmed)
  return jsonArray ? translationArrayFromUnknown(parseJsonValue(jsonArray)) : null
}

function aiPayloadPreview(value: unknown): string {
  let text = ''
  if (typeof value === 'string') {
    text = value
  } else {
    try {
      text = JSON.stringify(value) ?? ''
    } catch {
      text = String(value)
    }
  }
  return text.replace(/\s+/g, ' ').trim().slice(0, AI_OUTPUT_PREVIEW_CHARS)
}

function unquotePlainTranslation(value: string): string {
  const trimmed = stripJsonFence(value).trim()
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    const parsed = parseJsonValue(trimmed)
    if (typeof parsed === 'string') return parsed.trim()
  }
  return trimmed
}

function plainTranslationFromUnknown(value: unknown, depth = 0): string | null {
  if (depth > 3) return null
  if (typeof value === 'string') {
    const trimmed = stripJsonFence(value).trim()
    const parsed = parseJsonValue(trimmed)
    if (parsed !== null && typeof parsed !== 'string') {
      const nested = plainTranslationFromUnknown(parsed, depth + 1)
      if (nested) return nested
    }
    return unquotePlainTranslation(trimmed)
  }

  const array = stringArrayFromUnknown(value)
  if (array?.length === 1) return unquotePlainTranslation(array[0])

  const record = recordOf(value)
  if (!record) return null

  for (const key of ['translation', 'translated', 'translatedText', 'text', 'response', 'result', 'output', 'data']) {
    const nested = plainTranslationFromUnknown(record[key], depth + 1)
    if (nested) return nested
  }

  return null
}

function normalizedTranslationValue(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

function shouldCheckUnchangedTranslation(value: string): boolean {
  const normalized = normalizedTranslationValue(value)
  if (normalized.length < 20 || !hasAsciiLetter(normalized)) return false
  if (/[`{}[\]|\\/@#$%^*_+=<>]/.test(normalized)) return false
  if (/\b(?:https?|mailto|tel):/i.test(normalized)) return false
  if (/\.(?:js|ts|tsx|jsx|json|md|mdx|css|html|yml|yaml)\b/i.test(normalized)) return false

  const words = normalized.match(/[A-Za-z][A-Za-z'-]*/g) ?? []
  if (words.length < 4) return false
  return true
}

function assertTranslatedBatch(targetLanguage: string, batch: string[], translated: string[]): void {
  const candidates = batch
    .map((source, index) => ({
      source: normalizedTranslationValue(source),
      translated: normalizedTranslationValue(translated[index] ?? ''),
    }))
    .filter(({ source }) => shouldCheckUnchangedTranslation(source))

  if (candidates.length < 6) return

  const unchanged = candidates.filter(({ source, translated: target }) => source === target).length
  if (unchanged / candidates.length >= 0.6) {
    throw new Error(`Translation model left ${unchanged}/${candidates.length} ${targetLanguage} strings unchanged`)
  }
}

function bodyTranslationStats(segments: Segment[], translations: string[]): { candidateCount: number; changedCount: number } {
  const candidates = segments
    .map((segment, index) => ({
      source: normalizedTranslationValue(segment.text),
      translated: normalizedTranslationValue(translations[index] ?? ''),
      inBody: segment.inBody,
    }))
    .filter(({ source, inBody }) => inBody && shouldCheckUnchangedTranslation(source))

  return {
    candidateCount: candidates.length,
    changedCount: candidates.filter(({ source, translated }) => source !== translated).length,
  }
}

function assertTranslatedBody(targetLanguage: string, segments: Segment[], translations: string[]): void {
  const { candidateCount, changedCount } = bodyTranslationStats(segments, translations)
  if (candidateCount > 0 && changedCount === 0) {
    throw new Error(`Translation produced no changed body strings for ${targetLanguage}`)
  }
}

function isProtectedTokenBoundary(value: string, index: number): boolean {
  if (index < 0 || index >= value.length) return true
  const code = value.charCodeAt(index)
  return !((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57))
}

function protectedTokenAt(value: string, index: number): string | null {
  const lowerValue = value.toLowerCase()
  for (const token of PROTECTED_TRANSLATION_TOKENS) {
    if (!lowerValue.startsWith(token.toLowerCase(), index)) continue
    const matched = value.slice(index, index + token.length)
    if (!isProtectedTokenBoundary(value, index - 1) || !isProtectedTokenBoundary(value, index + matched.length)) continue
    return matched
  }
  return null
}

function protectTranslationTokens(value: string): {
  text: string
  restore(translated: string): string
  restoreOrSource(translated: string): { text: string; missingTokens: string[] }
} {
  let text = ''
  const replacements: [string, string][] = []

  for (let index = 0; index < value.length; ) {
    const token = protectedTokenAt(value, index)
    if (!token) {
      text += value[index]
      index += 1
      continue
    }

    const placeholder = `__CAPGO_KEEP_${replacements.length}__`
    replacements.push([placeholder, token])
    text += placeholder
    index += token.length
  }

  return {
    text,
    restore(translated: string): string {
      let restored = translated
      for (const [placeholder, token] of replacements) {
        if (!restored.includes(placeholder)) throw new Error(`Translation dropped protected token: ${token}`)
        restored = restored.split(placeholder).join(token)
      }
      return restored
    },
    restoreOrSource(translated: string): { text: string; missingTokens: string[] } {
      let restored = translated
      const missingTokens: string[] = []
      for (const [placeholder, token] of replacements) {
        if (!restored.includes(placeholder)) {
          missingTokens.push(token)
          continue
        }
        restored = restored.split(placeholder).join(token)
      }
      return missingTokens.length > 0 ? { text: value, missingTokens } : { text: restored, missingTokens }
    },
  }
}

function translationBatchJsonSchema(batchLength: number): Record<string, unknown> {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      translations: {
        type: 'array',
        minItems: batchLength,
        maxItems: batchLength,
        items: {
          type: 'string',
        },
      },
    },
    required: ['translations'],
  }
}

async function translateBatchWithJsonMode(env: Env, targetLanguage: string, batch: string[]): Promise<string[]> {
  const model = env.TRANSLATION_MODEL || DEFAULT_MODEL
  let lastError: Error | null = null
  const protectedBatch = batch.map((text) => protectTranslationTokens(text))

  for (let attempt = 1; attempt <= TRANSLATION_MODEL_ATTEMPTS; attempt += 1) {
    let payload: unknown = ''
    try {
      const result = await env.AI.run(model, {
        temperature: 0,
        max_tokens: 8192,
        response_format: {
          type: 'json_schema',
          json_schema: translationBatchJsonSchema(batch.length),
        },
        messages: [
          {
            role: 'system',
            content: [
              'You translate Capgo website copy for the target locale.',
              'Translate naturally for the user cultural context; adapt idioms, grammar, tone, and phrasing instead of translating word for word.',
              'Translate every human-readable label, heading, sentence, and paragraph into the target language, including short navigation labels.',
              'Preserve brand names, product names, developer terms, URLs, code identifiers, file paths, package names, language codes, numbers, punctuation, and whitespace meaning.',
              'Do not translate or transliterate literal tokens such as Capgo, Capacitor, code, API, SDK, CLI, npm, bun, GitHub, Cloudflare, package names, command names, and framework names.',
              'Source text may include placeholders like __CAPGO_KEEP_0__. Copy every placeholder exactly as written; placeholders are restored after translation.',
              `Return a JSON object with exactly one key named "translations". Its value must be an array of exactly ${batch.length} strings in the same order as the input. Do not return Markdown, comments, or explanations.`,
              attempt > 1 ? 'Your previous response was rejected. Fix the format and return only the JSON object matching the schema.' : '',
            ]
              .filter(Boolean)
              .join(' '),
          },
          {
            role: 'user',
            content: JSON.stringify({ targetLanguage, protectedTokens: PROTECTED_TRANSLATION_TOKENS, texts: protectedBatch.map((item) => item.text) }),
          },
        ],
      })

      payload = extractAiPayload(result)
      const translated = parseTranslationArray(payload)
      if (!translated) {
        lastError = new Error(`Translation model returned invalid JSON for ${targetLanguage}`)
      } else if (translated.length !== batch.length) {
        lastError = new Error(`Translation model returned ${translated.length} strings for ${batch.length} ${targetLanguage} strings`)
      } else {
        const restored = translated.map((text, index) => {
          const result = protectedBatch[index].restoreOrSource(text)
          if (result.missingTokens.length > 0) {
            console.warn('Translation kept source after protected token drop', {
              targetLanguage,
              index,
              missingTokens: result.missingTokens,
              sourcePreview: aiPayloadPreview(batch[index]),
              outputPreview: aiPayloadPreview(text),
            })
          }
          return result.text
        })
        assertTranslatedBatch(targetLanguage, batch, restored)
        return restored
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(errorMessage(error))
    }

    console.warn('Translation model response rejected', {
      targetLanguage,
      attempt,
      maxAttempts: TRANSLATION_MODEL_ATTEMPTS,
      batchSize: batch.length,
      error: lastError.message,
      outputPreview: aiPayloadPreview(payload),
    })
  }

  throw new Error(`Translation JSON mode failed for ${targetLanguage}: ${lastError?.message ?? 'unknown error'}`)
}

async function translateBatch(env: Env, targetLanguage: string, batch: string[]): Promise<string[]> {
  try {
    return await translateBatchWithJsonMode(env, targetLanguage, batch)
  } catch (error) {
    const message = errorMessage(error)
    console.warn('Translation batch JSON failed; falling back to single-text translation', {
      targetLanguage,
      batchSize: batch.length,
      error: message,
    })
  }

  return await translateBatchIndividually(env, targetLanguage, batch)
}

async function translateSingleText(env: Env, targetLanguage: string, text: string): Promise<string> {
  const model = env.TRANSLATION_MODEL || DEFAULT_MODEL
  let lastError: Error | null = null
  const protectedText = protectTranslationTokens(text)

  for (let attempt = 1; attempt <= TRANSLATION_SINGLE_TEXT_ATTEMPTS; attempt += 1) {
    let payload: unknown = ''
    try {
      const result = await env.AI.run(model, {
        temperature: 0,
        max_tokens: Math.min(2048, Math.max(256, text.length * 3 + 128)),
        messages: [
          {
            role: 'system',
            content: [
              'You translate one Capgo website string for the target locale.',
              'Translate naturally for the user cultural context; adapt idioms, grammar, tone, and phrasing instead of translating word for word.',
              'Preserve brand names, product names, developer terms, URLs, code identifiers, file paths, package names, language codes, numbers, punctuation, and whitespace meaning.',
              'Do not translate or transliterate literal tokens such as Capgo, Capacitor, code, API, SDK, CLI, npm, bun, GitHub, Cloudflare, package names, command names, and framework names.',
              'Source text may include placeholders like __CAPGO_KEEP_0__. Copy every placeholder exactly as written; placeholders are restored after translation.',
              'Return only the translated text. Do not return JSON, Markdown, labels, explanations, quotes around the whole answer, or extra lines.',
            ].join(' '),
          },
          {
            role: 'user',
            content: JSON.stringify({ targetLanguage, protectedTokens: PROTECTED_TRANSLATION_TOKENS, text: protectedText.text }),
          },
        ],
      })

      payload = extractAiPayload(result)
      const translated = plainTranslationFromUnknown(payload)
      if (translated) return protectedText.restore(translated)
      lastError = new Error(`Translation model returned empty text for ${targetLanguage}`)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(errorMessage(error))
    }

    console.warn('Single-text translation response rejected', {
      targetLanguage,
      attempt,
      maxAttempts: TRANSLATION_SINGLE_TEXT_ATTEMPTS,
      error: lastError.message,
      outputPreview: aiPayloadPreview(payload),
    })
  }

  if (lastError?.message.startsWith('Translation dropped protected token: ')) {
    console.warn('Single-text translation kept source after protected token drop', {
      targetLanguage,
      error: lastError.message,
      sourcePreview: aiPayloadPreview(text),
    })
    return text
  }

  throw new Error(`Single-text translation failed for ${targetLanguage}: ${lastError?.message ?? 'unknown error'}`)
}

async function translateBatchIndividually(env: Env, targetLanguage: string, batch: string[]): Promise<string[]> {
  const translated: string[] = []
  for (const text of batch) {
    translated.push(await translateSingleText(env, targetLanguage, text))
  }
  assertTranslatedBatch(targetLanguage, batch, translated)
  return translated
}

function logPathnameFromUrl(value: string): string {
  try {
    return new URL(value).pathname
  } catch {
    return ''
  }
}

function renderTranslatedHtml(parts: HtmlPart[], segments: Segment[], translations: string[]): string {
  return parts
    .map((part) => {
      if (typeof part === 'string') return part

      const segment = segments[part.segmentIndex]
      const translated = translations[part.segmentIndex]
      if (typeof translated !== 'string') throw new Error(`Missing translation for segment ${part.segmentIndex}`)
      if (segment.mode === 'attribute') {
        return `${segment.leading}${escapeHtmlAttribute(translated, segment.quote)}${segment.trailing}`
      }
      return `${segment.leading}${escapeHtmlText(translated)}${segment.trailing}`
    })
    .join('')
}

function isStringArrayArray(value: unknown): value is string[][] {
  return Array.isArray(value) && value.every((item) => Array.isArray(item) && item.every((nestedItem) => typeof nestedItem === 'string'))
}

function isStringPairArray(value: unknown): value is [string, string][] {
  return Array.isArray(value) && value.every((item) => Array.isArray(item) && item.length === 2 && typeof item[0] === 'string' && typeof item[1] === 'string')
}

function parseStoredJson(value: string): Record<string, unknown> | null {
  try {
    return recordOf(JSON.parse(value))
  } catch {
    return null
  }
}

function partialTranslationStateFrom(value: unknown, locale: Locale, sourceHash: string, batchCount: number): PartialTranslationState | null {
  const record = recordOf(value)
  if (!record) return null
  if (record.cacheVersion !== TRANSLATION_CACHE_VERSION || record.locale !== locale || record.sourceHash !== sourceHash) return null
  if (record.batchCount !== batchCount || !isStringArrayArray(record.translatedBatches)) return null
  if (record.translatedBatches.length > batchCount) return null
  if (typeof record.updatedAt !== 'number' || Date.now() - record.updatedAt > CACHE_KEEP_SECONDS * 1000) return null
  return {
    cacheVersion: TRANSLATION_CACHE_VERSION,
    locale,
    sourceHash,
    batchCount,
    translatedBatches: record.translatedBatches,
    updatedAt: record.updatedAt,
  }
}

function storedTranslatedResponseFrom(value: unknown, locale: Locale): StoredTranslatedResponse | null {
  const record = recordOf(value)
  if (!record) return null
  if (record.cacheVersion !== TRANSLATION_CACHE_VERSION || record.locale !== locale) return null
  if (typeof record.translatedAt !== 'number' || typeof record.status !== 'number' || typeof record.statusText !== 'string') return null
  if (!isStringPairArray(record.headers) || typeof record.body !== 'string') return null
  const bodyEncoding = record.bodyEncoding === 'base64' ? 'base64' : 'text'
  return {
    cacheVersion: TRANSLATION_CACHE_VERSION,
    locale,
    sourceHash: typeof record.sourceHash === 'string' ? record.sourceHash : undefined,
    translatedAt: record.translatedAt,
    status: record.status,
    statusText: record.statusText,
    headers: record.headers,
    bodyEncoding,
    body: record.body,
  }
}

function bytesToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000))
  }
  return btoa(binary)
}

function base64ToBytes(value: string): ArrayBuffer {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes.buffer
}

function isTextLikeContentType(value: string | null): boolean {
  const contentType = value?.toLowerCase() ?? ''
  if (contentType.startsWith('text/')) return true
  if (contentType.includes('charset=')) return true
  if (contentType.includes('+json') || contentType.includes('+xml')) return true
  return (
    contentType.includes('application/json') ||
    contentType.includes('application/javascript') ||
    contentType.includes('application/ld+json') ||
    contentType.includes('application/xml') ||
    contentType.includes('application/xhtml+xml') ||
    contentType.includes('image/svg+xml')
  )
}

async function readPartialTranslationState(env: Env, requestUrl: URL, locale: Locale, sourceHash: string, batchCount: number): Promise<PartialTranslationState | null> {
  const key = await translationStoreKey('state', requestUrl, locale)
  const object = await env.TRANSLATION_STORE.get(key)
  if (!object) return null
  return partialTranslationStateFrom(parseStoredJson(await object.text()), locale, sourceHash, batchCount)
}

async function writePartialTranslationState(env: Env, requestUrl: URL, locale: Locale, state: PartialTranslationState): Promise<void> {
  const key = await translationStoreKey('state', requestUrl, locale)
  await env.TRANSLATION_STORE.put(key, JSON.stringify(state))
}

async function deletePartialTranslationState(env: Env, requestUrl: URL, locale: Locale): Promise<void> {
  const key = await translationStoreKey('state', requestUrl, locale)
  await env.TRANSLATION_STORE.delete(key)
}

async function deletePartialTranslationStateSafely(env: Env, requestUrl: URL, locale: Locale): Promise<void> {
  try {
    await deletePartialTranslationState(env, requestUrl, locale)
  } catch (error) {
    console.error('Failed to delete partial translation state', { pathname: requestUrl.pathname, locale, error: errorMessage(error) })
  }
}

async function readStoredTranslatedResponse(env: Env, requestUrl: URL, locale: Locale): Promise<Response | null> {
  const key = await translationStoreKey('pages', requestUrl, locale)
  const object = await env.TRANSLATION_STORE.get(key)
  if (!object) return null

  const stored = storedTranslatedResponseFrom(parseStoredJson(await object.text()), locale)
  if (!stored) return null

  const headers = new Headers(stored.headers)
  headers.set('X-Capgo-Translated-At', stored.translatedAt.toString())
  if (stored.sourceHash) headers.set(TRANSLATION_SOURCE_HASH_HEADER, stored.sourceHash)
  headers.delete('Content-Length')
  const body = stored.bodyEncoding === 'base64' ? base64ToBytes(stored.body) : stored.body
  return new Response(body, {
    status: stored.status,
    statusText: stored.statusText,
    headers,
  })
}

async function writeStoredTranslatedResponse(env: Env, requestUrl: URL, locale: Locale, response: Response): Promise<void> {
  const key = await translationStoreKey('pages', requestUrl, locale)
  const headers: [string, string][] = []
  response.headers.forEach((value, name) => {
    if (name.toLowerCase() !== 'content-length') headers.push([name, value])
  })
  const sourceHash = readTranslationSourceHash(response)
  const stored: StoredTranslatedResponse = {
    cacheVersion: TRANSLATION_CACHE_VERSION,
    locale,
    sourceHash: sourceHash ?? undefined,
    translatedAt: readTranslatedAt(response) || Date.now(),
    status: response.status,
    statusText: response.statusText,
    headers,
    bodyEncoding: isTextLikeContentType(response.headers.get('Content-Type')) ? 'text' : 'base64',
    body: '',
  }
  stored.body = stored.bodyEncoding === 'text' ? await response.text() : bytesToBase64(await response.arrayBuffer())
  await env.TRANSLATION_STORE.put(key, JSON.stringify(stored))
}

async function cacheTranslatedResponse(env: Env, requestUrl: URL, locale: Locale, cacheKey: Request, response: Response): Promise<void> {
  await writeStoredTranslatedResponse(env, requestUrl, locale, response.clone())
  await caches.default.put(cacheKey, response)
}

async function repopulateTranslatedPageCacheSafely(cacheKey: Request, response: Response, requestUrl: URL, locale: Locale): Promise<void> {
  try {
    await caches.default.put(cacheKey, response)
  } catch (error) {
    console.error('Failed to repopulate translated page cache from R2', { pathname: requestUrl.pathname, locale, error: errorMessage(error) })
  }
}

function nextMissingBatchIndex(translatedBatches: string[][], batchCount: number): number {
  for (let index = 0; index < batchCount; index += 1) {
    if (!Array.isArray(translatedBatches[index])) return index
  }
  return batchCount
}

function flattenTranslatedBatches(translatedBatches: string[][], batchCount: number): string[] {
  const translations: string[] = []
  for (let index = 0; index < batchCount; index += 1) {
    const batch = translatedBatches[index]
    if (!Array.isArray(batch)) throw new Error(`Missing translated batch ${index}`)
    translations.push(...batch)
  }
  return translations
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return [...new Uint8Array(digest)].map((item) => item.toString(16).padStart(2, '0')).join('')
}

async function translationSourceHash(locale: Locale, sourceHtml: string): Promise<string> {
  return await sha256Hex(`${TRANSLATION_CACHE_VERSION}:${locale}:${sourceHtml}`)
}

function setLinkRel(html: string, rel: string, tag: string): string {
  const replaced = replaceFirstTagByAttribute(html, 'link', 'rel', rel, tag)
  if (replaced) return replaced
  return insertBeforeClosingTag(html, 'head', tag)
}

function setMetaContent(html: string, keyName: 'name' | 'property', keyValue: string, content: string): string {
  let cursor = 0

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) break

    if (tagNameOf(nextTag.tag) === 'meta' && readAttributeValue(nextTag.tag, keyName)?.toLowerCase() === keyValue.toLowerCase()) {
      const updatedTag = replaceTagAttributeValue(nextTag.tag, 'content', content)
      if (!updatedTag) return html
      return `${html.slice(0, nextTag.index)}${updatedTag}${html.slice(nextTag.end)}`
    }

    cursor = nextTag.end
  }

  return html
}

function alternateLinks(requestUrl: URL, basePath: string): string {
  const links = ALL_LOCALES.map((locale) => {
    const href = localizedAbsoluteUrl(requestUrl, locale, basePath)
    return `<link rel="alternate" hreflang="${locale}" href="${escapeHtmlAttribute(href)}" />`
  })
  const xDefault = localizedAbsoluteUrl(requestUrl, DEFAULT_LOCALE, basePath)
  links.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttribute(xDefault)}" />`)
  return links.join('\n')
}

function localizeUrlAttributes(html: string, locale: Locale, basePath: string, requestUrl: URL): string {
  let rewritten = ''
  let cursor = 0

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) break

    rewritten += html.slice(cursor, nextTag.index)
    rewritten += localizeTagUrlAttributes(nextTag.tag, locale, basePath, requestUrl)
    cursor = nextTag.end
  }

  return `${rewritten}${html.slice(cursor)}`
}

function findOpeningTag(html: string, tagName: string): { index: number; end: number; tag: string } | null {
  return findNamedTag(html, 0, `<${tagName}`)
}

function updateHtmlLang(html: string, locale: Locale): string {
  const htmlTag = findOpeningTag(html, 'html')
  if (!htmlTag) return html

  const langAttribute = collectQuotedAttributes(htmlTag.tag).find((attribute) => attribute.name.toLowerCase() === 'lang')
  let updatedTag = htmlTag.tag

  if (langAttribute) {
    updatedTag = `${htmlTag.tag.slice(0, langAttribute.valueStart)}${locale}${htmlTag.tag.slice(langAttribute.valueEnd)}`
  } else {
    const insertIndex = htmlTag.tag.endsWith('/>') ? htmlTag.tag.length - 2 : htmlTag.tag.length - 1
    updatedTag = `${htmlTag.tag.slice(0, insertIndex)} lang="${locale}"${htmlTag.tag.slice(insertIndex)}`
  }

  return `${html.slice(0, htmlTag.index)}${updatedTag}${html.slice(htmlTag.end)}`
}

function replaceTagAttributeValue(tag: string, attrName: string, value: string): string | null {
  const normalizedAttr = attrName.toLowerCase()
  const attribute = collectQuotedAttributes(tag).find((item) => item.name.toLowerCase() === normalizedAttr)
  if (!attribute) return null
  return `${tag.slice(0, attribute.valueStart)}${escapeHtmlAttribute(value, attribute.quote)}${tag.slice(attribute.valueEnd)}`
}

function localizeTagUrlAttributes(tag: string, locale: Locale, basePath: string, requestUrl: URL): string {
  let rewritten = ''
  let lastIndex = 0
  let changed = false
  const targetLanguageLocale = languageSelectorTargetLocale(tag)

  for (const attribute of collectQuotedAttributes(tag)) {
    const name = attribute.name.toLowerCase()
    if (name !== 'href' && name !== 'action') continue

    const localized = name === 'href' && targetLanguageLocale ? `${localizedPath(basePath, targetLanguageLocale)}${requestUrl.search}` : localizeHref(attribute.value, locale)
    if (localized === attribute.value) continue

    rewritten += tag.slice(lastIndex, attribute.valueStart)
    rewritten += escapeHtmlAttribute(localized, attribute.quote)
    lastIndex = attribute.valueEnd
    changed = true
  }

  if (!changed) return tag
  return `${rewritten}${tag.slice(lastIndex)}`
}

function replaceFirstTagByAttribute(html: string, tagName: string, attrName: string, attrValue: string, replacement: string): string | null {
  let cursor = 0
  const normalizedValue = attrValue.toLowerCase()

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) break

    if (tagNameOf(nextTag.tag) === tagName && readAttributeValue(nextTag.tag, attrName)?.toLowerCase() === normalizedValue) {
      return `${html.slice(0, nextTag.index)}${replacement}${html.slice(nextTag.end)}`
    }

    cursor = nextTag.end
  }

  return null
}

function removeTagsByAttribute(html: string, tagName: string, attrName: string, attrValue: string): string {
  let rewritten = ''
  let cursor = 0
  const normalizedValue = attrValue.toLowerCase()

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) break

    rewritten += html.slice(cursor, nextTag.index)
    if (tagNameOf(nextTag.tag) === tagName && readAttributeValue(nextTag.tag, attrName)?.toLowerCase() === normalizedValue) {
      cursor = nextTag.end
      while (cursor < html.length && isWhitespace(html[cursor])) cursor += 1
      continue
    }

    rewritten += nextTag.tag
    cursor = nextTag.end
  }

  return `${rewritten}${html.slice(cursor)}`
}

function insertAfterFirstTagByAttribute(html: string, tagName: string, attrName: string, attrValue: string, insertion: string): string {
  let cursor = 0
  const normalizedValue = attrValue.toLowerCase()

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) break

    if (tagNameOf(nextTag.tag) === tagName && readAttributeValue(nextTag.tag, attrName)?.toLowerCase() === normalizedValue) {
      return `${html.slice(0, nextTag.end)}\n${insertion}${html.slice(nextTag.end)}`
    }

    cursor = nextTag.end
  }

  return html
}

function insertBeforeClosingTag(html: string, tagName: string, insertion: string): string {
  const closingTag = `</${tagName.toLowerCase()}>`
  const index = html.toLowerCase().lastIndexOf(closingTag)
  if (index === -1) return `${html}\n${insertion}`
  return `${html.slice(0, index)}${insertion}\n${html.slice(index)}`
}

function replaceElementContentById(html: string, tagName: string, id: string, content: string): string {
  let cursor = 0
  const closingTag = `</${tagName.toLowerCase()}>`
  const lowerHtml = html.toLowerCase()

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) break

    if (tagNameOf(nextTag.tag) === tagName && !isClosingTag(nextTag.tag) && readAttributeValue(nextTag.tag, 'id') === id) {
      const closeIndex = lowerHtml.indexOf(closingTag, nextTag.end)
      if (closeIndex === -1) return html
      return `${html.slice(0, nextTag.end)}${content}${html.slice(closeIndex)}`
    }

    cursor = nextTag.end
  }

  return html
}

function updateFooterLanguageButton(html: string, locale: Locale): string {
  const flag = LANGUAGE_FLAG_ENTITIES[locale] || LANGUAGE_FLAG_ENTITIES[DEFAULT_LOCALE]
  return replaceElementContentById(
    html,
    'button',
    'language-dropdown-button',
    `
            <span class="mr-2">${flag}</span>
            ${locale.toUpperCase()}
            <span class="ml-1">&#9662;</span>
          `,
  )
}

function languageSelectorHashScript(): string {
  return `<script id="capgo-edge-language-selector-hash">
(() => {
  if (!window.location.hash) return;

  document.querySelectorAll('a[id^="language_"][href], a[data-language][href]').forEach((item) => {
    const href = item.getAttribute('href');
    if (!href || href.startsWith('http:') || href.startsWith('https:') || href.startsWith('//')) return;

    const url = new URL(href, window.location.origin);
    url.hash = window.location.hash;
    item.setAttribute('href', url.pathname + url.search + url.hash);
  });
})();
</script>`
}

function rewriteMetadataAndLinks(html: string, requestUrl: URL, locale: Locale): string {
  const basePath = stripLocalePrefix(requestUrl.pathname)
  const localizedUrl = localizedAbsoluteUrl(requestUrl, locale, basePath)
  let rewritten = updateHtmlLang(html, locale)

  rewritten = removeTagsByAttribute(rewritten, 'link', 'rel', 'alternate')
  rewritten = setLinkRel(rewritten, 'canonical', `<link rel="canonical" href="${escapeHtmlAttribute(localizedUrl)}" />`)
  rewritten = insertAfterFirstTagByAttribute(rewritten, 'link', 'rel', 'canonical', alternateLinks(requestUrl, basePath))
  rewritten = setMetaContent(rewritten, 'property', 'og:url', localizedUrl)
  rewritten = setMetaContent(rewritten, 'property', 'twitter:url', localizedUrl)
  rewritten = setMetaContent(rewritten, 'name', 'twitter:url', localizedUrl)
  rewritten = localizeUrlAttributes(rewritten, locale, basePath, requestUrl)
  rewritten = updateFooterLanguageButton(rewritten, locale)
  if (!rewritten.includes('capgo-edge-language-selector-hash')) {
    rewritten = insertBeforeClosingTag(rewritten, 'body', languageSelectorHashScript())
  }

  return rewritten
}

async function loadSourceHtml(request: Request, env: Env, requestUrl: URL, locale: Locale): Promise<SourceHtmlResult> {
  const originResponse = await fetchEnglishOrigin(request, env, requestUrl)
  if (isRedirect(originResponse)) return { type: 'response', response: localizeRedirect(originResponse, requestUrl, locale) }
  if (!isHtmlResponse(originResponse) || !originResponse.ok) return { type: 'response', response: originResponse }

  const contentLength = Number.parseInt(originResponse.headers.get('Content-Length') || '0', 10)
  if (Number.isFinite(contentLength) && contentLength > MAX_HTML_BYTES) {
    throw new Error(`Source HTML is too large to translate: ${contentLength} bytes`)
  }

  const sourceHtml = await originResponse.text()
  if (new TextEncoder().encode(sourceHtml).length > MAX_HTML_BYTES) {
    throw new Error(`Source HTML is too large to translate after download: ${sourceHtml.length} characters`)
  }

  return { type: 'html', originResponse, sourceHtml }
}

function createTranslatedHtmlResponse(originResponse: Response, translatedHtml: string, requestUrl: URL, locale: Locale): Response {
  const localizedHtml = rewriteMetadataAndLinks(translatedHtml, requestUrl, locale)
  const headers = new Headers(originResponse.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.delete('Content-Length')
  return new Response(localizedHtml, {
    status: originResponse.status,
    statusText: originResponse.statusText,
    headers,
  })
}

async function sendTranslationJob(env: Env, job: TranslationJob): Promise<void> {
  const queue = job.priority && env.TRANSLATION_PRIORITY_QUEUE ? env.TRANSLATION_PRIORITY_QUEUE : env.TRANSLATION_QUEUE
  await queue.send(job)
}

async function translationCoordinatorName(requestUrl: URL, locale: Locale): Promise<string> {
  return await sha256Hex(`${TRANSLATION_CACHE_VERSION}:${locale}:${canonicalTranslationStoreUrl(requestUrl, locale)}`)
}

async function coordinateTranslationJob(env: Env, requestUrl: URL, locale: Locale, job: TranslationJob): Promise<boolean> {
  if (!env.TRANSLATION_COORDINATOR) {
    await sendTranslationJob(env, job)
    return true
  }

  const id = env.TRANSLATION_COORDINATOR.idFromName(await translationCoordinatorName(requestUrl, locale))
  const response = await env.TRANSLATION_COORDINATOR.get(id).fetch('https://translation-coordinator/enqueue', {
    method: 'POST',
    body: JSON.stringify(job),
  })
  if (!response.ok) throw new Error(`Translation coordinator failed to enqueue: ${response.status} ${await response.text()}`)

  const payload = (await response.json()) as { queued?: unknown }
  return payload.queued === true
}

async function clearTranslationCoordinatorSafely(env: Env, requestUrl: URL, locale: Locale, job: TranslationJob): Promise<void> {
  if (!env.TRANSLATION_COORDINATOR) return

  try {
    const id = env.TRANSLATION_COORDINATOR.idFromName(await translationCoordinatorName(requestUrl, locale))
    await env.TRANSLATION_COORDINATOR.get(id).fetch('https://translation-coordinator/complete', {
      method: 'POST',
      body: JSON.stringify(job),
    })
  } catch (error) {
    console.error('Failed to clear translation coordinator', { pathname: requestUrl.pathname, locale, error: errorMessage(error) })
  }
}

async function refreshCacheIncrementally(
  request: Request,
  env: Env,
  requestUrl: URL,
  locale: Locale,
  cacheKey: Request,
  expectedSourceHash?: string,
  priority = false,
): Promise<boolean> {
  const renderRequest = request.method === 'GET' ? request : new Request(request, { method: 'GET' })
  const source = await loadSourceHtml(renderRequest, env, requestUrl, locale)
  if (source.type === 'response') {
    if (isStableTerminalResponse(source.response)) {
      const cachedResponse = toCachedResponse(source.response.clone())
      await cacheTranslatedResponse(env, requestUrl, locale, cacheKey, cachedResponse)
      await deletePartialTranslationStateSafely(env, requestUrl, locale)
      return true
    }

    throw new Error(`Translation source returned transient response: ${source.response.status} ${source.response.statusText}`)
  }

  const sourceHash = await translationSourceHash(locale, source.sourceHtml)
  const { parts, segments } = collectSegments(source.sourceHtml)
  if (segments.length === 0) {
    const response = createTranslatedHtmlResponse(source.originResponse, source.sourceHtml, requestUrl, locale)
    const cachedResponse = toCachedResponse(response.clone(), sourceHash)
    await cacheTranslatedResponse(env, requestUrl, locale, cacheKey, cachedResponse)
    await deletePartialTranslationStateSafely(env, requestUrl, locale)
    return true
  }

  const batches = buildBatches(segments)
  const state = await readPartialTranslationState(env, requestUrl, locale, sourceHash, batches.length)
  if (expectedSourceHash && expectedSourceHash !== sourceHash) {
    console.log('Translation source changed during continuation', { pathname: requestUrl.pathname, locale })
  }
  const translatedBatches = state?.translatedBatches ?? []

  let translatedInThisJob = 0
  let batchIndex = nextMissingBatchIndex(translatedBatches, batches.length)

  while (batchIndex < batches.length && translatedInThisJob < TRANSLATION_BATCHES_PER_QUEUE_JOB) {
    const translatedBatch = await translateBatch(env, LANGUAGE_NAMES[locale], batches[batchIndex])
    translatedBatches[batchIndex] = translatedBatch
    translatedInThisJob += 1
    batchIndex = nextMissingBatchIndex(translatedBatches, batches.length)

    if (batchIndex < batches.length) {
      await writePartialTranslationState(env, requestUrl, locale, {
        cacheVersion: TRANSLATION_CACHE_VERSION,
        locale,
        sourceHash,
        batchCount: batches.length,
        translatedBatches,
        updatedAt: Date.now(),
      })
    }
  }

  if (batchIndex < batches.length) {
    await writePartialTranslationState(env, requestUrl, locale, {
      cacheVersion: TRANSLATION_CACHE_VERSION,
      locale,
      sourceHash,
      batchCount: batches.length,
      translatedBatches,
      updatedAt: Date.now(),
    })
    await putTranslationPendingMarkerSafely(requestUrl, locale, 'continue', priority, sourceHash)
    await sendTranslationJob(env, {
      url: requestUrl.toString(),
      locale,
      cacheVersion: TRANSLATION_CACHE_VERSION,
      reason: 'continue',
      sourceHash,
      priority,
    })
    console.log('Translation queue job continued', { pathname: requestUrl.pathname, locale, batchIndex, batchCount: batches.length })
    return false
  }

  const translations = flattenTranslatedBatches(translatedBatches, batches.length)
  if (translations.length !== segments.length) {
    throw new Error(`Partial translation produced ${translations.length} strings for ${segments.length} HTML segments`)
  }
  assertTranslatedBody(LANGUAGE_NAMES[locale], segments, translations)

  const translatedHtml = renderTranslatedHtml(parts, segments, translations)
  const response = createTranslatedHtmlResponse(source.originResponse, translatedHtml, requestUrl, locale)
  if (response.ok && isHtmlResponse(response)) {
    const cachedResponse = toCachedResponse(response.clone(), sourceHash)
    await cacheTranslatedResponse(env, requestUrl, locale, cacheKey, cachedResponse)
  }
  await deletePartialTranslationStateSafely(env, requestUrl, locale)
  return true
}

async function enqueueTranslation(env: Env, requestUrl: URL, locale: Locale, reason: TranslationQueueReason, priority: boolean, sourceHash?: string): Promise<void> {
  const pendingKey = pendingKeyFor(requestUrl, locale)

  try {
    const pending = await caches.default.match(pendingKey)
    if (pending) {
      const alreadyPriority = pending.headers.get('X-Capgo-Translation-Priority') === '1'
      const pendingSourceHash = pending.headers.get(TRANSLATION_SOURCE_HASH_HEADER)
      if ((!sourceHash || pendingSourceHash === sourceHash) && (alreadyPriority || !priority)) return
    }
  } catch (error) {
    console.error('Failed to mark translated page as pending', { pathname: requestUrl.pathname, locale, reason, error: errorMessage(error) })
  }

  await coordinateTranslationJob(env, requestUrl, locale, {
    url: requestUrl.toString(),
    locale,
    cacheVersion: TRANSLATION_CACHE_VERSION,
    reason,
    priority,
    sourceHash,
  })
  await putTranslationPendingMarkerSafely(requestUrl, locale, reason, priority, sourceHash)
}

async function enqueueTranslationSafely(env: Env, requestUrl: URL, locale: Locale, reason: TranslationQueueReason, priority: boolean, sourceHash?: string): Promise<void> {
  try {
    await enqueueTranslation(env, requestUrl, locale, reason, priority, sourceHash)
  } catch (error) {
    console.error('Failed to enqueue translated page', { pathname: requestUrl.pathname, locale, reason, error: errorMessage(error) })
  }
}

function scheduleTranslationBackgroundTask(ctx: WorkerExecutionContext | undefined, task: Promise<void>): void {
  if (ctx) {
    ctx.waitUntil(task)
    return
  }
  void task
}

async function checkTranslatedSourceFreshness(env: Env, requestUrl: URL, locale: Locale, translatedResponse: Response, priority: boolean): Promise<void> {
  const checkKey = sourceCheckKeyFor(requestUrl, locale)
  const alreadyChecked = await caches.default.match(checkKey)
  if (alreadyChecked) return

  const knownSourceHash = readTranslationSourceHash(translatedResponse)
  await caches.default.put(
    checkKey,
    new Response(knownSourceHash ?? '', {
      headers: {
        'Cache-Control': `public, max-age=${TRANSLATION_SOURCE_CHECK_SECONDS}`,
        'X-Capgo-Translation-Source-Checked-At': Date.now().toString(),
      },
    }),
  )

  const renderRequest = new Request(requestUrl.toString(), {
    method: 'GET',
    headers: {
      Accept: 'text/html',
    },
  })
  const source = await loadSourceHtml(renderRequest, env, requestUrl, locale)
  if (source.type !== 'html') return

  const currentSourceHash = await translationSourceHash(locale, source.sourceHtml)
  if (knownSourceHash === currentSourceHash) return

  await enqueueTranslation(env, requestUrl, locale, 'stale', priority, currentSourceHash)
}

async function checkTranslatedSourceFreshnessSafely(env: Env, requestUrl: URL, locale: Locale, translatedResponse: Response, priority: boolean): Promise<void> {
  try {
    await checkTranslatedSourceFreshness(env, requestUrl, locale, translatedResponse, priority)
  } catch (error) {
    console.error('Failed to check translated page source freshness', { pathname: requestUrl.pathname, locale, error: errorMessage(error) })
  }
}

function scheduleTranslatedSourceCheck(ctx: WorkerExecutionContext | undefined, env: Env, requestUrl: URL, locale: Locale, translatedResponse: Response, priority: boolean): void {
  scheduleTranslationBackgroundTask(ctx, checkTranslatedSourceFreshnessSafely(env, new URL(requestUrl), locale, translatedResponse, priority))
}

async function processTranslationJob(job: TranslationJob, env: Env): Promise<void> {
  if (job.cacheVersion !== TRANSLATION_CACHE_VERSION || !isSupportedLocale(job.locale)) return

  const requestUrl = new URL(job.url)
  requestUrl.pathname = localizedPath(requestUrl.pathname, job.locale)
  const cacheKey = cacheKeyFor(requestUrl, job.locale)
  const pendingKey = pendingKeyFor(requestUrl, job.locale)
  let completed = false

  try {
    const cachedResponse = await caches.default.match(cacheKey)
    if (cachedResponse) {
      if (isTranslatedResponseFreshForJob(cachedResponse, job)) {
        await deletePartialTranslationStateSafely(env, requestUrl, job.locale)
        completed = true
        return
      }
    }

    const storedResponse = await readStoredTranslatedResponse(env, requestUrl, job.locale)
    if (storedResponse) {
      if (isTranslatedResponseFreshForJob(storedResponse, job)) {
        await repopulateTranslatedPageCacheSafely(cacheKey, storedResponse.clone(), requestUrl, job.locale)
        await deletePartialTranslationStateSafely(env, requestUrl, job.locale)
        completed = true
        return
      }
    }

    const renderRequest = new Request(requestUrl.toString(), {
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'Accept-Language': job.locale,
      },
    })
    completed = await refreshCacheIncrementally(renderRequest, env, requestUrl, job.locale, cacheKey, job.sourceHash, job.priority === true)
  } finally {
    if (completed) {
      try {
        await caches.default.delete(pendingKey)
      } catch (error) {
        console.error('Failed to clear translated page pending marker', { pathname: requestUrl.pathname, locale: job.locale, error: errorMessage(error) })
      }
      await clearTranslationCoordinatorSafely(env, requestUrl, job.locale, job)
    }
  }
}

async function serveTranslated(request: Request, env: Env, requestUrl: URL, locale: Locale, ctx?: WorkerExecutionContext): Promise<Response> {
  const cacheKey = cacheKeyFor(requestUrl, locale)
  const cachedResponse = await caches.default.match(cacheKey)
  const isHead = request.method === 'HEAD'
  const priority = shouldUsePriorityTranslationQueue(request)

  if (cachedResponse) {
    const translatedAt = readTranslatedAt(cachedResponse)
    const isStale = Date.now() - translatedAt > FRESH_MS
    if (isStale) {
      scheduleTranslationBackgroundTask(ctx, enqueueTranslationSafely(env, requestUrl, locale, 'stale', priority))
    } else {
      scheduleTranslatedSourceCheck(ctx, env, requestUrl, locale, cachedResponse, priority)
    }
    return withResponseHeaders(cachedResponse, isStale ? 'STALE' : 'HIT', isHead)
  }

  const storedResponse = await readStoredTranslatedResponse(env, requestUrl, locale)
  if (storedResponse) {
    const translatedAt = readTranslatedAt(storedResponse)
    const isStale = Date.now() - translatedAt > FRESH_MS
    await repopulateTranslatedPageCacheSafely(cacheKey, storedResponse.clone(), requestUrl, locale)
    if (isStale) {
      scheduleTranslationBackgroundTask(ctx, enqueueTranslationSafely(env, requestUrl, locale, 'stale', priority))
    } else {
      scheduleTranslatedSourceCheck(ctx, env, requestUrl, locale, storedResponse, priority)
    }
    return withResponseHeaders(storedResponse, isStale ? 'STALE' : 'HIT', isHead)
  }

  if (request.method !== 'GET') {
    return temporaryEnglishRedirectResponse(requestUrl, isHead)
  }

  await enqueueTranslationSafely(env, requestUrl, locale, 'miss', priority)
  return temporaryEnglishRedirectResponse(requestUrl, isHead)
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': CLIENT_NO_STORE,
    },
  })
}

async function probeRuntimeStorage(env: Env, requestUrl: URL): Promise<{ cache: true; r2: true }> {
  const nonce = crypto.randomUUID()
  const cacheProbeKey = new Request(`${requestUrl.origin}${TRANSLATION_TEST_ROUTE_PREFIX}/cache/${nonce}`, { method: 'GET' })
  let cachedText = ''
  try {
    await caches.default.put(
      cacheProbeKey,
      new Response(nonce, {
        headers: {
          'Cache-Control': 'public, max-age=60',
        },
      }),
    )
    const cached = await caches.default.match(cacheProbeKey)
    cachedText = cached ? await cached.text() : ''
  } finally {
    try {
      await caches.default.delete(cacheProbeKey)
    } catch {
      // Best-effort cleanup for the test probe.
    }
  }
  if (cachedText !== nonce) throw new Error('Real Cache API probe failed')

  const r2Key = `tests/${nonce}.txt`
  let objectText = ''
  try {
    await env.TRANSLATION_STORE.put(r2Key, nonce)
    const object = await env.TRANSLATION_STORE.get(r2Key)
    objectText = object ? await object.text() : ''
  } finally {
    try {
      await env.TRANSLATION_STORE.delete(r2Key)
    } catch {
      // Best-effort cleanup for the test probe.
    }
  }
  if (objectText !== nonce) throw new Error('Real R2 probe failed')

  return { cache: true, r2: true }
}

function testProbeNumberParam(requestUrl: URL, name: string, defaultValue: number, minimum: number, maximum: number): number {
  const rawValue = requestUrl.searchParams.get(name)
  if (!rawValue) return defaultValue

  const value = Number.parseInt(rawValue, 10)
  if (!Number.isFinite(value)) return defaultValue
  return Math.min(maximum, Math.max(minimum, value))
}

function testProbeLocaleParam(requestUrl: URL): Locale {
  const rawLocale = requestUrl.searchParams.get('locale') || 'es'
  return isSupportedLocale(rawLocale) ? rawLocale : 'es'
}

function testProbePathParam(requestUrl: URL): string {
  const rawPath = requestUrl.searchParams.get('path') || '/'
  const pathUrl = new URL(rawPath, 'https://capgo.app')
  const pathname = normalizePathname(stripLocalePrefix(pathUrl.pathname))
  if (shouldBypassTranslation(pathname)) throw new Error(`Real page probe cannot translate bypassed path: ${pathname}`)
  return `${pathname}${pathUrl.search}`
}

function testProbeCheckParams(requestUrl: URL): string[] {
  return requestUrl.searchParams
    .getAll('check')
    .map((value) => value.trim())
    .filter(Boolean)
}

function findBatchPositionForSegmentIndex(batches: string[][], targetSegmentIndex: number): { batchIndex: number; textIndex: number } | null {
  let segmentIndex = 0
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
    const batch = batches[batchIndex]
    for (let textIndex = 0; textIndex < batch.length; textIndex += 1) {
      if (segmentIndex === targetSegmentIndex) return { batchIndex, textIndex }
      segmentIndex += 1
    }
  }
  return null
}

function findBatchText(segments: Segment[], batches: string[][], expectedText: string): { batchIndex: number; textIndex: number; source: string } | null {
  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
    const segment = segments[segmentIndex]
    if (!segment.inBody || segment.mode !== 'text' || !segment.text.includes(expectedText)) continue

    const position = findBatchPositionForSegmentIndex(batches, segmentIndex)
    if (position) return { ...position, source: segment.text }
  }
  return null
}

function selectBodyProbeChecks(segments: Segment[], batches: string[][], maximum = 3): { check: string; batchIndex: number; textIndex: number; source: string }[] {
  const selected: { check: string; batchIndex: number; textIndex: number; source: string }[] = []
  const fallback: { check: string; batchIndex: number; textIndex: number; source: string }[] = []

  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
    const segment = segments[segmentIndex]
    if (!segment.inBody || segment.mode !== 'text' || !hasAsciiLetter(segment.text)) continue

    const position = findBatchPositionForSegmentIndex(batches, segmentIndex)
    if (!position) continue

    const check = normalizedTranslationValue(segment.text).slice(0, 80)
    const item = { check, ...position, source: segment.text }
    if (shouldCheckUnchangedTranslation(segment.text)) selected.push(item)
    else if (check.length >= 4) fallback.push(item)
    if (selected.length >= maximum) return selected
  }

  return selected.length > 0 ? selected : fallback.slice(0, maximum)
}

async function probeRealPageTranslation(env: Env, requestUrl: URL): Promise<Record<string, unknown>> {
  const locale = testProbeLocaleParam(requestUrl)
  const targetLanguage = LANGUAGE_NAMES[locale]
  const path = testProbePathParam(requestUrl)
  const maxBatches = testProbeNumberParam(requestUrl, 'batches', 2, 1, 4)
  const requiredChecks = testProbeCheckParams(requestUrl)
  const sourceUrl = new URL(path, 'https://capgo.app')
  const sourceResponse = await fetch(sourceUrl.toString(), {
    headers: {
      Accept: 'text/html',
      'Accept-Language': DEFAULT_LOCALE,
      'X-Capgo-Translation-Origin': 'real-page-probe',
    },
  })

  if (!sourceResponse.ok || !isHtmlResponse(sourceResponse)) {
    throw new Error(`Real page probe source failed: ${sourceResponse.status} ${sourceResponse.statusText}`)
  }

  const sourceHtml = await sourceResponse.text()
  const { segments } = collectSegments(sourceHtml)
  const batches = buildBatches(segments)
  if (batches.length === 0) throw new Error(`Real page probe found no translatable segments for ${path}`)

  const selectedBatchIndexes = new Set<number>()
  const batchLimit = Math.min(maxBatches, batches.length)
  for (let batchIndex = 0; batchIndex < batchLimit; batchIndex += 1) {
    selectedBatchIndexes.add(batchIndex)
  }

  const checkSources =
    requiredChecks.length > 0
      ? requiredChecks.map((check) => {
          const found = findBatchText(segments, batches, check)
          if (!found) throw new Error(`Real page probe did not collect required body text for ${path}: ${check}`)
          selectedBatchIndexes.add(found.batchIndex)
          return { check, ...found }
        })
      : selectBodyProbeChecks(segments, batches)
  if (checkSources.length === 0) throw new Error(`Real page probe found no body text checks for ${path}`)
  for (const checkSource of checkSources) {
    selectedBatchIndexes.add(checkSource.batchIndex)
  }

  const translatedBatchMap = new Map<number, string[]>()
  for (const batchIndex of [...selectedBatchIndexes].sort((left, right) => left - right)) {
    translatedBatchMap.set(batchIndex, await translateBatchWithJsonMode(env, targetLanguage, batches[batchIndex]))
  }

  const sourceTexts = [...translatedBatchMap.keys()].flatMap((batchIndex) => batches[batchIndex])
  const translatedTexts = [...translatedBatchMap.values()].flat()
  const changedCount = translatedTexts.filter((translated, index) => normalizedTranslationValue(translated) !== normalizedTranslationValue(sourceTexts[index] ?? '')).length
  if (changedCount === 0) throw new Error(`Real page probe left ${path} untranslated for ${targetLanguage}`)

  const bodyChecks = checkSources.map(({ check, batchIndex, textIndex, source }) => {
    const translated = translatedBatchMap.get(batchIndex)?.[textIndex] ?? ''
    if (normalizedTranslationValue(translated) === normalizedTranslationValue(source)) {
      throw new Error(`Real page probe left required body text untranslated for ${path}: ${check}`)
    }
    return { check, batchIndex, source, translated }
  })

  return {
    path,
    locale,
    targetLanguage,
    sourceBytes: new TextEncoder().encode(sourceHtml).length,
    segmentCount: segments.length,
    bodySegmentCount: segments.filter((segment) => segment.inBody).length,
    batchCount: batches.length,
    translatedBatchCount: translatedBatchMap.size,
    translatedSegmentCount: translatedTexts.length,
    changedCount,
    bodyChecks,
    samples: translatedTexts.slice(0, 5),
  }
}

async function handleTranslationTestRequest(request: Request, env: Env, requestUrl: URL): Promise<Response> {
  if (request.method !== 'GET') return jsonResponse({ ok: false, error: 'Method not allowed' }, 405)

  try {
    if (requestUrl.pathname === `${TRANSLATION_TEST_ROUTE_PREFIX}/real-page`) {
      const page = await probeRealPageTranslation(env, requestUrl)
      return jsonResponse({
        ok: true,
        model: env.TRANSLATION_MODEL || DEFAULT_MODEL,
        cacheVersion: TRANSLATION_CACHE_VERSION,
        page,
      })
    }

    if (requestUrl.pathname !== `${TRANSLATION_TEST_ROUTE_PREFIX}/real-runtime`) return jsonResponse({ ok: false, error: 'Not found' }, 404)

    const storage = await probeRuntimeStorage(env, requestUrl)
    const translations = await translateBatchWithJsonMode(env, 'Spanish', [
      'Ship updates instantly',
      'Pricing',
      'Keep Capgo, Capacitor, code, API, SDK, CLI, npm, bun, GitHub, and Cloudflare unchanged.',
    ])

    return jsonResponse({
      ok: true,
      model: env.TRANSLATION_MODEL || DEFAULT_MODEL,
      cacheVersion: TRANSLATION_CACHE_VERSION,
      storage,
      translations,
    })
  } catch (error) {
    return jsonResponse({ ok: false, error: errorMessage(error) }, 500)
  }
}

function translationJobFromUnknown(value: unknown): TranslationJob | null {
  const record = recordOf(value)
  if (!record) return null
  if (typeof record.url !== 'string') return null
  if (typeof record.cacheVersion !== 'string') return null
  if (record.reason !== 'miss' && record.reason !== 'stale' && record.reason !== 'continue') return null
  if (typeof record.locale !== 'string' || !isSupportedLocale(record.locale)) return null
  if (record.sourceHash !== undefined && typeof record.sourceHash !== 'string') return null

  return {
    url: record.url,
    locale: record.locale,
    cacheVersion: record.cacheVersion,
    reason: record.reason,
    sourceHash: record.sourceHash,
    priority: record.priority === true,
  }
}

function matchesCoordinatorRecord(record: TranslationCoordinatorRecord | undefined, job: TranslationJob): boolean {
  if (!record || record.cacheVersion !== job.cacheVersion || record.locale !== job.locale || record.url !== job.url) return false
  return record.sourceHash === job.sourceHash
}

export class TranslationCoordinator {
  private readonly state: DurableObjectStateBinding
  private readonly env: Env

  constructor(state: DurableObjectStateBinding, env: Env) {
    this.state = state
    this.env = env
  }

  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return jsonResponse({ ok: false, error: 'Method not allowed' }, 405)

    const requestUrl = new URL(request.url)
    const job = translationJobFromUnknown(await request.json().catch(() => null))
    if (!job) return jsonResponse({ ok: false, error: 'Invalid translation job' }, 400)

    if (requestUrl.pathname === '/complete') {
      const record = await this.state.storage.get<TranslationCoordinatorRecord>('pending')
      if (matchesCoordinatorRecord(record, job)) await this.state.storage.delete('pending')
      return jsonResponse({ ok: true, cleared: true })
    }

    if (requestUrl.pathname !== '/enqueue') return jsonResponse({ ok: false, error: 'Not found' }, 404)

    const now = Date.now()
    const record = await this.state.storage.get<TranslationCoordinatorRecord>('pending')
    if (record && matchesCoordinatorRecord(record, job) && record.pendingUntil > now && (record.priority || !job.priority)) {
      return jsonResponse({ ok: true, queued: false, pendingUntil: record.pendingUntil, priority: record.priority })
    }

    await sendTranslationJob(this.env, job)
    const nextRecord: TranslationCoordinatorRecord = {
      cacheVersion: job.cacheVersion,
      locale: job.locale,
      url: job.url,
      priority: job.priority === true,
      pendingUntil: now + TRANSLATION_COORDINATOR_PENDING_MS,
      sourceHash: job.sourceHash,
    }
    await this.state.storage.put('pending', nextRecord)
    return jsonResponse({ ok: true, queued: true, pendingUntil: nextRecord.pendingUntil, priority: nextRecord.priority })
  }
}

export const __translationWorkerTest = {
  TRANSLATION_CACHE_VERSION,
  bodyTranslationStats,
  buildBatches,
  collectSegments,
  renderTranslatedHtml,
}

export default {
  async fetch(request: Request, env: Env, ctx?: WorkerExecutionContext): Promise<Response> {
    const requestUrl = new URL(request.url)
    if (env.TRANSLATION_TEST_MODE === '1' && requestUrl.pathname.startsWith(TRANSLATION_TEST_ROUTE_PREFIX)) {
      return await handleTranslationTestRequest(request, env, requestUrl)
    }

    const locale = extractLocale(requestUrl.pathname)

    if (!locale) return await fetchEnglishOrigin(request, env, requestUrl)

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return await fetchEnglishOrigin(request, env, requestUrl)
    }

    if (shouldBypassTranslation(requestUrl.pathname)) {
      return await fetchEnglishOrigin(request, env, requestUrl)
    }

    try {
      return await serveTranslated(request, env, requestUrl, locale, ctx)
    } catch (error) {
      console.error('Translation worker failed', { pathname: requestUrl.pathname, locale, error: errorMessage(error) })
      return temporaryEnglishRedirectResponse(requestUrl, request.method === 'HEAD')
    }
  },
  async queue(batch: MessageBatch<TranslationJob>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      try {
        await processTranslationJob(message.body, env)
      } catch (error) {
        console.error('Failed to process translated page queue job; retrying message', {
          messageId: message.id,
          pathname: logPathnameFromUrl(message.body.url),
          locale: message.body.locale,
          reason: message.body.reason,
          priority: message.body.priority === true,
          cacheVersion: message.body.cacheVersion,
          attempts: message.attempts,
          retryDelaySeconds: TRANSLATION_QUEUE_RETRY_DELAY_SECONDS,
          error: errorMessage(error),
        })
        if (typeof message.retry === 'function') {
          message.retry({ delaySeconds: TRANSLATION_QUEUE_RETRY_DELAY_SECONDS })
        } else {
          throw error
        }
      }
    }
  },
}
