export type PageBreadcrumb = { name: string; url: string }

export function breadcrumbGraphOptions(crumbs: PageBreadcrumb[]) {
  const pageUrl = crumbs.at(-1)?.url
  if (!pageUrl || crumbs.length < 2) return {}
  return {
    includeBreadcrumbs: true,
    breadcrumbId: pageUrl,
    breadcrumbs: crumbs.map(({ name, url }) => ({ name, url })),
  }
}

export function createBreadcrumbListForValidation(pageUrl: string, breadcrumbs: PageBreadcrumb[]) {
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
