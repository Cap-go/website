import { actions } from '@/config/plugins'
import matter from 'gray-matter'
import { execFileSync } from 'node:child_process'
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

function resolveMonorepoPaths(): { repoRoot: string; docsRoot: string } {
  const cwd = process.cwd()
  const fromWorkspace = join(cwd, 'apps/docs/src/content/docs/docs')
  if (existsSync(fromWorkspace)) {
    return { repoRoot: cwd, docsRoot: fromWorkspace }
  }
  const fromWebApp = join(cwd, '../docs/src/content/docs/docs')
  if (existsSync(fromWebApp)) {
    return { repoRoot: join(cwd, '..', '..'), docsRoot: fromWebApp }
  }
  const sourceLibDir = fileURLToPath(new URL('.', import.meta.url))
  const webRoot = join(sourceLibDir, '..', '..')
  const docsRoot = join(webRoot, '..', 'docs/src/content/docs/docs')
  if (existsSync(docsRoot)) {
    return { repoRoot: join(webRoot, '..'), docsRoot }
  }
  throw new Error('Could not locate apps/docs content for the unified RSS feed')
}

const { repoRoot: REPO_ROOT, docsRoot: DOCS_CONTENT_ROOT } = resolveMonorepoPaths()
const CHANGELOG_REPO = 'Cap-go/capgo.app'
const GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? ''
const PLUGIN_RELEASES_PER_REPO = 1
const CHANGELOG_RELEASE_LIMIT = 40
const GITHUB_CONCURRENCY = 6

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
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

let docsGitLastModifiedCache: Map<string, string> | null = null

function loadDocsGitLastModifiedMap(): Map<string, string> {
  if (docsGitLastModifiedCache) return docsGitLastModifiedCache
  const map = new Map<string, string>()
  try {
    const output = execFileSync('git', ['log', '--format=%cI', '--name-only', '--', 'apps/docs/src/content/docs/docs'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    let currentDate: string | null = null
    for (const line of output.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed) continue
      if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
        currentDate = trimmed
        continue
      }
      if (!currentDate || map.has(trimmed)) continue
      map.set(trimmed, currentDate)
    }
  } catch {
    // Git history is optional; file mtimes still provide a fallback.
  }
  docsGitLastModifiedCache = map
  return map
}

function resolveDocDate(filePath: string, frontmatter: Record<string, unknown>): Date {
  const lastUpdated = frontmatter.lastUpdated
  if (typeof lastUpdated === 'string' || typeof lastUpdated === 'number' || lastUpdated instanceof Date) {
    const parsed = new Date(lastUpdated)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  const relativePath = relative(REPO_ROOT, filePath).replaceAll('\\', '/')
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
  for (const action of actions) {
    const match = action.href.match(/^https:\/\/github\.com\/Cap-go\/([^/?#]+)/i)
    if (!match) continue
    const repoName = match[1].replace(/\.git$/i, '').replace(/\/$/, '')
    if (repoName === 'capacitor-updater' || repoName.startsWith('capacitor-')) {
      repos.add(`Cap-go/${repoName}`)
    }
  }
  return [...repos].sort((left, right) => left.localeCompare(right))
}

async function fetchGithubReleases(repo: string, perPage: number, fetchImpl: typeof fetch): Promise<GithubReleaseRow[] | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'capgo-website-rss',
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  }
  try {
    const response = await fetchImpl(`https://api.github.com/repos/${repo}/releases?per_page=${perPage}`, {
      headers,
      signal: AbortSignal.timeout(20_000),
    })
    if (response.status === 403 || response.status === 429 || !response.ok) return null
    const data = (await response.json()) as GithubReleaseRow[]
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = []
  let index = 0
  async function worker() {
    while (index < items.length) {
      const current = index
      index += 1
      results[current] = await mapper(items[current])
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  await Promise.all(workers)
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
  const pluginRows = await mapWithConcurrency(pluginRepos, GITHUB_CONCURRENCY, async (repo) => {
    const rows = await fetchGithubReleases(repo, PLUGIN_RELEASES_PER_REPO, fetchImpl)
    if (!rows) return [] as UnifiedRssItem[]
    return rows.map((row) => githubReleaseToItem('release', repo, row)).filter((item): item is UnifiedRssItem => item !== null)
  })

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
