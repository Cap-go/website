import { load, type AnyNode, type CheerioAPI } from 'cheerio'
import { defaultLocale } from './locale'

export const runtimeTranslationLocales = ['de', 'en', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'] as const

export type RuntimeTranslationLocale = (typeof runtimeTranslationLocales)[number]

export interface RuntimeTranslationState {
  availableLocales: readonly RuntimeTranslationLocale[]
  enabled: boolean
  isTranslated: boolean
  requestedLocale: RuntimeTranslationLocale
  showSelector: boolean
  sourcePath: string
}

interface AiBinding {
  run(model: string, payload: Record<string, unknown>): Promise<unknown>
}

interface TranslateHtmlResponseOptions {
  ai: AiBinding
  locale: RuntimeTranslationLocale
  requestUrl: URL
  response: Response
  sourcePath: string
}

interface SegmentRef {
  apply(translation: string): void
  text: string
}

const DEFAULT_TRANSLATION_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast'
const CACHE_NAMESPACE = '/__runtime-translations'
const MAX_BATCH_CHARS = 6000
const MAX_BATCH_ITEMS = 40
const SKIP_TAGS = new Set(['code', 'head', 'kbd', 'noscript', 'pre', 'samp', 'script', 'style', 'svg', 'textarea'])
const NON_TRANSLATABLE_PREFIXES = ['/_astro/', '/api/', '/docs/', '/favicon', '/fonts/', '/llms', '/robots.txt', '/search/', '/site.webmanifest', '/sitemap']

const META_ATTRIBUTE_SELECTORS = [
  'meta[name="description"]',
  'meta[name="title"]',
  'meta[property="og:description"]',
  'meta[property="og:title"]',
  'meta[property="twitter:description"]',
  'meta[property="twitter:title"]',
] as const

const GENERIC_TRANSLATABLE_ATTRIBUTES = ['alt', 'aria-label', 'placeholder', 'title'] as const

const RUNTIME_LOCALE_FLAGS: Record<RuntimeTranslationLocale, string> = {
  de: '🇩🇪',
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  id: '🇮🇩',
  it: '🇮🇹',
  ja: '🇯🇵',
  ko: '🇰🇷',
  zh: '🇨🇳',
}

const RUNTIME_LOCALE_NAMES: Record<RuntimeTranslationLocale, string> = {
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese (Simplified)',
}

export const runtimeLocaleFlags = RUNTIME_LOCALE_FLAGS

export function isRuntimeTranslationLocale(value: string): value is RuntimeTranslationLocale {
  return (runtimeTranslationLocales as readonly string[]).includes(value)
}

export function normalizePagePath(pathname: string): string {
  if (!pathname) return '/'

  let normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  normalized = normalized.replace(/\/{2,}/g, '/')

  if (normalized !== '/' && !normalized.endsWith('/')) {
    normalized = `${normalized}/`
  }

  return normalized
}

export function stripRuntimeLocalePrefix(pathname: string): { locale: RuntimeTranslationLocale | null; pathname: string } {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const [, maybeLocale, ...rest] = normalized.split('/')

  if (!maybeLocale || !isRuntimeTranslationLocale(maybeLocale)) {
    return {
      locale: null,
      pathname: normalizePagePath(normalized),
    }
  }

  const stripped = rest.length > 0 ? `/${rest.join('/')}` : '/'

  return {
    locale: maybeLocale,
    pathname: normalizePagePath(stripped),
  }
}

export function prefixRuntimeLocale(pathname: string, locale: RuntimeTranslationLocale): string {
  const normalized = normalizePagePath(pathname)

  if (locale === defaultLocale) {
    return normalized
  }

  const { pathname: withoutLocale } = stripRuntimeLocalePrefix(normalized)
  if (withoutLocale === '/') {
    return `/${locale}/`
  }

  return `/${locale}${withoutLocale}`
}

export function isRuntimeTranslationEligiblePath(pathname: string): boolean {
  const normalized = normalizePagePath(pathname)

  if (normalized === '/') return true
  if (NON_TRANSLATABLE_PREFIXES.some((prefix) => normalized.startsWith(prefix))) return false

  const lastSegment = normalized.split('/').filter(Boolean).at(-1) ?? ''
  return !/\.[a-z0-9]+$/i.test(lastSegment)
}

export async function translateHtmlResponseWithCloudflareAI({ ai, locale, requestUrl, response, sourcePath }: TranslateHtmlResponseOptions): Promise<Response> {
  const contentType = response.headers.get('content-type') || ''
  if (response.status !== 200 || !contentType.includes('text/html')) {
    return response
  }

  const html = await response.text()
  const contentDigest = await hashString(html)
  const cacheKey = buildCacheKey(requestUrl, locale, sourcePath, contentDigest)
  const cachedResponse = await getCachedResponse(cacheKey)

  if (cachedResponse) {
    const cachedHeaders = new Headers(cachedResponse.headers)
    cachedHeaders.set('x-runtime-translation-cache', 'HIT')
    cachedHeaders.set('x-runtime-translation-locale', locale)
    cachedHeaders.set('x-robots-tag', 'noindex, follow')
    return new Response(cachedResponse.body, {
      headers: cachedHeaders,
      status: cachedResponse.status,
      statusText: cachedResponse.statusText,
    })
  }

  const $ = load(html, { decodeEntities: false })
  const segmentRefs = collectSegments($)

  if (segmentRefs.length > 0) {
    const translatedSegments = await translateSegments(
      ai,
      locale,
      segmentRefs.map((segment) => segment.text),
    )
    translatedSegments.forEach((translation, index) => {
      segmentRefs[index]?.apply(translation)
    })
  }

  rewriteInternalAnchors($, locale, requestUrl.origin)
  $('html').attr('lang', locale)
  $('meta[name="robots"]').attr('content', 'noindex, follow')
  if ($('meta[name="robots"]').length === 0) {
    $('head').append('<meta name="robots" content="noindex, follow">')
  }

  const translatedHtml = $.html()
  const translatedHeaders = new Headers(response.headers)
  translatedHeaders.delete('content-length')
  translatedHeaders.set('content-type', contentType)
  translatedHeaders.set('x-runtime-translation-cache', 'MISS')
  translatedHeaders.set('x-runtime-translation-locale', locale)
  translatedHeaders.set('x-robots-tag', 'noindex, follow')

  const translatedResponse = new Response(translatedHtml, {
    headers: translatedHeaders,
    status: response.status,
    statusText: response.statusText,
  })

  await putCachedResponse(cacheKey, translatedResponse.clone())

  return translatedResponse
}

function buildCacheKey(requestUrl: URL, locale: RuntimeTranslationLocale, sourcePath: string, digest: string): Request {
  const cacheUrl = new URL(requestUrl.origin)
  cacheUrl.pathname = `${CACHE_NAMESPACE}${prefixRuntimeLocale(sourcePath, locale)}`
  cacheUrl.searchParams.set('v', digest)
  return new Request(cacheUrl.toString())
}

function collectSegments($: CheerioAPI): SegmentRef[] {
  const segments: SegmentRef[] = []

  $('title').each((_, element) => {
    const title = $(element).text()
    pushSegment(segments, title, (translation) => {
      $(element).text(translation)
    })
  })

  for (const selector of META_ATTRIBUTE_SELECTORS) {
    $(selector).each((_, element) => {
      const value = $(element).attr('content')
      pushSegment(segments, value, (translation) => {
        $(element).attr('content', translation)
      })
    })
  }

  const attributeSelector = GENERIC_TRANSLATABLE_ATTRIBUTES.map((attribute) => `[${attribute}]`).join(',')
  $(attributeSelector).each((_, element) => {
    for (const attribute of GENERIC_TRANSLATABLE_ATTRIBUTES) {
      const value = $(element).attr(attribute)
      pushSegment(segments, value, (translation) => {
        $(element).attr(attribute, translation)
      })
    }
  })

  $('body')
    .find('*')
    .contents()
    .each((_, node) => {
      if (!isTranslatableTextNode(node)) return

      const raw = node.data || ''
      const core = raw.trim()
      if (!core) return

      const leadingWhitespaceLength = countLeadingWhitespace(raw)
      const trailingWhitespaceStart = findTrailingWhitespaceStart(raw)
      segments.push({
        apply: (translation) => {
          node.data = `${raw.slice(0, leadingWhitespaceLength)}${translation}${raw.slice(trailingWhitespaceStart)}`
        },
        text: core,
      })
    })

  return segments
}

function countLeadingWhitespace(value: string): number {
  let index = 0
  while (index < value.length && isWhitespaceCharacter(value[index])) {
    index += 1
  }
  return index
}

function findTrailingWhitespaceStart(value: string): number {
  let index = value.length
  while (index > 0 && isWhitespaceCharacter(value[index - 1])) {
    index -= 1
  }
  return index
}

function isWhitespaceCharacter(value: string | undefined): boolean {
  return value === ' ' || value === '\n' || value === '\r' || value === '\t' || value === '\f' || value === '\v'
}

function isTranslatableTextNode(node: AnyNode): node is AnyNode & { data: string } {
  if (node.type !== 'text' || typeof node.data !== 'string') return false
  if (!node.parent || node.parent.type !== 'tag') return false
  if (node.data.trim().length === 0) return false

  let current: AnyNode | null | undefined = node.parent
  while (current) {
    if (current.type === 'tag') {
      const tagName = current.name?.toLowerCase()
      const attributes = current.attribs || {}

      if (tagName && SKIP_TAGS.has(tagName)) return false
      if (attributes['aria-hidden'] === 'true') return false
      if (attributes['data-no-translate'] !== undefined) return false
      if (attributes.translate === 'no') return false
    }
    current = current.parent
  }

  return true
}

function pushSegment(segments: SegmentRef[], rawValue: string | undefined | null, apply: (translation: string) => void) {
  const value = rawValue?.trim()
  if (!value) return

  segments.push({
    apply,
    text: value,
  })
}

async function translateSegments(ai: AiBinding, locale: RuntimeTranslationLocale, segments: string[]): Promise<string[]> {
  const translationMap = new Map<string, string>()
  const uniqueSegments = [...new Set(segments)]

  for (const batch of chunkSegments(uniqueSegments)) {
    const batchTranslations = await translateSegmentBatch(ai, locale, batch)
    batch.forEach((segment, index) => {
      translationMap.set(segment, batchTranslations[index] || segment)
    })
  }

  return segments.map((segment) => translationMap.get(segment) || segment)
}

async function translateSegmentBatch(ai: AiBinding, locale: RuntimeTranslationLocale, batch: string[]): Promise<string[]> {
  const result = await ai.run(DEFAULT_TRANSLATION_MODEL, {
    messages: [
      {
        content: [
          'You are a website localization engine.',
          `Translate each English string into ${RUNTIME_LOCALE_NAMES[locale]}.`,
          'Return one translated string per input item in the same order.',
          'Keep placeholders, URLs, slash-based paths, HTML entities, and product names intact.',
          'Do not add explanations or numbering.',
        ].join(' '),
        role: 'system',
      },
      {
        content: JSON.stringify({
          locale,
          segments: batch,
        }),
        role: 'user',
      },
    ],
    response_format: {
      json_schema: {
        additionalProperties: false,
        properties: {
          translations: {
            items: { type: 'string' },
            type: 'array',
          },
        },
        required: ['translations'],
        type: 'object',
      },
      type: 'json_schema',
    },
  })

  const translations = getTranslationsFromAiResponse(result)
  if (!Array.isArray(translations) || translations.length !== batch.length) {
    throw new Error(`Workers AI returned an invalid translation payload for locale ${locale}`)
  }

  return translations.map((translation, index) => {
    if (typeof translation !== 'string' || translation.trim().length === 0) {
      return batch[index]
    }
    return translation
  })
}

function getTranslationsFromAiResponse(result: unknown): string[] | undefined {
  if (!result || typeof result !== 'object') {
    return undefined
  }

  const response = (result as { response?: unknown }).response
  if (!response || typeof response !== 'object') {
    return undefined
  }

  const translations = (response as { translations?: unknown }).translations
  return Array.isArray(translations) ? translations.filter((value): value is string => typeof value === 'string') : undefined
}

function chunkSegments(segments: string[]): string[][] {
  const batches: string[][] = []
  let currentBatch: string[] = []
  let currentChars = 0

  for (const segment of segments) {
    const nextChars = currentChars + segment.length
    if (currentBatch.length >= MAX_BATCH_ITEMS || (currentBatch.length > 0 && nextChars > MAX_BATCH_CHARS)) {
      batches.push(currentBatch)
      currentBatch = []
      currentChars = 0
    }

    currentBatch.push(segment)
    currentChars += segment.length
  }

  if (currentBatch.length > 0) {
    batches.push(currentBatch)
  }

  return batches
}

function rewriteInternalAnchors($: CheerioAPI, locale: RuntimeTranslationLocale, origin: string) {
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href')
    if (!href) return

    const localizedHref = localizeAnchorHref(href, locale, origin)
    if (localizedHref && localizedHref !== href) {
      $(element).attr('href', localizedHref)
    }
  })
}

function localizeAnchorHref(href: string, locale: RuntimeTranslationLocale, origin: string): string | null {
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return null
  }

  try {
    const isRootRelative = href.startsWith('/')
    const parsed = new URL(href, origin)
    const sameOrigin = parsed.origin === origin

    if (!sameOrigin && !isRootRelative) {
      return null
    }

    const { pathname } = stripRuntimeLocalePrefix(parsed.pathname)
    if (!isRuntimeTranslationEligiblePath(pathname)) {
      if (sameOrigin && !isRootRelative) {
        return parsed.toString()
      }
      return `${pathname}${parsed.search}${parsed.hash}`
    }

    parsed.pathname = prefixRuntimeLocale(pathname, locale)

    if (isRootRelative) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`
    }

    return parsed.toString()
  } catch {
    return null
  }
}

async function hashString(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function getCachedResponse(cacheKey: Request): Promise<Response | null> {
  if (!('caches' in globalThis) || !globalThis.caches?.default) {
    return null
  }

  return await globalThis.caches.default.match(cacheKey)
}

async function putCachedResponse(cacheKey: Request, response: Response): Promise<void> {
  if (!('caches' in globalThis) || !globalThis.caches?.default) {
    return
  }

  await globalThis.caches.default.put(cacheKey, response)
}
