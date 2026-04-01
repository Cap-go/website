import englishMessages from '../../messages/en.json'

type MessageParams = Record<string, unknown>
type MessageFn = (params?: MessageParams, options?: { locale?: string }) => string

const messageTemplates = englishMessages as Record<string, string>
const placeholderPattern = /\{([A-Za-z0-9_]+)\}/g

function formatMessage(template: string, params: MessageParams = {}): string {
  return template.replace(placeholderPattern, (_, key: string) => {
    const value = params[key]
    return value === undefined || value === null ? `{${key}}` : String(value)
  })
}

const messages = new Proxy<Record<string, MessageFn>>(
  {},
  {
    get(_, property: string | symbol) {
      if (typeof property !== 'string') {
        return undefined
      }

      const template = messageTemplates[property] ?? property
      return (params?: MessageParams) => formatMessage(template, params)
    },
  },
)

export default messages
