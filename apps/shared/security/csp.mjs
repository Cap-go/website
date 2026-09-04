/**
 * Content-Security-Policy values for Capgo static sites.
 *
 * Regenerate or review when adding third-party scripts, fonts, embeds, or API hosts.
 * Run `bun run security:headers:check` after edits.
 */

const joinSources = (...groups) => groups.flat().join(' ')

const sharedImgSrc = joinSources(
  "'self'",
  'data:',
  'blob:',
  'https://*.githubusercontent.com',
  'https://images.unsplash.com',
  'https://ik.imagekit.io',
  'https://widget.senja.io',
  'https://senja.io',
  'https://senja-io.s3.us-west-1.amazonaws.com',
  'https://sonarcloud.io',
  'https://snyk.io',
  'https://www.google-analytics.com',
  'https://www.facebook.com',
)

const sharedConnectSrc = joinSources(
  "'self'",
  'https://api.capgo.app',
  'https://*.supabase.co',
  'https://status.capgo.app',
  'https://challenges.cloudflare.com',
)

/** Marketing site (apps/web) */
export const WEB_CONTENT_SECURITY_POLICY = joinSources(
  "default-src 'self';",
  "base-uri 'self';",
  "object-src 'none';",
  "frame-ancestors 'none';",
  "form-action 'self' https://console.capgo.app;",
  "script-src 'self' 'unsafe-inline'",
  'https://aff.capgo.app',
  'https://pls.digitalshift-ee.workers.dev',
  'https://dtf.capgo.app',
  'https://widget.senja.io',
  'https://challenges.cloudflare.com',
  'https://connect.facebook.net',
  'https://psthg.digitalshift-ee.workers.dev',
  'https://eu-assets.i.posthog.com;',
  "style-src 'self' 'unsafe-inline';",
  `img-src ${sharedImgSrc};`,
  "font-src 'self';",
  `connect-src ${sharedConnectSrc}`,
  'https://psthg.digitalshift-ee.workers.dev',
  'https://eu.posthog.com',
  'https://pls.digitalshift-ee.workers.dev',
  'https://dtf.capgo.app',
  'https://aff.capgo.app;',
  "frame-src 'self'",
  'https://www.youtube-nocookie.com',
  'https://senja.io',
  'https://challenges.cloudflare.com;',
)

/** Docs site (apps/docs) — includes Algolia DocSearch */
export const DOCS_CONTENT_SECURITY_POLICY = joinSources(
  "default-src 'self';",
  "base-uri 'self';",
  "object-src 'none';",
  "frame-ancestors 'none';",
  "form-action 'self';",
  "script-src 'self' 'unsafe-inline'",
  'https://cdn.jsdelivr.net',
  'https://*.algolia.net',
  'https://*.algolianet.com;',
  "style-src 'self' 'unsafe-inline'",
  'https://cdn.jsdelivr.net;',
  `img-src ${sharedImgSrc};`,
  "font-src 'self';",
  `connect-src ${sharedConnectSrc}`,
  'https://*.algolia.net',
  'https://*.algolianet.com;',
  "frame-src 'self';",
)
