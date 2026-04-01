import type { APIContext, MiddlewareNext } from 'astro'
import { defineMiddleware } from 'astro:middleware'
import { env } from 'cloudflare:workers'
import { useRuntimeConfig } from './config/app'
import { siteBuildVersion, pageVersionMap } from './generated/pageVersions'
import { translateLandingHtml } from './lib/landingTranslation'
import { defaultLocale, type Locales } from './services/locale'
import { getLocalizedPathname, isDynamicLandingPath, isStaticLocale, normalizePathname, parseRequestedLandingLocale, splitLocaleFromPathname } from './services/landingLocale'

const SOURCE_REQUEST_HEADER = 'x-capgo-translation-source'
const TRANSLATION_CACHE_HEADER = 'x-capgo-translation-cache'

export const onRequest = defineMiddleware((context, next) => {
  const runtimeConfig = useRuntimeConfig()
  context.locals.runtimeConfig = runtimeConfig

  // When Astro pre-renders during `astro build`, there is no real request.
  // Use context.isPrerendered which is the reliable way to detect prerendering.
  if (context.isPrerendered) {
    context.locals.locale = defaultLocale as Locales
    context.locals.displayLocale = defaultLocale
    context.locals.requestedLocale = context.locals.displayLocale
    return next()
  }

  const requestUrl = new URL(context.request.url)
  const requestedRoute = splitLocaleFromPathname(requestUrl.pathname)
  const requestedLandingLocale = parseRequestedLandingLocale(requestUrl.pathname)
  const requestedPathname = requestedRoute.pathname

  context.locals.requestedPathname = requestedPathname
  context.locals.requestedUrl = requestUrl.toString()

  if (context.request.headers.get(SOURCE_REQUEST_HEADER) === '1') {
    context.locals.locale = defaultLocale as Locales
    context.locals.displayLocale = defaultLocale
    context.locals.requestedLocale = defaultLocale
    context.locals.isDynamicLandingRequest = false
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

  const routeLocale = isStaticLocale(requestedRoute.locale) ? requestedRoute.locale : defaultLocale
  context.locals.locale = routeLocale as Locales
  context.locals.displayLocale = routeLocale
  context.locals.requestedLocale = routeLocale
  context.locals.isDynamicLandingRequest = false
  return next()
})

async function handleDynamicLandingRequest(
  context: APIContext,
  next: MiddlewareNext,
  requestUrl: URL,
  requestedLocale: string,
  sourcePathname: string,
): Promise<Response> {
  const sourceRenderUrl = new URL(requestUrl.toString())
  sourceRenderUrl.pathname = sourcePathname
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

  context.locals.locale = defaultLocale as Locales
  context.locals.displayLocale = defaultLocale
  context.locals.requestedLocale = requestedLocale
  context.locals.requestedPathname = normalizePathname(sourcePathname)
  context.locals.requestedUrl = sourceRenderUrl.toString()
  context.locals.isDynamicLandingRequest = false

  const sourceResponse = await next(sourceRequest)
  if (context.request.method === 'HEAD' || !isHtmlResponse(sourceResponse)) {
    return withTranslationHeaders(localizeResponseLocation(sourceResponse, requestedLocale, requestUrl.origin), {
      cacheState: 'skip',
      locale: defaultLocale,
      pageVersion,
    })
  }

  const ai = (env as { AI?: { run: (model: string, inputs: Record<string, unknown>) => Promise<unknown> } }).AI
  if (!ai) {
    return withTranslationHeaders(sourceResponse, {
      cacheState: 'disabled',
      locale: defaultLocale,
      pageVersion,
    })
  }

  try {
    const sourceHtml = await sourceResponse.clone().text()
    const translatedHtml = await translateLandingHtml({
      ai,
      html: sourceHtml,
      locale: requestedLocale,
      pageUrl: sourceRenderUrl.toString(),
      siteOrigin: requestUrl.origin,
    })
    const shouldEdgeCache = sourceResponse.ok

    const responseHeaders = new Headers(sourceResponse.headers)
    responseHeaders.set('Content-Language', requestedLocale)
    responseHeaders.set('X-Capgo-Build-Version', siteBuildVersion)
    responseHeaders.set('X-Capgo-Page-Version', pageVersion)
    responseHeaders.set(TRANSLATION_CACHE_HEADER, shouldEdgeCache ? 'miss' : 'skip')

    if (shouldEdgeCache) {
      responseHeaders.set('Cache-Control', 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400')
      responseHeaders.set('ETag', `W/"${siteBuildVersion}:${pageVersion}:${requestedLocale}"`)
    }

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

    if (shouldEdgeCache) {
      cfContext.waitUntil(cache.put(cacheKey, translatedResponse.clone()))
    }
    return translatedResponse
  }
  catch (error) {
    console.error('Dynamic landing translation failed.', error)
    return withTranslationHeaders(sourceResponse, {
      cacheState: 'error',
      locale: defaultLocale,
      pageVersion,
    })
  }
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

function localizeResponseLocation(response: Response, locale: string, siteOrigin: string): Response {
  const location = response.headers.get('Location')
  if (!location) {
    return response
  }

  let resolvedLocation: URL
  try {
    resolvedLocation = new URL(location, siteOrigin)
  }
  catch {
    return response
  }

  if (resolvedLocation.origin !== siteOrigin) {
    return response
  }

  const localizedPath = getLocalizedPathname(resolvedLocation.pathname, locale)
  const localizedLocation = /^https?:/iu.test(location)
    ? `${resolvedLocation.origin}${localizedPath}${resolvedLocation.search}${resolvedLocation.hash}`
    : `${localizedPath}${resolvedLocation.search}${resolvedLocation.hash}`

  const headers = new Headers(response.headers)
  headers.set('Location', localizedLocation)

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
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
