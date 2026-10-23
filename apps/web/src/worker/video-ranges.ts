// The static asset binding returns full files for Range requests. These small
// channel walkthroughs need byte ranges so browsers can seek in native players.
export async function withVideoRange(request: Request, response: Response): Promise<Response> {
  if (
    !['GET', 'HEAD'].includes(request.method) ||
    response.status !== 200 ||
    !response.headers.get('Content-Type')?.startsWith('video/') ||
    (response.headers.has('Content-Encoding') && response.headers.get('Content-Encoding') !== 'identity')
  )
    return response

  const full = new Response(response.body, response)
  full.headers.set('Accept-Ranges', 'bytes')
  const range = request.method === 'GET' ? request.headers.get('Range') : null
  const match = range?.match(/^bytes=(\d*)-(\d*)$/)
  // A server may ignore malformed or multipart ranges and send the full file.
  if (!match || (!match[1] && !match[2])) return full
  if ([match[1], match[2]].some((part) => part && !Number.isSafeInteger(Number(part)))) return full

  const validator = request.headers.get('If-Range')
  if (validator && !matchesIfRange(validator, full.headers)) return full

  const body = await full.arrayBuffer()
  const size = body.byteLength
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]))
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1
  const headers = full.headers
  if (start >= size || end < start) {
    headers.set('Content-Range', `bytes */${size}`)
    headers.set('Content-Length', '0')
    return new Response(null, { status: 416, headers })
  }

  headers.set('Content-Range', `bytes ${start}-${end}/${size}`)
  headers.set('Content-Length', String(end - start + 1))
  return new Response(body.slice(start, end + 1), { status: 206, headers })
}

function matchesIfRange(validator: string, headers: Headers): boolean {
  const etagMatches = validator.startsWith('"') && validator === headers.get('ETag')
  const dateMatches = Number.isFinite(Date.parse(validator)) && validator === headers.get('Last-Modified')
  return etagMatches || dateMatches
}
