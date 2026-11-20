---
slug: cordova-plugin-ble-central-alternative
title: "cordova-plugin-ble-central Alternative for Capacitor"
description: "cordova-plugin-ble-central alternative for Capacitor: @capgo/capacitor-bluetooth-low-energy with scan, connect, read/write, notifications, and permission helpers instead of ble.* callbacks."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-20T11:00:00.000Z
updated_at: 2026-11-20T13:15:49.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a Bluetooth Low Energy plugin guide"
keywords: cordova-plugin-ble-central alternative, capacitor ble, @capgo/capacitor-bluetooth-low-energy, ble.scan cordova migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-ble-central alternative in Capacitor?"
    answer: "@capgo/capacitor-bluetooth-low-energy maps ble.scan, connect, read, write, and startNotification to startScan, connect, readCharacteristic, writeCharacteristic, and startCharacteristicNotifications with Capacitor permissions."
  - question: "Is cordova-plugin-ble-central still maintained?"
    answer: "npm lists cordova-plugin-ble-central at version 2.1.0 with a registry modified date of 18 November 2026. Source: don/cordova-plugin-ble-central on GitHub."
  - question: "How do scan callbacks become Capacitor events?"
    answer: "Call addListener('deviceScanned', ...) while startScan runs, then stopScan when finished, per definitions.ts."
  - question: "Do I still need Android location for BLE scanning?"
    answer: "The Capgo plugin exposes checkPermissions, requestPermissions, and isLocationEnabled for Android scanning rules documented in the plugin docs."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/bluetooth-low-energy/, npm @capgo/capacitor-bluetooth-low-energy, and GitHub Cap-go/capacitor-bluetooth-low-energy."
---

The practical **cordova-plugin-ble-central alternative** for a Capacitor app is [`@capgo/capacitor-bluetooth-low-energy`](/plugins/capacitor-bluetooth-low-energy/). It replaces the global `ble` callback API with promises, permission helpers, and listeners for scans, connections, and characteristic changes. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why move off cordova-plugin-ble-central in Capacitor

**cordova-plugin-ble-central** on npm is version **2.1.0**. The registry `modified` timestamp is **18 November 2026**. The npm repository URL points to [don/cordova-plugin-ble-central](https://github.com/don/cordova-plugin-ble-central).

The README documents a global `ble` object with callback style methods such as:

- `ble.scan`, `ble.startScan`, `ble.startScanWithOptions`, and `ble.stopScan`
- `ble.connect`, `ble.autoConnect`, and `ble.disconnect`
- `ble.read`, `ble.write`, and `ble.writeWithoutResponse`
- `ble.startNotification` and `ble.stopNotification`
- `ble.isEnabled`, `ble.isConnected`, `ble.requestMtu`, and `ble.readRSSI`

Those calls assume Cordova `deviceready` wiring and per-call success and failure functions.

[`@capgo/capacitor-bluetooth-low-energy`](https://www.npmjs.com/package/@capgo/capacitor-bluetooth-low-energy) latest on npm is **8.2.9** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `initialize`, `startScan`, `stopScan`, `connect`, `disconnect`, `readCharacteristic`, `writeCharacteristic` with optional `type: 'withoutResponse'`, `startCharacteristicNotifications`, `requestMtu`, `readRssi`, and listeners such as `deviceScanned` and `characteristicChanged`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

After you migrate BLE flows, regression-test OTA builds with the [checklist for validating Capacitor app updates](/blog/checklist-for-validating-capacitor-app-updates/) so scan and reconnect behavior survives each live update channel.

## Install

```bash
bun add @capgo/capacitor-bluetooth-low-energy
bunx cap sync
```

Add the Bluetooth usage strings from the plugin README to `Info.plist` and declare Android `BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, and location permissions as required for your scan mode.

## Usage example

```ts
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

export async function subscribeHeartRate(deviceId: string) {
  await BluetoothLowEnergy.initialize({ mode: 'central' });
  await BluetoothLowEnergy.requestPermissions();

  await BluetoothLowEnergy.connect({ deviceId });

  await BluetoothLowEnergy.startCharacteristicNotifications({
    deviceId,
    service: '180D',
    characteristic: '2A37',
  });

  const handle = await BluetoothLowEnergy.addListener('characteristicChanged', (event) => {
    if (event.deviceId === deviceId && event.characteristic === '2A37') {
      return event.value;
    }
  });

  return handle;
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
ble.scan([], 5, function (device) {
  console.log(device.id, device.name);
}, function (err) {
  console.error(err);
});
```

```ts
// After (Capacitor)
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

await BluetoothLowEnergy.initialize({ mode: 'central' });

const listener = await BluetoothLowEnergy.addListener('deviceScanned', ({ device }) => {
  console.log(device.deviceId, device.name);
});

await BluetoothLowEnergy.startScan({ timeout: 5000 });

await new Promise((resolve) => setTimeout(resolve, 5000));

await BluetoothLowEnergy.stopScan();
await listener.remove();
```

```js
// Before (Cordova)
ble.startNotification(
  deviceId,
  service,
  characteristic,
  function (data) {
    console.log(data);
  },
  function (err) {
    console.error(err);
  },
);
```

```ts
// After (Capacitor)
await BluetoothLowEnergy.startCharacteristicNotifications({
  deviceId,
  service,
  characteristic,
});

await BluetoothLowEnergy.addListener('characteristicChanged', (event) => {
  if (event.deviceId === deviceId) console.log(event.value);
});
```

### API mapping table

| cordova-plugin-ble-central (`ble`) | @capgo/capacitor-bluetooth-low-energy |
| --- | --- |
| `ble.startScan(services, success, failure)` | `startScan({ services, timeout, ... })` plus `addListener('deviceScanned', ...)` |
| `ble.scan(services, seconds, success, failure)` | `startScan({ timeout: seconds * 1000 })` |
| `ble.stopScan(success, failure)` | `stopScan()` |
| `ble.connect(deviceId, success, failure)` | `connect({ deviceId })` |
| `ble.autoConnect(deviceId, success, failure)` | `connect({ deviceId, autoConnect: true })` |
| `ble.disconnect(deviceId, success, failure)` | `disconnect({ deviceId })` |
| `ble.isConnected(deviceId, success, failure)` | Use `addListener('deviceConnected')` and `addListener('deviceDisconnected')` plus connect promise results |
| `ble.read(deviceId, service, characteristic, success, failure)` | `readCharacteristic({ deviceId, service, characteristic })` returns `{ value }` as byte array |
| `ble.write(deviceId, service, characteristic, data, success, failure)` | `writeCharacteristic({ deviceId, service, characteristic, value, type: 'withResponse' })` |
| `ble.writeWithoutResponse(...)` | `writeCharacteristic({ ..., type: 'withoutResponse' })` |
| `ble.startNotification(...)` | `startCharacteristicNotifications({ deviceId, service, characteristic })` plus `addListener('characteristicChanged', ...)` |
| `ble.stopNotification(...)` | `stopCharacteristicNotifications({ deviceId, service, characteristic })` |
| `ble.isEnabled(success, failure)` | `isEnabled()` returns `{ enabled }` |
| `ble.requestMtu(deviceId, mtu, success, failure)` | `requestMtu({ deviceId, mtu })` |
| `ble.readRSSI(deviceId, success, failure)` | `readRssi({ deviceId })` |
| `ble.bond` / `ble.setPin` (Android) | `createBond({ deviceId })` and related bond helpers |
| `device.id` in scan callback | `device.deviceId` in `deviceScanned` events |
| Cordova plugin install | `bun add @capgo/capacitor-bluetooth-low-energy` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/bluetooth-low-energy/](/docs/plugins/bluetooth-low-energy/)
- Marketing page: [/plugins/capacitor-bluetooth-low-energy/](/plugins/capacitor-bluetooth-low-energy/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-bluetooth-low-energy](https://www.npmjs.com/package/@capgo/capacitor-bluetooth-low-energy)
- GitHub: [https://github.com/Cap-go/capacitor-bluetooth-low-energy/](https://github.com/Cap-go/capacitor-bluetooth-low-energy/)
- Cordova upstream: [https://github.com/don/cordova-plugin-ble-central](https://github.com/don/cordova-plugin-ble-central)

Pair firmware-tested native builds from [Capgo Build](/native-build/) with staged BLE UI rollouts through [Capgo live updates](/live-update/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).