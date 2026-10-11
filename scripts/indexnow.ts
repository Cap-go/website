// Submit recently modified sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep...).
// Usage: bun run scripts/indexnow.ts [days|all]   (default: 2 days)
// The key is public by design: IndexNow verifies it against https://capgo.app/<key>.txt.

const HOST = 'capgo.app'
const KEY = 'ue6dw2uu67eum6y2m8en775jjf1qhe1r'
const SITEMAP_INDEX = `https://${HOST}/sitemap-index.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const BATCH_SIZE = 10_000

type SitemapUrl = { loc: string; lastmod?: Date }

function matchAll(xml: string, tag: string): string[] {
  return [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => m[1].trim())
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`)
  return res.text()
}

async function collectUrls(sitemapUrl: string, seen = new Set<string>()): Promise<SitemapUrl[]> {
  if (seen.has(sitemapUrl)) return []
  seen.add(sitemapUrl)
  const xml = await fetchText(sitemapUrl)
  if (xml.includes('<sitemapindex')) {
    const children = matchAll(xml, 'sitemap')
      .map((block) => matchAll(block, 'loc')[0])
      .filter(Boolean)
    return (await Promise.all(children.map((child) => collectUrls(child, seen)))).flat()
  }
  return matchAll(xml, 'url').map((block) => {
    const lastmod = matchAll(block, 'lastmod')[0]
    return { loc: matchAll(block, 'loc')[0], lastmod: lastmod ? new Date(lastmod) : undefined }
  })
}

async function submit(urlList: string[]): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  })
  if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow rejected batch: ${res.status} ${await res.text()}`)
  console.log(`Submitted ${urlList.length} URLs (${res.status})`)
}

const arg = process.argv[2] ?? '2'
const since = arg === 'all' ? undefined : Date.now() - Number(arg) * 24 * 60 * 60 * 1000
if (since !== undefined && Number.isNaN(since)) throw new Error(`Invalid days argument: ${arg}`)

const all = await collectUrls(SITEMAP_INDEX)
const urls = [...new Set(all.filter((u) => u.loc?.startsWith(`https://${HOST}/`) && (since === undefined || !u.lastmod || u.lastmod.getTime() >= since)).map((u) => u.loc))]
console.log(`Found ${all.length} sitemap URLs, ${urls.length} to submit`)

for (let i = 0; i < urls.length; i += BATCH_SIZE) await submit(urls.slice(i, i + BATCH_SIZE))
