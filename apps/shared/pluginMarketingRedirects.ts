/** Marketing paths under `/plugins/:slug/` that 301 to Starlight docs (web worker + plugin directory). */
export const PLUGIN_MARKETING_REDIRECTS_TO_DOCS: Record<string, string> = {
  'capacitor-supabase': '/docs/plugins/supabase/',
  supabase: '/docs/plugins/supabase/',
  'capacitor-neon': '/docs/plugins/neon/',
  neon: '/docs/plugins/neon/',
  'capacitor-pretty-toast': '/docs/plugins/pretty-toast/',
  'pretty-toast': '/docs/plugins/pretty-toast/',
  'capacitor-sheets': '/docs/plugins/sheets/',
  sheets: '/docs/plugins/sheets/',
}

export function pluginMarketingRedirectsToDocs(slug: string): string | null {
  return PLUGIN_MARKETING_REDIRECTS_TO_DOCS[slug] ?? null
}