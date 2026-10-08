import { expect, test } from 'bun:test'
import { createLdJsonGraph, createNewsArticleLdJson, createProductLdJson, ensureLdJsonContext } from '../src/lib/ldJson.ts'

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
  const graph = createLdJsonGraph(mockConfig, { '@type': 'WebPage', name: 'Test' }, { includeOrganization: true })

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

test('createProductLdJson adds review and aggregateRating from customer reviews', () => {
  const product = createProductLdJson(mockConfig, {
    name: 'Capgo',
    description: 'Live updates for Capacitor apps',
    url: 'https://capgo.app/pricing/',
    sku: 'capgo',
    offers: [
      {
        name: 'Solo',
        price: '14',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
    reviews: [
      { author: 'Sergiu S', reviewBody: 'The updater plugin transformed how we ship.', ratingValue: 5 },
      { author: 'Mikołaj Wilczek', reviewBody: 'Plugins were a great entry point.', ratingValue: 5 },
    ],
  })

  expect(product.review).toHaveLength(2)
  expect(product.review[0]).toMatchObject({
    '@type': 'Review',
    reviewBody: 'The updater plugin transformed how we ship.',
    author: { '@type': 'Person', name: 'Sergiu S' },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
  })
  expect(product.aggregateRating).toMatchObject({
    '@type': 'AggregateRating',
    ratingValue: 5,
    reviewCount: 2,
    bestRating: 5,
    worstRating: 1,
  })
})

test('createProductLdJson omits review fields when no reviews are provided', () => {
  const product = createProductLdJson(mockConfig, {
    name: 'Capgo',
    description: 'Live updates for Capacitor apps',
    url: 'https://capgo.app/pricing/',
    offers: [
      {
        price: '14',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
  })

  expect(product.review).toBeUndefined()
  expect(product.aggregateRating).toBeUndefined()
})
