import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { locales } from '../src/services/locale'

const table: any = {}
const sitemapPath = join('dist', 'sitemap-0.xml')
const localeRegex = new RegExp(`^\\/(${locales.join('|')})\\/`)

if (existsSync(sitemapPath)) {
  const xmlData = readFileSync(sitemapPath, 'utf-8')
  const jsonObj = new XMLParser().parse(xmlData)
  const copiedUrls: string[] = jsonObj.urlset.url.map((u: any) => u.loc)
  const initialUrls = copiedUrls.length
  const urls = jsonObj.urlset.url.map((u: any) => u.loc).filter((i: any) => i.includes('/blog/'))
  urls.forEach((url: string) => {
    const slug = new URL(url).pathname.replace(localeRegex, '/')
    if (!table[slug]) table[slug] = {}
    locales.forEach((locale: any) => {
      const localizedPath = join('dist', locale, ...slug.split('/').filter(Boolean))
      if (!existsSync(localizedPath)) {
        if (copiedUrls.indexOf(url) !== -1) copiedUrls.splice(copiedUrls.indexOf(url), 1)
      }
    })
  })
  console.log(`Removed ${initialUrls - copiedUrls.length} urls that were not found.`)
  jsonObj.urlset.url = copiedUrls.map((loc: string) => ({ loc }))
  const xmlBuilder = new XMLBuilder()
  const updatedXmlData = xmlBuilder.build(jsonObj)
  writeFileSync(sitemapPath, updatedXmlData, 'utf-8')
}
