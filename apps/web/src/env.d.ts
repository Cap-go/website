/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import('./services/locale').Locales
    runtimeConfig: import('./config/app').RuntimeConfig
    translations: typeof import('./services/translations').default
  }
}
