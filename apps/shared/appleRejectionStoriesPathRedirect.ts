const APPLE_REJECTION_STORIES_PREFIX = '/apple-rejection-stories'
const APP_STORE_REFUSAL_HORROR_STORY_PREFIX = '/app-store-refusal-horror-story'

function normalizeRedirectLookupPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

function withPageTrailingSlash(pathname: string): string {
  if (pathname === '/' || pathname.endsWith('/')) return pathname
  if (/\.[a-z0-9]{2,8}$/i.test(pathname) && !pathname.endsWith('.html')) return pathname
  return `${pathname}/`
}

/** Maps duplicate /apple-rejection-stories URLs to /app-store-refusal-horror-story (locale applied separately). */
export function resolveAppleRejectionStoriesPathRedirect(pathname: string): string | null {
  const path = normalizeRedirectLookupPath(pathname)
  if (path === APPLE_REJECTION_STORIES_PREFIX) {
    return `${APP_STORE_REFUSAL_HORROR_STORY_PREFIX}/`
  }
  if (path.startsWith(`${APPLE_REJECTION_STORIES_PREFIX}/`)) {
    const suffix = path.slice(APPLE_REJECTION_STORIES_PREFIX.length)
    return withPageTrailingSlash(`${APP_STORE_REFUSAL_HORROR_STORY_PREFIX}${suffix}`)
  }
  return null
}
