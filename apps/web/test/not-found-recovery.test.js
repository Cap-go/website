import { expect, test } from 'bun:test'
import { resolveNotFoundRecoveryRedirect } from '../../shared/notFoundRecovery.ts'

const CASES = [
  ['/fr/blog/category/native-vs-web-apps/', '/fr/blog/'],
  ['/ko/articles/category/marketing/', '/ko/articles/'],
  ['/blog/kysely-capacitor-sqlite/fast-sql-dialect', '/blog/kysely-capacitor-sqlite/'],
  ['/it/blog/drizzle-orm-capacitor-sqlite/db/', '/it/blog/drizzle-orm-capacitor-sqlite/'],
  ['/plugins/capacitor-firebase-analytics/', '/docs/plugins/firebase-analytics/'],
  ['/id/plugins/capacitor-firebase-messaging', '/id/docs/plugins/firebase-messaging/'],
  ['/solutions', '/solutions/startups/'],
  ['/fr/live-updates/', '/fr/docs/live-updates/'],
  ['/fr/cli/reference/build/', '/fr/docs/cli/reference/build/'],
]

for (const [from, to] of CASES) {
  test(`resolveNotFoundRecoveryRedirect ${from} → ${to}`, () => {
    expect(resolveNotFoundRecoveryRedirect(from)).toBe(to)
  })
}
