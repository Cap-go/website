import { useRuntimeConfig } from '@/config/app'

export interface RegisterUserInput {
  email: string
  password: string
  captcha_token?: string
  ref?: string
  signup_source?: string
  signup_plugin?: string
  first_touch_type?: string
  first_touch_path?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  registration_device_type?: string
  registration_os?: string
  registration_browser?: string
}

export interface RegisterUserResult {
  user: { id: string }
  session: { access_token: string; refresh_token: string }
}

export class RegisterApiError extends Error {
  constructor(
    message: string,
    readonly code = 'unknown',
  ) {
    super(message)
    this.name = 'RegisterApiError'
  }
}

export async function registerUser(input: RegisterUserInput, baseApiUrl = useRuntimeConfig().public.baseApiUrl): Promise<RegisterUserResult> {
  const response = await fetch(`${baseApiUrl.replace(/\/$/, '')}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, email: input.email.trim() }),
    signal: AbortSignal.timeout(30_000),
    redirect: 'error',
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new RegisterApiError(data?.message || 'Unable to create account. Please try again.', data?.error)
  }
  if (
    typeof data?.user?.id !== 'string' ||
    !data.user.id ||
    typeof data?.session?.access_token !== 'string' ||
    !data.session.access_token ||
    typeof data?.session?.refresh_token !== 'string' ||
    !data.session.refresh_token
  ) {
    throw new RegisterApiError('Registration returned an incomplete session. Please contact support@capgo.app.', 'invalid_response')
  }
  return data
}
