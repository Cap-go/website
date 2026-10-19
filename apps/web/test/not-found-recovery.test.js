import { expect, test } from 'bun:test'
import { resolveNotFoundRecoveryRedirect } from '../../shared/notFoundRecovery.ts'

test('category pages redirect to listing', () => {
  expect(resolveNotFoundRecoveryRedirect('/fr/blog/category/native-vs-web-apps/')).toBe('/fr/blog/')
  expect(resolveNotFoundRecoveryRedirect('/ko/articles/category/marketing/')).toBe('/ko/articles/')
})

test('blog nested segments redirect to parent post', () => {
  expect(resolveNotFoundRecoveryRedirect('/blog/kysely-capacitor-sqlite/fast-sql-dialect')).toBe('/blog/kysely-capacitor-sqlite/')
  expect(resolveNotFoundRecoveryRedirect('/it/blog/drizzle-orm-capacitor-sqlite/db/')).toBe('/it/blog/drizzle-orm-capacitor-sqlite/')
})

test('firebase plugin slugs redirect to docs', () => {
  expect(resolveNotFoundRecoveryRedirect('/plugins/capacitor-firebase-analytics/')).toBe('/docs/plugins/firebase-analytics/')
  expect(resolveNotFoundRecoveryRedirect('/id/plugins/capacitor-firebase-messaging')).toBe('/id/docs/plugins/firebase-messaging/')
})

test('static recovery paths', () => {
  expect(resolveNotFoundRecoveryRedirect('/solutions')).toBe('/solutions/startups/')
  expect(resolveNotFoundRecoveryRedirect('/fr/live-updates/')).toBe('/fr/docs/live-updates/')
  expect(resolveNotFoundRecoveryRedirect('/fr/cli/reference/build/')).toBe('/fr/docs/cli/reference/build/')
})
