import { expect, test } from 'bun:test'
import { AGENT_NOT_FOUND_MARKDOWN, MCP_TOOLS, OPENAPI_ALIAS_PATHS, markdownNotFoundResponse, prefersMarkdown, withLlmsWhenToUse } from '../../shared/agentDiscovery'
import { createCapgoOrganization } from '../src/lib/ldJson.ts'

test('markdown 404 body points agents at sitemap, llms.txt, openapi, and docs', () => {
  expect(AGENT_NOT_FOUND_MARKDOWN.startsWith('# Page not found')).toBe(true)
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/sitemap-index.xml')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/llms.txt')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/openapi.json')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('https://capgo.app/docs/')
  expect(AGENT_NOT_FOUND_MARKDOWN).toContain('## When to use Capgo')
})

test('prefers markdown only when Accept ranks markdown over HTML', () => {
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown' } }))).toBe(true)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/html,text/markdown' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: '*/*' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=0.2, text/html' } }))).toBe(false)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/html;q=0.8, text/markdown' } }))).toBe(true)
  expect(prefersMarkdown(new Request('https://capgo.app/missing', { headers: { Accept: 'text/markdown;q=0' } }))).toBe(false)
})

test('markdown 404 HEAD responses have no body', async () => {
  const response = markdownNotFoundResponse(new Request('https://capgo.app/missing', { method: 'HEAD', headers: { Accept: 'text/markdown' } }))
  expect(response.status).toBe(404)
  expect(await response.text()).toBe('')
})

test('llms.txt injector adds a when-to-use section once', () => {
  const original = '# Capgo\n\n> Docs\n\n## Documentation Sets\n'
  const once = withLlmsWhenToUse(original)
  const twice = withLlmsWhenToUse(once)
  expect(once).toContain('## When to use Capgo')
  expect(once).toContain('npx @capgo/cli@latest mcp')
  expect(twice).toBe(once)
})

test('OpenAPI aliases include the conventional audit paths', () => {
  expect(OPENAPI_ALIAS_PATHS.has('/openapi.json')).toBe(true)
  expect(OPENAPI_ALIAS_PATHS.has('/.well-known/openapi.json')).toBe(true)
})

test('MCP tools have unique names and descriptions for function calling', () => {
  const names = MCP_TOOLS.map((tool) => tool.name)
  expect(new Set(names).size).toBe(names.length)
  for (const tool of MCP_TOOLS) {
    expect(tool.description.length).toBeGreaterThan(20)
    expect(tool.inputSchema.type).toBe('object')
  }
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
