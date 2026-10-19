export const BLOG_TAGS = [
  'Development',
  'Mobile',
  'Updates',
  'Security',
  'Tutorial',
  'Technology',
  'CI/CD',
  'Alternatives',
  'App Store',
  'Solution',
  'Best Practices',
  'Capacitor',
  'Migration',
  'Story',
  'IAP',
  'Android',
  'Product',
  'News',
  'Open Source',
  'Marketing',
  'ASO',
  'Guides',
  'Monetization',
  'Case Study',
  'Company',
  'Configuration',
  'DeepLinking',
  'Optimisation',
  'Web Development',
  'Cloud',
  'iOS',
  'Google Play',
] as const

export type BlogTag = (typeof BLOG_TAGS)[number]

const BLOG_TAG_SET = new Set<string>(BLOG_TAGS)

const TAG_ALIASES: Record<string, BlogTag> = {
  development: 'Development',
  mobile: 'Mobile',
  updates: 'Updates',
  security: 'Security',
  tutorial: 'Tutorial',
  technology: 'Technology',
  'ci/cd': 'CI/CD',
  alternatives: 'Alternatives',
  'app store': 'App Store',
  solution: 'Solution',
  'best practices': 'Best Practices',
  capacitor: 'Capacitor',
  migration: 'Migration',
  story: 'Story',
  iap: 'IAP',
  android: 'Android',
  product: 'Product',
  news: 'News',
  'open source': 'Open Source',
  marketing: 'Marketing',
  aso: 'ASO',
  guides: 'Guides',
  monetization: 'Monetization',
  'case study': 'Case Study',
  company: 'Company',
  configuration: 'Configuration',
  deeplinking: 'DeepLinking',
  optimisation: 'Optimisation',
  optimization: 'Optimisation',
  'web development': 'Web Development',
  cloud: 'Cloud',
  ios: 'iOS',
  'google play': 'Google Play',
  cordova: 'Capacitor',
  'cross-platform': 'Mobile',
  capacitorjs: 'Capacitor',
  electronjs: 'Technology',
  jest: 'Development',
  'react native': 'Mobile',
  expo: 'Mobile',
  devops: 'CI/CD',
  'mobile development': 'Development',
  'mobile app development': 'Development',
  'cross-platform apps': 'Mobile',
  'live updates': 'Updates',
  'ci/cd automation': 'CI/CD',
  'ci/cd pipeline': 'CI/CD',
}

const INFERENCE_RULES: Array<[RegExp, BlogTag]> = [
  [/\bsecurity\b|privacy|gdpr|soc.?2|encrypt|compliance|audit|data privacy|webhook security/, 'Security'],
  [/\bci\/?cd\b|devops|continuous deployment|pipeline|automated testing/, 'CI/CD'],
  [/\blive update|ota\b|app update|over.the.air/, 'Updates'],
  [/\bapp store|review management|submission/, 'App Store'],
  [/\bgoogle play\b/, 'Google Play'],
  [/\bandroid\b/, 'Android'],
  [/\biphone\b|\bios\b/, 'iOS'],
  [/\btutorial\b|how to|step.by.step/, 'Tutorial'],
  [/\bguide\b/, 'Guides'],
  [/\bcapacitor|capgo|cordova|ionic/, 'Capacitor'],
  [/\bopen source\b/, 'Open Source'],
  [/\bproduct\b|retention|analytics|metrics|saas|user adoption/, 'Product'],
  [/\barchitecture|microservice|monolithic|edge network|edge computing/, 'Technology'],
  [/\bperformance|latency|optimization|optimisation/, 'Best Practices'],
  [/\bmarketing\b|\baso\b/, 'Marketing'],
  [/\balternatives\b|\bvs\b|compare/, 'Alternatives'],
  [/\bcloud\b/, 'Cloud'],
  [/\bweb development\b|node\.js|yarn/, 'Web Development'],
  [/\bquality assurance\b|\bqa\b|software testing|unit test/, 'Tutorial'],
  [/\bmigration\b/, 'Migration'],
  [/\bmonetization\b|\biap\b/, 'Monetization'],
  [/\bstory\b|case study/, 'Story'],
  [/\bconfiguration\b/, 'Configuration'],
  [/\bsolution\b/, 'Solution'],
  [/\bnews\b/, 'News'],
  [/\bcompany\b/, 'Company'],
]

export function isCanonicalBlogTag(tag: string): tag is BlogTag {
  return BLOG_TAG_SET.has(tag)
}

export function normalizeBlogTag(tag: string): BlogTag | null {
  const trimmed = tag.trim()
  if (!trimmed) return null
  if (isCanonicalBlogTag(trimmed)) return trimmed
  return TAG_ALIASES[trimmed.toLowerCase()] ?? null
}

export function inferBlogTags(title: string, keywords = ''): BlogTag[] {
  const text = `${title} ${keywords}`.toLowerCase()
  const tags = new Set<BlogTag>()

  for (const [pattern, tag] of INFERENCE_RULES) {
    if (pattern.test(text)) tags.add(tag)
  }

  if (tags.size === 0) tags.add('Development')

  tags.add('Mobile')

  return BLOG_TAGS.filter((tag) => tags.has(tag)).slice(0, 3)
}

export function normalizeBlogTags(rawTags: string[], title = '', keywords = ''): string {
  const raw = rawTags.map((tag) => tag.trim()).filter(Boolean)
  if (raw.length === 0) return inferBlogTags(title, keywords).join(', ')

  const hadNonCanonical = raw.some((tag) => normalizeBlogTag(tag) === null)

  if (hadNonCanonical) {
    const inferred = inferBlogTags(title, keywords)
    const tagCount = raw.length >= 3 ? 3 : Math.max(raw.length, 1)
    return inferred.slice(0, tagCount).join(', ')
  }

  const result: BlogTag[] = []
  for (const tag of raw) {
    const normalized = normalizeBlogTag(tag)
    if (normalized && !result.includes(normalized)) result.push(normalized)
  }

  return result.join(', ')
}
