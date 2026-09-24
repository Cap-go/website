import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fetchPublicBuilderMetricsFromD1 } from '../src/lib/builderMetricsD1.ts'

const snapshotPath = resolve(import.meta.dir, 'fixtures/builder-rollup-prod-2026-09-24.json')
const referenceDate = new Date('2026-09-24T20:19:07.000Z')

test('production rollup snapshot has expected row counts', () => {
  const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'))
  expect(snapshot.rows).toHaveLength(223)
  const byRollup = snapshot.rows.reduce((acc, row) => {
    acc[row.rollup] = (acc[row.rollup] ?? 0) + 1
    return acc
  }, {})
  expect(byRollup).toEqual({
    platform: 2,
    daily: 179,
    hourly: 31,
    failure: 4,
    platform_failure: 7,
  })
  expect(snapshot.table_stats).toMatchObject({
    total_jobs: 6698,
    earliest_created_at_utc: '2025-12-18',
    jobs_last_90d: 3572,
    utc_days_with_jobs_last_90d: 91,
  })
})

test('production snapshot rollups produce 90 daily and 24 hourly buckets at snapshot time', async () => {
  const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'))
  const metrics = await fetchPublicBuilderMetricsFromD1({
    db: { prepare: () => ({ bind: () => ({ all: async () => ({ results: [] }) }) }) },
    now: referenceDate,
    client: {
      async queryAggregatedRollups() {
        return snapshot.rows
      },
    },
  })

  expect(metrics.daily_platforms).toHaveLength(90)
  expect(metrics.daily_platforms[0]?.date).toBe('2026-06-27')
  expect(metrics.daily_platforms.at(-1)?.date).toBe('2026-09-24')
  expect(metrics.hourly_platforms).toHaveLength(24)
  expect(metrics.hourly_platforms[0]?.date).toBe('2026-09-23 21:00')
  expect(metrics.hourly_platforms.at(-1)?.date).toBe('2026-09-24 20:00')
  const serialized = JSON.stringify(metrics)
  expect(serialized).not.toContain('script_failure in fixture')
  expect(serialized).not.toMatch(/Build failed \(script_failure\)/)
})
