import { expect, test } from 'bun:test'
import { isGonePath } from '../../shared/gonePaths.ts'

const GONE = '/blog/what-is-a-micro-frontend/'

test('isGonePath matches English blog URL', () => {
  expect(isGonePath(GONE)).toBe(true)
  expect(isGonePath(GONE.replace(/\/$/, ''))).toBe(true)
})

test('isGonePath matches locale-prefixed blog URL', () => {
  for (const locale of ['de', 'fr', 'es', 'ja']) {
    expect(isGonePath(`/${locale}${GONE}`)).toBe(true)
  }
})

test('isGonePath does not match unrelated paths', () => {
  expect(isGonePath('/blog/capacitor-comprehensive-guide/')).toBe(false)
  expect(isGonePath('/blog/what-is-a-micro-frontend-extra/')).toBe(false)
})
