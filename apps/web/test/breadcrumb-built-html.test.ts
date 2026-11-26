import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'bun:test'

const distRoot = join(import.meta.dir, '..', 'dist', 'alternatives', 'bitrise', 'index.html')

test('built alternatives page includes visible breadcrumb nav and BreadcrumbList JSON-LD', () => {
  if (!existsSync(distRoot)) {
    console.warn('Skipping built HTML breadcrumb test: run bun run build:web first')
    return
  }

  const html = readFileSync(distRoot, 'utf8')
  expect(html).toMatch(/<nav[^>]*aria-label="Breadcrumb"/)
  expect(html).toMatch(/BreadcrumbList/)
  expect(html).toMatch(/https:\/\/capgo\.app\/alternatives\/"/)
  expect(html).toMatch(/https:\/\/capgo\.app\/alternatives\/bitrise\/"/)
})