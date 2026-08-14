export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value.toFixed(value < 1 ? 1 : value % 1 === 0 ? 0 : 1).replace(/\.0$/, '')}%`
}
