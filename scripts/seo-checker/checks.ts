/**
 * SEO Check Implementations
 * Each check function tests for specific SEO issues
 */

import * as path from 'node:path'
import type { PageData, SiteData, SEOIssue, SEOCheckerConfig } from './types'
import { getRule, SEO_RULES } from './rules'
import { fileExists, resolveToFilePath } from './parser'

// Valid BCP47 language codes (common ones)
const VALID_LANG_CODES = new Set([
  'en',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'nl',
  'pl',
  'ru',
  'ja',
  'zh',
  'ko',
  'ar',
  'hi',
  'tr',
  'vi',
  'th',
  'id',
  'ms',
  'uk',
  'cs',
  'el',
  'he',
  'sv',
  'da',
  'fi',
  'no',
  'hu',
  'ro',
  'sk',
  'bg',
  'hr',
  'sr',
  'sl',
  'et',
  'lv',
  'lt',
  'x-default',
  // With regions
  'en-US',
  'en-GB',
  'en-AU',
  'en-CA',
  'es-ES',
  'es-MX',
  'es-AR',
  'pt-BR',
  'pt-PT',
  'zh-CN',
  'zh-TW',
  'zh-HK',
  'fr-FR',
  'fr-CA',
  'de-DE',
  'de-AT',
  'de-CH',
  'it-IT',
  'nl-NL',
  'nl-BE',
  'ja-JP',
  'ko-KR',
])

// Mojibake patterns
const MOJIBAKE_PATTERN = /Ã.|â€™|â€œ|â€|Â |Ã©|Ã¨|Ã /

// Tracking parameter patterns
const TRACKING_PARAMS_PATTERN = /(utm_|gclid=|fbclid=|mc_cid=|mc_eid=|__hs|_ga=)/i

/**
 * Create a fingerprint for an issue (for exclusion matching)
 */
function createFingerprint(
  ruleId: string,
  relativePath: string,
  element?: string,
  line?: number
): string {
  const parts = [ruleId, relativePath]
  if (element) parts.push(element.substring(0, 100))
  if (line) parts.push(`L${line}`)
  return parts.join('::')
}

/**
 * Create an SEO issue
 */
function createIssue(
  ruleId: string,
  page: PageData,
  options: {
    element?: string
    actual?: string
    expected?: string
    line?: number
  } = {}
): SEOIssue | null {
  const rule = getRule(ruleId)
  if (!rule) return null

  return {
    ruleId,
    ruleName: rule.name,
    category: rule.category,
    severity: rule.severity,
    file: page.filePath,
    relativePath: page.relativePath,
    line: options.line,
    element: options.element,
    actual: options.actual,
    expected: options.expected,
    fixHint: rule.fixHint,
    fingerprint: createFingerprint(ruleId, page.relativePath, options.element, options.line),
  }
}

/**
 * Check metadata rules for a page
 */
export function checkMetadata(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00001: Missing or empty title
  if (!page.title || page.title.trim() === '') {
    const issue = createIssue('SEO00001', page)
    if (issue) issues.push(issue)
  }

  // SEO00002: Missing or empty meta description
  if (!page.metaDescription || page.metaDescription.trim() === '') {
    const issue = createIssue('SEO00002', page)
    if (issue) issues.push(issue)
  }

  // SEO00004: Missing canonical
  if (!page.canonical) {
    const issue = createIssue('SEO00004', page)
    if (issue) issues.push(issue)
  }

  // SEO00005: Missing charset
  if (!page.charset) {
    const issue = createIssue('SEO00005', page)
    if (issue) issues.push(issue)
  }

  // SEO00006: Missing html lang
  if (!page.htmlLang) {
    const issue = createIssue('SEO00006', page)
    if (issue) issues.push(issue)
  }

  // SEO00413: Missing viewport
  if (!page.viewport) {
    const issue = createIssue('SEO00413', page)
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check HTML validity rules
 */
export function checkHtmlValidity(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // Count elements to check for multiples
  const titleCount = (page.html.match(/<title[^>]*>/gi) || []).length
  const metaDescCount = (page.html.match(/<meta[^>]*name=["']description["'][^>]*>/gi) || []).length
  const canonicalCount = (page.html.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi) || []).length

  // SEO00007: Multiple title tags
  if (titleCount > 1) {
    const issue = createIssue('SEO00007', page, { actual: `${titleCount} title tags` })
    if (issue) issues.push(issue)
  }

  // SEO00008: Multiple meta description tags
  if (metaDescCount > 1) {
    const issue = createIssue('SEO00008', page, { actual: `${metaDescCount} meta descriptions` })
    if (issue) issues.push(issue)
  }

  // SEO00009: Multiple canonical tags
  if (canonicalCount > 1) {
    const issue = createIssue('SEO00009', page, { actual: `${canonicalCount} canonicals` })
    if (issue) issues.push(issue)
  }

  // SEO00226: Missing doctype
  if (!page.hasDoctype) {
    const issue = createIssue('SEO00226', page)
    if (issue) issues.push(issue)
  }

  // SEO00380: Duplicate IDs
  const idCounts = new Map<string, number>()
  for (const id of page.elementIds) {
    idCounts.set(id, (idCounts.get(id) || 0) + 1)
  }
  for (const [id, count] of idCounts) {
    if (count > 1) {
      const issue = createIssue('SEO00380', page, {
        element: `id="${id}"`,
        actual: `${count} occurrences`,
      })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check content text length rules
 */
export function checkContentLength(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // Title length checks
  if (page.title) {
    const titleLen = page.title.length

    // SEO00013: Title too short
    if (titleLen < 10) {
      const issue = createIssue('SEO00013', page, {
        actual: `${titleLen} chars`,
        expected: '>= 10 chars',
      })
      if (issue) issues.push(issue)
    }

    // SEO00020: Title too long
    if (titleLen > 60) {
      const issue = createIssue('SEO00020', page, {
        actual: `${titleLen} chars`,
        expected: '<= 60 chars',
      })
      if (issue) issues.push(issue)
    }
  }

  // Meta description length checks
  if (page.metaDescription) {
    const descLen = page.metaDescription.length

    // SEO00023: Description too short
    if (descLen < 50) {
      const issue = createIssue('SEO00023', page, {
        actual: `${descLen} chars`,
        expected: '>= 50 chars',
      })
      if (issue) issues.push(issue)
    }

    // SEO00027: Description too long
    if (descLen > 160) {
      const issue = createIssue('SEO00027', page, {
        actual: `${descLen} chars`,
        expected: '<= 160 chars',
      })
      if (issue) issues.push(issue)
    }
  }

  // H1 length checks
  for (const h1 of page.h1s) {
    const h1Len = h1.length

    // SEO00030: H1 too short
    if (h1Len < 5) {
      const issue = createIssue('SEO00030', page, {
        element: h1.substring(0, 50),
        actual: `${h1Len} chars`,
        expected: '>= 5 chars',
      })
      if (issue) issues.push(issue)
    }

    // SEO00034: H1 too long
    if (h1Len > 80) {
      const issue = createIssue('SEO00034', page, {
        element: h1.substring(0, 50),
        actual: `${h1Len} chars`,
        expected: '<= 80 chars',
      })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check content format rules
 */
export function checkContentFormat(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // Title format checks
  if (page.title) {
    // SEO00056: Leading/trailing whitespace
    if (page.title !== page.title.trim()) {
      const issue = createIssue('SEO00056', page, { element: page.title })
      if (issue) issues.push(issue)
    }

    // SEO00057: Repeated spaces
    if (/\s{2,}/.test(page.title)) {
      const issue = createIssue('SEO00057', page, { element: page.title })
      if (issue) issues.push(issue)
    }

    // SEO00059: Mojibake
    if (MOJIBAKE_PATTERN.test(page.title)) {
      const issue = createIssue('SEO00059', page, { element: page.title })
      if (issue) issues.push(issue)
    }
  }

  // Description format checks
  if (page.metaDescription) {
    // SEO00060: Leading/trailing whitespace
    if (page.metaDescription !== page.metaDescription.trim()) {
      const issue = createIssue('SEO00060', page, { element: page.metaDescription.substring(0, 50) })
      if (issue) issues.push(issue)
    }

    // SEO00063: Mojibake
    if (MOJIBAKE_PATTERN.test(page.metaDescription)) {
      const issue = createIssue('SEO00063', page, { element: page.metaDescription.substring(0, 50) })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check heading rules
 */
export function checkHeadings(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00109: Missing H1
  if (page.h1s.length === 0) {
    const issue = createIssue('SEO00109', page)
    if (issue) issues.push(issue)
  }

  // SEO00110: Multiple H1
  if (page.h1s.length > 1) {
    const issue = createIssue('SEO00110', page, { actual: `${page.h1s.length} H1 tags` })
    if (issue) issues.push(issue)
  }

  // SEO00111: Heading level skip
  let previousLevel = 0
  for (const heading of page.headingOrder) {
    if (previousLevel > 0 && heading.level > previousLevel + 1) {
      const issue = createIssue('SEO00111', page, {
        element: heading.text.substring(0, 50),
        actual: `H${previousLevel} -> H${heading.level}`,
        expected: `H${previousLevel} -> H${previousLevel + 1}`,
      })
      if (issue) issues.push(issue)
    }
    previousLevel = heading.level
  }

  // SEO00125: Duplicate H1 text within page
  const h1Counts = new Map<string, number>()
  for (const h1 of page.h1s) {
    h1Counts.set(h1, (h1Counts.get(h1) || 0) + 1)
  }
  for (const [h1, count] of h1Counts) {
    if (count > 1) {
      const issue = createIssue('SEO00125', page, {
        element: h1.substring(0, 50),
        actual: `${count} occurrences`,
      })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check indexability rules
 */
export function checkIndexability(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  if (page.canonical) {
    // SEO00100: Canonical is relative URL
    if (!page.canonical.startsWith('http://') && !page.canonical.startsWith('https://')) {
      const issue = createIssue('SEO00100', page, { element: page.canonical })
      if (issue) issues.push(issue)
    }

    // SEO00101: Canonical contains fragment
    if (page.canonical.includes('#')) {
      const issue = createIssue('SEO00101', page, { element: page.canonical })
      if (issue) issues.push(issue)
    }

    // SEO00102: Canonical contains tracking parameters
    if (TRACKING_PARAMS_PATTERN.test(page.canonical)) {
      const issue = createIssue('SEO00102', page, { element: page.canonical })
      if (issue) issues.push(issue)
    }
  }

  // SEO00105: Conflicting robots directives
  if (page.metaRobots) {
    const lower = page.metaRobots.toLowerCase()
    if (lower.includes('noindex') && lower.includes('index') && !lower.includes('noindex')) {
      const issue = createIssue('SEO00105', page, { element: page.metaRobots })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check link rules
 */
export function checkLinks(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  for (const link of page.links) {
    // SEO00134: Empty href attribute
    if (link.href === '' || link.href === undefined) {
      const issue = createIssue('SEO00134', page, { element: link.text || '(empty link)' })
      if (issue) issues.push(issue)
    }

    // SEO00135: Anchor text missing/empty
    if (!link.text || link.text.trim() === '') {
      // Check if it has an aria-label or contains an image with alt
      const issue = createIssue('SEO00135', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00136-00142: Generic anchor text
    const lowerText = link.text.toLowerCase().trim()
    if (lowerText === 'click here') {
      const issue = createIssue('SEO00136', page, { element: link.text })
      if (issue) issues.push(issue)
    }
    if (lowerText === 'read more') {
      const issue = createIssue('SEO00137', page, { element: link.text })
      if (issue) issues.push(issue)
    }

    // SEO00143: Internal link uses nofollow
    if (link.isInternal && link.rel?.includes('nofollow')) {
      const issue = createIssue('SEO00143', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00144: External link with target=_blank missing noopener
    if (link.isExternal && link.target === '_blank' && !link.rel?.includes('noopener')) {
      const issue = createIssue('SEO00144', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00147: Broken relative link
    // Only check truly relative URLs (not absolute URLs to the same domain)
    const isRelativeUrl = link.href &&
      !link.href.startsWith('http://') &&
      !link.href.startsWith('https://') &&
      !link.href.startsWith('#') &&
      !link.href.startsWith('mailto:') &&
      !link.href.startsWith('tel:') &&
      !link.href.startsWith('javascript:') &&
      !link.href.startsWith('data:')

    if (isRelativeUrl) {
      const resolvedPath = resolveToFilePath(link.href, page.relativePath, config.distPath)
      if (resolvedPath && !fileExists(resolvedPath)) {
        const issue = createIssue('SEO00147', page, { element: link.href })
        if (issue) issues.push(issue)
      }
    }

    // SEO00148: Double slash in path
    if (link.href && /https?:\/\/[^/]+\/\//.test(link.href)) {
      const issue = createIssue('SEO00148', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00152: HTTP links on HTTPS page
    if (config.baseUrl.startsWith('https://') && link.href.startsWith('http://')) {
      const issue = createIssue('SEO00152', page, { element: link.href })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check image rules
 */
export function checkImages(
  page: PageData,
  config: SEOCheckerConfig,
  siteData: SiteData
): SEOIssue[] {
  const issues: SEOIssue[] = []

  for (const img of page.images) {
    // SEO00153: Missing alt attribute
    if (img.alt === undefined) {
      const issue = createIssue('SEO00153', page, { element: img.src })
      if (issue) issues.push(issue)
    }

    // SEO00155: Broken image reference
    if (img.src && !img.src.startsWith('http://') && !img.src.startsWith('https://') && !img.src.startsWith('data:')) {
      const resolvedPath = resolveToFilePath(img.src, page.relativePath, config.distPath)
      if (resolvedPath && !fileExists(resolvedPath)) {
        const issue = createIssue('SEO00155', page, { element: img.src })
        if (issue) issues.push(issue)
      }
    }

    // Check image file size
    if (img.src && !img.src.startsWith('http://') && !img.src.startsWith('https://') && !img.src.startsWith('data:')) {
      const resolvedPath = resolveToFilePath(img.src, page.relativePath, config.distPath)
      if (resolvedPath) {
        const relativePath = path.relative(config.distPath, resolvedPath)
        const imageInfo = siteData.imageFiles.get(relativePath)
        if (imageInfo) {
          const sizeKB = imageInfo.size / 1024

          // SEO00166: Image > 1024KB
          if (sizeKB > 1024) {
            const issue = createIssue('SEO00166', page, {
              element: img.src,
              actual: `${Math.round(sizeKB)}KB`,
              expected: '<= 1024KB',
            })
            if (issue) issues.push(issue)
          }
          // SEO00164: Image > 300KB
          else if (sizeKB > 300) {
            const issue = createIssue('SEO00164', page, {
              element: img.src,
              actual: `${Math.round(sizeKB)}KB`,
              expected: '<= 300KB',
            })
            if (issue) issues.push(issue)
          }
          // SEO00160: Image > 100KB
          else if (sizeKB > 100) {
            const issue = createIssue('SEO00160', page, {
              element: img.src,
              actual: `${Math.round(sizeKB)}KB`,
              expected: '<= 100KB',
            })
            if (issue) issues.push(issue)
          }
        }
      }
    }
  }

  return issues
}

/**
 * Check social tags rules
 */
export function checkSocialTags(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00168: Missing og:title
  if (!page.og.title) {
    const issue = createIssue('SEO00168', page)
    if (issue) issues.push(issue)
  }

  // SEO00169: Missing og:description
  if (!page.og.description) {
    const issue = createIssue('SEO00169', page)
    if (issue) issues.push(issue)
  }

  // SEO00170: Missing og:image
  if (!page.og.image) {
    const issue = createIssue('SEO00170', page)
    if (issue) issues.push(issue)
  }

  // SEO00171: Missing og:url
  if (!page.og.url) {
    const issue = createIssue('SEO00171', page)
    if (issue) issues.push(issue)
  }

  // SEO00172: Missing twitter:card
  if (!page.twitter.card) {
    const issue = createIssue('SEO00172', page)
    if (issue) issues.push(issue)
  }

  // SEO00371: og:image is relative
  if (page.og.image && !page.og.image.startsWith('http://') && !page.og.image.startsWith('https://')) {
    const issue = createIssue('SEO00371', page, { element: page.og.image })
    if (issue) issues.push(issue)
  }

  // SEO00372: og:image points to missing file
  if (page.og.image && !page.og.image.startsWith('http://') && !page.og.image.startsWith('https://')) {
    const resolvedPath = resolveToFilePath(page.og.image, page.relativePath, config.distPath)
    if (resolvedPath && !fileExists(resolvedPath)) {
      const issue = createIssue('SEO00372', page, { element: page.og.image })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check international SEO rules
 */
export function checkInternationalSEO(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00182: Invalid HTML lang attribute
  if (page.htmlLang && !isValidBCP47(page.htmlLang)) {
    const issue = createIssue('SEO00182', page, { element: page.htmlLang })
    if (issue) issues.push(issue)
  }

  if (page.hreflangs.length > 0) {
    const langCodes = new Set<string>()
    let hasSelfReference = false

    for (const hreflang of page.hreflangs) {
      // SEO00177: Invalid language code
      if (!isValidBCP47(hreflang.lang)) {
        const issue = createIssue('SEO00177', page, { element: hreflang.lang })
        if (issue) issues.push(issue)
      }

      // SEO00178: Duplicate language codes
      if (langCodes.has(hreflang.lang)) {
        const issue = createIssue('SEO00178', page, { element: hreflang.lang })
        if (issue) issues.push(issue)
      }
      langCodes.add(hreflang.lang)

      // SEO00180: Relative hreflang URLs
      if (!hreflang.url.startsWith('http://') && !hreflang.url.startsWith('https://')) {
        const issue = createIssue('SEO00180', page, { element: `${hreflang.lang}: ${hreflang.url}` })
        if (issue) issues.push(issue)
      }

      // Check for self-reference
      if (hreflang.url === page.url || hreflang.url === page.canonical) {
        hasSelfReference = true
      }
    }

    // SEO00179: Missing self-reference
    if (!hasSelfReference) {
      const issue = createIssue('SEO00179', page)
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check structured data rules
 */
export function checkStructuredData(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  for (const data of page.jsonLd) {
    // SEO00229: Invalid JSON
    if (typeof data === 'object' && data !== null && '_parseError' in data) {
      const issue = createIssue('SEO00229', page)
      if (issue) issues.push(issue)
      continue
    }

    if (typeof data === 'object' && data !== null) {
      const obj = data as Record<string, unknown>

      // SEO00230: Missing @context
      if (!('@context' in obj)) {
        const issue = createIssue('SEO00230', page)
        if (issue) issues.push(issue)
      }

      // SEO00231: Missing @type
      if (!('@type' in obj) && !('@graph' in obj)) {
        const issue = createIssue('SEO00231', page)
        if (issue) issues.push(issue)
      }
    }
  }

  return issues
}

/**
 * Check content quality rules
 */
export function checkContentQuality(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00186: Thin content (< 50 words)
  if (page.wordCount < 50) {
    const issue = createIssue('SEO00186', page, {
      actual: `${page.wordCount} words`,
      expected: '>= 50 words',
    })
    if (issue) issues.push(issue)
  }
  // SEO00189: Thin content (< 200 words)
  else if (page.wordCount < 200) {
    const issue = createIssue('SEO00189', page, {
      actual: `${page.wordCount} words`,
      expected: '>= 200 words',
    })
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check template hygiene rules
 */
export function checkTemplateHygiene(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  const loremPattern = /lorem ipsum/i
  const todoPattern = /\bTODO\b/
  const fixmePattern = /\bFIXME\b/

  // Check title
  if (page.title) {
    if (loremPattern.test(page.title)) {
      const issue = createIssue('SEO00382', page, { element: page.title })
      if (issue) issues.push(issue)
    }
    if (todoPattern.test(page.title)) {
      const issue = createIssue('SEO00386', page, { element: page.title })
      if (issue) issues.push(issue)
    }
  }

  // Check meta description
  if (page.metaDescription) {
    if (loremPattern.test(page.metaDescription)) {
      const issue = createIssue('SEO00383', page, { element: page.metaDescription.substring(0, 50) })
      if (issue) issues.push(issue)
    }
  }

  // Check H1
  for (const h1 of page.h1s) {
    if (loremPattern.test(h1)) {
      const issue = createIssue('SEO00384', page, { element: h1.substring(0, 50) })
      if (issue) issues.push(issue)
    }
  }

  // Check body for FIXME
  if (fixmePattern.test(page.html)) {
    const issue = createIssue('SEO00390', page)
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check accessibility rules
 */
export function checkAccessibility(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00222: Missing main landmark
  if (!page.hasMainLandmark) {
    const issue = createIssue('SEO00222', page)
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check site-wide duplicate rules
 */
export function checkDuplicates(siteData: SiteData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00088: Duplicate titles
  for (const [title, pages] of siteData.titles) {
    if (pages.length > 1) {
      const rule = getRule('SEO00088')
      if (rule) {
        issues.push({
          ruleId: 'SEO00088',
          ruleName: rule.name,
          category: rule.category,
          severity: rule.severity,
          file: '',
          relativePath: pages.join(', '),
          element: title.substring(0, 50),
          actual: `${pages.length} pages`,
          fixHint: rule.fixHint,
          fingerprint: `SEO00088::${title.substring(0, 50)}`,
        })
      }
    }
  }

  // SEO00090: Duplicate descriptions
  for (const [desc, pages] of siteData.descriptions) {
    if (pages.length > 1) {
      const rule = getRule('SEO00090')
      if (rule) {
        issues.push({
          ruleId: 'SEO00090',
          ruleName: rule.name,
          category: rule.category,
          severity: rule.severity,
          file: '',
          relativePath: pages.join(', '),
          element: desc.substring(0, 50),
          actual: `${pages.length} pages`,
          fixHint: rule.fixHint,
          fingerprint: `SEO00090::${desc.substring(0, 50)}`,
        })
      }
    }
  }

  // SEO00092: Duplicate H1s
  for (const [h1, pages] of siteData.h1s) {
    if (pages.length > 1) {
      const rule = getRule('SEO00092')
      if (rule) {
        issues.push({
          ruleId: 'SEO00092',
          ruleName: rule.name,
          category: rule.category,
          severity: rule.severity,
          file: '',
          relativePath: pages.join(', '),
          element: h1.substring(0, 50),
          actual: `${pages.length} pages`,
          fixHint: rule.fixHint,
          fingerprint: `SEO00092::${h1.substring(0, 50)}`,
        })
      }
    }
  }

  // SEO00094: Duplicate canonicals (excluding same canonical for different language versions)
  for (const [canonical, pages] of siteData.canonicals) {
    if (pages.length > 1) {
      // Check if these are language variants (same page in different locales)
      const isLanguageVariant = pages.every((p) => {
        const langMatch = p.match(/^([a-z]{2}(-[A-Z]{2})?)\//i)
        return langMatch !== null
      })

      // Only report if not language variants or if more than expected
      if (!isLanguageVariant || pages.length > config.languages.length) {
        const rule = getRule('SEO00094')
        if (rule) {
          issues.push({
            ruleId: 'SEO00094',
            ruleName: rule.name,
            category: rule.category,
            severity: rule.severity,
            file: '',
            relativePath: pages.join(', '),
            element: canonical.substring(0, 50),
            actual: `${pages.length} pages`,
            fixHint: rule.fixHint,
            fingerprint: `SEO00094::${canonical.substring(0, 50)}`,
          })
        }
      }
    }
  }

  return issues
}

/**
 * Validate BCP47 language code
 */
function isValidBCP47(lang: string): boolean {
  if (VALID_LANG_CODES.has(lang)) return true

  // Basic BCP47 pattern
  const bcp47Pattern = /^[a-z]{2,3}(-[A-Z]{2})?$/i
  return bcp47Pattern.test(lang)
}

/**
 * Run all checks on a page
 */
export function runPageChecks(
  page: PageData,
  config: SEOCheckerConfig,
  siteData: SiteData
): SEOIssue[] {
  const allIssues: SEOIssue[] = []

  allIssues.push(...checkMetadata(page, config))
  allIssues.push(...checkHtmlValidity(page, config))
  allIssues.push(...checkContentLength(page, config))
  allIssues.push(...checkContentFormat(page, config))
  allIssues.push(...checkHeadings(page, config))
  allIssues.push(...checkIndexability(page, config))
  allIssues.push(...checkLinks(page, config))
  allIssues.push(...checkImages(page, config, siteData))
  allIssues.push(...checkSocialTags(page, config))
  allIssues.push(...checkInternationalSEO(page, config))
  allIssues.push(...checkStructuredData(page, config))
  allIssues.push(...checkContentQuality(page, config))
  allIssues.push(...checkTemplateHygiene(page, config))
  allIssues.push(...checkAccessibility(page, config))

  return allIssues
}
