#!/usr/bin/env bun

/**
 * Runs shell commands concurrently, prefixes their output, and exits non-zero if any fails.
 * Usage: bun run scripts/run-parallel.ts "bun run seo:check" "bun run contrast:check"
 */

const commands = process.argv.slice(2)
if (commands.length === 0) {
  console.error('Usage: bun run scripts/run-parallel.ts "<command>" ["<command>" ...]')
  process.exit(1)
}

async function pipe(stream: ReadableStream<Uint8Array>, prefix: string, write: (line: string) => void) {
  const decoder = new TextDecoder()
  let buffered = ''
  for await (const chunk of stream) {
    buffered += decoder.decode(chunk, { stream: true })
    const lines = buffered.split('\n')
    buffered = lines.pop() ?? ''
    for (const line of lines) write(`${prefix} ${line}\n`)
  }
  if (buffered) write(`${prefix} ${buffered}\n`)
}

const started = Date.now()
const results = await Promise.all(
  commands.map(async (command, index) => {
    const prefix = `[${index + 1}]`
    console.log(`${prefix} $ ${command}`)
    const proc = Bun.spawn(['sh', '-c', command], { stdout: 'pipe', stderr: 'pipe', env: process.env })
    await Promise.all([pipe(proc.stdout, prefix, (line) => process.stdout.write(line)), pipe(proc.stderr, prefix, (line) => process.stderr.write(line))])
    const exitCode = await proc.exited
    console.log(`${prefix} exited with ${exitCode} after ${((Date.now() - started) / 1000).toFixed(1)}s: ${command}`)
    return exitCode
  }),
)

const failed = results.filter((code) => code !== 0).length
if (failed > 0) {
  console.error(`${failed} of ${commands.length} commands failed`)
  process.exit(1)
}
