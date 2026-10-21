import { mcpManifest, oauthProtectedResourceMetadata } from '../../../shared/agentDiscovery'
import { WELL_KNOWN_CORS_HEADERS, wellKnownMethodGuard } from './well-known'

function wellKnownJsonResponse(request: Request, document: unknown): Response {
  const guard = wellKnownMethodGuard(request)
  if (guard) return guard
  const body = request.method === 'HEAD' ? null : JSON.stringify(document)
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...WELL_KNOWN_CORS_HEADERS,
    },
  })
}

/** /.well-known/mcp.json: points MCP clients at the hosted server on api.capgo.app. */
export function handleMcpManifestRequest(request: Request): Response {
  return wellKnownJsonResponse(request, mcpManifest())
}

/** /.well-known/oauth-protected-resource: RFC 9728 metadata naming the Capgo authorization server. */
export function handleOAuthProtectedResourceRequest(request: Request): Response {
  return wellKnownJsonResponse(request, oauthProtectedResourceMetadata())
}
