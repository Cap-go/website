import { expect, test } from 'bun:test'
import {
  BUILDER_JOB_STATUS_EXCLUDED,
  BUILDER_JOB_STATUS_FAILURE,
  BUILDER_JOB_STATUS_IN_FLIGHT,
  BUILDER_JOB_STATUS_SUCCESS,
  builderJobOutcomeSqlCase,
} from '../src/lib/builderMetricsStatus.ts'

test('builder job status buckets match capgo_builder terminal semantics', () => {
  expect(BUILDER_JOB_STATUS_SUCCESS).toEqual(['succeeded'])
  expect(BUILDER_JOB_STATUS_FAILURE).toEqual(['failed', 'expired'])
  expect(BUILDER_JOB_STATUS_EXCLUDED).toEqual(['cancelled', 'released'])
  expect(BUILDER_JOB_STATUS_IN_FLIGHT).toEqual(['queued', 'reserved', 'ready', 'waiting_runner', 'running'])
})

test('builderJobOutcomeSqlCase only counts succeeded as success and failed/expired as failure', () => {
  const sql = builderJobOutcomeSqlCase('status')
  expect(sql).toContain("IN ('succeeded')")
  expect(sql).toContain("IN ('failed', 'expired')")
  expect(sql).not.toContain('cancelled')
  expect(sql).not.toContain('released')
})
