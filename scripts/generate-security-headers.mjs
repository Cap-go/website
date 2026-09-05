import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { DOCS_CONTENT_SECURITY_POLICY, WEB_CONTENT_SECURITY_POLICY } from '../apps/shared/security/csp.mjs'

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const checkMode = process.argv.includes('--check') || !process.argv.includes('--write')

const targets = [
  {
    filePath: path.resolve(repoRoot, 'apps/web/public/_headers'),
    policy: WEB_CONTENT_SECURITY_POLICY,
  },
]

const cspLinePrefix = '  Content-Security-Policy: '
const permissionsPolicyLine =
  "  Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(self), payment=(), usb=()"

function upsertSecurityBlock(content, policy) {
  const lines = content.replace(/\n+$/, '').split('\n')
  const wildcardIndex = lines.findIndex((line) => line === '/*')

  if (wildcardIndex === -1) {
    throw new Error('Could not find wildcard /* block in _headers file.')
  }

  const nextBlockIndex = lines.findIndex((line, index) => index > wildcardIndex && line.startsWith('/'))
  const blockEnd = nextBlockIndex === -1 ? lines.length : nextBlockIndex

  const preservedPrefix = lines.slice(0, wildcardIndex + 1)
  const preservedSuffix = lines.slice(blockEnd)

  const securityBlock = [
    '  X-Content-Type-Options: nosniff',
    '  X-Frame-Options: DENY',
    '  Referrer-Policy: strict-origin',
    `${cspLinePrefix}${policy}`,
    permissionsPolicyLine,
    '  Link: </docs/public-api/>; rel="service-doc"; type="text/html"',
  ]

  return [...preservedPrefix, ...securityBlock, ...preservedSuffix].join('\n')
}

async function main() {
  const failures = []

  for (const target of targets) {
    const current = (await readFile(target.filePath, 'utf8')).replace(/\n+$/, '')
    const next = upsertSecurityBlock(current, target.policy)
    const relativePath = path.relative(repoRoot, target.filePath)

    if (current === next) {
      if (checkMode) {
        console.log(`${relativePath} security headers are up to date.`)
      }
      continue
    }

    if (checkMode) {
      failures.push(relativePath)
      console.error(`${relativePath} is out of date. Run \`bun run security:headers:write\`.`)
      continue
    }

    await writeFile(target.filePath, `${next}\n`, 'utf8')
    console.log(`Updated ${relativePath}`)
  }

  if (failures.length > 0) {
    process.exitCode = 1
  }
}

await main()
