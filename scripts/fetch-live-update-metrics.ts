#!/usr/bin/env bun

/**
 * Fetches Capgo live-update delivery metrics and saves to a JSON file.
 * Run with: bun run fetch:live-update-metrics
 * Refresh with: LIVE_UPDATE_METRICS_REFRESH=true bun run fetch:live-update-metrics
 */

import { normalizeLiveUpdateMetrics } from '../apps/web/src/lib/liveUpdateMetrics'
import keys from '../configs.json'

const REFRESH = process.env.LIVE_UPDATE_METRICS_REFRESH === 'true'
const OUTPUT_PATH = new URL('../apps/web/src/data/live-update-metrics.json', import.meta.url).pathname
const DEFAULT_API_URL = `https://api.${keys.base_domain.prod}`

const readCached = async () => {
  try {
    const file = Bun.file(OUTPUT_PATH)
    if (!(await file.exists())) return null
    return await file.json()
  } catch (error) {
    console.warn('Could not read live-update metrics cache:', error)
    return null
  }
}

async function main() {
  const baseApiUrl = (process.env.PUBLIC_BASE_API_URL || DEFAULT_API_URL).trim().replace(/\/$/, '')
  const cached = await readCached()

  if (!REFRESH) {
    if (cached) {
      console.log(`Using cached live-update metrics from ${cached.updated_at ?? 'unknown'}. Set LIVE_UPDATE_METRICS_REFRESH=true to refresh from ${baseApiUrl}.`)
      return
    }
    console.warn('Live-update metrics cache is missing. Set LIVE_UPDATE_METRICS_REFRESH=true to fetch from the API.')
    return
  }

  console.log(`Fetching live-update metrics from ${baseApiUrl}...`)
  const response = await fetch(`${baseApiUrl}/private/website_stats/live_updates`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    if (cached) {
      console.warn(`Live fetch failed (HTTP ${response.status}). Keeping existing live-update-metrics.json cache.`)
      return
    }
    throw new Error(`Could not fetch live-update metrics: HTTP ${response.status}`)
  }

  const payload = await response.json()
  const metrics = normalizeLiveUpdateMetrics(payload)
  if (!metrics) {
    if (cached) {
      console.warn('Live fetch returned invalid payload. Keeping existing cache.')
      return
    }
    throw new Error('Could not normalize live-update metrics and no cache exists.')
  }

  const output = { ...payload, source: 'api' }
  await Bun.write(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)
  console.log(`Saved live-update metrics to ${OUTPUT_PATH}`)
  console.log(`  success_rate: ${metrics.success_rate}%`)
  console.log(`  failures: ${metrics.failures.length}`)
  const updatedAt = metrics.updated_at
  if (typeof updatedAt === 'string' && /^\d{4}-\d{2}-\d{2}T[\d:.+-]+Z?$/.test(updatedAt)) {
    console.log(`  updated_at: ${updatedAt}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
