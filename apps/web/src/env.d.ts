/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import('./services/locale').Locales
    runtimeConfig: import('./config/app').RuntimeConfig
  }
}

interface Window {
  __capgoGetAttributionPostHogProps?: () => Record<string, string>
}

// Safari's password-rules hint (used on /register) is not in Astro's built-in attribute types yet.
declare namespace astroHTML.JSX {
  interface InputHTMLAttributes {
    passwordrules?: string | null
  }
}
