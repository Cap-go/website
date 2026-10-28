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
  /** Paid-ads pay-first offer (no free trial). The backend only acts on `direct`. */
  offer?: 'direct'
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

// Mirrors the password policy enforced by the /auth/register API so users see what is missing before submitting.
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_BYTES = 72
const PASSWORD_SPECIAL_CHARACTERS = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

export type PasswordRule = 'length' | 'lowercase' | 'uppercase' | 'number' | 'special'

// Drives the live checklist under the password field so mobile users fix the password before submitting.
export function getPasswordRuleStatus(password: string): Record<PasswordRule, boolean> {
  return {
    length: password.length >= PASSWORD_MIN_LENGTH,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: PASSWORD_SPECIAL_CHARACTERS.test(password),
  }
}

export function getPasswordRequirementErrors(password: string): string[] {
  const errors: string[] = []
  if (password.length < PASSWORD_MIN_LENGTH) errors.push(`at least ${PASSWORD_MIN_LENGTH} characters`)
  if (!/[a-z]/.test(password)) errors.push('one lowercase letter')
  if (!/[A-Z]/.test(password)) errors.push('one uppercase letter')
  if (!/\d/.test(password)) errors.push('one number')
  if (!PASSWORD_SPECIAL_CHARACTERS.test(password)) errors.push('one special character (for example ! @ # - _ ?)')
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) errors.push(`no more than ${PASSWORD_MAX_BYTES} bytes`)
  return errors
}

export function formatPasswordRequirementErrors(errors: string[]): string {
  return `Your password must contain ${errors.join(', ')}.`
}

function getApiErrorMessage(data: any): string {
  const details = Array.isArray(data?.errors) ? data.errors.filter((error: unknown) => typeof error === 'string' && error) : []
  if (details.length > 0) return details.join('. ')
  return data?.message || 'Unable to create account. Please try again.'
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
    throw new RegisterApiError(getApiErrorMessage(data), data?.error)
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
