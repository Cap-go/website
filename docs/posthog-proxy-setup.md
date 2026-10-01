# PostHog proxy on psthg.capgo.app

PostHog scripts and events load from `https://psthg.capgo.app`, our own domain, instead of `psthg.digitalshift-ee.workers.dev`.

`psthg.capgo.app` is a **PostHog managed reverse proxy (EU)**: a CNAME to `*.cf-prod-eu-proxy.europehog.com`, set up in PostHog → Settings → Managed reverse proxy. PostHog runs it and handles the TLS certificate. No code or worker of ours is involved.

The site config is `apps/web/src/components/posthog.astro`, with `api_host: 'https://psthg.capgo.app'` and `ui_host: 'https://eu.posthog.com'`.

Checked on 2026-10-01 through `psthg.capgo.app`, all returning 200:
- `/static/array.js`
- `/static/<version>/posthog-recorder.js`
- `POST /flags/?v=2`
- `POST /i/v0/e/`

## After deploying

1. On https://capgo.app, open DevTools → Network and filter `psthg`. Requests go to `psthg.capgo.app` and return 200, and nothing goes to `psthg.digitalshift-ee.workers.dev`.
2. In PostHog (EU), check that new pageviews arrive within a minute.
3. After a few days of healthy data, delete the old `psthg` worker (`psthg.digitalshift-ee.workers.dev`) in Cloudflare. Nothing in this repo uses it anymore.

## If you change the domain

Create the new managed proxy domain in PostHog, wait until it shows as live, then update `api_host`. Avoid names ad blockers match on, such as `analytics`, `posthog` or `track`.
