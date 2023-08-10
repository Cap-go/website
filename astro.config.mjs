import vue from '@astrojs/vue'
import UnoCSS from '@unocss/astro'
import config from './configs.json'
import { pwa } from './src/config/pwa'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'

export default defineConfig({
  compressHTML: true,
  site: `https://${config.base_domain.prod}`,
  integrations: [UnoCSS({ injectReset: true }), vue(), AstroPWA(pwa)],
})
