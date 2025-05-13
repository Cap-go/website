import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { filterSitemapByDefaultLocale, i18n } from 'astro-i18n-aut/integration'
import { defineConfig, envField } from 'astro/config'
import starlightImageZoom from 'starlight-image-zoom'
import starlightLlmsTxt from 'starlight-llms-txt'
import config from './configs.json'
import { defaultLocale, localeNames, locales } from './src/services/locale'

export default defineConfig({
  trailingSlash: 'always',
  site: `https://${config.base_domain.prod}`,
  build: {
    concurrency: 2,
  },
  env: {
    validateSecrets: true,
    schema: {
      ORAMA_CLOUD_ENDPOINT: envField.string({
        context: 'client',
        access: 'public',
        optional: import.meta.env.DEV,
      }),
      ORAMA_CLOUD_API_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: import.meta.env.DEV,
      }),
    },
  },
  redirects: {
    '/docs/getting-started/': {
      status: 302,
      destination: '/docs/plugin/cloud-mode/getting-started/',
    },
    '/docs/plugin/cloud-mode/getting-started/': {
      status: 302,
      destination: '/docs/getting-started/quickstart',
    },
  },
  plugins: [
    paraglideVitePlugin({
      outdir: './src/paraglide',
      project: './project.inlang',
      disableAsyncLocalStorage: true,
    }),
  ],
  i18n: {
    locales,
    defaultLocale,
    // fallback: locales
    //   .filter((i) => i !== defaultLocale)
    //   .reduce((r, h) => {
    //     r[h] = defaultLocale
    //     return r
    //   }, {})
    routing: {
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    i18n({
      locales: localeNames,
      defaultLocale,
      redirectDefaultLocale: true,
      exclude: ['pages/**/*.json.ts'],
    }),
    sitemap({
      i18n: {
        defaultLocale,
        locales: localeNames,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
    starlight({
      title: 'Capgo',
      plugins: [starlightImageZoom({ showCaptions: false }), starlightLlmsTxt()],
      disable404Route: true,
      logo: { src: './logo.svg' },
      markdown: { headingLinks: false },
      customCss: ['./src/css/docs.css'],
      expressiveCode: { themes: ['github-dark'] },
      editLink: { baseUrl: 'https://github.com/Cap-go/website/edit/main/' },
      components: {
        LanguageSelect: './src/components/LanguageSelect.astro',
        Search: './src/components/doc/Search.astro',
      },
      social: [
        { icon: 'discord', label: 'Discord', href: 'https://discord.com/invite/VnYRvBfgA6' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Cap-go/' },
      ],
      sidebar: [
        {
          label: 'Welcome to Capgo',
          link: '/docs/',
        },
        {
          label: 'Quickstart',
          collapsed: false,
          autogenerate: { directory: 'docs/getting-started' },
        },
        {
          label: 'Capgo CLI',
          collapsed: true,
          items: [
            { label: 'Overview', link: '/docs/cli/overview' },
            {
              label: 'Command reference',
              collapsed: false,
              autogenerate: { directory: 'docs/cli/reference' },
            },
            {
              label: 'Migrations',
              collapsed: true,
              autogenerate: { directory: 'docs/cli/migrations' },
            },
          ],
        },
        {
          label: 'Live Updates',
          collapsed: true,
          autogenerate: { directory: 'docs/live-updates' },
        },
        {
          label: 'Public API',
          collapsed: true,
          autogenerate: { directory: 'docs/public-api' },
        },
        {
          label: 'Web app',
          collapsed: true,
          autogenerate: { directory: 'docs/webapp' },
        },
        {
          label: 'Plugins',
          collapsed: true,
          items: [
            {
              label: 'Updater',
              collapsed: true,
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
                { label: 'Options', link: '/docs/plugin/settings' },
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
              label: 'Other Plugins',
              collapsed: true,
              items: [
                {
                  label: 'Social Login',
                  items: [
                    { label: 'Overview', link: '/docs/plugins/social-login/' },
                    { label: 'Getting started', link: '/docs/plugins/social-login/getting-started' },
                    { label: 'Google', autogenerate: { directory: 'docs/plugins/social-login/google' } },
                    { label: 'Apple', autogenerate: { directory: 'docs/plugins/social-login/apple' } },
                    { label: 'Facebook', link: '/docs/plugins/social-login/facebook' },
                    { label: 'Migrations', autogenerate: { directory: 'docs/plugins/social-login/migrations' } },
                  ],
                },
              ],
            },
          ],
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
  vite: {
    plugins: [tailwindcss()],
  },
})
