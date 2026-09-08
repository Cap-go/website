import DOMPurify, { type Config } from 'isomorphic-dompurify'

const MARKDOWN_SANITIZE_OPTIONS: Config = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ['target'],
  FORBID_ATTR: ['rel'],
}

const URL_SCHEME_PATTERN = /^(?:https?:|mailto:|tel:|data:image\/|\/|#|\?)/i
const TARGET_REL_ELEMENTS = new Set(['A', 'AREA', 'FORM'])
const URL_VALIDATED_ELEMENTS = new Set(['A', 'AREA', 'FORM'])
const SAME_DOCUMENT_TARGETS = new Set(['_self', '_parent', '_top'])
const SAFE_REL_VALUE = 'noopener noreferrer'
let targetRelHookConfigured = false

function isRelativeRenderableUrl(url: string): boolean {
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(url)) return false
  return url.startsWith('./') || url.startsWith('../') || /^[\w%+.@-]/.test(url)
}

function hasUnsafeUrlPrefix(url: string): boolean {
  return url.startsWith('//') || url.startsWith('/\\')
}

function isBrowsingContextTarget(target: string): boolean {
  const normalized = target.trim().toLowerCase()
  if (!normalized) return false
  return !SAME_DOCUMENT_TARGETS.has(normalized)
}

function sanitizeElementUrlAttribute(node: Element, attributeName: 'href' | 'action') {
  const value = node.getAttribute(attributeName)
  if (!value || isSafeRenderableUrl(value)) return
  node.removeAttribute(attributeName)
}

function configureTargetRelHook() {
  if (targetRelHookConfigured) return

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (URL_VALIDATED_ELEMENTS.has(node.tagName)) {
      if (node.tagName === 'FORM') {
        sanitizeElementUrlAttribute(node, 'action')
      } else {
        sanitizeElementUrlAttribute(node, 'href')
      }
    }

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

  if (hasUnsafeUrlPrefix(trimmed)) return false
  if (/^javascript:/i.test(trimmed)) return false
  if (/^data:/i.test(trimmed) && !/^data:image\//i.test(trimmed)) return false

  if (URL_SCHEME_PATTERN.test(trimmed)) return true
  if (isRelativeRenderableUrl(trimmed)) return true

  return false
}

export function sanitizeRenderableUrl(url: string): string | null {
  const trimmed = url.trim()
  return isSafeRenderableUrl(trimmed) ? trimmed : null
}
