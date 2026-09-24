import { expect, test } from 'bun:test'
import { selectTrendRows } from '../src/lib/metricsTrendChart.ts'
import { buildPublicLiveUpdateQueries, getPublicLiveUpdateMetrics } from '../src/lib/publicLiveUpdateMetrics.ts'

function analyticsResponse(data) {
  return new Response(JSON.stringify({ data }), { headers: { 'content-type': 'application/json' } })
}

test('buildPublicLiveUpdateQueries stays at one Analytics Engine nest', () => {
  const queries = Object.values(buildPublicLiveUpdateQueries(new Date('2026-09-17T00:00:00.000Z')))
  expect(queries).toHaveLength(15)
  for (const query of queries) expect(query.split('FROM (').length).toBeLessThanOrEqual(2)
  expect(queries.join('\n')).toContain('GROUP BY date, platform')
  expect(queries.join('\n')).not.toContain('first_day_successes')
  expect(queries.join('\n')).not.toContain('FROM (SELECT date, app_id, version_name')
})

test('buildPublicLiveUpdateQueries keeps KPI windows at 30 days and trend platforms at 90 days', () => {
  const queries = buildPublicLiveUpdateQueries(new Date('2026-09-17T00:00:00.000Z'))
  expect(queries.outcomes).toContain("toDateTime('2026-08-18 00:00:00')")
  expect(queries.platformsDaily).toContain("toDateTime('2026-06-19 00:00:00')")
  expect(queries.platformsHourly).toContain("INTERVAL '1' HOUR")
})

test('buildPublicLiveUpdateQueries uses a rolling 24h hourly window ending at the next UTC hour', () => {
  const queries = buildPublicLiveUpdateQueries(new Date('2026-09-17T12:34:56.000Z'))
  expect(queries.platformsHourly).toContain("toDateTime('2026-09-16 13:00:00')")
  expect(queries.platformsHourly).toContain("toDateTime('2026-09-17 13:00:00')")
  expect(queries.platformsHourly).not.toContain("toDateTime('2026-09-17 00:00:00')")
})

test('getPublicLiveUpdateMetrics weights daily rates and skips first-day', async () => {
  const queries = []
  const metrics = await getPublicLiveUpdateMetrics({
    accountId: 'account',
    token: 'token',
    now: new Date('2026-09-17T12:00:00.000Z'),
    fetch: async (_url, init) => {
      const query = String(init?.body ?? '')
      queries.push(query)
      if (query.includes('SELECT date, sum(succeeded)')) {
        return analyticsResponse([
          { date: '2026-09-16', successes: '90', failures: '10', first_tries: '81' },
          { date: '2026-09-15', successes: '20', failures: '30', first_tries: '10' },
        ])
      }
      if (query.includes('has_reset')) return analyticsResponse([{ rollbacks: '3', outcomes: '100' }])
      if (query.includes('zip_successes')) return analyticsResponse([{ zip_successes: '40', zip_failures: '10', delta_successes: '80', delta_failures: '5' }])
      if (query.includes('SELECT action, count() AS devices') && !query.includes('AS key')) return analyticsResponse([{ action: 'download_fail', devices: '3' }])
      if (query.includes('FROM device_usage'))
        return analyticsResponse([
          { platform: '0', devices: '80' },
          { platform: '1', devices: '20' },
        ])
      if (query.includes('SELECT date, platform AS key') && query.includes("INTERVAL '1' HOUR")) {
        return analyticsResponse([
          { date: '2026-09-17 08:00', key: 'ios', successes: '8', failures: '1' },
          { date: '2026-09-17 09:00', key: 'ios', successes: '9', failures: '1' },
          { date: '2026-09-17 08:00', key: 'android', successes: '4', failures: '1' },
          { date: '2026-09-17 09:00', key: 'android', successes: '5', failures: '1' },
        ])
      }
      if (query.includes('SELECT date, platform AS key')) {
        return analyticsResponse([
          { date: '2026-09-15', key: 'ios', successes: '18', failures: '2' },
          { date: '2026-09-15', key: 'android', successes: '2', failures: '28' },
          { date: '2026-09-16', key: 'ios', successes: '70', failures: '5' },
          { date: '2026-09-16', key: 'android', successes: '20', failures: '5' },
        ])
      }
      if (query.includes('platform AS key') && query.includes('sum(succeeded)')) return analyticsResponse([{ key: 'android', successes: '80', failures: '20' }])
      if (query.includes('platform AS key') && query.includes('action, count()')) return analyticsResponse([{ key: 'android', action: 'download_fail', devices: '12' }])
      if (query.includes('FROM device_info') && query.includes('blob10')) return analyticsResponse([{ key: 'US', devices: '70' }])
      if (query.includes('country AS key') && query.includes('sum(succeeded)')) return analyticsResponse([{ key: 'US', successes: '90', failures: '10' }])
      if (query.includes('country AS key') && query.includes('action, count()')) return analyticsResponse([{ key: 'US', action: 'unzip_fail', devices: '2' }])
      if (query.includes('FROM device_info') && query.includes('blob3')) return analyticsResponse([{ key: '8.1.0', devices: '60' }])
      if (query.includes('plugin_version AS key') && query.includes('sum(succeeded)')) return analyticsResponse([{ key: '8.1.0', successes: '70', failures: '5' }])
      if (query.includes('plugin_version AS key') && query.includes('action, count()')) return analyticsResponse([{ key: '8.1.0', action: 'download_fail', devices: '1' }])
      return analyticsResponse([])
    },
  })

  expect(queries).toHaveLength(15)
  expect(metrics.success_rate).toBe(73.3)
  expect(metrics.first_try_rate).toBe(82.7)
  expect(metrics.first_day_rate).toBeNull()
  expect(metrics.first_day_success_rate).toBeNull()
  expect(metrics.rollback_rate).toBe(3)
  expect(metrics.zip_success_rate).toBe(80)
  expect(metrics.delta_success_rate).toBe(94.1)
  expect(metrics.daily).toEqual([
    { date: '2026-09-15', success_rate: 40 },
    { date: '2026-09-16', success_rate: 90 },
  ])
  expect(metrics.daily_platforms).toHaveLength(90)
  expect(metrics.daily_platforms[0]?.date).toBe('2026-06-20')
  expect(metrics.daily_platforms.at(-1)?.date).toBe('2026-09-17')
  expect(metrics.daily_platforms.find((row) => row.date === '2026-09-15')).toEqual({ date: '2026-09-15', ios: 90, android: 6.7 })
  expect(metrics.daily_platforms.find((row) => row.date === '2026-09-16')).toEqual({ date: '2026-09-16', ios: 93.3, android: 80 })
  expect(metrics.daily_platforms_sparkline).toHaveLength(30)
  expect(selectTrendRows({ daily_platforms: metrics.daily_platforms }, '3m', new Date('2026-09-17T12:00:00.000Z'))).toHaveLength(90)
  expect(selectTrendRows({ daily_platforms: metrics.daily_platforms }, '1m', new Date('2026-09-17T12:00:00.000Z'))).toHaveLength(30)
  expect(metrics.hourly_platforms).toEqual([
    { date: '2026-09-17 08:00', ios: 88.9, android: 80 },
    { date: '2026-09-17 09:00', ios: 90, android: 83.3 },
  ])
  expect(metrics.period_days).toBe(30)
  expect(metrics.daily_window_days).toBe(90)
})
