import { defineMiddleware } from 'astro:middleware'
import { defaultLocale, type Locales } from './services/locale'
import { useRuntimeConfig } from './config/app'

export const onRequest = defineMiddleware((context, next) => {
  context.locals.locale = (context.currentLocale || defaultLocale) as Locales
  context.locals.runtimeConfig = useRuntimeConfig()
  return next()
})
