import { a2aAgentCard, mcpManifest, oauthProtectedResourceMetadata } from '../../../shared/agentDiscovery'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

function wellKnownJsonResponse(request: Request, document: unknown): Response {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Allow: 'GET, HEAD, OPTIONS', ...CORS_HEADERS },
    })
  }
  const body = request.method === 'HEAD' ? null : JSON.stringify(document)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...CORS_HEADERS,
    },
  })
}

/** /.well-known/mcp.json: points MCP clients at the hosted server on api.capgo.app. */
export function handleMcpManifestRequest(request: Request): Response {
  return wellKnownJsonResponse(request, mcpManifest())
}

/** /.well-known/agent-card.json: A2A Agent Card describing the hosted MCP server. */
export function handleAgentCardRequest(request: Request): Response {
  return wellKnownJsonResponse(request, a2aAgentCard())
}

/** /.well-known/oauth-protected-resource: RFC 9728 metadata naming the Capgo authorization server. */
export function handleOAuthProtectedResourceRequest(request: Request): Response {
  return wellKnownJsonResponse(request, oauthProtectedResourceMetadata())
}
