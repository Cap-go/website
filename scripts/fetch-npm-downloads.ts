#!/usr/bin/env bun

/**
 * Fetches npm download stats for all plugins in plugins.ts and saves to a JSON file.
 * Uses sequential fetching with delays to avoid rate limiting.
 * Run with: bun run scripts/fetch-npm-downloads.ts
 */

import { actions } from '../src/config/plugins'

// Delay between requests (500ms is safe for npm API)
const REQUEST_DELAY = 500

// Fetch weekly downloads for a single package with retry
const fetchDownloads = async (packageName: string, retries = 3): Promise<number | null> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const apiUrl = `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(packageName)}`
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
      return data.downloads ?? null
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

  const outputPath = new URL('../src/data/npm-downloads.json', import.meta.url).pathname
  const downloads: Record<string, number> = {}

  // Fetch sequentially to avoid rate limiting (npm API is strict)
  for (let i = 0; i < packageNames.length; i++) {
    const name = packageNames[i]
    console.log(`[${i + 1}/${packageNames.length}] Fetching ${name}...`)

    const count = await fetchDownloads(name)

    if (count !== null) {
      downloads[name] = count
      console.log(`  ${name}: ${count} downloads/week`)
    } else {
      console.warn(`  ${name}: failed to fetch`)
    }

    // Delay between requests to avoid rate limiting
    if (i < packageNames.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY))
    }
  }

  // Write to JSON file
  await Bun.write(outputPath, JSON.stringify(downloads, null, 2))

  const totalDownloads = Object.values(downloads).reduce((sum, count) => sum + count, 0)
  console.log(`\nSaved ${Object.keys(downloads).length} download counts to ${outputPath}`)
  console.log(`Total weekly downloads: ${totalDownloads.toLocaleString()}`)
}

main().catch(console.error)
