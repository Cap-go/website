import { expect, test } from 'bun:test'
import spec from '../public/.well-known/capgo-public-api-openapi.json'

test('public API OpenAPI spec is complete enough for function calling', () => {
  expect(spec.openapi).toStartWith('3.')
  expect(spec.info.title).toContain('Capgo')
  expect(spec.servers[0].url).toBe('https://api.capgo.app')
  expect(spec.components.securitySchemes.CapgoApiKeyAuth.name).toBe('x-api-key')

  const operationIds = new Set<string>()
  for (const methods of Object.values(spec.paths)) {
    for (const [method, operation] of Object.entries(methods as Record<string, unknown>)) {
      if (method.startsWith('x-') || typeof operation !== 'object' || !operation) continue
      const op = operation as { operationId?: string; description?: string; responses?: Record<string, { content?: { 'application/json'?: { schema?: unknown } } }> }
      if (!op.operationId) continue
      expect(op.operationId).toBeTruthy()
      expect(operationIds.has(op.operationId)).toBe(false)
      operationIds.add(op.operationId)
      expect((op.description || '').length).toBeGreaterThan(20)
      const ok = op.responses?.['200']
      expect(ok?.content?.['application/json']?.schema).toBeDefined()
    }
  }
  expect(operationIds.size).toBeGreaterThan(10)
})
