# Front-end security maintenance

This repository ships a static marketing site (`apps/web`) and docs (`apps/docs`) on Cloudflare Workers. Front-end security controls are intentionally explicit and reviewable.

## Subresource Integrity (SRI)

Static third-party scripts with fixed URLs are listed in `apps/shared/security/external-assets.json` and rendered through `apps/web/src/components/ExternalScript.astro` with `integrity` and `crossorigin`.

When a CDN asset changes:

1. Run `bun run security:integrity:write` to fetch the live bytes and refresh hashes.
2. Review the diff in `external-assets.json`.
3. Run `bun run security:integrity:check` (also part of `apps/web` `check`) before merging.

Scripts loaded by inline bootstraps (Meta Pixel, PostHog) cannot use SRI on the loader itself. Those hosts are allowlisted in CSP instead and documented under `sriNotSupported` in the registry.

## Content Security Policy (CSP)

CSP values live in `apps/shared/security/csp.mjs` and are applied as follows:

- **Marketing site:** written into `apps/web/public/_headers` (served with static assets).
- **Docs site:** injected by `apps/docs/src/worker/index.ts` via `apps/shared/security/responseHeaders.mjs` (the docs `public/` tree is gitignored).

After editing the policy:

```bash
bun run security:headers:write
bun run security:headers:check
```

Residual gap: inline analytics bootstraps still require `script-src 'unsafe-inline'`. Tightening further would need nonces or moving bootstraps to first-party files.

## HTML sanitization

Plugin directory markdown rendered with `marked` is sanitized via `apps/web/src/lib/sanitizeHtml.ts` before `set:html`. Add tests in `apps/web/test/security-hardening.test.js` when changing sanitization rules.

## Routine review (process only)

On a regular cadence (for example quarterly, or when adding a third-party embed):

- Re-run `bun run security:integrity:check`.
- Review CSP allowlists in `apps/shared/security/csp.mjs` against current scripts, fonts, images, and API hosts.
- Run dependency and application security reviews through your normal engineering process (for example `bun audit`, external penetration testing, and bug bounty intake at `/security/`).

This document does not replace a formal security program or automated penetration testing.
