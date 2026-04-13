import { defineMiddleware } from 'astro:middleware'

const DEFAULT_LOCALE = 'en'

const stripHtmlSuffix = (pathname: string) => pathname.endsWith('.html') ? pathname.slice(0, -5) : pathname

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url)
  const pathname = stripHtmlSuffix(url.pathname)

  if (pathname === `/${DEFAULT_LOCALE}` || pathname === `/${DEFAULT_LOCALE}/`) {
    return context.redirect('/', 308)
  }

  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const targetPath = pathname.slice(DEFAULT_LOCALE.length + 1) || '/'
    const normalizedPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`
    return context.redirect(`${normalizedPath}${url.search}`, 308)
  }

  return next()
})
