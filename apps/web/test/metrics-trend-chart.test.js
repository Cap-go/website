import { expect, test } from 'bun:test'
import { sliceSparklineRows, sliceTrendRows, trendNearestIndex } from '../src/lib/metricsTrendChart.ts'

test('sliceTrendRows filters by UTC date boundary and keeps gaps', () => {
  const rows = [
    { date: '2026-09-01', value: 1 },
    { date: '2026-09-03', value: 2 },
    { date: '2026-09-05', value: 3 },
    { date: '2026-09-10', value: 4 },
  ]

  expect(sliceTrendRows(rows, '1d', new Date('2026-09-10T15:00:00.000Z'))).toEqual([{ date: '2026-09-10', value: 4 }])
  expect(sliceTrendRows(rows, '1w', new Date('2026-09-10T00:00:00.000Z'))).toEqual([
    { date: '2026-09-05', value: 3 },
    { date: '2026-09-10', value: 4 },
  ])
  expect(sliceTrendRows(rows, '1m', new Date('2026-09-10T00:00:00.000Z'))).toEqual(rows)
})

test('sliceSparklineRows keeps the last 30 UTC days', () => {
  const rows = Array.from({ length: 100 }, (_, index) => {
    const day = new Date(Date.UTC(2026, 0, 1 + index))
    const date = `${day.getUTCFullYear()}-${String(day.getUTCMonth() + 1).padStart(2, '0')}-${String(day.getUTCDate()).padStart(2, '0')}`
    return { date, value: index }
  })

  const sparkline = sliceSparklineRows(rows, new Date('2026-04-10T00:00:00.000Z'))
  expect(sparkline).toHaveLength(30)
  expect(sparkline[0]?.date).toBe('2026-03-12')
  expect(sparkline.at(-1)?.date).toBe('2026-04-10')
})

test('trendNearestIndex maps pointer position to the nearest day', () => {
  expect(trendNearestIndex(44, 0, 800, 5)).toBe(0)
  expect(trendNearestIndex(784, 0, 800, 5)).toBe(4)
  expect(trendNearestIndex(414, 0, 800, 5)).toBe(2)
})
