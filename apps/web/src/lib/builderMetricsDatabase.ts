import postgres from 'postgres'
import {
  aggregateBuilderMetricsFromSqlRollups,
  buildContiguousHourlyPlatformRows,
  BUILDER_METRICS_PERIOD_DAYS,
  buildRollingHourlyWindowStart,
  type BuilderSqlRollupRow,
} from './builderMetricsAggregation'
import { buildPublicBuilderMetrics, type PublicBuilderMetrics } from './publicBuilderMetrics'

export type BuilderPgClient = {
  queryAggregatedRollups(windowStartIso: string, hourlyWindowStartIso: string): Promise<BuilderSqlRollupRow[]>
  end(): Promise<void>
}

export const BUILDER_METRICS_ROLLUP_SQL = `
  WITH terminal AS (
    SELECT
      br.platform::text AS platform,
      (timezone('utc', br.created_at))::date::text AS day,
      to_char(date_trunc('hour', timezone('utc', br.created_at)), 'YYYY-MM-DD HH24:00') AS hour_bucket,
      br.created_at AS created_at,
      CASE
        WHEN br.status IN ('succeeded', 'completed') THEN 'success'
        WHEN br.status IN ('failed', 'cancelled', 'canceled', 'expired') THEN 'failure'
        ELSE NULL
      END AS outcome,
      CASE
        WHEN br.started_at IS NOT NULL
          AND br.completed_at IS NOT NULL
          AND br.completed_at >= br.started_at
        THEN EXTRACT(EPOCH FROM (br.completed_at - br.started_at))::double precision
        ELSE NULL
      END AS process_seconds,
      br.runner_wait_seconds::double precision AS queue_seconds,
      CASE
        WHEN br.status IN ('failed', 'cancelled', 'canceled', 'expired') THEN
          CASE
            WHEN lower(left(COALESCE(br.last_error, ''), 512)) LIKE '%script_failure%' THEN 'script_failure'
            WHEN lower(left(COALESCE(br.last_error, ''), 512)) LIKE '%timeout%' THEN 'timeout'
            WHEN lower(left(COALESCE(br.last_error, ''), 512)) LIKE '%runner_system_failure%' THEN 'runner_system_failure'
            WHEN lower(left(COALESCE(br.last_error, ''), 512)) LIKE '%runner is not available%'
              OR lower(left(COALESCE(br.last_error, ''), 512)) LIKE '%runner unavailable%' THEN 'runner_unavailable'
            ELSE 'other'
          END
        ELSE NULL
      END AS failure_reason
    FROM public.build_requests AS br
    WHERE br.created_at >= $1::timestamptz
      AND br.platform IN ('ios', 'android')
  ),
  scored AS (
    SELECT * FROM terminal WHERE outcome IS NOT NULL
  )
  SELECT
    'platform'::text AS rollup,
    platform,
    NULL::text AS bucket,
    COUNT(*) FILTER (WHERE outcome = 'success')::int AS successes,
    COUNT(*) FILTER (WHERE outcome = 'failure')::int AS failures,
    AVG(process_seconds) FILTER (WHERE process_seconds IS NOT NULL) AS avg_process_seconds,
    AVG(queue_seconds) FILTER (WHERE queue_seconds IS NOT NULL) AS avg_queue_seconds
  FROM scored
  GROUP BY platform

  UNION ALL

  SELECT
    'daily'::text,
    platform,
    day AS bucket,
    COUNT(*) FILTER (WHERE outcome = 'success')::int,
    COUNT(*) FILTER (WHERE outcome = 'failure')::int,
    AVG(process_seconds) FILTER (WHERE process_seconds IS NOT NULL),
    AVG(queue_seconds) FILTER (WHERE queue_seconds IS NOT NULL)
  FROM scored
  GROUP BY platform, day

  UNION ALL

  SELECT
    'hourly'::text,
    platform,
    hour_bucket AS bucket,
    COUNT(*) FILTER (WHERE outcome = 'success')::int,
    COUNT(*) FILTER (WHERE outcome = 'failure')::int,
    AVG(process_seconds) FILTER (WHERE process_seconds IS NOT NULL),
    AVG(queue_seconds) FILTER (WHERE queue_seconds IS NOT NULL)
  FROM scored
  WHERE created_at >= $2::timestamptz
  GROUP BY platform, hour_bucket

  UNION ALL

  SELECT
    'failure'::text,
    NULL::text,
    failure_reason AS bucket,
    0,
    COUNT(*)::int,
    NULL::double precision,
    NULL::double precision
  FROM scored
  WHERE outcome = 'failure' AND failure_reason IS NOT NULL
  GROUP BY failure_reason

  UNION ALL

  SELECT
    'platform_failure'::text,
    platform,
    failure_reason AS bucket,
    0,
    COUNT(*)::int,
    NULL::double precision,
    NULL::double precision
  FROM scored
  WHERE outcome = 'failure' AND failure_reason IS NOT NULL
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

export function createBuilderPgClient(databaseUrl: string): BuilderPgClient {
  const sql = postgres(databaseUrl, {
    max: 1,
    prepare: false,
    idle_timeout: 5,
    connect_timeout: 15,
    fetch_types: false,
    ssl: 'require',
  })
  return {
    async queryAggregatedRollups(windowStartIso: string, hourlyWindowStartIso: string) {
      const rows = await sql.unsafe(BUILDER_METRICS_ROLLUP_SQL, [windowStartIso, hourlyWindowStartIso])
      return mapRollupRows(rows)
    },
    async end() {
      await sql.end({ timeout: 5 })
    },
  }
}

export async function fetchPublicBuilderMetricsFromDatabase(options: { databaseUrl: string; now?: Date; client?: BuilderPgClient }): Promise<PublicBuilderMetrics> {
  const now = options.now ?? new Date()
  const windowStart = new Date(now)
  windowStart.setUTCDate(windowStart.getUTCDate() - BUILDER_METRICS_PERIOD_DAYS)
  const windowStartIso = windowStart.toISOString()
  const hourlyWindowStartIso = buildRollingHourlyWindowStart(now).toISOString()

  const ownedClient = options.client ?? createBuilderPgClient(options.databaseUrl)
  const shouldClose = !options.client
  try {
    const rows = await ownedClient.queryAggregatedRollups(windowStartIso, hourlyWindowStartIso)
    const source = aggregateBuilderMetricsFromSqlRollups(rows, now)
    const metrics = buildPublicBuilderMetrics(source)
    return {
      ...metrics,
      hourly_platforms: buildContiguousHourlyPlatformRows(source.hourly ?? [], now),
    }
  } finally {
    if (shouldClose) await ownedClient.end()
  }
}
