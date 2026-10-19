import { expect, test } from 'bun:test'
import { BUILDER_METRICS_ROLLUP_SQL, fetchPublicBuilderMetricsFromD1 } from '../src/lib/builderMetricsD1.ts'

test('BUILDER_METRICS_ROLLUP_SQL reads platform from payload_descriptor JSON', () => {
  expect(BUILDER_METRICS_ROLLUP_SQL).toContain("json_extract(payload_descriptor, '$.buildOptions.platform')")
  expect(BUILDER_METRICS_ROLLUP_SQL).toContain('runner_wait_ms')
  expect(BUILDER_METRICS_ROLLUP_SQL).not.toContain('build_requests')
})

test('fetchPublicBuilderMetricsFromD1 queries D1 rollups with 90d, 30d, and hourly windows', async () => {
  const now = new Date('2026-09-23T21:00:00.000Z')
  let captured = []
  const metrics = await fetchPublicBuilderMetricsFromD1({
    db: { prepare: () => ({ bind: () => ({ all: async () => ({ results: [] }) }) }) },
    now,
    client: {
      async queryAggregatedRollups(dailyWindowStartMs, kpiWindowStartMs, hourlyWindowStartMs) {
        captured = [dailyWindowStartMs, kpiWindowStartMs, hourlyWindowStartMs]
        return [
          {
            rollup: 'platform',
            platform: 'ios',
            bucket: null,
            successes: 1,
            failures: 0,
            avg_process_seconds: 180,
            avg_queue_seconds: 1,
          },
        ]
      },
    },
  })

  expect(captured[0]).toBe(new Date('2026-06-26T00:00:00.000Z').getTime())
  expect(captured[1]).toBe(new Date('2026-08-24T21:00:00.000Z').getTime())
  expect(captured[2]).toBe(new Date('2026-09-22T22:00:00.000Z').getTime())
  expect(metrics.success_rate).toBe(100)
  expect(metrics.daily_platforms).toHaveLength(90)
  expect(metrics.hourly_platforms).toHaveLength(24)
  expect(metrics.hourly_platforms.at(-1)?.date).toBe('2026-09-23 21:00')
  expect(metrics.daily_window_days).toBe(90)
  expect(metrics.period_days).toBe(30)
})

test('fetchPublicBuilderMetricsFromD1 propagates query failures', async () => {
  await expect(
    fetchPublicBuilderMetricsFromD1({
      db: { prepare: () => ({ bind: () => ({ all: async () => ({ results: [] }) }) }) },
      client: {
        async queryAggregatedRollups() {
          throw new Error('D1 unavailable')
        },
      },
    }),
  ).rejects.toThrow('D1 unavailable')
})
