/**
 * Permanent trailing-slash normalization for Astro `trailingSlash: 'always'` pages.
 * Cloudflare Workers static assets use temporary 307 redirects for html_handling;
 * the web worker applies 301 redirects before ASSETS.fetch instead.
 */

function pathnameLastSegment(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  return segments[segments.length - 1] ?? ''
}

function looksLikeStaticAssetPath(pathname: string): boolean {
  const lastSegment = pathnameLastSegment(pathname)
  return lastSegment.includes('.')
}

/** Returns the trailing-slash pathname when a permanent redirect should run, else null. */
export function trailingSlashRedirectTarget(pathname: string): string | null {
  if (!pathname || pathname === '/') return null
  if (pathname.endsWith('/')) return null
  if (looksLikeStaticAssetPath(pathname)) return null
  if (pathname === '/api' || pathname.startsWith('/api/')) return null
  return `${pathname}/`
}
