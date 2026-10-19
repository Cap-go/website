import { defineMiddleware } from 'astro:middleware'
import { useRuntimeConfig } from './config/app'
import { handleToolApiRequest } from './lib/tools/api'
import { defaultLocale, type Locales } from './services/locale'

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.locale = (context.currentLocale || defaultLocale) as Locales
  context.locals.runtimeConfig = useRuntimeConfig()

  // When Astro pre-renders during `astro build`, there is no real request.
  if (context.isPrerendered) {
    return next()
  }

  const toolResponse = await handleToolApiRequest(
    context.request,
    {
      IOS_UDID_PROFILE_SIGNING_CERT_PEM: import.meta.env.IOS_UDID_PROFILE_SIGNING_CERT_PEM,
      IOS_UDID_PROFILE_SIGNING_KEY_PEM: import.meta.env.IOS_UDID_PROFILE_SIGNING_KEY_PEM,
      IOS_UDID_PROFILE_SIGNING_CHAIN_PEM: import.meta.env.IOS_UDID_PROFILE_SIGNING_CHAIN_PEM,
    },
    context.url.pathname,
  )
  if (toolResponse) {
    return toolResponse
  }

  return await next()
})
