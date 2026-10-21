import { expect, test } from 'bun:test'
import {
  DIRECTORY_CONTENT_TYPE,
  getWebBotSigner,
  handleSignaturesDirectoryRequest,
  HTTP_MESSAGE_SIGNATURES_DIRECTORY,
  WEB_BOT_AUTH_PUBLIC_JWK,
} from '../src/worker/web-bot-auth.ts'

const directoryUrl = `https://capgo.app${HTTP_MESSAGE_SIGNATURES_DIRECTORY}`

test('signatures directory publishes the Ed25519 public key as a JWKS', async () => {
  const response = await handleSignaturesDirectoryRequest(new Request(directoryUrl), {})
  expect(response.status).toBe(200)
  expect(response.headers.get('Content-Type')).toBe(DIRECTORY_CONTENT_TYPE)
  const body = await response.json()
  expect(body.keys).toEqual([WEB_BOT_AUTH_PUBLIC_JWK])
  expect(body.keys[0].d).toBeUndefined()
})

test('signatures directory HEAD has no body and rejects other methods', async () => {
  const head = await handleSignaturesDirectoryRequest(new Request(directoryUrl, { method: 'HEAD' }), {})
  expect(head.status).toBe(200)
  expect(await head.text()).toBe('')
  const post = await handleSignaturesDirectoryRequest(new Request(directoryUrl, { method: 'POST' }), {})
  expect(post.status).toBe(405)
})

test('a private key that does not match the published key is ignored', async () => {
  const { privateKey } = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify'])
  const jwk = await crypto.subtle.exportKey('jwk', privateKey)
  expect(await getWebBotSigner({ WEB_BOT_AUTH_PRIVATE_JWK: JSON.stringify(jwk) })).toBeNull()
  const response = await handleSignaturesDirectoryRequest(new Request(directoryUrl), { WEB_BOT_AUTH_PRIVATE_JWK: JSON.stringify(jwk) })
  expect(response.headers.get('Signature')).toBeNull()
})
