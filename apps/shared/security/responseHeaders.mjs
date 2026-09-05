import { DOCS_CONTENT_SECURITY_POLICY, WEB_CONTENT_SECURITY_POLICY } from './csp.mjs'

const SHARED_SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(self), payment=(), usb=()',
}

function withContentSecurityPolicy(response, policy) {
  const headers = new Headers(response.headers)

  for (const [name, value] of Object.entries(SHARED_SECURITY_HEADERS)) {
    headers.set(name, value)
  }

  headers.set('Content-Security-Policy', policy)

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export function withWebSecurityHeaders(response) {
  return withContentSecurityPolicy(response, WEB_CONTENT_SECURITY_POLICY)
}

export function withDocsSecurityHeaders(response) {
  return withContentSecurityPolicy(response, DOCS_CONTENT_SECURITY_POLICY)
}
