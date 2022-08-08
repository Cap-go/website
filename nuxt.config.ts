import { defineNuxtConfig } from 'nuxt'
import keys from './configs.json'

const getRightKey = (branch: string, keyname: 'base_domain' | 'supa_anon' | 'supa_url'): string => {
  if (branch === 'main')
    return keys[keyname].prod
  return keys[keyname].development
}

const getUrl = (branch = ''): string => {
  if (branch === 'main')
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
  modules: ['@vueuse/nuxt', '@nuxt/content', '@unocss/nuxt'],
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
