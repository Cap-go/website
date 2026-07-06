import { useRuntimeConfig } from '@/config/app'
import { pluginDemosBySlug } from '@/config/pluginDemos'
import { buildPluginDirectory } from '@/lib/pluginDirectory'
import { getSlug } from '@/services/github'
import { defaultLocale } from '@/services/locale'
import { getCollection } from 'astro:content'

const getPluginPageSlugs = async () => {
  const pluginPageSlugs = new Set<string>()
  const tutorialEntries = await getCollection('plugin', ({ data, filePath }) => data.published !== false && Boolean(filePath) && (data.locale ?? defaultLocale) === defaultLocale)

  for (const entry of tutorialEntries) {
    if (entry.filePath) pluginPageSlugs.add(getSlug(entry.filePath).replace(/\.md$/, ''))
  }

  for (const slug of Object.keys(pluginDemosBySlug)) {
    pluginPageSlugs.add(slug)
  }

  return pluginPageSlugs
}

export const getPluginDirectoryForEndpoint = async () => {
  const config = useRuntimeConfig()
  const pluginPageSlugs = await getPluginPageSlugs()

  return buildPluginDirectory(config.public.baseUrl, pluginPageSlugs)
}
