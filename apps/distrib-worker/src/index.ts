interface Env {
  DISTRIB_ACCESS_TOKEN?: string
  PERSONAL_ACCESS_TOKEN?: string
  GITHUB_OWNER: string
  GITHUB_REPO: string
  GITHUB_EVENT_TYPE?: string
}

interface DistribArticle {
  id?: string
  title?: string
  slug?: string
  content_html?: string
  content_markdown?: string
  meta_description?: string
  created_at?: string
  image_url?: string
  alt_text?: string
  tags?: unknown
  author?: string
  status?: string
  is_update?: boolean
}

interface DistribPayload {
  event_type?: string
  timestamp?: string
  data?: {
    articles?: DistribArticle[]
  }
}

const DEFAULT_GITHUB_EVENT_TYPE = 'distrib_publish_articles'
const MAX_REPOSITORY_DISPATCH_BYTES = 65_000
const SUPPORTED_DISTRIB_EVENT_TYPES = new Set(['publish_articles', 'update_articles'])
const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  })
}

function requestAccessToken(request: Request): string {
  const authorization = request.headers.get('authorization') || ''
  const bearerMatch = /^Bearer\s+(.+)$/i.exec(authorization)
  if (bearerMatch?.[1]?.trim()) return bearerMatch[1].trim()

  const apiKey = request.headers.get('x-api-key')
  if (apiKey?.trim()) return apiKey.trim()

  const makeApiKey = request.headers.get('x-make-apikey')
  if (makeApiKey?.trim()) return makeApiKey.trim()

  return ''
}

async function secureEqual(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(left)),
    crypto.subtle.digest('SHA-256', encoder.encode(right)),
  ])
  const leftBytes = new Uint8Array(leftHash)
  const rightBytes = new Uint8Array(rightHash)
  let difference = 0

  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index]
  }

  return difference === 0
}

function isSupportedEventType(eventType: string | undefined): boolean {
  return typeof eventType === 'string' && SUPPORTED_DISTRIB_EVENT_TYPES.has(eventType)
}

function payloadArticles(payload: DistribPayload): DistribArticle[] {
  if (Array.isArray(payload.data?.articles)) return payload.data.articles
  return []
}

function validatePayload(payload: unknown): payload is DistribPayload {
  if (!payload || typeof payload !== 'object') return false

  const candidate = payload as DistribPayload
  if (!isSupportedEventType(candidate.event_type)) return false

  const articles = payloadArticles(candidate)
  if (articles.length === 0) return false

  return articles.every(
    (article) =>
      typeof article?.title === 'string' &&
      article.title.trim().length > 0 &&
      typeof article?.content_markdown === 'string' &&
      article.content_markdown.trim().length > 0,
  )
}

function normalizePayload(payload: DistribPayload): DistribPayload {
  return {
    event_type: payload.event_type,
    timestamp: payload.timestamp,
    data: {
      articles: payloadArticles(payload).map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        content_html: article.content_html,
        content_markdown: article.content_markdown,
        meta_description: article.meta_description,
        created_at: article.created_at,
        image_url: article.image_url,
        alt_text: article.alt_text,
        tags: Array.isArray(article.tags) ? article.tags.filter((tag) => typeof tag === 'string') : undefined,
        author: article.author,
        status: article.status,
        is_update: article.is_update,
      })),
    },
  }
}

async function parsePayload(request: Request): Promise<DistribPayload | undefined> {
  try {
    const payload = await request.json()
    if (!validatePayload(payload)) return undefined
    return normalizePayload(payload)
  } catch {
    return undefined
  }
}

async function dispatchToGithub(env: Env, payload: DistribPayload): Promise<Response> {
  if (!env.PERSONAL_ACCESS_TOKEN) return jsonResponse({ error: 'missing_personal_access_token' }, 500)

  const dispatchBody = JSON.stringify({
    event_type: env.GITHUB_EVENT_TYPE || DEFAULT_GITHUB_EVENT_TYPE,
    client_payload: payload,
  })

  if (new TextEncoder().encode(dispatchBody).byteLength > MAX_REPOSITORY_DISPATCH_BYTES) {
    return jsonResponse({ error: 'payload_too_large_for_repository_dispatch' }, 413)
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/dispatches`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${env.PERSONAL_ACCESS_TOKEN}`,
        'content-type': 'application/json',
        'user-agent': 'capgo-distrib-webhook',
        'x-github-api-version': '2022-11-28',
      },
      body: dispatchBody,
    })

    if (response.ok) return jsonResponse({ message: 'Distrib payload dispatched' }, 202)

    const details = await response.text()
    return jsonResponse(
      {
        error: 'github_dispatch_failed',
        status: response.status,
        details: details.slice(0, 500),
      },
      502,
    )
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    console.error('GitHub repository_dispatch request failed', details)
    return jsonResponse(
      {
        error: 'github_dispatch_network_failure',
        details: details.slice(0, 500),
      },
      502,
    )
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/health')) {
      return jsonResponse({ status: 'ok' })
    }

    if (url.pathname !== '/webhook') return jsonResponse({ error: 'not_found' }, 404)
    if (request.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, 405)
    if (!env.DISTRIB_ACCESS_TOKEN) return jsonResponse({ error: 'missing_distrib_access_token' }, 500)

    const tokenIsValid = await secureEqual(requestAccessToken(request), env.DISTRIB_ACCESS_TOKEN)
    if (!tokenIsValid) return jsonResponse({ error: 'invalid_access_token' }, 401)

    const payload = await parsePayload(request)
    if (!payload) return jsonResponse({ error: 'invalid_distrib_payload' }, 400)

    return dispatchToGithub(env, payload)
  },
}
