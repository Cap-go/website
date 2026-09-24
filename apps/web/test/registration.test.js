import { afterEach, expect, mock, test } from 'bun:test'
import { getRegisterUserMessage, RegisterApiError, registerUser } from '../src/services/registration'

const baseApiUrl = 'https://api.capgo.app'

afterEach(() => {
  mock.restore()
})

test('registerUser posts signup payload to the Capgo auth register endpoint', async () => {
  const fetchMock = mock(async (url, init) => {
    expect(url).toBe(`${baseApiUrl}/auth/register`)
    expect(init?.method).toBe('POST')
    expect(init?.headers).toEqual({ 'Content-Type': 'application/json' })

    const body = JSON.parse(String(init?.body))
    expect(body).toEqual({
      email: 'user@example.com',
      password: 'secret',
      first_name: 'Jane',
      last_name: 'Doe',
      captcha_token: 'turnstile-token',
      registration_device_type: 'desktop',
      registration_os: 'macOS',
      registration_browser: 'Safari',
    })

    return new Response(
      JSON.stringify({
        user: { id: 'user-id' },
        session: {
          access_token: 'access-token',
          refresh_token: 'refresh-token',
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  })

  globalThis.fetch = fetchMock

  const result = await registerUser(
    {
      email: ' user@example.com ',
      password: 'secret',
      firstName: ' Jane ',
      lastName: ' Doe ',
      captchaToken: 'turnstile-token',
      registrationDeviceType: 'desktop',
      registrationOs: 'macOS',
      registrationBrowser: 'Safari',
    },
    baseApiUrl,
  )

  expect(result.user.id).toBe('user-id')
  expect(result.session.access_token).toBe('access-token')
})

test('registerUser throws RegisterApiError with API message on failure', async () => {
  globalThis.fetch = mock(async () => {
    return new Response(JSON.stringify({ error: 'email_exists', message: 'User already registered' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    })
  })

  await expect(
    registerUser(
      {
        email: 'user@example.com',
        password: 'secret',
        firstName: 'Jane',
        lastName: 'Doe',
        registrationDeviceType: 'desktop',
        registrationOs: 'macOS',
        registrationBrowser: 'Safari',
      },
      baseApiUrl,
    ),
  ).rejects.toMatchObject({
    message: 'User already registered',
    status: 409,
    code: 'email_exists',
  })
})

test('getRegisterUserMessage maps deleted accounts and missing endpoints', () => {
  expect(getRegisterUserMessage(new RegisterApiError('Account is in error', 403, 'account_deleted'))).toBe('Account is in error, please contact support at support@capgo.app')
  expect(getRegisterUserMessage(new RegisterApiError('Not found', 404, 'not_found'))).toBe(
    'Registration is temporarily unavailable. Please try again later or contact support@capgo.app.',
  )
})
