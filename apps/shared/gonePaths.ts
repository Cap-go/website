import { splitLocalePath } from './localizedLegacyPathRedirect'

/**
 * Permanently removed public URLs (HTTP 410 Gone).
 *
 * How to retire a page in a follow-up PR:
 * 1. Delete its English content source (and any static assets only used by that page).
 * 2. Add one entry to `GONE_PATHS` below: the canonical path without a locale prefix,
 *    without a trailing slash (e.g. `/blog/my-old-slug`).
 * 3. Remove or repoint internal links and legacy redirects that target the URL.
 *
 * Matching: `isGonePath()` strips an optional locale prefix (`/de`, `/fr`, …) via
 * `splitLocalePath`, then compares the normalized path to this set. Trailing slashes
 * on the request are ignored.
 *
 * Runtime: the web worker serves the branded shell from `/410/index.html` with status
 * 410. The translation worker bypasses cached translations for gone paths and localizes
 * the same 410 HTML for non-English locales.
 */
const GONE_PATHS = new Set<string>(['/blog/what-is-a-micro-frontend', '/blog/native-base-picker'])

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
