import { expect, test } from 'bun:test'
import { aggregateBuilderMetricsFromRows, buildContiguousHourlyPlatformRows, buildRollingHourlyBucketKeys } from '../src/lib/builderMetricsAggregation.ts'
import { buildPublicBuilderMetrics } from '../src/lib/publicBuilderMetrics.ts'

const referenceDate = new Date('2026-09-23T21:30:00.000Z')

function row(overrides) {
  return {
    platform: 'ios',
    day: '2026-09-23',
    hour_bucket: '2026-09-23 12:00',
    outcome: 'success',
    process_seconds: 200,
    queue_seconds: 2,
    last_error: null,
    ...overrides,
  }
}

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

test('aggregateBuilderMetricsFromRows rolls up daily and classifies failures', () => {
  const source = aggregateBuilderMetricsFromRows(
    [
      row({ platform: 'ios', day: '2026-09-16', hour_bucket: '2026-09-16 10:00' }),
      row({ platform: 'ios', day: '2026-09-16', hour_bucket: '2026-09-16 10:00', outcome: 'failure', last_error: 'Build failed (script_failure)' }),
      row({
        platform: 'android',
        day: '2026-09-16',
        hour_bucket: '2026-09-16 11:00',
        platform: 'android',
        outcome: 'failure',
        last_error: 'Build exceeded configured timeout of 15 minutes',
      }),
      row({ platform: 'android', day: '2026-09-16', hour_bucket: '2026-09-16 11:00', platform: 'android' }),
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
  expect(JSON.stringify(metrics)).not.toContain('script_failure text')
  expect(JSON.stringify(metrics)).not.toContain('last_error')
})

test('buildContiguousHourlyPlatformRows fills empty hours with null rates', () => {
  const source = aggregateBuilderMetricsFromRows(
    [row({ hour_bucket: '2026-09-23 08:00', day: '2026-09-23' }), row({ hour_bucket: '2026-09-23 12:00', day: '2026-09-23', platform: 'android' })],
    referenceDate,
  )

  const hourly = buildContiguousHourlyPlatformRows(source.hourly, referenceDate)
  expect(hourly).toHaveLength(24)
  expect(hourly.find((item) => item.date === '2026-09-23 08:00')).toMatchObject({ ios: 100, android: null })
  expect(hourly.find((item) => item.date === '2026-09-23 09:00')).toMatchObject({ ios: null, android: null })
  expect(hourly.find((item) => item.date === '2026-09-23 12:00')).toMatchObject({ ios: null, android: 100 })
})
