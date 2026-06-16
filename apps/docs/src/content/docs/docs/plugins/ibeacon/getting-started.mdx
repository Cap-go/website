---
title: Getting Started
description: "Install @capgo/capacitor-ibeacon and start using its current Capacitor API."
sidebar:
  order: 2
---

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-ibeacon` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
bun add @capgo/capacitor-ibeacon
bunx cap sync
```

## Import

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';
```

## API Overview

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

### `startAdvertising`

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

### `stopAdvertising`

Stop advertising the device as an iBeacon (iOS only).

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.stopAdvertising();
```

### `requestWhenInUseAuthorization`

Request "When In Use" location authorization (required for ranging/monitoring).

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

const { status } = await CapacitorIbeacon.requestWhenInUseAuthorization();
console.log('Authorization status:', status);
```

### `requestAlwaysAuthorization`

Request "Always" location authorization (required for background monitoring).

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

const { status } = await CapacitorIbeacon.requestAlwaysAuthorization();
console.log('Authorization status:', status);
```

### `getAuthorizationStatus`

Get current location authorization status.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

const { status } = await CapacitorIbeacon.getAuthorizationStatus();
console.log('Current status:', status);
```

### `isBluetoothEnabled`

Check if Bluetooth is enabled on the device.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

const { enabled } = await CapacitorIbeacon.isBluetoothEnabled();
if (!enabled) {
  console.log('Please enable Bluetooth');
}
```

### `isRangingAvailable`

Check if ranging is available on the device.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

const { available } = await CapacitorIbeacon.isRangingAvailable();
if (available) {
  console.log('Ranging is supported');
}
```

### `enableARMAFilter`

Enable ARMA filtering for distance calculations (Android only).

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

await CapacitorIbeacon.enableARMAFilter({
  enabled: true
});
```

### `enableBackgroundMode`

Enable or disable background beacon scanning mode (Android only).
This enables a foreground service for reliable background beacon detection.
Must be called after requesting "Always" location authorization.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

// Enable background mode for beacon scanning
await CapacitorIbeacon.enableBackgroundMode({ enabled: true });

// Disable background mode
await CapacitorIbeacon.enableBackgroundMode({ enabled: false });
```

### `setBackgroundScanPeriod`

Configure background scan periods (Android only).
Controls how often and how long the device scans for beacons when in background.

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

// Set background scan to 10 seconds every 30 seconds
await CapacitorIbeacon.setBackgroundScanPeriod({
  scanPeriod: 10000,        // 10 seconds of scanning
  betweenScanPeriod: 30000  // 30 seconds between scans
});
```

## Type Reference

### `BeaconRegion`
Beacon region definition for monitoring and ranging.
```typescript
export interface BeaconRegion {
  /**
   * Unique identifier for this region.
   */
  identifier: string;

  /**
   * UUID of the beacon(s) to detect.
   */
  uuid: string;

  /**
   * Major value for filtering (optional).
   */
  major?: number;

  /**
   * Minor value for filtering (optional).
   */
  minor?: number;

  /**
   * Notify when device enters region (iOS only).
   */
  notifyEntryStateOnDisplay?: boolean;

  /**
   * Enable Android background mode for this monitoring/ranging call.
   * When true, the plugin will keep scanning in background using a foreground service.
   */
  enableBackgroundMode?: boolean;
}
```

### `BeaconAdvertisingOptions`
Beacon advertising options for transmitting as an iBeacon (iOS only).
```typescript
export interface BeaconAdvertisingOptions {
  /**
   * UUID to advertise.
   */
  uuid: string;

  /**
   * Major value (0-65535).
   */
  major: number;

  /**
   * Minor value (0-65535).
   */
  minor: number;

  /**
   * Identifier for the advertising beacon.
   */
  identifier: string;

  /**
   * Measured power (RSSI at 1 meter). Optional, defaults to -59.
   */
  measuredPower?: number;
}
```

### `BackgroundScanPeriodOptions`
Background scan period configuration options (Android only).
```typescript
export interface BackgroundScanPeriodOptions {
  /**
   * Duration of each scan period in milliseconds.
   * Default: 10000 (10 seconds)
   */
  scanPeriod?: number;

  /**
   * Duration between scan periods in milliseconds.
   * Default: 15000 (15 seconds)
   */
  betweenScanPeriod?: number;
}
```

### `RangingEventData`
Event data when beacons are ranged.
```typescript
export interface RangingEventData {
  /**
   * Region that was ranged.
   */
  region: BeaconRegion;

  /**
   * Array of detected beacons.
   */
  beacons: Beacon[];
}
```

### `MonitoringEventData`
Event data when entering or exiting a region.
```typescript
export interface MonitoringEventData {
  /**
   * Region that triggered the event.
   */
  region: BeaconRegion;

  /**
   * Event state: 'enter' or 'exit'.
   */
  state: 'enter' | 'exit';
}
```

### `Beacon`
Detected beacon information.
```typescript
export interface Beacon {
  /**
   * Beacon UUID.
   */
  uuid: string;

  /**
   * Major value.
   */
  major: number;

  /**
   * Minor value.
   */
  minor: number;

  /**
   * RSSI (Received Signal Strength Indicator).
   */
  rssi: number;

  /**
   * Proximity: 'immediate', 'near', 'far', or 'unknown'.
   */
  proximity: 'immediate' | 'near' | 'far' | 'unknown';

  /**
   * Estimated distance in meters.
   */
  accuracy: number;
}
```

## Source Of Truth

This page is generated from the plugin's `src/definitions.ts`. Re-run the sync when the public API changes upstream.

## Keep going from Getting Started

If you are using **Getting Started** to plan dashboard and API operations, connect it with [Using @capgo/capacitor-ibeacon](/plugins/capacitor-ibeacon/) for the native capability in Using @capgo/capacitor-ibeacon, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, and [Devices](/docs/public-api/devices/) for the implementation detail in Devices.
