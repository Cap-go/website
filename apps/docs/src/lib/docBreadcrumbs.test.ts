import { expect, test } from 'bun:test'
import {
  buildDocBreadcrumbs,
  createDocBreadcrumbLdJson,
  stripTitleDecorations,
} from './docBreadcrumbs'

test('stripTitleDecorations removes leading emoji', () => {
  expect(stripTitleDecorations('💎 Build')).toBe('Build')
})

test('buildDocBreadcrumbs for CLI page', () => {
  const crumbs = buildDocBreadcrumbs('/docs/cli/reference/build/', 'Build', 'https://capgo.app')
  expect(crumbs).toHaveLength(3)
  expect(crumbs[0].url).toBe('https://capgo.app/')
  expect(crumbs[1].url).toBe('https://capgo.app/docs/cli/')
  expect(crumbs[2].url).toBe('https://capgo.app/docs/cli/reference/build/')
})

test('buildDocBreadcrumbs for getting started section', () => {
  const crumbs = buildDocBreadcrumbs('/docs/getting-started/deploy/', 'Deploy', 'https://capgo.app')
  expect(crumbs[1].url).toBe('https://capgo.app/docs/getting-started/quickstart/')
})

test('buildDocBreadcrumbs for ai section uses mcp landing', () => {
  const crumbs = buildDocBreadcrumbs('/docs/ai/mcp-events/', 'MCP Events', 'https://capgo.app')
  expect(crumbs[1].url).toBe('https://capgo.app/docs/ai/mcp/')
})

test('buildDocBreadcrumbs for plugin getting started', () => {
  const crumbs = buildDocBreadcrumbs('/docs/plugins/sheets/getting-started/', 'Getting started', 'https://capgo.app')
  expect(crumbs).toHaveLength(3)
  expect(crumbs[1].url).toBe('https://capgo.app/docs/plugins/sheets/')
  expect(crumbs[2].url).toBe('https://capgo.app/docs/plugins/sheets/getting-started/')
})

const hubPages: Array<{ path: string; title: string }> = [
  { path: '/docs/faq/', title: 'FAQ' },
  { path: '/docs/builder/', title: 'Builder' },
  { path: '/docs/plugins/', title: 'Plugins' },
  { path: '/docs/cli/', title: 'CLI' },
  { path: '/docs/ai/mcp/', title: 'MCP' },
  { path: '/docs/getting-started/quickstart/', title: 'Quickstart' },
  { path: '/docs/plugins/sheets/', title: 'Sheets' },
]

for (const { path, title } of hubPages) {
  test(`buildDocBreadcrumbs hub ${path} omits duplicate section crumb`, () => {
    const crumbs = buildDocBreadcrumbs(path, title, 'https://capgo.app')
    expect(crumbs).toHaveLength(2)
    expect(crumbs[0].name).toBe('Home')
    expect(crumbs[1].url).toBe(`https://capgo.app${path}`)
    const urls = crumbs.map((c) => c.url)
    expect(new Set(urls).size).toBe(urls.length)
  })
}

test('buildDocBreadcrumbs strips locale prefix and localizes URLs', () => {
  const crumbs = buildDocBreadcrumbs('/fr/docs/faq/', 'FAQ', 'https://capgo.app', 'fr')
  expect(crumbs).toHaveLength(2)
  expect(crumbs[1].url).toBe('https://capgo.app/fr/docs/faq/')
})

test('createDocBreadcrumbLdJson matches schema.org BreadcrumbList', () => {
  const crumbs = buildDocBreadcrumbs('/docs/builder/android/', 'Android', 'https://capgo.app')
  const json = createDocBreadcrumbLdJson(crumbs[2].url, crumbs)
  expect(json['@type']).toBe('BreadcrumbList')
  expect(json.itemListElement).toHaveLength(3)
  expect(json.itemListElement[0].name).toBe('Home')
  expect(json.itemListElement[0].item).toBe('https://capgo.app/')
  expect(json.itemListElement[0].position).toBe(1)
})