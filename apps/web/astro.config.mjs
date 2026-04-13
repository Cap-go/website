import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import config from '../../configs.json'
import { buildSharedAstroBaseConfig, buildSharedIntegrations, buildSharedViteConfig } from '../shared/astro-config.mjs'
import { buildPluginIcons, getBuildConcurrency, getPageLastModDates, normalizeDirectoryPath } from '../shared/astro-utils.mjs'
import { defaultLocale, localeNames, locales } from './src/services/locale'

const CPU_COUNT = getBuildConcurrency()
const SRC_DIR = `${normalizeDirectoryPath(fileURLToPath(new URL('./src/', import.meta.url)))}/`
const PUBLIC_DIR = normalizeDirectoryPath(fileURLToPath(new URL('./public/', import.meta.url)))
const pageLastModDates = getPageLastModDates()
const pluginIcons = buildPluginIcons('src/config/plugins.ts')
const SITE_DOMAIN = process.env.BRANCH === 'development' ? config.base_domain.development : config.base_domain.prod
const I18N_MIDDLEWARE_SHIM = fileURLToPath(new URL('./src/lib/astro-i18n-aut-middleware.ts', import.meta.url))
const viteConfig = buildSharedViteConfig({
  srcDir: SRC_DIR,
  publicDir: PUBLIC_DIR,
  cpuCount: CPU_COUNT,
  ssrNoExternal: ['astro-i18n-aut', 'astro-i18n-aut/middleware'],
})

viteConfig.resolve.alias.push({
  find: 'astro-i18n-aut/middleware',
  replacement: I18N_MIDDLEWARE_SHIM,
})

export default defineConfig({
  ...buildSharedAstroBaseConfig({
    siteDomain: SITE_DOMAIN,
    locales,
    defaultLocale,
    cpuCount: CPU_COUNT,
    build: {
      output: 'static',
    },
  }),
  integrations: buildSharedIntegrations({
    pluginIcons,
    defaultLocale,
    localeNames,
    pageLastModDates,
  }),
  vite: viteConfig,
})
