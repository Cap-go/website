import { useRuntimeConfig } from '@/config/app'

export interface RegisterUserInput {
  email: string
  password: string
  firstName: string
  lastName: string
  captchaToken?: string
  registrationDeviceType: string
  registrationOs: string
  registrationBrowser: string
}

export interface RegisterUserResult {
  user: {
    id: string
  }
  session: {
    access_token: string
    refresh_token: string
  }
}

interface RegisterApiErrorBody {
  error?: string
  message?: string
}

export class RegisterApiError extends Error {
  readonly status: number
  readonly code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'RegisterApiError'
    this.status = status
    this.code = code
  }
}

const registerTimeoutMs = 30_000

function getRegisterUrl(baseApiUrl: string): string {
  return `${baseApiUrl.replace(/\/$/, '')}/auth/register`
}

function buildRegisterPayload(input: RegisterUserInput) {
  return {
    email: input.email.trim(),
    password: input.password,
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    ...(input.captchaToken ? { captcha_token: input.captchaToken } : {}),
    registration_device_type: input.registrationDeviceType,
    registration_os: input.registrationOs,
    registration_browser: input.registrationBrowser,
  }
}

async function parseRegisterError(response: Response): Promise<RegisterApiError> {
  let body: RegisterApiErrorBody | undefined
  try {
    body = (await response.json()) as RegisterApiErrorBody
  } catch {
    body = undefined
  }

  const message = body?.message?.trim() || 'Unable to create account. Please try again.'
  return new RegisterApiError(message, response.status, body?.error)
}

export async function registerUser(input: RegisterUserInput, baseApiUrl = useRuntimeConfig().public.baseApiUrl): Promise<RegisterUserResult> {
  const response = await fetch(getRegisterUrl(baseApiUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildRegisterPayload(input)),
    signal: AbortSignal.timeout(registerTimeoutMs),
  })

  if (!response.ok) {
    throw await parseRegisterError(response)
  }

  const data = (await response.json()) as RegisterUserResult
  if (!data?.user?.id || !data?.session?.access_token || !data?.session?.refresh_token) {
    throw new RegisterApiError('Registration succeeded but the response was incomplete. Please contact support@capgo.app.', response.status)
  }

  return data
}

export function getRegisterUserMessage(error: unknown): string {
  if (error instanceof RegisterApiError) {
    if (error.status === 404) {
      return 'Registration is temporarily unavailable. Please try again later or contact support@capgo.app.'
    }
    if (error.code === 'account_deleted') {
      return 'Account is in error, please contact support at support@capgo.app'
    }
    return error.message
  }

  if (error instanceof DOMException && error.name === 'TimeoutError') {
    return 'Registration timed out. Please try again.'
  }

  return 'Unable to create account. Please try again.'
}
