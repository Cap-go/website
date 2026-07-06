#!/usr/bin/env bun

/**
 * Fetches Capgo global stats from the production API and saves to a JSON file.
 * GitHub stars for capacitor-updater are merged from github-stars.json when available.
 * Run with: bun run fetch:website-stats
 * Refresh with: WEBSITE_STATS_REFRESH=true bun run fetch:website-stats
 */

import { getGitHubStars } from '../apps/web/src/services/github'
import keys from '../configs.json'

const REFRESH_STATS = process.env.WEBSITE_STATS_REFRESH === 'true'
const OUTPUT_PATH = new URL('../apps/web/src/data/website-stats.json', import.meta.url).pathname
const CAPACITOR_UPDATER_URL = 'https://github.com/Cap-go/capacitor-updater/'
const DEFAULT_API_URL = `https://api.${keys.base_domain.prod}`

export type WebsiteStatsData = {
  apps: number
  updates: number
  stars: number
  fetchedAt: string
  source: 'api' | 'cache'
}

const readCachedStats = async (): Promise<WebsiteStatsData | null> => {
  try {
    const file = Bun.file(OUTPUT_PATH)
    if (!(await file.exists())) return null
    return (await file.json()) as WebsiteStatsData
  } catch (error) {
    console.warn('Could not read website stats cache:', error)
    return null
  }
}

const resolveStars = (apiStars?: number) => {
  const repoStars = getGitHubStars(CAPACITOR_UPDATER_URL)
  return Math.max(apiStars ?? 0, repoStars ?? 0)
}

const fetchLiveStats = async (baseApiUrl: string): Promise<WebsiteStatsData | null> => {
  const response = await fetch(`${baseApiUrl.replace(/\/$/, '')}/private/website_stats`)
  if (!response.ok) {
    console.warn(`Failed to fetch website stats: HTTP ${response.status}`)
    return null
  }

  const data = (await response.json()) as Partial<WebsiteStatsData>
  if (typeof data.apps !== 'number' || typeof data.updates !== 'number') {
    console.warn('Website stats response is missing required fields')
    return null
  }

  return {
    apps: data.apps,
    updates: data.updates,
    stars: resolveStars(data.stars),
    fetchedAt: new Date().toISOString(),
    source: 'api',
  }
}

async function main() {
  const baseApiUrl = (process.env.PUBLIC_BASE_API_URL || DEFAULT_API_URL).trim().replace(/\/$/, '')
  const cached = await readCachedStats()

  if (!REFRESH_STATS) {
    if (cached) {
      console.log(`Using cached website stats from ${cached.fetchedAt}. Set WEBSITE_STATS_REFRESH=true to refresh from ${baseApiUrl}.`)
      return
    }

    console.warn('Website stats cache is missing. Set WEBSITE_STATS_REFRESH=true to fetch from the API.')
    return
  }

  console.log(`Fetching website stats from ${baseApiUrl}...`)
  const live = await fetchLiveStats(baseApiUrl)

  if (!live) {
    if (cached) {
      console.warn('Live fetch failed. Keeping existing website-stats.json cache.')
      return
    }

    throw new Error('Could not fetch website stats and no cache exists.')
  }

  await Bun.write(OUTPUT_PATH, `${JSON.stringify(live, null, 2)}\n`)

  console.log(`Saved website stats to ${OUTPUT_PATH}`)
  console.log(`  apps: ${live.apps.toLocaleString()}`)
  console.log(`  updates: ${live.updates.toLocaleString()}`)
  console.log(`  stars: ${live.stars.toLocaleString()}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
