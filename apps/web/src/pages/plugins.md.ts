import { getPluginDirectoryForEndpoint } from '@/lib/pluginDirectoryEndpoint'
import { renderPluginDirectoryMarkdown } from '@/lib/pluginDirectory'
import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = async () => {
  const directory = await getPluginDirectoryForEndpoint()

  return new Response(renderPluginDirectoryMarkdown(directory), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD',
      Link: `<${directory.urls.json}>; rel="alternate"; type="application/json"`,
    },
  })
}
