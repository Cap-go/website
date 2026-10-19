import { expect, test } from 'bun:test'
import spec from '../public/.well-known/capgo-public-api-openapi.json'

const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'])

test('public API OpenAPI spec is complete enough for function calling', () => {
  expect(spec.openapi).toStartWith('3.')
  expect(spec.info.title).toContain('Capgo')
  expect(spec.servers[0].url).toBe('https://api.capgo.app')
  expect(spec.components.securitySchemes.CapgoApiKeyAuth.name).toBe('x-api-key')

  const operationIds = new Set()
  for (const methods of Object.values(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!HTTP_METHODS.has(method) || typeof operation !== 'object' || !operation) continue
      expect(operation.operationId).toBeTruthy()
      expect(operationIds.has(operation.operationId)).toBe(false)
      operationIds.add(operation.operationId)
      expect((operation.description || '').length).toBeGreaterThan(20)
      const ok = operation.responses?.['200']
      expect(ok?.content?.['application/json']?.schema).toBeDefined()
      if (method === 'post' || method === 'put' || method === 'patch') {
        expect(operation.requestBody?.content?.['application/json']?.schema).toBeDefined()
      }
    }
  }
  expect(operationIds.size).toBeGreaterThan(10)
})
