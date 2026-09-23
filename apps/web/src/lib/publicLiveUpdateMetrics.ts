import { TREND_HISTORY_DAYS } from './metricsTrendChart'

export const LIVE_UPDATE_METRICS_PATH = '/live-update-metrics.json'
export const LIVE_UPDATE_METRICS_CACHE_TTL_SECONDS = 300
export const LIVE_UPDATE_KPI_WINDOW_DAYS = 30

export type PublicBreakdownMetric = {
  key: string
  share: number
  success_rate: number | null
  top_failure: { reason: string; share: number } | null
}

export type PublicDailyPlatformMetric = {
  date: string
  ios: number | null
  android: number | null
}

export type PublicLiveUpdateMetrics = {
  success_rate: number
  first_try_rate: number | null
  first_day_rate: number | null
  first_day_success_rate: number | null
  rollback_rate: number | null
  zip_success_rate: number | null
  delta_success_rate: number | null
  period_days: number
  updated_at: string
  daily: Array<{ date: string; success_rate: number }>
  daily_platforms: PublicDailyPlatformMetric[]
  failures: Array<{ reason: string; share: number }>
  platforms: PublicBreakdownMetric[]
  countries: PublicBreakdownMetric[]
  updater_versions: PublicBreakdownMetric[]
}

export type AnalyticsAuth = {
  accountId: string
  token: string
  fetch?: typeof fetch
  now?: Date
}

const PUBLIC_MIN_DIMENSION_OUTCOMES = 50
const PUBLIC_TOP_COUNTRIES = 12
const PUBLIC_TOP_VERSIONS = 10
const PUBLIC_FAILURE_ACTIONS = [
  'set_fail',
  'update_fail',
  'download_fail',
  'windows_path_fail',
  'canonical_path_fail',
  'directory_path_fail',
  'unzip_fail',
  'low_mem_fail',
  'download_manifest_file_fail',
  'download_manifest_checksum_fail',
  'download_manifest_brotli_fail',
  'finish_download_fail',
  'manifest_path_fail',
  'decrypt_fail',
  'insufficient_disk_space',
  'cannotGetBundle',
  'checksum_fail',
  'blocked_by_server_url',
  'backend_refusal',
] as const
const PUBLIC_ZIP_FAIL_ACTIONS = ['unzip_fail', 'download_fail'] as const
const PUBLIC_DELTA_FAIL_ACTIONS = ['download_manifest_file_fail', 'download_manifest_checksum_fail', 'download_manifest_brotli_fail', 'manifest_path_fail'] as const

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

function formatDateCF(date: Date) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())} ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())}`
}

function roundPublicPercent(value: number) {
  return Number(value.toFixed(1))
}

function rawShare(part: number, total: number) {
  return total > 0 ? (part / total) * 100 : 0
}

function rateFromParts(part: number, total: number): number | null {
  return total > 0 ? roundPublicPercent((part / total) * 100) : null
}

function rateFromOutcomes(successes: number, failures: number): number | null {
  return rateFromParts(successes, successes + failures)
}

function buildBreakdownMetrics(
  shareRows: Array<{ key: string; devices: number }>,
  outcomeRows: Array<{ key: string; successes: number; failures: number }>,
  failureRows: Array<{ key: string; action: string; devices: number }>,
  limit: number,
): PublicBreakdownMetric[] {
  const shareTotal = shareRows.reduce((sum, row) => sum + (Number(row.devices) || 0), 0)
  const outcomesByKey = new Map<string, { successes: number; failures: number }>()
  for (const row of outcomeRows) {
    const key = String(row.key || '').trim()
    if (!key) continue
    outcomesByKey.set(key, {
      successes: Number(row.successes) || 0,
      failures: Number(row.failures) || 0,
    })
  }
  const failuresByKey = new Map<string, Array<{ reason: string; devices: number }>>()
  for (const row of failureRows) {
    const key = String(row.key || '').trim()
    if (!key) continue
    const list = failuresByKey.get(key) ?? []
    list.push({ reason: row.action, devices: Number(row.devices) || 0 })
    failuresByKey.set(key, list)
  }

  return shareRows
    .map((row) => {
      const key = String(row.key || '').trim()
      const devices = Number(row.devices) || 0
      const outcomes = outcomesByKey.get(key)
      const totalOutcomes = outcomes ? outcomes.successes + outcomes.failures : 0
      const success_rate = totalOutcomes >= PUBLIC_MIN_DIMENSION_OUTCOMES ? roundPublicPercent((outcomes!.successes / totalOutcomes) * 100) : null
      const dimFailures = failuresByKey.get(key) ?? []
      const failureTotal = dimFailures.reduce((sum, item) => sum + item.devices, 0)
      const top = [...dimFailures].sort((a, b) => b.devices - a.devices)[0]
      return {
        key,
        devices,
        success_rate,
        top_failure: top && failureTotal ? { reason: top.reason, share: roundPublicPercent(rawShare(top.devices, failureTotal)) } : null,
      }
    })
    .filter((row) => row.key && row.devices > 0)
    .sort((a, b) => b.devices - a.devices || (b.success_rate ?? -1) - (a.success_rate ?? -1))
    .slice(0, limit)
    .map(({ key, devices, success_rate, top_failure }) => ({
      key,
      share: roundPublicPercent(rawShare(devices, shareTotal)),
      success_rate,
      top_failure,
    }))
}

function buildDailyPlatforms(rows: Array<{ date: string; key: string; successes: number; failures: number }>): PublicDailyPlatformMetric[] {
  const byDate = new Map<string, PublicDailyPlatformMetric>()
  for (const row of rows) {
    const date = String(row.date || '').trim()
    const key = String(row.key || '').trim()
    if (!date || (key !== 'ios' && key !== 'android')) continue
    const current = byDate.get(date) ?? { date, ios: null, android: null }
    current[key] = rateFromOutcomes(Number(row.successes) || 0, Number(row.failures) || 0)
    byDate.set(date, current)
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date))
}

function buildAnalyticsWindow(referenceDate: Date, days: number) {
  const end = new Date(Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate()))
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - days)
  return `timestamp >= toDateTime('${formatDateCF(start)}') AND timestamp < toDateTime('${formatDateCF(end)}')`
}

function buildOutcomeBase(window: string, failureActions: string, day: string) {
  return `SELECT ${day} AS date, index1 AS app_id, blob1 AS device_id, max(if(blob2 = 'set', 1, 0)) AS succeeded, max(if(blob2 IN (${failureActions}), 1, 0)) AS failed, argMax(blob5, timestamp) AS platform, argMax(blob6, timestamp) AS country, argMax(blob7, timestamp) AS plugin_version FROM app_log WHERE ${window} AND (blob2 = 'set' OR blob2 IN (${failureActions})) GROUP BY date, app_id, device_id`
}

export function buildPublicLiveUpdateQueries(referenceDate = new Date()) {
  const window = buildAnalyticsWindow(referenceDate, LIVE_UPDATE_KPI_WINDOW_DAYS)
  const trendWindow = buildAnalyticsWindow(referenceDate, TREND_HISTORY_DAYS)
  const failureActions = PUBLIC_FAILURE_ACTIONS.map((action) => `'${action}'`).join(', ')
  const zipFailActions = PUBLIC_ZIP_FAIL_ACTIONS.map((action) => `'${action}'`).join(', ')
  const deltaFailActions = PUBLIC_DELTA_FAIL_ACTIONS.map((action) => `'${action}'`).join(', ')
  const day = `formatDateTime(toStartOfInterval(timestamp, INTERVAL '1' DAY), '%Y-%m-%d')`
  const outcomeBase = buildOutcomeBase(window, failureActions, day)
  const trendOutcomeBase = buildOutcomeBase(trendWindow, failureActions, day)

  return {
    outcomes: `SELECT date, sum(succeeded) AS successes, sum(if(succeeded = 0, failed, 0)) AS failures, sum(if(succeeded = 1 AND failed = 0, 1, 0)) AS first_tries FROM (${outcomeBase}) GROUP BY date`,
    rollback: `SELECT sum(has_reset) AS rollbacks, sum(if(has_set + has_reset > 0, 1, 0)) AS outcomes FROM (SELECT ${day} AS date, index1 AS app_id, blob1 AS device_id, max(if(blob2 = 'reset', 1, 0)) AS has_reset, max(if(blob2 = 'set', 1, 0)) AS has_set FROM app_log WHERE ${window} AND blob2 IN ('set', 'reset') GROUP BY date, app_id, device_id)`,
    package: `SELECT sum(if(zip_ok = 1, 1, 0)) AS zip_successes, sum(if(zip_ok = 0 AND zip_fail = 1, 1, 0)) AS zip_failures, sum(if(delta_ok = 1, 1, 0)) AS delta_successes, sum(if(delta_ok = 0 AND delta_fail = 1, 1, 0)) AS delta_failures FROM (SELECT ${day} AS date, index1 AS app_id, blob1 AS device_id, max(if(blob2 = 'download_zip_complete', 1, 0)) AS zip_ok, max(if(blob2 IN (${zipFailActions}), 1, 0)) AS zip_fail, max(if(blob2 = 'download_manifest_complete', 1, 0)) AS delta_ok, max(if(blob2 IN (${deltaFailActions}), 1, 0)) AS delta_fail FROM app_log WHERE ${window} AND blob2 IN ('download_zip_complete', 'download_manifest_complete', ${zipFailActions}, ${deltaFailActions}) GROUP BY date, app_id, device_id)`,
    failures: `SELECT action, count() AS devices FROM (SELECT ${day} AS date, blob2 AS action, index1 AS app_id, blob1 AS device_id FROM app_log WHERE ${window} AND blob2 IN (${failureActions}) GROUP BY date, action, app_id, device_id) GROUP BY action`,
    platformsShare: `SELECT platform, count() AS devices FROM (SELECT double1 AS platform, index1 AS app_id, blob1 AS device_id FROM device_usage WHERE ${window} AND double1 IN (0.0, 1.0, 2.0) GROUP BY platform, app_id, device_id) GROUP BY platform`,
    platformsDaily: `SELECT date, platform AS key, sum(succeeded) AS successes, sum(if(succeeded = 0, failed, 0)) AS failures FROM (${trendOutcomeBase}) WHERE platform IN ('ios', 'android') GROUP BY date, platform`,
    platformsOutcome: `SELECT platform AS key, sum(succeeded) AS successes, sum(if(succeeded = 0, failed, 0)) AS failures FROM (${outcomeBase}) WHERE platform IN ('ios', 'android', 'electron') GROUP BY platform`,
    platformsFailure: `SELECT platform AS key, action, count() AS devices FROM (SELECT ${day} AS date, index1 AS app_id, blob1 AS device_id, blob2 AS action, argMax(blob5, timestamp) AS platform FROM app_log WHERE ${window} AND blob2 IN (${failureActions}) GROUP BY date, app_id, device_id, action) WHERE platform IN ('ios', 'android', 'electron') GROUP BY platform, action`,
    countriesShare: `SELECT country AS key, count() AS devices FROM (SELECT index1 AS app_id, blob1 AS device_id, argMax(blob10, timestamp) AS country FROM device_info WHERE ${window} AND blob10 != '' GROUP BY app_id, device_id) WHERE country != '' GROUP BY country`,
    countriesOutcome: `SELECT country AS key, sum(succeeded) AS successes, sum(if(succeeded = 0, failed, 0)) AS failures FROM (${outcomeBase}) WHERE country != '' GROUP BY country`,
    countriesFailure: `SELECT country AS key, action, count() AS devices FROM (SELECT ${day} AS date, index1 AS app_id, blob1 AS device_id, blob2 AS action, argMax(blob6, timestamp) AS country FROM app_log WHERE ${window} AND blob2 IN (${failureActions}) GROUP BY date, app_id, device_id, action) WHERE country != '' GROUP BY country, action`,
    versionsShare: `SELECT version AS key, count() AS devices FROM (SELECT index1 AS app_id, blob1 AS device_id, argMax(blob3, timestamp) AS version FROM device_info WHERE ${window} AND blob3 != '' GROUP BY app_id, device_id) WHERE version != '' GROUP BY version`,
    versionsOutcome: `SELECT plugin_version AS key, sum(succeeded) AS successes, sum(if(succeeded = 0, failed, 0)) AS failures FROM (${outcomeBase}) WHERE plugin_version != '' GROUP BY plugin_version`,
    versionsFailure: `SELECT plugin_version AS key, action, count() AS devices FROM (SELECT ${day} AS date, index1 AS app_id, blob1 AS device_id, blob2 AS action, argMax(blob7, timestamp) AS plugin_version FROM app_log WHERE ${window} AND blob2 IN (${failureActions}) GROUP BY date, app_id, device_id, action) WHERE plugin_version != '' GROUP BY plugin_version, action`,
  }
}

async function runQuery<T>(auth: AnalyticsAuth, query: string): Promise<T[]> {
  const fetchImpl = auth.fetch ?? fetch
  const response = await fetchImpl(`https://api.cloudflare.com/client/v4/accounts/${auth.accountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: query,
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) {
    const preview = (await response.text()).replace(/\s+/g, ' ').trim().slice(0, 300)
    throw new Error(`Analytics Engine HTTP ${response.status}: ${preview}`)
  }
  const payload = (await response.json()) as { data?: T[] }
  return payload.data ?? []
}

export async function getPublicLiveUpdateMetrics(auth: AnalyticsAuth): Promise<PublicLiveUpdateMetrics> {
  if (!auth.accountId || !auth.token) throw new Error('Cloudflare Analytics Engine credentials are missing')

  const now = auth.now ?? new Date()
  const queries = buildPublicLiveUpdateQueries(now)
  const [
    outcomeRows,
    rollbackRows,
    packageRows,
    failureRows,
    platformShareRows,
    platformDailyRows,
    platformOutcomeRows,
    platformFailureRows,
    countryShareRows,
    countryOutcomeRows,
    countryFailureRows,
    versionShareRows,
    versionOutcomeRows,
    versionFailureRows,
  ] = await Promise.all([
    runQuery<{ date: string; successes: number; failures: number; first_tries: number }>(auth, queries.outcomes),
    runQuery<{ rollbacks: number; outcomes: number }>(auth, queries.rollback),
    runQuery<{ zip_successes: number; zip_failures: number; delta_successes: number; delta_failures: number }>(auth, queries.package),
    runQuery<{ action: string; devices: number }>(auth, queries.failures),
    runQuery<{ platform: number; devices: number }>(auth, queries.platformsShare),
    runQuery<{ date: string; key: string; successes: number; failures: number }>(auth, queries.platformsDaily),
    runQuery<{ key: string; successes: number; failures: number }>(auth, queries.platformsOutcome),
    runQuery<{ key: string; action: string; devices: number }>(auth, queries.platformsFailure),
    runQuery<{ key: string; devices: number }>(auth, queries.countriesShare),
    runQuery<{ key: string; successes: number; failures: number }>(auth, queries.countriesOutcome),
    runQuery<{ key: string; action: string; devices: number }>(auth, queries.countriesFailure),
    runQuery<{ key: string; devices: number }>(auth, queries.versionsShare),
    runQuery<{ key: string; successes: number; failures: number }>(auth, queries.versionsOutcome),
    runQuery<{ key: string; action: string; devices: number }>(auth, queries.versionsFailure),
  ])

  const daily = outcomeRows
    .map((row) => {
      const successes = Number(row.successes) || 0
      const failures = Number(row.failures) || 0
      const outcomes = successes + failures
      return { date: row.date, success_rate: outcomes ? roundPublicPercent((successes / outcomes) * 100) : 0 }
    })
    .sort((a, b) => a.date.localeCompare(b.date))
  const totalSuccesses = outcomeRows.reduce((sum, row) => sum + (Number(row.successes) || 0), 0)
  const totalFailures = outcomeRows.reduce((sum, row) => sum + (Number(row.failures) || 0), 0)
  const totalFirstTries = outcomeRows.reduce((sum, row) => sum + (Number(row.first_tries) || 0), 0)
  const totalOutcomes = totalSuccesses + totalFailures
  const rollback = rollbackRows[0]
  const packages = packageRows[0]
  const failureTotal = failureRows.reduce((sum, row) => sum + (Number(row.devices) || 0), 0)
  const failures = [...failureRows]
    .map((row) => ({ reason: row.action, devices: Number(row.devices) || 0 }))
    .sort((a, b) => b.devices - a.devices)
    .slice(0, 8)
    .map((row) => ({
      reason: row.reason,
      share: failureTotal ? roundPublicPercent(rawShare(row.devices, failureTotal)) : 0,
    }))
  const platformShareMapped = platformShareRows
    .map((row) => {
      const platform = Number(row.platform)
      const key = platform === 0 ? 'android' : platform === 1 ? 'ios' : platform === 2 ? 'electron' : ''
      return { key, devices: Number(row.devices) || 0 }
    })
    .filter((row) => row.key)

  return {
    success_rate: totalOutcomes ? roundPublicPercent((totalSuccesses / totalOutcomes) * 100) : 0,
    first_try_rate: rateFromParts(totalFirstTries, totalSuccesses),
    // AE SQL rejects the nested first-day-of-release query (HTTP 422).
    first_day_rate: null,
    first_day_success_rate: null,
    rollback_rate: rateFromParts(Number(rollback?.rollbacks) || 0, Number(rollback?.outcomes) || 0),
    zip_success_rate: rateFromOutcomes(Number(packages?.zip_successes) || 0, Number(packages?.zip_failures) || 0),
    delta_success_rate: rateFromOutcomes(Number(packages?.delta_successes) || 0, Number(packages?.delta_failures) || 0),
    period_days: LIVE_UPDATE_KPI_WINDOW_DAYS,
    updated_at: now.toISOString(),
    daily,
    daily_platforms: buildDailyPlatforms(platformDailyRows),
    failures,
    platforms: buildBreakdownMetrics(platformShareMapped, platformOutcomeRows, platformFailureRows, 3),
    countries: buildBreakdownMetrics(countryShareRows, countryOutcomeRows, countryFailureRows, PUBLIC_TOP_COUNTRIES),
    updater_versions: buildBreakdownMetrics(versionShareRows, versionOutcomeRows, versionFailureRows, PUBLIC_TOP_VERSIONS),
  }
}
