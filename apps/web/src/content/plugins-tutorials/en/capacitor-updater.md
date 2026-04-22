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
