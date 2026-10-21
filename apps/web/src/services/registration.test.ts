import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

function client(fetch: (input: RequestInfo | URL, options?: RequestInit) => Promise<Response>) {
  const source = readFileSync(new URL('./registration.ts', import.meta.url), 'utf8')
    .replace(/^import .*\n/gm, '')
    .replace(/^export /gm, '')
  return runInNewContext(`${new Bun.Transpiler({ loader: 'ts' }).transformSync(source)}\n({ registerUser, RegisterApiError, getPasswordRequirementErrors })`, {
    fetch,
    AbortSignal,
    TextEncoder,
    useRuntimeConfig: () => ({ public: { baseApiUrl: 'https://api.example.com/' } }),
  })
}

const session = { user: { id: 'fake-user' }, session: { access_token: 'fake-access', refresh_token: 'fake-refresh' } }

test('registration posts nameless signup, CAPTCHA, device and referral fields to the API', async () => {
  const requests: { url: string; options: RequestInit }[] = []
  const { registerUser } = client(async (url, options) => {
    requests.push({ url: String(url), options: options! })
    return Response.json(session)
  })
  expect(
    await registerUser({ email: ' signup@example.com ', password: 'Password123!', captcha_token: 'captcha', ref: 'readme-example', registration_device_type: 'desktop' }),
  ).toEqual(session)
  expect(requests[0].url).toBe('https://api.example.com/auth/register')
  expect(requests[0].options.method).toBe('POST')
  expect(JSON.parse(String(requests[0].options.body))).toEqual({
    email: 'signup@example.com',
    password: 'Password123!',
    captcha_token: 'captcha',
    ref: 'readme-example',
    registration_device_type: 'desktop',
  })
})

test('API errors preserve their code and incomplete success responses cannot redirect', async () => {
  for (const [status, response, code] of [
    [409, { error: 'email_exists', message: 'User already registered' }, 'email_exists'],
    [200, { user: { id: 'fake-user' }, session: { access_token: 'fake-access' } }, 'invalid_response'],
  ] as const) {
    const { registerUser } = client(async () => Response.json(response, { status }))
    try {
      await registerUser({ email: 'signup@example.com', password: 'Password123!' })
      throw new Error('Expected registration to fail')
    } catch (error) {
      expect((error as { code: string }).code).toBe(code)
    }
  }
})

test('password policy errors from the API are shown instead of the generic message', async () => {
  const { registerUser } = client(async () =>
    Response.json(
      { error: 'invalid_request', message: 'Invalid registration request', errors: ['Password must contain at least one special character'] },
      { status: 400 },
    ),
  )
  await expect(registerUser({ email: 'signup@example.com', password: 'Abcdef123' })).rejects.toThrow('Password must contain at least one special character')
})

test('client-side password check mirrors the API policy', () => {
  const { getPasswordRequirementErrors } = client(async () => Response.json(session))
  expect(getPasswordRequirementErrors('Password123!')).toEqual([])
  expect(getPasswordRequirementErrors('xY7kq2mPzR9wB4n')).toEqual(['one special character (for example ! @ # - _ ?)'])
  expect(getPasswordRequirementErrors('abc')).toEqual([
    'at least 6 characters',
    'one uppercase letter',
    'one number',
    'one special character (for example ! @ # - _ ?)',
  ])
})

test('registration rejects redirects without forwarding credentials to their target', async () => {
  for (const status of [307, 308]) {
    let targetRequests = 0
    let registrationRequests = 0
    const target = Bun.serve({
      hostname: '127.0.0.1',
      port: 0,
      fetch: () => {
        targetRequests++
        return Response.json(session)
      },
    })
    const api = Bun.serve({
      hostname: '127.0.0.1',
      port: 0,
      fetch: () => {
        registrationRequests++
        return new Response(null, { status, headers: { Location: target.url.toString() } })
      },
    })
    try {
      const { registerUser } = client(fetch)
      await expect(registerUser({ email: 'signup@example.com', password: 'Password123!', captcha_token: 'fake-captcha' }, api.url.toString())).rejects.toThrow()
      expect(registrationRequests).toBe(1)
      expect(targetRequests).toBe(0)
    } finally {
      api.stop(true)
      target.stop(true)
    }
  }
})
