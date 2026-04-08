import { handleToolPost, toolResponseHeaders } from '@/lib/tools/api'
import { createAndroidKeystoreBundle, normalizeAndroidKeystoreInput } from '@/lib/tools/signing'
import { webJson } from '@/services/responses'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  return await handleToolPost(request, {
    normalize: normalizeAndroidKeystoreInput,
    create: createAndroidKeystoreBundle,
    fallbackValidationMessage: 'Unable to validate the Android keystore request.',
    internalErrorMessage: 'Internal server error generating the Android keystore.',
    logLabel: 'Unexpected Android keystore generation failure',
  })
}

export const ALL: APIRoute = async () => {
  return webJson({ error: 'Method not allowed.' }, 405, toolResponseHeaders)
}
