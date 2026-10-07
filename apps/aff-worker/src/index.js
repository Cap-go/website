// Affonso affiliate proxy for aff.capgo.app.
// The pixel is loaded from https://aff.capgo.app/r/pixel.js and posts clicks
// to /r/track, so that path must be proxied to the Affonso track API.

const ROUTES = {
  '/js/pixel.min.js': 'https://cdn.affonso.io/js/pixel.min.js',
  '/js/psl.min.js': 'https://cdn.affonso.io/js/psl.min.js',
  '/v1/track': 'https://api.affonso.io/v1/track',
  '/js/signups': 'https://api.affonso.io/v1/signups',
  '/r/pixel.js': 'https://cdn.affonso.io/js/pixel.min.js',
  '/r/psl.min.js': 'https://cdn.affonso.io/js/psl.min.js',
  '/r/track': 'https://api.affonso.io/v1/track',
  '/r/v1/track': 'https://api.affonso.io/v1/track',
  '/r/signups': 'https://api.affonso.io/v1/signups',
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const target = ROUTES[url.pathname]

    // Unknown paths used to fall through to fetch(request), which loops back
    // to this zone and ends in a silent 522. Return a clear 404 instead.
    if (!target) {
      return new Response('Not Found', { status: 404 })
    }

    const headers = new Headers(request.headers)
    const ip = request.headers.get('CF-Connecting-IP')
    if (ip) {
      // Forward the real visitor IP so Affonso fraud checks see it.
      headers.set('X-Forwarded-For', ip)
      headers.set('X-Real-IP', ip)
    }

    const targetUrl = new URL(target)
    targetUrl.search = url.search

    return fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'follow',
    })
  },
}
