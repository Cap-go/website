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

## Keep going from Using @capgo/capacitor-appinsights

If you are using **Using @capgo/capacitor-appinsights** to plan native plugin work, connect it with [@capgo/capacitor-appinsights](/docs/plugins/appinsights/) for the implementation detail in @capgo/capacitor-appinsights, [Getting Started](/docs/plugins/appinsights/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
