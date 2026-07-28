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

function parseDate(text: string): string {
  const date = new Date(text)
  if (!Number.isNaN(date.getTime())) return date.toISOString()
  return new Date().toISOString()
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
        if (distribution !== null) {
          rows.push({ version, api, distribution })
        }
      })
    return rows
  }

  return {
    updatedAt: parseDate(updatedText || new Date().toDateString()),
    source: 'Composables Android Distribution Chart',
    sourceUrl: ANDROID_URL,
    fetchedAt: new Date().toISOString(),
    apiDistribution: parseTable(0),
    cumulativeDistribution: parseTable(1),
  }
}

async function scrapeIos(): Promise<IosData> {
  const html = await fetchHtml(IOS_URL)
  const $ = cheerio.load(html)

  const sourceText = $('#page-content p')
    .filter((_, el) => $(el).text().includes('last updated'))
    .text()
  const updatedMatch = sourceText.match(/last updated on\s*<b>([^<]+)<\/b>/i)
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
    rows.push({ version, released, cumulativeUsage, lastIosFor })
  })

  return {
    updatedAt: parseDate(updatedText || new Date().toDateString()),
    source: 'iOS Ref',
    sourceUrl: IOS_URL,
    fetchedAt: new Date().toISOString(),
    data: rows,
  }
}

function writeIfChanged(filePath: string, data: unknown): boolean {
  const next = JSON.stringify(data, null, 2) + '\n'
  if (fs.existsSync(filePath)) {
    const current = fs.readFileSync(filePath, 'utf8')
    if (current === next) {
      console.log(`No change for ${path.basename(filePath)}`)
      return false
    }
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, next)
  console.log(`Updated ${path.basename(filePath)}`)
  return true
}

const changed: string[] = []

async function main() {
  const android = await scrapeAndroid()
  const ios = await scrapeIos()
  if (writeIfChanged(ANDROID_FILE, android)) changed.push('apps/web/src/data/android-distribution.json')
  if (writeIfChanged(IOS_FILE, ios)) changed.push('apps/web/src/data/ios-distribution.json')

  console.log(JSON.stringify({ changed }, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
