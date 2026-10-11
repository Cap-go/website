export const GITHUB_RELEASES_PATH = '/github-releases.json'
// GitHub releases change a few times a day at most; one refresh per day is enough for the homepage.
export const GITHUB_RELEASES_CACHE_TTL_SECONDS = 24 * 60 * 60
export const GITHUB_RELEASE_REPOS = ['Cap-go/capgo', 'Cap-go/CLI', 'Cap-go/capacitor-updater'] as const
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

type GithubReleaseRow = {
  tag_name?: string
  html_url?: string
  published_at?: string | null
  draft?: boolean
  prerelease?: boolean
}

export type GithubReleasesOptions = {
  token?: string
  fetch?: typeof fetch
  now?: Date
}

export function normalizeGithubReleases(rows: Array<{ repo: string; data: GithubReleaseRow[] }>, limit = GITHUB_RELEASE_LIMIT): PublicGithubRelease[] {
  return rows
    .flatMap(({ repo, data }) =>
      (Array.isArray(data) ? data : [])
        .filter((release) => !release.draft && !release.prerelease && typeof release.published_at === 'string' && release.tag_name && release.html_url)
        .map((release) => ({ repo, tag: release.tag_name as string, url: release.html_url as string, publishedAt: release.published_at as string })),
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
}

export async function getPublicGithubReleases(options: GithubReleasesOptions = {}): Promise<PublicGithubReleases> {
  const fetchImpl = options.fetch ?? fetch
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'capgo-website',
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
  }
  const rows = await Promise.all(
    GITHUB_RELEASE_REPOS.map(async (repo) => {
      const response = await fetchImpl(`https://api.github.com/repos/${repo}/releases?per_page=${GITHUB_RELEASE_LIMIT}`, {
        headers,
        signal: AbortSignal.timeout(15_000),
      })
      if (!response.ok) throw new Error(`GitHub releases HTTP ${response.status} for ${repo}`)
      return { repo, data: (await response.json()) as GithubReleaseRow[] }
    }),
  )
  const releases = normalizeGithubReleases(rows)
  if (!releases.length) throw new Error('GitHub returned no published releases')
  return { updated_at: (options.now ?? new Date()).toISOString(), releases }
}
