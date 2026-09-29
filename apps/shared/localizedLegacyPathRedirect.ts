import { resolveLegacyPathRedirect } from './legacyPathRedirects'

export const NON_DEFAULT_LOCALE_CODES = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'] as const

const NON_DEFAULT_LOCALES = new Set<string>(NON_DEFAULT_LOCALE_CODES)

/** Split a pathname into locale prefix (e.g. `/de`) and path without locale. */
export function splitLocalePath(pathname: string): { localePrefix: string; path: string } {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && NON_DEFAULT_LOCALES.has(segments[0])) {
    const rest = segments.slice(1).join('/')
    return {
      localePrefix: `/${segments[0]}`,
      path: rest ? `/${rest}${pathname.endsWith('/') ? '/' : ''}` : '/',
    }
  }
  return { localePrefix: '', path: pathname }
}

/** Resolve legacy redirect target with locale prefix re-applied (web worker behavior). */
export function resolveLocalizedLegacyRedirectPath(pathname: string): string | null {
  const { localePrefix, path } = splitLocalePath(pathname)
  const legacyTarget = resolveLegacyPathRedirect(path)
  if (!legacyTarget) return null
  return `${localePrefix}${legacyTarget}`
}
