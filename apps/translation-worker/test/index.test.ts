import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import worker, { __translationWorkerTest } from '../src/index'

type AiInput = {
  messages: { role: 'system' | 'user'; content: string }[]
  temperature?: number
  max_tokens?: number
}

type AiHandler = (model: string, input: AiInput) => Promise<unknown> | unknown

class MemoryCache {
  readonly store = new Map<string, Response>()

  key(input: RequestInfo | URL): string {
    const request = input instanceof Request ? input : new Request(input)
    return `${request.method}:${request.url}`
  }

  async match(input: RequestInfo | URL): Promise<Response | undefined> {
    return this.store.get(this.key(input))?.clone()
  }

  async put(input: RequestInfo | URL, response: Response): Promise<void> {
    this.store.set(this.key(input), response.clone())
  }

  async delete(input: RequestInfo | URL): Promise<boolean> {
    return this.store.delete(this.key(input))
  }
}

class MemoryR2 {
  readonly store = new Map<string, string>()

  async get(key: string): Promise<{ text(): Promise<string> } | null> {
    const value = this.store.get(key)
    return value === undefined ? null : { text: async () => value }
  }

  async put(key: string, value: string): Promise<void> {
    this.store.set(key, value)
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key)
  }
}

function lastUserPayload(input: AiInput): Record<string, unknown> {
  return JSON.parse(input.messages[input.messages.length - 1]?.content ?? '{}') as Record<string, unknown>
}

function createEnv(aiHandler: AiHandler, html = '<html lang="en"><body><h1>Ship updates instantly</h1><a href="/pricing">Pricing</a></body></html>') {
  const calls: AiInput[] = []
  const queueMessages: unknown[] = []
  const r2 = new MemoryR2()
  const origin = {
    fetch: async () =>
      new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }),
  }

  return {
    calls,
    r2,
    queueMessages,
    env: {
      TRANSLATION_MODEL: 'test-model',
      AI: {
        run: async (model: string, input: AiInput) => {
          calls.push(input)
          return await aiHandler(model, input)
        },
      },
      WEB: origin,
      DOCS: origin,
      TRANSLATION_QUEUE: {
        send: async (message: unknown) => {
          queueMessages.push(message)
        },
      },
      TRANSLATION_STORE: r2,
    },
  }
}

const originalWarn = console.warn
const originalError = console.error
const originalCaches = (globalThis as typeof globalThis & { caches?: unknown }).caches

beforeEach(() => {
  ;(globalThis as typeof globalThis & { caches: { default: MemoryCache } }).caches = { default: new MemoryCache() }
  console.warn = () => {}
  console.error = () => {}
})

afterEach(() => {
  ;(globalThis as typeof globalThis & { caches?: unknown }).caches = originalCaches
  console.warn = originalWarn
  console.error = originalError
})

describe('translation worker queue', () => {
  test('falls back to single-text translation when the model never returns batch JSON', async () => {
    const { calls, env } = createEnv((_model, input) => {
      const payload = lastUserPayload(input)
      if (Array.isArray(payload.texts)) return 'this is not json'
      return `JA:${payload.text}`
    })

    await worker.queue(
      {
        messages: [
          {
            body: {
              url: 'https://capgo.app/ja/',
              locale: 'ja',
              cacheVersion: __translationWorkerTest.TRANSLATION_CACHE_VERSION,
              reason: 'miss',
            },
          },
        ],
      },
      env,
    )

    expect(calls.some((input) => Array.isArray(lastUserPayload(input).texts))).toBe(true)
    expect(calls.some((input) => typeof lastUserPayload(input).text === 'string')).toBe(true)

    const response = await worker.fetch(new Request('https://capgo.app/ja/'), env)
    expect(response.status).toBe(200)
    expect(response.headers.get('X-Capgo-Translation-Cache')).toBe('HIT')

    const body = await response.text()
    expect(body).toContain('lang="ja"')
    expect(body).toContain('JA:Ship updates instantly')
    expect(body).toContain('JA:Pricing')
    expect(body).not.toContain('this is not json')
  })

  test('uses queue retry without throwing when both batch and single-text translation fail', async () => {
    const { env } = createEnv(() => {
      throw new Error('AI unavailable')
    })
    const retryCalls: unknown[] = []

    await worker.queue(
      {
        messages: [
          {
            id: 'message-1',
            attempts: 1,
            body: {
              url: 'https://capgo.app/ko/?session_id=secret',
              locale: 'ko',
              cacheVersion: __translationWorkerTest.TRANSLATION_CACHE_VERSION,
              reason: 'miss',
            },
            retry: (options?: unknown) => {
              retryCalls.push(options)
            },
          },
        ],
      },
      env,
    )

    expect(retryCalls).toEqual([{ delaySeconds: 60 }])
  })
})
