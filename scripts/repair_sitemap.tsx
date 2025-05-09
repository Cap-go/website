import { XMLParser } from 'fast-xml-parser'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { SitemapStream, streamToPromise } from 'sitemap'

const sitemapPath = join('dist', 'sitemap-0.xml')

if (existsSync(sitemapPath)) {
  const xmlData = readFileSync(sitemapPath, 'utf-8')
  const jsonObj = new XMLParser().parse(xmlData)
  const urls = jsonObj.urlset.url.map(({ loc }: { loc: string }) => loc)
  const smStream = new SitemapStream({ hostname: process.env.NEXT_PUBLIC_SITE })
  urls.forEach((url: string) => smStream.write({ url }))
  smStream.end()
  const sitemap = await streamToPromise(smStream)
  writeFileSync(sitemapPath, sitemap.toString(), 'utf-8')
}
