import { defineNuxtConfig } from 'nuxt/config'
import keys from './configs.json'

const getRightKey = (branch: string, keyname: 'base_domain' | 'supa_anon' | 'supa_url'): string => {
  if (branch === 'development')
    return keys[keyname].development
  else if (branch === 'local')
    return keys[keyname].local
  return keys[keyname].prod
}

const getUrl = (branch = ''): string => {
  if (branch === 'local')
    return `http://${getRightKey(branch, 'base_domain')}`
  else if (branch === 'development')
    return `https://${getRightKey(branch, 'base_domain')}`
  else
    return `https://${getRightKey('prod', 'base_domain')}`
}

const baseDomain = (branch = '') => {
  if (branch)
    return getRightKey(branch, 'base_domain')
  else
    return getRightKey('prod', 'base_domain')
}

const name = 'Capgo - Capacitor Live update'
const description = 'Send and manage Realtime update for your capacitor app without store hassle, 5 min to install Over-the-Air (OTA) updates in your app. Use channels to send updates to specific users or groups of users.'
// <script type="application/ld+json" class="yoast-schema-graph">
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${getUrl(process.env.BRANCH)}/#website`,
      'url': getUrl(process.env.BRANCH),
      'name': name,
      'isPartOf': {
        '@id': `${getUrl(process.env.BRANCH)}/#website`,
      },
      'datePublished': '2022-01-30T22:51:56+00:00',
      'dateModified': new Date().toISOString(),
      'description': description,
      'breadcrumb': {
        '@id': `${getUrl(process.env.BRANCH)}/#breadcrumb`,
      },
      'inLanguage': 'en-US',
      'potentialAction': [
        {
          '@type': 'ReadAction',
          'target': [
            getUrl(process.env.BRANCH),
          ],
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${getUrl(process.env.BRANCH)}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@type': 'WebPage',
            '@id': `${getUrl(process.env.BRANCH)}/`,
            'url': `${getUrl(process.env.BRANCH)}/`,
            'name': 'Home',
          },
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'WebPage',
            '@id': `${getUrl(process.env.BRANCH)}/blog/`,
            'url': `${getUrl(process.env.BRANCH)}/blog/`,
            'name': 'Blog',
          },
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'WebPage',
            '@id': `${getUrl(process.env.BRANCH)}/app_mobile/`,
            'url': `${getUrl(process.env.BRANCH)}/app_mobile/`,
            'name': 'App',
          },
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'WebPage',
            '@id': `${getUrl(process.env.BRANCH)}/pricing/`,
            'url': `${getUrl(process.env.BRANCH)}/pricing/`,
            'name': 'Pricing',
          },
        },
      ],
    },
  ],
}

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify-edge',
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
  runtimeConfig: {
    public: {
      brand: 'Capgo',
      baseUrl: getUrl(process.env.BRANCH),
      domain: baseDomain(),
      crisp: 'e7dbcfa4-91b1-4b74-b563-b9234aeb2eee',
      handler: 'capgo',
    },
    supa_anon: `${getRightKey(process.env.BRANCH!, 'supa_anon')}`,
    supa_url: `${getRightKey(process.env.BRANCH!, 'supa_url')}`,
  },
  modules: ['@vueuse/nuxt', '@nuxt/content', '@unocss/nuxt', ['nuxt-jsonld', { disableOptionsAPI: true }]],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  unocss: {
    preflight: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: name,
      script: [
        {
          'src': 'https://pls.digitalshift-ee.workers.dev/js/script.js',
          'data-api': 'https://pls.digitalshift-ee.workers.dev/api/event',
          'data-domain': 'capgo.app',
          'async': true,
          'defer': true,
        },
        {
          hid: 'seo-schema-graph',
          type: 'application/ld+json',
          children: JSON.stringify(structuredData),
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'keywords',
          property: 'keywords',
          content: 'Capacitor, updater, OTA, autoupdate, capgo',
        },
        {
          hid: 'title',
          name: 'title',
          content: name,
        },
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: name,
        },
        { hid: 'theme-color', name: 'theme-color', content: '#456b9a' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: baseDomain(),
        },
        { hid: 'og:locale', property: 'og:locale', content: 'en_EN' },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: baseDomain(),
        },
        {
          hid: 'og:article:author',
          property: 'og:article:author',
          content: 'Martin DONADIEU',
        },
        {
          hid: 'twitter:app:id:iphone',
          property: 'twitter:app:id:iphone',
          content: name,
        },
        {
          hid: 'twitter:app:id:googleplay',
          property: 'twitter:app:id:googleplay',
          content: 'ee.forgr.capgo',
        },
        {
          hid: 'twitter:app:name:iphone',
          property: 'twitter:app:name:iphone',
          content: name,
        },
        {
          hid: 'twitter:app:name:googleplay',
          property: 'twitter:app:name:googleplay',
          content: 'ee.forgr.capgo',
        },
        {
          hid: 'twitter:creator',
          property: 'twitter:creator',
          content: '@martindonadieu',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  content: {
    highlight: {
      theme: 'monokai',
      preload: ['js', 'ts', 'json', 'shell', 'toml'],
    },
  },
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['@headlessui/vue', '@heroicons/vue'],
  },

})

// export default defineNuxtConfig({
//   modules: ['@nuxt/content'],
// })
