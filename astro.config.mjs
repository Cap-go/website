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
    vue(),
    AstroPWA(pwa),
    starlight({
      title: 'Capgo',
      logo: { src: './logo.svg' },
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
          label: 'Plugin',
          autogenerate: { directory: 'docs/plugin' },
        },
        {
          label: 'Tooling',
          autogenerate: { directory: 'docs/tooling' },
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
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
})
