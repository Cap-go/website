# PostHog first-party proxy

PostHog scripts and events load from `https://capgo.app/cg-relay/...` instead of a third-party host. The `capgo-website` Cloudflare worker proxies them to PostHog EU cloud:

| Request | Upstream |
| --- | --- |
| `/cg-relay/static/*` (SDK files, cached 4 hours at the edge) | `https://eu-assets.i.posthog.com` |
| `/cg-relay/*` (events, flags, session replay, surveys) | `https://eu.i.posthog.com` |

Code:
- `apps/web/src/worker/posthog-proxy.ts` (the proxy)
- `apps/web/src/components/posthog.astro` (`api_host: '/cg-relay'`)

Benefits:
- every homepage script is served from capgo.app
- ad blockers drop fewer events
- there's no dependency on the old `psthg.digitalshift-ee.workers.dev` worker

## What you need to do

The proxy ships with the normal website deploy, so there are no DNS or route changes: `capgo.app` already runs through the `capgo-website` worker.

1. **Deploy.** Merge the PR. `deploy-web.yml` deploys the worker and the new `api_host`.
2. **Verify in the browser.** Open https://capgo.app, then DevTools → Network, and filter `cg-relay`:
   - `/cg-relay/static/array.js` returns 200 (JavaScript)
   - `/cg-relay/flags/?v=2...` returns 200
   - `/cg-relay/e/` or `/cg-relay/i/v0/e/` returns 200 when you click around
   - No request goes to `psthg.digitalshift-ee.workers.dev` or `*.posthog.com`, except `eu.posthog.com` when the PostHog toolbar is open
3. **Verify in PostHog.** Go to PostHog (EU) → Activity or Web analytics and check that new pageviews arrive within a minute.
4. **Toolbar (optional).** In PostHog → Project settings → Toolbar authorized URLs, make sure `https://capgo.app` is listed. `ui_host` still points to `https://eu.posthog.com`, so the toolbar and links keep working.
5. **Cloudflare security rules (only if events are missing).** If a WAF, Bot Fight Mode or rate-limit rule challenges `POST /cg-relay/*`, add a skip rule for URI path starts with `/cg-relay/`.
6. **Retire the old proxy.** After a few days of healthy data, delete the `psthg` worker on the `digitalshift-ee.workers.dev` account. Nothing in this repo references it anymore.

## Changing region or path

- **Region:** if the PostHog project ever moves to US cloud, change `POSTHOG_API_HOST` and `POSTHOG_ASSETS_HOST` in `posthog-proxy.ts` to `us.i.posthog.com` and `us-assets.i.posthog.com`.
- **Path:** if you rename `/cg-relay`, update `POSTHOG_PROXY_PREFIX` and `api_host` together. Avoid words ad blockers match on, such as `analytics`, `posthog`, `track` or `ingest`.
