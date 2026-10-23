import channelVideoSizes from './channel-video-sizes.json'

declare const FixedLengthStream: new (length: number) => TransformStream<Uint8Array, Uint8Array>

/** Add seekable byte ranges to the static binding's full channel-video responses. */
export async function withVideoRange(request: Request, response: Response): Promise<Response> {
  const path = new URL(request.url).pathname as keyof typeof channelVideoSizes
  // ASSETS omits Content-Length internally; this manifest is verified against the files in CI.
  const size = contentLength(response.headers) ?? channelVideoSizes[path] ?? null
  if (!canRangeVideo(request, response) || size === null) return response

  const full = new Response(response.body, response)
  full.headers.set('Accept-Ranges', 'bytes')
  const range = request.method === 'GET' ? request.headers.get('Range') : null
  const match = range?.match(/^bytes=(\d*)-(\d*)$/i)
  // A server may ignore malformed or multipart ranges and send the full file.
  if (!match || (!match[1] && !match[2])) return full
  if ([match[1], match[2]].some((part) => part && !Number.isSafeInteger(Number(part)))) return full

  const validator = request.headers.get('If-Range')
  if (validator && !matchesIfRange(validator, full.headers)) return full

  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]))
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1
  const headers = full.headers
  if (start >= size || end < start) {
    await full.body?.cancel().catch(() => {})
    headers.set('Content-Range', `bytes */${size}`)
    headers.set('Content-Length', '0')
    return new Response(null, { status: 416, headers })
  }

  if (!full.body) return full
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`)
  headers.set('Content-Length', String(end - start + 1))
  return new Response(rangeStream(full.body, start, end), { status: 206, headers })
}

/** Limit byte handling to successful, unencoded video GET and HEAD responses. */
function canRangeVideo(request: Request, response: Response): boolean {
  return (
    ['GET', 'HEAD'].includes(request.method) &&
    response.status === 200 &&
    !!response.headers.get('Content-Type')?.toLowerCase().startsWith('video/') &&
    (response.headers.get('Content-Encoding') ?? 'identity').toLowerCase() === 'identity'
  )
}

/** Accept only a known, exact byte length before attempting a partial response. */
function contentLength(headers: Headers): number | null {
  const value = headers.get('Content-Length')
  if (!value || !/^\d+$/.test(value)) return null
  const size = Number(value)
  return Number.isSafeInteger(size) ? size : null
}

/** Compare strong entity tags or exact modification dates for If-Range. */
function matchesIfRange(validator: string, headers: Headers): boolean {
  const etagMatches = validator.startsWith('"') && validator === headers.get('ETag')
  const dateMatches = Number.isFinite(Date.parse(validator)) && validator === headers.get('Last-Modified')
  return etagMatches || dateMatches
}

/** Forward one byte window with backpressure, canceling the unused source tail. */
function rangeStream(body: ReadableStream<Uint8Array>, start: number, end: number): ReadableStream<Uint8Array> {
  const reader = body.getReader()
  let offset = 0
  const stream = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) throw new Error('Channel video ended before the requested range')
            const from = Math.max(0, start - offset)
            const to = Math.min(value.byteLength, end + 1 - offset)
            offset += value.byteLength
            if (to <= from) continue
            controller.enqueue(value.subarray(from, to))
            if (offset > end) {
              controller.close()
              await reader.cancel()
            }
            return
          }
        } catch (error) {
          controller.error(error)
          await reader.cancel(error).catch(() => {})
        }
      },
      cancel(reason) {
        return reader.cancel(reason)
      },
    },
    { highWaterMark: 0 },
  )
  // Workers needs its native stream to retain Content-Length; Bun uses headers.
  return typeof FixedLengthStream === 'undefined' ? stream : stream.pipeThrough(new FixedLengthStream(end - start + 1))
}
