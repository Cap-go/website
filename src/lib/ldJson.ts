import type { RuntimeConfig } from '@/config/app'
import type {
  Organization,
  Person,
  NewsArticle,
  WebPage,
  SoftwareApplication,
  Product,
  Service,
  FAQPage,
  WebSite,
  ItemList,
  BreadcrumbList,
  WithContext,
  Graph,
  Thing,
} from 'schema-dts'

// Re-export schema-dts types for external use
export type { Organization, Person, NewsArticle, WebPage, SoftwareApplication, Product, Service, FAQPage, WebSite, ItemList, BreadcrumbList, WithContext, Graph, Thing }

// Type for standalone schemas with @context
export type LdJsonType = WithContext<Organization | Person | NewsArticle | WebPage | SoftwareApplication | Product | Service | FAQPage | WebSite | ItemList | BreadcrumbList>

// Type for graph items (Thing without @context requirement)
export type GraphItem = Thing

/**
 * Create a complete Organization schema for Capgo
 */
export function createCapgoOrganization(config: RuntimeConfig['public']): Organization {
  return {
    '@type': 'Organization',
    '@id': `${config.baseUrl}/#organization`,
    name: 'Capgo',
    url: config.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${config.baseUrl}/icon.webp`,
      contentUrl: `${config.baseUrl}/icon.webp`,
      width: '512',
      height: '512',
    },
    sameAs: ['https://twitter.com/Capgo_app', 'https://github.com/Cap-go', 'https://www.linkedin.com/company/capgo'],
    description: config.blog_description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: 'support@capgo.app',
    },
  }
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
    operatingSystem?: string
    softwareVersion?: string
    downloadUrl?: string
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
    }
    offers?: {
      price: string
      priceCurrency: string
      availability: string
    }
  },
): SoftwareApplication {
  const app: SoftwareApplication = {
    '@type': 'SoftwareApplication',
    '@id': `${options.url}#softwareapplication`,
    name: options.name,
    description: options.description,
    url: options.url,
    image: options.image || `${config.baseUrl}/capgo_social.png`,
    applicationCategory: options.applicationCategory,
  }

  if (options.operatingSystem) app.operatingSystem = options.operatingSystem
  if (options.softwareVersion) app.softwareVersion = options.softwareVersion
  if (options.downloadUrl) app.downloadUrl = options.downloadUrl
  if (options.aggregateRating) {
    app.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: options.aggregateRating.ratingValue,
      reviewCount: options.aggregateRating.reviewCount,
    }
  }
  if (options.offers) {
    app.offers = {
      '@type': 'Offer',
      price: options.offers.price,
      priceCurrency: options.offers.priceCurrency,
      availability: options.offers.availability as 'https://schema.org/InStock' | 'https://schema.org/OutOfStock',
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
      price: string
      priceCurrency: string
      availability: string
      priceValidUntil?: string
    }[]
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
    }
  },
): Product {
  const product: Product = {
    '@type': 'Product',
    '@id': `${options.url}#product`,
    name: options.name,
    description: options.description,
    url: options.url,
    image: options.image || `${config.baseUrl}/capgo_social.png`,
    brand: {
      '@type': 'Brand',
      name: options.brand || 'Capgo',
    },
    offers: options.offers.map((offer) => ({
      '@type': 'Offer' as const,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: offer.availability as 'https://schema.org/InStock' | 'https://schema.org/OutOfStock',
      priceValidUntil: offer.priceValidUntil,
    })),
  }

  if (options.sku) product.sku = options.sku
  if (options.aggregateRating) {
    product.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: options.aggregateRating.ratingValue,
      reviewCount: options.aggregateRating.reviewCount,
    }
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
  const organization = createCapgoOrganization(config)

  return {
    '@type': 'Service',
    '@id': `${options.url}#service`,
    name: options.name,
    description: options.description,
    url: options.url,
    serviceType: options.serviceType,
    provider: organization,
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
 * Create a WebPage schema
 */
export function createWebPageLdJson(
  _config: RuntimeConfig['public'],
  options: {
    name: string
    description: string
    url: string
  },
): WebPage {
  return {
    '@type': 'WebPage',
    '@id': `${options.url}#webpage`,
    name: options.name,
    description: options.description,
    url: options.url,
  }
}

/**
 * Create a WebSite schema for the homepage with optional search action
 */
export function createWebSiteLdJson(
  config: RuntimeConfig['public'],
  options?: {
    hasSearchAction?: boolean
    searchUrl?: string
  },
): WebSite {
  const schema: WebSite = {
    '@type': 'WebSite',
    '@id': `${config.baseUrl}/#website`,
    url: config.baseUrl,
    name: config.brand,
    description: config.blog_description,
    inLanguage: 'en',
  }

  if (options?.hasSearchAction && options.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: options.searchUrl,
    }
  }

  return schema
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
    const breadcrumb: BreadcrumbList = {
      '@type': 'BreadcrumbList',
      '@id': `${config.baseUrl}/#breadcrumb`,
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
