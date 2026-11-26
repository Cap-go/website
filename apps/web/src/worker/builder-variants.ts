import { BUILDER_VARIANTS_CACHE_TTL_SECONDS, BUILDER_VARIANTS_PATH, normalizeBuilderVariants } from '../lib/builderVariants'
import { cachedJsonResponse, unavailableJson } from './cached-json'
import type { BackgroundContext } from './types'
import { fetchUpstreamJson } from './upstream-json'

export interface BuilderVariantsEnv {
  // Builder GET /variants/public.
  BUILDER_VARIANTS_URL?: string
}

export async function handleBuilderVariants(request: Request, env: BuilderVariantsEnv, ctx?: BackgroundContext, fetchImpl?: typeof fetch): Promise<Response> {
  const url = env.BUILDER_VARIANTS_URL?.trim()
  if (!url) return unavailableJson('Builder variants misconfigured')

  return cachedJsonResponse(
    request,
    BUILDER_VARIANTS_PATH,
    BUILDER_VARIANTS_CACHE_TTL_SECONDS,
    async () => {
      const variants = normalizeBuilderVariants(await fetchUpstreamJson(url, fetchImpl))
      // An empty or malformed answer must not replace the last good list.
      if (!variants || variants.xcode_versions.length === 0) throw new Error('Invalid builder variants payload')
      return variants
    },
    'Builder variants are temporarily unavailable',
    ctx,
  )
}

export { BUILDER_VARIANTS_PATH }
