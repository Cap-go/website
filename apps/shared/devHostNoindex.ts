// Keep non-production hosts (e.g. development.capgo.app) out of search indexes.
const NOINDEX_HOSTS = new Set(['development.capgo.app'])

export function isNoindexHost(hostname: string): boolean {
  return NOINDEX_HOSTS.has(hostname.toLowerCase())
}

export function withDevHostNoindex(request: Request, response: Response): Response {
  if (!isNoindexHost(new URL(request.url).hostname)) return response
  if (response.status === 101) return response
  const headers = new Headers(response.headers)
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}
