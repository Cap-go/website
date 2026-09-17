import cachedMetrics from '@/data/builder-metrics.json'
import type { BuilderDailyPlatformMetric, BuilderFailureMetric, BuilderPlatformMetric, PublicBuilderMetrics } from './publicBuilderMetrics'

export { jsonForInlineScript } from './liveUpdateMetrics'

export type BuilderMetrics = PublicBuilderMetrics & { source?: 'api' | 'cache' }

const FALLBACK = cachedMetrics as BuilderMetrics

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

function nullableNumber(value: unknown) {
  if (value === null || value === undefined || value === '') return null
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? number : null
}

function normalizeFailure(value: unknown): BuilderFailureMetric | null {
  if (!isRecord(value) || typeof value.reason !== 'string' || !value.reason) return null
  return { reason: value.reason, share: percentage(value.share) }
}

function normalizePlatform(value: unknown): BuilderPlatformMetric | null {
  if (!isRecord(value) || (value.key !== 'ios' && value.key !== 'android')) return null
  const top = normalizeFailure(value.top_failure)
  return {
    key: value.key,
    share: percentage(value.share),
    success_rate: nullablePercentage(value.success_rate),
    avg_process_seconds: nullableNumber(value.avg_process_seconds),
    avg_queue_seconds: nullableNumber(value.avg_queue_seconds),
    top_failure: top,
  }
}

export function normalizeBuilderMetrics(value: unknown): BuilderMetrics | null {
  if (!isRecord(value) || typeof value.updated_at !== 'string' || !Array.isArray(value.daily_platforms) || !Array.isArray(value.failures) || !Array.isArray(value.platforms)) {
    return null
  }

  const daily_platforms = value.daily_platforms
    .map((item) => {
      if (!isRecord(item) || typeof item.date !== 'string') return null
      return {
        date: item.date,
        ios: nullablePercentage(item.ios),
        android: nullablePercentage(item.android),
        ios_process_seconds: nullableNumber(item.ios_process_seconds),
        android_process_seconds: nullableNumber(item.android_process_seconds),
      }
    })
    .filter((item): item is BuilderDailyPlatformMetric => item !== null)

  const failures = value.failures.map(normalizeFailure).filter((item): item is BuilderFailureMetric => item !== null)
  const platforms = value.platforms.map(normalizePlatform).filter((item): item is BuilderPlatformMetric => item !== null)

  return {
    success_rate: percentage(value.success_rate),
    avg_process_seconds: nullableNumber(value.avg_process_seconds),
    avg_queue_seconds: nullableNumber(value.avg_queue_seconds),
    period_days: 30,
    updated_at: value.updated_at,
    daily_platforms,
    failures,
    platforms,
  }
}

export function getCachedBuilderMetrics(): BuilderMetrics {
  return { ...(normalizeBuilderMetrics(FALLBACK) ?? FALLBACK), source: 'cache' }
}

export async function resolveBuilderMetrics(): Promise<BuilderMetrics> {
  return getCachedBuilderMetrics()
}
