import { XMLParser } from 'fast-xml-parser'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { SitemapStream, streamToPromise } from 'sitemap'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

const sitemapPath = join('dist', 'sitemap-0.xml')

if (existsSync(sitemapPath)) {
  const xmlData = readFileSync(sitemapPath, 'utf-8')
  const jsonObj = new XMLParser().parse(xmlData)
  const urls: SitemapUrl[] = jsonObj.urlset.url
  const smStream = new SitemapStream({ hostname: 'https://capgo.app' })
  urls.forEach((item: SitemapUrl) => {
    smStream.write({
      url: item.loc,
      lastmod: item.lastmod,
      changefreq: item.changefreq,
      priority: item.priority,
    })
  })
  smStream.end()
  const sitemap = await streamToPromise(smStream)
  writeFileSync(sitemapPath, sitemap.toString(), 'utf-8')
}
