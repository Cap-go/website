import { buildUnifiedRssFeed } from '@/lib/unifiedRssFeed'
import type { APIRoute } from 'astro'

// Built at deploy time so GitHub release fetches run once per production build, not on every request.
export const prerender = true

export const GET: APIRoute = async () => {
  const xml = await buildUnifiedRssFeed()
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
