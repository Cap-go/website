import de from '../../messages/de.json'
import en from '../../messages/en.json'
import es from '../../messages/es.json'
import fr from '../../messages/fr.json'
import id from '../../messages/id.json'
import it from '../../messages/it.json'
import ja from '../../messages/ja.json'
import ko from '../../messages/ko.json'
import zh from '../../messages/zh.json'
import { defaultLocale, type Locales } from './locale'

type RawCatalog = Record<string, string>
export type MessageParams = Record<string, string | number | boolean | null | undefined>
export interface MessageOptions {
  locale?: Locales
}

function stripSchema(catalog: RawCatalog): RawCatalog {
  const { $schema: _schema, ...messages } = catalog
  return messages
}

export const catalogs = {
  de: stripSchema(de),
  en: stripSchema(en),
  es: stripSchema(es),
  fr: stripSchema(fr),
  id: stripSchema(id),
  it: stripSchema(it),
  ja: stripSchema(ja),
  ko: stripSchema(ko),
  zh: stripSchema(zh),
} satisfies Record<Locales, RawCatalog>

export type TranslationKey = keyof typeof catalogs.en
export type TranslationCatalog = typeof catalogs.en

export function getTranslations(locale: Locales = defaultLocale): TranslationCatalog {
  return catalogs[locale] ?? catalogs[defaultLocale]
}

export function translate(key: string, params: MessageParams = {}, options: MessageOptions = {}): string {
  const locale = options.locale ?? defaultLocale
  const catalog = getTranslations(locale)
  const fallbackCatalog = catalogs[defaultLocale]
  let message = catalog[key] ?? fallbackCatalog[key] ?? key

  if (Object.keys(params).length === 0) {
    return message
  }

  message = message.replace(/\{(\w+)\}/g, (_match, paramName: string) => {
    const value = params[paramName]
    return value === undefined || value === null ? '' : String(value)
  })

  return message
}

export default catalogs
