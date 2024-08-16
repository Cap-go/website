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
      destination: 'https://web.capgo.app/register/',
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
      editLink: {
				baseUrl: 'https://github.com/Cap-go/website/edit/main/',
			},
      customCss: ['./src/css/global.css'],
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
          link: '/docs/getting-started/',
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
          label: 'Fix the doc',
          link: 'https://github.com/Cap-go/website/tree/main/src/content/docs/docs',
        },
        {
          label: 'Tech support for Capgo',
          link: '/docs/getting-help/',
        },
        {
          label: 'Plugin',
          items: [
            { label: 'Overview', link: '/docs/plugin/overview' },
            { label: 'Cloud Mode', autogenerate: { directory: 'docs/plugin/cloud-mode/' }},
            {
              label: 'Self Hosted', items: [
                { label: 'Getting Started', link: '/docs/plugin/self-hosted/getting-started' },
                { label: 'Contributing', link: '/docs/plugin/self-hosted/contributing' },
                { label: 'Auto Update', link: '/docs/plugin/self-hosted/auto-update' },
                { label: 'Manual Update', link: '/docs/plugin/self-hosted/manual-update' },
                { label: 'Encrypted Bundles', link: '/docs/plugin/self-hosted/encrypted-bundles' },
                { label: 'Handling Updates', link: '/docs/plugin/self-hosted/handling-updates' },
                { label: 'Handling Stats', link: '/docs/plugin/self-hosted/handling-stats' },
                { label: 'Local Development', autogenerate: { directory: 'docs/plugin/self-hosted/local-dev' }, collapsed: true}
              ],
              collapsed: true
            },
            { label: 'Plugin methods', link: '/docs/plugin/api' },
            { label: 'Known Issues', link: '/docs/plugin/known-issues' },
            { label: 'Cordova', link: '/docs/plugin/cordova' },
            { label: 'Settings', link: '/docs/plugin/settings' },
            { label: 'Statistics', link: '/docs/plugin/statistics-api' },
            { label: 'Debugging', link: '/docs/plugin/debugging' },
          ]
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
          label: 'Migrations',
          autogenerate: { directory: 'docs/upgrade' },
        },
      ],
    }),
  ],
})
