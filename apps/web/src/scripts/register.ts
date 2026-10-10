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

if (submitButton) {
  submitButton.disabled = true
}

configReady
  .then((cfg) => {
    if (isSupabaseConfigured(cfg)) {
      if (!isSubmitting && submitButton) {
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
  if (isSubmitting || submitButton.disabled) return
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
        ref: new URLSearchParams(window.location.search).get('ref') ?? undefined,
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
  if ((window as any).datafast) {
    ;(window as any).datafast('signup', { email: email.value })
  }
  if ((window as any).posthog) {
    ;(window as any).posthog.capture('user_signed_up', {
      signup_confirmation: 'client',
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
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
