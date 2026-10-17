import { expect, test } from 'bun:test'
import { isGonePath } from '../../shared/gonePaths.ts'

const GONE_PATHS = ['/blog/what-is-a-micro-frontend/', '/blog/react-native-alert/']

for (const gone of GONE_PATHS) {
  test(`isGonePath matches English blog URL ${gone}`, () => {
    expect(isGonePath(gone)).toBe(true)
    expect(isGonePath(gone.replace(/\/$/, ''))).toBe(true)
  })

  test(`isGonePath matches locale-prefixed blog URL ${gone}`, () => {
    for (const locale of ['de', 'fr', 'es', 'ja']) {
      expect(isGonePath(`/${locale}${gone}`)).toBe(true)
    }
  })
}

test('isGonePath does not match unrelated paths', () => {
  expect(isGonePath('/blog/capacitor-comprehensive-guide/')).toBe(false)
  expect(isGonePath('/blog/what-is-a-micro-frontend-extra/')).toBe(false)
})
