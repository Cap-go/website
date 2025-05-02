import { XMLParser } from 'fast-xml-parser'
import { load } from 'cheerio'

async function verifyHtmlElements(sitemapUrl) {
    try {
        const response = await fetch(sitemapUrl)
        if (!response.ok) throw new Error(`Failed to fetch sitemap: ${response.statusText}`)
        const xmlData = await response.text()
        const jsonObj = new XMLParser().parse(xmlData)
        const urls = jsonObj.urlset.url.map((u) => u.loc)
        console.log(`Total URLs found: ${urls.length}`)
        const batchSize = 200
        const missingHreflangs = []
        const missingCanonicals = []
        for (let i = 0; i < urls.length; i += batchSize) {
            const batch = urls.slice(i, i + batchSize)
            const batchPromises = batch.map(async (url) => {
                try {
                    const res = await fetch(url)
                    if (!res.ok) {
                        console.log(`Error found: ${url} with status ${res.status}`)
                        return
                    }
                    const html = await res.text()
                    const $ = load(html)
                    const canonical = $('link[rel="canonical"]').attr('href')
                    const hreflangs = $('link[rel="alternate"][hreflang]').map((_, el) => $(el).attr('hreflang')).get()
                    if (!canonical) 
                        missingCanonicals.push(url)
                    if (hreflangs.length === 0) 
                        missingHreflangs.push(url)
                } catch (err) {
                    console.error(`Error checking ${url}: ${err.message}`)
                }
            })
            await Promise.all(batchPromises)
            console.log(`Processed ${Math.min(i + batchSize, urls.length)}/${urls.length} URLs`)
        }
        console.log(`\nSummary:`)
        console.log(`Missing Canonical Links:`)
        console.log(JSON.stringify(missingCanonicals, null, 2))
        console.log(`Missing Hreflang Links:`)
        console.log(JSON.stringify(missingHreflangs, null, 2))
    } catch (error) {
        console.error('Error processing sitemap:', error)
    }
}

verifyHtmlElements('https://capgo.app/sitemap-0.xml')
