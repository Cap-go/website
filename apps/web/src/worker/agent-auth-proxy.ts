import { CAPGO_API_ORIGIN } from '../../../shared/agentDiscovery'

/**
 * auth.md agent registration is advertised on the capgo.app issuer origin, next to /auth.md and the
 * authorization server metadata, and served by the API worker. capgo.app forwards these paths there.
 */
const AGENT_AUTH_UPSTREAM_PATHS: Record<string, string> = {
  '/agent/identity': '/agent/identity',
  '/agent/identity/claim': '/agent/identity/claim',
  '/oauth2/token': '/mcp/oauth/token',
  '/oauth2/revoke': '/mcp/oauth/revoke',
}

export interface ServiceBinding {
  fetch(request: Request): Promise<Response>
}

export function agentAuthUpstreamPath(pathname: string): string | null {
  return AGENT_AUTH_UPSTREAM_PATHS[pathname.replace(/\/+$/, '')] ?? null
}

export async function proxyAgentAuthRequest(
  request: Request,
  upstreamPath: string,
  api?: ServiceBinding,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  const target = new URL(`${upstreamPath}${new URL(request.url).search}`, CAPGO_API_ORIGIN)
  const forwarded = new Request(target, request)
  // The service binding passes the request through unchanged, so CF-Connecting-IP still names the
  // agent and the API's per-IP limits stay per client. A plain fetch would present the worker's IP.
  const response = api ? await api.fetch(forwarded) : await fetchImpl(forwarded)
  return new Response(response.body, response)
}
