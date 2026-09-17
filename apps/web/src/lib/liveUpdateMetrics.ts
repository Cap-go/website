import cachedMetrics from '@/data/live-update-metrics.json'
import { LIVE_UPDATE_METRICS_PATH } from './publicLiveUpdateMetrics'

export type DailyMetric = { date: string; success_rate: number }
export type DailyPlatformMetric = { date: string; ios: number | null; android: number | null }
export type FailureMetric = { reason: string; share: number }
export type BreakdownMetric = {
  key: string
  share: number
  success_rate: number | null
  top_failure: { reason: string; share: number } | null
}
export type LiveUpdateMetrics = {
  success_rate: number
  first_try_rate: number | null
  first_day_rate: number | null
  first_day_success_rate: number | null
  rollback_rate: number | null
  zip_success_rate: number | null
  delta_success_rate: number | null
  updated_at: string
  daily: DailyMetric[]
  daily_platforms: DailyPlatformMetric[]
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

  const daily_platforms = Array.isArray(value.daily_platforms)
    ? value.daily_platforms
        .map((item) => {
          if (!isRecord(item) || typeof item.date !== 'string') return null
          return { date: item.date, ios: nullablePercentage(item.ios), android: nullablePercentage(item.android) }
        })
        .filter((item): item is DailyPlatformMetric => item !== null)
    : []

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
    first_try_rate: nullablePercentage(value.first_try_rate),
    first_day_rate: nullablePercentage(value.first_day_rate),
    first_day_success_rate: nullablePercentage(value.first_day_success_rate),
    rollback_rate: nullablePercentage(value.rollback_rate),
    zip_success_rate: nullablePercentage(value.zip_success_rate),
    delta_success_rate: nullablePercentage(value.delta_success_rate),
    updated_at: value.updated_at,
    daily,
    daily_platforms,
    failures,
    platforms,
    countries,
    updater_versions,
  }
}

export function getCachedLiveUpdateMetrics(): LiveUpdateMetrics {
  return { ...(normalizeLiveUpdateMetrics(FALLBACK) ?? { ...FALLBACK, daily_platforms: [] }), source: 'cache' }
}

export async function fetchLiveUpdateMetrics(endpoint = LIVE_UPDATE_METRICS_PATH): Promise<LiveUpdateMetrics | null> {
  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return null
    const metrics = normalizeLiveUpdateMetrics(await response.json())
    return metrics ? { ...metrics, source: 'api' } : null
  } catch {
    return null
  }
}

export async function resolveLiveUpdateMetrics(): Promise<LiveUpdateMetrics> {
  return getCachedLiveUpdateMetrics()
}

/** JSON safe to embed inside <script> via set:html (blocks </script> breakouts). */
export function jsonForInlineScript(value: unknown): string {
  return JSON.stringify(value)
    .replaceAll('<', String.raw`\u003c`)
    .replaceAll('>', String.raw`\u003e`)
    .replaceAll('&', String.raw`\u0026`)
    .replaceAll('\u2028', String.raw`\u2028`)
    .replaceAll('\u2029', String.raw`\u2029`)
}
