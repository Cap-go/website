import { describe, expect, it } from 'bun:test'
import {
  SECURITY_ADVISORY_SUBSCRIBE_URL,
  SECURITY_ADVISORY_TURNSTILE_SITE_KEY,
  isSecurityAdvisorySubscribeFormReady,
  isSecurityAdvisorySubscribeUrlReady,
  isSecurityAdvisoryTurnstileSiteKeyReady,
} from './securityAdvisorySubscribe'

describe('securityAdvisorySubscribe', () => {
  it('rejects placeholder subscribe URL', () => {
    expect(isSecurityAdvisorySubscribeUrlReady(SECURITY_ADVISORY_SUBSCRIBE_URL)).toBe(false)
    expect(isSecurityAdvisorySubscribeUrlReady('https://security-api.capgo.app/v1/security-subscriptions')).toBe(true)
  })

  it('rejects placeholder Turnstile site key', () => {
    expect(isSecurityAdvisoryTurnstileSiteKeyReady(SECURITY_ADVISORY_TURNSTILE_SITE_KEY)).toBe(false)
    expect(isSecurityAdvisoryTurnstileSiteKeyReady('0x4AAAAAAA')).toBe(true)
  })

  it('requires both URL and site key before showing the form', () => {
    expect(isSecurityAdvisorySubscribeFormReady()).toBe(false)
  })
})
