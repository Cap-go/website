---
locale: en
---
# Ionic and Capacitor live updates with @capgo/capacitor-updater

@capgo/capacitor-updater is the open-source updater plugin behind Capgo live updates for Ionic and Capacitor apps. It downloads approved web bundles, applies them with native rollback protection, and keeps binary-only changes on the normal App Store and Play review path.

Use it when you need OTA updates for HTML, CSS, JavaScript, assets, and other web-layer changes after your native shell is already approved.

## Install

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

## Where It Fits

For Ionic teams, live updates usually mean the same workflow: ship a new web bundle without forcing every user through a full store release. Capgo handles that workflow for Capacitor apps with channels, compatibility checks, rollout control, device logs, and rollback.

Native plugins, entitlements, Android manifest changes, iOS plist changes, and binary SDK updates still require a normal app store release. Keep those changes in your native build pipeline and use live updates for the approved web layer.

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
- Live update product: /live-update/

## Keep going from @capgo/capacitor-updater

If you are using **@capgo/capacitor-updater** to plan live updates, connect it with [Live Updates](/live-update/) for the product workflow, [@capgo/capacitor-updater](/docs/plugins/updater/) for implementation details, [Getting Started](/docs/plugins/updater/getting-started/), [Channels](/docs/live-updates/channels/), and [Rollbacks](/docs/live-updates/rollbacks/).
