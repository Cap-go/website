import type {
  BuilderDailyPlatformMetric,
  BuilderDailyToolchainMetric,
  BuilderDependencyManagerMetric,
  BuilderFailureMetric,
  BuilderPlatformMetric,
  BuilderXcodeVersionMetric,
  PublicBuilderMetrics,
} from './publicBuilderMetrics'

export type BuilderMetrics = PublicBuilderMetrics & { source?: 'api' | 'cache' }

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

function normalizeXcodeVersion(value: unknown): BuilderXcodeVersionMetric | null {
  if (!isRecord(value) || typeof value.version !== 'string' || !/^\d+$/.test(value.version)) return null
  return { version: value.version, share: percentage(value.share) }
}

function normalizeDependencyManager(value: unknown): BuilderDependencyManagerMetric | null {
  if (!isRecord(value) || (value.key !== 'spm' && value.key !== 'cocoapods')) return null
  return { key: value.key, share: percentage(value.share) }
}

function normalizeXcodeVersions(value: unknown) {
  return (Array.isArray(value) ? value : []).map(normalizeXcodeVersion).filter((item): item is BuilderXcodeVersionMetric => item !== null)
}

function normalizeDependencyManagers(value: unknown) {
  return (Array.isArray(value) ? value : []).map(normalizeDependencyManager).filter((item): item is BuilderDependencyManagerMetric => item !== null)
}

function normalizeToolchainTrendRows(value: unknown): BuilderDailyToolchainMetric[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is Record<string, unknown> & { date: string } => isRecord(item) && typeof item.date === 'string')
    .map((item) => ({
      date: item.date,
      xcode_versions: normalizeXcodeVersions(item.xcode_versions),
      ios_dependency_managers: normalizeDependencyManagers(item.ios_dependency_managers),
    }))
}

function normalizePlatformTrendRows(value: unknown) {
  if (!Array.isArray(value)) return []
  return value
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
}

export function emptyBuilderMetrics(): BuilderMetrics {
  return {
    success_rate: 0,
    avg_process_seconds: null,
    avg_queue_seconds: null,
    period_days: 30,
    daily_window_days: 90,
    updated_at: '',
    daily_platforms: [],
    hourly_platforms: [],
    failures: [],
    platforms: [],
    xcode_versions: [],
    ios_dependency_managers: [],
    daily_ios_toolchain: [],
  }
}

export function normalizeBuilderMetrics(value: unknown): BuilderMetrics | null {
  if (
    !isRecord(value) ||
    typeof value.updated_at !== 'string' ||
    !value.updated_at ||
    !Array.isArray(value.daily_platforms) ||
    !Array.isArray(value.failures) ||
    !Array.isArray(value.platforms)
  ) {
    return null
  }

  const daily_platforms = normalizePlatformTrendRows(value.daily_platforms)
  const hourly_platforms = normalizePlatformTrendRows(value.hourly_platforms)

  const failures = value.failures.map(normalizeFailure).filter((item): item is BuilderFailureMetric => item !== null)
  const platforms = value.platforms.map(normalizePlatform).filter((item): item is BuilderPlatformMetric => item !== null)
  // Older builder payloads have no toolchain shares: the page then shows none.
  const xcode_versions = normalizeXcodeVersions(value.xcode_versions)
  const ios_dependency_managers = normalizeDependencyManagers(value.ios_dependency_managers)
  const daily_ios_toolchain = normalizeToolchainTrendRows(value.daily_ios_toolchain)

  return {
    success_rate: percentage(value.success_rate),
    avg_process_seconds: nullableNumber(value.avg_process_seconds),
    avg_queue_seconds: nullableNumber(value.avg_queue_seconds),
    period_days: 30,
    daily_window_days: typeof value.daily_window_days === 'number' ? value.daily_window_days : 90,
    updated_at: value.updated_at,
    daily_platforms,
    hourly_platforms,
    failures,
    platforms,
    xcode_versions,
    ios_dependency_managers,
    daily_ios_toolchain,
  }
}
