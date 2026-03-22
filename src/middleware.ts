import { defineMiddleware } from 'astro:middleware'
import { useRuntimeConfig } from './config/app'
import { getTranslations } from './services/translations'
import { defaultLocale, type Locales } from './services/locale'

export const onRequest = defineMiddleware((context, next) => {
  context.locals.locale = (context.currentLocale || defaultLocale) as Locales
  context.locals.runtimeConfig = useRuntimeConfig()
  context.locals.translations = getTranslations(context.locals.locale)
  return next()
})
