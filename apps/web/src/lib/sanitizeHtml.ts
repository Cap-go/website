import DOMPurify, { type Config } from 'isomorphic-dompurify'

const MARKDOWN_SANITIZE_OPTIONS: Config = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ['target', 'rel'],
}

const URL_SCHEME_PATTERN = /^(?:https?:|mailto:|tel:|\/|#)/i

export function sanitizeMarkdownHtml(html: string): string {
  return String(DOMPurify.sanitize(html, MARKDOWN_SANITIZE_OPTIONS))
}

export function isSafeRenderableUrl(url: string): boolean {
  const trimmed = url.trim()
  if (!trimmed) return false

  if (trimmed.startsWith('//')) return false
  if (/^javascript:/i.test(trimmed)) return false
  if (/^data:/i.test(trimmed) && !/^data:image\//i.test(trimmed)) return false

  return URL_SCHEME_PATTERN.test(trimmed)
}

export function sanitizeRenderableUrl(url: string): string | null {
  const trimmed = url.trim()
  return isSafeRenderableUrl(trimmed) ? trimmed : null
}
