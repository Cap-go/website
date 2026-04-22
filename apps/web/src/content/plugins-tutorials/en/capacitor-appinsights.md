---
locale: en
---
# Using @capgo/capacitor-appinsights

A wrapper around the https://github.com/apptopia/appinsights SDK.

## Install

```bash
bun add @capgo/capacitor-appinsights
bunx cap sync
```

## What This Plugin Exposes

- `init` - Initialize the AppInsights SDK.
- `setUserId` - Set or update the user ID after initialization.
- `getState` - Get the current state of the SDK.

## Example Usage

### `init`

Initialize the AppInsights SDK.

```typescript
import { CapacitorAppInsights } from '@capgo/capacitor-appinsights';

await CapacitorAppInsights.init({} as {
    partnerId: string; // Provided by our business unit
    partnerKey: string; // Provided by our business unit
  });
```

### `setUserId`

Set or update the user ID after initialization.

```typescript
import { CapacitorAppInsights } from '@capgo/capacitor-appinsights';

await CapacitorAppInsights.setUserId({} as { userId: string });
```

### `getState`

Get the current state of the SDK.

```typescript
import { CapacitorAppInsights } from '@capgo/capacitor-appinsights';

await CapacitorAppInsights.getState();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-appinsights/
- Docs: /docs/plugins/appinsights/
