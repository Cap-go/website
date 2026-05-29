---
locale: en
---
# Using @capgo/capacitor-ibeacon

Capacitor iBeacon Plugin - Proximity detection and beacon region monitoring.

## Install

```bash
bun add @capgo/capacitor-ibeacon
bunx cap sync
```

## What This Plugin Exposes

- `startMonitoringForRegion` - Start monitoring for a beacon region. Triggers events when entering/exiting the region.
- `stopMonitoringForRegion` - Stop monitoring for a beacon region.
- `startRangingBeaconsInRegion` - Start ranging beacons in a region. Provides continuous distance updates.
- `stopRangingBeaconsInRegion` - Stop ranging beacons in a region.

## Example Usage

### `startMonitoringForRegion`

Start monitoring for a beacon region. Triggers events when entering/exiting the region.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.startMonitoringForRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

### `stopMonitoringForRegion`

Stop monitoring for a beacon region.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.stopMonitoringForRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

### `startRangingBeaconsInRegion`

Start ranging beacons in a region. Provides continuous distance updates.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.startRangingBeaconsInRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

### `stopRangingBeaconsInRegion`

Stop ranging beacons in a region.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.stopRangingBeaconsInRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-ibeacon/
- Docs: /docs/plugins/ibeacon/

## Keep going from Using @capgo/capacitor-ibeacon

If you are using **Using @capgo/capacitor-ibeacon** to plan native plugin work, connect it with [@capgo/capacitor-ibeacon](/docs/plugins/ibeacon/) for the implementation detail in @capgo/capacitor-ibeacon, [Getting Started](/docs/plugins/ibeacon/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
