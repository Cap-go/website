import { XMLParser } from 'fast-xml-parser'

const fetch = globalThis.fetch

async function checkSitemapFor404s(sitemapUrl) {
  try {
    // Fetch the sitemap
    const response = await fetch(sitemapUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.statusText}`)
    }
    const xmlData = await response.text()

    // Parse XML to JSON
    const jsonObj = new XMLParser().parse(xmlData)
    const urls = jsonObj.urlset.url.map((u) => u.loc)

    console.log(`Total URLs found: ${urls.length}`)

    // Check URLs for 404 in parallel
    const results = []
    const batchSize = 200 // Increased batch size for faster processing
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize)
      const batchPromises = batch.map(async (url) => {
        try {
          const res = await fetch(url, { method: 'HEAD' })
          if (res.status === 404) {
            results.push({ url, status: 404 })
            console.log(`404 found: ${url}`)
          }
        } catch (err) {
          results.push({ url, status: 'Error', error: err.message })
          console.error(`Error checking ${url}: ${err.message}`)
        }
      })
      await Promise.all(batchPromises)
      console.log(`Processed ${Math.min(i + batchSize, urls.length)}/${urls.length} URLs`)
    }

    // Summary
    const notFoundUrls = results.filter((r) => r.status === 404)
    console.log(`404 URLs:`)
    notFoundUrls.forEach((r) => console.log(r.url))
    console.log(`\nSummary:`)
    console.log(`Total 404s: ${notFoundUrls.length}`)

    return results
  } catch (error) {
    console.error('Error processing sitemap:', error)
    return []
  }
}

// Run the check
checkSitemapFor404s('https://capgo.app/sitemap-0.xml')
