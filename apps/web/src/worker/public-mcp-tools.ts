import { z } from 'zod'
import { actions, pluginCategories, pluginCount } from '../config/plugins'
import { toolCatalog } from '../lib/tools/catalog'

const searchInput = z
  .object({
    query: z.string().trim().min(1).max(200),
    limit: z.number().int().min(1).max(20).default(8),
  })
  .strict()
const pluginsInput = z
  .object({
    query: z.string().trim().max(200).default(''),
    category: z.enum(pluginCategories.map((category) => category.id)).optional(),
    offset: z.number().int().min(0).max(10000).default(0),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .strict()
const freeToolsInput = z.object({}).strict()

export const publicTools = [
  {
    name: 'capgo_search_docs',
    title: 'Search Capgo docs',
    description: 'Search English Capgo documentation. Returns page titles, URLs, and snippets. No account needed.',
    inputSchema: searchInput,
  },
  {
    name: 'capgo_list_plugins',
    title: 'Find Capgo plugins',
    description: 'Search the current Capgo plugin registry by name, description, or category. Paginate with offset and limit. No account needed.',
    inputSchema: pluginsInput,
  },
  {
    name: 'capgo_list_free_tools',
    title: 'Find free signing tools',
    description: 'List free Capgo browser tools with usage guidance. Discovery only: does not generate keys, certificates, or device profiles.',
    inputSchema: freeToolsInput,
  },
]

const commands = z.discriminatedUnion('name', [
  z.object({ name: z.literal('capgo_search_docs'), arguments: searchInput }),
  z.object({ name: z.literal('capgo_list_plugins'), arguments: pluginsInput }),
  z.object({ name: z.literal('capgo_list_free_tools'), arguments: freeToolsInput }),
])

const docsResponse = z.object({
  hits: z.array(
    z.object({
      url: z.string(),
      content: z.string().nullish(),
      hierarchy: z.record(z.string(), z.string().nullable()).optional(),
    }),
  ),
})

const guidance = {
  'ios-certificate-generator':
    'Open the browser tool to create a CSR, then follow the Apple Developer certificate and P12 steps. Keep signing material local; never send private keys or passwords to an agent.',
  'android-keystore-generator': 'Open the browser tool to generate a release keystore and fingerprints. Keep the keystore and password on your device.',
  'ios-udid-finder': 'Open the tool in Safari on the target iPhone or iPad. Review the configuration profile before installing it to collect the device identifier.',
}

function plainText(value: string): string {
  const entities: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }
  return value.replaceAll(/&(?:amp|lt|gt|quot|#39);/g, (entity) => entities[entity] ?? entity)
}

async function searchDocs(query: string, limit: number, requestUrl: string, fetchImpl: typeof fetch, cache?: Cache) {
  const key = new Request(new URL(`/mcp/public/cache/docs?${new URLSearchParams({ query, limit: String(limit) })}`, requestUrl))
  const cached = await cache?.match(key)
  if (cached) return cached.json()

  // This is the same public search-only key used by the documentation search box.
  const response = await fetchImpl('https://R0TIQUJRSN-dsn.algolia.net/1/indexes/capgo/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Algolia-Application-Id': 'R0TIQUJRSN', 'X-Algolia-API-Key': '039b8d50eaa068b9ff8726d912c6f388' },
    body: JSON.stringify({ query, hitsPerPage: limit * 3, facetFilters: ['lang:en'], attributesToRetrieve: ['url', 'hierarchy', 'content'], attributesToHighlight: [] }),
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) throw new Error('Documentation search unavailable')
  const data = docsResponse.parse(await response.json())
  const seen = new Set<string>()
  const results = []
  for (const hit of data.hits) {
    const url = URL.parse(hit.url)
    if (url?.origin !== 'https://capgo.app' || !url.pathname.startsWith('/docs/') || seen.has(url.href)) continue
    seen.add(url.href)
    const title = Object.entries(hit.hierarchy ?? {})
      .filter(([level, text]) => level !== 'lvl0' && text)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, text]) => text)
      .join(' > ')
    results.push({
      title: plainText(title || hit.url),
      url: url.href,
      snippet: plainText(hit.content ?? '')
        .replaceAll(/\s+/g, ' ')
        .slice(0, 300),
    })
    if (results.length >= limit) break
  }
  const payload = { results }
  await cache?.put(key, new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } }))
  return payload
}

function textResult(value: unknown, isError = false) {
  return { content: [{ type: 'text', text: JSON.stringify(value) }], ...(isError ? { isError: true } : {}) }
}

type AssetFetcher = { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> }

const pluginDirectoryEntry = z.object({ urls: z.object({ github: z.string(), capgo: z.string().optional(), docs: z.string().optional() }) })
const pluginDirectory = z.object({ plugins: z.array(pluginDirectoryEntry) })

/**
 * capgo.app/plugins/<slug>/ only exists for plugins with a tutorial or demo, which the build records in the
 * prerendered /plugins.json. Read it from the static assets so the tool never links to a missing page.
 */
async function loadPluginPages(requestUrl: string, assets?: AssetFetcher): Promise<Map<string, { capgo?: string; docs?: string }>> {
  if (!assets) return new Map()
  try {
    const response = await assets.fetch(new Request(new URL('/plugins.json', requestUrl)))
    if (!response.ok) return new Map()
    const { plugins } = pluginDirectory.parse(await response.json())
    return new Map(plugins.map(({ urls }) => [urls.github, { capgo: urls.capgo, docs: urls.docs }]))
  } catch {
    return new Map()
  }
}

export async function callPublicTool(params: unknown, requestUrl: string, fetchImpl: typeof fetch, cache?: Cache, assets?: AssetFetcher) {
  const command = commands.safeParse(params)
  if (!command.success) return textResult({ error: 'Unknown public tool or invalid arguments', details: z.prettifyError(command.error) }, true)
  switch (command.data.name) {
    case 'capgo_search_docs': {
      try {
        return textResult(await searchDocs(command.data.arguments.query, command.data.arguments.limit, requestUrl, fetchImpl, cache))
      } catch {
        return textResult({ error: 'docs_search_unavailable', message: 'Try again later or browse https://capgo.app/docs/.' }, true)
      }
    }
    case 'capgo_list_plugins': {
      const { query, category, offset, limit } = command.data.arguments
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
      const pages = await loadPluginPages(requestUrl, assets)
      const matches = actions.filter(
        (plugin) => (!category || plugin.category === category) && terms.every((term) => `${plugin.name} ${plugin.title} ${plugin.description}`.toLowerCase().includes(term)),
      )
      return textResult({
        registryCount: pluginCount,
        total: matches.length,
        offset,
        nextOffset: offset + limit < matches.length ? offset + limit : null,
        categories: pluginCategories,
        plugins: matches.slice(offset, offset + limit).map(({ name, title, description, category, href }) => ({
          package: name,
          title,
          description,
          category,
          repository: href,
          url: pages.get(href)?.capgo,
          docs: pages.get(href)?.docs,
        })),
      })
    }
    case 'capgo_list_free_tools':
      return textResult({
        tools: toolCatalog.map((tool) => ({ name: tool.name, description: tool.summary, url: `https://capgo.app/${tool.href}/`, instructions: guidance[tool.slug] })),
      })
  }
}
