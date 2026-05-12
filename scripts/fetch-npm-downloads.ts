#!/usr/bin/env bun

/**
 * Fetches npm download stats for all plugins in plugins.ts and saves to a JSON file.
 * Uses official npm API with parallel requests.
 * Run with: bun run scripts/fetch-npm-downloads.ts
 */

import { actions } from '../apps/web/src/config/plugins'

const MAX_RUNTIME_MS = 5 * 60 * 1000 // 5 minutes
const REFRESH_DOWNLOADS = process.env.NPM_DOWNLOADS_REFRESH === 'true'
const STRICT_REFRESH = process.env.NPM_DOWNLOADS_STRICT_REFRESH === 'true'
const CONCURRENCY = Number.parseInt(process.env.NPM_DOWNLOADS_CONCURRENCY ?? '20', 10)
const outputPath = new URL('../apps/web/src/data/npm-downloads.json', import.meta.url).pathname
let startTime: number

// Get date range for last 90 days (quarter)
const getDateRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 90)
  const format = (d: Date) => d.toISOString().split('T')[0]
  return `${format(start)}:${format(end)}`
}

// Check if we've exceeded the time limit
const checkTimeout = () => {
  if (performance.now() - startTime > MAX_RUNTIME_MS) {
    throw new Error('Timeout: Script exceeded 5 minute limit')
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const readCachedDownloads = async (): Promise<Record<string, number>> => {
  try {
    const file = Bun.file(outputPath)
    if (!(await file.exists())) return {}
    return (await file.json()) as Record<string, number>
  } catch (error) {
    console.warn(`Could not read npm downloads cache:`, error)
    return {}
  }
}

const hasCompleteCache = (cache: Record<string, number>, packageNames: string[]) => packageNames.every((name) => typeof cache[name] === 'number')

const getRetryDelayMs = (response: Response, attempt: number) => {
  const retryAfter = response.headers.get('retry-after')
  if (retryAfter) {
    const retryAfterSeconds = Number.parseInt(retryAfter, 10)
    if (Number.isFinite(retryAfterSeconds)) return retryAfterSeconds * 1000
  }

  return Math.min(30000, attempt * 5000)
}

// Fetch downloads for a single package. On rate limit, prefer stale cache unless strict mode asks us to wait.
const fetchDownloads = async (packageName: string, cachedDownloads?: number): Promise<number> => {
  const dateRange = getDateRange()
  let attempt = 0

  while (attempt < 5) {
    checkTimeout()
    attempt++

    try {
      const apiUrl = `https://api.npmjs.org/downloads/point/${dateRange}/${packageName}`
      const response = await fetch(apiUrl)

      if (response.status === 429) {
        if (!STRICT_REFRESH && cachedDownloads !== undefined) {
          console.warn(`  Rate limited for ${packageName}, using cached value`)
          return cachedDownloads
        }

        const waitTime = getRetryDelayMs(response, attempt)
        console.warn(`  Rate limited for ${packageName}, attempt ${attempt}, waiting ${waitTime / 1000}s...`)
        await sleep(waitTime)
        continue
      }

      if (response.status === 404) {
        console.warn(`  ${packageName}: not found on npm (returning 0)`)
        return 0
      }

      if (!response.ok) {
        if (!STRICT_REFRESH && cachedDownloads !== undefined) {
          console.warn(`  ${packageName}: HTTP ${response.status}, using cached value`)
          return cachedDownloads
        }

        const waitTime = Math.min(attempt * 2000, 30000)
        console.warn(`  ${packageName}: HTTP ${response.status}, attempt ${attempt}, retrying in ${waitTime / 1000}s...`)
        await sleep(waitTime)
        continue
      }

      const data = await response.json()
      return data.downloads ?? 0
    } catch (error) {
      if (error instanceof Error && error.message.includes('Timeout')) {
        throw error
      }

      if (!STRICT_REFRESH && cachedDownloads !== undefined) {
        console.warn(`  ${packageName}: error, using cached value`)
        return cachedDownloads
      }

      const waitTime = Math.min(attempt * 2000, 30000)
      console.warn(`  ${packageName}: error, attempt ${attempt}, retrying in ${waitTime / 1000}s...`)
      await sleep(waitTime)
    }
  }

  if (cachedDownloads !== undefined) {
    console.warn(`  ${packageName}: failed after ${attempt} attempts, using cached value`)
    return cachedDownloads
  }

  console.warn(`  ${packageName}: failed after ${attempt} attempts, returning 0`)
  return 0
}

async function main() {
  startTime = performance.now()
  console.log('Preparing npm download stats for all plugins...')

  const packageNames = [...new Set(actions.map((p) => p.name).filter(Boolean))] as string[]
  const cachedDownloads = await readCachedDownloads()

  console.log(`Found ${packageNames.length} unique npm packages`)

  if (!REFRESH_DOWNLOADS && hasCompleteCache(cachedDownloads, packageNames)) {
    console.log(`Using cached npm download stats. Set NPM_DOWNLOADS_REFRESH=true to refresh from npm.`)
    console.log(`Completed in ${((performance.now() - startTime) / 1000).toFixed(2)}s`)
    return
  }

  if (!REFRESH_DOWNLOADS) {
    const missingPackages = packageNames.filter((name) => typeof cachedDownloads[name] !== 'number')
    console.warn(`Cache is missing ${missingPackages.length} package(s). Set NPM_DOWNLOADS_REFRESH=true to fetch them.`)
    if (missingPackages.length > 0) console.warn(`Missing: ${missingPackages.join(', ')}`)
    console.log(`Completed in ${((performance.now() - startTime) / 1000).toFixed(2)}s`)
    return
  }

  console.log(`Fetching npm download stats from npm. Will fail if not completed within 5 minutes.`)

  // Fetch packages with concurrency limit to avoid rate limiting
  const concurrency = Math.max(1, Number.isFinite(CONCURRENCY) ? CONCURRENCY : 20)
  const downloads: Record<string, number> = { ...cachedDownloads }

  for (let i = 0; i < packageNames.length; i += concurrency) {
    const batch = packageNames.slice(i, i + concurrency)
    console.log(`Fetching batch ${Math.floor(i / concurrency) + 1}/${Math.ceil(packageNames.length / concurrency)}...`)

    const batchResults = await Promise.all(
      batch.map(async (name) => {
        const count = await fetchDownloads(name, cachedDownloads[name])
        console.log(`  ${name}: ${count.toLocaleString()} downloads/quarter`)
        return { name, count }
      }),
    )

    for (const { name, count } of batchResults) {
      downloads[name] = count
    }

    // Small delay between batches
    if (i + concurrency < packageNames.length) {
      await sleep(200)
    }
  }

  // Write to JSON file
  await Bun.write(outputPath, `${JSON.stringify(downloads, null, 2)}\n`)

  const totalDownloads = Object.values(downloads).reduce((sum, count) => sum + count, 0)
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2)
  console.log(`\nSaved ${Object.keys(downloads).length} download counts to ${outputPath}`)
  console.log(`Total quarterly downloads: ${totalDownloads.toLocaleString()}`)
  console.log(`Completed in ${elapsed}s`)
}

main().catch(console.error)
