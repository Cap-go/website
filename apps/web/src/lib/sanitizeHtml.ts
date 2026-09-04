import DOMPurify, { type Config } from 'isomorphic-dompurify'

const MARKDOWN_SANITIZE_OPTIONS: Config = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ['target'],
  FORBID_ATTR: ['rel'],
}

const URL_SCHEME_PATTERN = /^(?:https?:|mailto:|tel:|data:image\/|\/|#)/i
let blankTargetRelHookConfigured = false

function configureBlankTargetRelHook() {
  if (blankTargetRelHookConfigured) return

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName !== 'A') return

    const target = node.getAttribute('target')
    if (!target || target.toLowerCase() !== '_blank') return

    node.setAttribute('rel', 'noopener noreferrer')
  })

  blankTargetRelHookConfigured = true
}

export function sanitizeMarkdownHtml(html: string): string {
  configureBlankTargetRelHook()
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
