import { describe, expect, it } from 'bun:test'
import {
  SECURITY_ADVISORY_SUBSCRIBE_URL,
  SECURITY_ADVISORY_TURNSTILE_SITE_KEY,
  isSecurityAdvisorySubscribeFormReady,
  isSecurityAdvisorySubscribeUrlReady,
  isSecurityAdvisoryTurnstileSiteKeyReady,
} from './securityAdvisorySubscribe'

describe('securityAdvisorySubscribe', () => {
  it('accepts configured subscribe URL and rejects placeholders', () => {
    expect(isSecurityAdvisorySubscribeUrlReady(SECURITY_ADVISORY_SUBSCRIBE_URL)).toBe(true)
    expect(isSecurityAdvisorySubscribeUrlReady('pending endpoint URL')).toBe(false)
    expect(isSecurityAdvisorySubscribeUrlReady('https://security-api.capgo.app/v1/security-subscriptions')).toBe(true)
  })

  it('accepts configured Turnstile site key and rejects placeholders', () => {
    expect(isSecurityAdvisoryTurnstileSiteKeyReady(SECURITY_ADVISORY_TURNSTILE_SITE_KEY)).toBe(true)
    expect(isSecurityAdvisoryTurnstileSiteKeyReady('pending turnstile site key')).toBe(false)
    expect(isSecurityAdvisoryTurnstileSiteKeyReady('0x4AAAAAAA')).toBe(true)
  })

  it('requires both URL and site key before showing the form', () => {
    expect(isSecurityAdvisorySubscribeFormReady()).toBe(true)
  })
})
