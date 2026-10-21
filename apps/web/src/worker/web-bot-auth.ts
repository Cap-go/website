import { component, createSignature } from 'http-message-sig'
import { generateNonce, HTTP_MESSAGE_SIGNATURES_DIRECTORY, sign } from 'web-bot-auth'
import { signerFromJWK } from 'web-bot-auth/crypto'
import type { WebBotSigner } from 'web-bot-auth'

export { HTTP_MESSAGE_SIGNATURES_DIRECTORY }

export const SIGNATURE_AGENT_ORIGIN = 'https://capgo.app'
export const SIGNATURE_AGENT_HEADER_VALUE = `sig1="${SIGNATURE_AGENT_ORIGIN}";type=directory`
export const DIRECTORY_CONTENT_TYPE = 'application/http-message-signatures-directory+json'
const DIRECTORY_SIGNATURE_TAG = 'http-message-signatures-directory'
const DIRECTORY_MAX_AGE_SECONDS = 86_400
const REQUEST_SIGNATURE_TTL_MS = 60_000

/** Public half of the Ed25519 key that signs capgo.app outbound requests. Private half: WEB_BOT_AUTH_PRIVATE_JWK secret. */
export const WEB_BOT_AUTH_PUBLIC_JWK: JsonWebKey = {
  kty: 'OKP',
  crv: 'Ed25519',
  x: 'b0F_MiszL_I2YXOrQMoQWF2euJv8-Bqc8fehY9uyNRA',
}

export interface WebBotAuthEnv {
  WEB_BOT_AUTH_PRIVATE_JWK?: string
}

let cachedSigner: { source: string; signer: Promise<WebBotSigner | null> } | null = null

async function loadSigner(source: string): Promise<WebBotSigner | null> {
  try {
    const jwk = JSON.parse(source) as JsonWebKey
    if (jwk.x !== WEB_BOT_AUTH_PUBLIC_JWK.x) {
      console.error('WEB_BOT_AUTH_PRIVATE_JWK does not match the published public key')
      return null
    }
    return await signerFromJWK(jwk)
  } catch (error) {
    console.error('Invalid WEB_BOT_AUTH_PRIVATE_JWK:', error)
    return null
  }
}

export function getWebBotSigner(env: WebBotAuthEnv): Promise<WebBotSigner | null> {
  const source = env.WEB_BOT_AUTH_PRIVATE_JWK?.trim()
  if (!source) return Promise.resolve(null)
  if (cachedSigner?.source !== source) cachedSigner = { source, signer: loadSigner(source) }
  return cachedSigner.signer
}

export async function handleSignaturesDirectoryRequest(request: Request, env: WebBotAuthEnv): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } })
  }

  const headers = new Headers({
    'Content-Type': DIRECTORY_CONTENT_TYPE,
    'Cache-Control': `public, max-age=${DIRECTORY_MAX_AGE_SECONDS}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD',
  })

  const signer = await getWebBotSigner(env)
  if (signer) {
    const created = Math.floor(Date.now() / 1000)
    const fields = await createSignature(
      { kind: 'response', status: 200, fields: [], request },
      {
        label: 'binding0',
        components: [component('@authority', { req: true })],
        parameters: {
          created,
          expires: created + DIRECTORY_MAX_AGE_SECONDS,
          keyid: signer.keyid,
          alg: signer.algorithm,
          tag: DIRECTORY_SIGNATURE_TAG,
        },
        signer,
      },
    )
    headers.set('Signature', fields.signature)
    headers.set('Signature-Input', fields.signatureInput)
  }

  const body = request.method === 'HEAD' ? null : JSON.stringify({ keys: [WEB_BOT_AUTH_PUBLIC_JWK] })
  return new Response(body, { status: 200, headers })
}

/** fetch() that signs the request with Web Bot Auth when the signing key is configured. */
export async function signedFetch(env: WebBotAuthEnv, input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const request = new Request(input, init)
  const signer = await getWebBotSigner(env)
  if (!signer) return fetch(request)

  request.headers.set('Signature-Agent', SIGNATURE_AGENT_HEADER_VALUE)
  const now = new Date()
  const fields = await sign(request, {
    signer,
    created: now,
    expires: new Date(now.getTime() + REQUEST_SIGNATURE_TTL_MS),
    nonce: generateNonce(),
  })
  request.headers.set('Signature', fields.signature)
  request.headers.set('Signature-Input', fields.signatureInput)
  return fetch(request)
}
