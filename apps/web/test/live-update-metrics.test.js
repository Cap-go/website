import { expect, test } from 'bun:test'
import { normalizeLiveUpdateMetrics } from '../src/lib/liveUpdateMetrics.ts'

const base = {
  updated_at: '2026-09-16T12:00:00.000Z',
  success_rate: 67.6,
  daily: [{ date: '2026-09-15', success_rate: 70 }],
  failures: [{ reason: 'download_fail', share: 40 }],
}

test('normalizeLiveUpdateMetrics keeps new reliability rates', () => {
  const metrics = normalizeLiveUpdateMetrics({
    ...base,
    first_try_rate: 88.4,
    first_day_rate: 41.2,
    first_day_success_rate: 71.8,
    rollback_rate: 2.6,
    zip_success_rate: 74.3,
    delta_success_rate: 91.5,
    platforms: [],
    countries: [],
    updater_versions: [],
  })

  expect(metrics?.first_try_rate).toBe(88.4)
  expect(metrics?.first_day_rate).toBe(41.2)
  expect(metrics?.first_day_success_rate).toBe(71.8)
  expect(metrics?.rollback_rate).toBe(2.6)
  expect(metrics?.zip_success_rate).toBe(74.3)
  expect(metrics?.delta_success_rate).toBe(91.5)
})

test('normalizeLiveUpdateMetrics keeps daily platform rates', () => {
  const metrics = normalizeLiveUpdateMetrics({
    ...base,
    platforms: [],
    countries: [],
    updater_versions: [],
    daily_platforms: [
      { date: '2026-09-15', ios: 88.4, android: 71.2 },
      { date: '2026-09-16', ios: null, android: 64 },
    ],
  })

  expect(metrics?.daily_platforms).toEqual([
    { date: '2026-09-15', ios: 88.4, android: 71.2 },
    { date: '2026-09-16', ios: null, android: 64 },
  ])
})

test('normalizeLiveUpdateMetrics treats missing new rates as null', () => {
  const metrics = normalizeLiveUpdateMetrics({
    ...base,
    platforms: [],
    countries: [],
    updater_versions: [],
  })

  expect(metrics?.first_try_rate).toBeNull()
  expect(metrics?.first_day_rate).toBeNull()
  expect(metrics?.first_day_success_rate).toBeNull()
  expect(metrics?.rollback_rate).toBeNull()
  expect(metrics?.zip_success_rate).toBeNull()
  expect(metrics?.delta_success_rate).toBeNull()
  expect(metrics?.daily_platforms).toEqual([])
})

test('normalizeLiveUpdateMetrics shows Electron usage as at least 1%', () => {
  const metrics = normalizeLiveUpdateMetrics({
    ...base,
    platforms: [
      { key: 'ios', share: 68.4, success_rate: 84.3, top_failure: null },
      { key: 'android', share: 31.5, success_rate: 79.9, top_failure: null },
      { key: 'electron', share: 0, success_rate: 99.9, top_failure: null },
    ],
    countries: [],
    updater_versions: [],
  })

  expect(metrics?.platforms.map((item) => [item.key, item.share])).toEqual([
    ['ios', 68.4],
    ['android', 31.5],
    ['electron', 1],
  ])
})
