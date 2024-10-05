import { appDescription, appName } from '@/constants/index'
import dayjs from 'dayjs'
import keys from '../../configs.json'

function getRightKey(branch: string, keyname: 'base_domain'): string {
  if (branch === 'development') return keys[keyname].development
  else if (branch === 'local') return keys[keyname].local
  return keys[keyname].prod
}

const brand = 'Capgo'
const blogTitle = `${brand} | Capacitor Blog`
const blogDescription = 'The best articles to enhance your Capacitor app. Do more with Capacitor and Capgo. Learn how to build a modern app with Capacitor.'

function getUrl(branch = ''): string {
  if (branch === 'local') return `http://${getRightKey(branch, 'base_domain')}`
  else if (branch === 'development') return `https://${getRightKey(branch, 'base_domain')}`
  else return `https://${getRightKey('prod', 'base_domain')}`
}

function getApiUrl(branch = ''): string {
  if (branch === 'local') return `http://api.${getRightKey(branch, 'base_domain')}`
  else if (branch === 'development') return `https:///api.${getRightKey(branch, 'base_domain')}`
  else return `https:///api.${getRightKey('prod', 'base_domain')}`
}

export function baseDomain(branch = '') {
  if (branch) return getRightKey(branch, 'base_domain')
  else return getRightKey('prod', 'base_domain')
}

export function formatTime(s: string) {
  // use dayjs to parse dd-mm-yyyy
  const d = dayjs(s, 'YYYY-MM-DD')
  return d.format('MMMM DD, YYYY')
}

export function useRuntimeConfig() {
  return {
    public: {
      brand,
      blog_title: blogTitle,
      blog_description: blogDescription,
      baseUrl: getUrl(import.meta.env.BRANCH),
      baseApiUrl: getApiUrl(import.meta.env.BRANCH),
    },
  }
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${getUrl(import.meta.env.BRANCH)}/#website`,
      url: getUrl(import.meta.env.BRANCH),
      name: appName,
      isPartOf: {
        '@id': `${getUrl(import.meta.env.BRANCH)}/#website`,
      },
      datePublished: '2022-01-30T22:51:56+00:00',
      dateModified: new Date().toISOString(),
      description: appDescription,
      breadcrumb: {
        '@id': `${getUrl(import.meta.env.BRANCH)}/#breadcrumb`,
      },
      inLanguage: 'en-US',
      potentialAction: [
        {
          '@type': 'ReadAction',
          target: [getUrl(import.meta.env.BRANCH)],
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${getUrl(import.meta.env.BRANCH)}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'WebPage',
            '@id': `${getUrl(import.meta.env.BRANCH)}/`,
            url: `${getUrl(import.meta.env.BRANCH)}/`,
            name: 'Home',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'WebPage',
            '@id': `${getUrl(import.meta.env.BRANCH)}/blog/`,
            url: `${getUrl(import.meta.env.BRANCH)}/blog/`,
            name: 'Blog',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'WebPage',
            '@id': `${getUrl(import.meta.env.BRANCH)}/app_mobile/`,
            url: `${getUrl(import.meta.env.BRANCH)}/app_mobile/`,
            name: 'App',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'WebPage',
            '@id': `${getUrl(import.meta.env.BRANCH)}/pricing/`,
            url: `${getUrl(import.meta.env.BRANCH)}/pricing/`,
            name: 'Pricing',
          },
        },
      ],
    },
  ],
}
