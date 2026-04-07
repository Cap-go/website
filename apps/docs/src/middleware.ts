import { defineMiddleware } from 'astro:middleware'
import { useRuntimeConfig } from './config/runtime'
import { paraglideMiddleware } from './paraglide/server.js'
import { defaultLocale, type Locales } from './services/locale'

export const onRequest = defineMiddleware((context, next) => {
  if (context.isPrerendered) {
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
