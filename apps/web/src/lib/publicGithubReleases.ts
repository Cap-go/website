export const GITHUB_RELEASES_PATH = '/github-releases.json'
// GitHub releases change a few times a day at most; one refresh per day is enough for the homepage.
export const GITHUB_RELEASES_CACHE_TTL_SECONDS = 24 * 60 * 60
// Cap-go/capgo.app hosts both the platform (capgo-*) and CLI (cli-*) releases since the monorepo merge.
export const GITHUB_RELEASE_REPOS = ['Cap-go/capgo.app', 'Cap-go/capacitor-updater'] as const
export const GITHUB_RELEASE_LIMIT = 5

export type PublicGithubRelease = {
  repo: string
  tag: string
  url: string
  publishedAt: string
}

export type PublicGithubReleases = {
  updated_at: string
  releases: PublicGithubRelease[]
}

export type GithubReleasesOptions = {
  fetch?: typeof fetch
  now?: Date
}

const entryPattern = /<entry>([\s\S]*?)<\/entry>/g
const linkPattern = /<link\b[^>]*\bhref="([^"]+\/releases\/tag\/[^"]+)"/
const updatedPattern = /<updated>([^<]+)<\/updated>/

// Parses a GitHub releases Atom feed. The feed is served by github.com, not the REST API,
// so it needs no token and is not subject to the shared 60 req/h unauthenticated API limit.
export function parseGithubReleasesAtom(repo: string, xml: string): PublicGithubRelease[] {
  return [...xml.matchAll(entryPattern)].flatMap(([, entry]) => {
    const url = entry.match(linkPattern)?.[1]?.replaceAll('&amp;', '&')
    const updated = entry.match(updatedPattern)?.[1]
    const publishedAt = updated && !Number.isNaN(Date.parse(updated)) ? new Date(updated).toISOString() : null
    if (!url || !publishedAt) return []
    const tag = decodeURIComponent(url.slice(url.lastIndexOf('/releases/tag/') + '/releases/tag/'.length))
    return tag ? [{ repo, tag, url, publishedAt }] : []
  })
}

export function mergeGithubReleases(lists: PublicGithubRelease[][], limit = GITHUB_RELEASE_LIMIT): PublicGithubRelease[] {
  return lists
    .flat()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
}

export async function getPublicGithubReleases(options: GithubReleasesOptions = {}): Promise<PublicGithubReleases> {
  const fetchImpl = options.fetch ?? fetch
  const lists = await Promise.all(
    GITHUB_RELEASE_REPOS.map(async (repo) => {
      const response = await fetchImpl(`https://github.com/${repo}/releases.atom`, {
        headers: { Accept: 'application/atom+xml', 'User-Agent': 'capgo-website' },
        signal: AbortSignal.timeout(15_000),
      })
      if (!response.ok) throw new Error(`GitHub releases feed HTTP ${response.status} for ${repo}`)
      return parseGithubReleasesAtom(repo, await response.text())
    }),
  )
  const releases = mergeGithubReleases(lists)
  if (!releases.length) throw new Error('GitHub returned no published releases')
  return { updated_at: (options.now ?? new Date()).toISOString(), releases }
}
