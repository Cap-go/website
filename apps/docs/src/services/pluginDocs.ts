import type { Action } from '@/config/plugins'
import { defaultLocale, locales, type Locales } from '@/services/locale'
import { globSync } from 'glob'
import { fileURLToPath } from 'node:url'

type PluginReference = Pick<Action, 'href' | 'name'>
type PluginDocsSlugs = {
  defaultDocsSlugs: Set<string>
  localizedDocsSlugs: Set<string>
  docsSlugs: Set<string>
}

const DOCS_CONTENT_ROOT = fileURLToPath(new URL('../content/docs/', import.meta.url))

const getPluginDocEntry = (filePath?: string): { locale: Locales; slug: string } | null => {
  if (!filePath) return null

  const segments = filePath.replaceAll('\\', '/').split('/').filter(Boolean)
  if (segments.length < 3) return null

  let locale: Locales = defaultLocale as Locales
  let pluginsIndex = 0

  if (segments[0] === 'docs') {
    pluginsIndex = 1
  } else if (locales.includes(segments[0] as Locales)) {
    locale = segments[0] as Locales
    pluginsIndex = segments[1] === 'docs' ? 2 : 1
  } else {
    return null
  }

  if (segments[pluginsIndex] !== 'plugins') return null

  const slug = segments[pluginsIndex + 1]
  const fileName = segments.at(-1)

  if (!slug || !fileName?.startsWith('index.')) return null

  return { locale, slug }
}

const pluginDocsIndexPromise: Promise<Map<Locales, Set<string>>> = Promise.resolve(
  globSync('**/plugins/*/index.{md,mdx}', { cwd: DOCS_CONTENT_ROOT, nodir: true }).reduce((docsByLocale, filePath) => {
    const docEntry = getPluginDocEntry(filePath)
    if (!docEntry) return docsByLocale

    const localeDocs = docsByLocale.get(docEntry.locale) ?? new Set<string>()
    localeDocs.add(docEntry.slug)
    docsByLocale.set(docEntry.locale, localeDocs)

    return docsByLocale
  }, new Map<Locales, Set<string>>()),
)

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

export const getPluginDocsSlugs = async (locale?: string): Promise<PluginDocsSlugs> => {
  const docsByLocale = await pluginDocsIndexPromise
  const normalizedLocale = locales.includes(locale as Locales) ? (locale as Locales) : (defaultLocale as Locales)
  const defaultDocsSlugs = docsByLocale.get(defaultLocale as Locales) ?? new Set<string>()
  const localizedDocsSlugs = normalizedLocale === defaultLocale ? defaultDocsSlugs : (docsByLocale.get(normalizedLocale) ?? new Set<string>())

  return {
    defaultDocsSlugs,
    localizedDocsSlugs,
    docsSlugs: normalizedLocale === defaultLocale ? new Set(defaultDocsSlugs) : new Set([...defaultDocsSlugs, ...localizedDocsSlugs]),
  }
}
