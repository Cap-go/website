import cachedMetrics from '@/data/live-update-metrics.json'

export type DailyMetric = { date: string; success_rate: number }
export type FailureMetric = { reason: string; share: number }
export type BreakdownMetric = {
  key: string
  share: number
  success_rate: number | null
  top_failure: { reason: string; share: number } | null
}
export type LiveUpdateMetrics = {
  success_rate: number
  updated_at: string
  daily: DailyMetric[]
  failures: FailureMetric[]
  platforms: BreakdownMetric[]
  countries: BreakdownMetric[]
  updater_versions: BreakdownMetric[]
  source?: 'api' | 'cache'
}

const FALLBACK = cachedMetrics as LiveUpdateMetrics

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function percentage(value: unknown) {
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : 0
}

function nullablePercentage(value: unknown) {
  if (value === null || value === undefined || value === '') return null
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : null
}

function normalizeBreakdown(value: unknown): BreakdownMetric | null {
  if (!isRecord(value) || typeof value.key !== 'string' || !value.key) return null
  const top = isRecord(value.top_failure)
    ? {
        reason: typeof value.top_failure.reason === 'string' ? value.top_failure.reason : '',
        share: percentage(value.top_failure.share),
      }
    : null
  return {
    key: value.key,
    share: percentage(value.share),
    success_rate: nullablePercentage(value.success_rate),
    top_failure: top && top.reason ? top : null,
  }
}

export function normalizeLiveUpdateMetrics(value: unknown): LiveUpdateMetrics | null {
  if (!isRecord(value) || typeof value.updated_at !== 'string' || !Array.isArray(value.daily) || !Array.isArray(value.failures)) {
    return null
  }

  const daily = value.daily
    .map((item) => {
      if (!isRecord(item) || typeof item.date !== 'string') return null
      return { date: item.date, success_rate: percentage(item.success_rate) }
    })
    .filter((item): item is DailyMetric => item !== null)

  const failures = value.failures
    .map((item) => {
      if (!isRecord(item) || typeof item.reason !== 'string') return null
      return { reason: item.reason, share: percentage(item.share) }
    })
    .filter((item): item is FailureMetric => item !== null)

  let platforms: BreakdownMetric[] = []
  if (Array.isArray(value.platforms)) {
    platforms = value.platforms.map(normalizeBreakdown).filter((item): item is BreakdownMetric => item !== null)
  } else if (isRecord(value.platforms)) {
    const legacyPlatforms = value.platforms
    platforms = (['ios', 'android', 'electron'] as const)
      .map((key) => ({
        key,
        share: percentage(legacyPlatforms[key]),
        success_rate: null,
        top_failure: null,
      }))
      .filter((item) => item.share > 0)
  }

  const countries = Array.isArray(value.countries) ? value.countries.map(normalizeBreakdown).filter((item): item is BreakdownMetric => item !== null) : []

  let updater_versions: BreakdownMetric[] = []
  if (Array.isArray(value.updater_versions)) {
    const breakdowns = value.updater_versions.map(normalizeBreakdown).filter((item): item is BreakdownMetric => item !== null)

    if (breakdowns.length > 0) {
      updater_versions = breakdowns
    } else {
      const legacyRows = value.updater_versions
        .map((item) => {
          if (!isRecord(item) || typeof item.date !== 'string' || typeof item.version !== 'string') return null
          return { date: item.date, version: item.version, share: percentage(item.share) }
        })
        .filter((item): item is { date: string; version: string; share: number } => item !== null)
      const dayCount = new Set(legacyRows.map((item) => item.date)).size
      const totals = new Map<string, number>()
      for (const item of legacyRows) {
        totals.set(item.version, (totals.get(item.version) ?? 0) + item.share)
      }
      updater_versions = [...totals]
        .map(([key, share]) => ({
          key,
          share: dayCount ? share / dayCount : 0,
          success_rate: null,
          top_failure: null,
        }))
        .sort((a, b) => b.share - a.share)
        .slice(0, 10)
    }
  }

  return {
    success_rate: percentage(value.success_rate),
    updated_at: value.updated_at,
    daily,
    failures,
    platforms,
    countries,
    updater_versions,
  }
}

export function getCachedLiveUpdateMetrics(): LiveUpdateMetrics {
  return { ...FALLBACK, source: 'cache' }
}

export async function fetchLiveUpdateMetrics(baseApiUrl: string): Promise<LiveUpdateMetrics | null> {
  try {
    const response = await fetch(`${baseApiUrl.replace(/\/$/, '')}/private/website_stats/live_updates`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return null
    const metrics = normalizeLiveUpdateMetrics(await response.json())
    return metrics ? { ...metrics, source: 'api' } : null
  } catch {
    return null
  }
}

export async function resolveLiveUpdateMetrics(baseApiUrl: string): Promise<LiveUpdateMetrics> {
  const live = await fetchLiveUpdateMetrics(baseApiUrl)
  return live ?? getCachedLiveUpdateMetrics()
}

/** JSON safe to embed inside <script> via set:html (blocks </script> breakouts). */
export function jsonForInlineScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
