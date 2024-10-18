import { defineMiddleware } from 'astro:middleware'
import { useRuntimeConfig } from './config/app'
import { defaultLocale, type Locales } from './services/locale'
import translations from './services/translations'

export const onRequest = defineMiddleware((context, next) => {
  context.locals.locale = (context.currentLocale || defaultLocale) as Locales
  context.locals.runtimeConfig = useRuntimeConfig()
  context.locals.translations = translations
  return next()
})
