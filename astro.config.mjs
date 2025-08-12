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
      destination: '/docs/plugins/updater/cloud-mode/getting-started/',
    },
    '/docs/plugins/updater/cloud-mode/getting-started/': {
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
      plugins: [starlightImageZoom({ showCaptions: false }), starlightLlmsTxt({
        projectName: 'capgo',
        description: 'Capgo is a platform for creating and managing Capacitorjs live app updates.',
        exclude: locales.map((locale) => `**/${locale}/**`),
      })],
      disable404Route: true,
      logo: { src: './logo.svg' },
      markdown: { headingLinks: false },
      customCss: ['./src/css/docs.css'],
      expressiveCode: { themes: ['github-dark'] },
      editLink: { baseUrl: 'https://github.com/Cap-go/website/edit/main/' },
      components: {
        Head: './src/components/doc/Head.astro',
        Search: './src/components/doc/Search.astro',
        LanguageSelect: './src/components/doc/LanguageSelect.astro',
      },
      social: [
        { icon: 'discord', label: 'Discord', href: 'https://discord.capgo.app' },
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
          label: 'Plugins',
          collapsed: true,
          items: [
            { label: 'Getting Started', link: '/docs/plugins/' },
            {
              label: 'Updater',
              collapsed: true,
              items: [
                { label: 'Plugin Overview', link: '/docs/plugins/updater/overview' },
                { label: 'Events', link: '/docs/plugins/updater/events' },
                { label: 'API Reference', link: '/docs/plugins/updater/api' },
                { label: 'Configuration', link: '/docs/plugins/updater/settings' },
                { label: 'Known Issues', link: '/docs/plugins/updater/known-issues' },
                { label: 'Debugging', link: '/docs/plugins/updater/debugging' },
                { label: 'Cordova Migration', link: '/docs/plugins/updater/cordova' },
                {
                  label: 'Local Development',
                  collapsed: true,
                  autogenerate: { directory: '/docs/plugins/updater/local-dev' },
                },
                {
                  label: 'Self-Hosting',
                  items: [
                    { label: 'Getting Started', link: '/docs/plugins/updater/self-hosted/getting-started' },
                    { label: 'Auto Update', link: '/docs/plugins/updater/self-hosted/auto-update' },
                    { label: 'Manual Update', link: '/docs/plugins/updater/self-hosted/manual-update' },
                    { label: 'Encrypted Bundles', link: '/docs/plugins/updater/self-hosted/encrypted-bundles' },
                    { label: 'Update API Endpoint', link: '/docs/plugins/updater/self-hosted/handling-updates' },
                    { label: 'Statistics API Endpoint', link: '/docs/plugins/updater/self-hosted/handling-stats' },
                    { label: 'Channel API Endpoint', link: '/docs/plugins/updater/self-hosted/handling-channels' },
                  ],
                  collapsed: true,
                },
                {
                  label: 'Migrations',
                  collapsed: true,
                  autogenerate: { directory: 'docs/upgrade' },
                },
              ],
            },

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
              collapsed: true,
            },
            {
              label: 'Native Market',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-market/' },
                { label: 'Getting started', link: '/docs/plugins/native-market/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Biometric',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-biometric/' },
                { label: 'Getting started', link: '/docs/plugins/native-biometric/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Camera Preview',
              items: [
                { label: 'Overview', link: '/docs/plugins/camera-preview/' },
                { label: 'Getting started', link: '/docs/plugins/camera-preview/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Uploader',
              items: [
                { label: 'Overview', link: '/docs/plugins/uploader/' },
                { label: 'Getting started', link: '/docs/plugins/uploader/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Flash',
              items: [
                { label: 'Overview', link: '/docs/plugins/flash/' },
                { label: 'Getting started', link: '/docs/plugins/flash/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Screen Recorder',
              items: [
                { label: 'Overview', link: '/docs/plugins/screen-recorder/' },
                { label: 'Getting started', link: '/docs/plugins/screen-recorder/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Crisp',
              items: [
                { label: 'Overview', link: '/docs/plugins/crisp/' },
                { label: 'Getting started', link: '/docs/plugins/crisp/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Geocoder',
              items: [
                { label: 'Overview', link: '/docs/plugins/nativegeocoder/' },
                { label: 'Getting started', link: '/docs/plugins/nativegeocoder/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'InAppBrowser',
              items: [
                { label: 'Overview', link: '/docs/plugins/inappbrowser/' },
                { label: 'Getting started', link: '/docs/plugins/inappbrowser/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Mute',
              items: [
                { label: 'Overview', link: '/docs/plugins/mute/' },
                { label: 'Getting started', link: '/docs/plugins/mute/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Audio',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-audio/' },
                { label: 'Getting started', link: '/docs/plugins/native-audio/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: '👋 Get a custom plugin',
              link: '/consulting/',
            },
          ],
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
          label: 'How to get support',
          link: '/docs/getting-help/',
        },
        {
          label: '💬 Consult us',
          link: '/consulting/',
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
