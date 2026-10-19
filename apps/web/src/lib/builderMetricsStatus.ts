/**
 * Terminal job status mapping for public builder metrics (capgo_builder `jobs.status`).
 *
 * `released` is a runner hand-off / re-queue state, not a completed build outcome.
 * `cancelled` is user- or system-cancelled before a terminal success/failure.
 * Both are excluded from success-rate denominators alongside in-flight statuses.
 */
export const BUILDER_JOB_STATUS_SUCCESS = ['succeeded'] as const
export const BUILDER_JOB_STATUS_FAILURE = ['failed', 'expired'] as const
export const BUILDER_JOB_STATUS_EXCLUDED = ['cancelled', 'released'] as const
export const BUILDER_JOB_STATUS_IN_FLIGHT = ['queued', 'reserved', 'ready', 'waiting_runner', 'running'] as const

export function builderJobOutcomeSqlCase(column = 'status') {
  const success = BUILDER_JOB_STATUS_SUCCESS.map((s) => `'${s}'`).join(', ')
  const failure = BUILDER_JOB_STATUS_FAILURE.map((s) => `'${s}'`).join(', ')
  return `CASE WHEN ${column} IN (${success}) THEN 'success' WHEN ${column} IN (${failure}) THEN 'failure' ELSE NULL END`
}
