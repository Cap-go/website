import { parseHTML } from 'linkedom'
import { defaultLocale } from '@/services/locale'
import { getLocalizedPathname, isRtlLocale } from '@/services/landingLocale'

const AI_MODEL = '@cf/zai-org/glm-4.7-flash'
const SKIP_TAGS = new Set(['CODE', 'NOSCRIPT', 'PRE', 'SCRIPT', 'STYLE', 'SVG', 'TEXTAREA'])
const TRANSLATABLE_ATTRIBUTES = ['aria-label', 'alt', 'placeholder', 'title'] as const
const TRANSLATABLE_META_NAMES = new Set(['description', 'keywords', 'twitter:description', 'twitter:title'])
const TRANSLATABLE_META_PROPERTIES = new Set(['og:description', 'og:title', 'twitter:description', 'twitter:title'])
const PROTECTED_PATTERNS = [
  /https?:\/\/[^\s"'<>]+/giu,
  /\b(?:App Store|Cloudflare|CLI|Capacitor|Capgo|Electron|GDPR|GitHub|Google Play|OTA|SDK|SOC 1|SOC 2|Supabase|Workers AI|iOS|Android|API)\b/gu,
]

interface TranslationSegment {
  value: string
  apply: (value: string) => void
}

interface AiBinding {
  run: (model: string, inputs: Record<string, unknown>) => Promise<unknown>
}

export async function translateLandingHtml({
  ai,
  html,
  locale,
  siteOrigin,
}: {
  ai: AiBinding
  html: string
  locale: string
  siteOrigin: string
}): Promise<string> {
  if (locale === defaultLocale) {
    return html
  }

  const { document } = parseHTML(html)
  const root = document.documentElement

  if (root) {
    root.setAttribute('lang', locale)
    root.setAttribute('dir', isRtlLocale(locale) ? 'rtl' : 'ltr')
  }

  rewriteInternalLinks(document, locale, siteOrigin)
  rewriteStructuredDataUrls(document, locale, siteOrigin)

  const segments = collectTranslatableSegments(document)
  if (segments.length === 0) {
    return document.toString()
  }

  const translatedValues = await translateSegments(ai, locale, segments.map((segment) => segment.value))
  translatedValues.forEach((value, index) => {
    segments[index]?.apply(value)
  })

  return document.toString()
}

function collectTranslatableSegments(document: Document): TranslationSegment[] {
  const segments: TranslationSegment[] = []
  walkNode(document.documentElement, segments)
  return segments
}

function walkNode(node: Node | null, segments: TranslationSegment[]): void {
  if (!node) {
    return
  }

  if (node.nodeType === 3) {
    const prepared = prepareTextSegment(node.nodeValue ?? '')
    if (!prepared) {
      return
    }

    segments.push({
      value: prepared.core,
      apply: (value) => {
        node.nodeValue = `${prepared.leading}${value}${prepared.trailing}`
      },
    })
    return
  }

  if (node.nodeType !== 1) {
    return
  }

  const element = node as Element
  if (shouldSkipElement(element)) {
    return
  }

  collectAttributeSegments(element, segments)

  for (const childNode of Array.from(element.childNodes)) {
    walkNode(childNode, segments)
  }
}

function shouldSkipElement(element: Element): boolean {
  return (
    SKIP_TAGS.has(element.tagName) ||
    element.getAttribute('translate') === 'no' ||
    element.hasAttribute('data-no-translate')
  )
}

function collectAttributeSegments(element: Element, segments: TranslationSegment[]): void {
  for (const attributeName of TRANSLATABLE_ATTRIBUTES) {
    const value = element.getAttribute(attributeName)
    if (!value || !shouldTranslateValue(value)) {
      continue
    }

    segments.push({
      value,
      apply: (translatedValue) => element.setAttribute(attributeName, translatedValue),
    })
  }

  if (element.tagName !== 'META') {
    return
  }

  const metaName = element.getAttribute('name')?.toLowerCase()
  const metaProperty = element.getAttribute('property')?.toLowerCase()
  const content = element.getAttribute('content')

  if (!content || !shouldTranslateValue(content)) {
    return
  }

  if ((metaName && TRANSLATABLE_META_NAMES.has(metaName)) || (metaProperty && TRANSLATABLE_META_PROPERTIES.has(metaProperty))) {
    segments.push({
      value: content,
      apply: (translatedValue) => element.setAttribute('content', translatedValue),
    })
  }
}

function prepareTextSegment(value: string): { leading: string; core: string; trailing: string } | null {
  if (!shouldTranslateValue(value)) {
    return null
  }

  const leading = value.match(/^\s*/u)?.[0] ?? ''
  const trailing = value.match(/\s*$/u)?.[0] ?? ''
  const core = value.trim()

  return {
    leading,
    core,
    trailing,
  }
}

function shouldTranslateValue(value: string): boolean {
  const trimmed = value.trim()
  return Boolean(trimmed) && /\p{L}/u.test(trimmed)
}

function rewriteInternalLinks(document: Document, locale: string, siteOrigin: string): void {
  const anchors = Array.from(document.querySelectorAll('a[href]'))

  for (const anchor of anchors) {
    const href = anchor.getAttribute('href')
    if (!href) {
      continue
    }

    const localizedHref = localizeInternalUrl(href, locale, siteOrigin)
    if (localizedHref && localizedHref !== href) {
      anchor.setAttribute('href', localizedHref)
    }
  }
}

function rewriteStructuredDataUrls(document: Document, locale: string, siteOrigin: string): void {
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))

  for (const script of scripts) {
    const content = script.textContent?.trim()
    if (!content) {
      continue
    }

    try {
      const parsed = JSON.parse(content)
      const rewritten = rewriteJsonLdValue(parsed, locale, siteOrigin)
      script.textContent = JSON.stringify(rewritten)
    }
    catch {
      // Ignore invalid JSON-LD blocks and keep the original markup untouched.
    }
  }
}

function rewriteJsonLdValue(value: unknown, locale: string, siteOrigin: string): unknown {
  if (typeof value === 'string') {
    return localizeInternalUrl(value, locale, siteOrigin) ?? value
  }

  if (Array.isArray(value)) {
    return value.map((item) => rewriteJsonLdValue(item, locale, siteOrigin))
  }

  if (value && typeof value === 'object') {
    const clonedValue: Record<string, unknown> = {}

    for (const [key, nestedValue] of Object.entries(value)) {
      if (key === 'inLanguage' && typeof nestedValue === 'string') {
        clonedValue[key] = locale
        continue
      }
      clonedValue[key] = rewriteJsonLdValue(nestedValue, locale, siteOrigin)
    }

    return clonedValue
  }

  return value
}

function localizeInternalUrl(value: string, locale: string, siteOrigin: string): string | null {
  if (!value || value.startsWith('#') || /^[a-z]+:/iu.test(value) && !/^https?:/iu.test(value)) {
    return null
  }

  let url: URL
  try {
    url = new URL(value, siteOrigin)
  }
  catch {
    return null
  }

  if (url.origin !== siteOrigin) {
    return null
  }

  const localizedPath = getLocalizedPathname(url.pathname, locale)
  const localizedValue = `${localizedPath}${url.search}${url.hash}`

  if (/^https?:/iu.test(value)) {
    return `${url.origin}${localizedValue}`
  }

  return localizedValue
}

async function translateSegments(ai: AiBinding, locale: string, values: string[]): Promise<string[]> {
  const maskedEntries = values.map((value, index) => createMaskedValue(value, index))
  const translatedValues = new Array<string>(maskedEntries.length)
  const chunks = chunkMaskedValues(maskedEntries)

  for (const chunk of chunks) {
    const translatedChunk = await translateChunk(ai, locale, chunk.map((entry) => entry.maskedValue))

    chunk.forEach((entry, index) => {
      translatedValues[entry.index] = entry.restore(translatedChunk[index] ?? entry.maskedValue)
    })
  }

  return translatedValues
}

function createMaskedValue(value: string, index = 0) {
  let maskedValue = value
  const replacements: Array<{ token: string; value: string }> = []

  for (const pattern of PROTECTED_PATTERNS) {
    maskedValue = maskedValue.replace(pattern, (match) => {
      const token = `__CAPGO_KEEP_${replacements.length}__`
      replacements.push({ token, value: match })
      return token
    })
  }

  return {
    index,
    maskedValue,
    restore(translatedValue: string) {
      return replacements.reduce((restoredValue, replacement) => restoredValue.replaceAll(replacement.token, replacement.value), translatedValue)
    },
  }
}

function chunkMaskedValues(
  maskedValues: Array<ReturnType<typeof createMaskedValue>>,
): Array<Array<ReturnType<typeof createMaskedValue>>> {
  const chunks: Array<Array<ReturnType<typeof createMaskedValue>>> = []
  let currentChunk: Array<ReturnType<typeof createMaskedValue>> = []
  let currentLength = 0

  maskedValues.forEach((entry) => {
    const nextLength = currentLength + entry.maskedValue.length

    if (currentChunk.length >= 24 || nextLength > 5000) {
      chunks.push(currentChunk)
      currentChunk = []
      currentLength = 0
    }

    currentChunk.push(entry)
    currentLength += entry.maskedValue.length
  })

  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }

  return chunks
}

async function translateChunk(ai: AiBinding, locale: string, values: string[]): Promise<string[]> {
  const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      translations: {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: values.length,
        maxItems: values.length,
      },
    },
    required: ['translations'],
  }

  const response = await ai.run(AI_MODEL, {
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content:
          'Translate English website copy into the requested target language. Return JSON only. Keep placeholders such as __CAPGO_KEEP_0__ exactly unchanged. Preserve punctuation, markdown, and brand names.',
      },
      {
        role: 'user',
        content: JSON.stringify({
          targetLocale: locale,
          items: values,
        }),
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'landing_translation_batch',
        schema,
      },
    },
  })

  const parsed = extractTranslations(response)
  if (!parsed || parsed.length !== values.length) {
    throw new Error(`Workers AI returned an invalid translation payload for locale "${locale}".`)
  }

  return parsed
}

function extractTranslations(response: unknown): string[] | null {
  if (Array.isArray((response as { translations?: unknown[] })?.translations)) {
    return (response as { translations: string[] }).translations
  }
  if (Array.isArray((response as { result?: { translations?: unknown[] } })?.result?.translations)) {
    return (response as { result: { translations: string[] } }).result.translations
  }

  const candidates = [
    (response as { response?: unknown })?.response,
    (response as { result?: { response?: unknown } })?.result?.response,
    (response as { output_text?: unknown })?.output_text,
    (response as { text?: unknown })?.text,
  ]

  for (const candidate of candidates) {
    if (typeof candidate !== 'string') {
      continue
    }

    const parsedCandidate = parseJsonCandidate(candidate)
    if (Array.isArray(parsedCandidate?.translations)) {
      return parsedCandidate.translations
    }
  }

  return null
}

function parseJsonCandidate(candidate: string): { translations?: string[] } | null {
  const sanitizedCandidate = candidate
    .replace(/^```json\s*/iu, '')
    .replace(/^```\s*/iu, '')
    .replace(/\s*```$/u, '')
    .trim()

  try {
    return JSON.parse(sanitizedCandidate)
  }
  catch {
    return null
  }
}
