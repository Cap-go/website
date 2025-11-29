import type { Action, Plugin } from '@/config/plugins'
import githubStarsData from '@/data/github-stars.json'
import npmDownloadsData from '@/data/npm-downloads.json'

const removeTrailingSlash = (item: string) => item.replace(/\/$/, '')

export const getSlug = (item: string) =>
  removeTrailingSlash(item)
    .substring(removeTrailingSlash(item).lastIndexOf('/') + 1)
    .toLowerCase()

// Get stars from pre-fetched JSON data
const starsMap = githubStarsData as Record<string, number>
const downloadsMap = npmDownloadsData as Record<string, number>

export const getGitHubStars = (url: string): number | undefined => {
  return starsMap[url]
}

export const getNpmDownloads = (packageName: string): number | undefined => {
  return downloadsMap[packageName]
}

// Get total stars across all plugins
export const getTotalStars = (): number => {
  return Object.values(starsMap).reduce((sum, stars) => sum + stars, 0)
}

// Get total weekly downloads across all plugins
export const getTotalDownloads = (): number => {
  return Object.values(downloadsMap).reduce((sum, downloads) => sum + downloads, 0)
}

// Enrich plugins with GitHub stars and npm downloads from pre-fetched data
export const getPluginsWithStars = (plugins: Action[]): Plugin[] => {
  return plugins.map((plugin) => ({
    ...plugin,
    githubStars: starsMap[plugin.href],
    npmDownloads: plugin.name ? downloadsMap[plugin.name] : undefined,
  }))
}
