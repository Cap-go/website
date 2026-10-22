---
name: capgo-public-api
description: Use Capgo's public API docs and API-key authentication model to manage organizations, apps, channels, devices, bundles, statistics, and API keys.
---

# Capgo Public API

Use this skill when the task requires programmatic work with Capgo Cloud instead of manual dashboard navigation.

## Base URLs

- Product site: https://capgo.app
- API docs: https://capgo.app/docs/public-api/
- OpenAPI: https://capgo.app/openapi.json
- Well-known OpenAPI: https://capgo.app/.well-known/openapi.json
- Canonical OpenAPI copy: https://capgo.app/.well-known/capgo-public-api-openapi.json
- API base: https://api.capgo.app/v1 (unversioned paths on https://api.capgo.app serve the same v1 handlers)
- Status page: https://status.capgo.app/

## Authentication

Send a Capgo API key in the `x-api-key` header or as `Authorization: Bearer <key>`. The legacy `authorization` header also accepts the raw key with no `Bearer` prefix.

```bash
curl -H "x-api-key: $CAPGO_API_KEY" https://api.capgo.app/v1/organization/
```

Create or rotate API keys in the dashboard:

- https://console.capgo.app/settings/organization/api-keys

Agents can get a key through OAuth 2.0 instead (authorization code with PKCE and dynamic client registration). The issuer is `https://capgo.app` and the metadata lives at https://capgo.app/.well-known/oauth-authorization-server. The user picks which organizations to grant, and the access token is a Capgo API key sent as a Bearer token.

## Main resource groups

- `/organization/` for organization CRUD and `/organization/members/` for member access control
- `/app/` and `/app/:app_id` for app listing, creation, updates, and deletion
- `/apikey/` and `/apikey/:id/` for API key lifecycle management
- `/channel/` for channel rollout configuration
- `/bundle/` and `/bundle/metadata` for live-update bundle registration and metadata
- `/device/` for device overrides and device inventory
- `/statistics/...` for app, organization, user, and bundle-usage analytics

## Working rules

- Prefer the published docs and OpenAPI document for request and response details before guessing fields.
- Use least-privilege API keys: bind each key only to the organizations, apps or channels it needs, with the lowest role that works (for example `app_reader` or `app_uploader` instead of `org_admin`).
- Handle `401`, `403`, and `429` responses explicitly. On `429`, wait for the `Retry-After` seconds.
- Each API key may send 2,000 requests per minute (20,000 on bundle upload routes). Read the `RateLimit-Policy` and `RateLimit` response headers (`r` = requests left, `t` = seconds until reset) to throttle before hitting the limit.
- Expect endpoint-specific JSON success shapes. Many responses use `data` or `status`, but `/statistics/...` can return top-level arrays and `bundle_usage` returns an object with `labels` and `datasets`, so rely on the OpenAPI before unwrapping. Errors are JSON with a machine-readable `error` code, a human-readable `message`, and optional `moreInfo`.
- Breaking changes ship under a new path prefix (`/v2`); deprecated operations are marked `deprecated: true` in the OpenAPI and their responses carry `Deprecation` and `Sunset` headers before removal.
- Every operation has a unique `operationId`, a description, typed parameters, and JSON response schemas suitable for LLM function calling.
