import { describe, expect, test } from 'bun:test'
import { withDevHostNoindex } from '../../shared/devHostNoindex'

describe('withDevHostNoindex', () => {
  test('adds X-Robots-Tag on development.capgo.app', () => {
    const res = withDevHostNoindex(new Request('https://development.capgo.app/pricing/'), new Response('ok', { headers: { 'Content-Type': 'text/html' } }))
    expect(res.headers.get('X-Robots-Tag')).toBe('noindex, nofollow')
    expect(res.headers.get('Content-Type')).toBe('text/html')
  })
  test('leaves production untouched', () => {
    const original = new Response('ok')
    expect(withDevHostNoindex(new Request('https://capgo.app/pricing/'), original)).toBe(original)
  })
})
