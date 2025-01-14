import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import UnoCSS from '@unocss/astro'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'
import config from './configs.json'
import { pwa } from './src/config/pwa'
import { defaultLocale, locales, localeNames } from './src/services/locale'
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: `https://${config.base_domain.prod}`,
  trailingSlash: "always",
  build: {
    format: "directory",
    concurrency: 2
  },
  redirects: {
    '/docs/getting-started/': {
      status: 302,
      destination: '/docs/plugin/cloud-mode/getting-started/',
    },
  },
  i18n: {
    locales,
    defaultLocale,
    fallback: locales
      .filter((i) => i !== defaultLocale)
      .reduce((r, h) => {
        r[h] = defaultLocale
        return r
      }, {}),
    routing: {
      redirectToDefaultLocale: true,
    },
  },
  integrations: [    
    i18n({
      locales: localeNames,
      defaultLocale,
      redirectDefaultLocale: true,
      exclude: ["pages/**/*.json.ts"]
    }),
    UnoCSS({ injectReset: true }),
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
    AstroPWA(pwa),
    starlight({
      title: 'Capgo',
      favicon: '/favicon.svg',
      logo: { src: './logo.svg' },
      customCss: ['./src/css/global.css'],
      components: {
        LanguageSelect: './src/components/LanguageSelect.astro',
      },
      editLink: {
        baseUrl: 'https://github.com/Cap-go/website/edit/main/',
      },
      social: {
        discord: 'https://discord.com/invite/VnYRvBfgA6',
        github: 'https://github.com/Cap-go/',
      },
      sidebar: [
        {
          label: 'Home',
          link: '/docs/',
        },
        {
          label: 'Getting Started',
          link: '/docs/plugin/cloud-mode/getting-started/',
        },
        {
          label: 'General Information',
          link: '/docs/general-information/',
        },
        {
          label: 'Plugin',
          items: [
            { label: 'Overview', link: '/docs/plugin/overview' },
            {
              label: 'Cloud Mode',
              items: [
                { label: 'Getting Started', link: '/docs/plugin/cloud-mode/getting-started' },
                { label: 'Auto Update', link: '/docs/plugin/cloud-mode/auto-update' },
                { label: 'Channel System', link: '/docs/plugin/cloud-mode/channel-system' },
                { label: 'Hybrid Update', link: '/docs/plugin/cloud-mode/hybrid-update' },
                { label: 'Manual Update', link: '/docs/plugin/cloud-mode/manual-update' },
              ],
              collapsed: true,
            },
            {
              label: 'Self Hosted',
              items: [
                { label: 'Getting Started', link: '/docs/plugin/self-hosted/getting-started' },
                { label: 'Contributing', link: '/docs/plugin/self-hosted/contributing' },
                { label: 'Auto Update', link: '/docs/plugin/self-hosted/auto-update' },
                { label: 'Manual Update', link: '/docs/plugin/self-hosted/manual-update' },
                { label: 'Encrypted Bundles', link: '/docs/plugin/self-hosted/encrypted-bundles' },
                { label: 'Handling Updates', link: '/docs/plugin/self-hosted/handling-updates' },
                { label: 'Handling Stats', link: '/docs/plugin/self-hosted/handling-stats' },
                { label: 'Local Development', autogenerate: { directory: 'docs/plugin/self-hosted/local-dev' }, collapsed: true },
              ],
              collapsed: true,
            },
            { label: 'Plugin methods', link: '/docs/plugin/api' },
            { label: 'Known Issues', link: '/docs/plugin/known-issues' },
            { label: 'Cordova', link: '/docs/plugin/cordova' },
            { label: 'Settings', link: '/docs/plugin/settings' },
            { label: 'Statistics', link: '/docs/plugin/statistics-api' },
            { label: 'Debugging', link: '/docs/plugin/debugging' },
            {
              label: 'Migrations',
              collapsed: true,
              autogenerate: { directory: 'docs/upgrade' },
            },
          ],
        },
        {
          label: 'CLI',
          collapsed: true,
          items: [
            { label: 'Commands', link: '/docs/cli/commands' },
            {
              label: 'Migrations',
              collapsed: true,
              autogenerate: { directory: 'docs/cli/migrations' },
            },
          ],
        },
        {
          label: 'Public API',
          collapsed: true,
          items: [{ label: 'Endpoints', link: '/docs/public-api/endpoints' }],
        },
        {
          label: 'Web app',
          collapsed: true,
          autogenerate: { directory: 'docs/webapp' },
        },
        {
          label: 'How To',
          link: '/docs/how-to/',
        },
        {
          label: 'FAQ',
          link: '/docs/faq/',
        },
        {
          label: 'Tooling',
          collapsed: true,
          autogenerate: { directory: 'docs/tooling' },
        },
        {
          label: 'How to get support',
          link: '/docs/getting-help/',
        },
      ],
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },
})
