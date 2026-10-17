import { splitLocalePath } from './localizedLegacyPathRedirect'

/** Canonical paths (no locale prefix) that intentionally return HTTP 410 Gone. */
const GONE_PATHS = new Set<string>(['/blog/how-to-delete-icon'])

function normalizeGoneLookupPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

/** True when `pathname` (with optional locale prefix) is a permanently removed URL. */
export function isGonePath(pathname: string): boolean {
  const { path } = splitLocalePath(pathname)
  return GONE_PATHS.has(normalizeGoneLookupPath(path))
}
