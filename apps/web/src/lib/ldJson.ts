import type { RuntimeConfig } from '@/config/app'
import type {
  AggregateRating,
  BreadcrumbList,
  FAQPage,
  Graph,
  HowTo,
  ItemList,
  NewsArticle,
  Organization,
  Person,
  Product,
  Review,
  Service,
  SoftwareApplication,
  Thing,
  WebPage,
  WebSite,
  WithContext,
} from 'schema-dts'
import { CAPGO_LEGAL_NAME, CAPGO_POSTAL_ADDRESS } from '../../../shared/agentDiscovery'

// Re-export schema-dts types for external use
export type {
  BreadcrumbList,
  FAQPage,
  Graph,
  HowTo,
  ItemList,
  NewsArticle,
  Organization,
  Person,
  Product,
  Review,
  Service,
  SoftwareApplication,
  Thing,
  WebPage,
  WebSite,
  WithContext,
}

export type ProductReviewInput = {
  author: string
  reviewBody: string
  ratingValue: number
}

function createReviewsLdJson(reviews: ProductReviewInput[]): Review[] {
  return reviews.map((review) => ({
    '@type': 'Review' as const,
    reviewBody: review.reviewBody,
    author: {
      '@type': 'Person' as const,
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
  }))
}

function createAggregateRatingLdJson(reviews: ProductReviewInput[]): AggregateRating {
  const reviewCount = reviews.length
  const ratingValue = Number((reviews.reduce((sum, review) => sum + review.ratingValue, 0) / reviewCount).toFixed(1))

  return {
    '@type': 'AggregateRating' as const,
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  }
}

// Type for standalone schemas with @context
export type LdJsonType = WithContext<Organization | Person | NewsArticle | WebPage | SoftwareApplication | Product | Service | FAQPage | WebSite | ItemList | BreadcrumbList>

// Type for graph items (Thing without @context requirement)
export type GraphItem = Thing

const SCHEMA_ORG_CONTEXT = 'https://schema.org' as const

export const CAPGO_ORGANIZATION_DESCRIPTION = 'Capgo: push fixes to your Capacitor users in minutes, build signed iOS and Android apps without a Mac, and roll back in one click'

export function capgoOrganizationId(baseUrl: string): string {
  return `${baseUrl}/#organization`
}

function resolveLdJsonAbsoluteUrl(baseUrl: string, value: string): string {
  if (/^https?:\/\//i.test(value)) return value
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return new URL(value, normalizedBase).toString()
}

/**
 * Ensure ld+json has schema.org @context before serialization.
 * Handles standalone schemas, @graph bundles, and arrays.
 */
export function ensureLdJsonContext(data: unknown): unknown {
  if (data == null || typeof data !== 'object') return data

  if (Array.isArray(data)) return data.map((item) => ensureLdJsonContext(item))

  const obj = data as Record<string, unknown>
  if (obj['@context']) return data

  return {
    '@context': SCHEMA_ORG_CONTEXT,
    ...obj,
  }
}

/**
 * Split ld+json into standalone blocks, one per entity, each with its own @context.
 * A single @graph block is valid JSON-LD, but many crawlers and agent scanners only read
 * the top-level @type, so they see no types at all. @id references still link the blocks.
 */
export function toLdJsonBlocks(data: unknown): unknown[] {
  if (data == null || typeof data !== 'object') return []
  if (Array.isArray(data)) return data.flatMap((item) => toLdJsonBlocks(item))

  const obj = data as Record<string, unknown>
  if (Array.isArray(obj['@graph'])) {
    const { '@graph': graph, '@context': context = SCHEMA_ORG_CONTEXT } = obj
    return (graph as unknown[]).filter((node) => node && typeof node === 'object').map((node) => ({ '@context': context, ...(node as object) }))
  }
  return [ensureLdJsonContext(obj)]
}

/**
 * Create a complete Organization schema for Capgo
 */
export function createCapgoOrganization(config: RuntimeConfig['public']): Organization {
  return {
    '@type': 'Organization',
    '@id': `${config.baseUrl}/#organization`,
    name: 'Capgo',
    legalName: CAPGO_LEGAL_NAME,
    alternateName: ['Capgo.app', 'Capgo Live Updates'],
    url: config.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${config.baseUrl}/capgo.webp`,
      contentUrl: `${config.baseUrl}/capgo.webp`,
      width: '1024',
      height: '1024',
    },
    sameAs: ['https://twitter.com/Capgo_app', 'https://github.com/Cap-go', 'https://www.linkedin.com/company/capgo'],
    description: CAPGO_ORGANIZATION_DESCRIPTION,
    email: 'support@capgo.app',
    address: CAPGO_POSTAL_ADDRESS,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: 'support@capgo.app',
      url: `${config.baseUrl}/contact/`,
      availableLanguage: ['English'],
    },
  }
}

export function createAboutOrganization(config: RuntimeConfig['public'], founder: Person): Thing {
  return Object.assign(createCapgoOrganization(config), {
    founder,
    foundingDate: '2022-12-01',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 10,
    },
    location: {
      '@type': 'Place',
      name: 'Madeira, Portugal',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '32.6669',
        longitude: '-16.9241',
      },
    },
    knowsAbout: ['Capacitor Development', 'Mobile App Updates', 'Over-the-Air Updates', 'JavaScript', 'TypeScript', 'iOS Development', 'Android Development'],
  }) as unknown as Thing
}

/**
 * Create a Person schema for blog authors
 */
export function createPersonLdJson(name: string, url?: string, image?: string, jobTitle?: string): Person {
  const person: Person = {
    '@type': 'Person',
    name,
  }

  if (url) person.url = url
  if (image) person.image = image
  if (jobTitle) person.jobTitle = jobTitle

  return person
}

/**
 * Create a NewsArticle schema for blog posts
 */
export function createNewsArticleLdJson(
  config: RuntimeConfig['public'],
  options: {
    title: string
    description: string
    url: string
    image?: string[]
    datePublished: string
    dateModified: string
    author: string
    authorUrl?: string
    authorImage?: string
    keywords?: string[]
    articleSection?: string
    articleBody?: string
    locale?: string
  },
): NewsArticle {
  const organization = createCapgoOrganization(config)

  const article: NewsArticle = {
    '@type': 'NewsArticle',
    '@id': `${options.url}#newsarticle`,
    url: options.url,
    headline: options.title,
    description: options.description,
    image: options.image || [`${config.baseUrl}/capgo_social.png`],
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    inLanguage: options.locale || 'en',
    articleBody: options.articleBody || '',
    author: createPersonLdJson(options.author, options.authorUrl, options.authorImage),
    publisher: organization,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': options.url,
    },
  }

  if (options.keywords) article.keywords = options.keywords.join(', ')
  if (options.articleSection) article.articleSection = options.articleSection

  return article
}

/**
 * Create a SoftwareApplication schema for plugins/tools
 */
export function createSoftwareApplicationLdJson(
  config: RuntimeConfig['public'],
  options: {
    name: string
    description: string
    url: string
    image?: string
    applicationCategory: string
    applicationSubCategory?: string
    featureList?: string[]
    operatingSystem?: string
    softwareVersion?: string
    downloadUrl?: string
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
    }
    reviews?: ProductReviewInput[]
    offers?: {
      price: string
      priceCurrency: string
      availability: string
      url?: string
      priceSpecifications?: Array<{
        price: string
        billingPeriod: 'monthly' | 'yearly'
      }>
    }
  },
): SoftwareApplication {
  const appUrl = resolveLdJsonAbsoluteUrl(config.baseUrl, options.url)
  const appImage = resolveLdJsonAbsoluteUrl(config.baseUrl, options.image || '/capgo_social.png')

  const app: SoftwareApplication = {
    '@type': 'SoftwareApplication',
    '@id': `${appUrl}#softwareapplication`,
    name: options.name,
    description: options.description,
    url: appUrl,
    image: appImage,
    applicationCategory: options.applicationCategory,
  }

  if (options.applicationSubCategory) app.applicationSubCategory = options.applicationSubCategory
  if (options.featureList?.length) app.featureList = options.featureList
  if (options.operatingSystem) app.operatingSystem = options.operatingSystem
  if (options.softwareVersion) app.softwareVersion = options.softwareVersion
  if (options.downloadUrl) app.downloadUrl = resolveLdJsonAbsoluteUrl(config.baseUrl, options.downloadUrl)
  if (options.reviews?.length) app.review = createReviewsLdJson(options.reviews)
  if (options.aggregateRating) {
    app.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: options.aggregateRating.ratingValue,
      reviewCount: options.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  } else if (options.reviews?.length) {
    app.aggregateRating = createAggregateRatingLdJson(options.reviews)
  }
  if (options.offers) {
    const priceSpecifications = options.offers.priceSpecifications?.map((spec) => ({
      '@type': 'UnitPriceSpecification' as const,
      price: spec.price,
      priceCurrency: options.offers!.priceCurrency,
      ...(spec.billingPeriod === 'monthly' ? { billingDuration: 1, unitCode: 'MON' as const } : { billingDuration: 1, unitCode: 'ANN' as const }),
    }))

    const offerUrl = options.offers.url ? resolveLdJsonAbsoluteUrl(config.baseUrl, options.offers.url) : appUrl

    app.offers = {
      '@type': 'Offer',
      url: offerUrl,
      price: options.offers.price,
      priceCurrency: options.offers.priceCurrency,
      availability: options.offers.availability as 'https://schema.org/InStock' | 'https://schema.org/OutOfStock',
      ...(priceSpecifications?.length ? { priceSpecification: priceSpecifications } : {}),
    }
  }

  return app
}

/**
 * Create a Product schema for pricing plans
 */
export function createProductLdJson(
  config: RuntimeConfig['public'],
  options: {
    name: string
    description: string
    url: string
    image?: string
    sku?: string
    brand?: string
    offers: {
      name?: string
      url?: string
      price?: string
      priceCurrency: string
      availability: string
      priceValidUntil?: string
      priceSpecifications?: Array<{
        price: string
        billingPeriod: 'monthly' | 'yearly'
      }>
    }[]
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
    }
    reviews?: ProductReviewInput[]
  },
): Product {
  const productUrl = resolveLdJsonAbsoluteUrl(config.baseUrl, options.url)
  const productImage = resolveLdJsonAbsoluteUrl(config.baseUrl, options.image || '/capgo_social.png')

  const product: Product = {
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: options.name,
    description: options.description,
    url: productUrl,
    image: productImage,
    brand: {
      '@type': 'Brand',
      name: options.brand || 'Capgo',
    },
    offers: options.offers.map((offer) => {
      const priceSpecifications = offer.priceSpecifications?.map((spec) => ({
        '@type': 'UnitPriceSpecification' as const,
        price: spec.price,
        priceCurrency: offer.priceCurrency,
        ...(spec.billingPeriod === 'monthly' ? { billingDuration: 1, unitCode: 'MON' as const } : { billingDuration: 1, unitCode: 'ANN' as const }),
      }))

      const primaryPrice = offer.price ?? offer.priceSpecifications?.[0]?.price

      const offerUrl = resolveLdJsonAbsoluteUrl(config.baseUrl, offer.url ?? options.url)

      return {
        '@type': 'Offer' as const,
        ...(offer.name ? { name: offer.name } : {}),
        url: offerUrl,
        ...(primaryPrice ? { price: primaryPrice } : {}),
        priceCurrency: offer.priceCurrency,
        availability: offer.availability as 'https://schema.org/InStock' | 'https://schema.org/OutOfStock',
        priceValidUntil: offer.priceValidUntil,
        ...(priceSpecifications?.length ? { priceSpecification: priceSpecifications } : {}),
      }
    }),
  }

  if (options.sku) product.sku = options.sku
  if (options.reviews?.length) {
    product.review = createReviewsLdJson(options.reviews)
  }
  if (options.aggregateRating) {
    product.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: options.aggregateRating.ratingValue,
      reviewCount: options.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  } else if (options.reviews?.length) {
    product.aggregateRating = createAggregateRatingLdJson(options.reviews)
  }

  return product
}

/**
 * Create a Service schema for Capgo services
 */
export function createServiceLdJson(
  config: RuntimeConfig['public'],
  options: {
    name: string
    description: string
    url: string
    serviceType: string
    areaServed?: string[]
  },
): Service {
  const serviceUrl = resolveLdJsonAbsoluteUrl(config.baseUrl, options.url)

  return {
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: options.name,
    description: options.description,
    url: serviceUrl,
    serviceType: options.serviceType,
    provider: {
      '@id': capgoOrganizationId(config.baseUrl),
    },
    areaServed: options.areaServed,
  }
}

/**
 * Create a FAQPage schema for FAQ sections
 */
export function createFAQPageLdJson(
  _config: RuntimeConfig['public'],
  options: {
    url: string
    questions: Array<{
      question: string
      answer: string
    }>
  },
): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': `${options.url}#faqpage`,
    url: options.url,
    mainEntity: options.questions.map((q) => ({
      '@type': 'Question' as const,
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: q.answer,
      },
    })),
  }
}

/**
 * Create a HowTo schema for step-by-step tool and setup guides
 */
export function createHowToLdJson(
  _config: RuntimeConfig['public'],
  options: {
    url: string
    name: string
    description: string
    totalTime?: string
    tools?: string[]
    steps: Array<{
      name: string
      text: string
    }>
  },
): HowTo {
  const howTo: HowTo = {
    '@type': 'HowTo',
    '@id': `${options.url}#howto`,
    name: options.name,
    description: options.description,
    step: options.steps.map((step, index) => ({
      '@type': 'HowToStep' as const,
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${options.url}#step-${index + 1}`,
    })),
  }

  if (options.totalTime) howTo.totalTime = options.totalTime
  if (options.tools?.length) {
    howTo.tool = options.tools.map((name) => ({ '@type': 'HowToTool' as const, name }))
  }

  return howTo
}

/**
 * Create a WebPage schema
 */
export function createWebPageLdJson(
  _config: RuntimeConfig['public'],
  options: {
    name: string
    description: string
    url: string
    datePublished?: string
    dateModified?: string
    inLanguage?: string
  },
): WebPage {
  const page: WebPage = {
    '@type': 'WebPage',
    '@id': `${options.url}#webpage`,
    name: options.name,
    description: options.description,
    url: options.url,
  }

  if (options.datePublished) page.datePublished = options.datePublished
  if (options.dateModified) page.dateModified = options.dateModified
  if (options.inLanguage) page.inLanguage = options.inLanguage

  return page
}

/**
 * Create a WebSite schema for the homepage with optional search action
 */
export function createWebSiteLdJson(
  config: RuntimeConfig['public'],
  options?: {
    url?: string
    hasSearchAction?: boolean
    searchUrl?: string
    inLanguage?: string
  },
): WebSite {
  const siteUrl = resolveLdJsonAbsoluteUrl(config.baseUrl, options?.url ?? config.baseUrl)

  const schema: WebSite = {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: config.brand,
    description: CAPGO_ORGANIZATION_DESCRIPTION,
    inLanguage: options?.inLanguage || 'en',
  }

  if (options?.hasSearchAction && options.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: options.searchUrl,
    }
  }

  return schema
}

export type HomepageLdJsonOffers = {
  price: string
  priceCurrency: string
  availability: string
  url: string
  priceSpecifications: Array<{
    price: string
    billingPeriod: 'monthly' | 'yearly'
  }>
}

/**
 * Structured data graph for the marketing homepage (one SoftwareApplication, WebSite, Organization).
 */
export function createHomepageLdJsonGraph(
  config: RuntimeConfig['public'],
  options: {
    description: string
    homepageUrl: string
    inLanguage: string
    applicationSubCategory: string
    featureList: string[]
    offers: HomepageLdJsonOffers
  },
): Graph {
  const capgoSoftware = createSoftwareApplicationLdJson(config, {
    name: config.brand,
    description: options.description,
    url: options.homepageUrl,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: options.applicationSubCategory,
    operatingSystem: 'iOS, Android',
    featureList: options.featureList,
    offers: options.offers,
  })

  return createLdJsonGraph(config, capgoSoftware, {
    includeOrganization: true,
    additionalEntities: [createWebSiteLdJson(config, { url: options.homepageUrl, inLanguage: options.inLanguage })],
  })
}

/**
 * Create an ItemList schema for ranking/list pages
 */
export function createItemListLdJson(
  _config: RuntimeConfig['public'],
  options: {
    url: string
    name: string
    description?: string
    items: Array<{
      name: string
      url?: string
      image?: string
      description?: string
    }>
  },
): ItemList {
  return {
    '@type': 'ItemList',
    '@id': `${options.url}#itemlist`,
    url: options.url,
    name: options.name,
    description: options.description,
    itemListElement: options.items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      item: {
        '@type': 'Thing' as const,
        name: item.name,
        url: item.url,
        image: item.image,
        description: item.description,
      },
    })),
  }
}

/**
 * Create a complete ldJSON graph with organization and webpage
 */
export function createLdJsonGraph(
  config: RuntimeConfig['public'],
  mainEntity: Thing,
  options?: {
    includeOrganization?: boolean
    includeBreadcrumbs?: boolean
    breadcrumbs?: Array<{ name: string; url: string }>
    breadcrumbId?: string
    additionalEntities?: Thing[]
  },
): Graph {
  const graph: Thing[] = []

  // Add main entity
  graph.push(mainEntity)

  // Add organization if requested
  if (options?.includeOrganization) {
    graph.push(createCapgoOrganization(config))
  }

  // Add breadcrumbs if requested
  if (options?.includeBreadcrumbs && options.breadcrumbs) {
    const breadcrumbPageUrl = options.breadcrumbId ?? options.breadcrumbs[options.breadcrumbs.length - 1]?.url ?? config.baseUrl
    const breadcrumb: BreadcrumbList = {
      '@type': 'BreadcrumbList',
      '@id': `${breadcrumbPageUrl}#breadcrumb`,
      itemListElement: options.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem' as const,
        position: index + 1,
        item: {
          '@type': 'WebPage' as const,
          '@id': crumb.url,
          url: crumb.url,
          name: crumb.name,
        },
      })),
    }
    graph.push(breadcrumb)
  }

  // Add any additional entities
  if (options?.additionalEntities) {
    graph.push(...options.additionalEntities)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

/**
 * Validate ldJSON structure (basic validation)
 * Note: With schema-dts types, most validation happens at compile time
 */
export function validateLdJson(data: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    errors.push('ldJSON data is null or not an object')
    return { isValid: false, errors }
  }

  const obj = data as Record<string, unknown>

  if (!obj['@context'] && !obj['@graph']) {
    errors.push('Missing @context field')
  } else if (obj['@context'] && obj['@context'] !== 'https://schema.org') {
    errors.push('Invalid @context - should be https://schema.org')
  }

  if (!obj['@type'] && !obj['@graph']) {
    errors.push('Missing @type field')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
