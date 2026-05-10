import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { sessionDrivers } from 'astro/config'

const sharedServerOptions = {
  port: 3000,
  open: false,
  host: '0.0.0.0',
}

function withSitemapLastMod(item, pageLastModDates) {
  const urlPath = new URL(item.url).pathname
  const lastmod = pageLastModDates.get(urlPath)
  if (lastmod) {
    item.lastmod = lastmod.toISOString()
  }
  return item
}

export function buildSharedAstroBaseConfig({ siteDomain, defaultLocale, cpuCount, build = {} }) {
  const { output = 'server', ...buildOptions } = build
  const baseConfig = {
    trailingSlash: 'always',
    site: `https://${siteDomain}`,
    output,
    i18n: {
      locales: [defaultLocale],
      defaultLocale,
      routing: {
        redirectToDefaultLocale: false,
      },
    },
    build: {
      concurrency: cpuCount,
      compressHTML: false,
      inlineStylesheets: 'auto',
      ...buildOptions,
    },
    server: { ...sharedServerOptions },
    preview: { ...sharedServerOptions },
  }

  if (output === 'server') {
    baseConfig.adapter = cloudflare()
    baseConfig.session = {
      driver: sessionDrivers.null(),
    }
  }

  return baseConfig
}

export function buildSharedIntegrations({ pluginIcons, pageLastModDates }) {
  return [
    icon({
      include: {
        heroicons: pluginIcons,
      },
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        return withSitemapLastMod(item, pageLastModDates)
      },
    }),
  ]
}

function assetBasename(value) {
  const normalized = (value || 'asset').replaceAll('\\', '/')
  const fileName = normalized.split('/').pop() || 'asset'
  const extIndex = fileName.lastIndexOf('.')
  return extIndex > 0 ? fileName.slice(0, extIndex) : fileName
}

function sanitizeAssetBasename(value) {
  return (
    assetBasename(value)
      .replace(/@_@astro/gi, '-astro')
      .replace(/[^A-Za-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'asset'
  )
}

function buildAssetFileNames(assetsDir) {
  return (assetInfo) => {
    const rawName = assetInfo.name || assetInfo.names?.[0] || 'asset'
    const safeName = sanitizeAssetBasename(rawName)
    const isCss = rawName.toLowerCase().endsWith('.css')

    if (isCss && safeName === 'global') return `${assetsDir}/global[extname]`
    if (isCss) return `${assetsDir}/${safeName}.[hash][extname]`

    return `${assetsDir}/${safeName}.[hash][extname]`
  }
}

export function buildSharedViteConfig({ srcDir, publicDir, cpuCount, optimizeDepsInclude = [], extraPlugins = [], ssrNoExternal, assetsDir = '_astro' }) {
  const viteConfig = {
    resolve: {
      alias: [
        { find: '@', replacement: srcDir.slice(0, -1) },
        { find: '~public', replacement: publicDir },
        { find: /^\/src\//, replacement: srcDir },
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
          assetFileNames: buildAssetFileNames(assetsDir),
          manualChunks: undefined,
        },
        maxParallelFileOps: cpuCount * 3,
      },
    },
    plugins: [tailwindcss(), ...extraPlugins],
  }

  if (ssrNoExternal) {
    viteConfig.ssr = {
      noExternal: ssrNoExternal,
    }
  }

  if (optimizeDepsInclude.length > 0) {
    viteConfig.optimizeDeps = {
      include: optimizeDepsInclude,
    }
  }

  return viteConfig
}
