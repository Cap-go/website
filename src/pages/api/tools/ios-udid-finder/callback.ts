import { encodePayload, extractPlistXml, parseUdidDevicePayload } from '@/lib/tools/udid'
import { webJson, webRedirect } from '@/services/responses'
import type { APIRoute } from 'astro'

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

  return webRedirect(`/tools/ios-udid-finder/result/?payload=${encodeURIComponent(encoded)}`, 302, headers)
}
