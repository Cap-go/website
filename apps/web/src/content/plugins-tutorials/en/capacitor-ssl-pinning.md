---
locale: en
---
# Using @capgo/capacitor-ssl-pinning

Capacitor API for inspecting SSL pinning configuration.

## Install

```bash
bun add @capgo/capacitor-ssl-pinning
bunx cap sync
```

## What This Plugin Exposes

- `getConfiguration` - Returns the active native configuration visible to the plugin.

## Example Usage

### `getConfiguration`

Returns the active native configuration visible to the plugin.

```typescript
import { SSLPinning } from '@capgo/capacitor-ssl-pinning';

await SSLPinning.getConfiguration();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-ssl-pinning/
- Docs: /docs/plugins/ssl-pinning/

## Keep going from Using @capgo/capacitor-ssl-pinning

If you are using **Using @capgo/capacitor-ssl-pinning** to plan security and compliance, connect it with [@capgo/capacitor-ssl-pinning](/docs/plugins/ssl-pinning/) for the implementation detail in @capgo/capacitor-ssl-pinning, [Getting Started](/docs/plugins/ssl-pinning/getting-started/) for the implementation detail in Getting Started, [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, and [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner.
