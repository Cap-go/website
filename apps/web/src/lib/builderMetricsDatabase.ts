import postgres from 'postgres'
import { aggregateBuilderMetricsFromRows, buildContiguousHourlyPlatformRows, BUILDER_METRICS_PERIOD_DAYS, type RawBuildRequestRow } from './builderMetricsAggregation'
import { buildPublicBuilderMetrics, type PublicBuilderMetrics } from './publicBuilderMetrics'

export type BuilderPgClient = {
  queryBuildRequestRows(windowStartIso: string): Promise<RawBuildRequestRow[]>
  end(): Promise<void>
}

const BUILD_REQUEST_ROWS_SQL = `
  SELECT
    br.platform::text AS platform,
    (timezone('utc', br.created_at))::date::text AS day,
    to_char(date_trunc('hour', timezone('utc', br.created_at)), 'YYYY-MM-DD HH24:00') AS hour_bucket,
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
    br.last_error AS last_error
  FROM public.build_requests AS br
  WHERE br.created_at >= $1::timestamptz
    AND br.platform IN ('ios', 'android')
`

function mapBuildRequestRows(rows: unknown[]): RawBuildRequestRow[] {
  return rows.map((row) => {
    const record = row as Record<string, unknown>
    return {
      platform: String(record.platform ?? ''),
      day: String(record.day ?? ''),
      hour_bucket: String(record.hour_bucket ?? ''),
      outcome: record.outcome === null || record.outcome === undefined ? null : String(record.outcome),
      process_seconds: record.process_seconds === null || record.process_seconds === undefined ? null : Number(record.process_seconds),
      queue_seconds: record.queue_seconds === null || record.queue_seconds === undefined ? null : Number(record.queue_seconds),
      last_error: record.last_error === null || record.last_error === undefined ? null : String(record.last_error),
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
  })
  return {
    async queryBuildRequestRows(windowStartIso: string) {
      const rows = await sql.unsafe(BUILD_REQUEST_ROWS_SQL, [windowStartIso])
      return mapBuildRequestRows(rows)
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

  const ownedClient = options.client ?? createBuilderPgClient(options.databaseUrl)
  const shouldClose = !options.client
  try {
    const rows = await ownedClient.queryBuildRequestRows(windowStartIso)
    const source = aggregateBuilderMetricsFromRows(rows, now)
    const metrics = buildPublicBuilderMetrics(source)
    return {
      ...metrics,
      hourly_platforms: buildContiguousHourlyPlatformRows(source.hourly ?? [], now),
    }
  } finally {
    if (shouldClose) await ownedClient.end()
  }
}
