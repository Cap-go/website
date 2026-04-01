/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@astrojs/cloudflare/types" />

declare module 'cloudflare:workers' {
  export const env: Record<string, unknown>
}

declare module './paraglide/server.js' {
  export function paraglideMiddleware(
    request: Request,
    next: () => Promise<Response>,
  ): Promise<Response>
}

declare namespace App {
  interface Locals {
    locale: import('./services/locale').Locales
    runtimeConfig: import('./config/app').RuntimeConfig
    displayLocale?: string
    requestedLocale?: string
    requestedPathname?: string
    requestedUrl?: string
    isDynamicLandingRequest?: boolean
  }
}
