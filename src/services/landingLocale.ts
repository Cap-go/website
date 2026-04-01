import { defaultLocale, localeNames, locales, type Locales } from './locale'

export interface LandingLocaleDefinition {
  code: string
  name: string
  nativeName: string
  hreflang: string
  ogLocale: string
  flag: string
}

export const landingLocales = [
  { code: 'en', name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', flag: '🇺🇸' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '简体中文', hreflang: 'zh', ogLocale: 'zh_CN', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_PT', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU', flag: '🇷🇺' },
  { code: 'fr', name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_AR', flag: '🇸🇦' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', flag: '🇹🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', hreflang: 'it', ogLocale: 'it_IT', flag: '🇮🇹' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hreflang: 'vi', ogLocale: 'vi_VN', flag: '🇻🇳' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', hreflang: 'pl', ogLocale: 'pl_PL', flag: '🇵🇱' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hreflang: 'id', ogLocale: 'id_ID', flag: '🇮🇩' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hreflang: 'uk', ogLocale: 'uk_UA', flag: '🇺🇦' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hreflang: 'nl', ogLocale: 'nl_NL', flag: '🇳🇱' },
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی', hreflang: 'fa', ogLocale: 'fa_IR', flag: '🇮🇷' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', hreflang: 'th', ogLocale: 'th_TH', flag: '🇹🇭' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', hreflang: 'bn', ogLocale: 'bn_BD', flag: '🇧🇩' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', hreflang: 'cs', ogLocale: 'cs_CZ', flag: '🇨🇿' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', hreflang: 'ro', ogLocale: 'ro_RO', flag: '🇷🇴' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', hreflang: 'sv', ogLocale: 'sv_SE', flag: '🇸🇪' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', hreflang: 'he', ogLocale: 'he_IL', flag: '🇮🇱' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', hreflang: 'ta', ogLocale: 'ta_IN', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', hreflang: 'ur', ogLocale: 'ur_PK', flag: '🇵🇰' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', hreflang: 'el', ogLocale: 'el_GR', flag: '🇬🇷' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', hreflang: 'hu', ogLocale: 'hu_HU', flag: '🇭🇺' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', hreflang: 'fi', ogLocale: 'fi_FI', flag: '🇫🇮' },
] as const satisfies readonly LandingLocaleDefinition[]

export type LandingLocaleCode = (typeof landingLocales)[number]['code']

const landingLocaleCodeSet = new Set<string>(landingLocales.map((locale) => locale.code))
const knownLocaleCodeSet = new Set<string>([...landingLocales.map((locale) => locale.code), ...locales])
const rtlLocaleCodeSet = new Set<string>(['ar', 'fa', 'he', 'ur'])
const staticLocaleCodeSet = new Set<string>(locales)
const landingLocaleMap = new Map<string, LandingLocaleDefinition>(landingLocales.map((locale) => [locale.code, locale]))
const staticLocaleEntries = locales
  .map((locale) => landingLocaleMap.get(locale))
  .filter((locale): locale is LandingLocaleDefinition => Boolean(locale))

const DYNAMIC_LANDING_EXACT_EXCLUDES = new Set<string>([
  '/robots.txt',
  '/favicon.ico',
  '/favicon.svg',
  '/site.webmanifest',
  '/manifest.webmanifest',
  '/sitemap-index.xml',
  '/status.json',
  '/sponsors.json',
])

const DYNAMIC_LANDING_PREFIX_EXCLUDES = ['/_astro/', '/.well-known/', '/blog/', '/docs/', '/plugins/']

export function isLandingLocale(locale: string | undefined): locale is LandingLocaleCode {
  if (!locale) {
    return false
  }
  return landingLocaleCodeSet.has(locale)
}

export function isStaticLocale(locale: string | undefined): locale is Locales {
  if (!locale) {
    return false
  }
  return staticLocaleCodeSet.has(locale)
}

export function isRtlLocale(locale: string | undefined): boolean {
  if (!locale) {
    return false
  }
  return rtlLocaleCodeSet.has(locale)
}

export function getLocaleEntry(locale: string | undefined): LandingLocaleDefinition {
  return landingLocaleMap.get(locale ?? '') ?? landingLocales[0]
}

export function looksLikeFilePath(pathname: string): boolean {
  return /\.[a-z0-9]{1,8}$/i.test(pathname)
}

export function normalizePathname(pathname: string): string {
  let normalized = pathname || '/'
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`
  }
  normalized = normalized.replace(/\/{2,}/g, '/')
  if (normalized !== '/' && !normalized.endsWith('/') && !looksLikeFilePath(normalized)) {
    normalized = `${normalized}/`
  }
  return normalized
}

export function splitLocaleFromPathname(pathname: string): { locale?: string; pathname: string } {
  const normalized = normalizePathname(pathname)
  const segments = normalized.split('/').filter(Boolean)
  const [maybeLocale, ...rest] = segments

  if (maybeLocale && knownLocaleCodeSet.has(maybeLocale)) {
    const strippedPath = rest.length === 0 ? '/' : normalizePathname(`/${rest.join('/')}`)
    return {
      locale: maybeLocale,
      pathname: strippedPath,
    }
  }

  return {
    pathname: normalized,
  }
}

export function parseRequestedLandingLocale(pathname: string): { locale: LandingLocaleCode; pathname: string } | null {
  const parsed = splitLocaleFromPathname(pathname)
  if (!isLandingLocale(parsed.locale)) {
    return null
  }
  return {
    locale: parsed.locale,
    pathname: parsed.pathname,
  }
}

export function isDynamicLandingPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname)
  if (DYNAMIC_LANDING_EXACT_EXCLUDES.has(normalized)) {
    return false
  }
  if (looksLikeFilePath(normalized)) {
    return false
  }
  return !DYNAMIC_LANDING_PREFIX_EXCLUDES.some((prefix) => normalized.startsWith(prefix))
}

export function getLocalizedPathname(pathname: string, locale: string): string {
  const { pathname: strippedPath } = splitLocaleFromPathname(pathname)
  const normalized = normalizePathname(strippedPath)

  if (!isDynamicLandingPath(normalized)) {
    if (locale !== defaultLocale && isStaticLocale(locale)) {
      return normalizePathname(`/${locale}${normalized}`)
    }
    return normalized
  }

  if (locale === defaultLocale) {
    return normalized
  }

  return normalizePathname(`/${locale}${normalized}`)
}

export interface AlternateLocaleEntry extends LandingLocaleDefinition {
  path: string
}

export function getAlternateLocaleEntries(pathname: string): AlternateLocaleEntry[] {
  const { pathname: strippedPath } = splitLocaleFromPathname(pathname)
  const normalized = normalizePathname(strippedPath)
  const availableLocales = isDynamicLandingPath(normalized) ? landingLocales : staticLocaleEntries

  return availableLocales.map((locale) => ({
    ...locale,
    path: getLocalizedPathname(normalized, locale.code),
  }))
}

export function getOgLocale(locale: string | undefined): string {
  return getLocaleEntry(locale).ogLocale
}

export function getSitemapLocaleMap(): Record<string, string> {
  return Object.fromEntries(landingLocales.map((locale) => [locale.code, locale.hreflang]))
}

export function getStaticSitemapLocaleMap(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(localeNames).map(([code, hreflang]) => [code, hreflang]),
  )
}
