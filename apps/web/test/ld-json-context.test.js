import { expect, test } from 'bun:test'
import { createLdJsonGraph, createNewsArticleLdJson, ensureLdJsonContext } from '../src/lib/ldJson.ts'

const mockConfig = {
  brand: 'Capgo',
  blog_title: 'Capgo Blog',
  blog_description: 'Capgo blog',
  blog_keywords: 'capacitor',
  baseUrl: 'https://capgo.app',
  baseApiUrl: 'https://api.capgo.app',
}

const articleOptions = {
  title: 'Test Article',
  description: 'Test description',
  url: 'https://capgo.app/blog/test-article/',
  datePublished: '2024-01-01T00:00:00.000Z',
  dateModified: '2024-01-02T00:00:00.000Z',
  author: 'Capgo',
}

test('createNewsArticleLdJson returns NewsArticle without @context', () => {
  const article = createNewsArticleLdJson(mockConfig, articleOptions)
  expect(article['@context']).toBeUndefined()
  expect(article['@type']).toBe('NewsArticle')
})

test('ensureLdJsonContext adds schema.org @context to standalone schemas', () => {
  const article = createNewsArticleLdJson(mockConfig, articleOptions)
  const normalized = ensureLdJsonContext(article)

  expect(normalized['@context']).toBe('https://schema.org')
  expect(normalized['@type']).toBe('NewsArticle')
})

test('ensureLdJsonContext preserves existing @context on graph ld+json', () => {
  const graph = createLdJsonGraph(
    mockConfig,
    { '@type': 'WebPage', name: 'Test' },
    { includeOrganization: true },
  )

  const normalized = ensureLdJsonContext(graph)
  expect(normalized['@context']).toBe('https://schema.org')
  expect(normalized['@graph']).toBeDefined()
})

test('serialized blog ld+json includes @context', () => {
  const article = createNewsArticleLdJson(mockConfig, articleOptions)
  const json = JSON.stringify(ensureLdJsonContext(article))

  expect(json).toContain('"@context":"https://schema.org"')
  expect(json).toContain('"@type":"NewsArticle"')
})
