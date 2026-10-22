import { expect, test } from 'bun:test'
import { agentAuthUpstreamPath, proxyAgentAuthRequest } from '../src/worker/agent-auth-proxy.ts'
import { agentSurfaceResponse } from '../src/worker/index.ts'

function recorder(response = new Response('{"ok":true}', { status: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })) {
  const calls = []
  return {
    calls,
    binding: {
      async fetch(request) {
        calls.push({ url: request.url, method: request.method, headers: Object.fromEntries(request.headers), body: await request.text() })
        return response
      },
    },
  }
}

test('maps the capgo.app agent registration paths onto the API worker', () => {
  expect(agentAuthUpstreamPath('/agent/identity')).toBe('/agent/identity')
  expect(agentAuthUpstreamPath('/agent/identity/')).toBe('/agent/identity')
  expect(agentAuthUpstreamPath('/agent/identity/claim')).toBe('/agent/identity/claim')
  expect(agentAuthUpstreamPath('/oauth2/token')).toBe('/mcp/oauth/token')
  expect(agentAuthUpstreamPath('/oauth2/revoke')).toBe('/mcp/oauth/revoke')
  expect(agentAuthUpstreamPath('/agent')).toBeNull()
  expect(agentAuthUpstreamPath('/oauth2/authorize')).toBeNull()
})

test('forwards method, body, query and client IP through the service binding', async () => {
  const { calls, binding } = recorder()
  const request = new Request('https://capgo.app/oauth2/token?x=1', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'cf-connecting-ip': '203.0.113.7' },
    body: 'grant_type=urn%3Aworkos%3Aagent-auth%3Agrant-type%3Aclaim&claim_token=clm_x',
  })
  const response = await proxyAgentAuthRequest(request, '/mcp/oauth/token', binding)

  expect(response.status).toBe(200)
  expect(response.headers.get('cache-control')).toBe('no-store')
  expect(calls).toHaveLength(1)
  expect(calls[0]).toMatchObject({
    url: 'https://api.capgo.app/mcp/oauth/token?x=1',
    method: 'POST',
    body: 'grant_type=urn%3Aworkos%3Aagent-auth%3Agrant-type%3Aclaim&claim_token=clm_x',
  })
  // The API rate-limits per client IP, so the agent's address must survive the hop.
  expect(calls[0].headers['cf-connecting-ip']).toBe('203.0.113.7')
})

test('passes API errors through unchanged', async () => {
  const { binding } = recorder(new Response('{"error":"anonymous_not_enabled"}', { status: 400 }))
  const response = await proxyAgentAuthRequest(new Request('https://capgo.app/agent/identity', { method: 'POST', body: '{"type":"anonymous"}' }), '/agent/identity', binding)
  expect(response.status).toBe(400)
  expect(await response.json()).toEqual({ error: 'anonymous_not_enabled' })
})

test('the worker routes /agent/identity to the CAPGO_API binding', async () => {
  const { calls, binding } = recorder()
  const env = { ASSETS: { fetch: async () => new Response('asset') }, CAPGO_API: binding }
  const request = new Request('https://capgo.app/agent/identity', { method: 'POST', body: '{"type":"service_auth","login_hint":"dev@example.com"}' })
  const response = await agentSurfaceResponse(request, env, '/agent/identity')
  expect(response?.status).toBe(200)
  expect(calls[0].url).toBe('https://api.capgo.app/agent/identity')
  expect(calls[0].body).toContain('service_auth')
})
