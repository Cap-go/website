import { expect, test } from 'bun:test'
import { normalizeBuilderMetrics } from '../src/lib/builderMetrics.ts'

test('normalizeBuilderMetrics keeps rates and process times', () => {
  const metrics = normalizeBuilderMetrics({
    updated_at: '2026-09-17T12:00:00.000Z',
    success_rate: 72.3,
    avg_process_seconds: 219.7,
    avg_queue_seconds: 13.3,
    daily_platforms: [{ date: '2026-09-16', ios: 88.4, android: 71.2, ios_process_seconds: 194.2, android_process_seconds: 254.1 }],
    failures: [{ reason: 'script_failure', share: 82.3 }],
    platforms: [{ key: 'ios', share: 66.6, success_rate: 70.7, avg_process_seconds: 226.7, avg_queue_seconds: 14.9, top_failure: { reason: 'script_failure', share: 77.2 } }],
  })

  expect(metrics?.success_rate).toBe(72.3)
  expect(metrics?.avg_process_seconds).toBe(219.7)
  expect(metrics?.daily_platforms[0]?.ios).toBe(88.4)
  expect(metrics?.platforms[0]?.top_failure?.reason).toBe('script_failure')
})

test('normalizeBuilderMetrics rejects payloads without daily platforms', () => {
  expect(normalizeBuilderMetrics({
    updated_at: '2026-09-17T12:00:00.000Z',
    success_rate: 70,
    failures: [],
    platforms: [],
  })).toBeNull()
})
