import { parseHTML } from 'linkedom'
import { defaultLocale } from '@/services/locale'
import { getLocaleEntry, getLocalizedPathname, isRtlLocale } from '@/services/landingLocale'

const AI_MODEL = '@cf/zai-org/glm-4.7-flash'
const SKIP_TAGS = new Set(['CODE', 'NOSCRIPT', 'PRE', 'SCRIPT', 'STYLE', 'SVG', 'TEXTAREA'])
const TRANSLATABLE_ATTRIBUTES = ['aria-label', 'alt', 'placeholder', 'title'] as const
const TRANSLATABLE_META_NAMES = new Set(['description', 'keywords', 'twitter:description', 'twitter:title'])
const TRANSLATABLE_META_PROPERTIES = new Set(['og:description', 'og:title', 'twitter:description', 'twitter:title'])
const JSON_LD_URL_KEYS = new Set(['@id', 'contentUrl', 'embedUrl', 'image', 'item', 'logo', 'mainEntityOfPage', 'sameAs', 'url'])
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
  pageUrl,
  siteOrigin,
}: {
  ai: AiBinding
  html: string
  locale: string
  pageUrl: string
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

  rewriteSeoUrls(document, locale, pageUrl, siteOrigin)
  rewriteInternalLinks(document, locale, pageUrl, siteOrigin)
  rewriteStructuredDataUrls(document, locale, pageUrl, siteOrigin)
  rewriteLanguageSelector(document, locale)

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
    element.dataset.noTranslate !== undefined
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

  const trimmedStart = value.trimStart()
  const trimmedValue = trimmedStart.trimEnd()
  const leadingLength = value.length - trimmedStart.length
  const trailingLength = trimmedStart.length - trimmedValue.length
  const leading = value.slice(0, leadingLength)
  const trailing = trailingLength > 0 ? trimmedStart.slice(trimmedValue.length) : ''
  const core = trimmedValue

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

function rewriteInternalLinks(document: Document, locale: string, pageUrl: string, siteOrigin: string): void {
  const anchors = Array.from(document.querySelectorAll('a[href]'))

  for (const anchor of anchors) {
    if (anchor.closest('[translate="no"], [data-no-translate]')) {
      continue
    }

    const href = anchor.getAttribute('href')
    if (!href) {
      continue
    }

    const localizedHref = localizeInternalUrl(href, locale, pageUrl, siteOrigin)
    if (localizedHref && localizedHref !== href) {
      anchor.setAttribute('href', localizedHref)
    }
  }
}

function rewriteSeoUrls(document: Document, locale: string, pageUrl: string, siteOrigin: string): void {
  const urlTargets: Array<{ selector: string; attribute: 'content' | 'href' }> = [
    { selector: 'link[rel="canonical"][href]', attribute: 'href' },
    { selector: 'meta[property="og:url"][content]', attribute: 'content' },
    { selector: 'meta[name="twitter:url"][content]', attribute: 'content' },
    { selector: 'meta[property="twitter:url"][content]', attribute: 'content' },
  ]

  urlTargets.forEach(({ selector, attribute }) => {
    const elements = Array.from(document.querySelectorAll(selector))
    elements.forEach((element) => {
      const currentValue = element.getAttribute(attribute)
      if (!currentValue) {
        return
      }

      const localizedValue = localizeInternalUrl(currentValue, locale, pageUrl, siteOrigin)
      if (localizedValue && localizedValue !== currentValue) {
        element.setAttribute(attribute, localizedValue)
      }
    })
  })

  const ogLocale = document.querySelector('meta[property="og:locale"]')
  if (ogLocale) {
    ogLocale.setAttribute('content', getLocaleEntry(locale).ogLocale)
  }
}

function rewriteLanguageSelector(document: Document, locale: string): void {
  const localeEntry = getLocaleEntry(locale)
  const localeButton = document.getElementById('language-dropdown-button')

  if (localeButton) {
    const buttonSpans = localeButton.querySelectorAll('span')
    const flagLabel = buttonSpans[0]
    const nativeNameLabel = buttonSpans[1]

    if (flagLabel) {
      flagLabel.textContent = localeEntry.flag
    }
    if (nativeNameLabel) {
      nativeNameLabel.textContent = localeEntry.nativeName
      nativeNameLabel.setAttribute('lang', localeEntry.code)
    }
  }

  const localeLinks = Array.from(document.querySelectorAll('#language-dropdown a[lang]'))
  localeLinks.forEach((localeLink) => {
    const isActiveLocale = localeLink.getAttribute('lang') === locale
    localeLink.classList.toggle('bg-zinc-800', isActiveLocale)
    localeLink.classList.toggle('text-white', isActiveLocale)
    localeLink.classList.toggle('text-zinc-400', !isActiveLocale)
  })
}

function rewriteStructuredDataUrls(document: Document, locale: string, pageUrl: string, siteOrigin: string): void {
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))

  for (const script of scripts) {
    const content = script.textContent?.trim()
    if (!content) {
      continue
    }

    try {
      const parsed = JSON.parse(content)
      const rewritten = rewriteJsonLdValue(parsed, locale, pageUrl, siteOrigin)
      script.textContent = JSON.stringify(rewritten)
    }
    catch {
      // Ignore invalid JSON-LD blocks and keep the original markup untouched.
    }
  }
}

function rewriteJsonLdValue(value: unknown, locale: string, pageUrl: string, siteOrigin: string, parentKey?: string): unknown {
  if (typeof value === 'string') {
    if (!parentKey || !JSON_LD_URL_KEYS.has(parentKey)) {
      return value
    }
    return localizeInternalUrl(value, locale, pageUrl, siteOrigin) ?? value
  }

  if (Array.isArray(value)) {
    return value.map((item) => rewriteJsonLdValue(item, locale, pageUrl, siteOrigin, parentKey))
  }

  if (value && typeof value === 'object') {
    const clonedValue: Record<string, unknown> = {}

    for (const [key, nestedValue] of Object.entries(value)) {
      if (key === 'inLanguage' && typeof nestedValue === 'string') {
        clonedValue[key] = locale
        continue
      }
      clonedValue[key] = rewriteJsonLdValue(nestedValue, locale, pageUrl, siteOrigin, key)
    }

    return clonedValue
  }

  return value
}

function localizeInternalUrl(value: string, locale: string, pageUrl: string, siteOrigin: string): string | null {
  if (!value || value.startsWith('#') || /^[a-z]+:/iu.test(value) && !/^https?:/iu.test(value)) {
    return null
  }

  let url: URL
  try {
    url = new URL(value, pageUrl)
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
  const maskedEntries = values.map((value, index) => ({
    ...createMaskedValue(value, index),
    translationId: '',
  }))
  const translatedValues = new Array<string>(maskedEntries.length)
  const uniqueValues = new Map<string, string>()
  const uniqueEntries: Array<{ id: string; maskedValue: string }> = []

  maskedEntries.forEach((entry) => {
    const existingId = uniqueValues.get(entry.maskedValue)
    if (existingId) {
      entry.translationId = existingId
      return
    }

    const translationId = `t${uniqueEntries.length}`
    uniqueValues.set(entry.maskedValue, translationId)
    uniqueEntries.push({ id: translationId, maskedValue: entry.maskedValue })
    entry.translationId = translationId
  })

  const translatedById = new Map<string, string>()
  const chunks = chunkMaskedValues(uniqueEntries)

  for (const chunk of chunks) {
    const translatedChunk = await translateChunk(ai, locale, chunk)

    chunk.forEach((entry) => {
      translatedById.set(entry.id, translatedChunk[entry.id] ?? entry.maskedValue)
    })
  }

  maskedEntries.forEach((entry) => {
    translatedValues[entry.index] = entry.restore(translatedById.get(entry.translationId) ?? entry.maskedValue)
  })

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
  maskedValues: Array<{ id: string; maskedValue: string }>,
): Array<Array<{ id: string; maskedValue: string }>> {
  const chunks: Array<Array<{ id: string; maskedValue: string }>> = []
  let currentChunk: Array<{ id: string; maskedValue: string }> = []
  let currentLength = 0

  maskedValues.forEach((entry) => {
    if (entry.maskedValue.length > 5000) {
      throw new Error('Translation segment exceeds the maximum chunk size.')
    }

    const nextLength = currentLength + entry.id.length + entry.maskedValue.length

    if (currentChunk.length >= 24 || (currentChunk.length > 0 && nextLength > 5000)) {
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

async function translateChunk(
  ai: AiBinding,
  locale: string,
  values: Array<{ id: string; maskedValue: string }>,
): Promise<Record<string, string>> {
  const ids = values.map(({ id }) => id)
  const items = Object.fromEntries(values.map(({ id, maskedValue }) => [id, maskedValue]))
  const schema = {
    type: 'object',
    properties: {
      translations: {
        type: 'object',
        additionalProperties: {
          type: 'string',
        },
      },
    },
    required: ['translations'],
  }
  const messages = [
    {
      role: 'system',
      content:
        'Translate isolated English website copy into the requested target language. Return compact JSON only in the shape {"translations":{"id":"translated text"}}. Each key is an opaque ID. Translate only the value for each key. Keep placeholders such as __CAPGO_KEEP_0__ exactly unchanged. Preserve punctuation, HTML fragments, markdown, and brand names.',
    },
    {
      role: 'user',
      content: JSON.stringify({
        targetLocale: locale,
        items,
      }),
    },
  ]

  const parseResponse = (response: unknown) => extractTranslations(response, ids)

  try {
    const structuredResponse = await ai.run(AI_MODEL, {
      temperature: 0.2,
      messages,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'landing_translation_batch',
          schema,
        },
      },
    })
    const structuredTranslations = parseResponse(structuredResponse)
    if (structuredTranslations) {
      return structuredTranslations
    }
  }
  catch (error) {
    if (!shouldRetryWithoutSchema(error)) {
      throw error
    }
  }

  const fallbackResponse = await ai.run(AI_MODEL, {
    temperature: 0.2,
    messages,
  })

  const parsed = parseResponse(fallbackResponse)
  if (!parsed) {
    throw new Error(`Workers AI returned an invalid translation payload for locale "${locale}".`)
  }

  return parsed
}

function shouldRetryWithoutSchema(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return true
  }

  const message = error.message.toLowerCase()
  return (
    message.includes("json mode couldn't be met") ||
    message.includes('json mode') ||
    message.includes('json schema') ||
    message.includes('response format') ||
    message.includes('schema validation')
  )
}

function extractTranslations(response: unknown, ids: string[]): Record<string, string> | null {
  const directTranslations = normalizeTranslationMap((response as { translations?: unknown })?.translations, ids)
  if (directTranslations) {
    return directTranslations
  }

  const nestedTranslations = normalizeTranslationMap((response as { result?: { translations?: unknown } })?.result?.translations, ids)
  if (nestedTranslations) {
    return nestedTranslations
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
    const parsedTranslations = normalizeTranslationMap(parsedCandidate?.translations, ids)
    if (parsedTranslations) {
      return parsedTranslations
    }
  }

  return null
}

function normalizeTranslationMap(candidate: unknown, ids: string[]): Record<string, string> | null {
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
    return null
  }

  const normalized = candidate as Record<string, unknown>
  if (!ids.every((id) => typeof normalized[id] === 'string')) {
    return null
  }

  return Object.fromEntries(ids.map((id) => [id, normalized[id] as string]))
}

function parseJsonCandidate(candidate: string): { translations?: Record<string, string> } | null {
  let sanitizedCandidate = candidate.trim()

  if (sanitizedCandidate.startsWith('```json')) {
    sanitizedCandidate = sanitizedCandidate.slice('```json'.length).trimStart()
  }
  else if (sanitizedCandidate.startsWith('```')) {
    sanitizedCandidate = sanitizedCandidate.slice(3).trimStart()
  }

  if (sanitizedCandidate.endsWith('```')) {
    sanitizedCandidate = sanitizedCandidate.slice(0, -3).trimEnd()
  }

  try {
    return JSON.parse(sanitizedCandidate)
  }
  catch {
    return null
  }
}
