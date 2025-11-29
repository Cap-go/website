#!/usr/bin/env bun

/**
 * Fetches npm download stats for all plugins in plugins.ts and saves to a JSON file.
 * Note: Scoped packages don't support bulk API, so we fetch all in parallel.
 * Run with: bun run scripts/fetch-npm-downloads.ts
 */

import { actions } from '../src/config/plugins'

// Fetch weekly downloads for a single package
const fetchDownloads = async (packageName: string): Promise<number | null> => {
  try {
    const apiUrl = `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(packageName)}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.downloads ?? null
  } catch {
    return null
  }
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
      return { name, count }
    })
  )

  const downloads: Record<string, number> = {}
  for (const { name, count } of results) {
    if (count !== null) {
      downloads[name] = count
      console.log(`  ${name}: ${count} downloads/week`)
    }
  }

  // Write to JSON file
  await Bun.write(outputPath, JSON.stringify(downloads, null, 2))

  const totalDownloads = Object.values(downloads).reduce((sum, count) => sum + count, 0)
  console.log(`\nSaved ${Object.keys(downloads).length} download counts to ${outputPath}`)
  console.log(`Total weekly downloads: ${totalDownloads.toLocaleString()}`)
}

main().catch(console.error)
