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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';
```

## API at a glance

| Method | Description |
| --- | --- |
| `startMonitoringForRegion` | Start monitoring for a beacon region. Triggers events when entering/exiting the region. |
| `stopMonitoringForRegion` | Stop monitoring for a beacon region. |
| `startRangingBeaconsInRegion` | Start ranging beacons in a region. Provides continuous distance updates. |
| `stopRangingBeaconsInRegion` | Stop ranging beacons in a region. |
| `startAdvertising` | Start advertising the device as an iBeacon (iOS only). |
| `stopAdvertising` | Stop advertising the device as an iBeacon (iOS only). |
| `requestWhenInUseAuthorization` | Request "When In Use" location authorization (required for ranging/monitoring). |
| `requestAlwaysAuthorization` | Request "Always" location authorization (required for background monitoring). |
| `getAuthorizationStatus` | Get current location authorization status. |
| `isBluetoothEnabled` | Check if Bluetooth is enabled on the device. |
| `isRangingAvailable` | Check if ranging is available on the device. |
| `enableARMAFilter` | Enable ARMA filtering for distance calculations (Android only). |
| `enableBackgroundMode` | Enable or disable background beacon scanning mode (Android only). This enables a foreground service for reliable background beacon detection. Must be called after requesting "Always" location authorization. |
| `setBackgroundScanPeriod` | Configure background scan periods (Android only). Controls how often and how long the device scans for beacons when in background. |

## Examples

### `startMonitoringForRegion()`

Start monitoring for a beacon region. Triggers events when entering/exiting the region.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.startMonitoringForRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

### `stopMonitoringForRegion()`

Stop monitoring for a beacon region.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.stopMonitoringForRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

### `startRangingBeaconsInRegion()`

Start ranging beacons in a region. Provides continuous distance updates.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.startRangingBeaconsInRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

### `stopRangingBeaconsInRegion()`

Stop ranging beacons in a region.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.stopRangingBeaconsInRegion({
  identifier: 'MyBeaconRegion',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
});
```

### `startAdvertising()`

Start advertising the device as an iBeacon (iOS only).

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.startAdvertising({
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
  major: 1,
  minor: 2,
  identifier: 'MyBeacon'
});
```

### `stopAdvertising()`

Stop advertising the device as an iBeacon (iOS only).

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.stopAdvertising();
```

The [API reference](/docs/plugins/ibeacon/getting-started/) covers the other 8 methods.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorIbeacon.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-ibeacon/)
- [Documentation](/docs/plugins/ibeacon/)
- [API reference](/docs/plugins/ibeacon/getting-started/)

## Keep going from Using @capgo/capacitor-ibeacon

If you are using **Using @capgo/capacitor-ibeacon** to plan native plugin work, connect it with [@capgo/capacitor-ibeacon](/docs/plugins/ibeacon/) for the implementation detail in @capgo/capacitor-ibeacon, [Getting Started](/docs/plugins/ibeacon/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
