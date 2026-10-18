import { expect, test } from 'bun:test'
import { trailingSlashRedirectTarget } from '../../shared/trailingSlashRedirect.ts'
import worker from '../src/worker/index.ts'

const mockAssetsEnv = {
  ASSETS: {
    fetch() {
      return Promise.resolve(new Response('ok', { status: 200 }))
    },
  },
}

test('trailingSlashRedirectTarget adds slash for page paths', () => {
  expect(trailingSlashRedirectTarget('/pricing')).toBe('/pricing/')
  expect(trailingSlashRedirectTarget('/blog/ultimate-guide-to-app-store-compliant-ota-updates')).toBe(
    '/blog/ultimate-guide-to-app-store-compliant-ota-updates/',
  )
  expect(trailingSlashRedirectTarget('/fr/pricing')).toBe('/fr/pricing/')
})

test('trailingSlashRedirectTarget skips paths that already have a trailing slash', () => {
  expect(trailingSlashRedirectTarget('/pricing/')).toBeNull()
  expect(trailingSlashRedirectTarget('/')).toBeNull()
})

test('trailingSlashRedirectTarget skips static assets and API routes', () => {
  expect(trailingSlashRedirectTarget('/sponsors.json')).toBeNull()
  expect(trailingSlashRedirectTarget('/_astro/global.css')).toBeNull()
  expect(trailingSlashRedirectTarget('/openapi.json')).toBeNull()
  expect(trailingSlashRedirectTarget('/api/tools/ios-udid-finder/callback')).toBeNull()
})

test('worker returns 301 for slashless page paths before static assets', async () => {
  const response = await worker.fetch(new Request('https://capgo.app/pricing', { method: 'HEAD' }), mockAssetsEnv)
  expect(response.status).toBe(301)
  expect(response.headers.get('Location')).toBe('https://capgo.app/pricing/')
})

test('worker preserves query strings on trailing slash redirects', async () => {
  const response = await worker.fetch(new Request('https://capgo.app/fr/pricing?utm=1', { method: 'HEAD' }), mockAssetsEnv)
  expect(response.status).toBe(301)
  expect(response.headers.get('Location')).toBe('https://capgo.app/fr/pricing/?utm=1')
})
