import { expect, test } from 'bun:test'
import { component, verifySignature } from 'http-message-sig'
import { verify } from 'web-bot-auth'
import { verifierFromJWK } from 'web-bot-auth/crypto'
import {
  DIRECTORY_CONTENT_TYPE,
  getWebBotSigner,
  handleSignaturesDirectoryRequest,
  HTTP_MESSAGE_SIGNATURES_DIRECTORY,
  SIGNATURE_AGENT_HEADER_VALUE,
  signedFetch,
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

async function generateKeyPair() {
  const { privateKey, publicKey } = await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify'])
  const privateJwk = await crypto.subtle.exportKey('jwk', privateKey)
  const { kty, crv, x } = await crypto.subtle.exportKey('jwk', publicKey)
  return { env: { WEB_BOT_AUTH_PRIVATE_JWK: JSON.stringify(privateJwk) }, publicJwk: { kty, crv, x } }
}

test('a matching key signs the directory response for the requesting authority', async () => {
  const { env, publicJwk } = await generateKeyPair()
  const verifier = await verifierFromJWK(publicJwk)
  const request = new Request(directoryUrl)
  const response = await handleSignaturesDirectoryRequest(request, env, publicJwk)
  expect(await response.json()).toEqual({ keys: [publicJwk] })
  expect(response.headers.get('Signature-Input')).toContain('tag="http-message-signatures-directory"')

  const fields = [...response.headers].map(([name, value]) => ({ name, value }))
  const policy = { algorithms: ['ed25519'], requiredComponents: [component('@authority', { req: true })], requiredParameters: ['created', 'expires', 'keyid', 'tag'] }
  const verifyFor = (req) => verifySignature({ kind: 'response', status: 200, fields, request: req }, { label: 'binding0', policy, resolveVerifier: () => verifier })
  await expect(verifyFor(request)).resolves.toBeDefined()
  await expect(verifyFor(new Request('https://evil.example/.well-known/http-message-signatures-directory'))).rejects.toThrow()
})

test('signedFetch adds verifiable Web Bot Auth headers', async () => {
  const { env, publicJwk } = await generateKeyPair()
  let sent
  await signedFetch(env, 'https://status.capgo.app/status.json', undefined, {
    publicJwk,
    fetchImpl: async (request) => {
      sent = request
      return new Response('ok')
    },
  })
  expect(sent.headers.get('Signature-Agent')).toBe(SIGNATURE_AGENT_HEADER_VALUE)
  expect(sent.headers.get('Signature-Input')).toContain('tag="web-bot-auth"')
  expect(sent.headers.get('Signature')).toBeTruthy()
  const verifier = await verifierFromJWK(publicJwk)
  const verified = await verify(sent, { resolver: () => verifier })
  expect(verified.signatureAgent?.uri).toBe('https://capgo.app')
})

test('signedFetch sends unsigned requests when no key is configured', async () => {
  let sent
  await signedFetch({}, 'https://status.capgo.app/status.json', undefined, {
    fetchImpl: async (request) => {
      sent = request
      return new Response('ok')
    },
  })
  expect(sent.headers.get('Signature')).toBeNull()
  expect(sent.headers.get('Signature-Agent')).toBeNull()
})

test('a malformed private key never reaches the logs', async () => {
  const secret = '{"kty":"OKP","d":"super-secret-material"'
  const errors = []
  const original = console.error
  console.error = (...args) => errors.push(args.map(String).join(' '))
  try {
    expect(await getWebBotSigner({ WEB_BOT_AUTH_PRIVATE_JWK: secret })).toBeNull()
  } finally {
    console.error = original
  }
  expect(errors.join('\n')).not.toContain('super-secret-material')
})
