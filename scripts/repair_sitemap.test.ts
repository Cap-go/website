import { expect, test } from 'bun:test'
import { XMLParser } from 'fast-xml-parser'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { normalizeSitemap } from './repair_sitemap'

test('docs sitemap expands all locales with reciprocal alternates and preserves content dates', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'capgo-sitemap-'))
  const file = join(directory, 'sitemap-docs-0.xml')
  try {
    writeFileSync(file, '<urlset><url><loc>https://capgo.app/docs/guide/</loc><lastmod>2026-10-20</lastmod></url><url><loc>https://capgo.app/410/</loc></url></urlset>')
    await normalizeSitemap(file)
    const first = readFileSync(file, 'utf8')
    const urls = new XMLParser({ ignoreAttributes: false }).parse(first).urlset.url
    expect(urls).toHaveLength(9)
    expect(urls.map((url: { loc: string }) => url.loc)).toContain('https://capgo.app/ja/docs/guide/')
    for (const url of urls) {
      expect(url.lastmod).toStartWith('2026-10-20')
      expect(url['xhtml:link']).toHaveLength(10)
      expect(url['xhtml:link'].find((link: Record<string, string>) => link['@_hreflang'] === 'x-default')['@_href']).toBe('https://capgo.app/docs/guide/')
    }
    await normalizeSitemap(file)
    expect(readFileSync(file, 'utf8')).toBe(first)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
