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
  xcode_versions: [
    { version: '27', share: 19.5 },
    { version: '26', share: 80.5 },
  ],
  ios_dependency_managers: [
    { key: 'spm', share: 73.4 },
    { key: 'cocoapods', share: 26.6 },
  ],
  daily_ios_toolchain: [
    { date: '2026-10-25', xcode_versions: [], ios_dependency_managers: [] },
    { date: '2026-10-26', xcode_versions: [{ version: '26', share: 100 }], ios_dependency_managers: [{ key: 'spm', share: 100 }] },
  ],
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

test('builder toolchain shares drop unknown entries and default to none on older payloads', async () => {
  const noisy = upstream({
    ...builderPayload,
    xcode_versions: [{ version: '26', share: 80 }, { version: '26.0.1', share: 10 }, null],
    ios_dependency_managers: [{ key: 'spm', share: 70 }, { key: 'carthage', share: 30 }],
    daily_ios_toolchain: [{ date: '2026-10-26', xcode_versions: [{ version: 'beta', share: 5 }, { version: '27', share: 95 }], ios_dependency_managers: 'spm' }, { xcode_versions: [] }, null],
  })
  const response = await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), { BUILDER_METRICS_URL: 'https://builder.example.test/stats/public' }, undefined, noisy.fetchImpl)
  const body = await response.json()
  expect(body.xcode_versions).toEqual([{ version: '26', share: 80 }])
  expect(body.ios_dependency_managers).toEqual([{ key: 'spm', share: 70 }])
  expect(body.daily_ios_toolchain).toEqual([{ date: '2026-10-26', xcode_versions: [{ version: '27', share: 95 }], ios_dependency_managers: [] }])

  const { xcode_versions: _xcode, ios_dependency_managers: _managers, daily_ios_toolchain: _daily, ...older } = builderPayload
  const legacy = upstream(older)
  const legacyBody = await (await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), { BUILDER_METRICS_URL: 'https://builder.example.test/stats/public' }, undefined, legacy.fetchImpl)).json()
  expect(legacyBody.xcode_versions).toEqual([])
  expect(legacyBody.ios_dependency_managers).toEqual([])
  expect(legacyBody.daily_ios_toolchain).toEqual([])
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
  // Normalizers would drop these rows and publish an empty chart.
  const badLiveRow = upstream({ ...liveUpdatePayload, daily: [null] })
  expect((await handleLiveUpdateMetrics(new Request('https://capgo.app/live-update-metrics.json'), { LIVE_UPDATE_METRICS_URL: 'https://api.example.test/live' }, undefined, badLiveRow.fetchImpl)).status).toBe(503)
  const badBuilderRow = upstream({ ...builderPayload, daily_platforms: [{ ios: 80 }] })
  expect((await handleBuilderMetrics(new Request('https://capgo.app/builder-metrics.json'), { BUILDER_METRICS_URL: 'https://builder.example.test/stats/public' }, undefined, badBuilderRow.fetchImpl)).status).toBe(503)
  expect(puts).toBe(0)
})
