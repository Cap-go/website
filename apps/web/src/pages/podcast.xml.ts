import { createPodcastRssOptions, getPodcastFeedUrl } from '@/lib/podcast'
import { getRssString } from '@astrojs/rss'
import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = async (context) => {
  const siteUrl = context.site?.toString() || context.url.origin
  const feedUrl = getPodcastFeedUrl(siteUrl)
  const body = await getRssString(createPodcastRssOptions(siteUrl))

  return new Response(body, {
    headers: {
      'Access-Control-Allow-Methods': 'GET, HEAD',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/rss+xml; charset=utf-8',
      Link: '<' + feedUrl + '>; rel="self"; type="application/rss+xml"',
    },
  })
}
