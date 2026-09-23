import { expect, test } from 'bun:test'
import { buildMtaStsPolicy, handleMtaStsRequest, isMtaStsHost, mtaStsPolicyId } from '../src/worker/mta-sts.ts'

test('buildMtaStsPolicy for capgo.app lists Google Workspace MX hosts', () => {
  const policy = buildMtaStsPolicy('capgo.app')
  expect(policy).toContain('version: STSv1')
  expect(policy).toContain('mode: testing')
  expect(policy).toContain('max_age: 86400')
  expect(policy).toContain('mx: aspmx.l.google.com')
  expect(policy).toContain('mx: alt1.aspmx.l.google.com')
  expect(policy).toContain('mx: alt2.aspmx.l.google.com')
  expect(policy).toContain('mx: alt3.aspmx.l.google.com')
  expect(policy).toContain('mx: alt4.aspmx.l.google.com')
})

test('buildMtaStsPolicy for usecapgo.com lists Cloudflare Email Routing MX hosts', () => {
  const policy = buildMtaStsPolicy('usecapgo.com')
  expect(policy).toContain('mx: route3.mx.cloudflare.net')
  expect(policy).toContain('mx: route2.mx.cloudflare.net')
  expect(policy).toContain('mx: route1.mx.cloudflare.net')
})

test('handleMtaStsRequest serves policy on mta-sts.capgo.app', async () => {
  const response = handleMtaStsRequest(new Request('https://mta-sts.capgo.app/.well-known/mta-sts.txt'))
  expect(response?.status).toBe(200)
  expect(response?.headers.get('Content-Type')).toBe('text/plain; charset=utf-8')
  const body = await response?.text()
  expect(body).toContain('mx: aspmx.l.google.com')
})

test('handleMtaStsRequest serves policy on mta-sts.usecapgo.com', async () => {
  const response = handleMtaStsRequest(new Request('https://mta-sts.usecapgo.com/.well-known/mta-sts.txt'))
  expect(response?.status).toBe(200)
  const body = await response?.text()
  expect(body).toContain('mx: route1.mx.cloudflare.net')
})

test('handleMtaStsRequest returns 404 for other paths on mta-sts hosts', () => {
  const response = handleMtaStsRequest(new Request('https://mta-sts.capgo.app/'))
  expect(response?.status).toBe(404)
})

test('handleMtaStsRequest ignores non-mta-sts hosts', () => {
  expect(handleMtaStsRequest(new Request('https://capgo.app/.well-known/mta-sts.txt'))).toBeNull()
})

test('isMtaStsHost recognizes configured hosts', () => {
  expect(isMtaStsHost('mta-sts.capgo.app')).toBe(true)
  expect(isMtaStsHost('mta-sts.usecapgo.com')).toBe(true)
  expect(isMtaStsHost('capgo.app')).toBe(false)
})

test('mtaStsPolicyId returns stable ids for DNS TXT records', () => {
  expect(mtaStsPolicyId('capgo.app')).toBe('capgo-app-gws-20260923')
  expect(mtaStsPolicyId('usecapgo.com')).toBe('usecapgo-com-cf-20260923')
})
