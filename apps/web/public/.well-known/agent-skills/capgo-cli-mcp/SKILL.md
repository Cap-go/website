---
name: capgo-cli-mcp
description: Run the local Capgo CLI MCP server with bunx so agents can manage live updates, channels, bundles, stats, apps, and native builds.
---

# Capgo CLI MCP

Use this skill when an agent needs direct Capgo operations instead of only reading docs.

## Start the server

```bash
bunx @capgo/cli@latest mcp
```

## Authentication

Authenticate with a Capgo API key before starting the server or configure the key in the MCP client runtime.

```bash
bunx @capgo/cli@latest login
```

API keys are available from:

- https://console.capgo.app/dashboard/apikeys/

## What the server exposes

- App management
- Bundle uploads and cleanup
- Channel creation and updates
- Organization access
- Device statistics and logs
- Native build requests
- Encryption key generation

## Working rules

- Treat the Capgo MCP server as a local `stdio` server, not a remote HTTP endpoint.
- Prefer `bunx` in Capgo environments.
- Use the published Capgo API docs when you need field-level details the MCP tool description does not include.
