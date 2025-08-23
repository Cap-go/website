import type { RuntimeConfig } from '@/config/app'

export interface BaseLdJson {
  '@context': string
  '@type': string
  '@id'?: string
  url?: string
  name?: string
  description?: string
  image?: string[]
  datePublished?: string
  dateModified?: string
  inLanguage?: string
}

export interface OrganizationLdJson extends BaseLdJson {
  '@type': 'Organization'
  name: string
  url: string
  logo?: {
    '@type': 'ImageObject'
    url: string
    width?: number
    height?: number
  }
  sameAs?: string[]
  contactPoint?: {
    '@type': 'ContactPoint'
    contactType: string
    email?: string
    telephone?: string
  }
}

export interface PersonLdJson extends BaseLdJson {
  '@type': 'Person'
  name: string
  url?: string
  sameAs?: string[]
  jobTitle?: string
  worksFor?: OrganizationLdJson
}

export interface NewsArticleLdJson extends BaseLdJson {
  '@type': 'NewsArticle'
  headline: string
  articleBody: string
  articleSection?: string[]
  keywords?: string[]
  author: PersonLdJson | PersonLdJson[]
  publisher: OrganizationLdJson
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  wordCount?: number
  timeRequired?: string
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
  }
}

export interface WebPageLdJson extends BaseLdJson {
  '@type': 'WebPage'
  headline?: string
  mainEntityOfPage?: {
    '@type': 'WebPage'
    '@id': string
  }
}

export interface SoftwareApplicationLdJson extends BaseLdJson {
  '@type': 'SoftwareApplication'
  applicationCategory: string
  operatingSystem?: string
  softwareVersion?: string
  downloadUrl?: string
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
  }
  offers?: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
    priceValidUntil?: string
  }
}

export interface ProductLdJson extends BaseLdJson {
  '@type': 'Product'
  brand?: OrganizationLdJson
  sku?: string
  mpn?: string
  offers: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
    priceValidUntil?: string
    url?: string
  }[]
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
  }
}

export interface ServiceLdJson extends BaseLdJson {
  '@type': 'Service'
  serviceType: string
  provider: OrganizationLdJson
  areaServed?: string[]
  hasOfferCatalog?: {
    '@type': 'OfferCatalog'
    name: string
    itemListElement: {
      '@type': 'Offer'
      itemOffered: {
        '@type': 'Service'
        name: string
        description?: string
      }
      priceSpecification: {
        '@type': 'PriceSpecification'
        price: string
        priceCurrency: string
      }
    }[]
  }
}

export type LdJsonType =
  | NewsArticleLdJson
  | WebPageLdJson
  | SoftwareApplicationLdJson
  | ProductLdJson
  | ServiceLdJson
  | OrganizationLdJson

/**
 * Create a complete Organization schema for Capgo
 */
export function createCapgoOrganization(config: RuntimeConfig['public']): OrganizationLdJson {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${config.baseUrl}/#organization`,
    name: 'Capgo',
    url: config.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${config.baseUrl}/icon.webp`,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://twitter.com/Capgo_app',
      'https://github.com/Cap-go',
      'https://www.linkedin.com/company/capgo',
    ],
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
export function createPersonLdJson(
  name: string,
  url?: string,
  image?: string,
  jobTitle?: string
): PersonLdJson {
  const person: PersonLdJson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
  }

  if (url) person.url = url
  if (image) person.image = [image]
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
    articleSection?: string[]
    articleBody?: string
    locale?: string
  }
): NewsArticleLdJson {
  const organization = createCapgoOrganization(config)

  const article: NewsArticleLdJson = {
    '@context': 'https://schema.org',
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

  if (options.keywords) article.keywords = options.keywords
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
  }
): SoftwareApplicationLdJson {
  const app: SoftwareApplicationLdJson = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${options.url}#softwareapplication`,
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: options.applicationCategory,
  }

  if (options.operatingSystem) app.operatingSystem = options.operatingSystem
  if (options.softwareVersion) app.softwareVersion = options.softwareVersion
  if (options.downloadUrl) app.downloadUrl = options.downloadUrl
  if (options.aggregateRating) app.aggregateRating = {
    '@type': 'AggregateRating',
    ...options.aggregateRating,
  }
  if (options.offers) app.offers = {
    '@type': 'Offer',
    ...options.offers,
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
  }
): ProductLdJson {
  const organization = createCapgoOrganization(config)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${options.url}#product`,
    name: options.name,
    description: options.description,
    url: options.url,
    brand: options.brand ? {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: options.brand,
      url: options.url,
    } : organization,
    sku: options.sku,
    offers: options.offers.map(offer => ({
      '@type': 'Offer',
      ...offer,
    })),
    aggregateRating: options.aggregateRating ? {
      '@type': 'AggregateRating',
      ...options.aggregateRating,
    } : undefined,
  }
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
  }
): ServiceLdJson {
  const organization = createCapgoOrganization(config)

  return {
    '@context': 'https://schema.org',
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
 * Validate ldJSON structure
 */
export function validateLdJson(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data) {
    errors.push('ldJSON data is null or undefined')
    return { isValid: false, errors }
  }

  if (!data['@context']) {
    errors.push('Missing @context field')
  } else if (data['@context'] !== 'https://schema.org') {
    errors.push('Invalid @context - should be https://schema.org')
  }

  if (!data['@type']) {
    errors.push('Missing @type field')
  }

  // Type-specific validation
  switch (data['@type']) {
    case 'NewsArticle':
      if (!data.headline) errors.push('NewsArticle missing headline')
      if (!data.author) errors.push('NewsArticle missing author')
      if (!data.publisher) errors.push('NewsArticle missing publisher')
      break

    case 'SoftwareApplication':
      if (!data.name) errors.push('SoftwareApplication missing name')
      if (!data.applicationCategory) errors.push('SoftwareApplication missing applicationCategory')
      break

    case 'Product':
      if (!data.name) errors.push('Product missing name')
      if (!data.offers) errors.push('Product missing offers')
      break

    case 'Organization':
      if (!data.name) errors.push('Organization missing name')
      break
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Create a complete ldJSON graph with organization and webpage
 */
export function createLdJsonGraph(
  config: RuntimeConfig['public'],
  mainEntity: LdJsonType,
  options?: {
    includeOrganization?: boolean
    includeBreadcrumbs?: boolean
    breadcrumbs?: Array<{ name: string; url: string }>
  }
) {
  const graph: any[] = []

  // Add main entity
  graph.push(mainEntity)

  // Add organization if requested
  if (options?.includeOrganization) {
    graph.push(createCapgoOrganization(config))
  }

  // Add breadcrumbs if requested
  if (options?.includeBreadcrumbs && options.breadcrumbs) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${config.baseUrl}/#breadcrumb`,
      itemListElement: options.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          '@id': crumb.url,
          url: crumb.url,
          name: crumb.name,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
