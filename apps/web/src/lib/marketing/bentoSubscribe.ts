import { BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG } from '@/config/bentoMarketing'
import { securityAdvisorySubscribeRateLimitResponse } from './rateLimit'

export interface BentoMarketingEnv {
  BENTO_PUBLISHABLE_KEY?: string
  BENTO_SECRET_KEY?: string
  BENTO_SITE_UUID?: string
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
  const siteUuid = env.BENTO_SITE_UUID?.trim()
  if (!publishable || !secret || !siteUuid) {
    return webJson({ error: 'subscription_unavailable' }, 503)
  }

  const credentials = `${publishable}:${secret}`
  const authorization = 'Basic ' + btoa(credentials)
  const bentoUrl = new URL('https://app.bentonow.com/api/v1/batch/subscribers')
  bentoUrl.searchParams.set('site_uuid', siteUuid)

  try {
    const bentoResponse = await fetch(bentoUrl, {
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
            tags: BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG,
          },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (bentoResponse.ok) {
      let batchResult: { results?: unknown[]; failed?: unknown[]; failed_count?: number } = {}
      try {
        batchResult = (await bentoResponse.json()) as typeof batchResult
      } catch {
        batchResult = {}
      }

      const failedCount = Array.isArray(batchResult.failed)
        ? batchResult.failed.length
        : typeof batchResult.failed_count === 'number'
          ? batchResult.failed_count
          : 0
      const resultsCount = Array.isArray(batchResult.results) ? batchResult.results.length : failedCount === 0 ? 1 : 0

      if (failedCount === 0 && resultsCount === 1) {
        return webJson({ ok: true })
      }

      console.error('Bento security advisory subscribe partial failure', { failedCount, resultsCount })
      return webJson({ error: 'subscribe_failed' }, 502)
    }

    const details = await bentoResponse.text()
    console.error('Bento security advisory subscribe failed', bentoResponse.status, details.slice(0, 500))
    return webJson({ error: 'subscribe_failed' }, 502)
  } catch (error) {
    console.error('Bento security advisory subscribe request failed', error)
    return webJson({ error: 'subscribe_failed' }, 502)
  }
}

export async function handleSecurityAdvisorySubscribeRequest(request: Request, env: BentoMarketingEnv): Promise<Response> {
  const rateLimited = securityAdvisorySubscribeRateLimitResponse(request)
  if (rateLimited) return rateLimited

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
