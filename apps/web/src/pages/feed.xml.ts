import { buildUnifiedRssFeed } from '@/lib/unifiedRssFeed'
import type { APIRoute } from 'astro'

// Built at deploy time from the nightly GitHub releases snapshot.
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
