export const TREND_CHART = {
  width: 800,
  height: 260,
  pad: { l: 44, r: 16, t: 16, b: 28 },
} as const

export function trendHitLeftPercent(index: number, count: number, width = TREND_CHART.width) {
  const pad = TREND_CHART.pad
  const innerW = width - pad.l - pad.r
  const x = count <= 1 ? pad.l + innerW / 2 : pad.l + (index / (count - 1)) * innerW
  return (x / width) * 100
}

export function trendHitWidthPercent(count: number, width = TREND_CHART.width) {
  const pad = TREND_CHART.pad
  const innerW = width - pad.l - pad.r
  if (count <= 1) return (innerW / width) * 100
  const segment = innerW / (count - 1)
  return Math.min(100, Math.max(2.5, (segment / width) * 100 * 1.15))
}

export function formatTrendTooltip(date: string, ios: number | null, android: number | null, formatValue: (value: number | null) => string) {
  return `${date} · iOS ${formatValue(ios)} · Android ${formatValue(android)}`
}
