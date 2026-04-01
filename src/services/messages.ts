import germanMessages from '../../messages/de.json'
import englishMessages from '../../messages/en.json'
import spanishMessages from '../../messages/es.json'
import frenchMessages from '../../messages/fr.json'
import indonesianMessages from '../../messages/id.json'
import italianMessages from '../../messages/it.json'
import japaneseMessages from '../../messages/ja.json'
import koreanMessages from '../../messages/ko.json'
import chineseMessages from '../../messages/zh.json'

type MessageParams = Record<string, unknown>
type MessageFn = (params?: MessageParams, options?: { locale?: string }) => string

type MessageCatalog = Record<string, string>

const catalogs: Record<string, MessageCatalog> = {
  de: germanMessages as MessageCatalog,
  en: englishMessages as MessageCatalog,
  es: spanishMessages as MessageCatalog,
  fr: frenchMessages as MessageCatalog,
  id: indonesianMessages as MessageCatalog,
  it: italianMessages as MessageCatalog,
  ja: japaneseMessages as MessageCatalog,
  ko: koreanMessages as MessageCatalog,
  zh: chineseMessages as MessageCatalog,
}

const placeholderPattern = /\{(\w+)\}/g
const missingMessageWarnings = new Set<string>()

function formatPlaceholderValue(key: string, value: unknown): string {
  if (value === undefined || value === null) {
    return `{${key}}`
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value)
  }

  try {
    return JSON.stringify(value)
  }
  catch {
    return '[unserializable]'
  }
}

function formatMessage(template: string, params: MessageParams = {}): string {
  return template.replaceAll(placeholderPattern, (_, key: string) => {
    const value = params[key]
    return formatPlaceholderValue(key, value)
  })
}

function resolveLocale(locale: string | undefined): string {
  const normalizedLocale = locale?.toLowerCase().split('-')[0] ?? 'en'
  return catalogs[normalizedLocale] ? normalizedLocale : 'en'
}

const messages = new Proxy<Record<string, MessageFn>>(
  {},
  {
    get(_, property: string | symbol) {
      if (typeof property !== 'string') {
        return undefined
      }

      return (params?: MessageParams, options?: { locale?: string }) => {
        const locale = resolveLocale(options?.locale)
        const template = catalogs[locale]?.[property] ?? catalogs.en[property]

        if (!template) {
          if (!missingMessageWarnings.has(property)) {
            missingMessageWarnings.add(property)
            console.warn(`[messages] Missing message key "${property}" for locale "${locale}".`)
          }
          return formatMessage(`[[missing:${property}]]`, params)
        }

        return formatMessage(template, params)
      }
    },
  },
)

export default messages
