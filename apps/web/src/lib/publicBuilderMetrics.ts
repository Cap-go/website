// Builder metrics are computed by the builder service, the single source of /builder-data.
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

export type BuilderXcodeVersionMetric = { version: string; share: number }

export type IosDependencyManagerKey = 'spm' | 'cocoapods'

export type BuilderDependencyManagerMetric = { key: IosDependencyManagerKey; share: number }

export type BuilderDailyToolchainMetric = {
  date: string
  xcode_versions: BuilderXcodeVersionMetric[]
  ios_dependency_managers: BuilderDependencyManagerMetric[]
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
  /** Share of the iOS builds of the period by Xcode major. */
  xcode_versions: BuilderXcodeVersionMetric[]
  /** Share of the iOS builds of the period using SPM or CocoaPods, as sent by the CLI. */
  ios_dependency_managers: BuilderDependencyManagerMetric[]
  /** The same shares for each UTC day of the daily trend. */
  daily_ios_toolchain: BuilderDailyToolchainMetric[]
}
