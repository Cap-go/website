import { actions, pluginCount, type Plugin } from '@/config/plugins'
import { getPluginsWithStars, getSlug } from '@/services/github'
import { defaultLocale } from '@/services/locale'
import { getPluginDocsSlugs, resolvePluginDocsSlug } from '@/services/pluginDocs'

export interface PluginDirectoryEntry {
  rank: number
  packageName?: string
  title: string
  slug: string
  description: string
  author: string
  repositoryName: string
  docsSlug?: string
  urls: {
    github: string
    npm?: string
    capgo?: string
    docs?: string
  }
  metrics: {
    githubStars?: number
    npmWeeklyDownloads?: number
  }
  searchText: string
}

export interface PluginDirectory {
  schemaVersion: 1
  name: string
  description: string
  count: number
  urls: {
    markdown: string
    json: string
    directory: string
  }
  plugins: PluginDirectoryEntry[]
}

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/+$/, '')

const absoluteUrl = (baseUrl: string, path: string) => new URL(path, `${normalizeBaseUrl(baseUrl)}/`).toString()

const getRepositoryName = (href: string) => {
  const normalizedHref = href.replace(/\/$/, '')
  const repoHref = normalizedHref.includes('/tree/') ? normalizedHref.slice(0, normalizedHref.indexOf('/tree/')) : normalizedHref

  return repoHref.slice(repoHref.lastIndexOf('/') + 1)
}

const getNpmUrl = (packageName?: string) => (packageName ? `https://www.npmjs.com/package/${packageName}` : undefined)

const compact = <T>(items: (T | undefined)[]): T[] => items.filter((item): item is T => item !== undefined)

export const buildPluginDirectory = async (baseUrl: string, pluginPageSlugs: ReadonlySet<string> = new Set()): Promise<PluginDirectory> => {
  const { docsSlugs } = await getPluginDocsSlugs(defaultLocale)
  const plugins = getPluginsWithStars(actions).map((plugin: Plugin, index): PluginDirectoryEntry => {
    const slug = getSlug(plugin.href)
    const docsSlug = resolvePluginDocsSlug(plugin, docsSlugs)
    const repositoryName = getRepositoryName(plugin.href)
    const capgoUrl = pluginPageSlugs.has(slug) ? absoluteUrl(baseUrl, `/plugins/${slug}/`) : undefined
    const docsUrl = docsSlug ? absoluteUrl(baseUrl, `/docs/plugins/${docsSlug}/`) : undefined
    const npmUrl = getNpmUrl(plugin.name)
    const searchParts = compact([plugin.title, plugin.name, slug, repositoryName, docsSlug, plugin.description])

    return {
      rank: index + 1,
      packageName: plugin.name,
      title: plugin.title,
      slug,
      description: plugin.description,
      author: plugin.author,
      repositoryName,
      docsSlug,
      urls: {
        github: plugin.href,
        npm: npmUrl,
        capgo: capgoUrl,
        docs: docsUrl,
      },
      metrics: {
        githubStars: plugin.githubStars,
        npmWeeklyDownloads: plugin.npmDownloads,
      },
      searchText: searchParts.join(' | '),
    }
  })

  return {
    schemaVersion: 1,
    name: 'Capgo Capacitor Plugin Index',
    description: 'Searchable registry of Capgo and Capacitor plugins for AI agents, skills, and developer tools.',
    count: pluginCount,
    urls: {
      markdown: absoluteUrl(baseUrl, '/plugins.md'),
      json: absoluteUrl(baseUrl, '/plugins.json'),
      directory: absoluteUrl(baseUrl, '/plugins/'),
    },
    plugins,
  }
}

const formatMetric = (value?: number) => (value === undefined ? 'unknown' : value.toString())

const renderPluginMarkdown = (plugin: PluginDirectoryEntry) => {
  const lines = [
    `## ${plugin.title}`,
    '',
    `- Package: ${plugin.packageName ? `\`${plugin.packageName}\`` : 'unknown'}`,
    `- Slug: \`${plugin.slug}\``,
    `- Summary: ${plugin.description}`,
    `- GitHub: ${plugin.urls.github}`,
  ]

  if (plugin.urls.npm) lines.push(`- NPM: ${plugin.urls.npm}`)
  if (plugin.urls.capgo) lines.push(`- Capgo page: ${plugin.urls.capgo}`)
  if (plugin.urls.docs) lines.push(`- Docs: ${plugin.urls.docs}`)

  lines.push(`- Weekly npm downloads: ${formatMetric(plugin.metrics.npmWeeklyDownloads)}`)
  lines.push(`- GitHub stars: ${formatMetric(plugin.metrics.githubStars)}`)
  lines.push(`- Search text: ${plugin.searchText}`)
  lines.push('')

  return lines.join('\n')
}

export const renderPluginDirectoryMarkdown = (directory: PluginDirectory) =>
  [
    '# Capgo Capacitor Plugin Index',
    '',
    directory.description,
    '',
    `Total plugins: ${directory.count}`,
    '',
    `JSON API: ${directory.urls.json}`,
    `Human directory: ${directory.urls.directory}`,
    '',
    'Use this file to search Capgo plugins by package name, title, slug, repository, docs slug, and summary.',
    '',
    ...directory.plugins.map(renderPluginMarkdown),
    '',
  ].join('\n')
