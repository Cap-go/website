export function formatMetricPercent(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(1)}%` : '—'
}

export function sparklinePaths(values: number[]) {
  const clean = values.filter((value) => Number.isFinite(value))
  if (clean.length < 2) return null
  const min = Math.min(...clean) - 2
  const max = Math.max(...clean) + 2
  const points = clean.map((value, index) => [(index / (clean.length - 1)) * 300, 60 - ((value - min) / (max - min || 1)) * 52])
  const line = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  return { line, area: `${line} L300 64 L0 64 Z` }
}
