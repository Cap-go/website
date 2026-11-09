import { BENTO_SECURITY_ADVISORY_SUBSCRIBE_PATH } from '@/config/bentoMarketing'
import { type BentoMarketingEnv, handleSecurityAdvisorySubscribeRequest } from './bentoSubscribe'

type RouteDefinition = {
  methods: string[]
  handle: (request: Request, env: BentoMarketingEnv) => Promise<Response>
}

function methodNotAllowed(): Response {
  return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      Allow: 'POST',
      'Cache-Control': 'no-store',
    },
  })
}

const marketingRoutes: Record<string, RouteDefinition> = {
  [BENTO_SECURITY_ADVISORY_SUBSCRIBE_PATH]: {
    methods: ['POST'],
    handle: (request, env) => handleSecurityAdvisorySubscribeRequest(request, env),
  },
}

export async function handleMarketingApiRequest(
  request: Request,
  env: BentoMarketingEnv,
  pathname = new URL(request.url).pathname,
): Promise<Response | null> {
  const route = marketingRoutes[pathname]
  if (!route) return null
  if (!route.methods.includes(request.method)) return methodNotAllowed()
  return await route.handle(request, env)
}
