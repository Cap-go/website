#!/usr/bin/env bun

/**
 * Queries Cloudflare Analytics Engine and saves public live-update metrics.
 * Run with: bun run fetch:live-update-metrics
 * Refresh with: LIVE_UPDATE_METRICS_REFRESH=true bun run fetch:live-update-metrics
 */

import { normalizeLiveUpdateMetrics } from '../apps/web/src/lib/liveUpdateMetrics'
import { getPublicLiveUpdateMetrics } from '../apps/web/src/lib/publicLiveUpdateMetrics'

const REFRESH = process.env.LIVE_UPDATE_METRICS_REFRESH === 'true'
const OUTPUT_PATH = new URL('../apps/web/src/data/live-update-metrics.json', import.meta.url).pathname

const readCached = async () => {
  try {
    const file = Bun.file(OUTPUT_PATH)
    if (!(await file.exists()))
      return null
    return await file.json()
  }
  catch (error) {
    console.warn('Could not read live-update metrics cache:', error)
    return null
  }
}

async function main() {
  const cached = await readCached()
  const accountId = (process.env.CF_ACCOUNT_ANALYTICS_ID || process.env.CLOUDFLARE_ACCOUNT_ID || '').trim()
  const token = (process.env.CF_ANALYTICS_TOKEN || '').trim()

  if (!REFRESH) {
    if (cached) {
      console.log(`Using cached live-update metrics from ${cached.updated_at ?? 'unknown'}. Set LIVE_UPDATE_METRICS_REFRESH=true to refresh from Analytics Engine.`)
      return
    }
    console.warn('Live-update metrics cache is missing. Set LIVE_UPDATE_METRICS_REFRESH=true to query Analytics Engine.')
    return
  }

  if (!accountId || !token) {
    if (cached) {
      console.warn('CF_ANALYTICS_TOKEN / CF_ACCOUNT_ANALYTICS_ID missing. Keeping existing live-update-metrics.json cache.')
      return
    }
    throw new Error('CF_ANALYTICS_TOKEN and CF_ACCOUNT_ANALYTICS_ID are required to refresh live-update metrics')
  }

  console.log('Querying Cloudflare Analytics Engine for live-update metrics...')
  let payload
  try {
    payload = await getPublicLiveUpdateMetrics({ accountId, token })
  }
  catch (error) {
    if (cached) {
      console.warn('Analytics Engine query failed. Keeping existing cache.', error)
      return
    }
    throw error
  }
  const metrics = normalizeLiveUpdateMetrics(payload)
  if (!metrics) {
    if (cached) {
      console.warn('Analytics Engine returned an invalid payload. Keeping existing cache.')
      return
    }
    throw new Error('Could not normalize live-update metrics and no cache exists.')
  }

  await Bun.write(OUTPUT_PATH, `${JSON.stringify({ ...payload, source: 'api' }, null, 2)}\n`)
  console.log(`Saved live-update metrics to ${OUTPUT_PATH}`)
  console.log(`  success_rate: ${metrics.success_rate}%`)
  console.log(`  failures: ${metrics.failures.length}`)
  console.log(`  updated_at: ${metrics.updated_at}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
