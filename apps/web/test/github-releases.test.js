import { expect, test } from 'bun:test'
import { getPublicGithubReleases, GITHUB_RELEASE_REPOS, normalizeGithubReleases } from '../src/lib/publicGithubReleases.ts'

test('normalizeGithubReleases drops drafts and prereleases, sorts newest first, and caps the list', () => {
  const releases = normalizeGithubReleases(
    [
      {
        repo: 'Cap-go/capgo',
        data: [
          { tag_name: 'capgo-1.0.0', html_url: 'https://x/1', published_at: '2026-10-01T00:00:00Z' },
          { tag_name: 'capgo-0.9.0', html_url: 'https://x/0', published_at: '2026-09-01T00:00:00Z', draft: true },
          { tag_name: 'capgo-0.8.0', html_url: 'https://x/8', published_at: '2026-08-01T00:00:00Z', prerelease: true },
        ],
      },
      {
        repo: 'Cap-go/CLI',
        data: [
          { tag_name: 'cli-2.0.0', html_url: 'https://x/2', published_at: '2026-10-05T00:00:00Z' },
          { tag_name: 'cli-1.9.0', html_url: 'https://x/19', published_at: null },
        ],
      },
    ],
    2,
  )
  expect(releases.map((release) => release.tag)).toEqual(['cli-2.0.0', 'capgo-1.0.0'])
})

test('getPublicGithubReleases queries every repo with the token and returns an updated_at stamp', async () => {
  const calls = []
  const fetchImpl = async (url, init) => {
    calls.push({ url, auth: init.headers.Authorization })
    return new Response(JSON.stringify([{ tag_name: 't', html_url: 'u', published_at: '2026-10-01T00:00:00Z' }]), { status: 200 })
  }
  const result = await getPublicGithubReleases({ token: 'abc', fetch: fetchImpl, now: new Date('2026-10-08T00:00:00Z') })
  expect(calls).toHaveLength(GITHUB_RELEASE_REPOS.length)
  expect(calls.every((call) => call.auth === 'Bearer abc')).toBe(true)
  expect(result.updated_at).toBe('2026-10-08T00:00:00.000Z')
  expect(result.releases).toHaveLength(GITHUB_RELEASE_REPOS.length)
})

test('getPublicGithubReleases rejects when GitHub fails so the cache keeps the last good payload', async () => {
  const fetchImpl = async () => new Response('rate limited', { status: 403 })
  await expect(getPublicGithubReleases({ fetch: fetchImpl })).rejects.toThrow('HTTP 403')
})
