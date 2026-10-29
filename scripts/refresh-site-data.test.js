import { expect, test } from 'bun:test'
import { load } from 'js-yaml'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'

const workflow = load(readFileSync(new URL('../.github/workflows/refresh-site-data.yml', import.meta.url), 'utf8'))
const steps = workflow.jobs.refresh.steps
const pricingCheck = steps.find((step) => step.id === 'pricing_check')
const restore = steps.find((step) => step.name === 'Restore pricing snapshots if the example fails')
const commit = steps.find((step) => step.id === 'commit')
const deploy = steps.find((step) => step.name === 'Deploy the refreshed data')
const report = steps.at(-1)
const snapshotFiles = commit.with.file_pattern.split(' ')
const plansFile = 'apps/web/src/data/capgo-plans.json'
const creditsFile = 'apps/web/src/data/capgo-credits.json'
const starsFile = 'apps/web/src/data/github-stars.json'

function git(directory, ...args) {
  const result = spawnSync('git', ['-c', 'user.name=Workflow Test', '-c', 'user.email=workflow@example.com', ...args], { cwd: directory, encoding: 'utf8' })
  expect(result.status, result.stderr).toBe(0)
  return result.stdout.trim()
}

test('pricing verification permits unrelated commits and reports failures after deploy', () => {
  expect(pricingCheck['continue-on-error']).toBe(true)
  expect(steps.indexOf(pricingCheck)).toBeLessThan(steps.indexOf(restore))
  expect(steps.indexOf(restore)).toBeLessThan(steps.indexOf(commit))
  expect(steps.indexOf(commit)).toBeLessThan(steps.indexOf(deploy))
  expect(steps.indexOf(deploy)).toBeLessThan(steps.indexOf(report))
})

test.each([
  ['success', 'success'],
  ['failure', 'success'],
  ['success', 'failure'],
  ['failure', 'failure'],
])('refresh keeps valid snapshots and reports outcomes: pricing %s, downloads %s', (pricingOutcome, downloadsOutcome) => {
  const directory = mkdtempSync(join(tmpdir(), 'site-data-refresh-'))
  try {
    mkdirSync(join(directory, 'apps/web/src/data'), { recursive: true })
    git(directory, 'init', '--quiet')
    for (const file of snapshotFiles) writeFileSync(join(directory, file), '{"value":"baseline"}\n')
    git(directory, 'add', '--', ...snapshotFiles)
    git(directory, 'commit', '--quiet', '-m', 'Initial snapshots')
    for (const file of [plansFile, creditsFile, starsFile]) writeFileSync(join(directory, file), '{"value":"refreshed"}\n')

    const outcomes = Object.fromEntries(['stars', 'transparency', 'website_stats', 'downloads', 'build_data', 'pricing_check'].map((id) => [id, { outcome: 'success' }]))
    outcomes.pricing_check.outcome = pricingOutcome
    outcomes.downloads.outcome = downloadsOutcome

    if (runInNewContext(restore.if, { steps: outcomes })) {
      const result = spawnSync('bash', ['-e', '-c', restore.run], { cwd: directory, encoding: 'utf8' })
      expect(result.status, result.stderr).toBe(0)
    }

    git(directory, 'add', '--', ...snapshotFiles)
    git(directory, 'commit', '--quiet', '-m', commit.with.commit_message)
    const expectedPricingValue = pricingOutcome === 'failure' ? 'baseline' : 'refreshed'
    expect(JSON.parse(git(directory, 'show', `HEAD:${plansFile}`)).value).toBe(expectedPricingValue)
    expect(JSON.parse(git(directory, 'show', `HEAD:${creditsFile}`)).value).toBe(expectedPricingValue)
    expect(JSON.parse(git(directory, 'show', `HEAD:${starsFile}`)).value).toBe('refreshed')
    expect(runInNewContext(deploy.if, { steps: { commit: { outputs: { changes_detected: 'true' } } } })).toBe(true)

    const failed = pricingOutcome === 'failure' || downloadsOutcome === 'failure'
    expect(runInNewContext(report.if, { steps: outcomes })).toBe(failed)
    if (failed) {
      const command = report.run.replace(/\$\{\{\s*steps\.(\w+)\.outcome\s*\}\}/g, (_match, id) => outcomes[id].outcome)
      const result = spawnSync('bash', ['-e', '-c', command], { cwd: directory, encoding: 'utf8' })
      expect(result.status).toBe(1)
      expect(result.stdout).toContain(`pricing_check=${pricingOutcome}`)
      expect(result.stdout).toContain(`downloads=${downloadsOutcome}`)
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
