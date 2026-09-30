// Fetches the public facts shown in the homepage transparency section:
// published GitHub security advisories and the latest releases of the core repos.
// Writes apps/web/src/data/transparency.json; keeps the previous file if GitHub is unreachable.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const OUTPUT_PATH = new URL('../apps/web/src/data/transparency.json', import.meta.url).pathname
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN
const ADVISORY_REPOS = ['Cap-go/capgo', 'Cap-go/capacitor-updater', 'Cap-go/CLI']
const RELEASE_REPOS = ['Cap-go/capgo', 'Cap-go/CLI', 'Cap-go/capacitor-updater']
const RELEASE_LIMIT = 5

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'capgo-website',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
}

type Release = { repo: string; tag: string; url: string; publishedAt: string }

async function getJson<T>(url: string): Promise<{ data: T; next: string | null }> {
  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  const next = response.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null
  return { data: (await response.json()) as T, next }
}

async function countPublishedAdvisories(repo: string) {
  const severities: Record<string, number> = {}
  let total = 0
  let url: string | null = `https://api.github.com/repos/${repo}/security-advisories?state=published&per_page=100`
  while (url) {
    const page: { data: Array<{ severity: string | null }>; next: string | null } = await getJson(url)
    for (const advisory of page.data) {
      total += 1
      const severity = advisory.severity ?? 'unknown'
      severities[severity] = (severities[severity] ?? 0) + 1
    }
    url = page.next
  }
  return { total, severities }
}

async function latestReleases(repo: string): Promise<Release[]> {
  const { data } = await getJson<Array<{ tag_name: string; html_url: string; published_at: string | null; draft: boolean; prerelease: boolean }>>(
    `https://api.github.com/repos/${repo}/releases?per_page=${RELEASE_LIMIT}`,
  )
  return data
    .filter((release) => !release.draft && !release.prerelease && release.published_at)
    .map((release) => ({ repo, tag: release.tag_name, url: release.html_url, publishedAt: release.published_at as string }))
}

async function main() {
  try {
    const advisories = await Promise.all(ADVISORY_REPOS.map(async (repo) => ({ repo, ...(await countPublishedAdvisories(repo)) })))
    const releases = (await Promise.all(RELEASE_REPOS.map(latestReleases)))
      .flat()
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, RELEASE_LIMIT)

    const severities: Record<string, number> = {}
    for (const repo of advisories) {
      for (const [severity, count] of Object.entries(repo.severities)) severities[severity] = (severities[severity] ?? 0) + count
    }

    const output = {
      updatedAt: new Date().toISOString(),
      advisories: { total: advisories.reduce((sum, repo) => sum + repo.total, 0), severities, repos: advisories },
      releases,
    }
    writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
    console.log(`Transparency data: ${output.advisories.total} published advisories, ${releases.length} releases.`)
  } catch (error) {
    if (existsSync(OUTPUT_PATH)) {
      console.warn(`Could not refresh transparency data, keeping the cached file: ${(error as Error).message}`)
      JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'))
      return
    }
    throw error
  }
}

await main()
