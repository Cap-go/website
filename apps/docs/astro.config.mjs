import { unified } from '@astrojs/markdown-remark'
import starlight from '@astrojs/starlight'
import starlightDocSearch from '@astrojs/starlight-docsearch'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import starlightLlmsTxt from 'starlight-llms-txt'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import config from '../../configs.json'
import { buildSharedAstroBaseConfig, buildSharedIntegrations, buildSharedViteConfig } from '../shared/astro-config.mjs'
import { buildPluginIcons, getBuildConcurrency, getPageLastModDates, normalizeDirectoryPath } from '../shared/astro-utils.mjs'
import { docsLlmsCustomSets } from './src/config/llmsCustomSets'
import { docsSidebar } from './src/config/sidebar.mjs'
import { defaultLocale } from './src/services/locale'

const CPU_COUNT = getBuildConcurrency()
const SRC_DIR = `${normalizeDirectoryPath(fileURLToPath(new URL('./src/', import.meta.url)))}/`
const PUBLIC_DIR = normalizeDirectoryPath(fileURLToPath(new URL('./public/', import.meta.url)))
const WEB_PLUGIN_CONFIG = fileURLToPath(new URL('../web/src/config/plugins.ts', import.meta.url))

const pageLastModDates = getPageLastModDates()
const pluginIcons = buildPluginIcons(WEB_PLUGIN_CONFIG)
const SITE_DOMAIN = process.env.BRANCH === 'development' ? config.base_domain.development : config.base_domain.prod

export default defineConfig({
  ...buildSharedAstroBaseConfig({
    siteDomain: SITE_DOMAIN,
    defaultLocale,
    cpuCount: CPU_COUNT,
    build: {
      output: 'static',
      assets: '_docs',
    },
  }),
  redirects: {
    '/docs/getting-started/': {
      status: 301,
      destination: '/docs/getting-started/quickstart/',
    },
    '/docs/plugins/updater/cloud-mode/getting-started/': {
      status: 301,
      destination: '/docs/getting-started/quickstart/',
    },
    '/docs/plugins/updater/commonProblems/': {
      status: 301,
      destination: '/docs/plugins/updater/commonproblems/',
    },
  },
  markdown: {
    processor: unified({ gfm: true, smartypants: true }),
  },
  integrations: [
    ...buildSharedIntegrations({
      pluginIcons,
      pageLastModDates,
    }),
    starlight({
      title: 'Capgo',
      pagefind: false,
      prerender: true,
      plugins: [
        starlightDocSearch({
          appId: 'R0TIQUJRSN',
          apiKey: '039b8d50eaa068b9ff8726d912c6f388',
          indexName: 'capgo',
        }),
        starlightLlmsTxt({
          customSets: docsLlmsCustomSets,
          details: 'The canonical source documentation is English. Translated language paths are served at request time by the Capgo edge translation worker.',
        }),
      ],
      disable404Route: true,
      logo: {
        src: '~public/capgo_logo.webp',
        alt: 'Capgo - Live Updates for Capacitor Apps',
        replacesTitle: true,
      },
      markdown: { headingLinks: true },
      customCss: ['./src/css/docs.css'],
      expressiveCode: { themes: ['github-dark'] },
      editLink: { baseUrl: 'https://github.com/Cap-go/website/edit/main/apps/docs/' },
      components: {
        Head: './src/components/doc/Head.astro',
        LanguageSelect: './src/components/doc/LanguageSelect.astro',
        PageTitle: './src/components/doc/PageTitle.astro',
      },
      social: [
        { icon: 'discord', label: 'Discord', href: 'https://discord.capgo.app' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Cap-go/' },
      ],
      sidebar: docsSidebar,
    }),
  ],
  vite: buildSharedViteConfig({
    srcDir: SRC_DIR,
    publicDir: PUBLIC_DIR,
    cpuCount: CPU_COUNT,
    assetsDir: '_docs',
    optimizeDepsInclude: ['mermaid'],
    extraPlugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'src/content/docs/**/*.{md,mdx}',
            dest: '',
            rename: (fileName, _, fullPath) => {
              // Extract relative path after 'src/content/docs/'
              const relativePath = fullPath.replaceAll('\\', '/').split('src/content/docs/')[1]
              let pathWithoutExt = relativePath
              if (relativePath.endsWith('.mdx')) pathWithoutExt = relativePath.slice(0, -4)
              else if (relativePath.endsWith('.md')) pathWithoutExt = relativePath.slice(0, -3)
              const segments = pathWithoutExt.split('/')

              // Handle index files
              if (fileName === 'index') {
                if (segments.length === 1) {
                  return 'index.md'
                }
                // Remove 'index' from the end and use parent folder name
                segments.pop()
                return `${segments.join('/')}.md`
              }

              // Regular files - preserve directory structure
              return `${pathWithoutExt}.md`
            },
          },
        ],
      }),
    ],
  }),
})
