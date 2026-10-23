import { describe, expect, test } from 'bun:test'
import { readdir } from 'node:fs/promises'
import channelVideoSizes from './channel-video-sizes.json'
import worker from './index'
import { withVideoRange } from './video-ranges'

const url = 'https://capgo.app/channel-videos/default-routing.mp4'
const bytes = Uint8Array.from({ length: 100 }, (_, index) => index)
const etag = '"video-v1"'
const modified = 'Thu, 22 Oct 2026 19:00:00 GMT'

function assets(status = 200, contentType = 'video/mp4') {
  return {
    ASSETS: {
      async fetch(input: RequestInfo | URL) {
        const head = input instanceof Request && input.method === 'HEAD'
        return new Response(head || status === 304 ? null : bytes, {
          status,
          headers: {
            'Content-Type': contentType,
            'Content-Length': String(bytes.length),
            ETag: etag,
            'Last-Modified': modified,
          },
        })
      },
    },
  }
}

async function request(range?: string, headers: Record<string, string> = {}, method = 'GET', path = url) {
  if (range !== undefined) headers.Range = range
  return worker.fetch(new Request(path, { method, headers }), assets())
}

describe('channel video byte ranges', () => {
  test('serves exactly the requested bytes when the asset binding returns a full file', async () => {
    const response = await request('bytes=10-19')
    expect(response.status).toBe(206)
    expect(response.headers.get('Content-Range')).toBe('bytes 10-19/100')
    expect(response.headers.get('Content-Length')).toBe('10')
    expect(response.headers.get('Accept-Ranges')).toBe('bytes')
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes.slice(10, 20))
  })

  test.each([
    ['bytes=90-', 90, 99],
    ['bytes=-10', 90, 99],
    ['bytes=90-999', 90, 99],
    ['bytes=-999', 0, 99],
    ['bytes=0-0', 0, 0],
    ['Bytes=10-19', 10, 19],
    ['BYTES=10-19', 10, 19],
    ['bytes=10-9007199254740993', 10, 99],
    ['bytes=-9007199254740993', 0, 99],
  ])('handles %s', async (range, start, end) => {
    const response = await request(range)
    expect(response.status).toBe(206)
    expect(response.headers.get('Content-Range')).toBe(`bytes ${start}-${end}/100`)
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes.slice(start, end + 1))
  })

  test.each(['bytes=100-', 'bytes=500-600', 'bytes=-0', 'bytes=20-10', 'bytes=9007199254740992-', 'bytes=9007199254740993-9007199254740999'])(
    'rejects unsatisfiable %s',
    async (range) => {
      const response = await request(range)
      expect(response.status).toBe(416)
      expect(response.headers.get('Content-Range')).toBe('bytes */100')
      expect((await response.arrayBuffer()).byteLength).toBe(0)
    },
  )

  test.each([undefined, 'bytes=-', 'bytes=oops', 'items=0-1', 'bytes=0-1,5-6'])('ignores unsupported range %s', async (range) => {
    const response = await request(range)
    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Range')).toBeNull()
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes)
  })

  test.each([etag, modified])('honors the matching If-Range validator %s', async (validator) => {
    const response = await request('bytes=10-19', { 'If-Range': validator })
    expect(response.status).toBe(206)
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes.slice(10, 20))
    expect(response.headers.get('ETag')).toBe(etag)
  })

  test.each(['"video-v0"', `W/${etag}`, 'Wed, 21 Oct 2026 19:00:00 GMT', 'invalid'])('returns the full file for mismatched If-Range %s', async (validator) => {
    const response = await request('bytes=10-19', { 'If-Range': validator })
    expect(response.status).toBe(200)
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes)
  })

  test('advertises seeking on complete GET and HEAD responses', async () => {
    for (const method of ['GET', 'HEAD']) {
      const response = await request(undefined, {}, method)
      expect(response.headers.get('Accept-Ranges')).toBe('bytes')
      expect(response.headers.get('Content-Length')).toBe('100')
    }
    const head = await request('bytes=10-19', {}, 'HEAD')
    expect(head.status).toBe(200)
    expect((await head.arrayBuffer()).byteLength).toBe(0)
  })

  test.each([304, 404, 500, 206])('preserves upstream status %i', async (status) => {
    const response = await worker.fetch(new Request(url, { headers: { Range: 'bytes=10-19' } }), assets(status))
    expect(response.status).toBe(status)
  })

  test('leaves unrelated assets and non-video responses unchanged', async () => {
    const unrelated = await request('bytes=10-19', {}, 'GET', 'https://capgo.app/other.mp4')
    expect(unrelated.status).toBe(200)
    expect(unrelated.headers.get('Accept-Ranges')).toBeNull()
    const missing = await worker.fetch(new Request(url, { headers: { Range: 'bytes=10-19' } }), assets(200, 'text/html'))
    expect(missing.status).toBe(200)
    expect(missing.headers.get('Accept-Ranges')).toBeNull()
  })

  test('returns headers before EOF and cancels the source after the requested window', async () => {
    let controller!: ReadableStreamDefaultController<Uint8Array>
    let canceled = false
    const body = new ReadableStream<Uint8Array>(
      {
        start(value) {
          controller = value
          value.enqueue(bytes.slice(0, 30))
        },
        cancel() {
          canceled = true
        },
      },
      { highWaterMark: 0 },
    )
    const pending = withVideoRange(
      new Request(url, { headers: { Range: 'bytes=10-19' } }),
      new Response(body, {
        headers: { 'Content-Type': 'video/mp4', 'Content-Length': '100' },
      }),
    )
    const response = await Promise.race([pending, new Promise<null>((resolve) => setTimeout(() => resolve(null), 200))])
    if (!response) {
      controller.close()
      throw new Error('Range response waited for the full source body')
    }
    expect(response.status).toBe(206)
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes.slice(10, 20))
    expect(canceled).toBe(true)
  })

  test('rejects an unsatisfiable range without reading the source', async () => {
    let reads = 0
    let canceled = false
    const body = new ReadableStream<Uint8Array>(
      {
        pull(controller) {
          reads++
          controller.enqueue(bytes)
          controller.close()
        },
        cancel() {
          canceled = true
        },
      },
      { highWaterMark: 0 },
    )
    const response = await withVideoRange(
      new Request(url, { headers: { Range: 'bytes=100-' } }),
      new Response(body, {
        headers: { 'Content-Type': 'video/mp4', 'Content-Length': '100' },
      }),
    )
    expect(response.status).toBe(416)
    expect(reads).toBe(0)
    expect(canceled).toBe(true)
  })

  test('streams a range across chunk boundaries', async () => {
    let offset = 0
    const body = new ReadableStream<Uint8Array>(
      {
        pull(controller) {
          controller.enqueue(bytes.slice(offset, offset + 7))
          offset += 7
          if (offset >= bytes.length) controller.close()
        },
      },
      { highWaterMark: 0 },
    )
    const response = await withVideoRange(
      new Request(url, { headers: { Range: 'bytes=10-29' } }),
      new Response(body, {
        headers: { 'Content-Type': 'video/mp4', 'Content-Length': '100' },
      }),
    )
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes.slice(10, 30))
    expect(offset).toBeLessThan(100)
  })

  test('propagates client cancellation to the source', async () => {
    let canceled = false
    const source = new ReadableStream<Uint8Array>(
      {
        cancel() {
          canceled = true
        },
      },
      { highWaterMark: 0 },
    )
    const response = await withVideoRange(
      new Request(url, { headers: { Range: 'bytes=10-19' } }),
      new Response(source, {
        headers: { 'Content-Type': 'video/mp4', 'Content-Length': '100' },
      }),
    )
    await response.body!.cancel()
    expect(canceled).toBe(true)
  })

  test('errors on a source shorter than its advertised range', async () => {
    const response = await withVideoRange(
      new Request(url, { headers: { Range: 'bytes=0-19' } }),
      new Response(bytes.slice(0, 5), {
        headers: { 'Content-Type': 'video/mp4', 'Content-Length': '100' },
      }),
    )
    await expect(response.arrayBuffer()).rejects.toThrow('ended before the requested range')
  })

  test('rejects a range against an empty video without a body', async () => {
    const response = await withVideoRange(
      new Request(url, { headers: { Range: 'bytes=0-' } }),
      new Response(null, {
        headers: { 'Content-Type': 'video/mp4', 'Content-Length': '0' },
      }),
    )
    expect(response.status).toBe(416)
    expect(response.headers.get('Content-Range')).toBe('bytes */0')
  })

  test.each([undefined, 'invalid', '-1', '1.5', '9007199254740992'])('preserves responses without a usable size: %s', async (size) => {
    const headers: Record<string, string> = { 'Content-Type': 'video/mp4' }
    if (size !== undefined) headers['Content-Length'] = size
    const original = new Response(bytes, { headers })
    const response = await withVideoRange(new Request('https://capgo.app/channel-videos/unknown.mp4', { headers: { Range: 'bytes=10-19' } }), original)
    expect(response).toBe(original)
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes)
  })

  test('uses shipped asset metadata when the binding omits Content-Length', async () => {
    const data = await Bun.file(new URL('../../public/channel-videos/default-routing.mp4', import.meta.url)).arrayBuffer()
    const response = await withVideoRange(
      new Request(url, { headers: { Range: 'bytes=10-19' } }),
      new Response(data, {
        headers: { 'Content-Type': 'video/mp4' },
      }),
    )
    expect(response.status).toBe(206)
    expect(response.headers.get('Content-Range')).toBe(`bytes 10-19/${data.byteLength}`)
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array(data.slice(10, 20)))
  })

  test('metadata covers all shipped MP4s and matches their exact sizes', async () => {
    const directory = new URL('../../public/channel-videos/', import.meta.url)
    const paths = (await readdir(directory))
      .filter((name) => name.endsWith('.mp4'))
      .map((name) => `/channel-videos/${name}`)
      .sort()
    expect(Object.keys(channelVideoSizes).sort()).toEqual(paths)
    for (const [path, size] of Object.entries(channelVideoSizes)) {
      expect(Bun.file(new URL('../../public' + path, import.meta.url)).size).toBe(size)
    }
  })
})
