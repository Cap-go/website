import { CAPGO_API_ORIGIN, CAPGO_ORIGIN, MCP_TOOLS, WHEN_TO_USE_MARKDOWN, docsIndexForTopic, mcpManifest, mediaQuality } from '../../../shared/agentDiscovery'

const PROTOCOL_VERSION = '2025-03-26'
const SERVER_INFO = {
  name: 'capgo',
  title: 'Capgo',
  version: '1.0.0',
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
  'Access-Control-Expose-Headers': 'Content-Type, MCP-Protocol-Version',
  'MCP-Protocol-Version': PROTOCOL_VERSION,
}

type JsonRpcId = string | number | null

interface JsonRpcRequest {
  jsonrpc?: string
  id?: JsonRpcId
  method?: string
  params?: Record<string, unknown>
}

function jsonResponse(body: unknown, status = 200, extra: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...CORS_HEADERS,
      ...extra,
    },
  })
}

function rpcResult(id: JsonRpcId, result: unknown) {
  return { jsonrpc: '2.0', id, result }
}

function rpcError(id: JsonRpcId, code: number, message: string) {
  return { jsonrpc: '2.0', id, error: { code, message } }
}

function textContent(text: string) {
  return { content: [{ type: 'text', text }] }
}

function listTools() {
  return {
    tools: MCP_TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }
}

function callTool(name: string, args: Record<string, unknown> | undefined): { ok: true; text: string } | { ok: false; message: string } {
  if (name === 'capgo_when_to_use') {
    return { ok: true, text: WHEN_TO_USE_MARKDOWN }
  }
  if (name === 'capgo_get_openapi') {
    return {
      ok: true,
      text: [
        `OpenAPI: ${CAPGO_ORIGIN}/openapi.json`,
        `Alias: ${CAPGO_ORIGIN}/.well-known/openapi.json`,
        `Canonical copy: ${CAPGO_ORIGIN}/.well-known/capgo-public-api-openapi.json`,
        `Docs: ${CAPGO_ORIGIN}/docs/public-api/`,
        `Base URL: ${CAPGO_API_ORIGIN}`,
        'Auth: send a Capgo API key in `x-api-key`. Legacy `authorization` without Bearer is still accepted.',
        'Rate limits: 100 requests/minute standard, 1000 requests/minute enterprise.',
      ].join('\n'),
    }
  }
  if (name === 'capgo_list_docs') {
    const topic = typeof args?.topic === 'string' ? args.topic : undefined
    return { ok: true, text: docsIndexForTopic(topic) }
  }
  return { ok: false, message: `Unknown tool: ${name}` }
}

function handleRpc(payload: JsonRpcRequest): { status: number; body: unknown } | { status: number; body: null } {
  const id = payload.id ?? null
  const method = payload.method || ''

  if (method === 'initialize') {
    return {
      status: 200,
      body: rpcResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: WHEN_TO_USE_MARKDOWN,
      }),
    }
  }

  if (method === 'notifications/initialized' || method === 'initialized') {
    return { status: 202, body: null }
  }

  if (method === 'ping') {
    return { status: 200, body: rpcResult(id, {}) }
  }

  if (method === 'tools/list') {
    return { status: 200, body: rpcResult(id, listTools()) }
  }

  if (method === 'tools/call') {
    const name = typeof payload.params?.name === 'string' ? payload.params.name : ''
    const args = payload.params?.arguments && typeof payload.params.arguments === 'object' ? (payload.params.arguments as Record<string, unknown>) : {}
    const result = callTool(name, args)
    if (!result.ok) return { status: 200, body: rpcError(id, -32602, result.message) }
    return { status: 200, body: rpcResult(id, textContent(result.text)) }
  }

  return { status: 200, body: rpcError(id, -32601, `Method not found: ${method}`) }
}

function isJsonRpcObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item))
}

function isJsonRpcCall(item: Record<string, unknown>): boolean {
  return typeof item.method === 'string'
}

function expectsJsonRpcResponse(item: Record<string, unknown>): boolean {
  return 'id' in item
}

function handlePostPayload(payload: unknown): Response {
  if (Array.isArray(payload)) {
    if (!payload.length || !payload.every(isJsonRpcObject)) {
      return jsonResponse(rpcError(null, -32600, 'Invalid request'), 400)
    }
    const bodies: unknown[] = []
    for (const item of payload) {
      if (!isJsonRpcCall(item)) {
        if ('result' in item || 'error' in item) continue
        bodies.push(rpcError(null, -32600, 'Invalid request'))
        continue
      }
      if (!expectsJsonRpcResponse(item)) {
        handleRpc(item as JsonRpcRequest)
        continue
      }
      const result = handleRpc(item as JsonRpcRequest)
      if (result.body !== null) bodies.push(result.body)
    }
    if (!bodies.length) return new Response(null, { status: 202, headers: CORS_HEADERS })
    return jsonResponse(bodies)
  }

  if (!payload || typeof payload !== 'object') {
    return jsonResponse(rpcError(null, -32600, 'Invalid request'), 400)
  }

  const result = handleRpc(payload as JsonRpcRequest)
  if (result.body === null) {
    return new Response(null, { status: result.status, headers: CORS_HEADERS })
  }
  return jsonResponse(result.body, result.status)
}

export async function handleMcpRequest(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }

  if (request.method === 'GET' || request.method === 'HEAD') {
    const accept = request.headers.get('Accept') || ''
    const sse = mediaQuality(accept, /^text\/event-stream$/i)
    if (sse && sse.q > 0) {
      return new Response(request.method === 'HEAD' ? null : ':\n\n', {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-store',
          ...CORS_HEADERS,
        },
      })
    }
    return new Response(request.method === 'HEAD' ? null : JSON.stringify({ error: 'Use POST for JSON-RPC. The MCP manifest is at /.well-known/mcp.json.' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        ...CORS_HEADERS,
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed. Use POST for JSON-RPC.' }, 405, { Allow: 'GET, HEAD, POST, OPTIONS' })
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return jsonResponse(rpcError(null, -32700, 'Parse error'), 400)
  }
  return handlePostPayload(payload)
}

export function handleMcpManifestRequest(request: Request): Response {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return jsonResponse({ error: 'Method not allowed.' }, 405)
  }
  const body = request.method === 'HEAD' ? null : JSON.stringify(mcpManifest())
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...CORS_HEADERS,
    },
  })
}

export { callTool, handleRpc, listTools }
