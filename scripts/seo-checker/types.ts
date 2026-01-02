/**
 * SEO Checker Types
 * Static SEO analysis for the dist folder
 */

export type Severity = 'error' | 'warning' | 'notice'

export type RuleScope = 'page' | 'site' | 'image' | 'link'

export interface SEORule {
  id: string
  category: string
  name: string
  scope: RuleScope
  severity: Severity
  fixHint: string
  tags: string[]
  threshold?: number | string
}

export interface SEOIssue {
  ruleId: string
  ruleName: string
  category: string
  severity: Severity
  file: string
  /** Relative path from dist folder */
  relativePath: string
  /** Line number if applicable */
  line?: number
  /** Element or context that caused the issue */
  element?: string
  /** Actual value found */
  actual?: string
  /** Expected value or threshold */
  expected?: string
  /** Fix suggestion */
  fixHint: string
  /** Unique fingerprint for exclusion matching */
  fingerprint: string
}

export interface ExclusionRule {
  /** Rule ID to exclude (e.g., SEO00001) */
  ruleId?: string
  /** File path pattern (glob) to exclude */
  filePath?: string
  /** Exact fingerprint to exclude (most specific) */
  fingerprint?: string
  /** Element content pattern to match */
  elementPattern?: string
  /** Reason for exclusion (required for documentation) */
  reason: string
}

export interface SEOCheckerConfig {
  /** Path to the dist folder */
  distPath: string
  /** Base URL for the site */
  baseUrl: string
  /** List of supported languages */
  languages: string[]
  /** Default language */
  defaultLanguage: string
  /** Rules to enable/disable by ID or category */
  rules?: {
    /** Disable specific rules by ID */
    disabled?: string[]
    /** Override severity for specific rules */
    severityOverrides?: Record<string, Severity>
    /** Override thresholds for specific rules */
    thresholdOverrides?: Record<string, number>
  }
  /** Exclusion rules */
  exclusions?: ExclusionRule[]
  /** Exit with error on these severities */
  failOn?: Severity[]
  /** Maximum issues to report before stopping */
  maxIssues?: number
  /** Output format */
  outputFormat?: 'console' | 'json' | 'sarif'
  /** Path to output report file */
  reportPath?: string
}

export interface PageData {
  filePath: string
  relativePath: string
  url: string
  html: string
  /** Title tag content */
  title?: string
  /** Meta description content */
  metaDescription?: string
  /** Meta robots content */
  metaRobots?: string
  /** Canonical URL */
  canonical?: string
  /** HTML lang attribute */
  htmlLang?: string
  /** Meta charset */
  charset?: string
  /** H1 elements */
  h1s: string[]
  /** H2 elements */
  h2s: string[]
  /** H3 elements */
  h3s: string[]
  /** H4 elements */
  h4s: string[]
  /** H5 elements */
  h5s: string[]
  /** H6 elements */
  h6s: string[]
  /** All headings in order */
  headingOrder: { level: number; text: string; line?: number }[]
  /** OpenGraph tags */
  og: {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: string
  }
  /** Twitter card tags */
  twitter: {
    card?: string
    title?: string
    description?: string
    image?: string
  }
  /** Hreflang links */
  hreflangs: { lang: string; url: string }[]
  /** All links on page */
  links: {
    href: string
    text: string
    rel?: string
    target?: string
    isInternal: boolean
    isExternal: boolean
    line?: number
  }[]
  /** All images on page */
  images: {
    src: string
    alt?: string
    width?: string
    height?: string
    line?: number
  }[]
  /** JSON-LD structured data */
  jsonLd: unknown[]
  /** Main content word count */
  wordCount: number
  /** Has DOCTYPE */
  hasDoctype: boolean
  /** Has main landmark */
  hasMainLandmark: boolean
  /** Meta viewport */
  viewport?: string
  /** All element IDs for duplicate check */
  elementIds: string[]
}

export interface SiteData {
  pages: Map<string, PageData>
  /** All titles for duplicate detection */
  titles: Map<string, string[]>
  /** All descriptions for duplicate detection */
  descriptions: Map<string, string[]>
  /** All H1s for duplicate detection */
  h1s: Map<string, string[]>
  /** All canonicals for duplicate detection */
  canonicals: Map<string, string[]>
  /** All image files in the dist */
  imageFiles: Map<string, { path: string; size: number }>
}

export interface CheckResult {
  issues: SEOIssue[]
  stats: {
    totalPages: number
    totalImages: number
    totalLinks: number
    issuesByCategory: Record<string, number>
    issuesBySeverity: Record<Severity, number>
    issuesByRule: Record<string, number>
  }
  excludedCount: number
  duration: number
}
