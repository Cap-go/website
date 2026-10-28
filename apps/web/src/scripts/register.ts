import { getSignupAttributionForEvents, getSignupUserMetadataForRegistration } from '@/lib/attribution'
import { formatPasswordRequirementErrors, getPasswordRequirementErrors, getPasswordRuleStatus, RegisterApiError, registerUser } from '@/services/registration'
import { getRegistrationDevice } from '@/services/registration-device'
import Toastify from 'toastify-js'

const form = document.getElementById('registerForm')
const email = document.getElementById('email') as HTMLInputElement
const password = document.getElementById('password') as HTMLInputElement
const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement

let isSubmitting = false

const NETWORK_ERROR_FALLBACK = 'We could not reach Capgo. Check your connection or VPN and tap Sign up again. If it keeps failing, email support@capgo.app.'
const CAPTCHA_REQUIRED_FALLBACK = 'Check “Verify you are human” above, then tap Sign up again.'

// Tick each password rule as it is met, so nobody learns the policy from a failed submit.
function syncPasswordRules() {
  const status = getPasswordRuleStatus(password?.value ?? '')
  document.querySelectorAll<HTMLElement>('[data-password-rule]').forEach((item) => {
    item.classList.toggle('is-met', Boolean(status[item.dataset.passwordRule as keyof typeof status]))
  })
}
password?.addEventListener?.('input', syncPasswordRules)

const passwordToggle = document.getElementById('password-toggle') as HTMLButtonElement | null
passwordToggle?.addEventListener('click', () => {
  const show = password.type === 'password'
  password.type = show ? 'text' : 'password'
  passwordToggle.setAttribute('aria-pressed', String(show))
  passwordToggle.setAttribute('aria-label', (show ? passwordToggle.dataset.labelHide : passwordToggle.dataset.labelShow) ?? '')
  passwordToggle.querySelector('[data-eye-open]')?.classList.toggle('hidden', show)
  passwordToggle.querySelector('[data-eye-closed]')?.classList.toggle('hidden', !show)
})

// Turnstile can fail on its own (timeouts, blocked iframes, flaky networks). Retry quietly a couple of times,
// then tell the visitor what to change, instead of asking them to tick a box that never appeared.
const captchaStatus = document.getElementById('captcha-status') as HTMLElement | null
const CAPTCHA_AUTO_RETRIES = 2
let captchaFailures = 0

function setCaptchaStatus(text: string | undefined) {
  if (!captchaStatus) return
  captchaStatus.textContent = text ?? ''
  captchaStatus.classList.toggle('hidden', !text)
}

document.addEventListener?.('capgo-turnstile', (event) => {
  const { kind, code } = (event as CustomEvent<{ kind: string; code?: string }>).detail ?? {}
  const turnstile = (window as any).turnstile
  if (kind === 'success') {
    setCaptchaStatus(undefined)
    return
  }
  if (kind === 'expired') {
    turnstile?.reset?.()
    return
  }
  captchaFailures++
  ;(window as any).posthog?.capture('website_signup_error', { stage: 'captcha', code: `turnstile_${kind}`, turnstile_code: code, attempt: captchaFailures })
  if (captchaFailures <= CAPTCHA_AUTO_RETRIES) {
    setCaptchaStatus(captchaStatus?.dataset.retrying)
    window.setTimeout(() => turnstile?.reset?.(), 1500)
  } else {
    setCaptchaStatus(captchaStatus?.dataset.blocked)
  }
})

const emailExistsAlert = document.getElementById('email-exists-alert') as HTMLElement | null

function getCaptchaId() {
  if (!(window as any).turnstile) {
    return undefined
  }
  return (window as any).turnstile.getResponse() as string
}

// Validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

// Send hashed user data to the OpenAI ads pixel before the conversion so it can be matched
async function trackOpenAIRegistration(userId: string | undefined) {
  const oaiq = (window as any).oaiq
  if (!oaiq) return
  let eventId: string | undefined
  try {
    const user: Record<string, string> = {
      email_sha256: await sha256Hex(email.value.trim().toLowerCase()),
    }
    if (userId) {
      user.external_id_sha256 = await sha256Hex(userId.trim())
      // event_id reuses the hash so a server-side event can dedupe without exposing the raw ID
      eventId = `registration_${user.external_id_sha256}`
    }
    oaiq('init', { user })
  } catch (error) {
    console.error('OpenAI pixel user data error', error)
  }
  if (eventId) oaiq('measure', 'registration_completed', { type: 'customer_action' }, { event_id: eventId })
  else oaiq('measure', 'registration_completed', { type: 'customer_action' })
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (isSubmitting || submitButton.disabled) return
  ;(window as any).posthog?.capture('website_signup_submit')
  if (emailExistsAlert) emailExistsAlert.hidden = true

  // Validate email format
  if (!isValidEmail(email.value.trim())) {
    return Toastify({
      text: 'Please enter a valid email address',
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }

  const passwordErrors = getPasswordRequirementErrors(password.value)
  if (passwordErrors.length > 0) {
    ;(window as any).posthog?.capture('website_signup_error', { stage: 'validation', code: 'weak_password' })
    password.setAttribute('aria-invalid', 'true')
    password.focus()
    return Toastify({
      text: formatPasswordRequirementErrors(passwordErrors),
      duration: 8000,
      style: { background: '#e7000b' },
    }).showToast()
  }
  password.removeAttribute('aria-invalid')

  const captchaWidget = document.querySelector('.cf-turnstile')
  if (captchaWidget && !getCaptchaId()) {
    // The usual cause is an unticked "Verify you are human" box: point at it instead of suggesting a refresh that wipes the form.
    ;(window as any).posthog?.capture('website_signup_error', { stage: 'validation', code: 'captcha_missing' })
    ;(captchaWidget as HTMLElement).scrollIntoView?.({ block: 'center', behavior: 'smooth' })
    return Toastify({
      text: (form as HTMLElement | null)?.dataset?.captchaRequired || CAPTCHA_REQUIRED_FALLBACK,
      style: { background: '#e7000b' },
    }).showToast()
  }

  isSubmitting = true
  submitButton.disabled = true

  let user
  try {
    // A failed parser download must not block the signup itself.
    const device = await Promise.resolve(getRegistrationDevice(navigator.userAgent, navigator.maxTouchPoints)).catch(() => ({}))
    user = await registerUser({
      email: email.value,
      password: password.value,
      captcha_token: getCaptchaId() || undefined,
      ...device,
      ...getSignupUserMetadataForRegistration(),
    })
  } catch (error) {
    isSubmitting = false
    submitButton.disabled = false
    ;(window as any).turnstile?.reset?.()
    const code = error instanceof RegisterApiError ? error.code : 'transport'
    ;(window as any).posthog?.capture('website_signup_error', { stage: 'auth', code })
    // An existing account is not a failure to retry: point straight at sign in and password reset.
    if ((code === 'email_exists' || code === 'user_already_exists') && emailExistsAlert) {
      emailExistsAlert.hidden = false
      return
    }
    if (code === 'weak_password') {
      password.setAttribute('aria-invalid', 'true')
      password.focus()
    }
    return Toastify({
      text: code === 'transport' ? (form as HTMLElement | null)?.dataset?.networkError || NETWORK_ERROR_FALLBACK : (error as Error).message,
      duration: code === 'transport' || code === 'weak_password' ? 8000 : 3000,
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }
  // Trackers load after the page; a fast signup waits briefly for them so the conversion is still recorded.
  await (window as any).capgoThirdParty?.ready(1500)
  await trackOpenAIRegistration((user as any)?.user?.id)
  if ((window as any).datafast) {
    ;(window as any).datafast('signup', { email: email.value })
  }
  if ((window as any).posthog) {
    ;(window as any).posthog.capture('user_signed_up', {
      signup_confirmation: 'client',
      email: email.value,
      ...getSignupAttributionForEvents(),
    })
  }
  if ((window as any).Affonso?.signup) {
    ;(window as any).Affonso.signup({
      email: email.value,
      externalUserId: user.user.id,
    })
  }
  const consoleUrl = new URL('https://console.capgo.app/login/')
  consoleUrl.searchParams.set('access_token', user.session.access_token)
  consoleUrl.searchParams.set('refresh_token', user.session.refresh_token)
  consoleUrl.searchParams.set('to', '/app')
  await new Promise((resolve) => setTimeout(resolve, 400))
  window.location.href = consoleUrl.toString()
})
