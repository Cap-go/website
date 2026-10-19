import {
  buildPlatformTrendRows,
  type BuilderDailyPlatformMetric,
  type BuilderDailyRow,
  type BuilderFailureRow,
  type BuilderMetricsSource,
  type BuilderPlatformFailureRow,
  type BuilderPlatformRow,
} from './publicBuilderMetrics'
import { formatUtcDate } from './metricsTrendChart'

export const BUILDER_METRICS_PERIOD_DAYS = 30
export const BUILDER_METRICS_DAILY_WINDOW_DAYS = 90

export type BuilderSqlRollupRow = {
  rollup: string
  platform: string | null
  bucket: string | null
  successes: number
  failures: number
  avg_process_seconds: number | null
  avg_queue_seconds: number | null
}

export function formatHourBucket(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hour = String(date.getUTCHours()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:00`
}

/** Rolling 24h UTC hour labels, aligned with metricsTrendChart.sliceHourlyTrendRows. */
export function buildRollingHourlyBucketKeys(referenceDate = new Date()) {
  const end = new Date(Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate(), referenceDate.getUTCHours(), 0, 0, 0))
  const endExclusive = new Date(end)
  endExclusive.setUTCHours(endExclusive.getUTCHours() + 1)
  const start = new Date(endExclusive)
  start.setUTCHours(start.getUTCHours() - 24)
  const buckets: string[] = []
  for (let cursor = new Date(start); cursor < endExclusive; cursor.setUTCHours(cursor.getUTCHours() + 1)) {
    buckets.push(formatHourBucket(cursor))
  }
  return buckets
}

export function buildRollingHourlyWindowStart(referenceDate = new Date()) {
  const end = new Date(Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate(), referenceDate.getUTCHours(), 0, 0, 0))
  const endExclusive = new Date(end)
  endExclusive.setUTCHours(endExclusive.getUTCHours() + 1)
  const start = new Date(endExclusive)
  start.setUTCHours(start.getUTCHours() - 24)
  return start
}

function utcDayStart(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

/** Contiguous UTC calendar days for chart windows (default 90d ending on reference UTC day). */
export function dailyChartWindowStart(referenceDate = new Date(), days = BUILDER_METRICS_DAILY_WINDOW_DAYS) {
  const end = utcDayStart(referenceDate)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - (days - 1))
  return start
}

export function dailyChartWindowStartMs(referenceDate = new Date(), days = BUILDER_METRICS_DAILY_WINDOW_DAYS) {
  return dailyChartWindowStart(referenceDate, days).getTime()
}

export function buildRollingDailyBucketKeys(referenceDate = new Date(), days = BUILDER_METRICS_DAILY_WINDOW_DAYS) {
  const end = utcDayStart(referenceDate)
  const start = dailyChartWindowStart(referenceDate, days)
  const buckets: string[] = []
  for (let cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    buckets.push(formatUtcDate(cursor))
  }
  return buckets
}

function platformKey(value: string | null) {
  if (value === 'ios' || value === 'android') return value
  return null
}

function numberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? number : null
}

export function buildContiguousHourlyPlatformRows(hourlyRows: BuilderDailyRow[], referenceDate = new Date()): BuilderDailyPlatformMetric[] {
  const bucketKeys = buildRollingHourlyBucketKeys(referenceDate)
  const byHour = new Map(buildPlatformTrendRows(hourlyRows).map((row) => [row.date, row]))
  return bucketKeys.map((date) => {
    const row = byHour.get(date)
    return (
      row ?? {
        date,
        ios: null,
        android: null,
        ios_process_seconds: null,
        android_process_seconds: null,
      }
    )
  })
}

export function buildContiguousDailyPlatformRows(dailyRows: BuilderDailyRow[], referenceDate = new Date()): BuilderDailyPlatformMetric[] {
  const bucketKeys = buildRollingDailyBucketKeys(referenceDate)
  const byDay = new Map(buildPlatformTrendRows(dailyRows).map((row) => [row.date, row]))
  return bucketKeys.map((date) => {
    const row = byDay.get(date)
    return (
      row ?? {
        date,
        ios: null,
        android: null,
        ios_process_seconds: null,
        android_process_seconds: null,
      }
    )
  })
}

export function aggregateBuilderMetricsFromSqlRollups(rows: BuilderSqlRollupRow[], referenceDate = new Date()): BuilderMetricsSource {
  const platforms: BuilderPlatformRow[] = []
  const daily: BuilderDailyRow[] = []
  const hourly: BuilderDailyRow[] = []
  const failures: BuilderFailureRow[] = []
  const platformFailures: BuilderPlatformFailureRow[] = []

  for (const row of rows) {
    const successes = Number(row.successes) || 0
    const failuresCount = Number(row.failures) || 0
    const avg_process_seconds = numberOrNull(row.avg_process_seconds)
    const avg_queue_seconds = numberOrNull(row.avg_queue_seconds)

    if (row.rollup === 'platform') {
      const platform = platformKey(row.platform)
      if (!platform) continue
      platforms.push({ platform, successes, failures: failuresCount, avg_process_seconds, avg_queue_seconds })
      continue
    }

    if (row.rollup === 'daily') {
      const platform = platformKey(row.platform)
      if (!platform || !row.bucket) continue
      daily.push({ date: row.bucket, platform, successes, failures: failuresCount, avg_process_seconds, avg_queue_seconds })
      continue
    }

    if (row.rollup === 'hourly') {
      const platform = platformKey(row.platform)
      if (!platform || !row.bucket) continue
      hourly.push({ date: row.bucket, platform, successes, failures: failuresCount, avg_process_seconds, avg_queue_seconds })
      continue
    }

    if (row.rollup === 'failure') {
      const reason = row.bucket?.trim()
      if (!reason || failuresCount <= 0) continue
      failures.push({ reason, failures: failuresCount })
      continue
    }

    if (row.rollup === 'platform_failure') {
      const platform = platformKey(row.platform)
      const reason = row.bucket?.trim()
      if (!platform || !reason || failuresCount <= 0) continue
      platformFailures.push({ platform, reason, failures: failuresCount })
    }
  }

  return {
    updated_at: referenceDate.toISOString(),
    platforms,
    daily,
    hourly,
    failures,
    platformFailures,
  }
}

export function hourlyPlatformsFromSource(source: BuilderMetricsSource, referenceDate = new Date()) {
  return buildContiguousHourlyPlatformRows(source.hourly ?? [], referenceDate)
}
