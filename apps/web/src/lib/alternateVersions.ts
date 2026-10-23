import { defaultLocale, locales } from '@/services/locale'
import type { AstroGlobal } from 'astro'

export interface AlternateVersion {
  locale: string
  url: string
}

/** Page path without its locale prefix, always wrapped in slashes (e.g. `/live-update/`). */
export function getLocaleBasePath(astro: AstroGlobal): string {
  const pathname = astro.url.pathname

  // Remove current locale from pathname to get the base path
  const currentLocale = astro.locals.locale
  let basePath = pathname

  // Remove locale prefix if present
  if (currentLocale !== defaultLocale) {
    basePath = pathname.replace(`/${currentLocale}`, '') || '/'
  }

  // Ensure basePath starts with / and ends with /
  if (!basePath.startsWith('/')) {
    basePath = `/${basePath}`
  }
  if (!basePath.endsWith('/')) {
    basePath = `${basePath}/`
  }

  return basePath
}

export function generateAlternateVersions(astro: AstroGlobal): AlternateVersion[] {
  const baseUrl = astro.locals.runtimeConfig.public.baseUrl
  const basePath = getLocaleBasePath(astro)

  return locales.map((locale) => ({
    locale,
    url: locale === defaultLocale ? `${baseUrl}${basePath}` : `${baseUrl}/${locale}${basePath}`,
  }))
}
