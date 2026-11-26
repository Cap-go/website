/** Marketing paths under `/plugins/:slug/` that 301 to Starlight docs (web worker + plugin directory). */
const PLUGIN_DOCS_PATHS = {
  supabase: '/docs/plugins/supabase/',
  neon: '/docs/plugins/neon/',
  'pretty-toast': '/docs/plugins/pretty-toast/',
  sheets: '/docs/plugins/sheets/',
} as const

export const PLUGIN_MARKETING_REDIRECTS_TO_DOCS: Record<string, string> = Object.fromEntries(
  Object.entries(PLUGIN_DOCS_PATHS).flatMap(([slug, path]) => [
    [`capacitor-${slug}`, path],
    [slug, path],
  ]),
)

export function pluginMarketingRedirectsToDocs(slug: string): string | null {
  return Object.hasOwn(PLUGIN_MARKETING_REDIRECTS_TO_DOCS, slug) ? PLUGIN_MARKETING_REDIRECTS_TO_DOCS[slug] : null
}