interface Env {
  OUTRANK_ACCESS_TOKEN?: string
  GITHUB_DISPATCH_TOKEN?: string
  GITHUB_OWNER: string
  GITHUB_REPO: string
  GITHUB_EVENT_TYPE?: string
}

interface OutrankArticle {
  id?: string
  title?: string
  content_markdown?: string
  content_html?: string
  meta_description?: string
  created_at?: string
  image_url?: string
  slug?: string
  tags?: unknown
}

interface OutrankPayload {
  event_type?: string
  timestamp?: string
  data?: {
    articles?: OutrankArticle[]
  }
}

const DEFAULT_GITHUB_EVENT_TYPE = 'outrank_publish_articles'
const MAX_REPOSITORY_DISPATCH_BYTES = 65_000
const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  })
}

function bearerToken(request: Request): string {
  const header = request.headers.get('authorization') || ''
  const match = /^Bearer\s+(.+)$/i.exec(header)
  return match?.[1]?.trim() || ''
}

async function secureEqual(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const [leftHash, rightHash] = await Promise.all([crypto.subtle.digest('SHA-256', encoder.encode(left)), crypto.subtle.digest('SHA-256', encoder.encode(right))])
  const leftBytes = new Uint8Array(leftHash)
  const rightBytes = new Uint8Array(rightHash)
  let difference = 0

  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index]
  }

  return difference === 0
}

function validatePayload(payload: unknown): payload is OutrankPayload {
  if (!payload || typeof payload !== 'object') return false

  const candidate = payload as OutrankPayload
  if (candidate.event_type !== 'publish_articles') return false
  if (!candidate.data || !Array.isArray(candidate.data.articles)) return false

  return candidate.data.articles.every(
    (article) =>
      typeof article?.title === 'string' && article.title.trim().length > 0 && typeof article?.content_markdown === 'string' && article.content_markdown.trim().length > 0,
  )
}

function normalizePayload(payload: OutrankPayload): OutrankPayload {
  return {
    event_type: payload.event_type,
    timestamp: payload.timestamp,
    data: {
      articles: (payload.data?.articles || []).map((article) => ({
        id: article.id,
        title: article.title,
        content_markdown: article.content_markdown,
        meta_description: article.meta_description,
        created_at: article.created_at,
        image_url: article.image_url,
        slug: article.slug,
        tags: Array.isArray(article.tags) ? article.tags.filter((tag) => typeof tag === 'string') : [],
      })),
    },
  }
}

async function parsePayload(request: Request): Promise<OutrankPayload | undefined> {
  try {
    const payload = await request.json()
    if (!validatePayload(payload)) return undefined
    return normalizePayload(payload)
  } catch {
    return undefined
  }
}

async function dispatchToGithub(env: Env, payload: OutrankPayload): Promise<Response> {
  if (!env.GITHUB_DISPATCH_TOKEN) return jsonResponse({ error: 'missing_github_dispatch_token' }, 500)

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
        authorization: `Bearer ${env.GITHUB_DISPATCH_TOKEN}`,
        'content-type': 'application/json',
        'user-agent': 'capgo-outrank-webhook',
        'x-github-api-version': '2022-11-28',
      },
      body: dispatchBody,
    })

    if (response.ok) return jsonResponse({ message: 'Outrank payload dispatched' }, 202)

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
    if (!env.OUTRANK_ACCESS_TOKEN) return jsonResponse({ error: 'missing_outrank_access_token' }, 500)

    const tokenIsValid = await secureEqual(bearerToken(request), env.OUTRANK_ACCESS_TOKEN)
    if (!tokenIsValid) return jsonResponse({ error: 'invalid_access_token' }, 401)

    const payload = await parsePayload(request)
    if (!payload) return jsonResponse({ error: 'invalid_outrank_payload' }, 400)

    return dispatchToGithub(env, payload)
  },
}
