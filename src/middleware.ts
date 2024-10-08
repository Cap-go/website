import { defineMiddleware } from 'astro:middleware'
import { defaultLocale, type Locales } from './services/locale'

export const onRequest = defineMiddleware((context, next) => {
  context.locals.locale = (context.currentLocale || defaultLocale) as Locales
  return next()
})
