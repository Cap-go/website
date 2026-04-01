import { encodePayload, extractPlistXml, parseUdidDevicePayload } from '@/lib/tools/udid'
import { webJson, webRedirect } from '@/services/responses'
import type { APIRoute } from 'astro'

const UDID_RESULT_COOKIE = 'ios_udid_payload'
const UDID_RESULT_PATH = '/tools/ios-udid-finder/result/'
const headers = {
  'Cache-Control': 'no-store',
}

export const GET: APIRoute = async () => {
  return webRedirect('/tools/ios-udid-finder/', 302, headers)
}

export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.text()
  const plistXml = extractPlistXml(rawBody)

  if (!plistXml) {
    return webJson({ error: 'The device response did not include a plist payload.' }, 400, headers)
  }

  const payload = parseUdidDevicePayload(plistXml)
  const encoded = encodePayload(payload)
  const secure = new URL(request.url).protocol === 'https:'

  return webRedirect(UDID_RESULT_PATH, 302, {
    ...headers,
    'Set-Cookie': `${UDID_RESULT_COOKIE}=${encoded}; Max-Age=300; Path=${UDID_RESULT_PATH}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`,
  })
}
