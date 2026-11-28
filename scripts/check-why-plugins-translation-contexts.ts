import { spawnSync } from 'node:child_process'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const result = spawnSync('bun', ['run', join(ROOT, 'scripts/generate-message-contexts.ts'), '--check-why-plugins'], {
  cwd: ROOT,
  stdio: 'inherit',
})

process.exit(result.status ?? 1)