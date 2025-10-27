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
  output: 'static',
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
      plugins: [
        starlightImageZoom({ showCaptions: false }),
        starlightLlmsTxt({
          projectName: 'capgo',
          description: 'Capgo is a platform for creating and managing Capacitorjs live app updates.',
          exclude: locales.map((locale) => `${locale}/**`),
        }),
      ],
      disable404Route: true,
      logo: { src: '~public/logo.svg' },
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
                { label: 'Getting Started', link: '/docs/plugins/updater' },
                { label: 'Events', link: '/docs/plugins/updater/events' },
                { label: 'API Reference', link: '/docs/plugins/updater/api' },
                { label: 'Configuration', link: '/docs/plugins/updater/settings' },
                { label: 'notifyAppReady call placement', link: '/docs/plugins/updater/notify-app-ready' },
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
              label: 'Accelerometer',
              items: [
                { label: 'Overview', link: '/docs/plugins/accelerometer/' },
                { label: 'Getting started', link: '/docs/plugins/accelerometer/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'AdMob',
              items: [
                { label: 'Overview', link: '/docs/plugins/admob/' },
                { label: 'Getting started', link: '/docs/plugins/admob/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Age Signals',
              items: [
                { label: 'Overview', link: '/docs/plugins/age-signals/' },
                { label: 'Getting started', link: '/docs/plugins/age-signals/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Alarm',
              items: [{ label: 'Overview', link: '/docs/plugins/alarm/' }],
              collapsed: true,
            },
            {
              label: 'Android Inline Install',
              items: [{ label: 'Overview', link: '/docs/plugins/android-inline-install/' }],
              collapsed: true,
            },
            {
              label: 'Android Usage Stats',
              items: [{ label: 'Overview', link: '/docs/plugins/android-usagestatsmanager/' }],
              collapsed: true,
            },
            {
              label: 'AppInsights',
              items: [
                { label: 'Overview', link: '/docs/plugins/appinsights/' },
                { label: 'Getting started', link: '/docs/plugins/appinsights/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Audio Recorder',
              items: [
                { label: 'Overview', link: '/docs/plugins/audio-recorder/' },
                { label: 'Getting started', link: '/docs/plugins/audio-recorder/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Audio Session',
              items: [
                { label: 'Overview', link: '/docs/plugins/audiosession/' },
                { label: 'Getting started', link: '/docs/plugins/audiosession/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Autofill Save Password',
              items: [{ label: 'Overview', link: '/docs/plugins/autofill-save-password/' }],
              collapsed: true,
            },
            {
              label: 'Background Geolocation',
              items: [{ label: 'Overview', link: '/docs/plugins/background-geolocation/' }],
              collapsed: true,
            },
            {
              label: 'Barometer',
              items: [
                { label: 'Overview', link: '/docs/plugins/barometer/' },
                { label: 'Getting started', link: '/docs/plugins/barometer/getting-started' },
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
              label: 'Contacts',
              items: [
                { label: 'Overview', link: '/docs/plugins/contacts/' },
                { label: 'Getting started', link: '/docs/plugins/contacts/getting-started' },
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
              label: 'Data Storage SQLite',
              items: [
                { label: 'Overview', link: '/docs/plugins/data-storage-sqlite/' },
                { label: 'Getting started', link: '/docs/plugins/data-storage-sqlite/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Document Scanner',
              items: [
                { label: 'Overview', link: '/docs/plugins/document-scanner/' },
                { label: 'Getting started', link: '/docs/plugins/document-scanner/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Downloader',
              items: [{ label: 'Overview', link: '/docs/plugins/downloader/' }],
              collapsed: true,
            },
            {
              label: 'Env',
              items: [
                { label: 'Overview', link: '/docs/plugins/env/' },
                { label: 'Getting started', link: '/docs/plugins/env/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'FFmpeg',
              items: [
                { label: 'Overview', link: '/docs/plugins/ffmpeg/' },
                { label: 'Getting started', link: '/docs/plugins/ffmpeg/getting-started' },
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
              label: 'GTM',
              items: [{ label: 'Overview', link: '/docs/plugins/gtm/' }],
              collapsed: true,
            },
            {
              label: 'Health',
              items: [
                { label: 'Overview', link: '/docs/plugins/health/' },
                { label: 'Getting started', link: '/docs/plugins/health/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Home Indicator',
              items: [
                { label: 'Overview', link: '/docs/plugins/home-indicator/' },
                { label: 'Getting started', link: '/docs/plugins/home-indicator/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'iBeacon',
              items: [
                { label: 'Overview', link: '/docs/plugins/ibeacon/' },
                { label: 'Getting started', link: '/docs/plugins/ibeacon/getting-started' },
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
              label: 'Is Root',
              items: [{ label: 'Overview', link: '/docs/plugins/is-root/' }],
              collapsed: true,
            },
            {
              label: 'IVS Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/ivs-player/' },
                { label: 'Getting started', link: '/docs/plugins/ivs-player/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'JW Player',
              items: [{ label: 'Overview', link: '/docs/plugins/jw-player/' }],
              collapsed: true,
            },
            {
              label: 'Launch Navigator',
              items: [{ label: 'Overview', link: '/docs/plugins/launch-navigator/' }],
              collapsed: true,
            },
            {
              label: 'Live Reload',
              items: [
                { label: 'Overview', link: '/docs/plugins/live-reload/' },
                { label: 'Getting started', link: '/docs/plugins/live-reload/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'LLM',
              items: [{ label: 'Overview', link: '/docs/plugins/llm/' }],
              collapsed: true,
            },
            {
              label: 'Media Session',
              items: [
                { label: 'Overview', link: '/docs/plugins/media-session/' },
                { label: 'Getting started', link: '/docs/plugins/media-session/getting-started' },
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
              label: 'Mux Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/mux-player/' },
                { label: 'Getting started', link: '/docs/plugins/mux-player/getting-started' },
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
              label: 'Native Biometric',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-biometric/' },
                { label: 'Getting started', link: '/docs/plugins/native-biometric/getting-started' },
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
              label: 'Native Market',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-market/' },
                { label: 'Getting started', link: '/docs/plugins/native-market/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Native Purchases',
              items: [
                { label: 'Overview', link: '/docs/plugins/native-purchases/' },
                { label: 'Getting started', link: '/docs/plugins/native-purchases/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Navigation Bar',
              items: [
                { label: 'Overview', link: '/docs/plugins/navigation-bar/' },
                { label: 'Getting started', link: '/docs/plugins/navigation-bar/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'NFC',
              items: [
                { label: 'Overview', link: '/docs/plugins/nfc/' },
                { label: 'Getting started', link: '/docs/plugins/nfc/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Pay',
              items: [
                { label: 'Overview', link: '/docs/plugins/pay/' },
                { label: 'Getting started', link: '/docs/plugins/pay/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'PDF Generator',
              items: [
                { label: 'Overview', link: '/docs/plugins/pdf-generator/' },
                { label: 'Getting started', link: '/docs/plugins/pdf-generator/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Persistent Account',
              items: [{ label: 'Overview', link: '/docs/plugins/persistent-account/' }],
              collapsed: true,
            },
            {
              label: 'Photo Library',
              items: [
                { label: 'Overview', link: '/docs/plugins/photo-library/' },
                { label: 'Getting started', link: '/docs/plugins/photo-library/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'RealtimeKit',
              items: [
                { label: 'Overview', link: '/docs/plugins/realtimekit/' },
                { label: 'Getting started', link: '/docs/plugins/realtimekit/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Ricoh 360 Camera',
              items: [{ label: 'Overview', link: '/docs/plugins/ricoh360-camera/' }],
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
              label: 'Shake',
              items: [
                { label: 'Overview', link: '/docs/plugins/shake/' },
                { label: 'Getting started', link: '/docs/plugins/shake/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Share Target',
              items: [
                { label: 'Overview', link: '/docs/plugins/share-target/' },
                { label: 'Getting started', link: '/docs/plugins/share-target/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'SIM',
              items: [
                { label: 'Overview', link: '/docs/plugins/sim/' },
                { label: 'Getting started', link: '/docs/plugins/sim/getting-started' },
              ],
              collapsed: true,
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
              label: 'StreamCall',
              items: [{ label: 'Overview', link: '/docs/plugins/streamcall/' }],
              collapsed: true,
            },
            {
              label: 'Text Interaction',
              items: [
                { label: 'Overview', link: '/docs/plugins/textinteraction/' },
                { label: 'Getting started', link: '/docs/plugins/textinteraction/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Twilio Voice',
              items: [{ label: 'Overview', link: '/docs/plugins/twilio-voice/' }],
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
              label: 'Video Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/video-player/' },
                { label: 'Getting started', link: '/docs/plugins/video-player/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'Volume Buttons',
              items: [
                { label: 'Overview', link: '/docs/plugins/volume-buttons/' },
                { label: 'Getting started', link: '/docs/plugins/volume-buttons/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'WeChat',
              items: [
                { label: 'Overview', link: '/docs/plugins/wechat/' },
                { label: 'Getting started', link: '/docs/plugins/wechat/getting-started' },
              ],
              collapsed: true,
            },
            {
              label: 'YouTube Player',
              items: [
                { label: 'Overview', link: '/docs/plugins/youtube-player/' },
                { label: 'Getting started', link: '/docs/plugins/youtube-player/getting-started' },
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
        {
          label: 'LLMs-full.txt',
          link: 'https://capgo.app/llms-full.txt',
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
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        outdir: './src/paraglide',
        project: './project.inlang',
        disableAsyncLocalStorage: true,
      }),
    ],
  },
})
