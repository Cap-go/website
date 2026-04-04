import { encodePayload, extractPlistXml, parseUdidDevicePayload } from '@/lib/tools/udid'
import { webJson } from '@/services/responses'
import type { APIRoute } from 'astro'

const UDID_RESULT_COOKIE = 'ios_udid_payload'
const UDID_CHALLENGE_COOKIE = 'ios_udid_challenge'
const UDID_RESULT_PATH = '/tools/ios-udid-finder/result/'
const UDID_CALLBACK_PATH = '/api/tools/ios-udid-finder/callback'
const headers = {
  'Cache-Control': 'no-store',
}

function hasMatchingChallenge(expectedChallenge: string, cookieChallenge: string | null, payloadChallenge: string | undefined): boolean {
  return Boolean(expectedChallenge) && Boolean(cookieChallenge) && Boolean(payloadChallenge) && expectedChallenge === cookieChallenge && payloadChallenge === expectedChallenge
}

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      ...headers,
      Location: '/tools/ios-udid-finder/',
    },
  })
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const rawBody = await request.text()
  const plistXml = extractPlistXml(rawBody)

  if (!plistXml) {
    return webJson({ error: 'The device response did not include a plist payload.' }, 400, headers)
  }

  const payload = parseUdidDevicePayload(plistXml)
  const requestUrl = new URL(request.url)
  const expectedChallenge = requestUrl.searchParams.get('challenge') ?? ''
  const cookieChallenge = cookies.get(UDID_CHALLENGE_COOKIE)?.value ?? null

  if (!hasMatchingChallenge(expectedChallenge, cookieChallenge, payload.challenge)) {
    return webJson({ error: 'The device response challenge did not match the active UDID session.' }, 400, headers)
  }

  const encoded = encodePayload(payload)
  const secure = requestUrl.protocol === 'https:'
  const response = new Response(null, {
    status: 302,
    headers: {
      ...headers,
      Location: UDID_RESULT_PATH,
    },
  })

  response.headers.append('Set-Cookie', `${UDID_RESULT_COOKIE}=${encoded}; Max-Age=300; Path=${UDID_RESULT_PATH}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`)
  response.headers.append('Set-Cookie', `${UDID_CHALLENGE_COOKIE}=; Max-Age=0; Path=${UDID_CALLBACK_PATH}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`)

  return response
}
