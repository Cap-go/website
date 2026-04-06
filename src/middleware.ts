import { defineMiddleware } from 'astro:middleware'
import { useRuntimeConfig } from './config/app'
import { paraglideMiddleware } from './paraglide/server.js'
import { defaultLocale, type Locales } from './services/locale'
import {
  isRuntimeTranslationEligiblePath,
  runtimeTranslationLocales,
  stripRuntimeLocalePrefix,
  translateHtmlResponseWithCloudflareAI,
  type RuntimeTranslationLocale,
} from './services/runtimeTranslation'

interface RuntimeEnv {
  AI?: {
    run(model: string, payload: Record<string, unknown>): Promise<unknown>
  }
}

const buildTranslationState = (
  locale: RuntimeTranslationLocale,
  options: {
    enabled: boolean
    isTranslated: boolean
    showSelector: boolean
    sourcePath: string
  },
) => ({
  availableLocales: runtimeTranslationLocales,
  enabled: options.enabled,
  isTranslated: options.isTranslated,
  requestedLocale: locale,
  showSelector: options.showSelector,
  sourcePath: options.sourcePath,
})

export const onRequest = defineMiddleware(async (context, next) => {
  const runtimeConfig = useRuntimeConfig()
  const { locale: requestedRuntimeLocale, pathname: sourcePath } = stripRuntimeLocalePrefix(context.url.pathname)
  const runtimeEnv = ((context.locals as { runtime?: { env?: RuntimeEnv } }).runtime?.env || {}) as RuntimeEnv
  const isLocalRequest = ['127.0.0.1', 'localhost'].includes(context.url.hostname)
  const translationEnabled = Boolean(runtimeEnv.AI) && !isLocalRequest
  const eligiblePath = isRuntimeTranslationEligiblePath(sourcePath)
  const showSelector = translationEnabled && eligiblePath
  const shouldTranslate = Boolean(requestedRuntimeLocale) && requestedRuntimeLocale !== defaultLocale && translationEnabled && eligiblePath
  const localeForUi: RuntimeTranslationLocale = shouldTranslate && requestedRuntimeLocale ? requestedRuntimeLocale : defaultLocale
  const search = context.url.search || ''

  // When Astro pre-renders during `astro build`, there is no real request.
  // Skip the Paraglide middleware so we don't touch unavailable request headers.
  // Use context.isPrerendered which is the reliable way to detect prerendering
  if (context.isPrerendered) {
    context.locals.locale = defaultLocale as Locales
    context.locals.runtimeConfig = runtimeConfig
    context.locals.translation = buildTranslationState(defaultLocale, {
      enabled: false,
      isTranslated: false,
      showSelector: false,
      sourcePath,
    })
    return next()
  }

  if (requestedRuntimeLocale === defaultLocale) {
    return Response.redirect(new URL(`${sourcePath}${search}`, context.url), 302)
  }

  if (requestedRuntimeLocale && (!translationEnabled || !eligiblePath)) {
    return Response.redirect(new URL(`${sourcePath}${search}`, context.url), 302)
  }

  const requestForRender = shouldTranslate ? new Request(new URL(`${sourcePath}${search}`, context.url), context.request) : context.request

  return paraglideMiddleware(requestForRender, async () => {
    context.locals.locale = defaultLocale as Locales
    context.locals.runtimeConfig = runtimeConfig
    context.locals.translation = buildTranslationState(localeForUi, {
      enabled: translationEnabled,
      isTranslated: shouldTranslate,
      showSelector,
      sourcePath,
    })

    const renderedResponse = shouldTranslate ? await next(requestForRender) : await next()
    if (!shouldTranslate || !runtimeEnv.AI) {
      return renderedResponse
    }

    const fallbackResponse = renderedResponse.clone()

    try {
      return await translateHtmlResponseWithCloudflareAI({
        ai: runtimeEnv.AI,
        locale: requestedRuntimeLocale as RuntimeTranslationLocale,
        requestUrl: context.url,
        response: renderedResponse,
        sourcePath,
      })
    } catch (error) {
      console.error(`Runtime translation failed for ${context.request.url}`, error)
      return fallbackResponse
    }
  })
})
