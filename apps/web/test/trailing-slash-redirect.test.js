import { expect, test } from 'bun:test'
import { permanentTrailingSlashLocation } from '../../shared/trailingSlashRedirect.ts'
import worker from '../src/worker/index.ts'

function response307(location) {
  return new Response(null, { status: 307, headers: { Location: location } })
}

test('permanentTrailingSlashLocation matches slash-only 307 redirects', () => {
  const requestUrl = 'https://capgo.app/pricing?utm=1'
  const target = permanentTrailingSlashLocation(requestUrl, response307('/pricing/?utm=1'))
  expect(target).toBe('/pricing/?utm=1')
  expect(permanentTrailingSlashLocation(requestUrl, response307('https://capgo.app/fr/pricing/'))).toBeNull()
  expect(permanentTrailingSlashLocation('https://capgo.app/fr/pricing', response307('/fr/pricing/'))).toBe('/fr/pricing/')
})

test('permanentTrailingSlashLocation ignores non-trailing-slash 307 responses', () => {
  expect(permanentTrailingSlashLocation('https://capgo.app/file.html', response307('/file'))).toBeNull()
  expect(permanentTrailingSlashLocation('https://capgo.app/pricing', response307('/docs/'))).toBeNull()
  expect(permanentTrailingSlashLocation('https://capgo.app/pricing', response307('https://other.test/pricing/'))).toBeNull()
})

test('permanentTrailingSlashLocation skips static assets and API routes', () => {
  expect(permanentTrailingSlashLocation('https://capgo.app/sponsors.json', response307('/sponsors.json/'))).toBeNull()
  expect(
    permanentTrailingSlashLocation(
      'https://capgo.app/api/tools/ios-udid-finder/callback',
      response307('/api/tools/ios-udid-finder/callback/'),
    ),
  ).toBeNull()
})

const mockAssetsEnv = {
  ASSETS: {
    fetch(request) {
      const pathname = new URL(request.url).pathname
      if (pathname === '/pricing') return Promise.resolve(response307('/pricing/'))
      if (pathname === '/self-hosted-capgo') {
        return Promise.resolve(
          new Response(null, {
            status: 302,
            headers: { Location: '/docs/plugins/updater/self-hosted/getting-started/' },
          }),
        )
      }
      return Promise.resolve(new Response('ok', { status: 200 }))
    },
  },
}

test('worker upgrades ASSETS 307 trailing-slash redirects to 301', async () => {
  const response = await worker.fetch(new Request('https://capgo.app/pricing', { method: 'HEAD' }), mockAssetsEnv)
  expect(response.status).toBe(301)
  expect(response.headers.get('Location')).toBe('https://capgo.app/pricing/')
})

test('worker does not duplicate query params when ASSETS Location already includes search', async () => {
  const env = {
    ASSETS: {
      fetch() {
        return Promise.resolve(response307('/pricing/?utm=1'))
      },
    },
  }
  const response = await worker.fetch(new Request('https://capgo.app/pricing?utm=1', { method: 'HEAD' }), env)
  expect(response.status).toBe(301)
  expect(response.headers.get('Location')).toBe('https://capgo.app/pricing/?utm=1')
})

test('worker preserves existing slashless _redirects responses', async () => {
  const response = await worker.fetch(new Request('https://capgo.app/self-hosted-capgo', { method: 'HEAD' }), mockAssetsEnv)
  expect(response.status).toBe(302)
  expect(response.headers.get('Location')).toBe('/docs/plugins/updater/self-hosted/getting-started/')
})
