import { AUTH_MD_MARKDOWN } from '../../../shared/agentDiscovery'
import type { APIRoute } from 'astro'

export const prerender = true

export const GET: APIRoute = () =>
  new Response(AUTH_MD_MARKDOWN, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD',
    },
  })
