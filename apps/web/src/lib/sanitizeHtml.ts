import DOMPurify, { type Config } from 'isomorphic-dompurify'

const MARKDOWN_SANITIZE_OPTIONS: Config = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ['target'],
  FORBID_ATTR: ['rel'],
}

const URL_SCHEME_PATTERN = /^(?:https?:|mailto:|tel:|data:image\/|\/|#)/i
const TARGET_REL_ELEMENTS = new Set(['A', 'AREA', 'FORM'])
const SAME_DOCUMENT_TARGETS = new Set(['_self', '_parent', '_top'])
const SAFE_REL_VALUE = 'noopener noreferrer'
let targetRelHookConfigured = false

function isBrowsingContextTarget(target: string): boolean {
  const normalized = target.trim().toLowerCase()
  if (!normalized) return false
  return !SAME_DOCUMENT_TARGETS.has(normalized)
}

function configureTargetRelHook() {
  if (targetRelHookConfigured) return

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (!TARGET_REL_ELEMENTS.has(node.tagName)) return

    const target = node.getAttribute('target')
    if (!target || !isBrowsingContextTarget(target)) return

    node.setAttribute('rel', SAFE_REL_VALUE)
  })

  targetRelHookConfigured = true
}

export function sanitizeMarkdownHtml(html: string): string {
  configureTargetRelHook()
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
