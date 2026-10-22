import { expect, test } from 'bun:test'
import { loadAuthorizationServerMetadata } from '../src/worker/oauth-discovery.ts'

const upstream = {
  issuer: 'https://capgo.app',
  authorization_endpoint: 'https://api.capgo.app/mcp/oauth/authorize',
  token_endpoint: 'https://api.capgo.app/mcp/oauth/token',
  response_types_supported: ['code'],
  grant_types_supported: ['authorization_code'],
}

const fakeFetch = (responses) => async (url) => {
  const [body, status = 200] = responses[url] ?? [{ error: 'not_found' }, 404]
  return new Response(JSON.stringify(body), { status })
}

const METADATA_URL = 'https://api.capgo.app/mcp/oauth/metadata'
const WELL_KNOWN_URL = 'https://api.capgo.app/.well-known/oauth-authorization-server'

test('authorization server metadata comes from the API metadata endpoint for the capgo.app issuer', async () => {
  expect(await loadAuthorizationServerMetadata(fakeFetch({ [METADATA_URL]: [upstream] }))).toEqual(upstream)
})

test('falls back to the API well-known URL served by older API releases', async () => {
  expect(await loadAuthorizationServerMetadata(fakeFetch({ [WELL_KNOWN_URL]: [upstream] }))).toEqual(upstream)
})

test('metadata naming another issuer is never served from capgo.app', async () => {
  const oldIssuer = { ...upstream, issuer: 'https://api.capgo.app' }
  await expect(loadAuthorizationServerMetadata(fakeFetch({ [METADATA_URL]: [oldIssuer], [WELL_KNOWN_URL]: [oldIssuer] }))).rejects.toThrow()
  await expect(loadAuthorizationServerMetadata(fakeFetch({}))).rejects.toThrow()
})

test('the auth.md agent_auth block from the API is served unchanged', async () => {
  const withAgentAuth = {
    ...upstream,
    grant_types_supported: ['authorization_code', 'urn:workos:agent-auth:grant-type:claim'],
    agent_auth: {
      skill: 'https://capgo.app/auth.md',
      identity_endpoint: 'https://api.capgo.app/agent/identity',
      claim_endpoint: 'https://api.capgo.app/agent/identity/claim',
      identity_types_supported: ['service_auth'],
    },
  }
  expect(await loadAuthorizationServerMetadata(fakeFetch({ [METADATA_URL]: [withAgentAuth] }))).toEqual(withAgentAuth)
})
