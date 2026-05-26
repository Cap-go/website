---
locale: en
---
# Using @capgo/capacitor-health

Capacitor plugin to interact with data from Apple HealthKit and Health Connect.

## Install

```bash
bun add @capgo/capacitor-health
bunx cap sync
```

## What This Plugin Exposes

- `isAvailable` - Returns whether the current platform supports the native health SDK.
- `requestAuthorization` - Requests read/write access to the provided data types.
- `checkAuthorization` - Checks authorization status for the provided data types without prompting the user.
- `readSamples` - Reads samples for the given data type within the specified time frame.

## Example Usage

### `isAvailable`

Returns whether the current platform supports the native health SDK.

```typescript
import { Health } from '@capgo/capacitor-health';

await Health.isAvailable();
```

### `requestAuthorization`

Requests read/write access to the provided data types.

```typescript
import { Health } from '@capgo/capacitor-health';

await Health.requestAuthorization({} as AuthorizationOptions);
```

### `checkAuthorization`

Checks authorization status for the provided data types without prompting the user.

```typescript
import { Health } from '@capgo/capacitor-health';

await Health.checkAuthorization({} as AuthorizationOptions);
```

### `readSamples`

Reads samples for the given data type within the specified time frame.

```typescript
import { Health } from '@capgo/capacitor-health';

await Health.readSamples({} as QueryOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-health/
- Docs: /docs/plugins/health/

## Keep going from Using @capgo/capacitor-health

If you are using **Using @capgo/capacitor-health** to plan native plugin work, connect it with [@capgo/capacitor-health](/docs/plugins/health/) for the implementation detail in @capgo/capacitor-health, [Getting Started](/docs/plugins/health/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
