/**
 * SEO Rules Definition
 * Based on the comprehensive SEO static analysis rules
 */

import type { SEORule } from './types'

export const SEO_RULES: SEORule[] = [
  // ============================================
  // METADATA RULES
  // ============================================
  {
    id: 'SEO00001',
    category: 'Metadata',
    name: 'Missing or empty HTML <title>',
    scope: 'page',
    severity: 'error',
    fixHint: 'Add a non-empty HTML <title>.',
    tags: ['presence'],
  },
  {
    id: 'SEO00002',
    category: 'Metadata',
    name: "Missing or empty <meta name='description'>",
    scope: 'page',
    severity: 'error',
    fixHint: "Add a non-empty <meta name='description'>.",
    tags: ['presence'],
  },
  {
    id: 'SEO00004',
    category: 'Metadata',
    name: "Missing <link rel='canonical'>",
    scope: 'page',
    severity: 'error',
    fixHint: "Add <link rel='canonical'> to the page head.",
    tags: ['presence'],
  },
  {
    id: 'SEO00005',
    category: 'Metadata',
    name: 'Missing <meta charset>',
    scope: 'page',
    severity: 'error',
    fixHint: 'Add <meta charset> to the page head.',
    tags: ['presence'],
  },
  {
    id: 'SEO00006',
    category: 'Metadata',
    name: 'Missing <html lang>',
    scope: 'page',
    severity: 'error',
    fixHint: 'Add lang attribute to <html>.',
    tags: ['presence'],
  },
  {
    id: 'SEO00413',
    category: 'Metadata',
    name: "Missing <meta name='viewport'>",
    scope: 'page',
    severity: 'warning',
    fixHint: "Add <meta name='viewport'> for mobile responsiveness.",
    tags: ['presence'],
  },

  // ============================================
  // HTML VALIDITY RULES
  // ============================================
  {
    id: 'SEO00007',
    category: 'HTML Validity',
    name: 'Multiple <title> tags',
    scope: 'page',
    severity: 'error',
    fixHint: 'Keep only one <title> and remove duplicates.',
    tags: ['validity'],
  },
  {
    id: 'SEO00008',
    category: 'HTML Validity',
    name: 'Multiple meta description tags',
    scope: 'page',
    severity: 'error',
    fixHint: 'Keep only one meta description and remove duplicates.',
    tags: ['validity'],
  },
  {
    id: 'SEO00009',
    category: 'HTML Validity',
    name: 'Multiple canonical tags',
    scope: 'page',
    severity: 'error',
    fixHint: 'Keep only one canonical and remove duplicates.',
    tags: ['validity'],
  },
  {
    id: 'SEO00226',
    category: 'HTML Validity',
    name: 'Missing <!doctype html>',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Add <!doctype html> to avoid quirks mode.',
    tags: ['validity'],
  },
  {
    id: 'SEO00380',
    category: 'HTML Validity',
    name: 'Duplicate id attributes in DOM',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Ensure each id attribute is unique.',
    tags: ['validity'],
  },

  // ============================================
  // CONTENT - TEXT LENGTH RULES
  // ============================================
  {
    id: 'SEO00013',
    category: 'Content - Text',
    name: 'HTML <title> too short (<10 chars)',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Expand HTML <title> to be more descriptive.',
    tags: ['length'],
    threshold: 10,
  },
  {
    id: 'SEO00020',
    category: 'Content - Text',
    name: 'HTML <title> too long (>60 chars)',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Shorten HTML <title> to reduce truncation risk.',
    tags: ['length'],
    threshold: 60,
  },
  {
    id: 'SEO00023',
    category: 'Content - Text',
    name: "<meta name='description'> too short (<50 chars)",
    scope: 'page',
    severity: 'warning',
    fixHint: 'Expand meta description to be more descriptive.',
    tags: ['length'],
    threshold: 50,
  },
  {
    id: 'SEO00027',
    category: 'Content - Text',
    name: "<meta name='description'> too long (>160 chars)",
    scope: 'page',
    severity: 'warning',
    fixHint: 'Shorten meta description to reduce truncation risk.',
    tags: ['length'],
    threshold: 160,
  },
  {
    id: 'SEO00030',
    category: 'Content - Text',
    name: '<h1> too short (<5 chars)',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Expand <h1> to be more descriptive.',
    tags: ['length'],
    threshold: 5,
  },
  {
    id: 'SEO00034',
    category: 'Content - Text',
    name: '<h1> too long (>80 chars)',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Shorten <h1> to reduce truncation risk.',
    tags: ['length'],
    threshold: 80,
  },

  // ============================================
  // CONTENT FORMAT RULES
  // ============================================
  {
    id: 'SEO00056',
    category: 'Content - Text',
    name: 'HTML <title> has leading/trailing whitespace',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Trim whitespace in HTML <title>.',
    tags: ['format'],
  },
  {
    id: 'SEO00057',
    category: 'Content - Text',
    name: 'HTML <title> has repeated spaces',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Normalize spacing in HTML <title>.',
    tags: ['format'],
  },
  {
    id: 'SEO00059',
    category: 'Content - Text',
    name: 'HTML <title> contains mojibake/encoding artifacts',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Fix encoding to UTF-8; re-save content and templates.',
    tags: ['encoding'],
  },
  {
    id: 'SEO00060',
    category: 'Content - Text',
    name: 'Meta description has leading/trailing whitespace',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Trim whitespace in meta description.',
    tags: ['format'],
  },
  {
    id: 'SEO00063',
    category: 'Content - Text',
    name: 'Meta description contains mojibake/encoding artifacts',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Fix encoding to UTF-8; re-save content and templates.',
    tags: ['encoding'],
  },

  // ============================================
  // HEADING RULES
  // ============================================
  {
    id: 'SEO00109',
    category: 'Headings',
    name: 'Missing H1',
    scope: 'page',
    severity: 'error',
    fixHint: 'Add exactly one descriptive H1 per page.',
    tags: ['headings'],
  },
  {
    id: 'SEO00110',
    category: 'Headings',
    name: 'Multiple H1',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Reduce to a single H1 where possible.',
    tags: ['headings'],
  },
  {
    id: 'SEO00111',
    category: 'Headings',
    name: 'Heading level skip',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Use a logical heading hierarchy (H1 -> H2 -> H3...).',
    tags: ['headings'],
  },
  {
    id: 'SEO00125',
    category: 'Headings',
    name: 'Duplicate H1 text within page',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Ensure repeated H1 headings are intentional.',
    tags: ['headings'],
  },

  // ============================================
  // INDEXABILITY RULES
  // ============================================
  {
    id: 'SEO00100',
    category: 'Indexability',
    name: 'Canonical is relative URL',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Prefer absolute canonical URLs to avoid ambiguity.',
    tags: ['canonical'],
  },
  {
    id: 'SEO00101',
    category: 'Indexability',
    name: 'Canonical contains URL fragment (#)',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Remove fragment identifiers from canonical.',
    tags: ['canonical'],
  },
  {
    id: 'SEO00102',
    category: 'Indexability',
    name: 'Canonical contains tracking parameters',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Canonical should be a clean URL without tracking parameters.',
    tags: ['canonical'],
  },
  {
    id: 'SEO00104',
    category: 'Indexability',
    name: 'Conflicting canonicals (multiple different canonical hrefs)',
    scope: 'page',
    severity: 'error',
    fixHint: 'Keep one canonical URL.',
    tags: ['canonical'],
  },
  {
    id: 'SEO00105',
    category: 'Indexability',
    name: 'Robots meta has conflicting directives',
    scope: 'page',
    severity: 'error',
    fixHint: 'Remove conflicting directives; keep one clear instruction.',
    tags: ['robots'],
  },

  // ============================================
  // LINK RULES
  // ============================================
  {
    id: 'SEO00134',
    category: 'Links',
    name: 'Empty href attribute',
    scope: 'page',
    severity: 'error',
    fixHint: 'Remove or fix empty links; ensure all anchors have valid href.',
    tags: ['links'],
  },
  {
    id: 'SEO00135',
    category: 'Links',
    name: 'Anchor text missing/empty',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Provide meaningful anchor text or accessible label.',
    tags: ['links'],
  },
  {
    id: 'SEO00136',
    category: 'Links',
    name: "Generic anchor text 'click here'",
    scope: 'page',
    severity: 'notice',
    fixHint: 'Replace with descriptive anchor text.',
    tags: ['links'],
  },
  {
    id: 'SEO00137',
    category: 'Links',
    name: "Generic anchor text 'read more'",
    scope: 'page',
    severity: 'notice',
    fixHint: 'Replace with descriptive anchor text.',
    tags: ['links'],
  },
  {
    id: 'SEO00143',
    category: 'Links',
    name: 'Internal link uses rel=nofollow',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Avoid nofollow on internal links unless you have a specific reason.',
    tags: ['links'],
  },
  {
    id: 'SEO00144',
    category: 'Links',
    name: 'External link with target=_blank missing rel=noopener',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Add rel="noopener" to target=_blank external links.',
    tags: ['security', 'links'],
  },
  {
    id: 'SEO00147',
    category: 'Links',
    name: 'Broken relative link (target file not found)',
    scope: 'page',
    severity: 'error',
    fixHint: 'Fix the path or create the target page/file.',
    tags: ['links'],
  },

  // ============================================
  // URL HYGIENE RULES
  // ============================================
  {
    id: 'SEO00148',
    category: 'URL Hygiene',
    name: 'Link URL has double slash in path',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Normalize URLs; avoid problematic characters.',
    tags: ['url'],
  },
  {
    id: 'SEO00152',
    category: 'Security/HTTPS',
    name: 'HTTPS-intended page links to http:// resources',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Use https:// URLs for internal and third-party resources.',
    tags: ['mixed-content'],
  },

  // ============================================
  // IMAGE RULES
  // ============================================
  {
    id: 'SEO00153',
    category: 'Images',
    name: 'Image missing alt attribute',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Add informative alt text (or empty alt for decorative images).',
    tags: ['a11y', 'seo'],
  },
  {
    id: 'SEO00155',
    category: 'Images',
    name: 'Broken image reference (file not found)',
    scope: 'page',
    severity: 'error',
    fixHint: 'Fix src path or add the referenced image file.',
    tags: ['images'],
  },
  {
    id: 'SEO00160',
    category: 'Images',
    name: 'Image file size > 100KB',
    scope: 'image',
    severity: 'notice',
    fixHint: 'Compress/resize images where it does not hurt quality.',
    tags: ['images', 'filesize'],
    threshold: 100,
  },
  {
    id: 'SEO00164',
    category: 'Images',
    name: 'Image file size > 300KB',
    scope: 'image',
    severity: 'warning',
    fixHint: 'Compress/resize images where it does not hurt quality.',
    tags: ['images', 'filesize'],
    threshold: 300,
  },
  {
    id: 'SEO00166',
    category: 'Images',
    name: 'Image file size > 1024KB (1MB)',
    scope: 'image',
    severity: 'warning',
    fixHint: 'Compress/resize images where it does not hurt quality.',
    tags: ['images', 'filesize'],
    threshold: 1024,
  },

  // ============================================
  // SOCIAL TAGS RULES
  // ============================================
  {
    id: 'SEO00168',
    category: 'Social Tags',
    name: 'Missing og:title',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add og:title for richer social previews.',
    tags: ['social'],
  },
  {
    id: 'SEO00169',
    category: 'Social Tags',
    name: 'Missing og:description',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add og:description for richer social previews.',
    tags: ['social'],
  },
  {
    id: 'SEO00170',
    category: 'Social Tags',
    name: 'Missing og:image',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add og:image for richer social previews.',
    tags: ['social'],
  },
  {
    id: 'SEO00171',
    category: 'Social Tags',
    name: 'Missing og:url',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add og:url for richer social previews.',
    tags: ['social'],
  },
  {
    id: 'SEO00172',
    category: 'Social Tags',
    name: 'Missing twitter:card',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add twitter:card for richer social previews.',
    tags: ['social'],
  },
  {
    id: 'SEO00371',
    category: 'Social Tags',
    name: 'og:image is relative (prefer absolute)',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Use absolute og:image URL.',
    tags: ['social'],
  },
  {
    id: 'SEO00372',
    category: 'Social Tags',
    name: 'og:image points to missing local file',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Fix og:image path or add the image file.',
    tags: ['social', 'images'],
  },

  // ============================================
  // INTERNATIONAL SEO RULES
  // ============================================
  {
    id: 'SEO00177',
    category: 'International SEO',
    name: 'hreflang has invalid language-region code',
    scope: 'page',
    severity: 'error',
    fixHint: 'Use valid BCP47 language (and optional region) codes.',
    tags: ['hreflang'],
  },
  {
    id: 'SEO00178',
    category: 'International SEO',
    name: 'hreflang has duplicate language codes',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Ensure one URL per language/region pair.',
    tags: ['hreflang'],
  },
  {
    id: 'SEO00179',
    category: 'International SEO',
    name: 'hreflang missing self-referencing annotation',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Include a self-referencing hreflang tag for each page.',
    tags: ['hreflang'],
  },
  {
    id: 'SEO00180',
    category: 'International SEO',
    name: 'hreflang URLs are relative',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Prefer absolute URLs in hreflang annotations.',
    tags: ['hreflang'],
  },
  {
    id: 'SEO00182',
    category: 'International SEO',
    name: 'HTML lang attribute invalid (not BCP47)',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Use a valid BCP47 language code in <html lang>.',
    tags: ['lang'],
  },

  // ============================================
  // STRUCTURED DATA RULES
  // ============================================
  {
    id: 'SEO00229',
    category: 'Structured Data',
    name: 'JSON-LD script contains invalid JSON',
    scope: 'page',
    severity: 'error',
    fixHint: 'Fix JSON syntax; validate with a structured data validator.',
    tags: ['schema', 'jsonld'],
  },
  {
    id: 'SEO00230',
    category: 'Structured Data',
    name: 'JSON-LD missing @context',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Add @context (usually https://schema.org).',
    tags: ['schema'],
  },
  {
    id: 'SEO00231',
    category: 'Structured Data',
    name: 'JSON-LD missing @type',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Add @type to each JSON-LD node.',
    tags: ['schema'],
  },

  // ============================================
  // CONTENT QUALITY RULES
  // ============================================
  {
    id: 'SEO00186',
    category: 'Content Quality',
    name: 'Thin content (word count < 50)',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add helpful, unique content (if the page is meant to rank).',
    tags: ['content'],
    threshold: 50,
  },
  {
    id: 'SEO00189',
    category: 'Content Quality',
    name: 'Thin content (word count < 200)',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add helpful, unique content (if the page is meant to rank).',
    tags: ['content'],
    threshold: 200,
  },

  // ============================================
  // TEMPLATE HYGIENE RULES
  // ============================================
  {
    id: 'SEO00382',
    category: 'Template Hygiene',
    name: 'Lorem ipsum placeholder text found in title',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Replace placeholder text before publishing.',
    tags: ['templates'],
  },
  {
    id: 'SEO00383',
    category: 'Template Hygiene',
    name: 'Lorem ipsum placeholder text found in meta description',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Replace placeholder text before publishing.',
    tags: ['templates'],
  },
  {
    id: 'SEO00384',
    category: 'Template Hygiene',
    name: 'Lorem ipsum placeholder text found in h1',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Replace placeholder text before publishing.',
    tags: ['templates'],
  },
  {
    id: 'SEO00386',
    category: 'Template Hygiene',
    name: 'TODO placeholder text found in title',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Replace placeholder text before publishing.',
    tags: ['templates'],
  },
  {
    id: 'SEO00390',
    category: 'Template Hygiene',
    name: 'FIXME placeholder text found',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Replace placeholder text before publishing.',
    tags: ['templates'],
  },

  // ============================================
  // ACCESSIBILITY RULES
  // ============================================
  {
    id: 'SEO00222',
    category: 'Accessibility',
    name: 'Missing <main> landmark',
    scope: 'page',
    severity: 'notice',
    fixHint: 'Add a <main> landmark to help assistive tech.',
    tags: ['a11y'],
  },
  {
    id: 'SEO00223',
    category: 'Accessibility',
    name: 'Links are not distinguishable (no text and no aria-label)',
    scope: 'page',
    severity: 'warning',
    fixHint: 'Add accessible name (text, aria-label, or title).',
    tags: ['a11y', 'links'],
  },

  // ============================================
  // DUPLICATE RULES (site-wide)
  // ============================================
  {
    id: 'SEO00088',
    category: 'Duplicates',
    name: 'Duplicate HTML <title> across pages',
    scope: 'site',
    severity: 'warning',
    fixHint: 'Make HTML <title> unique per page where practical.',
    tags: ['dup'],
  },
  {
    id: 'SEO00090',
    category: 'Duplicates',
    name: 'Duplicate <meta description> across pages',
    scope: 'site',
    severity: 'warning',
    fixHint: 'Make meta description unique per page where practical.',
    tags: ['dup'],
  },
  {
    id: 'SEO00092',
    category: 'Duplicates',
    name: 'Duplicate <h1> across pages',
    scope: 'site',
    severity: 'warning',
    fixHint: 'Make H1 unique per page where practical.',
    tags: ['dup'],
  },
  {
    id: 'SEO00094',
    category: 'Duplicates',
    name: 'Duplicate canonical across pages',
    scope: 'site',
    severity: 'warning',
    fixHint: 'Make canonical unique per page where practical.',
    tags: ['dup'],
  },
]

export const RULE_MAP = new Map(SEO_RULES.map((rule) => [rule.id, rule]))

export function getRule(id: string): SEORule | undefined {
  return RULE_MAP.get(id)
}
