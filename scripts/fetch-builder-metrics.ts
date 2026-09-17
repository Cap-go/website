#!/usr/bin/env bun

/**
 * Rebuilds public builder metrics (rates and minutes only — no build counts).
 * Default: compute from scripts/builder-metrics-source.json
 * Refresh from prod RPC: BUILDER_METRICS_REFRESH=true bun run fetch:builder-metrics
 */

import { normalizeBuilderMetrics } from '../apps/web/src/lib/builderMetrics'
import { buildPublicBuilderMetrics, fetchPublicBuilderMetricsFromRpc, type BuilderMetricsSource } from '../apps/web/src/lib/publicBuilderMetrics'

const REFRESH = process.env.BUILDER_METRICS_REFRESH === 'true'
const OUTPUT_PATH = new URL('../apps/web/src/data/builder-metrics.json', import.meta.url).pathname
const SOURCE_PATH = new URL('./builder-metrics-source.json', import.meta.url).pathname

const readCached = async () => {
  try {
    const file = Bun.file(OUTPUT_PATH)
    if (!(await file.exists())) return null
    return await file.json()
  }
  catch (error) {
    console.warn('Could not read builder metrics cache:', error)
    return null
  }
}

async function fromSourceFile(): Promise<ReturnType<typeof buildPublicBuilderMetrics>> {
  const source = await Bun.file(SOURCE_PATH).json() as BuilderMetricsSource
  return buildPublicBuilderMetrics(source)
}

async function main() {
  const cached = await readCached()
  const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || 'https://xvwzpoazmxkqosrdewyv.supabase.co').trim()
  const anonKey = (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim()

  let payload
  if (REFRESH && anonKey) {
    try {
      console.log('Querying get_public_builder_metrics...')
      payload = await fetchPublicBuilderMetricsFromRpc({ supabaseUrl, anonKey })
    }
    catch (error) {
      if (cached) {
        console.warn('Builder RPC failed. Computing from local source instead.', error)
        payload = await fromSourceFile()
      }
      else {
        throw error
      }
    }
  }
  else {
    if (REFRESH && !anonKey) {
      console.warn('BUILDER_METRICS_REFRESH set but VITE_SUPABASE_ANON_KEY missing. Using local source.')
    }
    payload = await fromSourceFile()
  }

  const metrics = normalizeBuilderMetrics(payload)
  if (!metrics) {
    if (cached) {
      console.warn('Builder metrics payload invalid. Keeping existing cache.')
      return
    }
    throw new Error('Could not normalize builder metrics and no cache exists.')
  }

  const json = JSON.stringify(metrics, null, 2)
  if (/"successes"\s*:|"builds_total"|"build_count"/.test(json)) {
    throw new Error('Refusing to write builder metrics that include raw build counts.')
  }

  await Bun.write(OUTPUT_PATH, `${json}\n`)
  console.log(`Saved builder metrics to ${OUTPUT_PATH}`)
  console.log(`  success_rate: ${metrics.success_rate}%`)
  console.log(`  process: ${metrics.avg_process_seconds}s`)
  console.log(`  updated_at: ${metrics.updated_at}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
