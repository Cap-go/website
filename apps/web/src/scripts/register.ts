import { useRuntimeConfig } from '@/config/app'
import { confirmWebsiteDesignSignup, websiteDesignSignupMetadata } from '@/lib/websiteDesignExperiment.client'
import { getRegistrationDevice } from '@/services/registration-device'
import { createAuthClient } from 'better-auth/client'
import Toastify from 'toastify-js'

const form = document.getElementById('registerForm')
const email = document.getElementById('email') as HTMLInputElement
const firstName = document.getElementById('firstName') as HTMLInputElement
const lastName = document.getElementById('lastName') as HTMLInputElement
const password = document.getElementById('password') as HTMLInputElement
const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement

const auth = createAuthClient({
  baseURL: `${useRuntimeConfig().public.baseApiUrl}/auth`,
  fetchOptions: { credentials: 'include' },
})
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
    return Toastify({ text: 'Security verification is not ready. Please wait a moment and try again, or refresh the page.', style: { background: '#e7000b' } }).showToast()
  }

  isSubmitting = true
  submitButton.disabled = true

  const registrationDevice = getRegistrationDevice(navigator.userAgent, navigator.maxTouchPoints)
  const captchaToken = getCaptchaId()
  const payload = {
    email: email.value,
    password: password.value,
    name: `${firstName.value} ${lastName.value}`.trim(),
    firstName: firstName.value,
    lastName: lastName.value,
    ...registrationDevice,
    ...websiteDesignSignupMetadata(),
    callbackURL: 'https://console.capgo.app/login/',
    fetchOptions: { headers: captchaToken ? { 'x-captcha-response': captchaToken } : {} },
  }
  // Registration switches accounts; do not retain another user's API cookie.
  let result: Awaited<ReturnType<typeof auth.signUp.email>>
  try {
    const signedOut = await auth.signOut({ disableRedirect: true })
    if (signedOut.error) throw new Error(signedOut.error.message || 'Unable to clear the previous session')
    result = await auth.signUp.email(payload)
  } catch (requestError) {
    isSubmitting = false
    submitButton.disabled = false
    return Toastify({
      text: requestError instanceof Error ? requestError.message : 'Registration failed. Please try again.',
      style: { background: '#e7000b' },
    }).showToast()
  }
  const { data: user, error } = result
  if (error) {
    isSubmitting = false
    submitButton.disabled = false
    console.error('Registration failed', error)
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
  confirmWebsiteDesignSignup(user.token ? `capgo_session_${user.token}` : undefined)
  if ((window as any).datafast) {
    ;(window as any).datafast('signup', { email: email.value })
  }
  if ((window as any).posthog) {
    ;(window as any).posthog.capture('user_signed_up', {
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
  // Both origins use the same API session cookie; keep tokens out of URLs.
  const consoleUrl = `https://console.capgo.app/login/?registered=${user.token ? 'complete' : 'true'}`
  await new Promise((resolve) => setTimeout(resolve, 400))
  window.location.href = consoleUrl
})
