import { expect, test } from 'bun:test'
import { shouldIgnoreTranslationQueryParam } from '../../shared/translationQueryParams.ts'

test('ignores attribution and signup tracking query keys', () => {
  expect(shouldIgnoreTranslationQueryParam('first_touch_type')).toBe(true)
  expect(shouldIgnoreTranslationQueryParam('first_touch_path')).toBe(true)
  expect(shouldIgnoreTranslationQueryParam('signup_source')).toBe(true)
  expect(shouldIgnoreTranslationQueryParam('ref')).toBe(true)
})

test('ignores utm params', () => {
  expect(shouldIgnoreTranslationQueryParam('utm_source')).toBe(true)
  expect(shouldIgnoreTranslationQueryParam('utm_campaign')).toBe(true)
})

test('keeps unknown params for cache keying', () => {
  expect(shouldIgnoreTranslationQueryParam('locale')).toBe(false)
})
