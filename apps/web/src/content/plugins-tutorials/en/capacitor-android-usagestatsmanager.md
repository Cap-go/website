---
locale: en
---
# Using @capgo/capacitor-android-usagestatsmanager

Capacitor plugin for accessing Android UsageStatsManager API.

## Install

```bash
bun add @capgo/capacitor-android-usagestatsmanager
bunx cap sync
```

## What This Plugin Exposes

- `queryAndAggregateUsageStats` - Queries and aggregates usage stats for the given time range.
- `isUsageStatsPermissionGranted` - Checks if the usage stats permission is granted.
- `openUsageStatsSettings` - Open the usage stats settings screen. This will open the usage stats settings screen, which allows the user to grant the usage stats permission. This will always open the settings screen, even if the permission is already granted.
- `queryAllPackages` - Queries all installed packages on the device. Requires the QUERY_ALL_PACKAGES permission.

## Example Usage

### `queryAndAggregateUsageStats`

Queries and aggregates usage stats for the given time range.

```typescript
import { CapacitorUsageStatsManager } from '@capgo/capacitor-android-usagestatsmanager';

const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
const now = Date.now();
const stats = await UsageStatsManager.queryAndAggregateUsageStats({
  beginTime: oneDayAgo,
  endTime: now
});

for (const [packageName, usageData] of Object.entries(stats)) {
  console.log(`${packageName}: ${usageData.totalTimeInForeground}ms`);
}
```

### `isUsageStatsPermissionGranted`

Checks if the usage stats permission is granted.

```typescript
import { CapacitorUsageStatsManager } from '@capgo/capacitor-android-usagestatsmanager';

const { granted } = await UsageStatsManager.isUsageStatsPermissionGranted();
if (!granted) {
  await UsageStatsManager.openUsageStatsSettings();
}
```

### `openUsageStatsSettings`

Open the usage stats settings screen. This will open the usage stats settings screen, which allows the user to grant the usage stats permission. This will always open the settings screen, even if the permission is already granted.

```typescript
import { CapacitorUsageStatsManager } from '@capgo/capacitor-android-usagestatsmanager';

await UsageStatsManager.openUsageStatsSettings();
```

### `queryAllPackages`

Queries all installed packages on the device. Requires the QUERY_ALL_PACKAGES permission.

```typescript
import { CapacitorUsageStatsManager } from '@capgo/capacitor-android-usagestatsmanager';

const { packages } = await UsageStatsManager.queryAllPackages();
packages.forEach(pkg => {
  console.log(`${pkg.appName} (${pkg.packageName}): v${pkg.versionName}`);
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-android-usagestatsmanager/
- Docs: /docs/plugins/android-usagestatsmanager/
