/**
 * SEO Check Implementations
 * Each check function tests for specific SEO issues
 * Implements rules from the comprehensive SEO rules CSV
 */

import * as path from 'node:path'
import type { PageData, SiteData, SEOIssue, SEOCheckerConfig } from './types'
import { getRule } from './rules'
import { fileExists, resolveToFilePath } from './parser'

// Valid BCP47 language codes (common ones)
const VALID_LANG_CODES = new Set([
  'en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'zh', 'ko', 'ar',
  'hi', 'tr', 'vi', 'th', 'id', 'ms', 'uk', 'cs', 'el', 'he', 'sv', 'da', 'fi',
  'no', 'hu', 'ro', 'sk', 'bg', 'hr', 'sr', 'sl', 'et', 'lv', 'lt', 'x-default',
  'en-US', 'en-GB', 'en-AU', 'en-CA', 'es-ES', 'es-MX', 'es-AR', 'pt-BR', 'pt-PT',
  'zh-CN', 'zh-TW', 'zh-HK', 'fr-FR', 'fr-CA', 'de-DE', 'de-AT', 'de-CH',
  'it-IT', 'nl-NL', 'nl-BE', 'ja-JP', 'ko-KR',
])

// Mojibake patterns
const MOJIBAKE_PATTERN = /Ã.|â€™|â€œ|â€|Â |Ã©|Ã¨|Ã |ï¿½|Ã¢|Ã£|Ã¤|Ã¥|Ã¦|Ã§|Ãª|Ã«|Ã¬|Ã­|Ã®|Ã¯|Ã±|Ã²|Ã³|Ã´|Ãµ|Ã¶|Ã¹|Ãº|Ã»|Ã¼|Ã½|Ã¿/

// Tracking parameter patterns
const TRACKING_PARAMS_PATTERN = /(utm_|gclid=|fbclid=|mc_cid=|mc_eid=|__hs|_ga=|_gl=|dclid=|msclkid=)/i

// Generic anchor text patterns
const GENERIC_ANCHOR_PATTERNS: [RegExp, string][] = [
  [/^click here$/i, 'SEO00136'],
  [/^read more$/i, 'SEO00137'],
  [/^learn more$/i, 'SEO00138'],
  [/^here$/i, 'SEO00139'],
  [/^more$/i, 'SEO00140'],
  [/^link$/i, 'SEO00141'],
  [/^this$/i, 'SEO00142'],
]

// Placeholder patterns
const PLACEHOLDER_PATTERNS: [RegExp, string, string][] = [
  [/lorem ipsum/i, 'lorem ipsum', 'SEO00382'],
  [/\bTODO\b/, 'TODO', 'SEO00386'],
  [/\bFIXME\b/, 'FIXME', 'SEO00390'],
  [/^(untitled|new page)$/i, 'untitled', 'SEO00394'],
  [/\[placeholder\]/i, 'placeholder', 'SEO00382'],
  [/\{\{.*\}\}/, 'template variable', 'SEO00382'],
]

// Schema.org types and their required fields
const SCHEMA_REQUIRED_FIELDS: Record<string, string[]> = {
  'Article': ['headline', 'author', 'datePublished'],
  'NewsArticle': ['headline', 'author', 'datePublished'],
  'BlogPosting': ['headline', 'author', 'datePublished'],
  'Product': ['name', 'offers'],
  'Organization': ['name', 'url'],
  'Person': ['name'],
  'LocalBusiness': ['name', 'address'],
  'WebSite': ['name', 'url'],
  'WebPage': ['name'],
  'FAQPage': ['mainEntity'],
  'HowTo': ['name', 'step'],
  'Recipe': ['name', 'recipeIngredient', 'recipeInstructions'],
  'Event': ['name', 'startDate', 'location'],
  'VideoObject': ['name', 'thumbnailUrl', 'uploadDate'],
  'ImageObject': ['contentUrl'],
  'BreadcrumbList': ['itemListElement'],
  'ItemList': ['itemListElement'],
  'Review': ['itemReviewed', 'reviewRating'],
  'AggregateRating': ['ratingValue', 'reviewCount'],
  'Offer': ['price', 'priceCurrency'],
  'SoftwareApplication': ['name', 'operatingSystem', 'applicationCategory'],
  'JobPosting': ['title', 'datePosted', 'hiringOrganization'],
  'Course': ['name', 'provider'],
  'Book': ['name', 'author'],
}

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
 * SEO00001-SEO00019
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

  // SEO00003: Missing or empty meta robots
  if (!page.metaRobots || page.metaRobots.trim() === '') {
    const issue = createIssue('SEO00003', page)
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

  // SEO00010: Canonical is empty
  if (page.canonical !== undefined && page.canonical.trim() === '') {
    const issue = createIssue('SEO00010', page)
    if (issue) issues.push(issue)
  }

  // SEO00011: html lang is empty
  if (page.htmlLang !== undefined && page.htmlLang.trim() === '') {
    const issue = createIssue('SEO00011', page)
    if (issue) issues.push(issue)
  }

  // SEO00012: charset is empty
  if (page.charset !== undefined && page.charset.trim() === '') {
    const issue = createIssue('SEO00012', page)
    if (issue) issues.push(issue)
  }

  // SEO00413: Missing viewport
  if (!page.viewport) {
    const issue = createIssue('SEO00413', page)
    if (issue) issues.push(issue)
  }

  // SEO00414: Multiple viewport tags
  const viewportMatches = (page.html.match(/<meta[^>]*name=["']viewport["'][^>]*>/gi) || [])
  if (viewportMatches.length > 1) {
    const issue = createIssue('SEO00414', page, { actual: `${viewportMatches.length} viewport tags` })
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check HTML validity rules
 * SEO00007-SEO00009, SEO00226, SEO00380
 */
export function checkHtmlValidity(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // Count elements to check for multiples
  const titleCount = (page.html.match(/<title[^>]*>/gi) || []).length
  const metaDescCount = (page.html.match(/<meta[^>]*name=["']description["'][^>]*>/gi) || []).length
  const canonicalCount = (page.html.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi) || []).length
  const charsetCount = (page.html.match(/<meta[^>]*charset[^>]*>/gi) || []).length +
    (page.html.match(/<meta[^>]*http-equiv=["']Content-Type["'][^>]*>/gi) || []).length

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

  // SEO00227: Doctype not at start
  if (page.hasDoctype && !page.html.trim().toLowerCase().startsWith('<!doctype')) {
    const issue = createIssue('SEO00227', page)
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

  // SEO00381: Meta refresh redirect
  if (page.html.includes('http-equiv="refresh"') || page.html.includes("http-equiv='refresh'")) {
    const issue = createIssue('SEO00381', page)
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check content text length rules
 * SEO00013-SEO00055
 */
export function checkContentLength(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // Title length checks
  if (page.title) {
    const titleLen = page.title.length

    // SEO00013-00019: Title too short
    if (titleLen < 10) {
      const issue = createIssue('SEO00013', page, { actual: `${titleLen} chars`, expected: '>= 10 chars' })
      if (issue) issues.push(issue)
    } else if (titleLen < 20) {
      const issue = createIssue('SEO00014', page, { actual: `${titleLen} chars`, expected: '>= 20 chars' })
      if (issue) issues.push(issue)
    } else if (titleLen < 30) {
      const issue = createIssue('SEO00015', page, { actual: `${titleLen} chars`, expected: '>= 30 chars' })
      if (issue) issues.push(issue)
    }

    // SEO00020-00022: Title too long
    if (titleLen > 70) {
      const issue = createIssue('SEO00022', page, { actual: `${titleLen} chars`, expected: '<= 70 chars' })
      if (issue) issues.push(issue)
    } else if (titleLen > 65) {
      const issue = createIssue('SEO00021', page, { actual: `${titleLen} chars`, expected: '<= 65 chars' })
      if (issue) issues.push(issue)
    } else if (titleLen > 60) {
      const issue = createIssue('SEO00020', page, { actual: `${titleLen} chars`, expected: '<= 60 chars' })
      if (issue) issues.push(issue)
    }
  }

  // Meta description length checks
  if (page.metaDescription) {
    const descLen = page.metaDescription.length

    // SEO00023-00026: Description too short
    if (descLen < 50) {
      const issue = createIssue('SEO00023', page, { actual: `${descLen} chars`, expected: '>= 50 chars' })
      if (issue) issues.push(issue)
    } else if (descLen < 70) {
      const issue = createIssue('SEO00024', page, { actual: `${descLen} chars`, expected: '>= 70 chars' })
      if (issue) issues.push(issue)
    } else if (descLen < 100) {
      const issue = createIssue('SEO00025', page, { actual: `${descLen} chars`, expected: '>= 100 chars' })
      if (issue) issues.push(issue)
    } else if (descLen < 120) {
      const issue = createIssue('SEO00026', page, { actual: `${descLen} chars`, expected: '>= 120 chars' })
      if (issue) issues.push(issue)
    }

    // SEO00027-00029: Description too long
    if (descLen > 320) {
      const issue = createIssue('SEO00029', page, { actual: `${descLen} chars`, expected: '<= 320 chars' })
      if (issue) issues.push(issue)
    } else if (descLen > 200) {
      const issue = createIssue('SEO00028', page, { actual: `${descLen} chars`, expected: '<= 200 chars' })
      if (issue) issues.push(issue)
    } else if (descLen > 160) {
      const issue = createIssue('SEO00027', page, { actual: `${descLen} chars`, expected: '<= 160 chars' })
      if (issue) issues.push(issue)
    }
  }

  // H1 length checks
  for (const h1 of page.h1s) {
    const h1Len = h1.length

    // SEO00030-00033: H1 too short
    if (h1Len < 5) {
      const issue = createIssue('SEO00030', page, { element: h1.substring(0, 50), actual: `${h1Len} chars`, expected: '>= 5 chars' })
      if (issue) issues.push(issue)
    } else if (h1Len < 10) {
      const issue = createIssue('SEO00031', page, { element: h1.substring(0, 50), actual: `${h1Len} chars`, expected: '>= 10 chars' })
      if (issue) issues.push(issue)
    } else if (h1Len < 20) {
      const issue = createIssue('SEO00032', page, { element: h1.substring(0, 50), actual: `${h1Len} chars`, expected: '>= 20 chars' })
      if (issue) issues.push(issue)
    }

    // SEO00034-00036: H1 too long
    if (h1Len > 100) {
      const issue = createIssue('SEO00036', page, { element: h1.substring(0, 50), actual: `${h1Len} chars`, expected: '<= 100 chars' })
      if (issue) issues.push(issue)
    } else if (h1Len > 90) {
      const issue = createIssue('SEO00035', page, { element: h1.substring(0, 50), actual: `${h1Len} chars`, expected: '<= 90 chars' })
      if (issue) issues.push(issue)
    } else if (h1Len > 80) {
      const issue = createIssue('SEO00034', page, { element: h1.substring(0, 50), actual: `${h1Len} chars`, expected: '<= 80 chars' })
      if (issue) issues.push(issue)
    }
  }

  // H2 length checks
  for (const h2 of page.h2s) {
    const h2Len = h2.length

    // SEO00037-00040: H2 too short
    if (h2Len < 5) {
      const issue = createIssue('SEO00037', page, { element: h2.substring(0, 50), actual: `${h2Len} chars`, expected: '>= 5 chars' })
      if (issue) issues.push(issue)
    }

    // SEO00041-00043: H2 too long
    if (h2Len > 80) {
      const issue = createIssue('SEO00043', page, { element: h2.substring(0, 50), actual: `${h2Len} chars`, expected: '<= 80 chars' })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check content format rules
 * SEO00056-00087
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

    // SEO00058: Repeated punctuation
    if (/[.!?]{2,}|[-_]{3,}/.test(page.title)) {
      const issue = createIssue('SEO00058', page, { element: page.title })
      if (issue) issues.push(issue)
    }

    // SEO00059: Mojibake
    if (MOJIBAKE_PATTERN.test(page.title)) {
      const issue = createIssue('SEO00059', page, { element: page.title })
      if (issue) issues.push(issue)
    }

    // SEO00064: ALL CAPS title
    if (page.title.length > 10 && page.title === page.title.toUpperCase() && /[A-Z]/.test(page.title)) {
      const issue = createIssue('SEO00064', page, { element: page.title })
      if (issue) issues.push(issue)
    }

    // SEO00068: Title starts with special char
    if (/^[^a-zA-Z0-9]/.test(page.title.trim())) {
      const issue = createIssue('SEO00068', page, { element: page.title })
      if (issue) issues.push(issue)
    }

    // SEO00072: Pipe separator count
    const pipeCount = (page.title.match(/\|/g) || []).length
    if (pipeCount > 2) {
      const issue = createIssue('SEO00074', page, { element: page.title, actual: `${pipeCount} pipes` })
      if (issue) issues.push(issue)
    } else if (pipeCount > 1) {
      const issue = createIssue('SEO00073', page, { element: page.title, actual: `${pipeCount} pipes` })
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

    // SEO00061: Repeated spaces
    if (/\s{2,}/.test(page.metaDescription)) {
      const issue = createIssue('SEO00061', page, { element: page.metaDescription.substring(0, 50) })
      if (issue) issues.push(issue)
    }

    // SEO00063: Mojibake
    if (MOJIBAKE_PATTERN.test(page.metaDescription)) {
      const issue = createIssue('SEO00063', page, { element: page.metaDescription.substring(0, 50) })
      if (issue) issues.push(issue)
    }

    // SEO00065: ALL CAPS description
    if (page.metaDescription.length > 20 && page.metaDescription === page.metaDescription.toUpperCase() && /[A-Z]/.test(page.metaDescription)) {
      const issue = createIssue('SEO00065', page, { element: page.metaDescription.substring(0, 50) })
      if (issue) issues.push(issue)
    }
  }

  // H1 format checks
  for (const h1 of page.h1s) {
    // SEO00066: ALL CAPS H1
    if (h1.length > 5 && h1 === h1.toUpperCase() && /[A-Z]/.test(h1)) {
      const issue = createIssue('SEO00066', page, { element: h1.substring(0, 50) })
      if (issue) issues.push(issue)
    }

    // SEO00067: Mojibake in H1
    if (MOJIBAKE_PATTERN.test(h1)) {
      const issue = createIssue('SEO00067', page, { element: h1.substring(0, 50) })
      if (issue) issues.push(issue)
    }

    // SEO00069: H1 starts with special char
    if (/^[^a-zA-Z0-9]/.test(h1.trim())) {
      const issue = createIssue('SEO00069', page, { element: h1.substring(0, 50) })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check heading rules
 * SEO00109-00135
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

  // SEO00112: First heading is not H1
  if (page.headingOrder.length > 0 && page.headingOrder[0].level !== 1) {
    const issue = createIssue('SEO00112', page, {
      actual: `First heading is H${page.headingOrder[0].level}`,
    })
    if (issue) issues.push(issue)
  }

  // SEO00113-00124: Missing heading levels (if other headings exist)
  if (page.headingOrder.length > 0) {
    const usedLevels = new Set(page.headingOrder.map(h => h.level))
    if (usedLevels.has(2) && !usedLevels.has(1)) {
      const issue = createIssue('SEO00113', page)
      if (issue) issues.push(issue)
    }
    if (usedLevels.has(3) && !usedLevels.has(2)) {
      const issue = createIssue('SEO00114', page)
      if (issue) issues.push(issue)
    }
    if (usedLevels.has(4) && !usedLevels.has(3)) {
      const issue = createIssue('SEO00115', page)
      if (issue) issues.push(issue)
    }
  }

  // SEO00125: Duplicate H1 text within page
  const h1Counts = new Map<string, number>()
  for (const h1 of page.h1s) {
    h1Counts.set(h1, (h1Counts.get(h1) || 0) + 1)
  }
  for (const [h1, count] of h1Counts) {
    if (count > 1) {
      const issue = createIssue('SEO00125', page, { element: h1.substring(0, 50), actual: `${count} occurrences` })
      if (issue) issues.push(issue)
    }
  }

  // SEO00126-00127: Excessive headings count
  if (page.headingOrder.length > 50) {
    const issue = createIssue('SEO00127', page, { actual: `${page.headingOrder.length} headings` })
    if (issue) issues.push(issue)
  } else if (page.headingOrder.length > 30) {
    const issue = createIssue('SEO00126', page, { actual: `${page.headingOrder.length} headings` })
    if (issue) issues.push(issue)
  }

  // SEO00128: Empty heading
  for (const heading of page.headingOrder) {
    if (!heading.text || heading.text.trim() === '') {
      const issue = createIssue('SEO00128', page, { element: `H${heading.level}` })
      if (issue) issues.push(issue)
    }
  }

  // SEO00129-00130: H1 matches title exactly or nearly
  if (page.title && page.h1s.length > 0) {
    const normalizedTitle = page.title.toLowerCase().trim()
    for (const h1 of page.h1s) {
      const normalizedH1 = h1.toLowerCase().trim()
      if (normalizedH1 === normalizedTitle) {
        const issue = createIssue('SEO00129', page, { element: h1.substring(0, 50) })
        if (issue) issues.push(issue)
      }
    }
  }

  return issues
}

/**
 * Check indexability rules
 * SEO00100-00108
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

    // SEO00103: Canonical uses HTTP instead of HTTPS
    if (page.canonical.startsWith('http://') && config.baseUrl.startsWith('https://')) {
      const issue = createIssue('SEO00103', page, { element: page.canonical })
      if (issue) issues.push(issue)
    }
  }

  // SEO00105: Conflicting robots directives
  if (page.metaRobots) {
    const lower = page.metaRobots.toLowerCase()
    const hasNoindex = lower.includes('noindex')
    const hasIndex = /\bindex\b/.test(lower) && !hasNoindex
    const hasNofollow = lower.includes('nofollow')
    const hasFollow = /\bfollow\b/.test(lower) && !hasNofollow

    if ((hasNoindex && hasIndex) || (hasNofollow && hasFollow)) {
      const issue = createIssue('SEO00105', page, { element: page.metaRobots })
      if (issue) issues.push(issue)
    }
  }

  // SEO00106: Page has noindex but is in sitemap (would need sitemap data)
  // SEO00107: Page has noindex but has incoming internal links (would need link graph)

  // SEO00368: rel=prev/next used (deprecated)
  if (page.html.includes('rel="prev"') || page.html.includes("rel='prev'") ||
      page.html.includes('rel="next"') || page.html.includes("rel='next'")) {
    const issue = createIssue('SEO00368', page)
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check link rules
 * SEO00134-00151
 */
export function checkLinks(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  for (const link of page.links) {
    // SEO00134: Empty href attribute
    if (link.href === '' || link.href === undefined) {
      const issue = createIssue('SEO00134', page, { element: link.text || '(empty link)' })
      if (issue) issues.push(issue)
    }

    // SEO00135: Anchor text missing/empty (no text, no aria-label, no title)
    if (!link.text || link.text.trim() === '') {
      const issue = createIssue('SEO00135', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00136-00142: Generic anchor text
    if (link.text) {
      const lowerText = link.text.toLowerCase().trim()
      for (const [pattern, ruleId] of GENERIC_ANCHOR_PATTERNS) {
        if (pattern.test(lowerText)) {
          const issue = createIssue(ruleId, page, { element: link.text })
          if (issue) issues.push(issue)
          break
        }
      }
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

    // SEO00145: mailto: link missing email address
    if (link.href && link.href.startsWith('mailto:')) {
      const email = link.href.slice(7).split('?')[0] // Remove query params
      if (!email || email.trim() === '') {
        const issue = createIssue('SEO00145', page, { element: link.href })
        if (issue) issues.push(issue)
      }
    }

    // SEO00146: tel: link missing phone number
    if (link.href && link.href.startsWith('tel:')) {
      const phone = link.href.slice(4).split('?')[0]
      if (!phone || phone.trim() === '') {
        const issue = createIssue('SEO00146', page, { element: link.href })
        if (issue) issues.push(issue)
      }
    }

    // SEO00147: Broken relative link
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

    // SEO00149: Uppercase letters in URL path (internal links)
    if (link.href && link.isInternal) {
      // Extract path portion (after domain)
      const urlPath = link.href.replace(/^https?:\/\/[^/]+/, '')
      if (urlPath && /[A-Z]/.test(urlPath)) {
        const issue = createIssue('SEO00149', page, { element: link.href })
        if (issue) issues.push(issue)
      }
    }

    // SEO00150: Spaces in URL (encoded or not)
    if (link.href && /%20| /.test(link.href)) {
      const issue = createIssue('SEO00150', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00151: Trailing punctuation in URL
    if (link.href && /[.,;:!?]$/.test(link.href.replace(/\/$/, ''))) {
      const issue = createIssue('SEO00151', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00152: HTTP links on HTTPS page
    if (config.baseUrl.startsWith('https://') && link.href && link.href.startsWith('http://')) {
      const issue = createIssue('SEO00152', page, { element: link.href })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check URL hygiene rules
 * SEO00373-00379
 */
export function checkUrlHygiene(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  for (const link of page.links) {
    if (!link.isInternal || !link.href) continue

    // SEO00374: Session IDs in URLs
    if (/[?&](sid|sessionid|phpsessid|jsessionid)=/i.test(link.href)) {
      const issue = createIssue('SEO00374', page, { element: link.href })
      if (issue) issues.push(issue)
    }

    // SEO00375-00379: Parameterized URLs
    if (/\.php\?/.test(link.href)) {
      const issue = createIssue('SEO00375', page, { element: link.href })
      if (issue) issues.push(issue)
    }
    if (/\?page=/.test(link.href)) {
      const issue = createIssue('SEO00376', page, { element: link.href })
      if (issue) issues.push(issue)
    }
    if (/\?p=/.test(link.href)) {
      const issue = createIssue('SEO00377', page, { element: link.href })
      if (issue) issues.push(issue)
    }
    if (/\?id=/.test(link.href)) {
      const issue = createIssue('SEO00378', page, { element: link.href })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check image rules
 * SEO00153-00167
 */
export function checkImages(page: PageData, config: SEOCheckerConfig, siteData: SiteData): SEOIssue[] {
  const issues: SEOIssue[] = []

  for (const img of page.images) {
    // SEO00153: Missing alt attribute
    if (img.alt === undefined) {
      const issue = createIssue('SEO00153', page, { element: img.src })
      if (issue) issues.push(issue)
    }

    // SEO00154: Empty alt attribute (might be intentional for decorative images)
    if (img.alt !== undefined && img.alt.trim() === '') {
      const issue = createIssue('SEO00154', page, { element: img.src })
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

    // SEO00156: Image src is empty
    if (img.src !== undefined && img.src.trim() === '') {
      const issue = createIssue('SEO00156', page, { element: '(empty src)' })
      if (issue) issues.push(issue)
    }

    // SEO00157: Alt text too long
    if (img.alt && img.alt.length > 125) {
      const issue = createIssue('SEO00157', page, {
        element: img.src,
        actual: `${img.alt.length} chars`,
        expected: '<= 125 chars'
      })
      if (issue) issues.push(issue)
    }

    // SEO00158: Alt text is just filename
    if (img.alt && img.src) {
      const filename = img.src.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
      if (filename && img.alt.toLowerCase().trim() === filename.toLowerCase()) {
        const issue = createIssue('SEO00158', page, { element: img.src })
        if (issue) issues.push(issue)
      }
    }

    // SEO00159: Alt text contains "image of" or "photo of"
    if (img.alt && /^(image|photo|picture|graphic) of/i.test(img.alt)) {
      const issue = createIssue('SEO00159', page, { element: img.alt.substring(0, 50) })
      if (issue) issues.push(issue)
    }

    // Check image file size
    if (img.src && !img.src.startsWith('http://') && !img.src.startsWith('https://') && !img.src.startsWith('data:')) {
      const resolvedPath = resolveToFilePath(img.src, page.relativePath, config.distPath)
      if (resolvedPath) {
        const relativePath = path.relative(config.distPath, resolvedPath)
        const imageInfo = siteData.imageFiles.get(relativePath)
        if (imageInfo) {
          const sizeKB = imageInfo.size / 1024

          // SEO00166-00167: Image > 1024KB / > 2048KB
          if (sizeKB > 2048) {
            const issue = createIssue('SEO00167', page, { element: img.src, actual: `${Math.round(sizeKB)}KB`, expected: '<= 2048KB' })
            if (issue) issues.push(issue)
          } else if (sizeKB > 1024) {
            const issue = createIssue('SEO00166', page, { element: img.src, actual: `${Math.round(sizeKB)}KB`, expected: '<= 1024KB' })
            if (issue) issues.push(issue)
          }
          // SEO00164-00165: Image > 300KB / > 500KB
          else if (sizeKB > 500) {
            const issue = createIssue('SEO00165', page, { element: img.src, actual: `${Math.round(sizeKB)}KB`, expected: '<= 500KB' })
            if (issue) issues.push(issue)
          } else if (sizeKB > 300) {
            const issue = createIssue('SEO00164', page, { element: img.src, actual: `${Math.round(sizeKB)}KB`, expected: '<= 300KB' })
            if (issue) issues.push(issue)
          }
          // SEO00160-00163: Image > 100KB / > 150KB / > 200KB
          else if (sizeKB > 200) {
            const issue = createIssue('SEO00163', page, { element: img.src, actual: `${Math.round(sizeKB)}KB`, expected: '<= 200KB' })
            if (issue) issues.push(issue)
          } else if (sizeKB > 150) {
            const issue = createIssue('SEO00162', page, { element: img.src, actual: `${Math.round(sizeKB)}KB`, expected: '<= 150KB' })
            if (issue) issues.push(issue)
          } else if (sizeKB > 100) {
            const issue = createIssue('SEO00160', page, { element: img.src, actual: `${Math.round(sizeKB)}KB`, expected: '<= 100KB' })
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
 * SEO00168-00176, SEO00371-00372
 */
export function checkSocialTags(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // OpenGraph tags
  if (!page.og.title) {
    const issue = createIssue('SEO00168', page)
    if (issue) issues.push(issue)
  }
  if (!page.og.description) {
    const issue = createIssue('SEO00169', page)
    if (issue) issues.push(issue)
  }
  if (!page.og.image) {
    const issue = createIssue('SEO00170', page)
    if (issue) issues.push(issue)
  }
  if (!page.og.url) {
    const issue = createIssue('SEO00171', page)
    if (issue) issues.push(issue)
  }

  // Twitter card
  if (!page.twitter.card) {
    const issue = createIssue('SEO00172', page)
    if (issue) issues.push(issue)
  }
  if (!page.twitter.title) {
    const issue = createIssue('SEO00173', page)
    if (issue) issues.push(issue)
  }
  if (!page.twitter.description) {
    const issue = createIssue('SEO00174', page)
    if (issue) issues.push(issue)
  }
  if (!page.twitter.image) {
    const issue = createIssue('SEO00175', page)
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

  // Check og:title length
  if (page.og.title) {
    if (page.og.title.length > 60) {
      const issue = createIssue('SEO00176', page, {
        element: page.og.title.substring(0, 50),
        actual: `${page.og.title.length} chars`,
        expected: '<= 60 chars'
      })
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check international SEO rules
 * SEO00177-00185
 */
export function checkInternationalSEO(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00182: Invalid HTML lang attribute
  if (page.htmlLang && !isValidBCP47(page.htmlLang)) {
    const issue = createIssue('SEO00182', page, { element: page.htmlLang })
    if (issue) issues.push(issue)
  }

  // SEO00183: lang attribute doesn't match content language (would need language detection)

  if (page.hreflangs.length > 0) {
    const langCodes = new Set<string>()
    let hasSelfReference = false
    let hasXDefault = false

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

      if (hreflang.lang === 'x-default') {
        hasXDefault = true
      }
    }

    // SEO00179: Missing self-reference
    if (!hasSelfReference && page.hreflangs.length > 0) {
      const issue = createIssue('SEO00179', page)
      if (issue) issues.push(issue)
    }

    // SEO00181: Missing x-default
    if (!hasXDefault && page.hreflangs.length > 1) {
      const issue = createIssue('SEO00181', page)
      if (issue) issues.push(issue)
    }
  }

  return issues
}

/**
 * Check structured data rules
 * SEO00229-00367
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

      // Check for @graph structure
      if ('@graph' in obj && Array.isArray(obj['@graph'])) {
        for (const item of obj['@graph']) {
          checkSchemaItem(item, page, issues)
        }
      } else if ('@type' in obj) {
        checkSchemaItem(obj, page, issues)
      }
    }
  }

  return issues
}

/**
 * Check a single schema.org item for required fields
 */
function checkSchemaItem(item: unknown, page: PageData, issues: SEOIssue[]): void {
  if (typeof item !== 'object' || item === null) return

  const obj = item as Record<string, unknown>
  const schemaType = obj['@type'] as string | string[] | undefined

  if (!schemaType) return

  const types = Array.isArray(schemaType) ? schemaType : [schemaType]

  for (const type of types) {
    const requiredFields = SCHEMA_REQUIRED_FIELDS[type]
    if (requiredFields) {
      for (const field of requiredFields) {
        if (!(field in obj) || obj[field] === null || obj[field] === undefined) {
          // Generate rule ID based on schema type and field
          // This maps to rules like SEO00232-SEO00367 for various schema types
          const issue = createIssue('SEO00232', page, {
            element: `${type}: missing '${field}'`,
          })
          if (issue) {
            issue.ruleName = `Schema ${type}: missing '${field}'`
            issues.push(issue)
          }
        } else if (typeof obj[field] === 'string' && (obj[field] as string).trim() === '') {
          const issue = createIssue('SEO00233', page, {
            element: `${type}: empty '${field}'`,
          })
          if (issue) {
            issue.ruleName = `Schema ${type}: empty '${field}'`
            issues.push(issue)
          }
        }
      }
    }

    // Check for BreadcrumbList specifics
    if (type === 'BreadcrumbList' && 'itemListElement' in obj) {
      const items = obj['itemListElement']
      if (!Array.isArray(items)) {
        const issue = createIssue('SEO00359', page)
        if (issue) issues.push(issue)
      } else {
        // Check each breadcrumb item has position
        for (let i = 0; i < items.length; i++) {
          const listItem = items[i] as Record<string, unknown>
          if (!listItem['position']) {
            const issue = createIssue('SEO00360', page, {
              element: `ListItem ${i + 1} missing position`,
            })
            if (issue) issues.push(issue)
          }
        }
      }
    }
  }

  // Recursively check nested objects
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('@')) continue
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        for (const v of value) {
          checkSchemaItem(v, page, issues)
        }
      } else {
        checkSchemaItem(value, page, issues)
      }
    }
  }
}

/**
 * Check content quality rules
 * SEO00186-00225
 */
export function checkContentQuality(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00186-00195: Thin content by word count thresholds
  if (page.wordCount < 50) {
    const issue = createIssue('SEO00186', page, { actual: `${page.wordCount} words`, expected: '>= 50 words' })
    if (issue) issues.push(issue)
  } else if (page.wordCount < 100) {
    const issue = createIssue('SEO00187', page, { actual: `${page.wordCount} words`, expected: '>= 100 words' })
    if (issue) issues.push(issue)
  } else if (page.wordCount < 150) {
    const issue = createIssue('SEO00188', page, { actual: `${page.wordCount} words`, expected: '>= 150 words' })
    if (issue) issues.push(issue)
  } else if (page.wordCount < 200) {
    const issue = createIssue('SEO00189', page, { actual: `${page.wordCount} words`, expected: '>= 200 words' })
    if (issue) issues.push(issue)
  } else if (page.wordCount < 300) {
    const issue = createIssue('SEO00190', page, { actual: `${page.wordCount} words`, expected: '>= 300 words' })
    if (issue) issues.push(issue)
  }

  // SEO00196-00200: Too much content (very long pages)
  if (page.wordCount > 10000) {
    const issue = createIssue('SEO00200', page, { actual: `${page.wordCount} words`, expected: '<= 10000 words' })
    if (issue) issues.push(issue)
  } else if (page.wordCount > 7500) {
    const issue = createIssue('SEO00199', page, { actual: `${page.wordCount} words`, expected: '<= 7500 words' })
    if (issue) issues.push(issue)
  } else if (page.wordCount > 5000) {
    const issue = createIssue('SEO00198', page, { actual: `${page.wordCount} words`, expected: '<= 5000 words' })
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check template hygiene rules
 * SEO00382-00397
 */
export function checkTemplateHygiene(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // Check title for placeholders
  if (page.title) {
    for (const [pattern, name, ruleId] of PLACEHOLDER_PATTERNS) {
      if (pattern.test(page.title)) {
        const issue = createIssue(ruleId, page, { element: `title: ${page.title}` })
        if (issue) {
          issue.ruleName = `${name} placeholder in title`
          issues.push(issue)
        }
      }
    }
  }

  // Check meta description for placeholders
  if (page.metaDescription) {
    for (const [pattern, name, ruleId] of PLACEHOLDER_PATTERNS) {
      if (pattern.test(page.metaDescription)) {
        const issue = createIssue(ruleId.replace('382', '383'), page, {
          element: `description: ${page.metaDescription.substring(0, 50)}`,
        })
        if (issue) {
          issue.ruleName = `${name} placeholder in meta description`
          issues.push(issue)
        }
      }
    }
  }

  // Check H1 for placeholders
  for (const h1 of page.h1s) {
    for (const [pattern, name, ruleId] of PLACEHOLDER_PATTERNS) {
      if (pattern.test(h1)) {
        const issue = createIssue(ruleId.replace('382', '384'), page, {
          element: `h1: ${h1.substring(0, 50)}`,
        })
        if (issue) {
          issue.ruleName = `${name} placeholder in H1`
          issues.push(issue)
        }
      }
    }
  }

  // Check body text for common placeholders
  const bodyText = page.html.replace(/<[^>]+>/g, ' ').substring(0, 10000)
  if (/lorem ipsum/i.test(bodyText)) {
    const issue = createIssue('SEO00385', page)
    if (issue) issues.push(issue)
  }
  if (/\bTODO\b/.test(bodyText)) {
    const issue = createIssue('SEO00389', page)
    if (issue) issues.push(issue)
  }
  if (/\bFIXME\b/.test(bodyText)) {
    const issue = createIssue('SEO00393', page)
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check accessibility rules
 * SEO00222-00225, SEO00398-00412
 */
export function checkAccessibility(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00222: Missing main landmark
  if (!page.hasMainLandmark) {
    const issue = createIssue('SEO00222', page)
    if (issue) issues.push(issue)
  }

  // SEO00223: Skip link missing (check for skip-to-content or skip-nav)
  if (!page.html.includes('skip-to-') && !page.html.includes('skip-nav') && !page.html.includes('skipnav')) {
    const issue = createIssue('SEO00223', page)
    if (issue) issues.push(issue)
  }

  // SEO00410: Empty aria-label
  const emptyAriaLabels = page.html.match(/aria-label=["']\s*["']/gi)
  if (emptyAriaLabels && emptyAriaLabels.length > 0) {
    const issue = createIssue('SEO00410', page, { actual: `${emptyAriaLabels.length} empty aria-labels` })
    if (issue) issues.push(issue)
  }

  // SEO00412: role="img" without aria-label
  const imgRoles = page.html.match(/role=["']img["'][^>]*>/gi) || []
  for (const imgRole of imgRoles) {
    if (!imgRole.includes('aria-label') && !imgRole.includes('aria-labelledby')) {
      const issue = createIssue('SEO00412', page)
      if (issue) issues.push(issue)
      break // Only report once per page
    }
  }

  return issues
}

/**
 * Check HTML semantics
 * SEO00416-00429
 */
export function checkHtmlSemantics(page: PageData, config: SEOCheckerConfig): SEOIssue[] {
  const issues: SEOIssue[] = []

  // SEO00416: Using <b> instead of <strong>
  if (/<b[^>]*>/.test(page.html) && !/<strong[^>]*>/.test(page.html)) {
    const issue = createIssue('SEO00416', page)
    if (issue) issues.push(issue)
  }

  // SEO00417: Using <i> instead of <em>
  if (/<i[^>]*>/.test(page.html) && !/<em[^>]*>/.test(page.html)) {
    const issue = createIssue('SEO00417', page)
    if (issue) issues.push(issue)
  }

  // SEO00418: Using deprecated tags
  const deprecatedTags = ['<font', '<center', '<marquee', '<blink', '<strike', '<big', '<tt']
  for (const tag of deprecatedTags) {
    if (page.html.toLowerCase().includes(tag)) {
      const issue = createIssue('SEO00418', page, { element: tag })
      if (issue) issues.push(issue)
    }
  }

  // SEO00419: Tables used for layout (tables without proper headers)
  const tableMatches = page.html.match(/<table[^>]*>[\s\S]*?<\/table>/gi) || []
  for (const table of tableMatches) {
    if (!/<th[^>]*>/i.test(table)) {
      const issue = createIssue('SEO00419', page)
      if (issue) issues.push(issue)
      break
    }
  }

  // SEO00420: Inline styles used excessively
  const inlineStyleCount = (page.html.match(/style=["'][^"']+["']/gi) || []).length
  if (inlineStyleCount > 50) {
    const issue = createIssue('SEO00420', page, { actual: `${inlineStyleCount} inline styles` })
    if (issue) issues.push(issue)
  }

  return issues
}

/**
 * Check site-wide duplicate rules
 * SEO00088-00099
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
          relativePath: pages.slice(0, 3).join(', ') + (pages.length > 3 ? ` (+${pages.length - 3} more)` : ''),
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
          relativePath: pages.slice(0, 3).join(', ') + (pages.length > 3 ? ` (+${pages.length - 3} more)` : ''),
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
          relativePath: pages.slice(0, 3).join(', ') + (pages.length > 3 ? ` (+${pages.length - 3} more)` : ''),
          element: h1.substring(0, 50),
          actual: `${pages.length} pages`,
          fixHint: rule.fixHint,
          fingerprint: `SEO00092::${h1.substring(0, 50)}`,
        })
      }
    }
  }

  // SEO00094: Duplicate canonicals
  for (const [canonical, pages] of siteData.canonicals) {
    if (pages.length > 1) {
      // Check if these are language variants
      const isLanguageVariant = pages.every((p) => {
        const langMatch = p.match(/^([a-z]{2}(-[A-Z]{2})?)\//i)
        return langMatch !== null
      })

      if (!isLanguageVariant || pages.length > config.languages.length) {
        const rule = getRule('SEO00094')
        if (rule) {
          issues.push({
            ruleId: 'SEO00094',
            ruleName: rule.name,
            category: rule.category,
            severity: rule.severity,
            file: '',
            relativePath: pages.slice(0, 3).join(', ') + (pages.length > 3 ? ` (+${pages.length - 3} more)` : ''),
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
  // Basic BCP47 pattern: 2-3 letter language, optional region
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
  allIssues.push(...checkUrlHygiene(page, config))
  allIssues.push(...checkImages(page, config, siteData))
  allIssues.push(...checkSocialTags(page, config))
  allIssues.push(...checkInternationalSEO(page, config))
  allIssues.push(...checkStructuredData(page, config))
  allIssues.push(...checkContentQuality(page, config))
  allIssues.push(...checkTemplateHygiene(page, config))
  allIssues.push(...checkAccessibility(page, config))
  allIssues.push(...checkHtmlSemantics(page, config))

  return allIssues
}
