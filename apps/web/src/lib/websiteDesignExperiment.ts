import routes from '../experiments/website-design/routes.json'

export const WEBSITE_DESIGN_EXPERIMENT = 'website-design-v1'
export const WEBSITE_DESIGN_EXPERIMENT_URL = 'https://eu.posthog.com/project/72308/experiments/99463'
export const WEBSITE_DESIGN_INTERNAL_PREFIX = '/website-experiment/control'
export const WEBSITE_DESIGN_COOKIE = 'capgo_website_design_v1'
export const WEBSITE_DESIGN_MAX_AGE = 60 * 60 * 24 * 60
export const WEBSITE_DESIGN_SIGNUP_PATH = '/api/website-design/signup'
// Public ingestion project key shared with the site's browser SDK.
export const LANDING_POSTHOG_PROJECT_KEY = 'phc_VwWolDCQHVlAFmRbGjkjV8LTp0xw3SgzJq0D2ZN0lce'
const routeSet = new Set(routes)

export function websiteDesignPublicUrl(url: URL): string {
  const internal = url.pathname === WEBSITE_DESIGN_INTERNAL_PREFIX || url.pathname.startsWith(`${WEBSITE_DESIGN_INTERNAL_PREFIX}/`)
  const pathname = internal ? url.pathname.slice(WEBSITE_DESIGN_INTERNAL_PREFIX.length) || '/' : url.pathname
  return new URL(pathname, url.origin).href
}

export type WebsiteDesignVariant = 'control' | 'test'
export interface WebsiteDesignAssignment {
  visitorId: string
  issuedAt: number
  variant: WebsiteDesignVariant
}

export function websiteDesignRoute(pathname: string): string | null {
  const path = pathname.replace(/\/index\.html$/, '/')
  const canonical = path.endsWith('/') ? path : `${path}/`
  return routeSet.has(canonical) ? canonical : null
}

export function variantForVisitor(visitorId: string): WebsiteDesignVariant {
  // A cryptographically random UUID's last nibble is uniform: eight values per arm.
  return parseInt(visitorId.slice(-1), 16) < 8 ? 'control' : 'test'
}

export function readWebsiteDesignAssignment(cookie: string | null, now = Date.now()): WebsiteDesignAssignment | null {
  const value = cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${WEBSITE_DESIGN_COOKIE}=`))
    ?.slice(WEBSITE_DESIGN_COOKIE.length + 1)
  if (!value) return null
  const match = /^v1\.([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.(\d{13})$/.exec(value)
  if (!match) return null
  const issuedAt = Number(match[2])
  if (issuedAt > now + 60_000 || issuedAt < now - WEBSITE_DESIGN_MAX_AGE * 1000) return null
  return { visitorId: match[1], issuedAt, variant: variantForVisitor(match[1]) }
}

export function createWebsiteDesignAssignment(now = Date.now()): WebsiteDesignAssignment {
  const visitorId = crypto.randomUUID()
  return { visitorId, issuedAt: now, variant: variantForVisitor(visitorId) }
}

export function websiteDesignCookie(assignment: WebsiteDesignAssignment, secure = true): string {
  return `${WEBSITE_DESIGN_COOKIE}=v1.${assignment.visitorId}.${assignment.issuedAt}; Path=/; Max-Age=${WEBSITE_DESIGN_MAX_AGE}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`
}

export function isWebsiteExperimentBot(userAgent: string): boolean {
  return /bot|crawler|spider|slurp|headless|preview|facebookexternalhit|GoogleOther|GPT|Claude|Perplexity|Bytespider/i.test(userAgent)
}

export function websiteDesignProperties(assignment: WebsiteDesignAssignment) {
  return {
    website_design_experiment: WEBSITE_DESIGN_EXPERIMENT,
    website_design_variant: assignment.variant,
    website_design_visitor_id: assignment.visitorId,
    [`$feature/${WEBSITE_DESIGN_EXPERIMENT}`]: assignment.variant,
  }
}
