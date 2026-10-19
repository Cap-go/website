import { expect, test } from 'bun:test'
import {
  aggregateBuilderMetricsFromSqlRollups,
  buildContiguousDailyPlatformRows,
  buildContiguousHourlyPlatformRows,
  buildRollingDailyBucketKeys,
  buildRollingHourlyBucketKeys,
} from '../src/lib/builderMetricsAggregation.ts'
import { buildPublicBuilderMetrics } from '../src/lib/publicBuilderMetrics.ts'

const referenceDate = new Date('2026-09-23T21:30:00.000Z')
const timeoutMessage = 'Build exceeded configured timeout of 15 minutes'

test('buildRollingHourlyBucketKeys matches the rolling 24h chart window', () => {
  expect(buildRollingHourlyBucketKeys(referenceDate)).toEqual([
    '2026-09-22 22:00',
    '2026-09-22 23:00',
    '2026-09-23 00:00',
    '2026-09-23 01:00',
    '2026-09-23 02:00',
    '2026-09-23 03:00',
    '2026-09-23 04:00',
    '2026-09-23 05:00',
    '2026-09-23 06:00',
    '2026-09-23 07:00',
    '2026-09-23 08:00',
    '2026-09-23 09:00',
    '2026-09-23 10:00',
    '2026-09-23 11:00',
    '2026-09-23 12:00',
    '2026-09-23 13:00',
    '2026-09-23 14:00',
    '2026-09-23 15:00',
    '2026-09-23 16:00',
    '2026-09-23 17:00',
    '2026-09-23 18:00',
    '2026-09-23 19:00',
    '2026-09-23 20:00',
    '2026-09-23 21:00',
  ])
})

test('buildRollingDailyBucketKeys returns 90 contiguous UTC days', () => {
  const keys = buildRollingDailyBucketKeys(referenceDate)
  expect(keys).toHaveLength(90)
  expect(keys[0]).toBe('2026-06-26')
  expect(keys.at(-1)).toBe('2026-09-23')
  for (let index = 1; index < keys.length; index += 1) {
    const prev = new Date(`${keys[index - 1]}T00:00:00.000Z`)
    const current = new Date(`${keys[index]}T00:00:00.000Z`)
    expect(current.getTime() - prev.getTime()).toBe(86_400_000)
  }
})

test('aggregateBuilderMetricsFromSqlRollups rolls up daily and classified failures without leaking raw errors', () => {
  const source = aggregateBuilderMetricsFromSqlRollups(
    [
      { rollup: 'daily', platform: 'ios', bucket: '2026-09-16', successes: 1, failures: 1, avg_process_seconds: 200, avg_queue_seconds: 2 },
      { rollup: 'daily', platform: 'android', bucket: '2026-09-16', successes: 1, failures: 1, avg_process_seconds: 200, avg_queue_seconds: 2 },
      { rollup: 'platform', platform: 'ios', bucket: null, successes: 1, failures: 1, avg_process_seconds: 200, avg_queue_seconds: 2 },
      { rollup: 'platform', platform: 'android', bucket: null, successes: 1, failures: 1, avg_process_seconds: 200, avg_queue_seconds: 2 },
      { rollup: 'failure', platform: null, bucket: 'script_failure', successes: 0, failures: 1, avg_process_seconds: null, avg_queue_seconds: null },
      { rollup: 'failure', platform: null, bucket: 'timeout', successes: 0, failures: 1, avg_process_seconds: null, avg_queue_seconds: null },
      { rollup: 'platform_failure', platform: 'ios', bucket: 'script_failure', successes: 0, failures: 1, avg_process_seconds: null, avg_queue_seconds: null },
      { rollup: 'platform_failure', platform: 'android', bucket: 'timeout', successes: 0, failures: 1, avg_process_seconds: null, avg_queue_seconds: null },
    ],
    referenceDate,
  )

  const metrics = buildPublicBuilderMetrics(source)
  expect(metrics.daily_platforms).toEqual([
    {
      date: '2026-09-16',
      ios: 50,
      android: 50,
      ios_process_seconds: 200,
      android_process_seconds: 200,
    },
  ])
  expect(metrics.failures.map((item) => item.reason).sort()).toEqual(['script_failure', 'timeout'])
  const serialized = JSON.stringify(metrics)
  expect(serialized).not.toContain(timeoutMessage)
  expect(serialized).not.toContain('Build failed (script_failure)')
  expect(serialized).not.toContain('last_error')
})

test('aggregateBuilderMetricsFromSqlRollups skips unknown platforms and empty failure buckets', () => {
  const source = aggregateBuilderMetricsFromSqlRollups(
    [
      { rollup: 'platform', platform: 'electron', bucket: null, successes: 9, failures: 0, avg_process_seconds: 1, avg_queue_seconds: 1 },
      { rollup: 'daily', platform: 'web', bucket: '2026-09-16', successes: 3, failures: 0, avg_process_seconds: 1, avg_queue_seconds: 1 },
      { rollup: 'failure', platform: null, bucket: '', successes: 0, failures: 2, avg_process_seconds: null, avg_queue_seconds: null },
    ],
    referenceDate,
  )

  expect(source.platforms).toEqual([])
  expect(source.daily).toEqual([])
  expect(source.failures).toEqual([])
})

test('buildContiguousHourlyPlatformRows fills empty hours with null rates', () => {
  const source = aggregateBuilderMetricsFromSqlRollups(
    [
      { rollup: 'hourly', platform: 'ios', bucket: '2026-09-23 08:00', successes: 1, failures: 0, avg_process_seconds: 200, avg_queue_seconds: 2 },
      { rollup: 'hourly', platform: 'android', bucket: '2026-09-23 12:00', successes: 1, failures: 0, avg_process_seconds: 190, avg_queue_seconds: 1 },
    ],
    referenceDate,
  )

  const hourly = buildContiguousHourlyPlatformRows(source.hourly, referenceDate)
  expect(hourly).toHaveLength(24)
  expect(hourly.find((item) => item.date === '2026-09-23 08:00')).toMatchObject({ ios: 100, android: null })
  expect(hourly.find((item) => item.date === '2026-09-23 09:00')).toMatchObject({ ios: null, android: null })
  expect(hourly.find((item) => item.date === '2026-09-23 12:00')).toMatchObject({ ios: null, android: 100 })
})

test('buildContiguousDailyPlatformRows zero-fills missing days across midnight boundaries', () => {
  const source = aggregateBuilderMetricsFromSqlRollups(
    [
      { rollup: 'daily', platform: 'ios', bucket: '2026-09-22', successes: 1, failures: 0, avg_process_seconds: 100, avg_queue_seconds: 1 },
      { rollup: 'daily', platform: 'android', bucket: '2026-09-23', successes: 1, failures: 0, avg_process_seconds: 120, avg_queue_seconds: 1 },
    ],
    referenceDate,
  )

  const daily = buildContiguousDailyPlatformRows(source.daily, referenceDate)
  expect(daily).toHaveLength(90)
  expect(daily.find((item) => item.date === '2026-09-21')).toMatchObject({ ios: null, android: null })
  expect(daily.find((item) => item.date === '2026-09-22')).toMatchObject({ ios: 100, android: null })
  expect(daily.find((item) => item.date === '2026-09-23')).toMatchObject({ ios: null, android: 100 })
})
