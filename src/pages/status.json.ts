import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  try {
    const response = await fetch('https://status.capgo.app/status.json')
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching status:', error)
    return new Response(JSON.stringify({ indicator: 'unknown', uptime: 'N/A' }), { status: 500 })
  }
}
