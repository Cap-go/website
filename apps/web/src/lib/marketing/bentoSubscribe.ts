import { BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG } from '@/config/bentoMarketing'

export interface BentoMarketingEnv {
  BENTO_PUBLISHABLE_KEY?: string
  BENTO_SECRET_KEY?: string
}

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}

const EMAIL_PATTERN = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+.-]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/

function webJson(body: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...headers,
    },
  })
}

export function isSecurityAdvisoryEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 && normalized.length <= 320 && EMAIL_PATTERN.test(normalized)
}

export async function subscribeSecurityAdvisoryEmail(email: string, env: BentoMarketingEnv): Promise<Response> {
  const publishable = env.BENTO_PUBLISHABLE_KEY?.trim()
  const secret = env.BENTO_SECRET_KEY?.trim()
  if (!publishable || !secret) {
    return webJson({ error: 'subscription_unavailable' }, 503)
  }

  const authorization = `Basic ${btoa(`${publishable}:${secret}`)}`
  const bentoResponse = await fetch('https://app.bentonow.com/api/v1/batch/subscribers', {
    method: 'POST',
    headers: {
      Authorization: authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscribers: [
        {
          email,
          tags: [BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG],
        },
      ],
    }),
  })

  if (bentoResponse.ok) {
    return webJson({ ok: true })
  }

  const details = await bentoResponse.text()
  console.error('Bento security advisory subscribe failed', bentoResponse.status, details.slice(0, 500))
  return webJson({ error: 'subscribe_failed' }, 502)
}

export async function handleSecurityAdvisorySubscribeRequest(request: Request, env: BentoMarketingEnv): Promise<Response> {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return webJson({ error: 'invalid_json' }, 400)
  }

  const email = payload && typeof payload === 'object' && 'email' in payload && typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : ''

  if (!isSecurityAdvisoryEmail(email)) {
    return webJson({ error: 'invalid_email' }, 400)
  }

  return await subscribeSecurityAdvisoryEmail(email, env)
}
