import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { expect, test } from 'bun:test'

const DOCS_ROOT = path.resolve(import.meta.dirname, '..')
const SHEETS_HERO_HTML = path.join(DOCS_ROOT, 'dist/docs/plugins/sheets/index.html')

/**
 * Regression: Hero.astro must render DocBreadcrumbs on splash plugin landings
 * (~153 pages). Starlight skips PageTitle there, so breadcrumbs only come from Hero.
 */
test('plugin hero landing build output includes nav.doc-breadcrumbs', () => {
  if (!existsSync(SHEETS_HERO_HTML)) {
    throw new Error(
      `Missing ${SHEETS_HERO_HTML}. Run "bun run build:docs" before this test (ci:verify:docs runs it after build).`,
    )
  }

  const html = readFileSync(SHEETS_HERO_HTML, 'utf8')
  const hasVisibleBreadcrumbNav =
    /<nav\b[^>]*\baria-label="Breadcrumb"[^>]*\bclass="[^"]*\bdoc-breadcrumbs\b[^"]*"/.test(html) ||
    /<nav\b[^>]*\bclass="[^"]*\bdoc-breadcrumbs\b[^"]*"[^>]*\baria-label="Breadcrumb"/.test(html)

  expect(hasVisibleBreadcrumbNav).toBe(true)
})