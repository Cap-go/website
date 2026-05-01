import { createServer, type AddressInfo } from 'node:net'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

type ProbePayload = {
  ok?: boolean
  model?: string
  storage?: {
    cache?: boolean
    r2?: boolean
  }
  translations?: unknown
  error?: string
}

const WORKER_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MODEL = process.env.TRANSLATION_REAL_TEST_MODEL || '@cf/meta/llama-3.1-8b-instruct-fast'
const TIMEOUT_MS = Number.parseInt(process.env.TRANSLATION_REAL_TEST_TIMEOUT_MS || '180000', 10)
const REQUEST_TIMEOUT_MS = Math.min(10_000, TIMEOUT_MS)
const LOG_LIMIT = 16_000
const WRANGLER_CONFIG = 'wrangler.real-test.jsonc'
const DEVELOPMENT_R2_BUCKET = 'capgo-translation-cache-development'
const SOURCE_TEXTS = ['Ship updates instantly', 'Pricing', 'Keep Capgo, Capacitor, code, API, SDK, CLI, npm, bun, GitHub, and Cloudflare unchanged.']

let wranglerLog = ''

function appendLog(chunk: string): void {
  wranglerLog = `${wranglerLog}${chunk}`.slice(-LOG_LIMIT)
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function getFreePort(): Promise<number> {
  const server = createServer()
  await new Promise<void>((resolvePromise, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => resolvePromise())
  })

  const address = server.address() as AddressInfo
  await new Promise<void>((resolvePromise, reject) => {
    server.close((error) => (error ? reject(error) : resolvePromise()))
  })
  return address.port
}

async function drainStream(stream: ReadableStream<Uint8Array> | null): Promise<void> {
  if (!stream) return

  const reader = stream.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    appendLog(decoder.decode(value, { stream: true }))
  }
}

async function runWrangler(args: string[]): Promise<{ code: number; output: string }> {
  const child = Bun.spawn(['bunx', 'wrangler', ...args], {
    cwd: WORKER_DIR,
    stdout: 'pipe',
    stderr: 'pipe',
    stdin: 'inherit',
    env: {
      ...process.env,
      CI: 'true',
      NO_COLOR: '1',
    },
  })
  const [stdout, stderr, code] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited])
  return { code, output: `${stdout}${stderr}` }
}

async function ensureDevelopmentBucket(): Promise<void> {
  const result = await runWrangler(['--config', WRANGLER_CONFIG, 'r2', 'bucket', 'create', DEVELOPMENT_R2_BUCKET])
  if (result.code === 0 || /already exists|already.*capgo-translation-cache-development/i.test(result.output)) return

  throw new Error(`Failed to ensure real R2 development bucket:\n${result.output.trim()}`)
}

function assertProbePayload(payload: ProbePayload): void {
  if (!payload.ok) throw new Error(payload.error || 'Probe returned ok=false')
  if (payload.model !== MODEL) throw new Error(`Probe used ${payload.model || 'unknown model'} instead of ${MODEL}`)
  if (payload.storage?.cache !== true) throw new Error('Probe did not use the real Cache API')
  if (payload.storage?.r2 !== true) throw new Error('Probe did not use the real R2 binding')
  if (!Array.isArray(payload.translations)) throw new Error('Probe did not return translations')
  if (payload.translations.length !== SOURCE_TEXTS.length) throw new Error(`Probe returned ${payload.translations.length} translations for ${SOURCE_TEXTS.length} inputs`)

  const translations = payload.translations.map((item) => {
    if (typeof item !== 'string') throw new Error('Probe returned a non-string translation')
    return item
  })
  if (translations.some((translation, index) => translation.trim() === SOURCE_TEXTS[index])) {
    throw new Error('Probe left the Spanish sample untranslated')
  }

  const joined = translations.join(' ')
  for (const token of ['Capgo', 'Capacitor', 'code', 'API', 'SDK', 'CLI', 'npm', 'bun', 'GitHub', 'Cloudflare']) {
    if (!joined.includes(token)) throw new Error(`Probe translated or dropped protected token: ${token}`)
  }
}

async function fetchProbe(url: string): Promise<ProbePayload> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  let response: Response
  try {
    response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    })
  } finally {
    clearTimeout(timeout)
  }

  const text = await response.text()
  let payload: ProbePayload
  try {
    payload = JSON.parse(text) as ProbePayload
  } catch {
    throw new Error(`Probe returned non-JSON response ${response.status}: ${text.slice(0, 500)}`)
  }

  if (!response.ok) throw new Error(payload.error || `Probe returned HTTP ${response.status}`)
  assertProbePayload(payload)
  return payload
}

async function exitedCode(process: Bun.Subprocess<'pipe', 'pipe', 'inherit'>): Promise<number | null> {
  return await Promise.race([process.exited, sleep(0).then(() => null)])
}

await ensureDevelopmentBucket()

const port = await getFreePort()
const probeUrl = `http://127.0.0.1:${port}/__translation-test__/real-runtime`
const wrangler = Bun.spawn(
  [
    'bunx',
    'wrangler',
    'dev',
    '-c',
    WRANGLER_CONFIG,
    '--remote',
    '--ip',
    '127.0.0.1',
    '--port',
    String(port),
    '--log-level',
    'warn',
    '--show-interactive-dev-session=false',
    '--var',
    'TRANSLATION_TEST_MODE:1',
    '--var',
    `TRANSLATION_MODEL:${MODEL}`,
  ],
  {
    cwd: WORKER_DIR,
    stdout: 'pipe',
    stderr: 'pipe',
    stdin: 'inherit',
    env: {
      ...process.env,
      CI: 'true',
      NO_COLOR: '1',
    },
  },
)

void drainStream(wrangler.stdout)
void drainStream(wrangler.stderr)

let lastError: unknown = null
let passed = false
const deadline = Date.now() + TIMEOUT_MS

try {
  while (Date.now() < deadline) {
    const code = await exitedCode(wrangler)
    if (code !== null) throw new Error(`wrangler dev exited early with code ${code}`)

    try {
      const payload = await fetchProbe(probeUrl)
      console.log(`Real translation worker probe passed with ${payload.model}`)
      passed = true
      break
    } catch (error) {
      lastError = error
      await sleep(3000)
    }
  }

  if (!passed) {
    throw new Error(`Timed out waiting for real translation worker probe: ${lastError instanceof Error ? lastError.message : String(lastError)}`)
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  if (wranglerLog.trim()) {
    console.error('\nwrangler output:')
    console.error(wranglerLog.trim())
  }
  process.exitCode = 1
} finally {
  try {
    wrangler.kill('SIGTERM')
  } catch {
    // The dev process may already have exited.
  }
  await Promise.race([wrangler.exited, sleep(5000)])
}
