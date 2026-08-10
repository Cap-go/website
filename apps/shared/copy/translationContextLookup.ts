import { translationContextByText } from './translationContextByText'

export function normalizeTranslationLookupText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchPlaceholderTemplate(source: string, normalized: string): boolean {
  const pattern = escapeRegExp(source).replace(/\\{[A-Za-z0-9_]+\\}/g, '.*?')
  return new RegExp(`^${pattern}$`).test(normalized)
}

export function resolveTranslationContext(text: string): string | undefined {
  const normalized = normalizeTranslationLookupText(text)
  if (!normalized) return undefined

  const exact = translationContextByText[normalized]
  if (exact) return exact

  let bestSource = ''
  let bestContext: string | undefined
  for (const [source, context] of Object.entries(translationContextByText)) {
    if (!source.includes('{')) continue
    if (!matchPlaceholderTemplate(source, normalized)) continue
    if (source.length > bestSource.length) {
      bestSource = source
      bestContext = context
    }
  }

  return bestContext
}

export function resolveTranslationContexts(texts: readonly string[]): Array<string | undefined> {
  return texts.map((text) => resolveTranslationContext(text))
}
