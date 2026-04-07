import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { filterSitemapByDefaultLocale, i18n } from 'astro-i18n-aut/integration'
import icon from 'astro-icon'
import { defineConfig, sessionDrivers } from 'astro/config'
import { glob } from 'glob'
import { readFileSync, statSync } from 'node:fs'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import config from '../../configs.json'
import { defaultLocale, localeNames, locales } from './src/services/locale'

const AVAILABLE_PARALLELISM = typeof os.availableParallelism === 'function' ? os.availableParallelism() : os.cpus().length
const BUILD_CONCURRENCY = Number.parseInt(process.env.BUILD_CONCURRENCY ?? '', 10)
const CPU_COUNT = Number.isFinite(BUILD_CONCURRENCY) && BUILD_CONCURRENCY > 0 ? BUILD_CONCURRENCY : AVAILABLE_PARALLELISM
const SRC_DIR = `${fileURLToPath(new URL('./src/', import.meta.url))
  .replace(/\\/g, '/')
  .replace(/\/$/, '')}/`
const PUBLIC_DIR = fileURLToPath(new URL('./public/', import.meta.url)).replace(/\\/g, '/').replace(/\/$/, '')

function getPageLastModDates() {
  const lastModMap = new Map()

  const blogFiles = glob.sync('src/content/blog/**/*.md')
  for (const file of blogFiles) {
    const content = readFileSync(file, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) continue

    const frontmatter = frontmatterMatch[1]
    const updatedAtMatch = frontmatter.match(/updated_at:\s*(.+)/)
    const slugMatch = frontmatter.match(/slug:\s*(.+)/)
    if (!updatedAtMatch || !slugMatch) continue

    const slug = slugMatch[1].trim()
    const updatedAt = updatedAtMatch[1].trim()
    lastModMap.set(`/blog/${slug}`, new Date(updatedAt))
    lastModMap.set(`/blog/${slug}/`, new Date(updatedAt))
  }

  const pageFiles = glob.sync('src/pages/**/*.astro')
  for (const file of pageFiles) {
    const stat = statSync(file)
    let urlPath = file.replace('src/pages', '').replace('/index.astro', '/').replace('.astro', '/')
    if (!urlPath.endsWith('/')) urlPath += '/'
    if (!lastModMap.has(urlPath)) {
      lastModMap.set(urlPath, stat.mtime)
    }
  }

  return lastModMap
}

const pageLastModDates = getPageLastModDates()
const toHeroiconName = (value) =>
  `${value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
    .toLowerCase()}-solid`
const pluginIcons = [
  ...new Set(['arrow-up-right-solid', ...[...readFileSync('src/config/plugins.ts', 'utf8').matchAll(/icon:\s*'([^']+)'/g)].map(([, iconName]) => toHeroiconName(iconName))]),
].sort()

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
