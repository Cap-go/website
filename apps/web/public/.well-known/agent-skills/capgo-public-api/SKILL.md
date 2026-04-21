---
name: capgo-public-api
description: Use Capgo's public API docs and API-key authentication model to manage organizations, apps, channels, devices, bundles, statistics, and API keys.
---

# Capgo Public API

Use this skill when the task requires programmatic work with Capgo Cloud instead of manual dashboard navigation.

## Base URLs

- Product site: https://capgo.app
- API docs: https://capgo.app/docs/public-api/
- API base: https://api.capgo.app

## Authentication

Send a Capgo API key in the `authorization` header.

```bash
curl -H "authorization: $CAPGO_API_KEY" https://api.capgo.app/organization/
```

Create or rotate API keys in the dashboard:

- https://console.capgo.app/dashboard/apikeys/

## Main resource groups

- `/organization/` and `/organization/members/`
- `/app/`
- `/apikey/`
- `/channel/`
- `/bundle/`
- `/device/`
- `/statistics/...`

## Working rules

- Prefer the published docs for request and response details before guessing fields.
- Use least-privilege API keys (`read`, `upload`, `write`, `all`).
- Handle `429` responses with retry backoff.
- Expect JSON success payloads with `data` or `status`, and JSON failures with `error`.
