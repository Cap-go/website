import { getPluginDirectoryForEndpoint } from '@/lib/pluginDirectoryEndpoint'
import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = async () => {
  const directory = await getPluginDirectoryForEndpoint()

  return new Response(JSON.stringify(directory, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD',
      'Access-Control-Expose-Headers': 'Link, ETag',
      Link: `<${directory.urls.markdown}>; rel="alternate"; type="text/markdown"`,
    },
  })
}
