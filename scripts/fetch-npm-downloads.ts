#!/usr/bin/env bun

/**
 * Fetches npm download stats for all plugins in plugins.ts and saves to a JSON file.
 * Uses npm-trends proxy API which has better rate limiting than the official npm API.
 * Run with: bun run scripts/fetch-npm-downloads.ts
 */

import { actions } from '../src/config/plugins'

// Get date range for last 7 days
const getDateRange = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 7)
  const format = (d: Date) => d.toISOString().split('T')[0]
  return `${format(start)}:${format(end)}`
}

// Fetch weekly downloads for a single package with retry
const fetchDownloads = async (packageName: string, retries = 3): Promise<number | null> => {
  const dateRange = getDateRange()

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Use npm-trends proxy which has better rate limiting
      const apiUrl = `https://npm-trends-proxy.uidotdev.workers.dev/npm/downloads/range/${dateRange}/${encodeURIComponent(packageName)}`
      const response = await fetch(apiUrl)

      if (response.status === 429) {
        // Rate limited, wait longer and retry
        const waitTime = (attempt + 1) * 5000
        console.warn(`  Rate limited for ${packageName}, waiting ${waitTime}ms...`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
        continue
      }

      if (response.status === 404) {
        // Package doesn't exist on npm
        console.warn(`  ${packageName}: not found on npm`)
        return null
      }

      if (!response.ok) {
        console.warn(`  ${packageName}: HTTP ${response.status}`)
        return null
      }

      const data = await response.json()
      // Sum up all daily downloads
      if (data.downloads && Array.isArray(data.downloads)) {
        return data.downloads.reduce((sum: number, day: { downloads: number }) => sum + day.downloads, 0)
      }
      return null
    } catch (error) {
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        continue
      }
      return null
    }
  }
  return null
}

async function main() {
  console.log('Fetching npm download stats for all plugins...')

  const packageNames = [...new Set(actions.map((p) => p.name).filter(Boolean))] as string[]

  console.log(`Found ${packageNames.length} unique npm packages`)
  console.log('Fetching all packages in parallel...')

  const outputPath = new URL('../src/data/npm-downloads.json', import.meta.url).pathname

  // Fetch all packages in parallel
  const results = await Promise.all(
    packageNames.map(async (name) => {
      const count = await fetchDownloads(name)
      if (count !== null) {
        console.log(`  ${name}: ${count} downloads/week`)
      } else {
        console.warn(`  ${name}: failed to fetch`)
      }
      return { name, count }
    })
  )

  const downloads: Record<string, number> = {}
  for (const { name, count } of results) {
    if (count !== null) {
      downloads[name] = count
    }
  }

  // Write to JSON file
  await Bun.write(outputPath, JSON.stringify(downloads, null, 2))

  const totalDownloads = Object.values(downloads).reduce((sum, count) => sum + count, 0)
  console.log(`\nSaved ${Object.keys(downloads).length} download counts to ${outputPath}`)
  console.log(`Total weekly downloads: ${totalDownloads.toLocaleString()}`)
}

main().catch(console.error)
