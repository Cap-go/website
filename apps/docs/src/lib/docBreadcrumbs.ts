import { pluginNames } from '../config/sidebar.mjs'
import { defaultLocale, locales } from '../services/locale'

export type DocBreadcrumb = { name: string; url: string }

const SECTION_LABELS: Record<string, string> = {
  ai: 'AI',
  builder: 'Builder',
  cli: 'CLI',
  faq: 'FAQ',
  'getting-started': 'Getting started',
  'live-updates': 'Live updates',
  plugins: 'Plugins',
  'public-api': 'Public API',
  upgrade: 'Upgrade',
  webapp: 'Web app',
  contributing: 'Contributing',
}

/** Canonical section hubs that return 200 (not bare `/docs/{section}/` when that path 404s). */
const SECTION_LANDING: Record<string, string> = {
  'getting-started': '/docs/getting-started/quickstart/',
  cli: '/docs/cli/',
  ai: '/docs/ai/mcp/',
  builder: '/docs/builder/',
  'live-updates': '/docs/live-updates/',
  'public-api': '/docs/public-api/',
  plugins: '/docs/plugins/',
  webapp: '/docs/webapp/',
  upgrade: '/docs/upgrade/from-v7-to-v8/',
  contributing: '/docs/contributing/adding-plugins/',
  faq: '/docs/faq/',
  'how-to': '/docs/how-to/',
  versioning: '/docs/versioning/',
}

const formatSegment = (segment: string) =>
  SECTION_LABELS[segment] ??
  segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const withTrailingSlash = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`)

const pathsEqual = (a: string, b: string) => withTrailingSlash(a) === withTrailingSlash(b)

export const stripLocalePath = (pathname: string): string => {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1) || '/'
  }
  return pathname || '/'
}

const toLocalizedUrl = (path: string, siteOrigin: string, locale: string) => {
  const withSlash = withTrailingSlash(path)
  if (locale === defaultLocale) return new URL(withSlash, siteOrigin).href
  const localizedPath = withSlash === '/' ? `/${locale}/` : `/${locale}${withSlash}`
  return new URL(localizedPath, siteOrigin).href
}

/** Drop leading emoji/symbols so crumbs match visible titles without MDX icons. */
export function stripTitleDecorations(title: string): string {
  return title
    .replace(/^\s*[\p{Extended_Pictographic}\u{FE0F}\u{200D}]+\s*/u, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildDocBreadcrumbs(
  pathname: string,
  pageTitle: string,
  siteOrigin: string,
  locale: string = defaultLocale,
): DocBreadcrumb[] {
  const normalizedPath = withTrailingSlash(stripLocalePath(pathname.split('#')[0].split('?')[0]))
  const segments = normalizedPath.replace(/\/$/, '').split('/').filter(Boolean)
  if (segments[0] !== 'docs' || segments.length < 2) return []

  const pageUrl = toLocalizedUrl(normalizedPath, siteOrigin, locale)
  const displayTitle = stripTitleDecorations(pageTitle) || pageTitle
  const home: DocBreadcrumb = {
    name: 'Home',
    url: toLocalizedUrl('/', siteOrigin, locale),
  }

  const pluginMatch = normalizedPath.match(/^\/docs\/plugins\/([^/]+)\//)
  if (pluginMatch) {
    const slug = pluginMatch[1]
    const pluginIndexPath = withTrailingSlash(`/docs/plugins/${slug}/`)
    const sectionUrl = toLocalizedUrl(pluginIndexPath, siteOrigin, locale)
    const sectionName = pluginNames.get(slug) ?? formatSegment(slug)
    const crumbs: DocBreadcrumb[] = [home]
    if (!pathsEqual(normalizedPath, pluginIndexPath)) {
      crumbs.push({ name: sectionName, url: sectionUrl })
    }
    crumbs.push({ name: displayTitle, url: pageUrl })
    return crumbs
  }

  const sectionKey = segments[1]
  const sectionPath = SECTION_LANDING[sectionKey] ?? withTrailingSlash(`/docs/${sectionKey}`)
  const sectionUrl = toLocalizedUrl(sectionPath, siteOrigin, locale)
  const crumbs: DocBreadcrumb[] = [home]
  if (!pathsEqual(normalizedPath, sectionPath)) {
    crumbs.push({
      name: formatSegment(sectionKey),
      url: sectionUrl,
    })
  }
  crumbs.push({ name: displayTitle, url: pageUrl })
  return crumbs
}

export function createDocBreadcrumbLdJson(pageUrl: string, breadcrumbs: DocBreadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}