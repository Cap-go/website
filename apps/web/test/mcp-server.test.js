import { expect, test } from 'bun:test'
import { prefersMcpMarketingHtml } from '../../shared/agentDiscovery.ts'
import { agentSurfaceResponse } from '../src/worker/index.ts'
import { callTool, handleMcpManifestRequest, handleMcpRequest, handleRpc, listTools } from '../src/worker/mcp.ts'

const mockMcpAssetsEnv = {
  ASSETS: {
    fetch(input) {
      const url = new URL(typeof input === 'string' ? input : input.url)
      if (url.pathname === '/mcp/index.html') {
        return Promise.resolve(
          new Response('<!DOCTYPE html><html><head><title>Capgo MCP</title></head><body>MCP marketing</body></html>', {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          }),
        )
      }
      return Promise.resolve(new Response('not found', { status: 404 }))
    },
  },
}

test('MCP initialize returns Streamable HTTP protocol metadata', () => {
  const result = handleRpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} })
  expect(result.status).toBe(200)
  const body = result.body
  expect(body.result.protocolVersion).toBe('2025-03-26')
  expect(body.result.serverInfo.name).toBe('capgo')
  expect(body.result.capabilities.tools).toBeDefined()
})

test('MCP tools/list exposes unique operation-style tool names', () => {
  const listed = listTools().tools
  const names = listed.map((tool) => tool.name)
  expect(names).toContain('capgo_when_to_use')
  expect(names).toContain('capgo_get_openapi')
  expect(new Set(names).size).toBe(names.length)
})

test('capgo_get_openapi returns conventional spec URL and x-api-key auth', () => {
  const result = callTool('capgo_get_openapi', {})
  expect(result.ok).toBe(true)
  if (!result.ok) return
  expect(result.text).toContain('https://capgo.app/openapi.json')
  expect(result.text).toContain('x-api-key')
})

test('GET /mcp without SSE is 405 and points at the manifest', async () => {
  const response = await handleMcpRequest(new Request('https://capgo.app/mcp', { method: 'GET' }))
  expect(response.status).toBe(405)
  const body = await response.json()
  expect(body.error).toContain('/.well-known/mcp.json')
})

test('prefersMcpMarketingHtml for typical browser Accept', () => {
  const request = new Request('https://capgo.app/mcp', {
    method: 'GET',
    headers: { Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
  })
  expect(prefersMcpMarketingHtml(request)).toBe(true)
})

test('prefersMcpMarketingHtml is false for SSE clients', () => {
  const request = new Request('https://capgo.app/mcp', {
    method: 'GET',
    headers: { Accept: 'text/event-stream, application/json' },
  })
  expect(prefersMcpMarketingHtml(request)).toBe(false)
})

test('prefersMcpMarketingHtml is false when */* outranks text/html', () => {
  const request = new Request('https://capgo.app/mcp', {
    method: 'GET',
    headers: { Accept: 'text/html;q=0.5, */*;q=1' },
  })
  expect(prefersMcpMarketingHtml(request)).toBe(false)
})

test('prefersMcpMarketingHtml prefers explicit text/html over */* wildcard', () => {
  const accept = 'application/json;q=0.5, text/event-stream;q=0.5, text/html;q=0.9, */*;q=1'
  const request = new Request('https://capgo.app/mcp', { method: 'GET', headers: { Accept: accept } })
  expect(prefersMcpMarketingHtml(request)).toBe(true)
})

test('agentSurfaceResponse browser GET serves /mcp/index.html', async () => {
  const request = new Request('https://capgo.app/mcp', {
    method: 'GET',
    headers: { Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
  })
  const response = await agentSurfaceResponse(request, mockMcpAssetsEnv, '/mcp')
  expect(response?.status).toBe(200)
  expect(response?.headers.get('Content-Type')).toContain('text/html')
  expect(await response?.text()).toContain('MCP marketing')
})

test('agentSurfaceResponse GET with low-q HTML and */* returns MCP JSON error', async () => {
  const request = new Request('https://capgo.app/mcp', {
    method: 'GET',
    headers: { Accept: 'text/html;q=0.5, */*;q=1' },
  })
  const response = await agentSurfaceResponse(request, mockMcpAssetsEnv, '/mcp')
  expect(response?.status).toBe(405)
  const body = await response?.json()
  expect(body.error).toContain('/.well-known/mcp.json')
})

test('agentSurfaceResponse SSE GET bypasses marketing HTML', async () => {
  const request = new Request('https://capgo.app/mcp', {
    method: 'GET',
    headers: { Accept: 'text/event-stream' },
  })
  const response = await agentSurfaceResponse(request, mockMcpAssetsEnv, '/mcp')
  expect(response?.status).toBe(200)
  expect(response?.headers.get('Content-Type')).toContain('text/event-stream')
})

test('GET /mcp with text/event-stream returns an SSE stream', async () => {
  const response = await handleMcpRequest(new Request('https://capgo.app/mcp', { method: 'GET', headers: { Accept: 'text/event-stream' } }))
  expect(response.status).toBe(200)
  expect(response.headers.get('Content-Type')).toContain('text/event-stream')
})

test('GET /mcp with text/event-stream;q=0 is not an SSE stream', async () => {
  const response = await handleMcpRequest(new Request('https://capgo.app/mcp', { method: 'GET', headers: { Accept: 'text/event-stream;q=0' } }))
  expect(response.status).toBe(405)
})

test('GET /mcp with text/event-stream;q=bogus is not an SSE stream', async () => {
  const response = await handleMcpRequest(new Request('https://capgo.app/mcp', { method: 'GET', headers: { Accept: 'text/event-stream;q=bogus' } }))
  expect(response.status).toBe(405)
})

test('GET /.well-known/mcp.json returns the streamable-http manifest', async () => {
  const response = handleMcpManifestRequest(new Request('https://capgo.app/.well-known/mcp.json', { method: 'GET' }))
  expect(response.status).toBe(200)
  const body = await response.json()
  expect(body.transport.type).toBe('streamable-http')
  expect(body.transport.url).toBe('https://capgo.app/mcp')
  expect(body.tools.length).toBeGreaterThan(0)
})

test('POST JSON-RPC batch returns result array', async () => {
  const response = await handleMcpRequest(
    new Request('https://capgo.app/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify([
        { jsonrpc: '2.0', id: 1, method: 'ping', params: {} },
        { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} },
      ]),
    }),
  )
  expect(response.status).toBe(200)
  const body = await response.json()
  expect(Array.isArray(body)).toBe(true)
  expect(body).toHaveLength(2)
  expect(body[0].result).toEqual({})
  expect(body[1].result.tools.length).toBeGreaterThan(0)
})

test('POST JSON-RPC batch rejects invalid members with -32600', async () => {
  const response = await handleMcpRequest(
    new Request('https://capgo.app/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify([
        { jsonrpc: '2.0', id: 1, method: 'ping', params: {} },
        { jsonrpc: '2.0', id: 2 },
      ]),
    }),
  )
  expect(response.status).toBe(200)
  const body = await response.json()
  expect(body).toHaveLength(2)
  expect(body[0].result).toEqual({})
  expect(body[1].error.code).toBe(-32600)
})

test('POST JSON-RPC batch notifications return 202 without body', async () => {
  const response = await handleMcpRequest(
    new Request('https://capgo.app/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify([{ jsonrpc: '2.0', method: 'notifications/initialized', params: {} }]),
    }),
  )
  expect(response.status).toBe(202)
  expect(await response.text()).toBe('')
})

test('POST JSON-RPC batch with null id returns a response entry', async () => {
  const response = await handleMcpRequest(
    new Request('https://capgo.app/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify([{ jsonrpc: '2.0', id: null, method: 'ping', params: {} }]),
    }),
  )
  expect(response.status).toBe(200)
  const body = await response.json()
  expect(body).toHaveLength(1)
  expect(body[0].id).toBeNull()
  expect(body[0].result).toEqual({})
})

test('POST null JSON-RPC body is invalid request', async () => {
  const response = await handleMcpRequest(
    new Request('https://capgo.app/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'null',
    }),
  )
  expect(response.status).toBe(400)
  const body = await response.json()
  expect(body.error.code).toBe(-32600)
})

test('POST tools/call returns JSON-RPC tool content', async () => {
  const response = await handleMcpRequest(
    new Request('https://capgo.app/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'capgo_when_to_use', arguments: {} } }),
    }),
  )
  expect(response.status).toBe(200)
  const body = await response.json()
  expect(body.result.content[0].text).toContain('When to use Capgo')
})
