import { createAndroidKeystoreBundle, normalizeAndroidKeystoreInput, ToolInputError } from '@/lib/tools/signing'
import { webJson } from '@/services/responses'
import type { APIRoute } from 'astro'

const headers = {
  'Cache-Control': 'no-store',
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const input = normalizeAndroidKeystoreInput(body)
    const bundle = await createAndroidKeystoreBundle(input)

    return webJson(bundle, 200, headers)
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof ToolInputError) {
      const message = error instanceof Error ? error.message : 'Unable to validate the Android keystore request.'
      return webJson({ error: message }, 400, headers)
    }

    console.error('Unexpected Android keystore generation failure', error)
    return webJson({ error: 'Internal server error generating the Android keystore.' }, 500, headers)
  }
}

export const ALL: APIRoute = async () => {
  return webJson({ error: 'Method not allowed.' }, 405, headers)
}
