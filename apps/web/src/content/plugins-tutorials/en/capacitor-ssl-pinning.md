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
