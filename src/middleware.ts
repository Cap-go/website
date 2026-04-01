import type { APIContext, MiddlewareNext } from 'astro'
import { defineMiddleware } from 'astro:middleware'
import { env } from 'cloudflare:workers'
import { useRuntimeConfig } from './config/app'
import { siteBuildVersion, pageVersionMap } from './generated/pageVersions'
import { translateLandingHtml } from './lib/landingTranslation'
// @ts-expect-error Paraglide generates this module outside the checked source tree.
import { paraglideMiddleware } from './paraglide/server.js'
import { defaultLocale, type Locales } from './services/locale'
import { isDynamicLandingPath, normalizePathname, parseRequestedLandingLocale } from './services/landingLocale'

const SOURCE_REQUEST_HEADER = 'x-capgo-translation-source'
const TRANSLATION_CACHE_HEADER = 'x-capgo-translation-cache'

export const onRequest = defineMiddleware((context, next) => {
  const runtimeConfig = useRuntimeConfig()
  context.locals.runtimeConfig = runtimeConfig

  // When Astro pre-renders during `astro build`, there is no real request.
  // Skip the Paraglide middleware so we don't touch unavailable request headers.
  // Use context.isPrerendered which is the reliable way to detect prerendering
  if (context.isPrerendered) {
    context.locals.locale = (context.currentLocale || defaultLocale) as Locales
    context.locals.displayLocale = context.currentLocale || defaultLocale
    context.locals.requestedLocale = context.locals.displayLocale
    return next()
  }

  const requestUrl = new URL(context.request.url)
  const requestedLandingLocale = parseRequestedLandingLocale(requestUrl.pathname)
  const requestedPathname = normalizePathname(requestUrl.pathname)

  context.locals.requestedPathname = requestedPathname
  context.locals.requestedUrl = requestUrl.toString()

  if (context.request.headers.get(SOURCE_REQUEST_HEADER) === '1') {
    context.locals.locale = defaultLocale as Locales
    context.locals.displayLocale = context.locals.requestedLocale || defaultLocale
    return next()
  }

  if (requestedLandingLocale && isDynamicLandingPath(requestedLandingLocale.pathname)) {
    if (requestedLandingLocale.locale === defaultLocale) {
      const redirectUrl = new URL(requestUrl.toString())
      redirectUrl.pathname = requestedLandingLocale.pathname
      return Response.redirect(redirectUrl.toString(), 308)
    }

    if (context.request.method === 'GET' || context.request.method === 'HEAD') {
      return handleDynamicLandingRequest(context, next, requestUrl, requestedLandingLocale.locale, requestedLandingLocale.pathname)
    }
  }

  return paraglideMiddleware(context.request, async () => {
    const activeLocale = (context.currentLocale || defaultLocale) as Locales
    context.locals.locale = activeLocale
    context.locals.displayLocale = activeLocale
    context.locals.requestedLocale = activeLocale
    context.locals.isDynamicLandingRequest = false
    return await next()
  })
})

async function handleDynamicLandingRequest(
  context: APIContext,
  next: MiddlewareNext,
  requestUrl: URL,
  requestedLocale: string,
  sourcePathname: string,
): Promise<Response> {
  const sourceRequest = createSourceRequest(context.request, sourcePathname)
  const pageVersion = resolvePageVersion(sourcePathname)
  const cacheKey = createCacheKey(requestUrl, pageVersion)
  const cache = (caches as CacheStorage & { default: Cache }).default

  const cachedResponse = await cache.match(cacheKey)
  if (cachedResponse) {
    return withTranslationHeaders(cachedResponse, {
      cacheState: 'hit',
      locale: requestedLocale,
      pageVersion,
    })
  }

  return paraglideMiddleware(sourceRequest, async () => {
    context.locals.locale = defaultLocale as Locales
    context.locals.displayLocale = requestedLocale
    context.locals.requestedLocale = requestedLocale
    context.locals.requestedPathname = normalizePathname(requestUrl.pathname)
    context.locals.requestedUrl = requestUrl.toString()
    context.locals.isDynamicLandingRequest = true

    const sourceResponse = await next(sourceRequest)
    if (context.request.method === 'HEAD' || !isHtmlResponse(sourceResponse)) {
      return withTranslationHeaders(sourceResponse, {
        cacheState: 'skip',
        locale: requestedLocale,
        pageVersion,
      })
    }

    const ai = (env as { AI?: { run: (model: string, inputs: Record<string, unknown>) => Promise<unknown> } }).AI
    if (!ai) {
      return withTranslationHeaders(sourceResponse, {
        cacheState: 'disabled',
        locale: requestedLocale,
        pageVersion,
      })
    }

    try {
      const sourceHtml = await sourceResponse.clone().text()
      const translatedHtml = await translateLandingHtml({
        ai,
        html: sourceHtml,
        locale: requestedLocale,
        siteOrigin: requestUrl.origin,
      })

      const responseHeaders = new Headers(sourceResponse.headers)
      responseHeaders.set('Cache-Control', 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400')
      responseHeaders.set('Content-Language', requestedLocale)
      responseHeaders.set('ETag', `W/"${siteBuildVersion}:${pageVersion}:${requestedLocale}"`)
      responseHeaders.set('X-Capgo-Build-Version', siteBuildVersion)
      responseHeaders.set('X-Capgo-Page-Version', pageVersion)
      responseHeaders.set(TRANSLATION_CACHE_HEADER, 'miss')

      const translatedResponse = new Response(translatedHtml, {
        headers: responseHeaders,
        status: sourceResponse.status,
        statusText: sourceResponse.statusText,
      })

      const cfContext = (context.locals as App.Locals & {
        cfContext: {
          waitUntil: (promise: Promise<unknown>) => void
        }
      }).cfContext

      cfContext.waitUntil(cache.put(cacheKey, translatedResponse.clone()))
      return translatedResponse
    }
    catch (error) {
      console.error('Dynamic landing translation failed.', error)
      return withTranslationHeaders(sourceResponse, {
        cacheState: 'error',
        locale: requestedLocale,
        pageVersion,
      })
    }
  })
}

function createSourceRequest(request: Request, sourcePathname: string): Request {
  const sourceUrl = new URL(request.url)
  sourceUrl.pathname = sourcePathname

  const headers = new Headers(request.headers)
  headers.set(SOURCE_REQUEST_HEADER, '1')

  return new Request(sourceUrl.toString(), {
    headers,
    method: request.method,
    redirect: request.redirect,
  })
}

function createCacheKey(requestUrl: URL, pageVersion: string): Request {
  const cacheUrl = new URL(requestUrl.toString())
  cacheUrl.searchParams.set('__capgo_build', siteBuildVersion)
  cacheUrl.searchParams.set('__capgo_page', pageVersion)
  return new Request(cacheUrl.toString(), {
    method: 'GET',
  })
}

function resolvePageVersion(pathname: string): string {
  const normalizedPathname = normalizePathname(pathname)
  if (normalizedPathname in pageVersionMap) {
    return pageVersionMap[normalizedPathname as keyof typeof pageVersionMap]
  }
  if (normalizedPathname.startsWith('/plugins/')) {
    return pageVersionMap['/plugins/[slug]/']
  }
  return siteBuildVersion
}

function isHtmlResponse(response: Response): boolean {
  return response.headers.get('content-type')?.includes('text/html') ?? false
}

function withTranslationHeaders(
  response: Response,
  {
    cacheState,
    locale,
    pageVersion,
  }: {
    cacheState: 'disabled' | 'error' | 'hit' | 'skip'
    locale: string
    pageVersion: string
  },
): Response {
  const headers = new Headers(response.headers)
  headers.set('Content-Language', locale)
  headers.set('X-Capgo-Build-Version', siteBuildVersion)
  headers.set('X-Capgo-Page-Version', pageVersion)
  headers.set(TRANSLATION_CACHE_HEADER, cacheState)

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  })
}
