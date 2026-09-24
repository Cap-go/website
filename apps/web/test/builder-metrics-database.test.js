import { expect, test } from 'bun:test'
import { BUILDER_METRICS_ROLLUP_SQL } from '../src/lib/builderMetricsDatabase.ts'

test('BUILDER_METRICS_ROLLUP_SQL filters hourly rollups on timestamptz created_at', () => {
  expect(BUILDER_METRICS_ROLLUP_SQL).toContain('br.created_at AS created_at')
  expect(BUILDER_METRICS_ROLLUP_SQL).toContain('WHERE created_at >= $2::timestamptz')
  expect(BUILDER_METRICS_ROLLUP_SQL).not.toContain('created_at_utc')
  expect(BUILDER_METRICS_ROLLUP_SQL).toContain("timezone('utc', br.created_at)")
})
