import { RegisterApiError, registerUser } from '@/services/registration'
import { getRegistrationDevice } from '@/services/registration-device'
import Toastify from 'toastify-js'

const form = document.getElementById('registerForm')
const email = document.getElementById('email') as HTMLInputElement
const password = document.getElementById('password') as HTMLInputElement
const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement

let isSubmitting = false

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

  if (document.querySelector('.cf-turnstile') && !getCaptchaId()) {
    return Toastify({
      text: 'Security verification is not ready. Please wait a moment and try again, or refresh the page.',
      style: { background: '#e7000b' },
    }).showToast()
  }

  isSubmitting = true
  submitButton.disabled = true

  let user
  try {
    user = await registerUser({
      email: email.value,
      password: password.value,
      captcha_token: getCaptchaId() || undefined,
      ...getRegistrationDevice(navigator.userAgent, navigator.maxTouchPoints),
      ref: new URLSearchParams(window.location.search).get('ref') || undefined,
    })
  } catch (error) {
    isSubmitting = false
    submitButton.disabled = false
    ;(window as any).turnstile?.reset?.()
    ;(window as any).posthog?.capture('website_signup_error', { stage: 'auth', code: error instanceof RegisterApiError ? error.code : 'transport' })
    return Toastify({
      text: error instanceof RegisterApiError ? error.message : 'Unable to create account. Please try again.',
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
