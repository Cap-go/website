import { expect, test } from 'bun:test'
import { isGonePath } from '../../shared/gonePaths.ts'

const GONE_PATHS = [
  '/blog/app-cohort-analysis/',
  '/blog/app-user-retention/',
  '/blog/app-vulnerability-scanning/',
  '/blog/developer-productivity/',
  '/blog/enterprise-app-management/',
  '/blog/how-to-delete-icon/',
  '/blog/native-base-picker/',
  '/blog/react-native-alert/',
  '/blog/secure-database-storage/',
  '/blog/transaction-security/',
  '/blog/user-adoption-metrics/',
  '/blog/user-churn-analysis/',
  '/blog/what-is-a-micro-frontend/',
]

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

test('isGonePath does not match retired app-risk-assessment (301 redirect)', () => {
  expect(isGonePath('/blog/app-risk-assessment/')).toBe(false)
  expect(isGonePath('/de/blog/app-risk-assessment/')).toBe(false)
})

test('isGonePath does not match retired app-access-management (301 redirect)', () => {
  expect(isGonePath('/blog/app-access-management/')).toBe(false)
  expect(isGonePath('/de/blog/app-access-management/')).toBe(false)
})

test('isGonePath does not match retired app-behavior-tracking (301 redirect)', () => {
  expect(isGonePath('/blog/app-behavior-tracking/')).toBe(false)
  expect(isGonePath('/de/blog/app-behavior-tracking/')).toBe(false)
})

test('isGonePath does not match unrelated paths', () => {
  expect(isGonePath('/blog/capacitor-comprehensive-guide/')).toBe(false)
  expect(isGonePath('/blog/what-is-a-micro-frontend-extra/')).toBe(false)
  expect(isGonePath('/blog/enterprise-app-management-extra/')).toBe(false)
  expect(isGonePath('/blog/how-to-delete-icons/')).toBe(false)
  expect(isGonePath('/blog/native-base-picker-v2/')).toBe(false)
  expect(isGonePath('/blog/react-native-alerts/')).toBe(false)
  expect(isGonePath('/blog/')).toBe(false)
})
