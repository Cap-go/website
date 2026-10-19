import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

type PluginRow = {
  pkg: string
  author: string
  description: string
  href: string
  title: string
  repo: string
  downloads: number
}

const root = join(import.meta.dir, '..')
const pluginsTs = readFileSync(join(root, 'apps/web/src/config/plugins.ts'), 'utf8')
const rawMatch = pluginsTs.match(/String\.raw`([\s\S]*?)`/)
if (!rawMatch) throw new Error('actionDefinitionRows not found')
const downloads = JSON.parse(readFileSync(join(root, 'apps/web/src/data/npm-downloads.json'), 'utf8')) as Record<
  string,
  number
>

const docsRoot = join(root, 'apps/docs/src/content/docs/docs/plugins')
const docSlugs = new Set(readdirSync(docsRoot).filter((name) => !name.includes('.')))

const rows: PluginRow[] = rawMatch[1]
  .trim()
  .split('\n')
  .map((line) => {
    const [pkg, author, description, href, title] = line.split('|')
    const repo = href.replace('https://github.com/', '').replace(/\/$/, '')
    return { pkg, author, description, href, title, repo, downloads: downloads[pkg] ?? 0 }
  })
  .filter((p) => p.author.includes('Cap-go') || p.pkg.startsWith('@capgo'))

function slugCandidates(pkg: string, href: string): string[] {
  const candidates: string[] = []
  const seg = pkg.includes('/') ? pkg.split('/')[1]! : pkg
  const add = (v: string) => {
    if (v && !candidates.includes(v)) candidates.push(v)
  }
  add(seg)
  if (seg.startsWith('capacitor-')) add(seg.slice('capacitor-'.length))
  const repoName = href.replace(/\/$/, '').split('/').pop() ?? ''
  add(repoName)
  if (repoName.startsWith('capacitor-')) add(repoName.slice('capacitor-'.length))
  return candidates
}

function resolveSlug(row: PluginRow): string | null {
  for (const c of slugCandidates(row.pkg, row.href)) {
    if (docSlugs.has(c)) return c
  }
  return null
}

function assessQuality(slug: string): 'good' | 'thin' | 'missing' {
  const indexPath = join(docsRoot, slug, 'index.mdx')
  const gsPath = join(docsRoot, slug, 'getting-started.mdx')
  if (!existsSync(indexPath)) return 'missing'
  const index = readFileSync(indexPath, 'utf8')
  const overview = index.match(/## Overview\n\n([\s\S]*?)\n\n##/)?.[1]?.trim() ?? ''
  const thinOverview =
    overview.length < 80 ||
    /^Capacitor plugin contract/i.test(overview) ||
    overview === index.match(/description: "([^"]+)"/)?.[1]
  const gs = existsSync(gsPath) ? readFileSync(gsPath, 'utf8') : ''
  const exampleSections = (gs.match(/^##+ .*(example|use case|flow|recipe)/gim) ?? []).length
  const codeBlocks = (gs.match(/```/g) ?? []).length / 2
  if (!existsSync(gsPath) || thinOverview) return 'thin'
  if (exampleSections >= 1 && codeBlocks >= 3 && overview.length >= 120) return 'good'
  if (codeBlocks >= 2 && overview.length >= 100) return 'good'
  return 'thin'
}

async function fetchDefinitions(repo: string): Promise<{ methods: string[]; platforms: string }> {
  const paths = ['src/definitions.ts', 'src/definitions.tsx']
  for (const path of paths) {
    const url = `https://api.github.com/repos/${repo}/contents/${path}`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'capgo-docs-inventory',
      },
    })
    if (!res.ok) continue
    const body = (await res.json()) as { content?: string }
    if (!body.content) continue
    const text = Buffer.from(body.content, 'base64').toString('utf8')
    const methods = [...text.matchAll(/^\s{2}(\w+)\(/gm)].map((m) => m[1])
    const ifaceMethods = [...text.matchAll(/^\s+(\w+)\([^)]*\):/gm)].map((m) => m[1])
    const merged = [...new Set([...methods, ...ifaceMethods])].filter(
      (m) => !['addListener', 'removeAllListeners', 'getPluginVersion'].includes(m),
    )
    const platformLine =
      text.match(/@platform\s+([^\n*]+)/i)?.[1]?.trim() ??
      (text.includes('web:') || text.includes("'web'") ? 'iOS, Android, Web (see definitions)' : 'iOS, Android (see repo)')
    return { methods: merged.slice(0, 8), platforms: platformLine }
  }
  return { methods: [], platforms: 'see repo README' }
}

const capgoRows = rows.filter((r) => r.pkg.startsWith('@capgo'))
const withDocs = capgoRows
  .map((r) => ({ ...r, slug: resolveSlug(r) }))
  .filter((r) => r.slug)

withDocs.sort((a, b) => b.downloads - a.downloads)

const concurrency = 8
const inventory: Array<{
  slug: string
  pkg: string
  features: string
  platforms: string
  quality: string
  downloads: number
}> = []

for (let i = 0; i < withDocs.length; i += concurrency) {
  const chunk = withDocs.slice(i, i + concurrency)
  const results = await Promise.all(
    chunk.map(async (row) => {
      const { methods, platforms } = await fetchDefinitions(row.repo)
      const features = methods.length ? methods.join(', ') : row.description.slice(0, 120)
      const quality = row.slug ? assessQuality(row.slug) : 'missing'
      return {
        slug: row.slug!,
        pkg: row.pkg,
        features,
        platforms,
        quality,
        downloads: row.downloads,
      }
    }),
  )
  inventory.push(...results)
  process.stderr.write(`Fetched ${Math.min(i + concurrency, withDocs.length)}/${withDocs.length}\n`)
}

console.log('| Plugin | Key features (from definitions.ts) | Platforms | Docs quality |')
console.log('| --- | --- | --- | --- |')
for (const row of inventory) {
  const esc = (s: string) => s.replace(/\|/g, '/').replace(/\n/g, ' ')
  console.log(`| ${esc(row.pkg)} | ${esc(row.features)} | ${esc(row.platforms)} | ${row.quality} |`)
}

console.error(`\nTotal documented Cap-go plugins: ${inventory.length}`)
