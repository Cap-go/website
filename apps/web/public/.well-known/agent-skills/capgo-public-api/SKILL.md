---
name: capgo-public-api
description: Use Capgo's public API docs and API-key authentication model to manage organizations, apps, channels, devices, bundles, statistics, and API keys.
---

# Capgo Public API

Use this skill when the task requires programmatic work with Capgo Cloud instead of manual dashboard navigation.

## Base URLs

- Product site: https://capgo.app
- API docs: https://capgo.app/docs/public-api/
- Agent-ready OpenAPI: https://capgo.app/.well-known/capgo-public-api-openapi.json
- API base: https://api.capgo.app
- Status page: https://status.capgo.app/

## Authentication

Send a raw Capgo API key in the `authorization` header. Do not prepend `Bearer` unless the published API docs change.

```bash
curl -H "authorization: $CAPGO_API_KEY" https://api.capgo.app/organization/
```

Create or rotate API keys in the dashboard:

- https://console.capgo.app/dashboard/apikeys/

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
- Use least-privilege API keys (`read`, `upload`, `write`, `all`).
- Handle `401`, `403`, and `429` responses explicitly, with retry backoff for `429`.
- Standard accounts are limited to 100 requests per minute; enterprise accounts are limited to 1000 requests per minute.
- Expect JSON success payloads with `data` or `status`, and JSON failures with `error`.
- Capgo's public API currently uses API-key authentication, not OAuth/OIDC discovery metadata.
