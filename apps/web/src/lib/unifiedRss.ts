import { actions } from '@/config/plugins'
import matter from 'gray-matter'
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

export const UNIFIED_RSS_ITEM_CAP = 200
export const UNIFIED_RSS_FEED_PATH = '/feed.xml'
export const SITE_ORIGIN = 'https://capgo.app'

export type UnifiedRssCategory = 'blog' | 'docs' | 'changelog' | 'release'

export type UnifiedRssItem = {
  category: UnifiedRssCategory
  title: string
  link: string
  guid: string
  pubDate: Date
  description: string
}

type GithubReleaseRow = {
  tag_name?: string
  html_url?: string
  published_at?: string | null
  draft?: boolean
  prerelease?: boolean
  body?: string | null
}

function resolveDocsContentRoot(): string {
  const cwd = process.cwd()
  const fromWorkspace = join(cwd, 'apps/docs/src/content/docs/docs')
  if (existsSync(fromWorkspace)) return fromWorkspace
  const fromWebApp = join(cwd, '../docs/src/content/docs/docs')
  if (existsSync(fromWebApp)) return fromWebApp
  const sourceLibDir = fileURLToPath(new URL('.', import.meta.url))
  const webRoot = join(sourceLibDir, '..', '..')
  const docsRoot = join(webRoot, '..', 'docs/src/content/docs/docs')
  if (existsSync(docsRoot)) return docsRoot
  throw new Error('Could not locate apps/docs content for the unified RSS feed')
}

const DOCS_CONTENT_ROOT = resolveDocsContentRoot()

function resolveRepoRoot(): string {
  const cwd = process.cwd()
  if (existsSync(join(cwd, 'apps/docs'))) return cwd
  if (existsSync(join(cwd, '../docs'))) return join(cwd, '..', '..')
  const sourceLibDir = fileURLToPath(new URL('.', import.meta.url))
  return join(sourceLibDir, '..', '..', '..')
}

let docsGitLastModifiedCache: Map<string, string> | null = null

function loadDocsGitLastModifiedMap(): Map<string, string> {
  if (docsGitLastModifiedCache) return docsGitLastModifiedCache
  const map = new Map<string, string>()
  if (!GIT_BINARY) {
    docsGitLastModifiedCache = map
    return map
  }
  const result = spawnSync(GIT_BINARY, ['log', '--format=%cI', '--name-only', '--', 'apps/docs/src/content/docs/docs'], {
    cwd: resolveRepoRoot(),
    encoding: 'utf8',
    env: { LANG: 'C.UTF-8' },
  })
  if (result.status === 0 && result.stdout) {
    let currentDate: string | null = null
    for (const line of result.stdout.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed) continue
      if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
        currentDate = trimmed
        continue
      }
      if (!currentDate || map.has(trimmed)) continue
      map.set(trimmed, currentDate)
    }
  }
  docsGitLastModifiedCache = map
  return map
}
const CHANGELOG_REPO = 'Cap-go/capgo.app'
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? ''
const PLUGIN_RELEASES_PER_REPO = 5
const CHANGELOG_RELEASE_LIMIT = 40
const GITHUB_CONCURRENCY = 8
const GITHUB_RELEASE_TIMEOUT_MS = 8_000
const PLUGIN_RELEASE_FETCH_BUDGET_MS = 90_000
const GIT_BINARY = ['/usr/bin/git', '/usr/local/bin/git'].find((candidate) => existsSync(candidate)) ?? null

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^[\]]*]\([^()]*\)/g, ' ')
    .replace(/\[[^[\]]*]\([^()]*\)/g, ' ')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateDescription(value: string, maxLength = 500): string {
  const normalized = stripMarkdown(value)
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 3)}...`
}

export function formatRssPubDate(date: Date): string {
  return date.toUTCString()
}

export function docsFileToUrl(relativePath: string): string {
  const withoutExt = relativePath.replace(/\.(mdx|md)$/i, '')
  const segments = withoutExt.split('/').filter(Boolean)
  if (segments.at(-1) === 'index') segments.pop()
  const slug = segments.join('/')
  return `${SITE_ORIGIN}/docs/${slug}/`
}

function listDocFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      listDocFiles(fullPath, files)
      continue
    }
    if (entry.isFile() && /\.(mdx|md)$/i.test(entry.name)) files.push(fullPath)
  }
  return files
}

function resolveDocDate(filePath: string, frontmatter: Record<string, unknown>): Date {
  const lastUpdated = frontmatter.lastUpdated
  if (typeof lastUpdated === 'string' || typeof lastUpdated === 'number' || lastUpdated instanceof Date) {
    const parsed = new Date(lastUpdated)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  const relativePath = relative(resolveRepoRoot(), filePath).replaceAll('\\', '/')
  const gitIso = loadDocsGitLastModifiedMap().get(relativePath)
  if (gitIso) {
    const parsed = new Date(gitIso)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return statSync(filePath).mtime
}

export function collectDocsRssItems(): UnifiedRssItem[] {
  if (!DOCS_CONTENT_ROOT) return []

  const items: UnifiedRssItem[] = []
  for (const filePath of listDocFiles(DOCS_CONTENT_ROOT)) {
    const source = readFileSync(filePath, 'utf8')
    const { data } = matter(source)
    const title = typeof data.title === 'string' && data.title.trim() ? data.title.trim() : 'Capgo docs'
    const description = typeof data.description === 'string' && data.description.trim() ? data.description.trim() : `Updated documentation: ${title}`
    const relativePath = relative(DOCS_CONTENT_ROOT, filePath).replaceAll('\\', '/')
    const link = docsFileToUrl(relativePath)
    const pubDate = resolveDocDate(filePath, data as Record<string, unknown>)
    items.push({
      category: 'docs',
      title,
      link,
      guid: link,
      pubDate,
      description: truncateDescription(description),
    })
  }
  return items
}

export function listPluginReleaseRepos(): string[] {
  const repos = new Set<string>()
  const pluginRepoPattern = /^https:\/\/github\.com\/Cap-go\/([^/?#]+)/i
  for (const action of actions) {
    const match = pluginRepoPattern.exec(action.href)
    if (!match) continue
    const repoName = match[1].replace(/\.git$/i, '').replace(/\/$/, '')
    if (repoName === 'capacitor-updater' || repoName.startsWith('capacitor-')) {
      repos.add(`Cap-go/${repoName}`)
    }
  }
  return [...repos].sort((left, right) => left.localeCompare(right))
}

async function fetchGithubReleases(
  repo: string,
  perPage: number,
  fetchImpl: typeof fetch,
  deadlineMs = Number.POSITIVE_INFINITY,
): Promise<GithubReleaseRow[] | null> {
  if (Date.now() >= deadlineMs) return null
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'capgo-website-rss',
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  }
  try {
    const response = await fetchImpl(`https://api.github.com/repos/${repo}/releases?per_page=${perPage}`, {
      headers,
      signal: AbortSignal.timeout(GITHUB_RELEASE_TIMEOUT_MS),
    })
    if (response.status === 403 || response.status === 429 || !response.ok) return null
    const data = (await response.json()) as GithubReleaseRow[]
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

function firstStableReleaseItem(repo: string, rows: GithubReleaseRow[] | null): UnifiedRssItem[] {
  if (!rows) return []
  for (const row of rows) {
    const item = githubReleaseToItem('release', repo, row)
    if (item) return [item]
  }
  return []
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>,
  deadlineMs = Number.POSITIVE_INFINITY,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      if (Date.now() >= deadlineMs) return
      const current = nextIndex
      nextIndex += 1
      results[current] = await mapper(items[current])
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()))
  return results
}

function githubReleaseToItem(category: UnifiedRssCategory, repo: string, release: GithubReleaseRow): UnifiedRssItem | null {
  if (release.draft || release.prerelease) return null
  if (!release.tag_name || !release.html_url || !release.published_at) return null
  const repoLabel = repo.split('/')[1] ?? repo
  const title = `${repoLabel} ${release.tag_name}`
  const body = typeof release.body === 'string' ? release.body : ''
  return {
    category,
    title,
    link: release.html_url,
    guid: release.html_url,
    pubDate: new Date(release.published_at),
    description: truncateDescription(body || `Release ${release.tag_name} for ${repoLabel}`),
  }
}

export async function collectGithubReleaseRssItems(fetchImpl: typeof fetch = fetch): Promise<UnifiedRssItem[]> {
  const items: UnifiedRssItem[] = []

  const changelogRows = await fetchGithubReleases(CHANGELOG_REPO, CHANGELOG_RELEASE_LIMIT, fetchImpl)
  if (changelogRows) {
    for (const row of changelogRows) {
      const item = githubReleaseToItem('changelog', CHANGELOG_REPO, row)
      if (item) items.push(item)
    }
  }

  const pluginRepos = listPluginReleaseRepos()
  const pluginFetchDeadline = Date.now() + PLUGIN_RELEASE_FETCH_BUDGET_MS
  const pluginRows = await mapWithConcurrency(
    pluginRepos,
    GITHUB_CONCURRENCY,
    async (repo) => firstStableReleaseItem(repo, await fetchGithubReleases(repo, PLUGIN_RELEASES_PER_REPO, fetchImpl, pluginFetchDeadline)),
    pluginFetchDeadline,
  )

  for (const repoItems of pluginRows) items.push(...repoItems)
  return items
}

export function mergeUnifiedRssItems(sources: UnifiedRssItem[], cap = UNIFIED_RSS_ITEM_CAP): UnifiedRssItem[] {
  const byGuid = new Map<string, UnifiedRssItem>()
  for (const item of sources) {
    const existing = byGuid.get(item.guid)
    if (!existing || existing.pubDate < item.pubDate) byGuid.set(item.guid, item)
  }
  return [...byGuid.values()]
    .filter((item) => !Number.isNaN(item.pubDate.getTime()))
    .sort((left, right) => right.pubDate.getTime() - left.pubDate.getTime())
    .slice(0, cap)
}

export function buildRssXml(items: UnifiedRssItem[], siteOrigin = SITE_ORIGIN): string {
  const channelLink = `${siteOrigin}${UNIFIED_RSS_FEED_PATH}`
  const itemXml = items
    .map((item) => {
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <pubDate>${escapeXml(formatRssPubDate(item.pubDate))}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Capgo</title>
    <link>${escapeXml(channelLink)}</link>
    <description>Capgo blog posts, documentation updates, product changelog, and Cap-go plugin releases.</description>
    <language>en</language>
    <lastBuildDate>${escapeXml(formatRssPubDate(new Date()))}</lastBuildDate>
${itemXml}
  </channel>
</rss>
`
}

export function countItemsByCategory(items: UnifiedRssItem[]): Record<UnifiedRssCategory, number> {
  return {
    blog: items.filter((item) => item.category === 'blog').length,
    docs: items.filter((item) => item.category === 'docs').length,
    changelog: items.filter((item) => item.category === 'changelog').length,
    release: items.filter((item) => item.category === 'release').length,
  }
}
