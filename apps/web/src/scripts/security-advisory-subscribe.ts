import { SECURITY_ADVISORY_SUBSCRIBE_URL, isSecurityAdvisorySubscribeFormReady } from '@/config/securityAdvisorySubscribe'

const form = document.getElementById('security-advisory-subscribe-form')
const emailInput = document.getElementById('security-advisory-email') as HTMLInputElement | null
const status = document.getElementById('security-advisory-subscribe-status') as HTMLElement | null
const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null

const messages = {
  success: form?.dataset.successMessage ?? 'Check your inbox to confirm your subscription.',
  invalidEmail: form?.dataset.invalidEmailMessage ?? 'Enter a valid email address.',
  unavailable: form?.dataset.unavailableMessage ?? 'Sign-up is temporarily unavailable. Try again later.',
  network: form?.dataset.networkMessage ?? 'We could not reach the server. Check your connection and try again.',
  loading: form?.dataset.loadingMessage ?? 'Submitting...',
  captchaRequired: form?.dataset.captchaRequiredMessage ?? 'Complete the verification check, then try again.',
}

const subscribeUrl = SECURITY_ADVISORY_SUBSCRIBE_URL.trim()
const defaultSubmitLabel = submitButton?.textContent?.trim() ?? 'Subscribe'

function turnstileApi(): { getResponse: () => string; reset: () => void } | undefined {
  return (window as { turnstile?: { getResponse: () => string; reset: () => void } }).turnstile
}

function resetTurnstile() {
  turnstileApi()?.reset?.()
}

function getTurnstileToken(): string {
  const token = turnstileApi()?.getResponse?.() ?? ''
  return typeof token === 'string' ? token.trim() : ''
}

function setStatus(text: string, tone: 'neutral' | 'success' | 'error' | 'loading') {
  if (!status) return
  status.textContent = text
  status.dataset.tone = tone === 'loading' ? 'neutral' : tone
}

async function handleSubmit(event: Event) {
  event.preventDefault()
  if (!emailInput || !submitButton) return

  const email = emailInput.value.trim().toLowerCase()
  if (!email || !email.includes('@')) {
    setStatus(messages.invalidEmail, 'error')
    resetTurnstile()
    return
  }

  if (!isSecurityAdvisorySubscribeFormReady()) {
    setStatus(messages.unavailable, 'error')
    resetTurnstile()
    return
  }

  const turnstileToken = getTurnstileToken()
  if (!turnstileToken) {
    setStatus(messages.captchaRequired, 'error')
    resetTurnstile()
    return
  }

  submitButton.disabled = true
  emailInput.readOnly = true
  submitButton.textContent = messages.loading
  setStatus(messages.loading, 'loading')

  try {
    const response = await fetch(subscribeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Turnstile-Token': turnstileToken,
      },
      body: JSON.stringify({ email }),
    })

    if (response.status >= 200 && response.status < 300) {
      emailInput.value = ''
      setStatus(messages.success, 'success')
      ;(window as { posthog?: { capture: (event: string, props: Record<string, unknown>) => void } }).posthog?.capture('capacitor_security_advisory_subscribe', {
        ok: true,
        status: response.status,
      })
      return
    }

    if (response.status === 400) {
      setStatus(messages.invalidEmail, 'error')
    } else {
      setStatus(messages.unavailable, 'error')
    }
    ;(window as { posthog?: { capture: (event: string, props: Record<string, unknown>) => void } }).posthog?.capture('capacitor_security_advisory_subscribe', {
      ok: false,
      status: response.status,
    })
  } catch {
    setStatus(messages.network, 'error')
    ;(window as { posthog?: { capture: (event: string, props: Record<string, unknown>) => void } }).posthog?.capture('capacitor_security_advisory_subscribe', {
      ok: false,
      network: true,
    })
  } finally {
    submitButton.disabled = false
    emailInput.readOnly = false
    submitButton.textContent = defaultSubmitLabel
    resetTurnstile()
  }
}

form?.addEventListener('submit', handleSubmit)
