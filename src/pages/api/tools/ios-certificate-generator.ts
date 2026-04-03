import { createIosCertificateBundle, normalizeIosCertificateInput, ToolInputError } from '@/lib/tools/signing'
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
    if (error instanceof SyntaxError || error instanceof ToolInputError) {
      const message = error instanceof Error ? error.message : 'Unable to validate the iOS certificate request.'
      return webJson({ error: message }, 400, headers)
    }

    console.error('Unexpected iOS certificate generation failure', error)
    return webJson({ error: 'Internal server error generating the iOS certificate request.' }, 500, headers)
  }
}

export const ALL: APIRoute = async () => {
  return webJson({ error: 'Method not allowed.' }, 405, headers)
}
