import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { mcpManifest, PUBLIC_MCP_URL, WHEN_TO_USE_MARKDOWN } from '../../shared/agentDiscovery'
import { actions, pluginCount } from '../src/config/plugins'
import { agentSurfaceResponse } from '../src/worker/index'
import { handlePublicMcp } from '../src/worker/public-mcp'

const env = { PUBLIC_MCP_RATE_LIMITER: { limit: async () => ({ success: true }) } }
function request(body, headers = {}) {
  return new Request(PUBLIC_MCP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'CF-Connecting-IP': '192.0.2.1', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}
async function rpc(
  method,
  params = {},
  fetchImpl = () => {
    throw new Error('Unexpected outbound request')
  },
  cache,
) {
  const response = await handlePublicMcp(request({ jsonrpc: '2.0', id: 7, method, params }), env, fetchImpl, cache)
  expect(response.status).toBe(200)
  return response.json()
}
function content(message) {
  return JSON.parse(message.result.content[0].text)
}

test('initializes and lists only public tools through the website worker without credentials', async () => {
  const initialized = await agentSurfaceResponse(request({ jsonrpc: '2.0', id: 'init', method: 'initialize', params: { protocolVersion: '2025-11-25' } }), env, '/mcp/public')
  expect(initialized.status).toBe(200)
  expect(initialized.headers.get('www-authenticate')).toBeNull()
  expect(await initialized.json()).toMatchObject({ id: 'init', result: { protocolVersion: '2025-11-25', serverInfo: { name: 'capgo-public' } } })
  const listed = await rpc('tools/list')
  expect(listed.result.tools.map((tool) => tool.name)).toEqual(['capgo_search_docs', 'capgo_list_plugins', 'capgo_list_free_tools'])
  for (const tool of listed.result.tools) {
    expect(tool.annotations).toMatchObject({ readOnlyHint: true, destructiveHint: false })
    expect(tool.inputSchema.type).toBe('object')
  }
  const protectedCall = await rpc('tools/call', { name: 'capgo_list_apps', arguments: {} })
  expect(protectedCall.result.isError).toBe(true)
})

test('plugin discovery searches and paginates the real registry', async () => {
  const first = content(await rpc('tools/call', { name: 'capgo_list_plugins', arguments: { limit: 2 } }))
  expect(first.registryCount).toBe(pluginCount)
  expect(first.total).toBe(actions.length)
  expect(first.plugins).toHaveLength(2)
  expect(first.nextOffset).toBe(2)
  const second = content(await rpc('tools/call', { name: 'capgo_list_plugins', arguments: { offset: first.nextOffset, limit: 2 } }))
  expect(second.plugins[0].package).not.toBe(first.plugins[0].package)
  const search = content(await rpc('tools/call', { name: 'capgo_list_plugins', arguments: { query: 'biometric', category: 'auth-security' } }))
  expect(search.plugins.some((plugin) => plugin.package === '@capgo/capacitor-native-biometric')).toBe(true)
  expect(search.plugins.every((plugin) => plugin.category === 'auth-security')).toBe(true)
  expect(search.plugins[0].url).toStartWith('https://capgo.app/plugins/')
})

test('free tools return existing browser destinations and local signing guidance', async () => {
  const result = content(await rpc('tools/call', { name: 'capgo_list_free_tools' }))
  expect(result.tools.map((tool) => tool.url)).toEqual([
    'https://capgo.app/tools/ios-certificate-generator/',
    'https://capgo.app/tools/ios-udid-finder/',
    'https://capgo.app/tools/android-keystore-generator/',
  ])
  expect(result.tools[0].instructions).toContain('Keep signing material local')
})

test('docs search is constrained to the public index, filters foreign URLs, and caches results', async () => {
  let fetchCount = 0
  const fetchImpl = async (url, init) => {
    fetchCount++
    expect(url).toBe('https://R0TIQUJRSN-dsn.algolia.net/1/indexes/capgo/query')
    expect(init.headers.Authorization).toBeUndefined()
    expect(JSON.parse(init.body)).toMatchObject({ query: 'live updates', facetFilters: ['lang:en'] })
    return Response.json({
      hits: [
        { url: 'https://foreign.example/docs/', content: 'Exclude this' },
        { url: 'https://capgo.app/docs/live-updates/', hierarchy: { lvl0: 'Docs', lvl1: 'Live &amp; updates' }, content: 'Learn how to deploy' },
        { url: 'https://capgo.app/docs/live-updates/', content: 'Duplicate' },
      ],
    })
  }
  const entries = new Map()
  const cache = {
    match: async (key) => entries.get(key.url)?.clone(),
    put: async (key, response) => {
      entries.set(key.url, response)
    },
  }
  const params = { name: 'capgo_search_docs', arguments: { query: 'live updates' } }
  const first = content(await rpc('tools/call', params, fetchImpl, cache))
  expect(first.results).toEqual([{ title: 'Live & updates', url: 'https://capgo.app/docs/live-updates/', snippet: 'Learn how to deploy' }])
  expect(content(await rpc('tools/call', params, fetchImpl, cache))).toEqual(first)
  expect(fetchCount).toBe(1)
})

test('upstream search failures and invalid arguments are tool errors, with no private details', async () => {
  const failed = await rpc('tools/call', { name: 'capgo_search_docs', arguments: { query: 'test' } }, async () => {
    throw new Error('private upstream details')
  })
  expect(failed.result.isError).toBe(true)
  expect(JSON.stringify(failed)).not.toContain('private upstream details')
  const invalid = await rpc('tools/call', { name: 'capgo_search_docs', arguments: { query: 'test', url: 'https://foreign.example/' } })
  expect(invalid.result.isError).toBe(true)
})

test('transport handles notifications, methods, malformed JSON, batch rejection, and byte limits', async () => {
  const notification = await handlePublicMcp(request({ jsonrpc: '2.0', method: 'notifications/initialized' }), env)
  expect(notification.status).toBe(202)
  expect(await notification.text()).toBe('')
  expect((await handlePublicMcp(new Request(PUBLIC_MCP_URL), env)).status).toBe(405)
  expect((await handlePublicMcp(new Request(PUBLIC_MCP_URL, { method: 'OPTIONS' }), env)).status).toBe(204)
  expect((await handlePublicMcp(request('{'), env)).status).toBe(400)
  expect((await handlePublicMcp(request([]), env)).status).toBe(400)
  expect((await handlePublicMcp(request('€'.repeat(6000)), env)).status).toBe(413)
  expect((await handlePublicMcp(request('{}', { 'Content-Type': 'text/plain' }), env)).status).toBe(415)
  expect((await handlePublicMcp(request('{}', { 'MCP-Protocol-Version': 'unsupported' }), env)).status).toBe(400)
})

test('uses Cloudflare client IP for rate limiting and fails closed if unavailable', async () => {
  let capturedKey
  const limited = await handlePublicMcp(request('{}', { 'X-Forwarded-For': '198.51.100.2' }), {
    PUBLIC_MCP_RATE_LIMITER: {
      limit: async ({ key }) => {
        capturedKey = key
        return { success: false }
      },
    },
  })
  expect(capturedKey).toBe('192.0.2.1')
  expect(limited.status).toBe(429)
  expect(limited.headers.get('retry-after')).toBe('60')
  expect((await handlePublicMcp(request('{}'), {})).status).toBe(503)
  expect(
    (
      await handlePublicMcp(request('{}'), {
        PUBLIC_MCP_RATE_LIMITER: {
          limit: async () => {
            throw new Error('Unavailable')
          },
        },
      })
    ).status,
  ).toBe(503)
})

test('catalogs and agent guidance advertise the public endpoint alongside protected MCP', () => {
  expect(WHEN_TO_USE_MARKDOWN).toContain(PUBLIC_MCP_URL)
  expect(mcpManifest().transport.url).toBe('https://api.capgo.app/mcp')
  expect(mcpManifest().publicServers[0]).toMatchObject({ transport: { url: PUBLIC_MCP_URL }, authentication: { required: false } })
  for (const name of ['ard', 'ai-catalog']) {
    const catalog = JSON.parse(readFileSync(new URL(`../public/.well-known/${name}.json`, import.meta.url)))
    expect(catalog.entries.some((entry) => entry.url === `${PUBLIC_MCP_URL}/server-card.json`)).toBe(true)
  }
})
