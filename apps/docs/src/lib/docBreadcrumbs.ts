import { pluginNames } from '../config/sidebar.mjs'

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
}

const formatSegment = (segment: string) =>
  SECTION_LABELS[segment] ??
  segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const withTrailingSlash = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`)

export function buildDocBreadcrumbs(pathname: string, pageTitle: string, siteOrigin: string): DocBreadcrumb[] {
  const normalizedPath = withTrailingSlash(pathname.split('#')[0].split('?')[0])
  const segments = normalizedPath.replace(/\/$/, '').split('/').filter(Boolean)
  if (segments[0] !== 'docs' || segments.length < 2) return []

  const pageUrl = new URL(normalizedPath, siteOrigin).href
  const home: DocBreadcrumb = {
    name: 'Home',
    url: new URL('/', siteOrigin).href,
  }

  const pluginMatch = normalizedPath.match(/^\/docs\/plugins\/([^/]+)\//)
  if (pluginMatch) {
    const slug = pluginMatch[1]
    const sectionUrl = new URL(`/docs/plugins/${slug}/`, siteOrigin).href
    const sectionName = pluginNames.get(slug) ?? formatSegment(slug)
    return [
      home,
      { name: sectionName, url: sectionUrl },
      { name: pageTitle, url: pageUrl },
    ]
  }

  const sectionKey = segments[1]
  const sectionPath =
    sectionKey === 'getting-started' ? '/docs/getting-started/quickstart/' : withTrailingSlash(`/docs/${sectionKey}`)
  const section: DocBreadcrumb = {
    name: formatSegment(sectionKey),
    url: new URL(sectionPath, siteOrigin).href,
  }

  return [home, section, { name: pageTitle, url: pageUrl }]
}

export function createDocBreadcrumbLdJson(pageUrl: string, breadcrumbs: DocBreadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': crumb.url,
        url: crumb.url,
        name: crumb.name,
      },
    })),
  }
}