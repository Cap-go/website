import { describe, expect, test } from 'bun:test'
import worker from './index'

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
  ])('handles %s', async (range, start, end) => {
    const response = await request(range)
    expect(response.status).toBe(206)
    expect(response.headers.get('Content-Range')).toBe(`bytes ${start}-${end}/100`)
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes.slice(start, end + 1))
  })

  test.each(['bytes=100-', 'bytes=500-600', 'bytes=-0', 'bytes=20-10'])('rejects unsatisfiable %s', async (range) => {
    const response = await request(range)
    expect(response.status).toBe(416)
    expect(response.headers.get('Content-Range')).toBe('bytes */100')
    expect((await response.arrayBuffer()).byteLength).toBe(0)
  })

  test.each([undefined, 'bytes=-', 'bytes=oops', 'items=0-1', 'bytes=0-1,5-6', 'bytes=9007199254740992-'])('ignores unsupported range %s', async (range) => {
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
})
