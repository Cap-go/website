import * as cheerio from 'cheerio'
import fs from 'node:fs'
import path from 'node:path'

const ANDROID_URL = 'https://composables.com/android-distribution-chart'
const IOS_URL = 'https://iosref.com/ios-usage'

const DATA_DIR = path.join(import.meta.dir, '..', 'apps', 'web', 'src', 'data')
const ANDROID_FILE = path.join(DATA_DIR, 'android-distribution.json')
const IOS_FILE = path.join(DATA_DIR, 'ios-distribution.json')

interface AndroidApiRow {
  version: string
  api: number | null
  distribution: number
}

interface AndroidData {
  updatedAt: string
  source: string
  sourceUrl: string
  fetchedAt: string
  apiDistribution: AndroidApiRow[]
  cumulativeDistribution: AndroidApiRow[]
}

interface IosRow {
  version: string
  released: string
  cumulativeUsage: number | null
  lastIosFor: string
}

interface IosData {
  updatedAt: string
  source: string
  sourceUrl: string
  fetchedAt: string
  data: IosRow[]
}

function parsePercent(text: string): number | null {
  const clean = text.replace(/,/g, '').replace(/%/g, '').trim()
  const value = parseFloat(clean)
  return Number.isFinite(value) ? value : null
}

function parseRequiredDate(text: string, label: string): string {
  const trimmed = text.trim()
  if (!trimmed) throw new Error(`Missing ${label} update date in source HTML`)
  const date = new Date(trimmed)
  if (Number.isNaN(date.getTime())) throw new Error(`Unparsable ${label} update date: ${trimmed}`)
  return date.toISOString()
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      Accept: 'text/html',
      'User-Agent': 'Mozilla/5.0 (compatible; CapgoBot/1.0; +https://capgo.app)',
    },
  })
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.text()
}

async function scrapeAndroid(): Promise<AndroidData> {
  const html = await fetchHtml(ANDROID_URL)
  const $ = cheerio.load(html)

  const updatedText = $('.distribution-updated time').text().trim()
  const tables = $('.distribution-table')
  if (tables.length < 2) {
    throw new Error(`Expected 2 Android distribution tables, found ${tables.length}`)
  }

  const parseTable = (index: number): AndroidApiRow[] => {
    const rows: AndroidApiRow[] = []
    tables
      .eq(index)
      .find('tbody tr')
      .each((_, tr) => {
        const cells = $(tr).find('td')
        if (cells.length < 3) return
        const version = cells.eq(0).text().trim()
        const apiText = cells.eq(1).text().trim()
        const api = /^\d+$/.test(apiText) ? Number(apiText) : null
        const distributionText = cells.eq(2).find('.titleSmall').last().text().trim() || cells.eq(2).text().trim()
        const distribution = parsePercent(distributionText)
        if (version && distribution !== null) {
          rows.push({ version, api, distribution })
        }
      })
    return rows
  }

  const apiDistribution = parseTable(0)
  const cumulativeDistribution = parseTable(1)
  if (apiDistribution.length === 0 || cumulativeDistribution.length === 0) {
    throw new Error(`Android tables parsed empty (api=${apiDistribution.length}, cumulative=${cumulativeDistribution.length})`)
  }

  return {
    updatedAt: parseRequiredDate(updatedText, 'Android'),
    source: 'Composables Android Distribution Chart',
    sourceUrl: ANDROID_URL,
    fetchedAt: new Date().toISOString(),
    apiDistribution,
    cumulativeDistribution,
  }
}

async function scrapeIos(): Promise<IosData> {
  const html = await fetchHtml(IOS_URL)
  const $ = cheerio.load(html)

  const sourceText = $('#page-content p')
    .filter((_, el) => $(el).text().includes('last updated'))
    .text()
  const updatedMatch = sourceText.match(/last updated on\s+([^.]+?)(?:\s+using|\.|$)/i)
  const updatedText = updatedMatch ? updatedMatch[1].trim() : ''

  const rows: IosRow[] = []
  $('.table.table-bordered tbody tr').each((_, tr) => {
    const cells = $(tr).find('td')
    if (cells.length < 3) return
    const version = cells.eq(0).text().replace(/BETA/g, '').trim()
    const released = cells.eq(1).text().trim()
    const usageText = cells.eq(2).find('.titleSmall').last().text().trim() || cells.eq(2).text().trim()
    const cumulativeUsage = parsePercent(usageText)
    const lastIosFor = cells.length >= 4 ? cells.eq(3).text().trim().replace(/\s+/g, ' ') : ''
    if (!version) return
    rows.push({ version, released, cumulativeUsage, lastIosFor })
  })

  const rowsWithUsage = rows.filter((row) => typeof row.cumulativeUsage === 'number')
  if (rows.length === 0 || rowsWithUsage.length === 0) {
    throw new Error(`iOS table parsed empty (rows=${rows.length}, withUsage=${rowsWithUsage.length})`)
  }

  return {
    updatedAt: parseRequiredDate(updatedText, 'iOS'),
    source: 'iOS Ref',
    sourceUrl: IOS_URL,
    fetchedAt: new Date().toISOString(),
    data: rows,
  }
}

function withoutFetchedAt(data: { fetchedAt?: string }): unknown {
  const { fetchedAt: _fetchedAt, ...rest } = data
  return rest
}

function writeIfChanged(filePath: string, data: { fetchedAt: string }): boolean {
  const nextSemantic = JSON.stringify(withoutFetchedAt(data), null, 2)
  if (fs.existsSync(filePath)) {
    const current = JSON.parse(fs.readFileSync(filePath, 'utf8')) as { fetchedAt?: string }
    if (JSON.stringify(withoutFetchedAt(current), null, 2) === nextSemantic) {
      console.log(`No change for ${path.basename(filePath)}`)
      return false
    }
  }
  const next = JSON.stringify(data, null, 2) + '\n'
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, next)
  console.log(`Updated ${path.basename(filePath)}`)
  return true
}

async function scrapeAndWrite(label: string, repoPath: string, filePath: string, scrape: () => Promise<{ fetchedAt: string }>): Promise<{ changed: boolean; ok: boolean }> {
  try {
    const data = await scrape()
    const changed = writeIfChanged(filePath, data)
    return { changed, ok: true }
  } catch (err) {
    console.error(`${label} scrape failed:`, err)
    return { changed: false, ok: false }
  }
}

async function main() {
  const [android, ios] = await Promise.all([
    scrapeAndWrite('Android', 'apps/web/src/data/android-distribution.json', ANDROID_FILE, scrapeAndroid),
    scrapeAndWrite('iOS', 'apps/web/src/data/ios-distribution.json', IOS_FILE, scrapeIos),
  ])

  const changed: string[] = []
  if (android.changed) changed.push('apps/web/src/data/android-distribution.json')
  if (ios.changed) changed.push('apps/web/src/data/ios-distribution.json')

  console.log(JSON.stringify({ changed, androidOk: android.ok, iosOk: ios.ok }, null, 2))

  if (!android.ok && !ios.ok) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
