import {
  aggregateBuilderMetricsFromSqlRollups,
  buildContiguousDailyPlatformRows,
  buildContiguousHourlyPlatformRows,
  BUILDER_METRICS_DAILY_WINDOW_DAYS,
  BUILDER_METRICS_PERIOD_DAYS,
  buildRollingHourlyWindowStart,
  dailyChartWindowStartMs,
  type BuilderSqlRollupRow,
} from './builderMetricsAggregation'
import { builderJobOutcomeSqlCase } from './builderMetricsStatus'
import { buildPublicBuilderMetrics, type PublicBuilderMetrics } from './publicBuilderMetrics'

/** capgo_builder stores job timestamps as Unix milliseconds (see capgo_builder src/db.ts). */
export const BUILDER_JOB_TIMESTAMPS_ARE_MS = true

export type BuilderD1Database = {
  prepare(query: string): {
    bind(...values: unknown[]): {
      all<T = unknown>(): Promise<{ results?: T[] }>
    }
  }
}

export type BuilderD1Client = {
  queryAggregatedRollups(dailyWindowStartMs: number, kpiWindowStartMs: number, hourlyWindowStartMs: number): Promise<BuilderSqlRollupRow[]>
}

const outcomeCase = builderJobOutcomeSqlCase('status')

export const BUILDER_METRICS_ROLLUP_SQL = `
  WITH terminal AS (
    SELECT
      json_extract(payload_descriptor, '$.buildOptions.platform') AS platform,
      strftime('%Y-%m-%d', datetime(created_at / 1000, 'unixepoch')) AS day,
      strftime('%Y-%m-%d %H:00', datetime(created_at / 1000, 'unixepoch')) AS hour_bucket,
      created_at AS created_at,
      ${outcomeCase} AS outcome,
      CASE
        WHEN started_at IS NOT NULL
          AND completed_at IS NOT NULL
          AND completed_at >= started_at
        THEN (completed_at - started_at) / 1000.0
        ELSE NULL
      END AS process_seconds,
      runner_wait_ms / 1000.0 AS queue_seconds,
      CASE
        WHEN status IN ('failed', 'expired') THEN
          CASE
            WHEN lower(substr(COALESCE(error, ''), 1, 512)) LIKE '%script_failure%' THEN 'script_failure'
            WHEN lower(substr(COALESCE(error, ''), 1, 512)) LIKE '%timeout%' THEN 'timeout'
            WHEN lower(substr(COALESCE(error, ''), 1, 512)) LIKE '%runner_system_failure%' THEN 'runner_system_failure'
            WHEN lower(substr(COALESCE(error, ''), 1, 512)) LIKE '%runner is not available%'
              OR lower(substr(COALESCE(error, ''), 1, 512)) LIKE '%runner unavailable%' THEN 'runner_unavailable'
            ELSE 'other'
          END
        ELSE NULL
      END AS failure_reason
    FROM jobs
    WHERE created_at >= ?1
      AND json_extract(payload_descriptor, '$.buildOptions.platform') IN ('ios', 'android')
  ),
  scored AS (
    SELECT * FROM terminal WHERE outcome IS NOT NULL
  )
  SELECT
    'platform' AS rollup,
    platform,
    NULL AS bucket,
    SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END) AS successes,
    SUM(CASE WHEN outcome = 'failure' THEN 1 ELSE 0 END) AS failures,
    AVG(process_seconds) AS avg_process_seconds,
    AVG(queue_seconds) AS avg_queue_seconds
  FROM scored
  WHERE created_at >= ?2
  GROUP BY platform

  UNION ALL

  SELECT
    'daily',
    platform,
    day AS bucket,
    SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END),
    SUM(CASE WHEN outcome = 'failure' THEN 1 ELSE 0 END),
    AVG(process_seconds),
    AVG(queue_seconds)
  FROM scored
  GROUP BY platform, day

  UNION ALL

  SELECT
    'hourly',
    platform,
    hour_bucket AS bucket,
    SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END),
    SUM(CASE WHEN outcome = 'failure' THEN 1 ELSE 0 END),
    AVG(process_seconds),
    AVG(queue_seconds)
  FROM scored
  WHERE created_at >= ?3
  GROUP BY platform, hour_bucket

  UNION ALL

  SELECT
    'failure',
    NULL,
    failure_reason AS bucket,
    0,
    COUNT(*),
    NULL,
    NULL
  FROM scored
  WHERE outcome = 'failure' AND failure_reason IS NOT NULL AND created_at >= ?2
  GROUP BY failure_reason

  UNION ALL

  SELECT
    'platform_failure',
    platform,
    failure_reason AS bucket,
    0,
    COUNT(*),
    NULL,
    NULL
  FROM scored
  WHERE outcome = 'failure' AND failure_reason IS NOT NULL AND created_at >= ?2
  GROUP BY platform, failure_reason
`

function mapRollupRows(rows: unknown[]): BuilderSqlRollupRow[] {
  return rows.map((row) => {
    const record = row as Record<string, unknown>
    return {
      rollup: String(record.rollup ?? ''),
      platform: record.platform === null || record.platform === undefined ? null : String(record.platform),
      bucket: record.bucket === null || record.bucket === undefined ? null : String(record.bucket),
      successes: Number(record.successes) || 0,
      failures: Number(record.failures) || 0,
      avg_process_seconds: record.avg_process_seconds === null || record.avg_process_seconds === undefined ? null : Number(record.avg_process_seconds),
      avg_queue_seconds: record.avg_queue_seconds === null || record.avg_queue_seconds === undefined ? null : Number(record.avg_queue_seconds),
    }
  })
}

export function createBuilderD1Client(db: BuilderD1Database): BuilderD1Client {
  return {
    async queryAggregatedRollups(dailyWindowStartMs, kpiWindowStartMs, hourlyWindowStartMs) {
      const statement = db.prepare(BUILDER_METRICS_ROLLUP_SQL).bind(dailyWindowStartMs, kpiWindowStartMs, hourlyWindowStartMs)
      const result = await statement.all()
      return mapRollupRows(result.results ?? [])
    },
  }
}

function rollingKpiWindowStartMs(now: Date, days: number) {
  const start = new Date(now)
  start.setUTCDate(start.getUTCDate() - days)
  return start.getTime()
}

export async function fetchPublicBuilderMetricsFromD1(options: { db: BuilderD1Database; now?: Date; client?: BuilderD1Client }): Promise<PublicBuilderMetrics> {
  const now = options.now ?? new Date()
  const dailyWindowStartMs = dailyChartWindowStartMs(now, BUILDER_METRICS_DAILY_WINDOW_DAYS)
  const kpiWindowStartMs = rollingKpiWindowStartMs(now, BUILDER_METRICS_PERIOD_DAYS)
  const hourlyWindowStartMs = buildRollingHourlyWindowStart(now).getTime()

  const ownedClient = options.client ?? createBuilderD1Client(options.db)
  const rows = await ownedClient.queryAggregatedRollups(dailyWindowStartMs, kpiWindowStartMs, hourlyWindowStartMs)
  const source = aggregateBuilderMetricsFromSqlRollups(rows, now)
  const metrics = buildPublicBuilderMetrics(source)
  return {
    ...metrics,
    daily_window_days: BUILDER_METRICS_DAILY_WINDOW_DAYS,
    daily_platforms: buildContiguousDailyPlatformRows(source.daily, now),
    hourly_platforms: buildContiguousHourlyPlatformRows(source.hourly ?? [], now),
  }
}
