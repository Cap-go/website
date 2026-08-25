---
name: capgo-cli-mcp
description: Use the remote Capgo Streamable HTTP MCP server for docs discovery, or run the local Capgo CLI MCP server with npx to manage live updates, channels, bundles, stats, apps, and native builds.
---

# Capgo CLI MCP

Use this skill when an agent needs Capgo operations instead of only reading HTML docs.

## Remote Streamable HTTP server

```text
https://capgo.app/mcp
```

Manifest: https://capgo.app/.well-known/mcp.json

The remote server is unauthenticated and exposes discovery tools: when to use Capgo, OpenAPI location, and docs links.

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

- Use `https://capgo.app/mcp` for docs, OpenAPI, and when-to-use questions.
- Use the local `npx @capgo/cli@latest mcp` stdio server for authenticated account mutations.
- Prefer `npx @capgo/cli@latest` in customer-facing command examples.
- Use the published Capgo API docs when you need field-level details the MCP tool description does not include.
