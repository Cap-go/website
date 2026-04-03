import type { Action } from '@/config/plugins'

type PluginReference = Pick<Action, 'href' | 'name'>

const getPackageSegment = (name?: string): string => {
  if (!name) return ''
  const slashIndex = name.indexOf('/')
  return slashIndex >= 0 ? name.slice(slashIndex + 1) : name
}

const addCandidate = (items: string[], value?: string) => {
  if (value && !items.includes(value)) items.push(value)
}

const addNormalizedCandidates = (items: string[], value: string) => {
  addCandidate(items, value)

  if (value.startsWith('capacitor-')) {
    const withoutPrefix = value.slice('capacitor-'.length)
    addCandidate(items, withoutPrefix)

    if (withoutPrefix.startsWith('android-')) {
      addCandidate(items, withoutPrefix.slice('android-'.length))
    }
  }

  if (value.endsWith('-plugin')) {
    addCandidate(items, value.slice(0, -'-plugin'.length))
  }

  if (value.startsWith('capacitor-') && value.endsWith('-plugin')) {
    addCandidate(items, value.slice('capacitor-'.length, -'-plugin'.length))
  }
}

export const getPluginDocsSlugCandidates = (plugin: PluginReference): string[] => {
  const candidates: string[] = []
  const packageSegment = getPackageSegment(plugin.name)

  if (packageSegment.startsWith('capacitor-plus')) {
    addCandidate(candidates, 'capacitor-plus')
  }

  if (packageSegment) {
    addNormalizedCandidates(candidates, packageSegment)
  }

  const normalizedHref = plugin.href.replace(/\/$/, '')
  const repoHref = normalizedHref.includes('/tree/') ? normalizedHref.slice(0, normalizedHref.indexOf('/tree/')) : normalizedHref
  const repoName = repoHref.slice(repoHref.lastIndexOf('/') + 1)

  if (repoName) {
    addNormalizedCandidates(candidates, repoName)
  }

  return candidates
}

export const resolvePluginDocsSlug = (plugin: PluginReference, docsSlugs: Iterable<string>): string | undefined => {
  const availableSlugs = docsSlugs instanceof Set ? docsSlugs : new Set(docsSlugs)
  return getPluginDocsSlugCandidates(plugin).find((slug) => availableSlugs.has(slug))
}
