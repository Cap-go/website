// Locale paths supported by the edge translation worker.
export const locales = ['de', 'en', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh']
export const localeNames = {
  en: 'en-US', // the `defaultLocale` value must present in `locales` keys
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-CN',
}
export type Locales = 'de' | 'en' | 'es' | 'fr' | 'id' | 'it' | 'ja' | 'ko' | 'zh'
export const defaultLocale = 'en'
