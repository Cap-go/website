export const TREND_CHART = {
  width: 800,
  height: 260,
  pad: { l: 44, r: 16, t: 16, b: 28 },
} as const

export const TREND_HISTORY_DAYS = 90
export const SPARKLINE_WINDOW_DAYS = 30

export type TrendRangeKey = '1d' | '1w' | '1m' | '3m'

export type TrendPlatformRow = {
  date: string
  ios: number | null
  android: number | null
}

export type TrendMetricsRows<T extends { date: string } = TrendPlatformRow> = {
  daily_platforms: T[]
  hourly_platforms?: T[]
}

export const TREND_RANGE_OPTIONS: Array<{ key: TrendRangeKey; label: string; days: number }> = [
  { key: '1d', label: '1D', days: 1 },
  { key: '1w', label: '1W', days: 7 },
  { key: '1m', label: '1M', days: 30 },
  { key: '3m', label: '3M', days: 90 },
]

export function trendRangeDays(key: TrendRangeKey) {
  return TREND_RANGE_OPTIONS.find((option) => option.key === key)?.days ?? 30
}

export function formatUtcDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseTrendUtcDate(date: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date.trim())
  if (!match) return null
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
}

function utcDayStart(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

export function trendWindowEndUtc(rows: Array<{ date: string }>, referenceDate?: Date) {
  if (referenceDate) return utcDayStart(referenceDate)
  const last = rows.at(-1)?.date
  const parsed = last ? parseTrendUtcDate(last) : null
  return parsed ? utcDayStart(parsed) : utcDayStart(new Date())
}

export function sliceTrendRows<T extends { date: string }>(rows: T[], key: TrendRangeKey, referenceDate?: Date) {
  if (!rows.length) return rows
  const days = trendRangeDays(key)
  const end = trendWindowEndUtc(rows, referenceDate)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - (days - 1))
  const filtered = rows.filter((row) => {
    const parsed = parseTrendUtcDate(row.date)
    if (!parsed) return false
    const day = utcDayStart(parsed)
    return day >= start && day <= end
  })
  if (filtered.length) return filtered
  return rows.slice(Math.max(0, rows.length - days))
}

export function sliceHourlyTrendRows<T extends { date: string }>(rows: T[], referenceDate?: Date) {
  if (!rows.length) return rows
  const dayKey = formatUtcDate(utcDayStart(referenceDate ?? new Date()))
  const filtered = rows.filter((row) => row.date.startsWith(dayKey))
  if (filtered.length) return filtered
  const lastDay = rows.at(-1)?.date.slice(0, 10)
  if (!lastDay) return rows
  return rows.filter((row) => row.date.startsWith(lastDay))
}

export function selectTrendRows<T extends { date: string }>(
  metrics: TrendMetricsRows<T>,
  key: TrendRangeKey,
  referenceDate?: Date,
): T[] {
  if (key === '1d') {
    const hourly = metrics.hourly_platforms ?? []
    if (hourly.length) return sliceHourlyTrendRows(hourly, referenceDate)
    return sliceTrendRows(metrics.daily_platforms, '1d', referenceDate)
  }
  return sliceTrendRows(metrics.daily_platforms, key, referenceDate)
}

export function sliceSparklineRows<T extends { date: string }>(rows: T[], referenceDate?: Date) {
  return sliceTrendRows(rows, '1m', referenceDate)
}

export function formatTrendAxisLabel(date: string, range: TrendRangeKey) {
  if (!date) return ''
  if (range === '1d') {
    const hourMatch = /(?:T| )(\d{2}):00/.exec(date)
    if (hourMatch) return `${hourMatch[1]}:00`
    if (/^\d{2}:\d{2}$/.test(date)) return date
  }
  return date.slice(0, 10)
}

export function trendHitLeftPercent(index: number, count: number, width = TREND_CHART.width) {
  const pad = TREND_CHART.pad
  const innerW = width - pad.l - pad.r
  const x = count <= 1 ? pad.l + innerW / 2 : pad.l + (index / (count - 1)) * innerW
  return (x / width) * 100
}

export function trendNearestIndex(clientX: number, plotLeft: number, plotWidth: number, count: number) {
  if (count <= 0) return -1
  if (count === 1) return 0
  const pad = TREND_CHART.pad
  const innerW = plotWidth * ((TREND_CHART.width - pad.l - pad.r) / TREND_CHART.width)
  const left = plotWidth * (pad.l / TREND_CHART.width)
  const x = clientX - plotLeft - left
  const ratio = Math.max(0, Math.min(1, x / innerW))
  return Math.round(ratio * (count - 1))
}

export function formatTrendTooltip(date: string, ios: number | null, android: number | null, formatValue: (value: number | null) => string) {
  const label = date.length > 10 ? date.replace('T', ' ') : date
  return `${label} · iOS ${formatValue(ios)} · Android ${formatValue(android)}`
}
