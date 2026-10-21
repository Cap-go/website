import { expect, test } from 'bun:test'
import { EMPTY_JWKS, handleJwksRequest, loadAuthorizationServerMetadata } from '../src/worker/oauth-discovery.ts'

const upstream = {
  issuer: 'https://api.capgo.app',
  authorization_endpoint: 'https://api.capgo.app/mcp/oauth/authorize',
  token_endpoint: 'https://api.capgo.app/mcp/oauth/token',
  response_types_supported: ['code'],
  grant_types_supported: ['authorization_code'],
}

const fakeFetch = (body, status = 200) => async () => new Response(JSON.stringify(body), { status })

test('authorization server metadata mirrors api.capgo.app and adds a jwks_uri', async () => {
  const metadata = await loadAuthorizationServerMetadata(fakeFetch(upstream))
  expect(metadata.issuer).toBe('https://api.capgo.app')
  expect(metadata.authorization_endpoint).toBe(upstream.authorization_endpoint)
  expect(metadata.token_endpoint).toBe(upstream.token_endpoint)
  expect(metadata.grant_types_supported).toEqual(['authorization_code'])
  expect(metadata.response_types_supported).toEqual(['code'])
  expect(metadata.jwks_uri).toBe('https://capgo.app/.well-known/jwks.json')
})

test('upstream jwks_uri wins once the authorization server publishes one', async () => {
  const metadata = await loadAuthorizationServerMetadata(fakeFetch({ ...upstream, jwks_uri: 'https://api.capgo.app/jwks' }))
  expect(metadata.jwks_uri).toBe('https://api.capgo.app/jwks')
})

test('authorization server metadata rejects failures and unexpected issuers', async () => {
  await expect(loadAuthorizationServerMetadata(fakeFetch({}, 503))).rejects.toThrow()
  await expect(loadAuthorizationServerMetadata(fakeFetch({ ...upstream, issuer: 'https://evil.example' }))).rejects.toThrow()
})

test('jwks.json is a valid, empty key set', async () => {
  const response = handleJwksRequest(new Request('https://capgo.app/.well-known/jwks.json'))
  expect(response.status).toBe(200)
  expect(response.headers.get('Content-Type')).toBe('application/jwk-set+json')
  expect(await response.json()).toEqual(EMPTY_JWKS)
})
