import { defaultLocale, locales, type Locales } from '@/services/locale'

export function resolveMessageLocale(...candidates: Array<string | null | undefined>): Locales {
  for (const candidate of candidates) {
    if (candidate && (locales as readonly string[]).includes(candidate)) {
      return candidate as Locales
    }
  }

  return defaultLocale
}
