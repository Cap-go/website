---
locale: en
---
# Using @capgo/capacitor-updater

Live update for capacitor apps.

## Install

```bash
bun add @capgo/capacitor-updater
bunx cap sync
```

## What This Plugin Exposes

- `notifyAppReady` - Notify the native layer that JavaScript initialized successfully.
- `setUpdateUrl` - Set the update URL for the app dynamically at runtime.
- `setStatsUrl` - Set the statistics URL for the app dynamically at runtime.
- `setChannelUrl` - Set the channel URL for the app dynamically at runtime.

## Example Usage

### `notifyAppReady`

Notify the native layer that JavaScript initialized successfully.

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

await CapacitorUpdater.notifyAppReady();
```

### `setUpdateUrl`

Set the update URL for the app dynamically at runtime.

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

await CapacitorUpdater.setUpdateUrl({} as UpdateUrl);
```

### `setStatsUrl`

Set the statistics URL for the app dynamically at runtime.

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

await CapacitorUpdater.setStatsUrl({} as StatsUrl);
```

### `setChannelUrl`

Set the channel URL for the app dynamically at runtime.

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

await CapacitorUpdater.setChannelUrl({} as ChannelUrl);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-updater/
- Docs: /docs/plugins/updater/

## Keep going from Using @capgo/capacitor-updater

If you are using **Using @capgo/capacitor-updater** to plan native plugin work, connect it with [@capgo/capacitor-updater](/docs/plugins/updater/) for the implementation detail in @capgo/capacitor-updater, [Getting Started](/docs/plugins/updater/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
