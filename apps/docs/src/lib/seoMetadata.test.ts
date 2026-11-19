import { expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pluginSetupMetadata, truncateDescription } from './seoMetadata'

test('published generic plugin setup pages all get distinct plugin-specific metadata', () => {
  const root = new URL('../content/docs/docs/plugins/', import.meta.url)
  const titles: string[] = []
  for (const slug of readdirSync(root)) {
    let source: string
    try {
      source = readFileSync(join(root.pathname, slug, 'getting-started.mdx'), 'utf8')
    } catch {
      continue
    }
    if (!/^title: ["']?Getting Started/m.test(source)) continue
    const meta = pluginSetupMetadata(`/docs/plugins/${slug}/getting-started/`, 'Getting started.')
    expect(meta, slug).not.toBeNull()
    expect(meta!.title).toContain('Capacitor Plugin: Setup')
    expect(meta!.description).not.toContain('Manage updates in realtime')
    titles.push(meta!.title)
  }
  expect(titles.length).toBeGreaterThan(100)
  expect(new Set(titles).size).toBe(titles.length)
})

test('setup metadata preserves proper plugin names and useful existing descriptions', () => {
  expect(pluginSetupMetadata('/docs/plugins/social-login/getting-started/', '')?.title).toBe('Social Login Capacitor Plugin: Setup | Capgo')
  expect(pluginSetupMetadata('/docs/plugins/camera-preview/getting-started/', '')?.description).toContain('Camera Preview')
  const description = 'Configure Google and Apple authentication for your Capacitor app with the Social Login plugin.'
  expect(pluginSetupMetadata('/docs/plugins/social-login/getting-started/', description)?.description).toBe(description)
  expect(pluginSetupMetadata('/docs/builder/getting-started/', '')).toBeNull()
})

test('descriptions stay concise instead of padding to an artificial minimum', () => {
  expect(truncateDescription('Short useful description.')).toBe('Short useful description.')
  expect(truncateDescription('A useful setup guide with configuration examples and installation instructions.', 45)).toBe('A useful setup guide with configuration…')
})
