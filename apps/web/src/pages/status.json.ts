import { webJson } from '@/services/responses'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  try {
    const response = await fetch('https://status.capgo.app/status.json')
    const data = await response.json()
    return webJson(data)
  } catch (error) {
    console.error('Error fetching status:', error)
    return webJson({ indicator: 'unknown', uptime: 'N/A' }, 500)
  }
}
