import { splitLocalePath } from './localizedLegacyPathRedirect'

const FIREBASE_PLUGIN_DOC_SLUG: Record<string, string> = {
  'capacitor-firebase-analytics': 'firebase-analytics',
  'capacitor-firebase-app': 'firebase-app',
  'capacitor-firebase-app-check': 'firebase-app-check',
  'capacitor-firebase-authentication': 'firebase-authentication',
  'capacitor-firebase-crashlytics': 'firebase-crashlytics',
  'capacitor-firebase-firestore': 'firebase-firestore',
  'capacitor-firebase-functions': 'firebase-functions',
  'capacitor-firebase-messaging': 'firebase-messaging',
  'capacitor-firebase-performance': 'firebase-performance',
  'capacitor-firebase-remote-config': 'firebase-remote-config',
  'capacitor-firebase-storage': 'firebase-storage',
}

const STATIC_NOT_FOUND_REDIRECTS: Record<string, string> = {
  '/solutions': '/solutions/startups/',
  '/live-updates': '/docs/live-updates/',
  '/cli': '/docs/cli/',
}

/** Category tag URLs that never had matching static pages → listing. */
export function resolveCategoryListingRedirect(pathname: string): string | null {
  const { localePrefix, path } = splitLocalePath(pathname)
  if (/^\/blog\/category\/[^/]+\/?$/.test(path)) return `${localePrefix}/blog/`
  if (/^\/articles\/category\/[^/]+\/?$/.test(path)) return `${localePrefix}/articles/`
  return null
}

/** Code-snippet paths crawled from blog posts, e.g. /blog/my-post/some-file.ts */
export function resolveBlogNestedSegmentRedirect(pathname: string): string | null {
  const { localePrefix, path } = splitLocalePath(pathname)
  const match = path.match(/^\/blog\/([^/]+)\/([^/]+)\/?$/)
  if (!match || match[1] === 'category') return null
  return `${localePrefix}/blog/${match[1]}/`
}

export function resolveFirebasePluginDocsRedirect(pathname: string): string | null {
  const { localePrefix, path } = splitLocalePath(pathname)
  const match = path.match(/^\/plugins\/(capacitor-firebase-[^/]+)\/?$/)
  if (!match) return null
  const docsSlug = FIREBASE_PLUGIN_DOC_SLUG[match[1]]
  if (!docsSlug) return null
  return `${localePrefix}/docs/plugins/${docsSlug}/`
}

export function resolveStaticNotFoundRedirect(pathname: string): string | null {
  const { localePrefix, path } = splitLocalePath(pathname)
  const key = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
  const target = STATIC_NOT_FOUND_REDIRECTS[key]
  if (!target) return null
  return `${localePrefix}${target}`
}

/** CLI paths without /docs prefix from old links. */
export function resolveCliDocsRedirect(pathname: string): string | null {
  const { localePrefix, path } = splitLocalePath(pathname)
  if (!path.startsWith('/cli/')) return null
  return `${localePrefix}/docs${path.endsWith('/') ? path : `${path}/`}`
}

export function resolveNotFoundRecoveryRedirect(pathname: string): string | null {
  return (
    resolveCategoryListingRedirect(pathname) ??
    resolveBlogNestedSegmentRedirect(pathname) ??
    resolveFirebasePluginDocsRedirect(pathname) ??
    resolveStaticNotFoundRedirect(pathname) ??
    resolveCliDocsRedirect(pathname)
  )
}
