import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { filterSitemapByDefaultLocale, i18n } from 'astro-i18n-aut/integration'
import icon from 'astro-icon'
import { defineConfig, sessionDrivers } from 'astro/config'
import { fileURLToPath } from 'node:url'
import config from '../../configs.json'
import { buildPluginIcons, getBuildConcurrency, getPageLastModDates, normalizeDirectoryPath } from '../shared/astro-utils.mjs'
import { defaultLocale, localeNames, locales } from './src/services/locale'

const CPU_COUNT = getBuildConcurrency()
const SRC_DIR = `${normalizeDirectoryPath(fileURLToPath(new URL('./src/', import.meta.url)))}/`
const PUBLIC_DIR = normalizeDirectoryPath(fileURLToPath(new URL('./public/', import.meta.url)))
const pageLastModDates = getPageLastModDates()
const pluginIcons = buildPluginIcons('src/config/plugins.ts')

export default defineConfig({
  trailingSlash: 'always',
  site: `https://${config.base_domain.prod}`,
  output: 'server',
  adapter: cloudflare(),
  session: {
    driver: sessionDrivers.null(),
  },
  i18n: {
    locales,
    defaultLocale,
    routing: {
      redirectToDefaultLocale: false,
    },
  },
  build: {
    concurrency: CPU_COUNT,
    compressHTML: false,
    inlineStylesheets: 'auto',
  },
  integrations: [
    icon({
      include: {
        heroicons: pluginIcons,
      },
    }),
    i18n({
      locales: localeNames,
      defaultLocale,
      redirectDefaultLocale: true,
      exclude: ['pages/**/*.json.ts', 'pages/api/**/*.ts'],
    }),
    sitemap({
      i18n: {
        defaultLocale,
        locales: localeNames,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const urlPath = new URL(item.url).pathname
        const lastmod = pageLastModDates.get(urlPath)
        if (lastmod) {
          item.lastmod = lastmod.toISOString()
        }
        return item
      },
    }),
  ],
  server: {
    port: 3000,
    open: false,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    open: false,
    host: '0.0.0.0',
  },
  vite: {
    resolve: {
      alias: [
        { find: '@', replacement: SRC_DIR.slice(0, -1) },
        { find: '~public', replacement: PUBLIC_DIR },
        { find: /^\/src\//, replacement: SRC_DIR },
      ],
    },
    build: {
      target: 'es2022',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      minify: 'esbuild',
      cssMinify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
        maxParallelFileOps: CPU_COUNT * 3,
      },
    },
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        outdir: './src/paraglide',
        project: '../../project.inlang',
        disableAsyncLocalStorage: true,
      }),
    ],
  },
})
