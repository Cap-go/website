#!/usr/bin/env bun
/**
 * Local D1 fixture for /builder-data/ screenshots (labeled fixture data, not production).
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const reference = new Date()
const lines = []
let id = 0

function payload(platform) {
  return JSON.stringify({ buildOptions: { platform } })
}

function insertJob({ status, createdAt, platform, processMs = 180_000, queueMs = 4_000, error = null }) {
  id += 1
  const startedAt = createdAt + queueMs
  const completedAt = status === 'succeeded' || status === 'failed' || status === 'expired' ? startedAt + processMs : null
  const escapedError = error ? `'${error.replace(/'/g, "''")}'` : 'NULL'
  lines.push(
    `INSERT INTO jobs (id, user_id, status, created_at, updated_at, started_at, completed_at, runner_wait_ms, payload_descriptor, error, provider) VALUES (` +
      `'fixture-${id}', 'org-fixture', '${status}', ${createdAt}, ${createdAt}, ${startedAt}, ${completedAt ?? 'NULL'}, ${queueMs}, '${payload(platform)}', ${escapedError}, 'fixture');`,
  )
}

for (let dayOffset = 89; dayOffset >= 0; dayOffset -= 1) {
  const day = new Date(Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), reference.getUTCDate()))
  day.setUTCDate(day.getUTCDate() - dayOffset)
  const dayMs = day.getTime()
  const iosSuccessRate = 0.55 + 0.35 * Math.sin(dayOffset / 8)
  const androidSuccessRate = 0.5 + 0.3 * Math.cos(dayOffset / 11)
  for (const platform of ['ios', 'android']) {
    const rate = platform === 'ios' ? iosSuccessRate : androidSuccessRate
    const builds = 2 + (dayOffset % 3)
    for (let index = 0; index < builds; index += 1) {
      const createdAt = dayMs + (9 + index) * 3_600_000
      const succeeded = Math.random() < rate
      if (succeeded) {
        insertJob({ status: 'succeeded', createdAt, platform, processMs: 150_000 + index * 20_000 })
      } else {
        insertJob({
          status: index % 2 === 0 ? 'failed' : 'expired',
          createdAt,
          platform,
          error: index % 2 === 0 ? 'Build failed (script_failure) in fixture pipeline' : 'Build exceeded configured timeout of 15 minutes',
        })
      }
    }
  }
}

const recentHour = Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), reference.getUTCDate(), reference.getUTCHours() - 2)
insertJob({ status: 'succeeded', createdAt: recentHour, platform: 'ios' })
insertJob({ status: 'failed', createdAt: recentHour + 1_800_000, platform: 'android', error: 'runner_system_failure in fixture' })

const outPath = resolve(import.meta.dir, '../apps/web/test/fixtures/builder-metrics-d1-seed.sql')
writeFileSync(outPath, `${lines.join('\n')}\n`)
console.log(`Wrote ${lines.length} fixture jobs to ${outPath}`)
