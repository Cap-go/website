import { expect, test } from 'bun:test'
import spec from '../public/.well-known/capgo-public-api-openapi.json'

const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'])

test('public API OpenAPI spec is complete enough for function calling', () => {
  expect(spec.openapi).toStartWith('3.')
  expect(spec.info.title).toContain('Capgo')
  expect(spec.servers[0].url).toBe('https://api.capgo.app/v1')
  expect(spec.servers[1].url).toBe('https://api.capgo.app')
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

function* operations() {
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (HTTP_METHODS.has(method) && operation && typeof operation === 'object') yield [`${method.toUpperCase()} ${path}`, operation]
    }
  }
}

test('public API declares OAuth 2.0 with named scopes that match the authorization server', () => {
  const { CapgoOAuth, CapgoBearerAuth } = spec.components.securitySchemes
  expect(CapgoOAuth.type).toBe('oauth2')
  expect(CapgoOAuth.flows.authorizationCode).toMatchObject({
    authorizationUrl: 'https://api.capgo.app/mcp/oauth/authorize',
    tokenUrl: 'https://api.capgo.app/mcp/oauth/token',
  })
  // Must match scopes_supported in the authorization server and protected resource metadata.
  expect(Object.keys(CapgoOAuth.flows.authorizationCode.scopes)).toEqual(['capgo'])
  expect(CapgoBearerAuth).toMatchObject({ type: 'http', scheme: 'bearer' })
  expect(spec.security).toContainEqual({ CapgoOAuth: ['capgo'] })
  expect(spec.security).toContainEqual({ CapgoApiKeyAuth: [] })
  expect(spec.info.description).not.toContain('rather than OAuth')
})

test('every error response uses the typed error schema', () => {
  expect(spec.components.schemas.ErrorResponse.required).toEqual(['error', 'message'])
  for (const [name, operation] of operations()) {
    const errorCodes = Object.keys(operation.responses).filter((code) => code === 'default' || /^[45]/.test(code))
    expect(errorCodes, name).toContain('default')
    expect(errorCodes.some((code) => code.startsWith('4')), name).toBe(true)
    expect(errorCodes.some((code) => code.startsWith('5')), name).toBe(true)
    for (const code of errorCodes) {
      expect(operation.responses[code].content?.['application/json']?.schema, `${name} ${code}`).toEqual({ $ref: '#/components/schemas/ErrorResponse' })
    }
  }
})

test('responses document the rate-limit headers and 429 Retry-After', () => {
  for (const [name, operation] of operations()) {
    expect(Object.keys(operation.responses['200'].headers ?? {}), name).toEqual(expect.arrayContaining(['RateLimit', 'RateLimit-Policy']))
    expect(operation.responses['429']?.headers?.['Retry-After'], name).toBeDefined()
  }
  expect(spec.info.description).toContain('RateLimit-Policy')
  expect(spec.info.description).toContain('2,000 requests per minute')
})

test('public API publishes a versioning and deprecation policy', () => {
  expect(spec.info.version).toBe('1.0.0')
  expect(spec.info.description).toContain('https://api.capgo.app/v1')
  expect(spec.info.description).toContain('`Deprecation` header (RFC 9745)')
  expect(spec.info.description).toContain('`Sunset` header (RFC 8594)')
})
