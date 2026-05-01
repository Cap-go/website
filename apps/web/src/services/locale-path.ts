import { defaultLocale, locales, type Locales } from './locale'

export function stripLocalePath(pathname: string): string {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`

  for (const locale of locales) {
    if (normalizedPathname === `/${locale}`) return '/'
    if (normalizedPathname.startsWith(`/${locale}/`)) return normalizedPathname.slice(locale.length + 1) || '/'
  }

  return normalizedPathname || '/'
}

export function getLocalizedPath(locale: string, pathname: string): string {
  const targetLocale = locales.includes(locale as Locales) ? locale : defaultLocale
  const basePath = stripLocalePath(pathname)

  if (targetLocale === defaultLocale) return basePath
  return basePath === '/' ? `/${targetLocale}/` : `/${targetLocale}${basePath}`
}
