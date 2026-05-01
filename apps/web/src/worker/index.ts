import { handleToolApiRequest } from '../lib/tools/api'

interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  }
  PERSONAL_ACCESS_TOKEN?: string
  IOS_UDID_PROFILE_SIGNING_CERT_PEM?: string
  IOS_UDID_PROFILE_SIGNING_KEY_PEM?: string
  IOS_UDID_PROFILE_SIGNING_CHAIN_PEM?: string
}

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}

function webJson(body: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...headers,
    },
  })
}

async function handleSponsors(env: Env): Promise<Response> {
  const token = env.PERSONAL_ACCESS_TOKEN?.trim()
  if (!token) {
    return webJson([], 500)
  }

  const query = `
    query {
      riderx: user(login: "riderx") {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              ... on User {
                login
                name
                url
                avatarUrl
              }
              ... on Organization {
                login
                avatarUrl
                url
                name
              }
            }
            isActive
            tier {
              monthlyPriceInDollars
            }
          }
        }
      }
      capgo: organization(login: "Cap-go") {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              ... on User {
                login
                name
                avatarUrl
                url
              }
              ... on Organization {
                login
                avatarUrl
                url
                name
              }
            }
            isActive
            tier {
              monthlyPriceInDollars
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('GitHub API error:', response.status, response.statusText, body)
      return webJson([], 500)
    }

    const data = await response.json()
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      return webJson([], 500)
    }

    const riderxNodes = data?.data?.riderx?.sponsorshipsAsMaintainer?.nodes || []
    const capgoNodes = data?.data?.capgo?.sponsorshipsAsMaintainer?.nodes || []
    const allSponsors = [...riderxNodes, ...capgoNodes]
    const calculateTier = (sponsorship: any) => {
      const tier = sponsorship?.tier?.monthlyPriceInDollars ?? 0
      if (tier >= 100) return 'platinum'
      if (tier >= 50) return 'gold'
      if (tier >= 25) return 'silver'
      return 'baker'
    }

    return webJson(
      allSponsors.map((sponsorship) => {
        const sponsor = sponsorship.sponsorEntity
        return {
          id: sponsor.login,
          name: sponsor.name || sponsor.login,
          imageUrl: sponsor.avatarUrl,
          url: sponsor.url,
          tier: calculateTier(sponsorship),
        }
      }),
    )
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return webJson([], 500)
  }
}

async function handleStatus(): Promise<Response> {
  try {
    const response = await fetch('https://status.capgo.app/status.json')
    if (!response.ok) {
      console.error('Status API error:', response.status, response.statusText)
      return webJson({ indicator: 'unknown', uptime: 'N/A' }, 500)
    }
    const data = await response.json()
    return webJson(data)
  } catch (error) {
    console.error('Error fetching status:', error)
    return webJson({ indicator: 'unknown', uptime: 'N/A' }, 500)
  }
}

type RouteDefinition = {
  methods: readonly string[]
  handle: (request: Request, env: Env) => Promise<Response>
}

type LinkDefinition = {
  href: string
  rel: string
  type?: string
}

const HOMEPAGE_LINK_HEADERS: LinkDefinition[] = [
  { href: '/docs/public-api/', rel: 'service-doc', type: 'text/html' },
]

const routeDefinitions: Record<string, RouteDefinition> = {
  '/sponsors.json': {
    methods: ['GET'],
    handle: async (_request, env) => await handleSponsors(env),
  },
  '/status.json': {
    methods: ['GET'],
    handle: async () => await handleStatus(),
  },
}

async function handleRouteRequest(request: Request, env: Env, pathname: string): Promise<Response | null> {
  const route = routeDefinitions[pathname]
  if (!route) return null
  if (!route.methods.includes(request.method)) return webJson({ error: 'Method not allowed.' }, 405)
  return await route.handle(request, env)
}

function withLinkHeaders(response: Response, links: LinkDefinition[]): Response {
  if (!links.length) return response

  const headers = new Headers(response.headers)
  for (const link of links) {
    const valueParts = [`<${link.href}>`, `rel="${link.rel}"`]
    if (link.type) valueParts.push(`type="${link.type}"`)
    const value = valueParts.join('; ')
    const existingLinkHeader = headers.get('Link')
    if (!existingLinkHeader || !existingLinkHeader.includes(value)) {
      headers.append('Link', value)
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = new URL(request.url).pathname
    const toolRouteResponse = await handleToolApiRequest(
      request,
      {
        IOS_UDID_PROFILE_SIGNING_CERT_PEM: env.IOS_UDID_PROFILE_SIGNING_CERT_PEM,
        IOS_UDID_PROFILE_SIGNING_KEY_PEM: env.IOS_UDID_PROFILE_SIGNING_KEY_PEM,
        IOS_UDID_PROFILE_SIGNING_CHAIN_PEM: env.IOS_UDID_PROFILE_SIGNING_CHAIN_PEM,
      },
      pathname,
    )
    if (toolRouteResponse) return toolRouteResponse
    const routeResponse = await handleRouteRequest(request, env, pathname)
    if (routeResponse) return routeResponse
    const assetResponse = await env.ASSETS.fetch(request)
    if (pathname === '/' || pathname === '/index.html') {
      return withLinkHeaders(assetResponse, HOMEPAGE_LINK_HEADERS)
    }
    return assetResponse
  },
}
