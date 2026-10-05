# Website design experiment

Experiment: [PostHog 99463, Landing Capgo](https://eu.posthog.com/project/72308/experiments/99463).
Key: `website-design-v1`.

## What changes

One build and one existing Cloudflare Worker deployment contain both presentations.
`control` restores the marketing presentation from `e32d87a1986a9ee5b68ee20d33b2279cf57bc378`
(September 28, before the redesign); `test` serves the current presentation.
Both use the current Capgo SVG logo, current authentication code, current pricing
copy, registry-derived plugin counts and current verified testimonials. Unsupported
historical quotes and the old Meta Pixel are not restored. This tests the old
marketing presentation rather than rolling authentication or business facts back.

The participating English marketing pages are listed in
`apps/web/src/experiments/website-design/routes.json` (45 routes, including `/`,
`/pricing/`, `/register/`, products and solutions). Translations, documentation,
blog articles, tools and routes without a changed historical counterpart remain
shared. Translated HTML has a separate shared cache; the translation Worker tags
its origin requests so that personalized English HTML never enters that cache.

Historical navigation, section presence, card layouts and video presentation remain
part of the treatment. Sharing the verified testimonial registry does not make the
two presentations contain identical proof sections. Public links, structured-data
URLs and accessibility defects found during restoration are corrected. The retained
historical copies are excluded only from Sonar's duplication calculation; fresh
routing, signup and analytics code remains subject to all analysis.

## Assignment and serving

On the first eligible GET, Cloudflare generates a cryptographically random UUID.
Its last hexadecimal digit assigns eight values to `control` and eight to `test`:
a 50/50 probability, not an alternating request counter. The first response sets
`capgo_website_design_v1`, with a 60-day lifetime, `HttpOnly`, `Secure` and
`SameSite=Lax`. Subsequent eligible pages derive the same arm from that cookie.
Assignment is per browser; clearing cookies or using another browser can change it.

The Worker fetches the matching prebuilt HTML via its existing `ASSETS` binding.
Old HTML is built under `/website-experiment/control/`, which the Worker blocks
from public access and the sitemaps exclude. Public URLs, canonical links and
assets stay the same. Bots receive the current shared presentation. Personalized
HTML is `private, no-store`, varies by Cookie and has no static ETag; static assets
keep their normal caching. There is no PostHog evaluation or design swap in the
browser and no additional deployment or runtime build.

## Measurement

Cloudflare inserts the actual assignment in HTML metadata. When the existing
Landing Capgo PostHog SDK loads, it registers `$feature/website-design-v1` plus the
experiment and variant properties, and captures one `$pageview` marked
`website_design_page_exposed=true`. This marker is not persisted on later shared
pages. PostHog uses this custom exposure event rather than independently assigning
the flag. Analytics loading does not delay rendering the assigned design.

Registration includes the assignment and existing PostHog anonymous ID in Supabase
signup metadata. After the existing signup/session flow succeeds, a keepalive
request sends the session JWT to the same-origin `/api/website-design/signup`.
The Worker verifies it with Supabase, checks that this is a newly created account
matching the cookie and metadata, then captures `user_signed_up` in the Landing
project with the same anonymous ID and `signup_confirmation=supabase_verified`.
The account UUID provides an idempotent event UUID/insert ID. The verified event
contains no email, form values or access token. The normal existing client signup
event remains available, marked `signup_confirmation=client`, and is excluded from
the experiment's primary metric.

The SDK also persists the exposure context, so a visitor who starts on an English
marketing page and later registers through a shared translation retains attribution.
The server still requires the matching cookie and a verified newly created account.

Primary metric: **confirmed account creation within seven days of exposure**.
Secondary metrics: reaching `/register/` within seven days, and confirmed account
creation within one day. Both arms share submission/error diagnostics. PostHog
excludes test accounts and visitors exposed to multiple variants.

This is browser-triggered, server-verified measurement, not a database signup
webhook. Ad blockers, opted-out analytics, a missing SDK identity, closed browsers
and failed verification/capture can prevent measurement. Compare measured signups
with the existing signup metric and backend account totals; do not interpret this
as counting every account. Allow seven days for the primary conversion window to
mature. First check the exposure split, variant consistency and signup verification
health before interpreting any difference. Do not choose a winner from a few days
of noisy percentages; report counts, uncertainty and the actual exposure dates.

## Preview, launch and rollback

Run `bun run build:web`, then `bun run preview:worker` from `apps/web`.
At localhost (or `development.capgo.app`), `?website_variant=control` and
`?website_variant=test` force a visual preview. Production ignores this override.
Preview cannot send verified signup measurement to the production experiment.

The production Worker variable `WEBSITE_DESIGN_EXPERIMENT=website-design-v1`
enables routing when this PR is merged and deployed by the existing workflow.
The PostHog experiment must be running to analyze those exposures. If measurement
is launched before deployment, use the first real exposure as the start of traffic,
not the earlier PostHog launch timestamp.

To stop serving the split, change `WEBSITE_DESIGN_EXPERIMENT` to `off` in both
production and development vars in `apps/web/wrangler.jsonc`, and redeploy the web
Worker. Everyone then receives the current presentation, including existing cookie
holders. This also disables signup confirmation capture. End the PostHog experiment
to freeze results. **Pausing or shipping a variant in PostHog does not change the
Cloudflare assignment**: Cloudflare owns delivery and does not call the flags API.
Shipping the old design permanently requires a separate reviewed code change.

## Verification

Run `bun test apps/web/src/worker/website-design-experiment.test.ts` for assignment,
HTML isolation, caching, canonical URLs, translation bypass and verified signup
attribution. PR CI runs these tests before the existing build, SEO and contrast
checks. The visual comparison includes both current-vs-base and old-vs-base for
the homepage, pricing, registration, live updates and native builds, at desktop
and mobile sizes.
