// Branch A/B test: CI uploads `main` and `abtest` as two Worker versions and
// splits traffic between them (see docs/abtest.md). The Worker only reports which
// side served the page and keeps the visitor on it; it never picks a variant.

export interface AbTestEnv {
  AB_FLAG?: string
  AB_VARIANT?: string
}

export const AB_COOKIE = 'capgo_ab'
export const AB_VERSION_KEY_HEADER = 'Cloudflare-Workers-Version-Key'
const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 90
const SAFE_VALUE = /^[\w.:-]{1,64}$/

function hasCookie(cookie: string | null, name: string): boolean {
  return (cookie ?? '').split(';').some((part) => part.trim().startsWith(`${name}=`))
}

function metaHtml(flag: string, variant: string): string {
  return `<meta name="capgo-ab-flag" content="${flag}"><meta name="capgo-ab-variant" content="${variant}">`
}

export function withAbTest(request: Request, response: Response, env: AbTestEnv): Response {
  const flag = env.AB_FLAG?.trim()
  const variant = env.AB_VARIANT?.trim()
  if (!flag || !variant || !SAFE_VALUE.test(flag) || !SAFE_VALUE.test(variant)) return response
  if (request.method !== 'GET' || !response.headers.get('content-type')?.includes('text/html')) return response
  // Translated pages are a shared cache: never mark them as an experiment exposure.
  if (request.headers.has('X-Capgo-Translation-Origin')) return response

  const headers = new Headers(response.headers)
  headers.set('X-Capgo-Ab-Variant', variant)
  headers.delete('Content-Length')
  if (!hasCookie(request.headers.get('cookie'), AB_COOKIE)) {
    // Persist the key this request was routed with, so the visitor stays on this version.
    const routedKey = request.headers.get(AB_VERSION_KEY_HEADER)
    const key = routedKey && SAFE_VALUE.test(routedKey) ? routedKey : crypto.randomUUID()
    const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : ''
    headers.append('Set-Cookie', `${AB_COOKIE}=${key}; Path=/; Max-Age=${AB_COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${secure}`)
  }

  return new HTMLRewriter()
    .on('head', {
      element(element) {
        element.prepend(metaHtml(flag, variant), { html: true })
      },
    })
    .transform(new Response(response.body, { status: response.status, statusText: response.statusText, headers }))
}
