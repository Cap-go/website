import { defineNuxtConfig } from 'nuxt'
import keys from './configs.json'

const getRightKey = (branch: string, keyname: 'base_domain' | 'supa_anon' | 'supa_url'): string => {
  if (branch === 'local')
    return keys[keyname].local
  else if (branch === 'main')
    return keys[keyname].prod
  return keys[keyname].development
}

const getUrl = (branch = ''): string => {
  if (branch === 'local')
    return `http://${getRightKey(branch, 'base_domain')}`
  else if (branch === 'main')
    return `https://${getRightKey('prod', 'base_domain')}`
  else
    return `https://${getRightKey('development', 'base_domain')}`
}

export default defineNuxtConfig({
  target: 'static',
  ssr: true,
  generate: {
    fallback: 'true',
  },
  runtimeConfig: {
    public: {
      brand: 'Capgo',
      domain: `${getUrl(process.env.BRANCH)}`,
      crisp: 'e7dbcfa4-91b1-4b74-b563-b9234aeb2eee',
    },
    supa_anon: `${getRightKey(process.env.BRANCH!, 'supa_anon')}`,
    supa_url: `${getRightKey(process.env.BRANCH!, 'supa_url')}`,
  },
  supabase: {
    url: `${getRightKey(process.env.BRANCH!, 'supa_url')}`,
    key: `${getRightKey(process.env.BRANCH!, 'supa_anon')}`,
  },
  modules: ['@vueuse/nuxt', '@nuxt/content', '@nuxtjs/supabase', '@unocss/nuxt', '@nuxtjs/algolia'],
  algolia: {
    apiKey: 'e2b0d6f907e5e4c17d81d43b91a45b62',
    applicationId: 'I0XZYAJ1M3',
    globalIndex: 'dev_capgo',
    docSearch: {
      indexName: 'dev_capgo',
    },
  },
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  unocss: {
    preflight: true,
  },
  css: ['~/assets/css/main.css'],
  build: {
    extractCSS: true,
    transpile: ['@headlessui/vue', '@heroicons/vue'],
  },

})
