/**
 * Permanent trailing-slash normalization for Astro `trailingSlash: 'always'` pages.
 * Cloudflare Workers static assets use temporary 307 redirects for html_handling;
 * the web worker upgrades slash-only 307 responses from ASSETS.fetch to 301.
 */

/** Returns the redirect target pathname (with search/hash) when a 307 only adds a trailing slash. */
export function permanentTrailingSlashLocation(requestUrl: string, response: Response): string | null {
  if (response.status !== 307) return null
  const location = response.headers.get('Location')
  if (!location) return null

  const source = new URL(requestUrl)
  const target = new URL(location, requestUrl)
  if (source.origin !== target.origin) return null

  const sourcePath = source.pathname
  if (!sourcePath || sourcePath === '/' || sourcePath.endsWith('/')) return null
  if (looksLikeStaticAssetPath(sourcePath)) return null
  if (sourcePath === '/api' || sourcePath.startsWith('/api/')) return null

  const expectedPath = `${sourcePath}/`
  if (target.pathname !== expectedPath) return null
  if (target.search !== source.search) return null

  return `${target.pathname}${target.search}${target.hash}`
}

function pathnameLastSegment(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  return segments[segments.length - 1] ?? ''
}

function looksLikeStaticAssetPath(pathname: string): boolean {
  const lastSegment = pathnameLastSegment(pathname)
  return lastSegment.includes('.')
}
