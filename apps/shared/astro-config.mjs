import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { filterSitemapByDefaultLocale, i18n } from 'astro-i18n-aut/integration'
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

export function buildSharedAstroBaseConfig({ siteDomain, locales, defaultLocale, cpuCount, build = {} }) {
  const { output = 'server', ...buildOptions } = build
  const baseConfig = {
    trailingSlash: 'always',
    site: `https://${siteDomain}`,
    output,
    i18n: {
      locales,
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

export function buildSharedIntegrations({ pluginIcons, defaultLocale, localeNames, pageLastModDates }) {
  return [
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
        return withSitemapLastMod(item, pageLastModDates)
      },
    }),
  ]
}

export function buildSharedViteConfig({ srcDir, publicDir, cpuCount, optimizeDepsInclude = [], extraPlugins = [], ssrNoExternal }) {
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
          manualChunks: undefined,
        },
        maxParallelFileOps: cpuCount * 3,
      },
    },
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        outdir: './src/paraglide',
        project: '../../project.inlang',
        disableAsyncLocalStorage: true,
      }),
      ...extraPlugins,
    ],
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
