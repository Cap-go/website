import { expect, test } from 'bun:test'
import { isGonePath } from '../../shared/gonePaths.ts'

const GONE_PATHS = [
  '/blog/corporate-governance-code/',
  '/blog/app-cohort-analysis/',
  '/blog/app-user-retention/',
  '/blog/app-vulnerability-scanning/',
  '/blog/developer-productivity/',
  '/blog/enterprise-app-management/',
  '/blog/how-to-delete-icon/',
  '/blog/how-to-manage-technical-debt/',
  '/blog/knowledge-sharing-in-teams/',
  '/blog/minimum-viable-product-example/',
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

test('isGonePath does not match retired app-health-check (301 redirect)', () => {
  expect(isGonePath('/blog/app-health-check/')).toBe(false)
  expect(isGonePath('/de/blog/app-health-check/')).toBe(false)
})

test('isGonePath does not match retired what-is-observability (301 redirect)', () => {
  expect(isGonePath('/blog/what-is-observability/')).toBe(false)
  expect(isGonePath('/de/blog/what-is-observability/')).toBe(false)
})

test('isGonePath does not match retired multi-platform-software-development (301 redirect)', () => {
  expect(isGonePath('/blog/multi-platform-software-development/')).toBe(false)
  expect(isGonePath('/de/blog/multi-platform-software-development/')).toBe(false)
})

test('isGonePath does not match retired how-mobile-apps-stay-compliant-with-us-privacy-laws (301 redirect)', () => {
  expect(isGonePath('/blog/how-mobile-apps-stay-compliant-with-us-privacy-laws/')).toBe(false)
  expect(isGonePath('/de/blog/how-mobile-apps-stay-compliant-with-us-privacy-laws/')).toBe(false)
})

test('isGonePath does not match retired disaster-recovery (301 redirect)', () => {
  expect(isGonePath('/blog/disaster-recovery/')).toBe(false)
  expect(isGonePath('/de/blog/disaster-recovery/')).toBe(false)
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
