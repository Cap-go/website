import { WEBSITE_DESIGN_EXPERIMENT, WEBSITE_DESIGN_SIGNUP_PATH, type WebsiteDesignAssignment } from './websiteDesignExperiment'

export function getWebsiteDesignContext(): WebsiteDesignAssignment | null {
  const read = (name: string) => document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content
  // A visitor exposed on an English page can later register on a shared translation.
  // Recover their prior exposure; never inject browser-specific data into translation caches.
  const stored = (key: string) => (window as any).posthog?.get_property?.(key)
  if ((read('website-design-experiment') ?? stored('website_design_experiment')) !== WEBSITE_DESIGN_EXPERIMENT) return null
  const variant = read('website-design-variant') ?? stored('website_design_variant')
  const visitorId = read('website-design-visitor') ?? stored('website_design_visitor_id')
  const issuedAt = Number(read('website-design-issued-at') ?? stored('website_design_issued_at'))
  if (!visitorId || !issuedAt || (variant !== 'control' && variant !== 'test')) return null
  return { visitorId, issuedAt, variant }
}

export function websiteDesignSignupMetadata() {
  const context = getWebsiteDesignContext()
  const posthog = (window as any).posthog
  const anonymousId = posthog?.get_distinct_id?.()
  if (!context || typeof anonymousId !== 'string' || !anonymousId.length || anonymousId.length > 200 || posthog?.has_opted_out_capturing?.()) return {}
  return {
    website_design_experiment: WEBSITE_DESIGN_EXPERIMENT,
    website_design_visitor_id: context.visitorId,
    website_design_variant: context.variant,
    website_design_anonymous_id: anonymousId,
  }
}

export function confirmWebsiteDesignSignup(accessToken: string | undefined) {
  if (!getWebsiteDesignContext() || !accessToken || (window as any).posthog?.has_opted_out_capturing?.()) return
  // Keep verification alive through the console redirect; analytics never blocks login.
  void fetch(WEBSITE_DESIGN_SIGNUP_PATH, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    keepalive: true,
  }).catch(() => {})
}
