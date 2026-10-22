import { expect, test } from 'bun:test'
import { existsSync, readFileSync } from 'node:fs'
import {
  AGENT_NOT_FOUND_MARKDOWN,
  AUTH_MD_MARKDOWN,
  HOSTED_MCP_TOOL_GROUPS,
  HOSTED_MCP_URL,
  LLMS_WHEN_TO_USE_PATHS,
  WHEN_TO_USE_MARKDOWN,
  OPENAPI_ALIAS_PATHS,
  markdownNotFoundResponse,
  prefersMarkdown,
  withLlmsWhenToUse,
} from '../../shared/agentDiscovery'
import { createCapgoOrganization } from '../src/lib/ldJson.ts'

test('markdown 404 body points agents at sitemap, llms.txt, openapi, and docs', () => {
  expect(AGENT_NOT_FOUND_MARKDOWN.startsWith('# Page not found')).toBe(true)
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/sitemap-index.xml')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/llms.txt')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/openapi.json')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/docs/')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('## When to use Capgo')
})

test('auth.md documents agent audience, registration methods, and credential use', () => {
  expect(AUTH_MD_MARKDOWN.split('\n')[0]).toMatch(/^# .*auth\.md/)
  expect(AUTH_MD_MARKDOWN).toContain('## Audience')
  expect(AUTH_MD_MARKDOWN).toContain('https://api.capgo.app/.well-known/oauth-protected-resource/mcp')
  expect(AUTH_MD_MARKDOWN).toContain('https://capgo.app/.well-known/oauth-authorization-server')
  expect(AUTH_MD_MARKDOWN).toContain('https://api.capgo.app/mcp/oauth/register')
  expect(AUTH_MD_MARKDOWN).toContain('Authorization: Bearer')
  expect(AUTH_MD_MARKDOWN).toContain('x-api-key')
  expect(WHEN_TO_USE_MARKDOWN).toContain('https://capgo.app/auth.md')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/auth.md')
})

test('prefers markdown only when Accept ranks markdown over HTML', () => {
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown' } }))).toBe(true)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/html,text/markdown' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: '*/*' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=0.2, text/html' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/html;q=0.8, text/markdown' } }))).toBe(true)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=0' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=0.1, */*' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=2' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=bogus' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=.5' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=01' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=0.1234' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/html;q=0.2, text/markdown;q=0.8, */*;q=1' } }))).toBe(true)
})

test('markdown 404 HEAD responses have no body', async () => {
  const response = markdownNotFoundResponse(new Request('https://capgo.app/missing', { method: 'HEAD', headers: { Accept: 'text/markdown' } }))
  expect(response.status).toBe(404)
  expect(await response.text()).toBe('')
})

test('when-to-use injector runs for llms.txt and llms-full.txt', () => {
  expect(LLMS_WHEN_TO_USE_PATHS.has('/llms.txt')).toBe(true)
  expect(LLMS_WHEN_TO_USE_PATHS.has('/llms-full.txt')).toBe(true)
})

test('llms.txt injector adds a when-to-use section once', () => {
  const original = '# Capgo\n\n> Docs\n\n## Documentation Sets\n'
  const once = withLlmsWhenToUse(original)
  const twice = withLlmsWhenToUse(once)
  expect(once).toContain('## When to use Capgo')
  expect(once).toContain('npx @capgo/cli@latest mcp')
  expect(once).toContain('updates are blocked until the billing cycle ends')
  expect(once).toContain('non-refundable')
  expect(twice).toBe(once)
})

test('OpenAPI aliases include the conventional audit paths', () => {
  expect(OPENAPI_ALIAS_PATHS.has('/openapi.json')).toBe(true)
  expect(OPENAPI_ALIAS_PATHS.has('/.well-known/openapi.json')).toBe(true)
})

test('agent guidance only advertises the hosted MCP server', () => {
  expect(HOSTED_MCP_URL).toBe('https://api.capgo.app/mcp')
  expect(WHEN_TO_USE_MARKDOWN).toContain('https://api.capgo.app/mcp')
  expect(WHEN_TO_USE_MARKDOWN).not.toMatch(/https:\/\/capgo\.app\/mcp/)
  const ids = HOSTED_MCP_TOOL_GROUPS.map((group) => group.id)
  expect(new Set(ids).size).toBe(ids.length)
  expect(ids).toContain('docs')
})

test('organization schema includes postal address and support contact', () => {
  const org = createCapgoOrganization({
    brand: 'Capgo',
    blog_title: 'Capgo Blog',
    blog_description: 'Capgo blog',
    blog_keywords: 'capacitor',
    baseUrl: 'https://capgo.app',
    baseApiUrl: 'https://api.capgo.app',
  })
  expect(org.address).toMatchObject({
    '@type': 'PostalAddress',
    streetAddress: 'Sepapaja 6',
    addressLocality: 'Tallinn',
    addressCountry: 'EE',
  })
  expect(org.contactPoint).toMatchObject({
    contactType: 'technical support',
    email: 'support@capgo.app',
  })
  expect(org.legalName).toBe('Digital Shift OÜ')
})

const catalogFile = (name) => JSON.parse(readFileSync(new URL(`../public/.well-known/${name}`, import.meta.url), 'utf8'))

test('ARD ai-catalog lists Capgo agent resources with valid entries', () => {
  const catalog = catalogFile('ai-catalog.json')
  // ard.json is the current ARD path; ai-catalog.json the predecessor that scanners still read.
  expect(catalogFile('ard.json')).toEqual(catalog)
  expect(catalog.specVersion).toBeTruthy()
  expect(catalog.host).toMatchObject({ displayName: 'Capgo', identifier: 'did:web:capgo.app' })
  expect(catalog.entries.length).toBeGreaterThan(0)
  const identifiers = new Set()
  for (const entry of catalog.entries) {
    expect(entry.identifier).toMatch(/^urn:air:capgo\.app:[a-z0-9-]+:[a-z0-9-]+$/)
    expect(identifiers.has(entry.identifier)).toBe(false)
    identifiers.add(entry.identifier)
    expect(entry.displayName).toBeTruthy()
    expect(entry.type).toMatch(/^application\/[a-z0-9.+-]+$/)
    expect('url' in entry !== 'data' in entry).toBe(true)
    expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2)
    expect(entry.representativeQueries.length).toBeLessThanOrEqual(5)
    const local = entry.url.replace('https://capgo.app/', '')
    expect(existsSync(new URL(`../public/${local}`, import.meta.url)), entry.url).toBe(true)
  }
  const skills = JSON.parse(readFileSync(new URL('../public/.well-known/agent-skills/index.json', import.meta.url), 'utf8')).skills
  for (const skill of skills) expect(identifiers.has(`urn:air:capgo.app:skill:${skill.name}`), skill.name).toBe(true)
})

test('robots.txt points agents at the ARD catalog', () => {
  expect(readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8')).toContain('Agentmap: https://capgo.app/.well-known/ai-catalog.json')
})

test('Personal Agent Protocol discovery names Capgo without claiming unimplemented interfaces', () => {
  expect(catalogFile('poppy.json')).toEqual({ protocol_version: '0.1', organization: { name: 'Capgo', domain: 'capgo.app' }, web: {} })
})
