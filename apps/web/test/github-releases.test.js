import { expect, test } from 'bun:test'
import { getPublicGithubReleases, GITHUB_RELEASE_REPOS, mergeGithubReleases, parseGithubReleasesAtom } from '../src/lib/publicGithubReleases.ts'

const entry = (repo, tag, updated) => `
  <entry>
    <id>tag:github.com,2008:Repository/1/${tag}</id>
    <updated>${updated}</updated>
    <link rel="alternate" type="text/html" href="https://github.com/${repo}/releases/tag/${tag}"/>
    <title>${tag}</title>
  </entry>`

const feed = (...entries) => `<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><updated>2026-10-11T00:00:00Z</updated>${entries.join('')}</feed>`

test('parseGithubReleasesAtom reads tag, url and date from each entry', () => {
  const releases = parseGithubReleasesAtom(
    'Cap-go/capgo.app',
    feed(entry('Cap-go/capgo.app', 'capgo-16.3.1', '2026-10-11T17:24:40Z'), entry('Cap-go/capgo.app', 'cli-8.77.0', 'not-a-date')),
  )
  expect(releases).toEqual([
    { repo: 'Cap-go/capgo.app', tag: 'capgo-16.3.1', url: 'https://github.com/Cap-go/capgo.app/releases/tag/capgo-16.3.1', publishedAt: '2026-10-11T17:24:40.000Z' },
  ])
})

test('mergeGithubReleases sorts newest first across repos and caps the list', () => {
  const releases = mergeGithubReleases(
    [
      [
        { repo: 'a', tag: 'capgo-1.0.0', url: 'u1', publishedAt: '2026-10-01T00:00:00.000Z' },
        { repo: 'a', tag: 'cli-2.0.0', url: 'u2', publishedAt: '2026-10-05T00:00:00.000Z' },
      ],
      [{ repo: 'b', tag: '8.0.0', url: 'u3', publishedAt: '2026-09-01T00:00:00.000Z' }],
    ],
    2,
  )
  expect(releases.map((release) => release.tag)).toEqual(['cli-2.0.0', 'capgo-1.0.0'])
})

test('getPublicGithubReleases reads every repo feed without a token and returns an updated_at stamp', async () => {
  const calls = []
  const fetchImpl = async (url, init) => {
    calls.push({ url, auth: init.headers.Authorization })
    const repo = url.replace('https://github.com/', '').replace('/releases.atom', '')
    return new Response(feed(entry(repo, '1.0.0', '2026-10-01T00:00:00Z')), { status: 200 })
  }
  const result = await getPublicGithubReleases({ fetch: fetchImpl, now: new Date('2026-10-08T00:00:00Z') })
  expect(calls.map((call) => call.url)).toEqual(GITHUB_RELEASE_REPOS.map((repo) => `https://github.com/${repo}/releases.atom`))
  expect(calls.every((call) => call.auth === undefined)).toBe(true)
  expect(result.updated_at).toBe('2026-10-08T00:00:00.000Z')
  expect(result.releases).toHaveLength(GITHUB_RELEASE_REPOS.length)
})

test('getPublicGithubReleases rejects when GitHub fails so the cache keeps the last good payload', async () => {
  const fetchImpl = async () => new Response('rate limited', { status: 429 })
  await expect(getPublicGithubReleases({ fetch: fetchImpl })).rejects.toThrow('HTTP 429')
})
