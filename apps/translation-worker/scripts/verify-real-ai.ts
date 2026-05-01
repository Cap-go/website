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
  page?: {
    path?: string
    locale?: string
    segmentCount?: number
    batchCount?: number
    translatedBatchCount?: number
    translatedSegmentCount?: number
    changedCount?: number
    samples?: unknown
  }
  translations?: unknown
  error?: string
}

const WORKER_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MODEL = process.env.TRANSLATION_REAL_TEST_MODEL || '@cf/meta/llama-3.1-8b-instruct-fast'
const TIMEOUT_MS = Number.parseInt(process.env.TRANSLATION_REAL_TEST_TIMEOUT_MS || '240000', 10)
const REQUEST_TIMEOUT_MS = Math.min(60_000, TIMEOUT_MS)
const LOG_LIMIT = 16_000
const WRANGLER_CONFIG = 'wrangler.real-test.jsonc'
const DEVELOPMENT_R2_BUCKET = 'capgo-translation-cache-development'
const SOURCE_TEXTS = ['Ship updates instantly', 'Pricing', 'Keep Capgo, Capacitor, code, API, SDK, CLI, npm, bun, GitHub, and Cloudflare unchanged.']
const REAL_PAGE_PROBES = ['/', '/docs/'] as const

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

async function runWrangler(args: string[], timeoutMs = REQUEST_TIMEOUT_MS): Promise<{ code: number; output: string }> {
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

  const completed = Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]).then(([stdout, stderr, code]) => ({
    code,
    output: `${stdout}${stderr}`,
  }))

  let timeout: ReturnType<typeof setTimeout> | undefined
  const timedOut = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(() => {
      void (async () => {
        try {
          child.kill('SIGTERM')
        } catch {
          // Process may already be gone.
        }
        await Promise.race([child.exited, sleep(5000)])
        reject(new Error(`wrangler ${args.join(' ')} timed out after ${timeoutMs}ms`))
      })().catch(reject)
    }, timeoutMs)
  })

  try {
    return await Promise.race([completed, timedOut])
  } finally {
    if (timeout) clearTimeout(timeout)
  }
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

async function fetchJsonProbe(url: string): Promise<ProbePayload> {
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
  return payload
}

async function fetchRuntimeProbe(url: string): Promise<ProbePayload> {
  const payload = await fetchJsonProbe(url)
  assertProbePayload(payload)
  return payload
}

async function fetchRealPageProbe(url: string, path: string): Promise<ProbePayload> {
  const payload = await fetchJsonProbe(url)
  if (!payload.ok) throw new Error(payload.error || `Real page probe failed for ${path}`)
  if (payload.model !== MODEL) throw new Error(`Real page probe used ${payload.model || 'unknown model'} instead of ${MODEL}`)

  const page = payload.page
  if (!page) throw new Error(`Real page probe returned no page result for ${path}`)
  if (page.path !== path) throw new Error(`Real page probe returned ${page.path || 'unknown path'} instead of ${path}`)
  if (page.locale !== 'es') throw new Error(`Real page probe returned ${page.locale || 'unknown locale'} instead of es`)
  if (!page.segmentCount || page.segmentCount < 1) throw new Error(`Real page probe found no segments for ${path}`)
  if (!page.batchCount || page.batchCount < 1) throw new Error(`Real page probe found no batches for ${path}`)
  if (!page.translatedBatchCount || page.translatedBatchCount < 1) throw new Error(`Real page probe translated no batches for ${path}`)
  if (!page.translatedSegmentCount || page.translatedSegmentCount < 1) throw new Error(`Real page probe translated no segments for ${path}`)
  if (!page.changedCount || page.changedCount < 1) throw new Error(`Real page probe left ${path} untranslated`)
  if (!Array.isArray(page.samples) || page.samples.length < 1) throw new Error(`Real page probe returned no translated samples for ${path}`)

  return payload
}

async function exitedCode(process: Bun.Subprocess<'pipe', 'pipe', 'inherit'>): Promise<number | null> {
  return await Promise.race([process.exited, sleep(0).then(() => null)])
}

await ensureDevelopmentBucket()

const port = await getFreePort()
const probeBaseUrl = `http://127.0.0.1:${port}`
const runtimeProbeUrl = `${probeBaseUrl}/__translation-test__/real-runtime`
const realPageProbeUrls = REAL_PAGE_PROBES.map((path) => ({
  path,
  url: `${probeBaseUrl}/__translation-test__/real-page?path=${encodeURIComponent(path)}&locale=es&batches=2`,
}))
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
      const payload = await fetchRuntimeProbe(runtimeProbeUrl)
      for (const probe of realPageProbeUrls) {
        await fetchRealPageProbe(probe.url, probe.path)
      }
      console.log(`Real translation worker probe passed with ${payload.model} on ${REAL_PAGE_PROBES.join(', ')}`)
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
