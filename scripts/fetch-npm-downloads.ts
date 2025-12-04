#!/usr/bin/env bun

/**
 * Fetches npm download stats for all plugins in plugins.ts and saves to a JSON file.
 * Uses official npm API with parallel requests.
 * Run with: bun run scripts/fetch-npm-downloads.ts
 */

import { actions } from '../src/config/plugins'

const MAX_RUNTIME_MS = 5 * 60 * 1000 // 5 minutes
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

// Fetch downloads for a single package - retries until timeout
const fetchDownloads = async (packageName: string): Promise<number> => {
  const dateRange = getDateRange()
  let attempt = 0

  while (true) {
    checkTimeout()
    attempt++
    try {
      const apiUrl = `https://api.npmjs.org/downloads/point/${dateRange}/${packageName}`
      const response = await fetch(apiUrl)

      if (response.status === 429) {
        const waitTime = Math.min(attempt * 5000, 60000)
        console.warn(`  Rate limited for ${packageName}, attempt ${attempt}, waiting ${waitTime / 1000}s...`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
        continue
      }

      if (response.status === 404) {
        console.warn(`  ${packageName}: not found on npm (returning 0)`)
        return 0
      }

      if (!response.ok) {
        const waitTime = Math.min(attempt * 2000, 30000)
        console.warn(`  ${packageName}: HTTP ${response.status}, attempt ${attempt}, retrying in ${waitTime / 1000}s...`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
        continue
      }

      const data = await response.json()
      return data.downloads ?? 0
    } catch (error) {
      if (error instanceof Error && error.message.includes('Timeout')) {
        throw error
      }
      const waitTime = Math.min(attempt * 2000, 30000)
      console.warn(`  ${packageName}: error, attempt ${attempt}, retrying in ${waitTime / 1000}s...`)
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }
  }
}

async function main() {
  startTime = performance.now()
  console.log('Fetching npm download stats for all plugins...')
  console.log(`Will fail if not completed within 5 minutes.`)

  const packageNames = [...new Set(actions.map((p) => p.name).filter(Boolean))] as string[]

  console.log(`Found ${packageNames.length} unique npm packages`)

  const outputPath = new URL('../src/data/npm-downloads.json', import.meta.url).pathname

  // Fetch packages with concurrency limit to avoid rate limiting
  const concurrency = 10
  const downloads: Record<string, number> = {}

  for (let i = 0; i < packageNames.length; i += concurrency) {
    const batch = packageNames.slice(i, i + concurrency)
    console.log(`Fetching batch ${Math.floor(i / concurrency) + 1}/${Math.ceil(packageNames.length / concurrency)}...`)

    const batchResults = await Promise.all(
      batch.map(async (name) => {
        const count = await fetchDownloads(name)
        console.log(`  ${name}: ${count.toLocaleString()} downloads/quarter`)
        return { name, count }
      })
    )

    for (const { name, count } of batchResults) {
      downloads[name] = count
    }

    // Small delay between batches
    if (i + concurrency < packageNames.length) {
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }

  // Write to JSON file
  await Bun.write(outputPath, JSON.stringify(downloads, null, 2))

  const totalDownloads = Object.values(downloads).reduce((sum, count) => sum + count, 0)
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2)
  console.log(`\nSaved ${Object.keys(downloads).length} download counts to ${outputPath}`)
  console.log(`Total quarterly downloads: ${totalDownloads.toLocaleString()}`)
  console.log(`Completed in ${elapsed}s`)
}

main().catch(console.error)
