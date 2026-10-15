import type { AppleCompletion } from './apple-signup'

interface SignupAnalytics {
  oaiq?: (...args: any[]) => unknown
  datafast?: (...args: any[]) => unknown
  posthog?: { capture: (event: string, properties: Record<string, unknown>) => unknown }
  Affonso?: { signup: (properties: Record<string, unknown>) => unknown }
}

// Optional measurement integrations must never interrupt authentication.
function measure(action: () => void) {
  try {
    action()
  } catch {
    /* Analytics may be blocked by the browser. */
  }
}

export function reportAppleRegistration(analytics: SignupAnalytics, completion: AppleCompletion, attribution: Record<string, string>): void {
  if (completion.is_new_user !== true) return
  const { id, email } = completion.user
  measure(() => {
    analytics.oaiq?.('measure', 'registration_completed', { type: 'customer_action' })
  })
  if (email)
    measure(() => {
      analytics.datafast?.('signup', { email })
    })
  measure(() => {
    analytics.posthog?.capture('user_signed_up', {
      signup_confirmation: 'client',
      signup_provider: 'apple',
      ...(email ? { email } : {}),
      ...attribution,
    })
  })
  if (email && id)
    measure(() => {
      analytics.Affonso?.signup({ email, externalUserId: id })
    })
}
