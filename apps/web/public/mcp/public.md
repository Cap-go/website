---
title: Capgo public MCP
description: Search docs, find plugins, and discover free browser tools without signing in.
canonical: https://capgo.app/mcp/public.md
---

# Capgo public MCP

Connect an MCP client to **https://capgo.app/mcp/public** using Streamable HTTP.
No account, API key, OAuth login, or Authorization header is needed.

```json
{
  "mcpServers": {
    "capgo-public": {
      "type": "http",
      "url": "https://capgo.app/mcp/public"
    }
  }
}
```

Client configuration formats vary. Choose a remote Streamable HTTP server and
use the URL above if your client does not accept this example.

## Public tools

- `capgo_search_docs`: pass `query` and optionally `limit` from 1 to 20, default 8.
  Returns English documentation titles, URLs, and short snippets from the same
  search index as the docs search box. Fetch a returned URL for the full page.
- `capgo_list_plugins`: optionally pass `query`, `category`, `offset` (0 to
  10000, default 0) and `limit` (1 to 50, default 20). Returns registry-derived package names, descriptions,
  categories, repository URLs, and plugin pages. Use `nextOffset` to paginate.
  See the [live plugin directory](https://capgo.app/plugins/).
- `capgo_list_free_tools`: pass `{}`. Returns browser-tool links and guidance for
  iOS certificates, Android keystores, and finding an iPhone or iPad UDID.
  This tool lists existing tools; it does not generate signing material or
  install configuration profiles. Keep private keys and passwords on your device.

## Transport and limits

Use POST with `Content-Type: application/json` and
`Accept: application/json, text/event-stream`. Supported protocol versions are
2025-11-25, 2025-06-18, and 2025-03-26. The server is stateless, returns JSON,
and does not create sessions or offer a server-initiated event stream.
GET and DELETE return 405. Notifications return 202 with an empty body.
JSON-RPC batches are not supported.

Requests are limited to 16 KiB and 60 POST requests per minute per IP at the
Cloudflare location handling the request. A 429 response includes
`Retry-After: 60`. Identical documentation searches are cached for five minutes.
Tool failures return `isError: true`; retry a temporarily unavailable docs search
later or use [the docs](https://capgo.app/docs/) directly.

## Account operations

The public server cannot inspect or change accounts, apps, bundles, channels,
builds, devices, API keys, or notifications. For those operations connect to
**https://api.capgo.app/mcp** with OAuth or your own Capgo API key.
See [auth.md](https://capgo.app/auth.md) and
[MCP setup](https://capgo.app/docs/ai/mcp/).

Server metadata: [public server card](https://capgo.app/mcp/public/server-card.json).
