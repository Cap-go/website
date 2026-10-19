import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const skillsDir = path.resolve(repoRoot, 'apps', 'web', 'public', '.well-known', 'agent-skills')
const indexPath = path.join(skillsDir, 'index.json')

function normalizeSkillPath(url) {
  if (!url.startsWith('/.well-known/agent-skills/')) {
    throw new Error(`Unsupported agent skill URL: ${url}`)
  }

  const relativePath = url.slice('/.well-known/agent-skills/'.length)
  const resolvedPath = path.resolve(skillsDir, relativePath)
  const normalizedRelativePath = path.relative(skillsDir, resolvedPath)

  if (normalizedRelativePath.startsWith('..') || path.isAbsolute(normalizedRelativePath)) {
    throw new Error(`Unsupported agent skill URL: ${url}`)
  }

  return resolvedPath
}

function computeDigest(content) {
  const normalizedContent = content.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
  return `sha256:${createHash('sha256').update(normalizedContent, 'utf8').digest('hex')}`
}

async function main() {
  const indexContent = await readFile(indexPath, 'utf8')
  const registry = JSON.parse(indexContent)
  const mismatches = []

  if (!registry || typeof registry !== 'object' || !Array.isArray(registry.skills)) {
    console.error('Invalid agent skills registry: "skills" must be an array.')
    process.exitCode = 1
    return
  }

  for (const [index, skill] of registry.skills.entries()) {
    if (!skill || typeof skill !== 'object' || typeof skill.url !== 'string' || typeof skill.digest !== 'string') {
      console.error(`Invalid agent skill entry at index ${index}: expected object with string "url" and "digest".`)
      process.exitCode = 1
      continue
    }

    const skillPath = normalizeSkillPath(skill.url)
    const skillContent = await readFile(skillPath, 'utf8')
    const actualDigest = computeDigest(skillContent)

    if (skill.digest !== actualDigest) {
      mismatches.push({
        name: typeof skill.name === 'string' && skill.name ? skill.name : `skill[${index}]`,
        expected: skill.digest,
        actual: actualDigest,
      })
    }
  }

  if (mismatches.length === 0) {
    return
  }

  for (const mismatch of mismatches) {
    console.error(`Agent skill digest mismatch for ${mismatch.name}: expected ${mismatch.expected}, got ${mismatch.actual}`)
  }

  process.exitCode = 1
}

await main()
