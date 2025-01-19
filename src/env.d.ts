/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

declare namespace App {
  interface Locals {
    locale: import('./services/locale').Locales
    runtimeConfig: import('./config/app').RuntimeConfig
    translations: typeof import('./services/translations').default
  }
}
