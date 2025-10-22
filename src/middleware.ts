import { defineMiddleware } from 'astro:middleware'
import { useRuntimeConfig } from './config/app'
import { paraglideMiddleware } from './paraglide/server.js'
import { defaultLocale, type Locales } from './services/locale'

export const onRequest = defineMiddleware((context, next) => {
  // When Astro pre-renders during `astro build`, there is no real request.
  // Skip the Paraglide middleware so we don't touch unavailable request headers.
  if (import.meta.env.PRERENDER) {
    context.locals.locale = (context.currentLocale || defaultLocale) as Locales
    context.locals.runtimeConfig = useRuntimeConfig()
    return next()
  }

  return paraglideMiddleware(context.request, async () => {
    context.locals.locale = (context.currentLocale || defaultLocale) as Locales
    context.locals.runtimeConfig = useRuntimeConfig()
    return await next()
  })
})
