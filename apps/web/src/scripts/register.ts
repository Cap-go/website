import { confirmWebsiteDesignSignup } from '@/lib/websiteDesignExperiment.client'
import { getRegistrationDevice } from '@/services/registration-device'
import { getRegisterUserMessage, RegisterApiError, registerUser } from '@/services/registration'
import Toastify from 'toastify-js'

const form = document.getElementById('registerForm')
const email = document.getElementById('email') as HTMLInputElement
const firstName = document.getElementById('firstName') as HTMLInputElement
const lastName = document.getElementById('lastName') as HTMLInputElement
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

  const registrationDevice = getRegistrationDevice(navigator.userAgent, navigator.maxTouchPoints)
  let result
  try {
    result = await registerUser({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      captchaToken: getCaptchaId(),
      registrationDeviceType: registrationDevice.registration_device_type,
      registrationOs: registrationDevice.registration_os,
      registrationBrowser: registrationDevice.registration_browser,
    })
  } catch (error) {
    isSubmitting = false
    submitButton.disabled = false
    console.error('Registration API error', error)
    ;(window as any).turnstile?.reset?.()
    const code = error instanceof RegisterApiError ? error.code ?? 'unknown' : 'unknown'
    ;(window as any).posthog?.capture('website_signup_error', { stage: 'auth', code })
    return Toastify({
      text: getRegisterUserMessage(error),
      style: {
        background: '#e7000b',
      },
    }).showToast()
  }

  confirmWebsiteDesignSignup(result.session.access_token)
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
  if ((window as any).fbq) {
    ;(window as any).fbq('track', 'CompleteRegistration', {
      content_name: 'Capgo signup',
      status: true,
    })
  }
  if ((window as any).Affonso?.signup) {
    const fullName = `${firstName.value} ${lastName.value}`.trim()
    ;(window as any).Affonso.signup({
      email: email.value,
      externalUserId: result.user.id,
      name: fullName || undefined,
    })
  }
  const consoleUrl = `https://console.capgo.app/login/?access_token=${result.session.access_token}&refresh_token=${result.session.refresh_token}&to=/app`
  await new Promise((resolve) => setTimeout(resolve, 400))
  window.location.href = consoleUrl
})
