import { describe, expect, test } from 'bun:test'
import { BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG } from '@/config/bentoMarketing'
import { isSecurityAdvisoryEmail, subscribeSecurityAdvisoryEmail } from './bentoSubscribe'

describe('isSecurityAdvisoryEmail', () => {
  test('accepts a normal address', () => {
    expect(isSecurityAdvisoryEmail('dev@capgo.app')).toBe(true)
  })

  test('rejects empty and malformed values', () => {
    expect(isSecurityAdvisoryEmail('')).toBe(false)
    expect(isSecurityAdvisoryEmail('not-an-email')).toBe(false)
    expect(isSecurityAdvisoryEmail(42)).toBe(false)
  })
})

describe('subscribeSecurityAdvisoryEmail', () => {
  const env = {
    BENTO_PUBLISHABLE_KEY: 'pub',
    BENTO_SECRET_KEY: 'sec',
    BENTO_SITE_UUID: 'site-uuid-123',
  }

  test('returns unavailable without site uuid', async () => {
    const response = await subscribeSecurityAdvisoryEmail('dev@capgo.app', {
      BENTO_PUBLISHABLE_KEY: 'pub',
      BENTO_SECRET_KEY: 'sec',
    })
    expect(response.status).toBe(503)
  })

  test('posts subscriber payload to Bento with site_uuid', async () => {
    let calledUrl = ''
    let body: { subscribers: { email: string; tags: string }[] } | null = null
    const globalFetch = globalThis.fetch
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      calledUrl = typeof input === 'string' ? input : input.toString()
      body = JSON.parse(String(init?.body))
      return new Response('{}', { status: 200 })
    }) as typeof fetch

    try {
      const response = await subscribeSecurityAdvisoryEmail('dev@capgo.app', env)
      expect(response.status).toBe(200)
      expect(calledUrl).toContain('site_uuid=site-uuid-123')
      expect(body?.subscribers[0].email).toBe('dev@capgo.app')
      expect(body?.subscribers[0].tags).toBe(BENTO_SECURITY_ADVISORY_SUBSCRIBER_TAG)
    } finally {
      globalThis.fetch = globalFetch
    }
  })
})
