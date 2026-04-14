import { defineMiddleware } from 'astro:middleware'
import { useRuntimeConfig } from './config/app'
import { handleToolApiRequest } from './lib/tools/api'
import { paraglideMiddleware } from './paraglide/server.js'
import { defaultLocale, type Locales } from './services/locale'

export const onRequest = defineMiddleware(async (context, next) => {
  // When Astro pre-renders during `astro build`, there is no real request.
  // Skip the Paraglide middleware so we don't touch unavailable request headers.
  // Use context.isPrerendered which is the reliable way to detect prerendering
  if (context.isPrerendered) {
    context.locals.locale = (context.currentLocale || defaultLocale) as Locales
    context.locals.runtimeConfig = useRuntimeConfig()
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

  return await paraglideMiddleware(context.request, async () => {
    context.locals.locale = (context.currentLocale || defaultLocale) as Locales
    context.locals.runtimeConfig = useRuntimeConfig()
    return await next()
  })
})
