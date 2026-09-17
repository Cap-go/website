#!/usr/bin/env bun

/**
 * Rebuilds public builder metrics (rates and minutes only — no build counts).
 * Default: compute from scripts/builder-metrics-source.json
 * Refresh from prod RPC: BUILDER_METRICS_REFRESH=true bun run fetch:builder-metrics
 */

import { normalizeBuilderMetrics } from '../apps/web/src/lib/builderMetrics'
import { buildPublicBuilderMetrics, fetchPublicBuilderMetricsFromRpc, type BuilderMetricsSource, type PublicBuilderMetrics } from '../apps/web/src/lib/publicBuilderMetrics'

const REFRESH = process.env.BUILDER_METRICS_REFRESH === 'true'
const OUTPUT_PATH = new URL('../apps/web/src/data/builder-metrics.json', import.meta.url).pathname
const SOURCE_PATH = new URL('./builder-metrics-source.json', import.meta.url).pathname

async function readCached() {
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

async function fromSourceFile(): Promise<PublicBuilderMetrics> {
  const source = await Bun.file(SOURCE_PATH).json() as BuilderMetricsSource
  return buildPublicBuilderMetrics(source)
}

function safeRate(value: number) {
  return Number.isFinite(value) ? value.toFixed(1) : 'n/a'
}

function safeSeconds(value: number | null) {
  return value === null || !Number.isFinite(value) ? 'n/a' : value.toFixed(1)
}

async function loadPayload(cached: unknown): Promise<PublicBuilderMetrics> {
  const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || 'https://xvwzpoazmxkqosrdewyv.supabase.co').trim()
  const anonKey = (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim()
  if (!REFRESH || !anonKey) {
    if (REFRESH) console.warn('BUILDER_METRICS_REFRESH set but VITE_SUPABASE_ANON_KEY missing. Using local source.')
    return await fromSourceFile()
  }

  try {
    console.log('Querying get_public_builder_metrics...')
    return await fetchPublicBuilderMetricsFromRpc({ supabaseUrl, anonKey })
  }
  catch (error) {
    if (!cached) throw error
    console.warn('Builder RPC failed. Computing from local source instead.', error)
    return await fromSourceFile()
  }
}

const cached = await readCached()
const payload = await loadPayload(cached)
const metrics = normalizeBuilderMetrics(payload)
if (!metrics) {
  if (cached) {
    console.warn('Builder metrics payload invalid. Keeping existing cache.')
  }
  else {
    throw new Error('Could not normalize builder metrics and no cache exists.')
  }
}
else {
  const json = JSON.stringify(metrics, null, 2)
  if (/"successes"\s*:|"builds_total"|"build_count"/.test(json)) {
    throw new Error('Refusing to write builder metrics that include raw build counts.')
  }

  await Bun.write(OUTPUT_PATH, `${json}\n`)
  console.log('Saved builder metrics')
  console.log(`  success_rate: ${safeRate(metrics.success_rate)}%`)
  console.log(`  process: ${safeSeconds(metrics.avg_process_seconds)}s`)
}
