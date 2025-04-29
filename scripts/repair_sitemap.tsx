import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const sitemapPath = join('dist', 'sitemap-0.xml')

if (existsSync(sitemapPath)) {
  const xmlData = readFileSync(sitemapPath, 'utf-8')
  const jsonObj = new XMLParser().parse(xmlData)
  const copiedUrls: string[] = jsonObj.urlset.url.map((u: any) => u.loc)
  const initialUrls = copiedUrls.length
  const urls = jsonObj.urlset.url.map((u: any) => u.loc).filter((i: any) => i.includes('/blog/'))
  urls.forEach((url: string) => {
    const localizedPath = join('dist', ...new URL(url).pathname.split('/').filter(Boolean))
    if (!existsSync(localizedPath) && copiedUrls.indexOf(url) !== -1) {
      copiedUrls.splice(copiedUrls.indexOf(url), 1)
    }
  })
  console.log(`Removed ${initialUrls - copiedUrls.length} urls that were not found.`)
  jsonObj.urlset.url = copiedUrls.map((loc: string) => ({ loc }))
  const xmlBuilder = new XMLBuilder()
  const updatedXmlData = xmlBuilder.build(jsonObj)
  writeFileSync(sitemapPath, updatedXmlData, 'utf-8')
}
