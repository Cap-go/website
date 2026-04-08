import { handleToolPost, toolResponseHeaders } from '@/lib/tools/api'
import { createIosCertificateBundle, normalizeIosCertificateInput } from '@/lib/tools/signing'
import { webJson } from '@/services/responses'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  return await handleToolPost(request, {
    normalize: normalizeIosCertificateInput,
    create: createIosCertificateBundle,
    fallbackValidationMessage: 'Unable to validate the iOS certificate request.',
    internalErrorMessage: 'Internal server error generating the iOS certificate request.',
    logLabel: 'Unexpected iOS certificate generation failure',
  })
}

export const ALL: APIRoute = async () => {
  return webJson({ error: 'Method not allowed.' }, 405, toolResponseHeaders)
}
