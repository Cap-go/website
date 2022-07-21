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
    return `http://${getRightKey('development', 'base_domain')}`
}

export default defineNuxtConfig({
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
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/content', '@nuxtjs/supabase'],
  buildModules: ['nuxt-windicss'],
  css: ['@/assets/css/main.css'],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
})
