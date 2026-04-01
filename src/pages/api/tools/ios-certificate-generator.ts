import { createIosCertificateBundle, normalizeIosCertificateInput } from '@/lib/tools/signing'
import { webJson } from '@/services/responses'
import type { APIRoute } from 'astro'

const headers = {
  'Cache-Control': 'no-store',
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const input = normalizeIosCertificateInput(body)
    const bundle = await createIosCertificateBundle(input)

    return webJson(bundle, 200, headers)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to generate the iOS signing request.'
    return webJson({ error: message }, 400, headers)
  }
}

export const ALL: APIRoute = async () => {
  return webJson({ error: 'Method not allowed.' }, 405, headers)
}
