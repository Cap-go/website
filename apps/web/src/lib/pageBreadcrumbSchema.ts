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
