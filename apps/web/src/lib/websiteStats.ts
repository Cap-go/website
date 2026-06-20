import websiteStatsData from '@/data/website-stats.json'
import { getGitHubStars } from '@/services/github'
import { shortNumber } from '@/services/misc'

const CAPACITOR_UPDATER_URL = 'https://github.com/Cap-go/capacitor-updater/'

export type WebsiteStatsRaw = {
  apps: number
  updates: number
  stars: number
  fetchedAt?: string
  source?: 'api' | 'cache'
}

export type WebsiteStatsDisplay = {
  apps: string
  stars: string
  updates: string
}

const FALLBACK_STATS: WebsiteStatsRaw = {
  apps: 1688,
  updates: 1862788600,
  stars: 769,
}

const cachedStats = websiteStatsData as WebsiteStatsRaw

const resolveGitHubStars = (apiStars?: number) => {
  const repoStars = getGitHubStars(CAPACITOR_UPDATER_URL)
  return Math.max(apiStars ?? 0, repoStars ?? 0, FALLBACK_STATS.stars)
}

export const formatWebsiteStats = (raw: WebsiteStatsRaw): WebsiteStatsDisplay => ({
  apps: shortNumber(raw.apps),
  stars: shortNumber(resolveGitHubStars(raw.stars)),
  updates: shortNumber(raw.updates),
})

export async function fetchWebsiteStats(baseApiUrl: string): Promise<WebsiteStatsRaw | null> {
  try {
    const response = await fetch(`${baseApiUrl.replace(/\/$/, '')}/private/website_stats`)
    if (!response.ok) return null

    const data = (await response.json()) as Partial<WebsiteStatsRaw>
    if (typeof data.apps !== 'number' || typeof data.updates !== 'number') return null

    return {
      apps: data.apps,
      updates: data.updates,
      stars: resolveGitHubStars(data.stars),
      fetchedAt: new Date().toISOString(),
      source: 'api',
    }
  } catch {
    return null
  }
}

export function getCachedWebsiteStats(): WebsiteStatsRaw {
  return {
    ...FALLBACK_STATS,
    ...cachedStats,
    stars: resolveGitHubStars(cachedStats.stars),
  }
}

export async function resolveWebsiteStats(baseApiUrl: string): Promise<WebsiteStatsRaw> {
  const live = await fetchWebsiteStats(baseApiUrl)
  return live ?? getCachedWebsiteStats()
}

export async function loadWebsiteStats(baseApiUrl: string): Promise<WebsiteStatsDisplay> {
  return formatWebsiteStats(await resolveWebsiteStats(baseApiUrl))
}
