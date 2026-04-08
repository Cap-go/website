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

export default defineConfig({
  ...buildSharedAstroBaseConfig({
    siteDomain: config.base_domain.prod,
    locales,
    defaultLocale,
    cpuCount: CPU_COUNT,
  }),
  integrations: buildSharedIntegrations({
    pluginIcons,
    defaultLocale,
    localeNames,
    pageLastModDates,
  }),
  vite: buildSharedViteConfig({
    srcDir: SRC_DIR,
    publicDir: PUBLIC_DIR,
    cpuCount: CPU_COUNT,
  }),
})
