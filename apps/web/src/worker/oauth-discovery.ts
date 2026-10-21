import { CAPGO_API_ORIGIN, CAPGO_ORIGIN, OAUTH_AUTHORIZATION_SERVER_URL } from '../../../shared/agentDiscovery'
import { cachedJsonResponse } from './cached-json'
import type { BackgroundContext } from './types'

export const OAUTH_AUTHORIZATION_SERVER_PATH = '/.well-known/oauth-authorization-server'
export const OAUTH_JWKS_PATH = '/.well-known/jwks.json'
const METADATA_TTL_SECONDS = 3600

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

/**
 * Capgo OAuth access tokens are opaque Capgo API keys, so the authorization server signs nothing.
 * Publish an empty key set so `jwks_uri` resolves without implying a signing key exists.
 */
export const EMPTY_JWKS = { keys: [] as JsonWebKey[] }

export async function loadAuthorizationServerMetadata(fetchImpl: typeof fetch = fetch): Promise<Record<string, unknown>> {
  const response = await fetchImpl(OAUTH_AUTHORIZATION_SERVER_URL, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(5000) })
  if (!response.ok) throw new Error(`Authorization server metadata returned ${response.status}`)
  const metadata = (await response.json()) as Record<string, unknown>
  if (metadata.issuer !== CAPGO_API_ORIGIN) throw new Error(`Unexpected issuer ${String(metadata.issuer)}`)
  return { ...metadata, jwks_uri: metadata.jwks_uri ?? `${CAPGO_ORIGIN}${OAUTH_JWKS_PATH}` }
}

function withMethodGuard(request: Request): Response | null {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS })
  if (request.method === 'GET' || request.method === 'HEAD') return null
  return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'GET, HEAD, OPTIONS', ...CORS_HEADERS },
  })
}

async function withCors(request: Request, response: Response): Promise<Response> {
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(CORS_HEADERS)) headers.set(name, value)
  return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers })
}

/** RFC 8414 metadata mirrored from the Capgo authorization server on api.capgo.app. */
export async function handleAuthorizationServerMetadataRequest(request: Request, ctx?: BackgroundContext): Promise<Response> {
  const guard = withMethodGuard(request)
  if (guard) return guard
  const response = await cachedJsonResponse(
    request,
    OAUTH_AUTHORIZATION_SERVER_PATH,
    METADATA_TTL_SECONDS,
    () => loadAuthorizationServerMetadata(),
    'OAuth authorization server metadata is temporarily unavailable',
    ctx,
  )
  return withCors(request, response)
}

export function handleJwksRequest(request: Request): Response {
  const guard = withMethodGuard(request)
  if (guard) return guard
  return new Response(request.method === 'HEAD' ? null : JSON.stringify(EMPTY_JWKS), {
    status: 200,
    headers: { 'Content-Type': 'application/jwk-set+json', 'Cache-Control': 'public, max-age=86400', ...CORS_HEADERS },
  })
}
