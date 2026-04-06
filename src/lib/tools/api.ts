import { ToolInputError } from '@/lib/tools/signing'
import { webJson } from '@/services/responses'

export const toolResponseHeaders = {
  'Cache-Control': 'no-store',
}

interface HandleToolPostOptions<TInput, TResponse> {
  create: (input: TInput) => Promise<TResponse>
  fallbackValidationMessage: string
  internalErrorMessage: string
  logLabel: string
  normalize: (body: Record<string, unknown>) => TInput
}

export async function handleToolPost<TInput, TResponse>(request: Request, options: HandleToolPostOptions<TInput, TResponse>): Promise<Response> {
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return webJson({ error: options.fallbackValidationMessage }, 400, toolResponseHeaders)
    }

    const input = options.normalize(body as Record<string, unknown>)
    const payload = await options.create(input)

    return webJson(payload, 200, toolResponseHeaders)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return webJson({ error: options.fallbackValidationMessage }, 400, toolResponseHeaders)
    }

    if (error instanceof ToolInputError) {
      return webJson({ error: error.message }, 400, toolResponseHeaders)
    }

    console.error(options.logLabel, error)
    return webJson({ error: options.internalErrorMessage }, 500, toolResponseHeaders)
  }
}
