import { splitLocalePath } from './localizedLegacyPathRedirect'

/** Public paths that intentionally return HTTP 410 Gone (locale prefix stripped before lookup). */
const GONE_PATHS = new Set<string>(['/blog/what-is-a-micro-frontend'])

function decodePathnameForLookup(pathname: string): string {
  try {
    return decodeURIComponent(pathname)
  } catch {
    return pathname
  }
}

function normalizeGoneLookupPath(pathname: string): string {
  let path = decodePathnameForLookup(pathname)
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}

/** True when `pathname` (with or without locale prefix) is a permanently removed URL. */
export function isGonePath(pathname: string): boolean {
  const { path } = splitLocalePath(pathname)
  return GONE_PATHS.has(normalizeGoneLookupPath(path))
}
