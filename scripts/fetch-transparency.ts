// Fetches the public facts shown in the homepage transparency section:
// published GitHub security advisories, the latest releases of the core repos, and a snapshot
// of the live delivery metrics so the homepage never renders them empty before the client fetch.
// Writes apps/web/src/data/transparency.json; keeps previous values when a source is unreachable.
import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs'

const OUTPUT_PATH = new URL('../apps/web/src/data/transparency.json', import.meta.url).pathname
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN
const ADVISORY_REPOS = ['Cap-go/capgo', 'Cap-go/capacitor-updater', 'Cap-go/CLI']
const RELEASE_REPOS = ['Cap-go/capgo', 'Cap-go/CLI', 'Cap-go/capacitor-updater']
const RELEASE_LIMIT = 5
const METRICS_ORIGIN = process.env.METRICS_ORIGIN ?? 'https://capgo.app'

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'capgo-website',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
}

type Release = { repo: string; tag: string; url: string; publishedAt: string }
type MetricsSnapshot = {
  live: { success_rate: number; first_try_rate: number | null; rollback_rate: number | null; updated_at: string; daily: number[] } | null
  builder: { success_rate: number; updated_at: string } | null
}

const rate = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : null)

async function fetchMetricsJson(path: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(`${METRICS_ORIGIN}${path}`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(60_000) })
    if (!response.ok) throw new Error(`${response.status} ${path}`)
    const data = (await response.json()) as Record<string, unknown>
    return typeof data.updated_at === 'string' && rate(data.success_rate) !== null ? data : null
  } catch (error) {
    console.warn(`Could not refresh ${path}: ${(error as Error).message}`)
    return null
  }
}

async function fetchMetricsSnapshot(previous: MetricsSnapshot | undefined): Promise<MetricsSnapshot> {
  const [live, builder] = await Promise.all([fetchMetricsJson('/live-update-metrics.json'), fetchMetricsJson('/builder-metrics.json')])
  return {
    live: live
      ? {
          success_rate: rate(live.success_rate) as number,
          first_try_rate: rate(live.first_try_rate),
          rollback_rate: rate(live.rollback_rate),
          updated_at: live.updated_at as string,
          daily: (Array.isArray(live.daily) ? live.daily : [])
            .map((day: { success_rate?: unknown }) => rate(day?.success_rate))
            .filter((value): value is number => value !== null),
        }
      : (previous?.live ?? null),
    builder: builder ? { success_rate: rate(builder.success_rate) as number, updated_at: builder.updated_at as string } : (previous?.builder ?? null),
  }
}

function readPrevious(): { metrics?: MetricsSnapshot } | null {
  if (!existsSync(OUTPUT_PATH)) return null
  try {
    return JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'))
  } catch {
    return null
  }
}

function writeOutput(output: unknown) {
  // Write to a temp file then rename, so an interrupted run never leaves a truncated cache.
  const tmpPath = `${OUTPUT_PATH}.tmp`
  writeFileSync(tmpPath, `${JSON.stringify(output, null, 2)}\n`)
  renameSync(tmpPath, OUTPUT_PATH)
}

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
  const previous = readPrevious()
  const metrics = await fetchMetricsSnapshot(previous?.metrics)
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
      metrics,
    }
    writeOutput(output)
    console.log(`Transparency data: ${output.advisories.total} published advisories, ${releases.length} releases.`)
  } catch (error) {
    if (previous) {
      console.warn(`Could not refresh GitHub transparency data, keeping the cached values: ${(error as Error).message}`)
      writeOutput({ ...previous, metrics })
      return
    }
    throw error
  }
}

await main()
