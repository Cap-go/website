import { afterEach, beforeEach, expect, test } from 'bun:test'
import { handleBuilderMetrics } from '../src/worker/builder-metrics.ts'
import { handleLiveUpdateMetrics } from '../src/worker/live-update-metrics.ts'

const liveUpdatePayload = {
  success_rate: 82.7,
  first_try_rate: 98.2,
  first_day_rate: null,
  first_day_success_rate: null,
  rollback_rate: 16.4,
  zip_success_rate: 97.5,
  delta_success_rate: 88.9,
  period_days: 30,
  daily_window_days: 90,
  updated_at: '2026-10-26T12:00:00.000Z',
  daily: [{ date: '2026-10-25', success_rate: 82 }],
  daily_platforms: [{ date: '2026-10-25', ios: 81.8, android: 84.5 }],
  daily_platforms_sparkline: [{ date: '2026-10-25', ios: 81.8, android: 84.5 }],
  hourly_platforms: [],
  failures: [{ reason: 'download_manifest_file_fail', share: 51.3 }],
  platforms: [],
  countries: [],
  updater_versions: [],
}

const builderPayload = {
  success_rate: 76,
  avg_process_seconds: 272.6,
  avg_queue_seconds: 110.9,
  period_days: 30,
  daily_window_days: 90,
  updated_at: '2026-10-26T12:00:00.000Z',
  daily_platforms: [{ date: '2026-10-25', ios: 80, android: 90, ios_process_seconds: 300, android_process_seconds: 200 }],
  hourly_platforms: [],
  failures: [{ reason: 'script_failure', share: 100 }],
  platforms: [],
}

let previousCaches
beforeEach(() => {
  previousCaches = globalThis.caches
  globalThis.caches = { default: { match: async () => undefined, put: async () => {} } }
})
afterEach(() => {
  globalThis.caches = previousCaches
})

function upstream(body, status = 200) {
  const calls = []
  const fetchImpl = async (url) => {
    calls.push(String(url))
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  }
  return { calls, fetchImpl }
}

test('live update metrics are the normalized Capgo API payload', async () => {
  const { calls, fetchImpl } = upstream(liveUpdatePayload)
  const response = await handleLiveUpdateMetrics(new Request('https://capgo.app/live-update-metrics.json'), { LIVE_UPDATE_METRICS_URL: 'https://api.example.test/live' }, undefined, fetchImpl)
  expect(response.status).toBe(200)
  expect(await response.json()).toEqual(liveUpdatePayload)
  expect(calls).toEqual(['https://api.example.test/live'])
})

test('builder metrics are the normalized builder payload', async () => {
  const { calls, fetchImpl } = upstream(builderPayload)
  const response = await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), { BUILDER_METRICS_URL: 'https://builder.example.test/stats/public' }, undefined, fetchImpl)
  expect(response.status).toBe(200)
  expect(await response.json()).toEqual(builderPayload)
  expect(calls).toEqual(['https://builder.example.test/stats/public'])
})

test('out-of-range upstream values are clamped before anyone reads them', async () => {
  const { fetchImpl } = upstream({ ...builderPayload, success_rate: 150 })
  const response = await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), { BUILDER_METRICS_URL: 'https://builder.example.test/stats/public' }, undefined, fetchImpl)
  expect((await response.json()).success_rate).toBe(100)
})

test('metrics are unavailable without an upstream URL', async () => {
  expect((await handleLiveUpdateMetrics(new Request('https://capgo.app/live-update-metrics.json'), {})).status).toBe(503)
  const builder = await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), {})
  expect(builder.status).toBe(503)
  expect((await builder.json()).error).toBe('Builder metrics misconfigured')
})

test('an upstream error or malformed payload is unavailable, never cached', async () => {
  let puts = 0
  globalThis.caches = { default: { match: async () => undefined, put: async () => { puts++ } } }
  const failing = upstream({ error: 'Live update metrics are temporarily unavailable' }, 503)
  const live = await handleLiveUpdateMetrics(new Request('https://capgo.app/live-update-metrics.json'), { LIVE_UPDATE_METRICS_URL: 'https://api.example.test/live' }, undefined, failing.fetchImpl)
  expect(live.status).toBe(503)
  expect((await live.json()).error).toBe('Live update metrics are temporarily unavailable')

  const malformed = upstream({ success_rate: 76 })
  const builder = await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), { BUILDER_METRICS_URL: 'https://builder.example.test/stats/public' }, undefined, malformed.fetchImpl)
  expect(builder.status).toBe(503)
  expect((await builder.json()).error).toBe('Builder metrics are temporarily unavailable')

  // Normalizers would turn these into a 0% success rate.
  const { success_rate: _rate, ...withoutRate } = builderPayload
  const noRate = upstream(withoutRate)
  expect((await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), { BUILDER_METRICS_URL: 'https://builder.example.test/stats/public' }, undefined, noRate.fetchImpl)).status).toBe(503)
  const emptyLive = upstream({ updated_at: '', daily: [], failures: [] })
  expect((await handleLiveUpdateMetrics(new Request('https://capgo.app/live-update-metrics.json'), { LIVE_UPDATE_METRICS_URL: 'https://api.example.test/live' }, undefined, emptyLive.fetchImpl)).status).toBe(503)
  expect(puts).toBe(0)
})
