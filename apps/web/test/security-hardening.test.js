import { expect, test } from 'bun:test'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DOCS_CONTENT_SECURITY_POLICY, WEB_CONTENT_SECURITY_POLICY } from '../../../apps/shared/security/csp.mjs'
import { isSafeRenderableUrl, sanitizeMarkdownHtml, sanitizeRenderableUrl } from '../src/lib/sanitizeHtml.ts'

const repoRoot = path.dirname(fileURLToPath(new URL('../../../package.json', import.meta.url)))

test('sanitizeMarkdownHtml strips script tags from marked output', () => {
  const dirty = '<p>Hello</p><script>alert(1)</script><img src=x onerror=alert(1)>'
  const clean = sanitizeMarkdownHtml(dirty)

  expect(clean).toContain('<p>Hello</p>')
  expect(clean).not.toContain('<script')
  expect(clean).not.toContain('onerror')
})

test('sanitizeMarkdownHtml keeps safe markdown links', () => {
  const clean = sanitizeMarkdownHtml('<p>Read <a href="https://capgo.app/docs/" target="_blank" rel="noopener">docs</a></p>')
  expect(clean).toContain('href="https://capgo.app/docs/"')
  expect(clean).toContain('rel="noopener noreferrer"')
})

test('sanitizeMarkdownHtml enforces noopener noreferrer on target=_blank links', () => {
  const clean = sanitizeMarkdownHtml('<a href="https://capgo.app/" target="_blank" rel="opener">x</a>')
  expect(clean).toBe('<a href="https://capgo.app/" target="_blank" rel="noopener noreferrer">x</a>')
})

test('sanitizeMarkdownHtml enforces noopener noreferrer on case-variant blank targets', () => {
  const clean = sanitizeMarkdownHtml('<a href="https://capgo.app/" target="_BLANK" rel="opener">x</a>')
  expect(clean).toBe('<a href="https://capgo.app/" target="_BLANK" rel="noopener noreferrer">x</a>')
})

test('sanitizeMarkdownHtml strips unsafe rel values when target is not _blank', () => {
  const clean = sanitizeMarkdownHtml('<a href="https://capgo.app/" rel="opener">x</a>')
  expect(clean).not.toContain('rel=')
})

test('isSafeRenderableUrl allows image data URLs and rejects other data URLs', () => {
  expect(isSafeRenderableUrl('data:image/png;base64,abc')).toBe(true)
  expect(sanitizeRenderableUrl('data:image/png;base64,abc')).toBe('data:image/png;base64,abc')
  expect(isSafeRenderableUrl('data:text/html,alert(1)')).toBe(false)
  expect(sanitizeRenderableUrl('data:text/html,alert(1)')).toBeNull()
})

test('sanitizeRenderableUrl rejects javascript and protocol-relative URLs', () => {
  expect(sanitizeRenderableUrl('javascript:alert(1)')).toBeNull()
  expect(sanitizeRenderableUrl('//evil.example')).toBeNull()
  expect(isSafeRenderableUrl('/plugins/')).toBe(true)
  expect(isSafeRenderableUrl('mailto:sales@capgo.app')).toBe(true)
})

test('docs security headers helper applies the shared docs CSP policy', async () => {
  const { withDocsSecurityHeaders } = await import('../../../apps/shared/security/responseHeaders.mjs')
  const response = withDocsSecurityHeaders(new Response('ok', { status: 200 }))

  expect(response.headers.get('Content-Security-Policy')).toBe(DOCS_CONTENT_SECURITY_POLICY)
  expect(response.headers.get('X-Frame-Options')).toBe('DENY')
})

test('web _headers uses the shared CSP policy', async () => {
  const headers = await readFile(path.join(repoRoot, 'apps/web/public/_headers'), 'utf8')
  expect(headers).toContain(`Content-Security-Policy: ${WEB_CONTENT_SECURITY_POLICY}`)
  expect(headers).not.toContain("'unsafe-eval'")
  expect(headers).not.toContain('default-src *')
})
