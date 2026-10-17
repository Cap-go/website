import { expect, test } from 'bun:test'
import { isGonePath } from '../../shared/gonePaths.ts'

const GONE = '/blog/how-to-delete-icon/'

test('isGonePath matches English blog URL', () => {
  expect(isGonePath(GONE)).toBe(true)
  expect(isGonePath(GONE.replace(/\/$/, ''))).toBe(true)
})

test('isGonePath matches locale-prefixed blog URL', () => {
  expect(isGonePath(`/de${GONE}`)).toBe(true)
  expect(isGonePath(`/fr${GONE.replace(/\/$/, '')}`)).toBe(true)
})

test('isGonePath does not match unrelated paths', () => {
  expect(isGonePath('/blog/')).toBe(false)
  expect(isGonePath('/blog/how-to-delete-icons/')).toBe(false)
})
