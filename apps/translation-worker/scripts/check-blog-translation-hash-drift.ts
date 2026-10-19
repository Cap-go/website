import { createHash } from 'node:crypto'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { __translationWorkerTest } from '../src/index.ts'

const TRANSLATION_CACHE_VERSION = __translationWorkerTest.TRANSLATION_CACHE_VERSION
const LOCALES = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'] as const
const SITE_ORIGIN = process.env.CAPGO_SITE_ORIGIN ?? 'https://capgo.app'
const BLOG_DIR = join(process.cwd(), '..', 'web', 'src', 'content', 'blog', 'en')

async function sha256Hex(value: string): Promise<string> {
  return createHash('sha256').update(value).digest('hex')
}

async function expectedSourceHash(locale: string, englishHtml: string): Promise<string> {
  return await sha256Hex(`${TRANSLATION_CACHE_VERSION}:${locale}:${englishHtml}`)
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title>([^<]*)<\/title>/i)
  return match?.[1]?.trim() ?? null
}

async function listBlogSlugs(): Promise<string[]> {
  const files = await readdir(BLOG_DIR)
  return files.filter((file) => file.endsWith('.md') || file.endsWith('.mdx')).map((file) => file.replace(/\.mdx?$/, ''))
}

async function main(): Promise<void> {
  const slugs = await listBlogSlugs()
  const drift: Array<{ locale: string; url: string; storedHash: string | null; expectedHash: string; englishTitle: string; localizedTitle: string | null }> = []

  for (const slug of slugs) {
    const englishUrl = `${SITE_ORIGIN}/blog/${slug}/`
    const englishResponse = await fetch(englishUrl, { headers: { Accept: 'text/html' } })
    if (!englishResponse.ok) continue
    const englishHtml = await englishResponse.text()
    const englishTitle = extractTitle(englishHtml) ?? slug

    for (const locale of LOCALES) {
      const localizedUrl = `${SITE_ORIGIN}/${locale}/blog/${slug}/`
      const localizedResponse = await fetch(localizedUrl, { headers: { Accept: 'text/html' } })
      if (!localizedResponse.ok) continue

      const storedHash = localizedResponse.headers.get('x-capgo-translation-source-hash')
      const expectedHash = await expectedSourceHash(locale, englishHtml)
      if (storedHash === expectedHash) continue

      const localizedHtml = await localizedResponse.text()
      drift.push({
        locale,
        url: localizedUrl,
        storedHash,
        expectedHash,
        englishTitle,
        localizedTitle: extractTitle(localizedHtml),
      })
    }
  }

  if (drift.length === 0) {
    console.log('No localized blog pages with translation source hash drift.')
    return
  }

  console.log(`Found ${drift.length} localized blog page(s) with stale translation source hash:\n`)
  for (const entry of drift) {
    console.log(`- ${entry.url}`)
    console.log(`  english title: ${entry.englishTitle}`)
    console.log(`  localized title: ${entry.localizedTitle ?? '(missing)'}`)
    console.log(`  stored hash: ${entry.storedHash ?? '(missing)'}`)
    console.log(`  expected hash: ${entry.expectedHash}`)
  }

  process.exitCode = 1
}

if (import.meta.main) {
  await main()
}
