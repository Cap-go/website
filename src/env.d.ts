/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

interface Window {
  bento: any
  bento$: any
  Reflio: any
  $bentoChat: any
  bentoChatSDK: any
}

declare namespace App {
  interface Locals {
    locale: import('./services/locale').Locales
  }
}
