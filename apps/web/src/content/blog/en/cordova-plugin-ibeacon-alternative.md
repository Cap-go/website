---
slug: cordova-plugin-ibeacon-alternative
title: "cordova-plugin-ibeacon Alternative for Capacitor"
description: "cordova-plugin-ibeacon alternative for Capacitor: monitor regions, range beacons and advertise on iOS with @capgo/capacitor-ibeacon and Capacitor listeners."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-13T09:00:00.000Z
updated_at: 2026-11-13T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an iBeacon plugin guide"
keywords: cordova-plugin-ibeacon alternative, capacitor ibeacon, ibeacon region monitoring, @capgo/capacitor-ibeacon, cordova locationmanager
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-ibeacon alternative in Capacitor?"
    answer: "@capgo/capacitor-ibeacon exposes startMonitoringForRegion, startRangingBeaconsInRegion, and iOS advertising with Capacitor promises and didEnterRegion, didRangeBeacons, and related listeners."
  - question: "Is cordova-plugin-ibeacon still updated?"
    answer: "npm lists cordova-plugin-ibeacon at version 3.8.1 with a last publish date of 14 June 2022. The petermetz/cordova-plugin-ibeacon GitHub repository still receives commits, but npm has not shipped a release since 2019."
  - question: "Does @capgo/capacitor-ibeacon work on web?"
    answer: "No. The README lists iOS and Android only, using Core Location on iOS and the AltBeacon library on Android."
  - question: "Which permissions does iOS need?"
    answer: "Location when-in-use and always strings, Bluetooth usage descriptions, and UIBackgroundModes entries for location and bluetooth-central when you monitor in the background, as documented in the plugin README."
  - question: "Can the device advertise as an iBeacon?"
    answer: "Yes on iOS through startAdvertising and stopAdvertising. Region monitoring and ranging run on both platforms."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/ibeacon/, npm @capgo/capacitor-ibeacon, and GitHub Cap-go/capacitor-ibeacon."
---

The practical **cordova-plugin-ibeacon alternative** for a Capacitor app is [`@capgo/capacitor-ibeacon`](/plugins/capacitor-ibeacon/). It covers the same proximity workflows as `cordova-plugin-ibeacon` (region monitoring, ranging, and iOS advertising) with promise-based calls and Capacitor event listeners instead of `cordova.plugins.locationManager` and delegate callbacks. This guide lists verifiable maintenance facts, install steps, a usage sample, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-ibeacon in Capacitor

The Cordova plugin is published on npm as **cordova-plugin-ibeacon** version **3.8.1**. The registry `modified` timestamp is **14 June 2022**, and the latest version line in that package is **3.8.1** from **12 May 2019**. The upstream source lives at [petermetz/cordova-plugin-ibeacon](https://github.com/petermetz/cordova-plugin-ibeacon), which documents a `LocationManager` facade modeled on Apple's `CLLocationManager`.

In a Capacitor codebase you still carry Cordova-only baggage:

- Installation through `cordova plugin add` and the `cordova.plugins.locationManager` namespace.
- `BeaconRegion` objects built in JavaScript with prototype helpers from the Cordova plugin.
- Delegate events wired through `setDelegate` rather than Capacitor `addListener`.

[`@capgo/capacitor-ibeacon`](https://www.npmjs.com/package/@capgo/capacitor-ibeacon) targets **Capacitor 8** with an actively maintained v8 release line per the README compatibility table. Capgo ships issue fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily. The plugin documents iOS background modes, Android foreground service options for background scanning on Android 8+, and ARMA filtering helpers that the Cordova README does not cover for modern Android.

## Install

```bash
bun add @capgo/capacitor-ibeacon
bunx cap sync
```

**iOS:** add `NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysAndWhenInUseUsageDescription`, `NSBluetoothAlwaysUsageDescription`, and the `UIBackgroundModes` entries from the [plugin README](https://github.com/Cap-go/capacitor-ibeacon/). Enable Background Modes capability for location updates and Bluetooth LE accessories in Xcode when you need background monitoring.

**Android:** the README documents background scanning through `enableBackgroundMode()` and optional `setBackgroundScanPeriod()`. Sync native projects after changing Capacitor config.

## Usage example

```ts
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

const region = {
  identifier: 'StoreFloor',
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
  major: 1,
};

export async function watchStore() {
  await CapacitorIbeacon.requestWhenInUseAuthorization();

  await CapacitorIbeacon.addListener('didEnterRegion', (data) => {
    console.log('Entered', data.region.identifier);
  });

  await CapacitorIbeacon.startMonitoringForRegion(region);
  await CapacitorIbeacon.startRangingBeaconsInRegion(region);
}
```

## Migrating from Cordova to Capacitor

Replace `cordova.plugins.locationManager` with `CapacitorIbeacon`. Pass plain region objects instead of `new BeaconRegion(...)`, and subscribe with `addListener` for events that used to hit your delegate.

### API mapping table

| cordova-plugin-ibeacon (`LocationManager`) | @capgo/capacitor-ibeacon |
| --- | --- |
| `new cordova.plugins.locationManager.BeaconRegion(id, uuid, major, minor)` | `{ identifier, uuid, major?, minor? }` object |
| `startMonitoringForRegion(region)` | `startMonitoringForRegion(options)` |
| `stopMonitoringForRegion(region)` | `stopMonitoringForRegion(options)` |
| `startRangingBeaconsInRegion(region)` | `startRangingBeaconsInRegion(options)` |
| `stopRangingBeaconsInRegion(region)` | `stopRangingBeaconsInRegion(options)` |
| `requestWhenInUseAuthorization()` | `requestWhenInUseAuthorization()` |
| `requestAlwaysAuthorization()` | `requestAlwaysAuthorization()` |
| `getAuthorizationStatus()` | `getAuthorizationStatus()` |
| `startAdvertising(region, measuredPower)` | `startAdvertising(options)` |
| `stopAdvertising()` | `stopAdvertising()` |
| `isRangingAvailable()` | `isRangingAvailable()` |
| `isBluetoothEnabled()` | `isBluetoothEnabled()` |
| Delegate `didEnterRegion` | `addListener('didEnterRegion', ...)` |
| Delegate `didExitRegion` | `addListener('didExitRegion', ...)` |
| Delegate `didRangeBeaconsInRegion` | `addListener('didRangeBeacons', ...)` |
| Delegate `didDetermineStateForRegion` | `addListener('didDetermineStateForRegion', ...)` |

Capgo adds Android-only tuning such as `enableARMAFilter()` and `enableBackgroundMode()` that have no direct equivalent in the Cordova plugin README. Map those when you port background venue analytics.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/ibeacon/](/docs/plugins/ibeacon/)
- Marketing page: [/plugins/capacitor-ibeacon/](/plugins/capacitor-ibeacon/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-ibeacon](https://www.npmjs.com/package/@capgo/capacitor-ibeacon)
- GitHub: [https://github.com/Cap-go/capacitor-ibeacon/](https://github.com/Cap-go/capacitor-ibeacon/)
- Cordova upstream: [https://github.com/petermetz/cordova-plugin-ibeacon](https://github.com/petermetz/cordova-plugin-ibeacon)

Native permission or background mode changes need a store build. Use [Capgo Build](/native-build/) for cloud binaries, then ship UX updates with [Capgo live updates](/live-update/). See the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/) for the full platform move.
