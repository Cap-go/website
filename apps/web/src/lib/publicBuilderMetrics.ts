export const BUILDER_METRICS_PATH = '/builder-metrics.json'
export const BUILDER_METRICS_CACHE_TTL_SECONDS = 300

export type BuilderPlatformKey = 'ios' | 'android'

export type BuilderFailureMetric = { reason: string; share: number }

export type BuilderPlatformMetric = {
  key: BuilderPlatformKey
  share: number
  success_rate: number | null
  avg_process_seconds: number | null
  avg_queue_seconds: number | null
  top_failure: BuilderFailureMetric | null
}

export type BuilderDailyPlatformMetric = {
  date: string
  ios: number | null
  android: number | null
  ios_process_seconds: number | null
  android_process_seconds: number | null
}

export type PublicBuilderMetrics = {
  success_rate: number
  avg_process_seconds: number | null
  avg_queue_seconds: number | null
  period_days: number
  daily_window_days: number
  updated_at: string
  daily_platforms: BuilderDailyPlatformMetric[]
  hourly_platforms: BuilderDailyPlatformMetric[]
  failures: BuilderFailureMetric[]
  platforms: BuilderPlatformMetric[]
}

export type BuilderPlatformRow = {
  platform: string
  successes: number
  failures: number
  avg_process_seconds: number | null
  avg_queue_seconds: number | null
}

export type BuilderDailyRow = {
  date: string
  platform: string
  successes: number
  failures: number
  avg_process_seconds: number | null
  avg_queue_seconds: number | null
}

export type BuilderHourlyRow = BuilderDailyRow

export type BuilderFailureRow = {
  reason: string
  failures: number
}

export type BuilderPlatformFailureRow = {
  platform: string
  reason: string
  failures: number
}

export type BuilderMetricsSource = {
  updated_at?: string
  platforms: BuilderPlatformRow[]
  daily: BuilderDailyRow[]
  hourly?: BuilderHourlyRow[]
  failures: BuilderFailureRow[]
  platformFailures: BuilderPlatformFailureRow[]
}

function roundPublic(value: number) {
  return Number(value.toFixed(1))
}

function numberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? number : null
}

function rateFromOutcomes(successes: number, failures: number): number | null {
  const total = successes + failures
  return total > 0 ? roundPublic((successes / total) * 100) : null
}

function shareFromParts(part: number, total: number) {
  return total > 0 ? roundPublic((part / total) * 100) : 0
}

export function classifyBuilderFailure(reason: string) {
  const text = reason.toLowerCase()
  if (text.includes('script_failure')) return 'script_failure'
  if (text.includes('timeout')) return 'timeout'
  if (text.includes('runner_system_failure')) return 'runner_system_failure'
  if (text.includes('runner is not available') || text.includes('runner unavailable')) return 'runner_unavailable'
  return 'other'
}

function rollupFailures(rows: BuilderFailureRow[]) {
  const totals = new Map<string, number>()
  for (const row of rows) {
    const reason = classifyBuilderFailure(row.reason)
    totals.set(reason, (totals.get(reason) ?? 0) + (Number(row.failures) || 0))
  }
  const total = [...totals.values()].reduce((sum, value) => sum + value, 0)
  return [...totals]
    .map(([reason, failures]) => ({ reason, share: shareFromParts(failures, total), failures }))
    .filter((item) => item.failures > 0)
    .sort((a, b) => b.share - a.share || a.reason.localeCompare(b.reason))
    .map(({ reason, share }) => ({ reason, share }))
}

function topFailureForPlatform(rows: BuilderPlatformFailureRow[], platform: string) {
  return rollupFailures(rows.filter((row) => row.platform === platform).map((row) => ({ reason: row.reason, failures: row.failures })))[0] ?? null
}

function platformKey(value: string): BuilderPlatformKey | null {
  if (value === 'ios' || value === 'android') return value
  return null
}

export function buildPlatformTrendRows(rows: BuilderDailyRow[]): BuilderDailyPlatformMetric[] {
  const byDate = new Map<string, BuilderDailyPlatformMetric>()
  for (const row of rows) {
    const key = platformKey(row.platform)
    if (!key || !row.date) continue
    const current = byDate.get(row.date) ?? {
      date: row.date,
      ios: null,
      android: null,
      ios_process_seconds: null,
      android_process_seconds: null,
    }
    current[key] = rateFromOutcomes(Number(row.successes) || 0, Number(row.failures) || 0)
    current[`${key}_process_seconds`] = numberOrNull(row.avg_process_seconds)
    byDate.set(row.date, current)
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date))
}

export function buildPublicBuilderMetrics(source: BuilderMetricsSource): PublicBuilderMetrics {
  const platforms = source.platforms
    .map((row) => {
      const key = platformKey(row.platform)
      if (!key) return null
      const successes = Number(row.successes) || 0
      const failures = Number(row.failures) || 0
      return {
        key,
        outcomes: successes + failures,
        success_rate: rateFromOutcomes(successes, failures),
        avg_process_seconds: numberOrNull(row.avg_process_seconds),
        avg_queue_seconds: numberOrNull(row.avg_queue_seconds),
        top_failure: topFailureForPlatform(source.platformFailures, key),
      }
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)

  const outcomeTotal = platforms.reduce((sum, row) => sum + row.outcomes, 0)
  const successTotal = source.platforms.reduce((sum, row) => {
    return platformKey(row.platform) ? sum + (Number(row.successes) || 0) : sum
  }, 0)
  const failureTotal = source.platforms.reduce((sum, row) => {
    return platformKey(row.platform) ? sum + (Number(row.failures) || 0) : sum
  }, 0)

  const weightedProcess = platforms.reduce((sum, row) => {
    return row.avg_process_seconds === null ? sum : sum + row.avg_process_seconds * row.outcomes
  }, 0)
  const processWeight = platforms.reduce((sum, row) => {
    return row.avg_process_seconds === null ? sum : sum + row.outcomes
  }, 0)
  const weightedQueue = platforms.reduce((sum, row) => {
    return row.avg_queue_seconds === null ? sum : sum + row.avg_queue_seconds * row.outcomes
  }, 0)
  const queueWeight = platforms.reduce((sum, row) => {
    return row.avg_queue_seconds === null ? sum : sum + row.outcomes
  }, 0)

  return {
    success_rate: rateFromOutcomes(successTotal, failureTotal) ?? 0,
    avg_process_seconds: processWeight ? roundPublic(weightedProcess / processWeight) : null,
    avg_queue_seconds: queueWeight ? roundPublic(weightedQueue / queueWeight) : null,
    period_days: 30,
    daily_window_days: 90,
    updated_at: source.updated_at ?? new Date().toISOString(),
    daily_platforms: buildPlatformTrendRows(source.daily),
    hourly_platforms: buildPlatformTrendRows(source.hourly ?? []),
    failures: rollupFailures(source.failures),
    platforms: platforms
      .toSorted((a, b) => b.outcomes - a.outcomes || a.key.localeCompare(b.key))
      .map(({ key, outcomes, success_rate, avg_process_seconds, avg_queue_seconds, top_failure }) => ({
        key,
        share: shareFromParts(outcomes, outcomeTotal),
        success_rate,
        avg_process_seconds: avg_process_seconds === null ? null : roundPublic(avg_process_seconds),
        avg_queue_seconds: avg_queue_seconds === null ? null : roundPublic(avg_queue_seconds),
        top_failure,
      })),
  }
}

