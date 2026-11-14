import { expect, test } from 'bun:test'
import { buildDocBreadcrumbs, createDocBreadcrumbLdJson } from './docBreadcrumbs'

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

test('buildDocBreadcrumbs for plugin getting started', () => {
  const crumbs = buildDocBreadcrumbs('/docs/plugins/sheets/getting-started/', 'Getting started', 'https://capgo.app')
  expect(crumbs[1].url).toBe('https://capgo.app/docs/plugins/sheets/')
  expect(crumbs[2].url).toBe('https://capgo.app/docs/plugins/sheets/getting-started/')
})

test('createDocBreadcrumbLdJson matches schema.org BreadcrumbList', () => {
  const crumbs = buildDocBreadcrumbs('/docs/builder/android/', 'Android', 'https://capgo.app')
  const json = createDocBreadcrumbLdJson(crumbs[2].url, crumbs)
  expect(json['@type']).toBe('BreadcrumbList')
  expect(json.itemListElement).toHaveLength(3)
  expect(json.itemListElement[0].item.url).toBe('https://capgo.app/')
})