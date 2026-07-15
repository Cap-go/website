---
title: "API Overview"
description: "Explore Capgo's public API for managing resources such as organizations, devices, channels, and bundles using RESTful HTTP methods and authentication."
sidebar:
  order: 1
---

import { LinkCard } from '@astrojs/starlight/components';

This is the documentation of the public API of Capgo cloud. The API allows you to programmatically manage your Capgo resources, including organizations, devices, channels, and bundles. It's designed to be RESTful and uses standard HTTP methods.

## Authentication

All API endpoints require authentication. To authenticate your requests, add your API key in the `x-api-key` header.

Example:

```bash
curl -H "x-api-key: YOUR_API_KEY" https://api.capgo.app/organization/
```

<LinkCard
	title="Get API key"
	description="Generate your API key in the Capgo dashboard"
	href="https://console.capgo.app/settings/organization/api-keys"
/>

The `authorization` header is still accepted for legacy API keys, but `x-api-key` is the recommended header for all key types, including secure hashed keys.

## Rate Limiting

The API implements rate limiting to ensure fair usage. Current limits are:
- 100 requests per minute for standard accounts
- 1000 requests per minute for enterprise accounts

If you exceed these limits, you'll receive a 429 (Too Many Requests) response.

### Device channel changes

Device channel changes use the plugin API and have separate abuse-prevention limits that apply to every plan, including trials:

- A device can make up to 5 requests per second for each channel operation (`set`, `get`, `delete`, or `list`). This limit is scoped to the app, device, and operation.
- Setting the same device to the same channel more than once within 60 seconds returns a 429 response. Switching to a different channel is allowed after the per-second limit resets.
- An additional limit of 1000 channel requests per minute applies to each app and IP address.

These limits are not account-wide. If your channel switcher can return to a recently selected channel, wait for the `retryAfterSeconds` duration in the 429 response before retrying.

## Response Format

All responses are in JSON format. Successful responses typically include either a `data` object or a `status` field. Error responses include an `error` field with a description of what went wrong.

Example success response:
```json
{
  "status": "ok",
  "data": { ... }
}
```

Example error response:
```json
{
  "error": "Invalid API key",
  "status": "KO"
}
```

## Available Endpoints

<LinkCard
	title="Organizations"
	description="Create and manage organizations, update settings, and handle organization-level configurations"
	href="/docs/public-api/organizations/"
/>

<LinkCard
	title="API Keys"
	description="Generate, list, and revoke API keys for secure access to the Capgo API"
	href="/docs/public-api/api-keys/"
/>

<LinkCard
	title="Members"
	description="Manage organization members, roles, and permissions"
	href="/docs/public-api/members/"
/>

<LinkCard
	title="Statistics"
	description="Access detailed analytics about app usage, storage, and bandwidth consumption"
	href="/docs/public-api/statistics/"
/>

<LinkCard
	title="Channels"
	description="Control app update channels, bundles (versions), and update policies"
	href="/docs/public-api/channels/"
/>

<LinkCard
	title="Devices"
	description="Track and manage devices running your app, including bundle (version) and channel assignments"
	href="/docs/public-api/devices/"
/>

<LinkCard
	title="Bundles"
	description="Handle app bundles, including uploading, listing, and managing bundles (versions)"
	href="/docs/public-api/bundles/"
/>

## Best Practices

1. **Error Handling**: Always check for error responses and handle them appropriately
2. **Rate Limiting**: Implement exponential backoff when hitting rate limits
3. **Caching**: Cache responses when appropriate to reduce API calls
4. **Versioning**: Keep track of API changes through our changelog

## Keep going from API Overview

If you are using **API Overview** to plan authentication and account flows, connect it with [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication, and [SSO (Enterprise)](/docs/webapp/enterprise-sso/) for the implementation detail in SSO (Enterprise).
