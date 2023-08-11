import vue from '@astrojs/vue'
import UnoCSS from '@unocss/astro'
import config from './configs.json'
import { pwa } from './src/config/pwa'
import AstroPWA from '@vite-pwa/astro'
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

export default defineConfig({
  compressHTML: true,
  site: `https://${config.base_domain.prod}`,
  integrations: [
    UnoCSS({ injectReset: true }),
    vue(),
    AstroPWA(pwa),
    starlight({
      title: 'Capgo',
      logo: { src: './logo.svg' },
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
            { label: 'Manual', link: '/docs/self-hosted/manual' },
          ],
        },
      ],
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
})
