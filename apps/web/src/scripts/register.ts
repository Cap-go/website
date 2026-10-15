import { useRuntimeConfig } from '@/config/app'
import { getSignupAttributionForEvents, getSignupUserMetadataForRegistration } from '@/lib/attribution'
import { APPLE_CONSOLE_LOGIN_URL, buildAppleSignupUrl, isAppleSignupAvailable, readAppleCompletion } from '@/services/apple-signup'
import { reportAppleRegistration } from '@/services/registration-analytics'
import { getRegistrationDevice } from '@/services/registration-device'
import { getRemoteConfig, isSupabaseConfigured, useSupabase } from '@/services/supabase'
import Toastify from 'toastify-js'

const form = document.getElementById('registerForm')
const email = document.getElementById('email') as HTMLInputElement
const firstName = document.getElementById('firstName') as HTMLInputElement
const lastName = document.getElementById('lastName') as HTMLInputElement
const password = document.getElementById('password') as HTMLInputElement
const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement

const configReady = getRemoteConfig()
let isSubmitting = false
let isAppleStarting = false
let emailServiceReady = false
const appleSignup = document.getElementById('appleSignup')
const appleButton = document.getElementById('appleSignupButton') as HTMLButtonElement | null
const appleError = document.getElementById('appleSignupError')
const apiBaseUrl = useRuntimeConfig().public.baseApiUrl

// This capability is supplied by the shared backend only after provider setup and rollout.
// Email registration does not wait for this independent check.
if (appleSignup && appleButton) {
  void isAppleSignupAvailable(apiBaseUrl).then((enabled) => {
    appleSignup.hidden = !enabled
  })
  appleButton.addEventListener('click', async () => {
    if (isSubmitting || isAppleStarting) return
    isAppleStarting = true
    appleButton.disabled = true
    submitButton.disabled = true
    if (appleError) appleError.hidden = true
    // Open synchronously during the gesture so browser popup blockers can allow it.
    const popup = window.open('about:blank', '_blank', 'popup,width=520,height=720')
    let poll = 0
    let timeout = 0
    const finish = (message?: string) => {
      window.removeEventListener('message', onCompletion)
      window.clearInterval(poll)
      window.clearTimeout(timeout)
      isAppleStarting = false
      appleButton.disabled = false
      submitButton.disabled = !emailServiceReady || isSubmitting
      if (appleError && message) {
        appleError.textContent = message
        appleError.hidden = false
      }
    }
    const websiteState = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '')
    const attribution = getSignupAttributionForEvents()
    const experiment = document.querySelector<HTMLMetaElement>('meta[name="capgo-ab-flag"]')?.content ?? ''
    const variant = document.querySelector<HTMLMetaElement>('meta[name="capgo-ab-variant"]')?.content ?? ''
    const conversionProps = { ...attribution, ...(experiment && variant ? { [`$feature/${experiment}`]: variant } : {}) }
    const onCompletion = (event: MessageEvent) => {
      if (!popup) return
      const completion = readAppleCompletion(event, popup, websiteState)
      if (!completion) return
      // Remove the listener before reporting, so retries/duplicate messages count once.
      finish('You are signed in. Opening the Capgo console…')
      reportAppleRegistration(window as any, completion, conversionProps)
      window.setTimeout(() => {
        popup.close()
        // The console already owns the session. Its login bootstrap enforces MFA/onboarding.
        window.location.assign(APPLE_CONSOLE_LOGIN_URL)
      }, 400)
    }
    try {
      // Recheck so an operator can disable Apple between page load and click.
      if (!(await isAppleSignupAvailable(apiBaseUrl))) {
        appleSignup.hidden = true
        popup?.close()
        finish('Apple sign-in is unavailable. Please use email or try again later.')
        return
      }
      if (popup?.closed) {
        finish('Apple sign-in was cancelled. Try again or use email.')
        return
      }
      const metadata = getSignupUserMetadataForRegistration()
      const consoleUrl = buildAppleSignupUrl(
        {
          ...attribution,
          ...getRegistrationDevice(navigator.userAgent, navigator.maxTouchPoints),
          first_utm_source: metadata.utm_source ?? '',
          first_utm_medium: metadata.utm_medium ?? '',
          first_utm_campaign: metadata.utm_campaign ?? '',
          registration_experiment: experiment,
          registration_experiment_variant: variant,
        },
        websiteState,
      )
      // This event is an authentication intent, including returning users; it is not a conversion.
      try {
        ;(window as any).posthog?.capture('website_apple_signin_start', { provider: 'apple', ...attribution })
      } catch {
        /* Optional analytics. */
      }
      if (!popup) {
        // Browser-blocked popup: same-tab completion still uses only the shared backend.
        window.location.assign(consoleUrl)
        return
      }
      window.addEventListener('message', onCompletion)
      popup.location.href = consoleUrl
      if (appleError) {
        appleError.textContent = 'Complete sign-in in the Apple window. You can close it to cancel.'
        appleError.hidden = false
      }
      poll = window.setInterval(() => {
        if (popup.closed) finish('Apple sign-in was closed. If you did not finish, try again or use email.')
      }, 500)
      timeout = window.setTimeout(() => finish('Apple sign-in timed out. Try again or use email.'), 600_000)
    } catch {
      popup?.close()
      finish('Unable to open Apple sign-in. Please try again or use email.')
    }
  })
}

if (submitButton) {
  submitButton.disabled = true
}

configReady
  .then((cfg) => {
    if (isSupabaseConfigured(cfg)) {
      emailServiceReady = true
      if (!isSubmitting && !isAppleStarting && submitButton) {
        submitButton.disabled = false
      }
      return
    }
    if (!isSubmitting) {
      showConfigError()
    }
  })
  .catch(() => {
    if (!isSubmitting) {
      showConfigError()
    }
  })

function showConfigError() {
  return Toastify({
    text: 'Unable to load registration service. Please refresh the page and try again.',
    style: {
      background: '#e7000b',
    },
  }).showToast()
}

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

function isValidName(name: string): boolean {
  // Allow Unicode letters from all languages, spaces, hyphens, and apostrophes
  // Rejects numbers, URLs, and most special characters while supporting international names
  const nameRegex = /^[\p{L}\s'-]+$/u
  return nameRegex.test(name) && name.trim().length > 0
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (isSubmitting || isAppleStarting || submitButton.disabled) return
  ;(window as any).posthog?.capture('website_signup_submit')

  // Validate email format
  if (!isValidEmail(email.value.trim())) {
    return Toastify({
      text: 'Please enter a valid email address',
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }

  // Validate first name
  if (!isValidName(firstName.value)) {
    return Toastify({
      text: 'First name can only contain letters, spaces, hyphens, and apostrophes',
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }

  // Validate last name
  if (!isValidName(lastName.value)) {
    return Toastify({
      text: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }

  if (document.querySelector('.cf-turnstile') && !getCaptchaId()) {
    return Toastify({
      text: 'Security verification is not ready. Please wait a moment and try again, or refresh the page.',
      style: { background: '#e7000b' },
    }).showToast()
  }

  isSubmitting = true
  submitButton.disabled = true

  const cfg = await configReady
  if (!isSupabaseConfigured(cfg)) {
    isSubmitting = false
    return showConfigError()
  }

  let supabase
  try {
    supabase = useSupabase()
  } catch {
    isSubmitting = false
    return showConfigError()
  }
  const { data: deleted, error: errorDeleted } = await supabase.rpc('is_not_deleted', { email_check: email.value })
  if (errorDeleted) {
    console.error(errorDeleted)
    isSubmitting = false
    submitButton.disabled = false
    return Toastify({
      text: 'Unable to verify account status. Please try again.',
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }
  if (!deleted) {
    isSubmitting = false
    submitButton.disabled = false
    return Toastify({
      text: 'Account is in error, please contact support at support@capgo.app',
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }
  const registrationDevice = getRegistrationDevice(navigator.userAgent, navigator.maxTouchPoints)
  const { data: user, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      captchaToken: getCaptchaId(),
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
        ...registrationDevice,
        ...getSignupUserMetadataForRegistration(),
      },
    },
  })
  if (error) {
    isSubmitting = false
    submitButton.disabled = false
    console.error('Supabase signup error', error)
    ;(window as any).turnstile?.reset?.()
    ;(window as any).posthog?.capture('website_signup_error', { stage: 'auth', code: error.code ?? 'unknown' })
    return Toastify({
      text: error.message,
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }
  if (error || !user) {
    isSubmitting = false
    submitButton.disabled = false
    return
  }
  const session = await supabase.auth.getSession()
  if (session.error) {
    isSubmitting = false
    submitButton.disabled = false
    console.error('Supabase session error', session.error)
    return Toastify({
      text: session.error.message,
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }
  ;(window as any).oaiq?.('measure', 'registration_completed', { type: 'customer_action' })
  if ((window as any).datafast) {
    ;(window as any).datafast('signup', { email: email.value })
  }
  if ((window as any).posthog) {
    ;(window as any).posthog.capture('user_signed_up', {
      signup_confirmation: 'client',
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
      ...getSignupAttributionForEvents(),
    })
  }
  if ((window as any).Affonso?.signup) {
    const fullName = `${firstName.value} ${lastName.value}`.trim()
    ;(window as any).Affonso.signup({
      email: email.value,
      externalUserId: (user as any)?.user?.id,
      name: fullName || undefined,
    })
  }
  const consoleUrl = `https://console.capgo.app/login/?access_token=${session.data.session?.access_token}&refresh_token=${session.data.session?.refresh_token}&to=/app`
  await new Promise((resolve) => setTimeout(resolve, 400))
  window.location.href = consoleUrl
})
