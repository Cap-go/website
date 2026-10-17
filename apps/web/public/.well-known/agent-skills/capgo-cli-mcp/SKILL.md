---
name: capgo-cli-mcp
description: Connect to the hosted Capgo MCP server at api.capgo.app/mcp to manage apps, channels, rollouts, devices, stats, builds, webhooks, notifications and search the docs, or run the local Capgo CLI MCP server with npx for bundle uploads and native build requests.
---

# Capgo CLI MCP

Use this skill when an agent needs Capgo operations instead of only reading HTML docs.

## Hosted Streamable HTTP server

```text
https://api.capgo.app/mcp
```

Manifest: https://capgo.app/.well-known/mcp.json
Setup guide: https://capgo.app/docs/ai/mcp/

Sign in with OAuth when the client connects, or send `Authorization: Bearer <Capgo API key>`. It exposes account and organization settings, apps, bundles, channels and progressive rollouts, devices, statistics and Observe, native build status and logs, webhooks, push notifications, and `capgo_search_docs` for documentation.

## Local authenticated server

```bash
npx @capgo/cli@latest mcp
```

Authenticate with a Capgo API key before starting the local server:

```bash
npx @capgo/cli@latest login
```

API keys: https://console.capgo.app/settings/organization/api-keys

## What the local server exposes

- App management
- Bundle uploads and cleanup
- Channel creation and updates
- Organization access
- Device statistics and logs
- Native build requests
- Encryption key generation

## Working rules

- Use the hosted `https://api.capgo.app/mcp` server for account actions and docs search.
- Use the local `npx @capgo/cli@latest mcp` stdio server when the agent needs local files: bundle uploads and native build requests.
- Prefer `npx @capgo/cli@latest` in customer-facing command examples.
- Use the published Capgo API docs when you need field-level details the MCP tool description does not include.
