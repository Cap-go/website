import { defaultLocale } from '@/services/locale'
import { getAlternateLocaleEntries } from '@/services/landingLocale'
import type { AstroGlobal } from 'astro'

export interface AlternateVersion {
  locale: string
  url: string
}

export function generateAlternateVersions(astro: AstroGlobal): AlternateVersion[] {
  const baseUrl = astro.locals.runtimeConfig.public.baseUrl
  const pathname = astro.locals.requestedPathname || astro.url.pathname

  return getAlternateLocaleEntries(pathname).map((locale) => ({
    locale: locale.code,
    url: new URL(locale.path, baseUrl).toString(),
  }))
}
