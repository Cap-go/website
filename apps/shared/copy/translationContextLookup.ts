import { translationContextByText } from './translationContextByText'

export function normalizeTranslationLookupText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

type PlaceholderTemplate = {
  source: string
  context: string
  pattern: RegExp
}

const placeholderTemplates: PlaceholderTemplate[] = Object.entries(translationContextByText)
  .filter(([source]) => source.includes('{'))
  .map(([source, context]) => ({
    source,
    context,
    pattern: new RegExp(`^${escapeRegExp(source).replace(/\\{[A-Za-z0-9_]+\\}/g, '.*?')}$`),
  }))
  .sort((left, right) => right.source.length - left.source.length)

export function resolveTranslationContext(text: string): string | undefined {
  const normalized = normalizeTranslationLookupText(text)
  if (!normalized) return undefined

  const exact = translationContextByText[normalized]
  if (exact) return exact

  for (const template of placeholderTemplates) {
    if (template.pattern.test(normalized)) return template.context
  }

  return undefined
}

export function resolveTranslationContexts(texts: readonly string[]): Array<string | undefined> {
  return texts.map((text) => resolveTranslationContext(text))
}
