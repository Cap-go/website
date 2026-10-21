import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { agentSurfaceResponse } from '../src/worker/index.ts'
import { handleMcpManifestRequest } from '../src/worker/mcp.ts'

const mockAssetsEnv = {
  ASSETS: {
    fetch() {
      return Promise.resolve(new Response('not found', { status: 404 }))
    },
  },
}

test('/mcp is a regular page, not a JSON-RPC endpoint', async () => {
  for (const pathname of ['/mcp', '/mcp/']) {
    const post = new Request(`https://capgo.app${pathname}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
    })
    expect(await agentSurfaceResponse(post, mockAssetsEnv, pathname)).toBeNull()
    const sse = new Request(`https://capgo.app${pathname}`, { method: 'GET', headers: { Accept: 'text/event-stream' } })
    expect(await agentSurfaceResponse(sse, mockAssetsEnv, pathname)).toBeNull()
  }
})

test('GET /.well-known/mcp.json points at the hosted MCP server', async () => {
  const response = await agentSurfaceResponse(new Request('https://capgo.app/.well-known/mcp.json'), mockAssetsEnv, '/.well-known/mcp.json')
  expect(response?.status).toBe(200)
  const body = await response?.json()
  expect(body.transport).toEqual({ type: 'streamable-http', url: 'https://api.capgo.app/mcp' })
  expect(body.authentication.required).toBe(true)
  expect(body.authentication.schemes).toEqual(['oauth2', 'bearer'])
  expect(body.websiteUrl).toBe('https://capgo.app/mcp/')
  expect(body.toolGroups.length).toBeGreaterThan(5)
  expect(JSON.stringify(body)).not.toContain('capgo_when_to_use')
})

test('manifest rejects non-GET methods', async () => {
  const response = handleMcpManifestRequest(new Request('https://capgo.app/.well-known/mcp.json', { method: 'POST' }))
  expect(response.status).toBe(405)
})

test('server card points at the hosted MCP server', () => {
  const card = JSON.parse(readFileSync(new URL('../public/.well-known/mcp/server-card.json', import.meta.url), 'utf8'))
  expect(card.transport).toEqual({ type: 'streamable-http', url: 'https://api.capgo.app/mcp' })
  expect(card.authentication.required).toBe(true)
  expect(card.instructions).toContain('https://api.capgo.app/mcp')
  expect(JSON.stringify(card)).not.toMatch(/"https:\/\/capgo\.app\/mcp"/)
})

test('GET /.well-known/agent-card.json serves an A2A Agent Card for the hosted MCP server', async () => {
  const response = await agentSurfaceResponse(new Request('https://capgo.app/.well-known/agent-card.json'), mockAssetsEnv, '/.well-known/agent-card.json')
  expect(response?.status).toBe(200)
  expect(response?.headers.get('Content-Type')).toContain('application/json')
  const card = await response?.json()
  for (const field of ['name', 'version', 'description', 'supportedInterfaces', 'capabilities', 'skills', 'defaultInputModes', 'defaultOutputModes']) {
    expect(card[field]).toBeDefined()
  }
  expect(card.supportedInterfaces[0].url).toBe('https://api.capgo.app/mcp')
  expect(card.supportedInterfaces[0].protocolBinding).toStartWith('https://modelcontextprotocol.io/specification/')
  expect(card.supportedInterfaces[0].protocolVersion).toBe('1.0')
  expect(card.skills.length).toBeGreaterThan(5)
  for (const skill of card.skills) {
    expect(typeof skill.id).toBe('string')
    expect(typeof skill.name).toBe('string')
    expect(typeof skill.description).toBe('string')
    expect(Array.isArray(skill.tags)).toBe(true)
  }
  expect(new Set(card.skills.map((skill) => skill.id)).size).toBe(card.skills.length)
  expect(Object.keys(card.securitySchemes)).toEqual(['oauth2', 'apiKey'])
})

test('legacy /.well-known/agent.json serves the same Agent Card', async () => {
  const response = await agentSurfaceResponse(new Request('https://capgo.app/.well-known/agent.json'), mockAssetsEnv, '/.well-known/agent.json')
  expect(response?.status).toBe(200)
  expect((await response?.json()).name).toBe('Capgo')
})

test('GET /.well-known/oauth-protected-resource serves RFC 9728 metadata for capgo.app', async () => {
  const pathname = '/.well-known/oauth-protected-resource'
  const response = await agentSurfaceResponse(new Request(`https://capgo.app${pathname}`), mockAssetsEnv, pathname)
  expect(response?.status).toBe(200)
  expect(response?.headers.get('Content-Type')).toContain('application/json')
  const metadata = await response?.json()
  expect(metadata.resource).toBe('https://capgo.app')
  expect(metadata.authorization_servers).toEqual(['https://capgo.app'])
  expect(metadata.scopes_supported).toEqual(['capgo'])
  expect(metadata.bearer_methods_supported).toEqual(['header'])
})
