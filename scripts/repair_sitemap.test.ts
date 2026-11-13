import { expect, test } from 'bun:test'
import { XMLParser } from 'fast-xml-parser'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { normalizeSitemap } from './repair_sitemap'

test('docs sitemap keeps canonical English URLs and content dates without speculative translations', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'capgo-sitemap-'))
  const file = join(directory, 'sitemap-docs-0.xml')
  try {
    writeFileSync(
      file,
      '<urlset><url><loc>https://capgo.app/docs/guide/</loc><lastmod>2026-10-20</lastmod></url><url><loc>https://capgo.app/ja/docs/guide/</loc></url><url><loc>https://capgo.app/410/</loc></url></urlset>',
    )
    await normalizeSitemap(file)
    const first = readFileSync(file, 'utf8')
    const parsed = new XMLParser({ ignoreAttributes: false }).parse(first).urlset.url
    const urls = Array.isArray(parsed) ? parsed : [parsed]
    expect(urls).toHaveLength(1)
    expect(urls.map((url: { loc: string }) => url.loc)).toEqual(['https://capgo.app/docs/guide/'])
    for (const url of urls) {
      expect(url.lastmod).toStartWith('2026-10-20')
      expect(url['xhtml:link']).toBeUndefined()
    }
    await normalizeSitemap(file)
    expect(readFileSync(file, 'utf8')).toBe(first)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
