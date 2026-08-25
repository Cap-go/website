import { expect, test } from 'bun:test'
import { callTool, handleMcpRequest, handleRpc, listTools } from '../src/worker/mcp.ts'

test('MCP initialize returns Streamable HTTP protocol metadata', () => {
  const result = handleRpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} })
  expect(result.status).toBe(200)
  const body = result.body as { result: { protocolVersion: string; serverInfo: { name: string }; capabilities: { tools: unknown } } }
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

test('GET /mcp returns the manifest with streamable-http transport', async () => {
  const response = await handleMcpRequest(new Request('https://capgo.app/mcp', { method: 'GET' }))
  expect(response.status).toBe(200)
  const body = await response.json()
  expect(body.transport.type).toBe('streamable-http')
  expect(body.transport.url).toBe('https://capgo.app/mcp')
  expect(body.tools.length).toBeGreaterThan(0)
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
