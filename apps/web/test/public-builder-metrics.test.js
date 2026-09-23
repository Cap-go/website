import { expect, test } from 'bun:test'
import { buildPublicBuilderMetrics, classifyBuilderFailure, fetchPublicBuilderMetricsFromRpc } from '../src/lib/publicBuilderMetrics.ts'

const source = {
  updated_at: '2026-09-17T12:00:00.000Z',
  platforms: [
    { platform: 'ios', successes: 70, failures: 30, avg_process_seconds: 240, avg_queue_seconds: 12 },
    { platform: 'android', successes: 40, failures: 10, avg_process_seconds: 180, avg_queue_seconds: 8 },
  ],
  daily: [
    { date: '2026-09-16', platform: 'ios', successes: 8, failures: 2, avg_process_seconds: 200, avg_queue_seconds: 1 },
    { date: '2026-09-16', platform: 'android', successes: 4, failures: 1, avg_process_seconds: 150, avg_queue_seconds: 1 },
  ],
  failures: [
    { reason: 'Build failed (script_failure)', failures: 30 },
    { reason: 'Build exceeded configured timeout of 15 minutes', failures: 8 },
    { reason: 'Build exceeded configured timeout of 30 minutes', failures: 2 },
  ],
  platformFailures: [
    { platform: 'ios', reason: 'Build failed (script_failure)', failures: 20 },
    { platform: 'android', reason: 'Build failed (script_failure)', failures: 10 },
  ],
}

test('classifyBuilderFailure maps timeout variants to one public reason', () => {
  expect(classifyBuilderFailure('Build exceeded configured timeout of 15 minutes')).toBe('timeout')
  expect(classifyBuilderFailure('Build exceeded configured timeout of 30 minutes')).toBe('timeout')
  expect(classifyBuilderFailure('Build failed (script_failure)')).toBe('script_failure')
})

test('buildPublicBuilderMetrics emits rates and minutes, never raw counts', () => {
  const metrics = buildPublicBuilderMetrics(source)
  expect(metrics.success_rate).toBe(73.3)
  expect(metrics.avg_process_seconds).toBe(220)
  expect(metrics.platforms[0]).toMatchObject({ key: 'ios', share: 66.7, success_rate: 70 })
  expect(metrics.platforms[1]).toMatchObject({ key: 'android', share: 33.3, success_rate: 80 })
  expect(metrics.failures).toEqual([
    { reason: 'script_failure', share: 75 },
    { reason: 'timeout', share: 25 },
  ])
  expect(metrics.daily_platforms).toEqual([
    { date: '2026-09-16', ios: 80, android: 80, ios_process_seconds: 200, android_process_seconds: 150 },
  ])
  expect(JSON.stringify(metrics)).not.toContain('"successes"')
  expect(JSON.stringify(metrics)).not.toContain('builds_total')
})

test('fetchPublicBuilderMetricsFromRpc posts to the public RPC', async () => {
  const payload = { success_rate: 80, updated_at: '2026-09-19T12:00:00.000Z', daily_platforms: [], failures: [], platforms: [] }
  const metrics = await fetchPublicBuilderMetricsFromRpc({
    supabaseUrl: 'https://example.supabase.co',
    anonKey: 'anon',
    fetch: async (url, init) => {
      expect(String(url)).toBe('https://example.supabase.co/rest/v1/rpc/get_public_builder_metrics')
      expect(init?.method).toBe('POST')
      expect(init?.body).toBe(JSON.stringify({ trend_history_days: 90 }))
      expect(init?.headers?.apikey).toBe('anon')
      return new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } })
    },
  })
  expect(metrics.success_rate).toBe(80)
})
