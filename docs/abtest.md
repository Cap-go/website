# Branch A/B test

The website runs an A/B test by serving two branches side by side:

- `main` is the `control` variant.
- `abtest` is the `test` variant.

Each branch is uploaded as its own Cloudflare Worker version. A Cloudflare
[gradual deployment](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/)
splits traffic between the two versions. The site code has no experiment logic.
If the test wins, merge `abtest` into `main`. If it loses, reset `abtest` to `main`.

## Run an experiment

1. In PostHog (Landing Capgo project), create an experiment. Use a flag key with
   the variants `control` and `test`, for example `website-hero-v2`. The flag
   only labels analytics. Cloudflare decides who sees which variant.
2. In the GitHub repository variables, set `ABTEST_FLAG` to that key. Set
   `ABTEST_PERCENT` to the share of traffic for `abtest` (default `50`).
3. Push the change to the `abtest` branch.

`Deploy Web` (`.github/workflows/deploy-web.yml`) runs on every push to `main`
or `abtest`. When `abtest` has commits that `main` does not have and
`ABTEST_PERCENT` is between 1 and 99, the workflow does these steps:

1. It builds `main` and `abtest` in parallel.
2. It uploads each build with `wrangler versions upload`. The upload sets the
   `AB_FLAG` and `AB_VARIANT` vars on each version.
3. It runs `wrangler versions deploy <main>@<100-percent> <abtest>@<percent>`
   and then `wrangler triggers deploy`.

Otherwise, the workflow deploys `main` to 100% with `wrangler deploy`, as usual.

Both versions are rebuilt and uploaded on each deploy. Gradual deployments can
only use the last 100 uploaded versions, so the workflow does not reuse an old
`abtest` upload.

## Stop or ship

- **Ship:** merge `abtest` into `main`. Then `abtest` has no commits that `main`
  does not have, so the next deploy puts `main` at 100%.
- **Drop:** reset `abtest` to `main` (`git push -f origin main:abtest`), or set
  `ABTEST_PERCENT` to `0`. Then re-run `Deploy Web`.
- **Emergency:** run `bunx wrangler versions deploy <main-version-id>@100 -y`
  from `apps/web`, or use Workers > `capgo-website` > Deployments in the
  Cloudflare dashboard.

Keep `abtest` up to date with `main` (merge `main` into it). Content and fixes
that land only on `main` do not reach the `test` visitors.

## Sticky visitors (one-time Cloudflare setup)

Cloudflare routes requests by percentage. Without
[version affinity](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/),
each page load can land on a different version. Version affinity also keeps the
HTML and its hashed `/_astro/*` assets on the same version.

In the `capgo.app` zone, go to Rules > Transform Rules > Modify Request Header
and add these two rules, in this order:

| Rule | Expression | Header | Value (dynamic) |
| --- | --- | --- | --- |
| Affinity from cookie | `http.cookie contains "capgo_ab="` | `Cloudflare-Workers-Version-Key` | `http.request.cookies["capgo_ab"][0]` |
| Affinity from IP | `not http.cookie contains "capgo_ab="` | `Cloudflare-Workers-Version-Key` | `ip.src` |

On the first HTML response, the Worker (`apps/web/src/worker/abtest.ts`) stores
the key that the request was routed with in the `capgo_ab` cookie (HttpOnly, 90
days). Later requests reuse that key, so the visitor stays on the same version
even when their IP changes.

The translation Worker sends a constant key (`translation-origin`) when it fetches
English source pages. This keeps the shared translation cache on one version.

## Measurement

When `AB_FLAG` and `AB_VARIANT` are set, the Worker adds
`<meta name="capgo-ab-flag">` and `<meta name="capgo-ab-variant">` to HTML pages.
It also sets the `X-Capgo-Ab-Variant` response header. When PostHog loads
(`apps/web/src/components/posthog.astro`), it does two things:

- It registers `$feature/<flag>` on every event.
- It captures `$feature_flag_called` once per session.

As a result, PostHog experiment exposures, `$pageview` and `user_signed_up` all
carry the variant.

## Limits

- The split covers the whole Worker: every page, plus the Worker routes and APIs
  on `abtest`. The docs and translation Workers are separate and are not split.
- Bots are split by IP the same way as visitors.
- `wrangler secret put` fails while a split is active. Use
  `wrangler versions secret put`, or end the split first. This matters for the
  iOS UDID certificate renewal job.
