const SUPPORTED_LOCALES = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'] as const

type Locale = (typeof SUPPORTED_LOCALES)[number]

type AiMessage = {
  role: 'system' | 'user'
  content: string
}

type AiBinding = {
  run(model: string, input: { messages: AiMessage[]; temperature?: number; max_tokens?: number }): Promise<unknown>
}

type WorkerService = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
}

interface Env {
  AI: AiBinding
  WEB: WorkerService
  DOCS: WorkerService
  TRANSLATION_MODEL?: string
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void
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
  quote?: string
}

type HtmlPart = string | { segmentIndex: number }
type AttributeMatch = {
  name: string
  quote: string
  value: string
  start: number
  valueStart: number
  valueEnd: number
  end: number
}

const ALL_LOCALES = ['en', ...SUPPORTED_LOCALES] as const
const DEFAULT_MODEL = '@cf/meta/llama-3.1-8b-instruct'
const FRESH_MS = 24 * 60 * 60 * 1000
const CACHE_KEEP_SECONDS = 7 * 24 * 60 * 60
const CLIENT_CACHE_SECONDS = 5 * 60
const MAX_HTML_BYTES = 1_500_000
const MAX_BATCH_CHARS = 6_000

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

const SKIP_TEXT_TAGS = new Set(['script', 'style', 'svg', 'pre', 'code', 'kbd', 'samp', 'textarea'])
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

function localizedPath(basePath: string, locale: string): string {
  const normalizedBasePath = normalizePathname(stripLocalePrefix(basePath))
  if (locale === 'en') return normalizedBasePath
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
  headers.set('Accept-Language', 'en')
  headers.set('X-Capgo-Translation-Origin', 'english')
  headers.delete('If-None-Match')
  headers.delete('If-Modified-Since')

  return new Request(originUrl.toString(), {
    method: 'GET',
    headers,
    redirect: 'manual',
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

function cacheKeyFor(requestUrl: URL, locale: Locale): Request {
  const cacheUrl = new URL(requestUrl)
  cacheUrl.pathname = localizedPath(cacheUrl.pathname, locale)
  cacheUrl.search = ''
  return new Request(cacheUrl.toString(), { method: 'GET' })
}

function withResponseHeaders(response: Response, cacheState: 'MISS' | 'HIT' | 'STALE' | 'BYPASS', isHead = false): Response {
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', `public, max-age=${CLIENT_CACHE_SECONDS}, stale-while-revalidate=${FRESH_MS / 1000}`)
  headers.set('X-Capgo-Translation-Cache', cacheState)
  headers.delete('Content-Length')
  return new Response(isHead ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function toCachedResponse(response: Response): Response {
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', `public, max-age=${CACHE_KEEP_SECONDS}`)
  headers.set('X-Capgo-Translated-At', Date.now().toString())
  headers.delete('Content-Length')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function addSegment(parts: HtmlPart[], segments: Segment[], text: string, mode: Segment['mode'], quote?: string): void {
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

  const segmentIndex = segments.push({ text: core, leading, trailing, mode, quote }) - 1
  parts.push({ segmentIndex })
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

function appendTag(parts: HtmlPart[], segments: Segment[], tag: string, skipText: boolean): void {
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
    addSegment(parts, segments, attribute.value, 'attribute', attribute.quote)
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

  const tagEnd = html.indexOf('>', index + 1)
  if (tagEnd === -1) return null
  const end = tagEnd + 1
  return { index, end, tag: html.slice(index, end) }
}

function collectSegments(html: string): { parts: HtmlPart[]; segments: Segment[] } {
  const parts: HtmlPart[] = []
  const segments: Segment[] = []
  const skipStack: string[] = []
  let lastIndex = 0

  while (lastIndex < html.length) {
    const nextTag = findNextHtmlTag(html, lastIndex)
    if (!nextTag) break

    const { tag } = nextTag
    const text = html.slice(lastIndex, nextTag.index)

    if (text) {
      if (skipStack.length > 0) parts.push(text)
      else addSegment(parts, segments, text, 'text')
    }

    const tagName = tagNameOf(tag)
    if (tagName && SKIP_TEXT_TAGS.has(tagName) && isClosingTag(tag)) {
      const stackIndex = skipStack.lastIndexOf(tagName)
      if (stackIndex !== -1) skipStack.splice(stackIndex, 1)
    }

    appendTag(parts, segments, tag, skipStack.length > 0)

    if (tagName && SKIP_TEXT_TAGS.has(tagName) && !isClosingTag(tag) && !isSelfClosingTag(tag, tagName)) {
      skipStack.push(tagName)
    }

    lastIndex = nextTag.end
  }

  const tail = html.slice(lastIndex)
  if (tail) {
    if (skipStack.length > 0) parts.push(tail)
    else addSegment(parts, segments, tail, 'text')
  }

  return { parts, segments }
}

function buildBatches(segments: Segment[]): string[][] {
  const batches: string[][] = []
  let currentBatch: string[] = []
  let currentLength = 0

  for (const segment of segments) {
    const nextLength = currentLength + segment.text.length
    if (currentBatch.length > 0 && nextLength > MAX_BATCH_CHARS) {
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

function extractAiText(result: unknown): string {
  if (typeof result === 'string') return result
  if (result && typeof result === 'object') {
    const record = result as Record<string, unknown>
    for (const key of ['response', 'text', 'result']) {
      if (typeof record[key] === 'string') return record[key] as string
    }
  }
  return ''
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

function parseTranslationArray(rawText: string): string[] | null {
  const trimmed = stripJsonFence(rawText)
  try {
    const parsed = JSON.parse(trimmed)
    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : null
  } catch {
    const jsonArray = extractJsonArray(trimmed)
    if (!jsonArray) return null
    try {
      const parsed = JSON.parse(jsonArray)
      return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : null
    } catch {
      return null
    }
  }
}

async function translateBatch(env: Env, targetLanguage: string, batch: string[]): Promise<string[]> {
  const model = env.TRANSLATION_MODEL || DEFAULT_MODEL
  const result = await env.AI.run(model, {
    temperature: 0,
    max_tokens: 8192,
    messages: [
      {
        role: 'system',
        content:
          'You translate website copy. Return only a JSON array of strings with the same length and order as the input. Preserve brand names, product names, URLs, code identifiers, numbers, punctuation, and whitespace meaning. Do not add explanations.',
      },
      {
        role: 'user',
        content: JSON.stringify({ targetLanguage, texts: batch }),
      },
    ],
  })

  const translated = parseTranslationArray(extractAiText(result))
  if (!translated || translated.length !== batch.length) return batch
  return translated
}

async function translateSegments(env: Env, locale: Locale, segments: Segment[]): Promise<string[]> {
  const translations: string[] = []
  for (const batch of buildBatches(segments)) {
    const translatedBatch = await translateBatch(env, LANGUAGE_NAMES[locale], batch)
    translations.push(...translatedBatch)
  }
  return translations
}

function renderTranslatedHtml(parts: HtmlPart[], segments: Segment[], translations: string[]): string {
  return parts
    .map((part) => {
      if (typeof part === 'string') return part

      const segment = segments[part.segmentIndex]
      const translated = translations[part.segmentIndex] || segment.text
      if (segment.mode === 'attribute') {
        return `${segment.leading}${escapeHtmlAttribute(translated, segment.quote)}${segment.trailing}`
      }
      return `${segment.leading}${escapeHtmlText(translated)}${segment.trailing}`
    })
    .join('')
}

async function translateHtml(env: Env, locale: Locale, html: string): Promise<string> {
  const { parts, segments } = collectSegments(html)
  if (segments.length === 0) return html

  const translations = await translateSegments(env, locale, segments)
  return renderTranslatedHtml(parts, segments, translations)
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
  const xDefault = localizedAbsoluteUrl(requestUrl, 'en', basePath)
  links.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttribute(xDefault)}" />`)
  return links.join('\n')
}

function localizeUrlAttributes(html: string, locale: Locale): string {
  let rewritten = ''
  let cursor = 0

  while (cursor < html.length) {
    const nextTag = findNextHtmlTag(html, cursor)
    if (!nextTag) break

    rewritten += html.slice(cursor, nextTag.index)
    rewritten += localizeTagUrlAttributes(nextTag.tag, locale)
    cursor = nextTag.end
  }

  return `${rewritten}${html.slice(cursor)}`
}

function findOpeningTag(html: string, tagName: string): { index: number; end: number; tag: string } | null {
  const lowerHtml = html.toLowerCase()
  const needle = `<${tagName.toLowerCase()}`
  let searchIndex = 0

  while (searchIndex < html.length) {
    const index = lowerHtml.indexOf(needle, searchIndex)
    if (index === -1) return null

    const boundary = html[index + needle.length] ?? ''
    if (!isTagNameBoundary(boundary)) {
      searchIndex = index + needle.length
      continue
    }

    const tagEnd = html.indexOf('>', index + needle.length)
    if (tagEnd === -1) return null
    const end = tagEnd + 1
    return { index, end, tag: html.slice(index, end) }
  }

  return null
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

function localizeTagUrlAttributes(tag: string, locale: Locale): string {
  let rewritten = ''
  let lastIndex = 0
  let changed = false

  for (const attribute of collectQuotedAttributes(tag)) {
    const name = attribute.name.toLowerCase()
    if (name !== 'href' && name !== 'action') continue

    const localized = localizeHref(attribute.value, locale)
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

function languageSelectorScript(locale: Locale): string {
  const locales = JSON.stringify(ALL_LOCALES)
  const currentLocale = JSON.stringify(locale)
  return `<script id="capgo-edge-language-selector">
(() => {
  const locales = ${locales};
  const currentLocale = ${currentLocale};
  const stripLocale = (pathname) => {
    const segments = pathname.split('/');
    if (!locales.includes(segments[1])) return pathname || '/';
    const stripped = '/' + segments.slice(2).join('/');
    return stripped || '/';
  };
  const localizedPath = (targetLocale) => {
    const basePath = stripLocale(window.location.pathname);
    return targetLocale === 'en' ? basePath : '/' + targetLocale + (basePath === '/' ? '/' : basePath);
  };
  for (const targetLocale of locales) {
    const target = localizedPath(targetLocale) + window.location.search + window.location.hash;
    document.querySelectorAll('#language_' + targetLocale + ', a[data-language="' + targetLocale + '"]').forEach((item) => {
      item.setAttribute('href', target);
      item.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = target;
      }, true);
    });
  }
  const footerButton = document.getElementById('language-dropdown-button');
  if (footerButton) {
    const textNodes = Array.from(footerButton.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
    if (textNodes.length > 0) textNodes[0].textContent = currentLocale.toUpperCase();
  }
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
  rewritten = localizeUrlAttributes(rewritten, locale)

  if (!rewritten.includes('capgo-edge-language-selector')) {
    rewritten = insertBeforeClosingTag(rewritten, 'body', languageSelectorScript(locale))
  }

  return rewritten
}

async function buildTranslatedResponse(request: Request, env: Env, requestUrl: URL, locale: Locale): Promise<Response> {
  const originResponse = await fetchEnglishOrigin(request, env, requestUrl)
  if (isRedirect(originResponse)) return localizeRedirect(originResponse, requestUrl, locale)
  if (!isHtmlResponse(originResponse) || !originResponse.ok) return originResponse

  const contentLength = Number.parseInt(originResponse.headers.get('Content-Length') || '0', 10)
  if (Number.isFinite(contentLength) && contentLength > MAX_HTML_BYTES) {
    return withResponseHeaders(originResponse, 'BYPASS')
  }

  const sourceHtml = await originResponse.text()
  if (new TextEncoder().encode(sourceHtml).length > MAX_HTML_BYTES) {
    return withResponseHeaders(new Response(sourceHtml, originResponse), 'BYPASS')
  }

  const translatedHtml = await translateHtml(env, locale, sourceHtml)
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

async function refreshCache(request: Request, env: Env, requestUrl: URL, locale: Locale, cacheKey: Request): Promise<Response> {
  const response = await buildTranslatedResponse(request, env, requestUrl, locale)
  if (response.ok && isHtmlResponse(response)) {
    const cachedResponse = toCachedResponse(response.clone())
    await caches.default.put(cacheKey, cachedResponse)
  }
  return response
}

async function serveTranslated(request: Request, env: Env, ctx: ExecutionContext, requestUrl: URL, locale: Locale): Promise<Response> {
  const cacheKey = cacheKeyFor(requestUrl, locale)
  const cachedResponse = await caches.default.match(cacheKey)
  const isHead = request.method === 'HEAD'

  if (cachedResponse) {
    const translatedAt = readTranslatedAt(cachedResponse)
    const isStale = Date.now() - translatedAt > FRESH_MS
    if (isStale) {
      ctx.waitUntil(
        refreshCache(request, env, requestUrl, locale, cacheKey).catch((error) => {
          console.error('Failed to refresh translated page', { pathname: requestUrl.pathname, locale, error })
        }),
      )
    }
    return withResponseHeaders(cachedResponse, isStale ? 'STALE' : 'HIT', isHead)
  }

  const translatedResponse = await refreshCache(request, env, requestUrl, locale, cacheKey)
  return withResponseHeaders(translatedResponse, 'MISS', isHead)
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const requestUrl = new URL(request.url)
    const locale = extractLocale(requestUrl.pathname)

    if (!locale) return await fetchEnglishOrigin(request, env, requestUrl)

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return await fetchEnglishOrigin(request, env, requestUrl)
    }

    if (shouldBypassTranslation(requestUrl.pathname)) {
      return await fetchEnglishOrigin(request, env, requestUrl)
    }

    try {
      return await serveTranslated(request, env, ctx, requestUrl, locale)
    } catch (error) {
      console.error('Translation worker failed', { pathname: requestUrl.pathname, locale, error })
      const fallback = await fetchEnglishOrigin(request, env, requestUrl)
      if (isHtmlResponse(fallback)) {
        const localizedHtml = rewriteMetadataAndLinks(await fallback.text(), requestUrl, locale)
        return withResponseHeaders(new Response(localizedHtml, fallback), 'BYPASS', request.method === 'HEAD')
      }
      return fallback
    }
  },
}
