export const WELL_KNOWN_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

/** Answers OPTIONS and rejects anything but GET/HEAD; returns null when the request should be served. */
export function wellKnownMethodGuard(request: Request): Response | null {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: WELL_KNOWN_CORS_HEADERS })
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Allow: 'GET, HEAD, OPTIONS', ...WELL_KNOWN_CORS_HEADERS },
    })
  }
  return null
}
