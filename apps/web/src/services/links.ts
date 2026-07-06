import { getRelativeLocaleUrl as getAstroRelativeLocaleUrl } from 'astro:i18n'

const localePrefixPattern = /^\/(?:de|es|fr|id|it|ja|ko|zh)(?=\/|$)/

function splitPathSuffix(value: string): { pathname: string; suffix: string } {
  const suffixIndex = value.search(/[?#]/)
  if (suffixIndex === -1) return { pathname: value, suffix: '' }
  return {
    pathname: value.slice(0, suffixIndex),
    suffix: value.slice(suffixIndex),
  }
}

function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(localePrefixPattern, '')
  return stripped || '/'
}

function rewriteRedirectPath(pathname: string): string {
  if (pathname === '/docs/cli' || pathname === '/docs/cli/') return '/docs/cli/overview/'
  if (pathname === '/docs/getting-started' || pathname === '/docs/getting-started/') return '/docs/getting-started/quickstart/'
  if (pathname === '/docs/plugin/api' || pathname === '/docs/plugin/api/') return '/docs/plugins/updater/api/'
  if (pathname === '/docs/cli/cloud-build' || pathname.startsWith('/docs/cli/cloud-build/')) {
    return pathname.replace(/^\/docs\/cli\/cloud-build(?=\/|$)/, '/docs/builder')
  }
  return pathname
}

function withTrailingSlash(pathname: string): string {
  if (pathname === '/' || pathname.endsWith('/')) return pathname
  if (/\.[a-z0-9]{2,8}$/i.test(pathname) && !pathname.endsWith('.html')) return pathname
  return `${pathname}/`
}

export function canonicalizeInternalPath(value = ''): string {
  if (!value || value === '/') return '/'
  if (value.startsWith('#')) return value

  const { pathname, suffix } = splitPathSuffix(value)
  const rootedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const canonicalPathname = withTrailingSlash(rewriteRedirectPath(stripLocalePrefix(rootedPathname)))

  return `${canonicalPathname}${suffix}`
}

export function getRelativeLocaleUrl(locale: string, path = ''): string {
  return getAstroRelativeLocaleUrl(locale, canonicalizeInternalPath(path))
}
