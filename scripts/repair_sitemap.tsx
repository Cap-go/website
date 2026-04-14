import { XMLParser } from 'fast-xml-parser'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { SitemapStream, streamToPromise } from 'sitemap'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

const HOSTNAME = 'https://capgo.app'

const parser = new XMLParser()

function resolveDistDir(appName: 'web' | 'docs'): string {
  const distRoot = join('apps', appName, 'dist')
  const clientDist = join(distRoot, 'client')
  return existsSync(clientDist) ? clientDist : distRoot
}

const WEB_DIST = resolveDistDir('web')
const DOCS_DIST = resolveDistDir('docs')

async function normalizeSitemap(inputPath: string, outputPath = inputPath): Promise<boolean> {
  if (!existsSync(inputPath)) return false

  const xmlData = readFileSync(inputPath, 'utf-8')
  const jsonObj = parser.parse(xmlData)
  const rawUrls = jsonObj?.urlset?.url
  const urls: SitemapUrl[] = Array.isArray(rawUrls) ? rawUrls : rawUrls ? [rawUrls] : []
  const smStream = new SitemapStream({ hostname: HOSTNAME })

  urls.forEach((item) => {
    smStream.write({
      url: item.loc,
      lastmod: item.lastmod,
      changefreq: item.changefreq,
      priority: item.priority,
    })
  })

  smStream.end()
  const sitemap = await streamToPromise(smStream)
  writeFileSync(outputPath, sitemap.toString(), 'utf-8')
  return true
}

const sitemapEntries: string[] = []

if (await normalizeSitemap(join(WEB_DIST, 'sitemap-0.xml'))) {
  sitemapEntries.push(`${HOSTNAME}/sitemap-0.xml`)
}

if (await normalizeSitemap(join(DOCS_DIST, 'sitemap-0.xml'), join(WEB_DIST, 'docs-sitemap-0.xml'))) {
  sitemapEntries.push(`${HOSTNAME}/docs-sitemap-0.xml`)
}

for (const docsArtifact of ['llms.txt', 'llms-full.txt']) {
  const sourcePath = join(DOCS_DIST, docsArtifact)
  if (existsSync(sourcePath)) {
    copyFileSync(sourcePath, join(WEB_DIST, docsArtifact))
  }
}

if (sitemapEntries.length > 0) {
  const sitemapIndex = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries.map((loc) => `  <sitemap><loc>${loc}</loc></sitemap>`),
    '</sitemapindex>',
    '',
  ].join('\n')

  writeFileSync(join(WEB_DIST, 'sitemap-index.xml'), sitemapIndex, 'utf-8')
}
