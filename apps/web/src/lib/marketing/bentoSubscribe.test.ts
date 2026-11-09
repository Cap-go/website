import { describe, expect, test } from 'bun:test'
import { isSecurityAdvisoryEmail } from './bentoSubscribe'

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
