import { BENTO_SECURITY_ADVISORY_SUBSCRIBE_PATH } from '@/config/bentoMarketing'

const form = document.getElementById('security-advisory-subscribe-form')
const emailInput = document.getElementById('security-advisory-email') as HTMLInputElement | null
const status = document.getElementById('security-advisory-subscribe-status') as HTMLElement | null
const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null

const messages = {
  success: form?.dataset.successMessage ?? 'You are on the list. Watch your inbox for the next advisory.',
  invalidEmail: form?.dataset.invalidEmailMessage ?? 'Enter a valid email address.',
  unavailable: form?.dataset.unavailableMessage ?? 'Sign-up is temporarily unavailable. Try again later.',
  network: form?.dataset.networkMessage ?? 'We could not reach the server. Check your connection and try again.',
}

function setStatus(text: string, tone: 'neutral' | 'success' | 'error') {
  if (!status) return
  status.textContent = text
  status.hidden = !text
  status.dataset.tone = tone
}

async function handleSubmit(event: Event) {
  event.preventDefault()
  if (!emailInput || !submitButton) return

  const email = emailInput.value.trim().toLowerCase()
  if (!email || !email.includes('@')) {
    setStatus(messages.invalidEmail, 'error')
    return
  }

  submitButton.disabled = true
  setStatus('', 'neutral')

  try {
    const response = await fetch(BENTO_SECURITY_ADVISORY_SUBSCRIBE_PATH, {
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
    if (response.status === 503 || data?.error === 'subscription_unavailable') {
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
  }
}

form?.addEventListener('submit', handleSubmit)
