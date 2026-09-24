import type { BuilderDailyPlatformMetric } from './publicBuilderMetrics'
import {
  classifyBuilderFailure,
  type BuilderDailyRow,
  type BuilderFailureRow,
  type BuilderMetricsSource,
  type BuilderPlatformFailureRow,
  type BuilderPlatformRow,
} from './publicBuilderMetrics'

export const BUILDER_METRICS_PERIOD_DAYS = 30

export type RawBuildRequestRow = {
  platform: string
  day: string
  hour_bucket: string
  outcome: string | null
  process_seconds: number | null
  queue_seconds: number | null
  last_error: string | null
}

type Outcome = 'success' | 'failure'

type Acc = {
  successes: number
  failures: number
  processSum: number
  processCount: number
  queueSum: number
  queueCount: number
}

function emptyAcc(): Acc {
  return { successes: 0, failures: 0, processSum: 0, processCount: 0, queueSum: 0, queueCount: 0 }
}

function parseOutcome(value: string | null): Outcome | null {
  if (value === 'success' || value === 'failure') return value
  return null
}

function addToAcc(acc: Acc, outcome: Outcome, processSeconds: number | null, queueSeconds: number | null) {
  if (outcome === 'success') acc.successes += 1
  else acc.failures += 1
  if (processSeconds !== null && Number.isFinite(processSeconds)) {
    acc.processSum += processSeconds
    acc.processCount += 1
  }
  if (queueSeconds !== null && Number.isFinite(queueSeconds)) {
    acc.queueSum += queueSeconds
    acc.queueCount += 1
  }
}

function accToDailyRow(platform: string, date: string, acc: Acc): BuilderDailyRow {
  return {
    date,
    platform,
    successes: acc.successes,
    failures: acc.failures,
    avg_process_seconds: acc.processCount ? acc.processSum / acc.processCount : null,
    avg_queue_seconds: acc.queueCount ? acc.queueSum / acc.queueCount : null,
  }
}

function accToPlatformRow(platform: string, acc: Acc): BuilderPlatformRow {
  return {
    platform,
    successes: acc.successes,
    failures: acc.failures,
    avg_process_seconds: acc.processCount ? acc.processSum / acc.processCount : null,
    avg_queue_seconds: acc.queueCount ? acc.queueSum / acc.queueCount : null,
  }
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

function buildPlatformTrendRows(rows: BuilderDailyRow[]): BuilderDailyPlatformMetric[] {
  const byDate = new Map<string, BuilderDailyPlatformMetric>()
  for (const row of rows) {
    const key = row.platform === 'ios' || row.platform === 'android' ? row.platform : null
    if (!key || !row.date) continue
    const current = byDate.get(row.date) ?? {
      date: row.date,
      ios: null,
      android: null,
      ios_process_seconds: null,
      android_process_seconds: null,
    }
    const total = row.successes + row.failures
    current[key] = total > 0 ? Number(((row.successes / total) * 100).toFixed(1)) : null
    current[`${key}_process_seconds`] = row.avg_process_seconds === null || row.avg_process_seconds === undefined ? null : Number(row.avg_process_seconds.toFixed(1))
    byDate.set(row.date, current)
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date))
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

export function aggregateBuilderMetricsFromRows(rows: RawBuildRequestRow[], referenceDate = new Date()): BuilderMetricsSource {
  const platformAcc = new Map<string, Acc>()
  const dailyAcc = new Map<string, Acc>()
  const hourlyAcc = new Map<string, Acc>()
  const failureCounts = new Map<string, number>()
  const platformFailureCounts = new Map<string, number>()

  for (const row of rows) {
    const outcome = parseOutcome(row.outcome)
    if (!outcome) continue
    const platform = row.platform === 'ios' || row.platform === 'android' ? row.platform : null
    if (!platform) continue

    const platformKey = platform
    const platformBucket = platformAcc.get(platformKey) ?? emptyAcc()
    addToAcc(platformBucket, outcome, row.process_seconds, row.queue_seconds)
    platformAcc.set(platformKey, platformBucket)

    const dayKey = `${row.day}\0${platform}`
    const dayBucket = dailyAcc.get(dayKey) ?? emptyAcc()
    addToAcc(dayBucket, outcome, row.process_seconds, row.queue_seconds)
    dailyAcc.set(dayKey, dayBucket)

    const hourKey = `${row.hour_bucket}\0${platform}`
    const hourBucket = hourlyAcc.get(hourKey) ?? emptyAcc()
    addToAcc(hourBucket, outcome, row.process_seconds, row.queue_seconds)
    hourlyAcc.set(hourKey, hourBucket)

    if (outcome === 'failure' && row.last_error) {
      const reason = classifyBuilderFailure(row.last_error)
      failureCounts.set(reason, (failureCounts.get(reason) ?? 0) + 1)
      const pfKey = `${platform}\0${reason}`
      platformFailureCounts.set(pfKey, (platformFailureCounts.get(pfKey) ?? 0) + 1)
    }
  }

  const platforms: BuilderPlatformRow[] = [...platformAcc.entries()].map(([platform, acc]) => accToPlatformRow(platform, acc))
  const daily: BuilderDailyRow[] = [...dailyAcc.entries()].map(([key, acc]) => {
    const [date, platform] = key.split('\0')
    return accToDailyRow(platform, date, acc)
  })
  const hourly: BuilderDailyRow[] = [...hourlyAcc.entries()].map(([key, acc]) => {
    const [date, platform] = key.split('\0')
    return accToDailyRow(platform, date, acc)
  })

  const failures: BuilderFailureRow[] = [...failureCounts.entries()].map(([reason, failures]) => ({
    reason,
    failures,
  }))
  const platformFailures: BuilderPlatformFailureRow[] = [...platformFailureCounts.entries()].map(([key, failures]) => {
    const [platform, reason] = key.split('\0')
    return { platform, reason, failures }
  })

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
