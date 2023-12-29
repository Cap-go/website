import vue from '@astrojs/vue'
import UnoCSS from '@unocss/astro'
import AstroPWA from '@vite-pwa/astro'
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import { pwa } from './src/config/pwa'
import config from './configs.json'

export default defineConfig({
  compressHTML: true,
  site: `https://${config.base_domain.prod}`,
  redirects: {
    '/register': {
      status: 302,
      destination: 'https://web.capgo.app/register',
    },
  },
  integrations: [
    UnoCSS({ injectReset: true }),
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
    AstroPWA(pwa),
    starlight({
      title: 'Capgo',
      favicon: '/favicon.svg',
      // logo: { src: './logo.svg' },
      social: {
        discord: 'https://discord.com/invite/VnYRvBfgA6',
        github: 'https://github.com/Cap-go',
      },
      sidebar: [
        {
          label: 'Getting Started',
          link: '/docs/',
        },
        {
          label: 'How To',
          link: '/docs/how-to',
        },
        {
          label: 'Tech support for capgo',
          link: '/docs/getting-help',
        },
        {
          label: 'Plugin',
          autogenerate: { directory: 'docs/plugin' },
        },
        {
          label: 'Tooling',
          autogenerate: { directory: 'docs/tooling' },
        },
        {
          label: 'Web app',
          autogenerate: { directory: 'docs/webapp' },
        },
        {
          label: 'Upgrade',
          autogenerate: { directory: 'docs/upgrade' },
        },
        {
          label: 'v3',
          autogenerate: { directory: 'docs/v3' },
        },
        {
          label: 'Self Hosted',
          items: [
            { label: 'Getting Started', link: '/docs/self-hosted/getting-started' },
            { label: 'Contributing to capgo OSS', link: '/docs/self-hosted/contributing' },
            { label: 'Auto Update', autogenerate: { directory: 'docs/self-hosted/Auto Update' } },
            {
              label: 'Local development',
              items: [
                { label: 'Getting started', link: '/docs/self-hosted/local-dev/getting-started/' },
                { label: 'Setup S3', link: '/docs/self-hosted/local-dev/s3' },
                { label: 'CLI', link: '/docs/self-hosted/local-dev/cli' },
                { label: 'Capacitor updater', link: '/docs/self-hosted/local-dev/capacitor-updater' },
              ],
            },
            { label: 'Manual', link: '/docs/self-hosted/manual' },
          ],
        },
      ],
    }),
  ],
})
