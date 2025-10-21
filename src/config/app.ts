import { appDescription } from '@/constants/index'
import { createLdJsonGraph, createServiceLdJson } from '@/lib/ldJson'
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
  return `https://${getRightKey('prod', 'base_domain')}`
}

function getApiUrl(branch = ''): string {
  if (branch === 'local') return `http://api.${getRightKey(branch, 'base_domain')}`
  else if (branch === 'development') return `https:///api.${getRightKey(branch, 'base_domain')}`
  return `https:///api.${getRightKey('prod', 'base_domain')}`
}

export function baseDomain(branch = '') {
  if (branch) return getRightKey(branch, 'base_domain')
  return getRightKey('prod', 'base_domain')
}

export function formatTime(s: string) {
  // use dayjs to parse dd-mm-yyyy
  const d = dayjs(s, 'YYYY-MM-DD')
  return d.format('MMMM DD, YYYY')
}

export interface RuntimeConfig {
  public: {
    brand: string
    blog_title: string
    blog_description: string
    blog_keywords: string
    baseUrl: string
    baseApiUrl: string
  }
}

export function useRuntimeConfig(): RuntimeConfig {
  return {
    public: {
      brand,
      blog_title: blogTitle,
      blog_description: blogDescription,
      blog_keywords: 'Learning Capacitor, Capacitor updates, OTA updates, mobile app development, update strategy, developer tools',
      baseUrl: getUrl(import.meta.env.BRANCH),
      baseApiUrl: getApiUrl(import.meta.env.BRANCH),
    },
  }
}

// Create the main service ldJSON for Capgo
const capgoService = createServiceLdJson(
  {
    brand: 'Capgo',
    blog_title: blogTitle,
    blog_description: blogDescription,
    blog_keywords: 'Capacitor, Live Updates, Mobile App Development, OTA Updates',
    baseUrl: getUrl(import.meta.env.BRANCH),
    baseApiUrl: getApiUrl(import.meta.env.BRANCH),
  },
  {
    name: 'Capgo - Live Updates for Capacitor',
    description: appDescription,
    url: getUrl(import.meta.env.BRANCH),
    serviceType: 'Software Development Service',
    areaServed: ['Worldwide'],
  },
)

// Create comprehensive ldJSON graph
export const structuredData = createLdJsonGraph(
  {
    brand: 'Capgo',
    blog_title: blogTitle,
    blog_description: blogDescription,
    blog_keywords: 'Capacitor, Live Updates, Mobile App Development, OTA Updates',
    baseUrl: getUrl(import.meta.env.BRANCH),
    baseApiUrl: getApiUrl(import.meta.env.BRANCH),
  },
  capgoService,
  {
    includeOrganization: true,
    includeBreadcrumbs: true,
    breadcrumbs: [
      {
        name: 'Home',
        url: getUrl(import.meta.env.BRANCH),
      },
      {
        name: 'Blog',
        url: `${getUrl(import.meta.env.BRANCH)}/blog/`,
      },
      {
        name: 'Mobile App',
        url: `${getUrl(import.meta.env.BRANCH)}/app_mobile/`,
      },
      {
        name: 'Pricing',
        url: `${getUrl(import.meta.env.BRANCH)}/pricing/`,
      },
    ],
  },
)
