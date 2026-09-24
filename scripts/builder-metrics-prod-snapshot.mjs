/**
 * Read-only production D1 rollup snapshot for tests and screenshot capture (not used in prod Worker).
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const BUILDER_METRICS_PROD_SNAPSHOT_AT = '2026-09-24T20:19:07.000Z'

const snapshotPath = resolve(import.meta.dir, '../apps/web/test/fixtures/builder-rollup-prod-2026-09-24.json')

export function loadBuilderMetricsProdSnapshot() {
  const raw = readFileSync(snapshotPath, 'utf8')
  return JSON.parse(raw)
}

export function createProdSnapshotD1Client(rows) {
  return {
    async queryAggregatedRollups() {
      return rows
    },
  }
}
