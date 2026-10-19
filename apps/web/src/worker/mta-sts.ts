const MTA_STS_PATH = '/.well-known/mta-sts.txt'

const MTA_STS_POLICY_ID = {
  'capgo.app': 'capgo-app-gws-20260923',
  'usecapgo.com': 'usecapgo-com-cf-20260923',
} as const

const MTA_STS_MX: Record<keyof typeof MTA_STS_POLICY_ID, readonly string[]> = {
  'capgo.app': [
    'aspmx.l.google.com',
    'alt1.aspmx.l.google.com',
    'alt2.aspmx.l.google.com',
    'alt3.aspmx.l.google.com',
    'alt4.aspmx.l.google.com',
  ],
  'usecapgo.com': [
    'route3.mx.cloudflare.net',
    'route2.mx.cloudflare.net',
    'route1.mx.cloudflare.net',
  ],
}

const MTA_STS_HOST_TO_DOMAIN: Record<string, keyof typeof MTA_STS_POLICY_ID> = {
  'mta-sts.capgo.app': 'capgo.app',
  'mta-sts.usecapgo.com': 'usecapgo.com',
}

export function mtaStsPolicyId(domain: keyof typeof MTA_STS_POLICY_ID): string {
  return MTA_STS_POLICY_ID[domain]
}

export function buildMtaStsPolicy(domain: keyof typeof MTA_STS_POLICY_ID): string {
  const mxLines = MTA_STS_MX[domain].map((host) => `mx: ${host}`).join('\n')
  return ['version: STSv1', 'mode: testing', 'max_age: 86400', mxLines].join('\n')
}

export function isMtaStsHost(hostname: string): boolean {
  return Object.hasOwn(MTA_STS_HOST_TO_DOMAIN, hostname)
}

export function handleMtaStsRequest(request: Request): Response | null {
  const url = new URL(request.url)
  if (!Object.hasOwn(MTA_STS_HOST_TO_DOMAIN, url.hostname)) return null
  const domain = MTA_STS_HOST_TO_DOMAIN[url.hostname]

  if (url.pathname !== MTA_STS_PATH) {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const body = buildMtaStsPolicy(domain)
  return new Response(request.method === 'HEAD' ? null : body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
