/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import('./services/locale').Locales
    runtimeConfig: import('./config/app').RuntimeConfig
    translation?: import('./services/runtimeTranslation').RuntimeTranslationState
    translations: typeof import('./services/translations').default
  }
}
