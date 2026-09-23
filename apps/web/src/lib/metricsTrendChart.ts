export const TREND_CHART = {
  width: 800,
  height: 260,
  pad: { l: 44, r: 16, t: 16, b: 28 },
} as const

export const TREND_HISTORY_DAYS = 90
export const SPARKLINE_WINDOW_DAYS = 30

export type TrendRangeKey = '1d' | '1w' | '1m' | '3m'

export const TREND_RANGE_OPTIONS: Array<{ key: TrendRangeKey; label: string; days: number }> = [
  { key: '1d', label: '1D', days: 1 },
  { key: '1w', label: '1W', days: 7 },
  { key: '1m', label: '1M', days: 30 },
  { key: '3m', label: '3M', days: 90 },
]

export function trendRangeDays(key: TrendRangeKey) {
  return TREND_RANGE_OPTIONS.find((option) => option.key === key)?.days ?? 30
}

export function parseTrendUtcDate(date: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim())
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
  return rows.filter((row) => {
    const parsed = parseTrendUtcDate(row.date)
    if (!parsed) return false
    const day = utcDayStart(parsed)
    return day >= start && day <= end
  })
}

export function sliceSparklineRows<T extends { date: string }>(rows: T[], referenceDate?: Date) {
  return sliceTrendRows(rows, '1m', referenceDate)
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
  return `${date} · iOS ${formatValue(ios)} · Android ${formatValue(android)}`
}
