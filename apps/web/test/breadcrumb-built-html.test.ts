import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'bun:test'

const distRoot = join(import.meta.dir, '..', 'dist', 'alternatives', 'bitrise', 'index.html')

test('built alternatives page includes visible breadcrumb nav and BreadcrumbList JSON-LD', () => {
  if (!existsSync(distRoot)) {
    throw new Error(`Missing ${distRoot}. Run "bun run build:web" before this test.`)
  }

  const html = readFileSync(distRoot, 'utf8')
  expect(html).toMatch(/<nav[^>]*aria-label="Breadcrumb"/)

  const ldJsonBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]))
  const breadcrumb = ldJsonBlocks
    .flatMap((block) => (Array.isArray(block['@graph']) ? block['@graph'] : [block]))
    .find((block) => block['@type'] === 'BreadcrumbList')

  expect(breadcrumb).toBeDefined()
  expect(JSON.stringify(breadcrumb)).toContain('https://capgo.app/alternatives/')
  expect(JSON.stringify(breadcrumb)).toContain('https://capgo.app/alternatives/bitrise/')
})