import vue from '@astrojs/vue'
import UnoCSS from '@unocss/astro'
import { pwa } from './src/config/pwa'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [UnoCSS({ injectReset: true }), vue(), AstroPWA(pwa)],
})
