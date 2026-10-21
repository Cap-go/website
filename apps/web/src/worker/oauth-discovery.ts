import { OAUTH_AUTHORIZATION_SERVER_UPSTREAM_URL, OAUTH_ISSUER } from '../../../shared/agentDiscovery'
import { cachedJsonResponse } from './cached-json'
import type { BackgroundContext } from './types'
import { WELL_KNOWN_CORS_HEADERS, wellKnownMethodGuard } from './well-known'

export const OAUTH_AUTHORIZATION_SERVER_PATH = '/.well-known/oauth-authorization-server'
const METADATA_TTL_SECONDS = 3600

/**
 * capgo.app is the OAuth issuer of the hosted MCP server, so RFC 8414 requires its metadata here.
 * The API generates it (MCP_OAUTH_ISSUER); only metadata naming this issuer is served.
 */
export async function loadAuthorizationServerMetadata(fetchImpl: typeof fetch = fetch): Promise<Record<string, unknown>> {
  const response = await fetchImpl(OAUTH_AUTHORIZATION_SERVER_UPSTREAM_URL, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(5000) })
  if (!response.ok) throw new Error(`Authorization server metadata returned ${response.status}`)
  const metadata = (await response.json()) as Record<string, unknown>
  if (metadata.issuer !== OAUTH_ISSUER) throw new Error(`Unexpected issuer ${String(metadata.issuer)}`)
  return metadata
}

export async function handleAuthorizationServerMetadataRequest(request: Request, ctx?: BackgroundContext): Promise<Response> {
  const guard = wellKnownMethodGuard(request)
  if (guard) return guard
  const response = await cachedJsonResponse(
    request,
    OAUTH_AUTHORIZATION_SERVER_PATH,
    METADATA_TTL_SECONDS,
    () => loadAuthorizationServerMetadata(),
    'OAuth authorization server metadata is temporarily unavailable',
    ctx,
  )
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(WELL_KNOWN_CORS_HEADERS)) headers.set(name, value)
  return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers })
}
