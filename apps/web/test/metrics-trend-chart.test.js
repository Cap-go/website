import { expect, test } from 'bun:test'
import { formatTrendAxisLabel, selectTrendRows, sliceHourlyTrendRows, sliceSparklineRows, sliceTrendRows, trendNearestIndex } from '../src/lib/metricsTrendChart.ts'

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

test('sliceTrendRows falls back to trailing rows when date filter is empty', () => {
  const rows = Array.from({ length: 90 }, (_, index) => {
    const day = new Date(Date.UTC(2026, 5, 1 + index))
    const date = `${day.getUTCFullYear()}-${String(day.getUTCMonth() + 1).padStart(2, '0')}-${String(day.getUTCDate()).padStart(2, '0')}`
    return { date, value: index }
  })

  const lateRef = new Date('2026-01-01T00:00:00.000Z')
  const threeMonth = sliceTrendRows(rows, '3m', lateRef)
  const oneMonth = sliceTrendRows(rows, '1m', lateRef)
  expect(threeMonth).toEqual(rows.slice(-90))
  expect(oneMonth).toEqual(rows.slice(-30))
})

test('sliceHourlyTrendRows keeps the current UTC day', () => {
  const rows = [
    { date: '2026-09-22 20:00', ios: 70, android: 60 },
    { date: '2026-09-23 08:00', ios: 72, android: 61 },
    { date: '2026-09-23 12:00', ios: 74, android: 63 },
    { date: '2026-09-23 18:00', ios: 76, android: 65 },
  ]

  expect(sliceHourlyTrendRows(rows, new Date('2026-09-23T21:00:00.000Z'))).toEqual([
    { date: '2026-09-23 08:00', ios: 72, android: 61 },
    { date: '2026-09-23 12:00', ios: 74, android: 63 },
    { date: '2026-09-23 18:00', ios: 76, android: 65 },
  ])
})

test('selectTrendRows uses hourly rows for 1D', () => {
  const metrics = {
    daily_platforms: [{ date: '2026-09-23', ios: 80, android: 70 }],
    hourly_platforms: [
      { date: '2026-09-23 08:00', ios: 72, android: 61 },
      { date: '2026-09-23 12:00', ios: 74, android: 63 },
      { date: '2026-09-23 18:00', ios: 76, android: 65 },
    ],
  }

  expect(selectTrendRows(metrics, '1d', new Date('2026-09-23T21:00:00.000Z'))).toHaveLength(3)
  expect(selectTrendRows(metrics, '1m', new Date('2026-09-23T21:00:00.000Z'))).toHaveLength(1)
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

test('formatTrendAxisLabel shortens hourly labels', () => {
  expect(formatTrendAxisLabel('2026-09-23 08:00', '1d')).toBe('08:00')
  expect(formatTrendAxisLabel('2026-09-23', '1m')).toBe('2026-09-23')
})

test('trendNearestIndex maps pointer position to the nearest day', () => {
  expect(trendNearestIndex(44, 0, 800, 5)).toBe(0)
  expect(trendNearestIndex(784, 0, 800, 5)).toBe(4)
  expect(trendNearestIndex(414, 0, 800, 5)).toBe(2)
})
