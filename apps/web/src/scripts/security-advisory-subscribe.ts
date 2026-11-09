import { SECURITY_ADVISORY_SUBSCRIBE_URL, isSecurityAdvisorySubscribeUrlReady } from '@/config/securityAdvisorySubscribe'

const form = document.getElementById('security-advisory-subscribe-form')
const emailInput = document.getElementById('security-advisory-email') as HTMLInputElement | null
const status = document.getElementById('security-advisory-subscribe-status') as HTMLElement | null
const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null

const messages = {
  success: form?.dataset.successMessage ?? 'You are on the list. Watch your inbox for the next advisory.',
  invalidEmail: form?.dataset.invalidEmailMessage ?? 'Enter a valid email address.',
  unavailable: form?.dataset.unavailableMessage ?? 'Sign-up is temporarily unavailable. Try again later.',
  network: form?.dataset.networkMessage ?? 'We could not reach the server. Check your connection and try again.',
  rateLimited: form?.dataset.rateLimitedMessage ?? 'Too many attempts. Wait a few minutes and try again.',
  loading: form?.dataset.loadingMessage ?? 'Submitting...',
}

const subscribeUrl = SECURITY_ADVISORY_SUBSCRIBE_URL.trim()
const defaultSubmitLabel = submitButton?.textContent?.trim() ?? 'Subscribe'

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
    return
  }

  if (!isSecurityAdvisorySubscribeUrlReady(subscribeUrl)) {
    setStatus(messages.unavailable, 'error')
    return
  }

  submitButton.disabled = true
  emailInput.readOnly = true
  submitButton.textContent = messages.loading
  setStatus(messages.loading, 'loading')

  try {
    const response = await fetch(subscribeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      emailInput.value = ''
      setStatus(messages.success, 'success')
      ;(window as any).posthog?.capture('capacitor_security_advisory_subscribe', { ok: true })
      return
    }

    const data = (await response.json().catch(() => null)) as { error?: string } | null
    if (response.status === 429 || data?.error === 'rate_limited') {
      setStatus(messages.rateLimited, 'error')
    } else if (response.status === 503 || data?.error === 'subscription_unavailable') {
      setStatus(messages.unavailable, 'error')
    } else if (response.status === 400) {
      setStatus(messages.invalidEmail, 'error')
    } else {
      setStatus(messages.unavailable, 'error')
    }
    ;(window as any).posthog?.capture('capacitor_security_advisory_subscribe', { ok: false, status: response.status })
  } catch {
    setStatus(messages.network, 'error')
    ;(window as any).posthog?.capture('capacitor_security_advisory_subscribe', { ok: false, network: true })
  } finally {
    submitButton.disabled = false
    emailInput.readOnly = false
    submitButton.textContent = defaultSubmitLabel
  }
}

form?.addEventListener('submit', handleSubmit)
