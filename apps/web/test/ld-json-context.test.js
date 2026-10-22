import { expect, test } from 'bun:test'
import {
  CAPGO_ORGANIZATION_DESCRIPTION,
  capgoOrganizationId,
  createHomepageLdJsonGraph,
  createLdJsonGraph,
  createNewsArticleLdJson,
  createProductLdJson,
  createServiceLdJson,
  createSoftwareApplicationLdJson,
  ensureLdJsonContext,
  toLdJsonBlocks,
} from '../src/lib/ldJson.ts'

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

test('createServiceLdJson references Capgo organization by @id', () => {
  const service = createServiceLdJson(mockConfig, {
    name: 'Capgo',
    description: 'Live updates',
    url: 'https://capgo.app/',
    serviceType: 'Software Development Service',
  })

  expect(service.provider).toEqual({ '@id': 'https://capgo.app/#organization' })
})

test('createProductLdJson adds monthly and yearly priceSpecification entries', () => {
  const product = createProductLdJson(mockConfig, {
    name: 'Capgo',
    description: 'Live updates for Capacitor apps',
    url: 'https://capgo.app/pricing/',
    offers: [
      {
        name: 'Solo',
        price: '14',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceSpecifications: [
          { price: '14', billingPeriod: 'monthly' },
          { price: '134', billingPeriod: 'yearly' },
        ],
      },
    ],
  })

  expect(product.offers[0].priceSpecification).toHaveLength(2)
  expect(product.offers[0].priceSpecification[0]).toMatchObject({
    '@type': 'UnitPriceSpecification',
    price: '14',
    unitCode: 'MON',
  })
  expect(product.offers[0].priceSpecification[1]).toMatchObject({
    '@type': 'UnitPriceSpecification',
    price: '134',
    unitCode: 'ANN',
  })
})

test('createCapgoOrganization uses the company description', () => {
  const graph = createLdJsonGraph(mockConfig, { '@type': 'WebPage', name: 'Test' }, { includeOrganization: true })
  const organization = graph['@graph'].find((node) => node['@type'] === 'Organization')
  expect(organization.description).toBe(CAPGO_ORGANIZATION_DESCRIPTION)
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

const homepageFeatureList = ['Live updates', 'Native builds']

const homepageOffers = {
  price: '14',
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  url: 'https://capgo.app/pricing/',
  priceSpecifications: [
    { price: '14', billingPeriod: 'monthly' },
    { price: '146', billingPeriod: 'yearly' },
  ],
}

function expectHomepageGraph(graph, homepageUrl, pricingUrl = 'https://capgo.app/pricing/') {
  const types = graph['@graph'].map((node) => node['@type'])
  expect(types).toContain('SoftwareApplication')
  expect(types).toContain('Organization')
  expect(types).toContain('WebSite')
  expect(types).not.toContain('BreadcrumbList')
  expect(types).not.toContain('Service')

  const organizations = graph['@graph'].filter((node) => node['@type'] === 'Organization')
  expect(organizations).toHaveLength(1)
  expect(organizations[0]['@id']).toBe(capgoOrganizationId(mockConfig.baseUrl))

  for (const node of graph['@graph']) {
    expect(node.aggregateRating).toBeUndefined()
    expect(node.review).toBeUndefined()
    expect(node.softwareVersion).toBeUndefined()
  }

  const software = graph['@graph'].find((node) => node['@type'] === 'SoftwareApplication')
  expect(software.url).toBe(homepageUrl)
  expect(software.offers.url).toBe(pricingUrl)
  expect(software.offers.priceSpecification).toHaveLength(2)

  const website = graph['@graph'].find((node) => node['@type'] === 'WebSite')
  expect(website.url).toBe(homepageUrl)
}

test('createHomepageLdJsonGraph matches homepage structured data policy', () => {
  const graph = createHomepageLdJsonGraph(mockConfig, {
    description: 'Build Capacitor apps with AI and ship updates instantly.',
    homepageUrl: 'https://capgo.app/',
    inLanguage: 'en',
    applicationSubCategory: 'Build Capacitor apps with AI, ship updates instantly',
    featureList: homepageFeatureList,
    offers: homepageOffers,
  })

  expectHomepageGraph(graph, 'https://capgo.app/')
})

test('createHomepageLdJsonGraph uses locale homepage URLs for translated homepages', () => {
  const graph = createHomepageLdJsonGraph(mockConfig, {
    description: 'Créez des apps Capacitor avec votre agent IA.',
    homepageUrl: 'https://capgo.app/fr/',
    inLanguage: 'fr',
    applicationSubCategory: 'Créez des apps Capacitor avec l’IA',
    featureList: homepageFeatureList,
    offers: {
      ...homepageOffers,
      url: 'https://capgo.app/fr/pricing/',
    },
  })

  expectHomepageGraph(graph, 'https://capgo.app/fr/', 'https://capgo.app/fr/pricing/')
  const website = graph['@graph'].find((node) => node['@type'] === 'WebSite')
  expect(website.inLanguage).toBe('fr')
})

test('createSoftwareApplicationLdJson resolves relative URLs and adds priceSpecification', () => {
  const app = createSoftwareApplicationLdJson(mockConfig, {
    name: 'Capgo',
    description: 'Live updates for Capacitor apps',
    url: '/',
    applicationCategory: 'DeveloperApplication',
    offers: {
      price: '14',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: '/pricing/',
      priceSpecifications: [
        { price: '14', billingPeriod: 'monthly' },
        { price: '146', billingPeriod: 'yearly' },
      ],
    },
  })

  expect(app.url).toBe('https://capgo.app/')
  expect(app.offers.url).toBe('https://capgo.app/pricing/')
  expect(app.offers.priceSpecification[0]).toMatchObject({ unitCode: 'MON', price: '14' })
})

test('createProductLdJson resolves relative product, offer, and image URLs', () => {
  const product = createProductLdJson(mockConfig, {
    name: 'Capgo',
    description: 'Live updates for Capacitor apps',
    url: '/pricing/',
    image: '/capgo_social.png',
    offers: [
      {
        name: 'Solo',
        price: '14',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: '/pricing/',
      },
    ],
  })

  expect(product.url).toBe('https://capgo.app/pricing/')
  expect(product.image).toBe('https://capgo.app/capgo_social.png')
  expect(product.offers[0].url).toBe('https://capgo.app/pricing/')
})

test('toLdJsonBlocks splits a @graph into typed blocks that keep their @id links', () => {
  const graph = createHomepageLdJsonGraph(mockConfig, {
    description: 'Capgo',
    homepageUrl: 'https://capgo.app/',
    inLanguage: 'en',
    applicationSubCategory: 'Live updates',
    featureList: ['Live updates'],
    offers: { price: '14', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://capgo.app/pricing/', priceSpecifications: [] },
  })
  const blocks = toLdJsonBlocks(graph)
  expect(blocks.length).toBe(graph['@graph'].length)
  for (const block of blocks) {
    expect(block['@context']).toBe('https://schema.org')
    expect(block['@type']).toBeTruthy()
    expect(block['@graph']).toBeUndefined()
  }
  expect(blocks.map((block) => block['@type'])).toEqual(expect.arrayContaining(['SoftwareApplication', 'Organization', 'WebSite']))
})

test('toLdJsonBlocks keeps standalone schemas and flattens arrays', () => {
  const article = createNewsArticleLdJson(mockConfig, articleOptions)
  expect(toLdJsonBlocks(article)).toEqual([{ '@context': 'https://schema.org', ...article }])
  expect(toLdJsonBlocks([article, createLdJsonGraph(mockConfig, article, { includeOrganization: true })])).toHaveLength(3)
  expect(toLdJsonBlocks(null)).toEqual([])
})
