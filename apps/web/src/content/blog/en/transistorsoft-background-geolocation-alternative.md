---
slug: transistorsoft-background-geolocation-alternative
title: "Transistorsoft Background Geolocation Alternative"
description: "A free, open source Transistorsoft background geolocation alternative for Capacitor 8: features, licensing, setup, geofencing and a migration guide."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /blog-images/how-to-add-geolocation-targeting-to-ota-updates.webp
head_image_alt: "Map pins and location tracking illustration for a Capacitor background geolocation plugin comparison"
keywords: transistorsoft background geolocation alternative, capacitor background geolocation, background location capacitor, capacitor geofencing, @capgo/background-geolocation, free background geolocation plugin
tag: Alternatives, Capacitor, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Is there a free alternative to Transistorsoft background geolocation for Capacitor?"
    answer: "Yes. @capgo/background-geolocation is MIT licensed and free for release builds on iOS and Android. It covers background tracking, native geofencing, native HTTP POST of locations and permission handling for Capacitor 8."
  - question: "Does Transistorsoft background geolocation need a license in production?"
    answer: "Since version 9, Transistorsoft requires a license key for release builds on both iOS and Android. Debug builds work without a key. Version 8 keys do not work with version 9."
  - question: "Can @capgo/background-geolocation keep tracking after the user swipes the app away?"
    answer: "On Android, when you set the url option, the foreground service is sticky and keeps POSTing locations natively after the process is killed. On iOS, the system stops standard location updates when the user terminates the app, which no plugin can override."
  - question: "Does the Capgo plugin support geofencing?"
    answer: "Yes. It exposes setupGeofencing, addGeofence, removeGeofence, removeAllGeofences, getMonitoredGeofences and a geofenceTransition event, plus an optional native webhook for transitions that happen while the WebView is suspended."
---

If you are looking for a Transistorsoft background geolocation alternative for Capacitor, the closest free option is [`@capgo/background-geolocation`](/plugins/capacitor-background-geolocation/). It is MIT licensed, ships for Capacitor 8, tracks location in the background on iOS and Android, supports native geofencing, and can POST locations to your server from native code. It does not copy every Transistorsoft feature, so this guide covers what you gain, what you give up, and how to migrate.

## Why teams look for a Transistorsoft alternative

The Transistorsoft SDK is a mature product that has powered fleet, delivery and fitness apps for years. People rarely leave it because it is broken. They leave for these reasons:

### Release builds now need a key on both platforms

According to the Transistorsoft changelog, version 9.0.0 moved to a JWT based license key and started requiring a key on iOS too. Before v9, only Android release builds were locked. Keys from v8 and earlier do not work with v9, so upgrading the plugin also means generating new keys from their dashboard.

Their shop sells perpetual licenses per app identifier, from one key up to 100 keys, with one year of updates included. Add-ons such as polygon geofencing are now encoded into the same key. For one app this is a reasonable price. For an agency with 20 white label apps, or a company that ships separate staging and production bundle IDs, the license becomes a line item someone has to manage every year.

### The core engine is a binary

The Capacitor wrapper is open, but the location engine ships as a prebuilt iOS framework and an Android library from Maven. When something odd happens on a specific Android OEM, you cannot read or patch the code that decides when to record a fix. Some teams accept that. Teams with strict audit requirements, or who just want to step through the code in Xcode, often do not.

### Configuration surface

The plugin exposes a very large configuration object: motion detection, scheduling, odometer, SQLite persistence, HTTP sync templates, headless tasks and more. If you need all of it, that is great. If you need "send my position every 30 seconds while the driver is on shift", it is a lot of settings to understand.

## What @capgo/background-geolocation does

The Capgo plugin started from the long history of the Cordova background geolocation forks and the lightweight community Capacitor plugin. The goal is accurate fixes, reliable background operation and native geofencing, without a license.

Current features in the 8.x line:

- Foreground and background location updates through a single `start()` call with a callback.
- `distanceFilter` and `minIntervalMs` to control how often points arrive.
- Native HTTP POST of every location to a `url` you configure, with custom `headers` and `updateHeaders()` for token rotation.
- Native circular geofences with enter and exit events, and a native webhook for transitions.
- `checkPermissions()` and `requestPermissions()` that distinguish iOS When In Use from Always.
- `openSettings()` for users who denied permission.
- `setPlannedRoute()` to play a sound when the user leaves a planned route.
- Optional Android `networkFallback` that fills GPS gaps with network locations.
- A web implementation for development and browser testing.

## Feature comparison

| Capability | Transistorsoft (v9) | @capgo/background-geolocation |
| --- | --- | --- |
| License | Paid key for release builds, per app ID | MIT, free |
| Source | Wrapper open, engine binary | Fully open source |
| Capacitor 8 | Yes | Yes |
| Background tracking | Yes | Yes |
| Motion detection state machine | Yes | No |
| Native HTTP upload | Yes, with SQLite queue and batching | Yes, best effort POST, no on-disk queue |
| Geofencing | Yes, polygon as add-on | Circular geofences on iOS and Android |
| Geofence events sent to your server | Yes, via HTTP sync | Yes, native webhook |
| Tracking after app is swiped away (Android) | Yes | Yes, with `url` set |
| Tracking after reboot | Yes (`startOnBoot`) | No |
| Scheduling, odometer | Yes | No |

The honest summary: Transistorsoft is the better fit when the app must decide on its own when to track, survive reboots and buffer weeks of points offline. The Capgo plugin is the better fit when the user or your app explicitly starts tracking, and you want accurate fixes with no license and readable code.

## Install and configure

```bash
bun add @capgo/background-geolocation
bunx cap sync
```

### iOS

Add the usage strings and the location background mode to `ios/App/App/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We use your location to show your route.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We use your location in the background to record your route while the phone is locked.</string>
<key>UIBackgroundModes</key>
<array>
  <string>location</string>
</array>
```

Remember that App Store uploads require Xcode 26 since April 2026. If your CI image is older, the upload will be rejected even if the build succeeds. [Capgo Build](/native-build/) runs on current Xcode images if you do not want to maintain Macs.

### Android

The plugin uses a foreground service with a persistent notification while tracking in the background. On Android 13 and newer, it requests `POST_NOTIFICATIONS` after location is granted so that notification can be shown.

Set `useLegacyBridge` in `capacitor.config.ts`. Without it, location callbacks to the WebView can stop after about five minutes in the background:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.tracker',
  appName: 'Tracker',
  webDir: 'dist',
  android: {
    useLegacyBridge: true,
  },
};

export default config;
```

You can customize the notification channel name, icon and color through `strings.xml` keys documented in the [plugin docs](/docs/plugins/background-geolocation/).

## Start tracking

```ts
import { BackgroundGeolocation } from '@capgo/background-geolocation';

export async function startShift(token: string) {
  await BackgroundGeolocation.start(
    {
      backgroundTitle: 'Shift in progress',
      backgroundMessage: 'Your location is shared with dispatch until you end the shift.',
      requestPermissions: true,
      stale: false,
      distanceFilter: 25,
      url: 'https://api.example.com/v1/locations',
      headers: { Authorization: `Bearer ${token}` },
      minIntervalMs: 30_000,
    },
    (location, error) => {
      if (error) {
        if (error.code === 'NOT_AUTHORIZED') {
          BackgroundGeolocation.openSettings();
        }
        console.error(error);
        return;
      }
      if (location) {
        // Update the UI while the WebView is alive
        console.log(location.latitude, location.longitude, location.accuracy);
      }
    },
  );
}

export async function endShift() {
  await BackgroundGeolocation.stop();
}
```

Two options matter more than they look:

- `backgroundMessage` is what turns on background delivery. Without it, updates are only guaranteed in the foreground on both platforms.
- `url` sends each point from native code with a `"source": "native"` field in the body. That path does not depend on the WebView, which is what keeps data flowing when Android throttles the WebView or iOS suspends JavaScript.

When the access token expires, rotate it without restarting the session:

```ts
await BackgroundGeolocation.updateHeaders({
  headers: { Authorization: `Bearer ${newToken}` },
});
```

## Geofencing

Transistorsoft users often rely on its geofencing. The Capgo plugin covers circular regions with native APIs on both platforms:

```ts
import { BackgroundGeolocation } from '@capgo/background-geolocation';

await BackgroundGeolocation.setupGeofencing({
  url: 'https://api.example.com/v1/geofence-events',
  headers: { Authorization: 'Bearer <token>' },
  notifyOnEntry: true,
  notifyOnExit: true,
  payload: { driverId: 'd-381' },
  backgroundLocation: true, // Android only, needs ACCESS_BACKGROUND_LOCATION in your manifest
});

await BackgroundGeolocation.addGeofence({
  identifier: 'depot-north',
  latitude: 48.8584,
  longitude: 2.2945,
  radius: 200,
  payload: { depotId: 'north' },
});

await BackgroundGeolocation.addListener('geofenceTransition', (event) => {
  console.log(event.identifier, event.transition, event.payload);
});
```

iOS geofencing needs Always authorization. On Android 10 and newer, background geofencing needs `ACCESS_BACKGROUND_LOCATION`, which the plugin does not add for you. Only add it if your app has Google Play approval for background location. If your geofences behave strangely on iOS, read our guide on [why geofences do not trigger on iOS](/blog/capacitor-geofences-not-triggering-ios/).

## Migrating from Transistorsoft

The APIs are different, so plan a small rewrite of your location service rather than a search and replace.

| Transistorsoft concept | Capgo equivalent |
| --- | --- |
| `ready(config)` + `start()` | `start(options, callback)` |
| `onLocation` listener | The `start()` callback |
| `stop()` | `stop()` |
| `distanceFilter` | `distanceFilter` |
| `url`, `headers` HTTP sync | `url`, `headers`, `updateHeaders()` |
| `addGeofence` / `onGeofence` | `addGeofence` / `geofenceTransition` |
| `removeGeofence(s)` | `removeGeofence` / `removeAllGeofences` |
| `getGeofences` | `getMonitoredGeofences` |
| Permission helpers | `checkPermissions` / `requestPermissions` |
| Motion detection, schedule, odometer | Implement in your app logic or on the server |

Steps that work well in practice:

1. Wrap location access behind a small service in your app (`startTracking`, `stopTracking`, `onPoint`). Most apps already have one.
2. Implement the service with the Capgo plugin behind a feature flag or a separate build.
3. Make your backend accept the plugin's location JSON. The body matches the `Location` type (`latitude`, `longitude`, `accuracy`, `speed`, `bearing`, `time` and so on) plus `source`.
4. Remove the Transistorsoft plugin, its license keys, extra Gradle variables and the background modes you no longer need.
5. Test on real devices with the screen locked for at least 30 minutes, on one Pixel, one Samsung and one iPhone at minimum.

Native plugin changes need a new store build. Once that build is live, you can keep shipping JavaScript fixes to your tracking UI with [Capgo live updates](/live-update/) without another review cycle.

## Where the Capgo plugin is not enough

Be clear on these before you switch:

- **No persistent queue.** Native POSTs are best effort. If the device is offline, failed points are logged and dropped. If you cannot lose a point, also store points locally in the callback (for example with SQLite) and sync them from the app, or keep Transistorsoft.
- **No restart after reboot.** Tracking resumes the next time the user opens the app.
- **No automatic motion detection.** The app decides when to start and stop.
- **iOS termination.** If the user force quits on iOS, standard location updates stop. That is an OS rule, not a plugin limitation.

For more context on what Capacitor can run while the app is backgrounded, see [how background tasks work in Capacitor](/blog/how-background-tasks-work-in-capacitor/).

## Troubleshooting

**Updates stop after a few minutes on Android.** Check `useLegacyBridge: true`, confirm the foreground service notification is visible, and disable battery optimization for the app during testing on aggressive OEMs. Use the `url` option so delivery does not depend on the WebView.

**No updates in the background on iOS.** Confirm `UIBackgroundModes` contains `location`, that you passed `backgroundMessage`, and that you called `start()` while the app was in the foreground. Our guide on [why iOS stops background location updates](/blog/why-ios-stops-background-location-updates-capacitor/) walks through every cause.

**`NOT_AUTHORIZED` error.** The user denied location. Call `openSettings()` after explaining why the app needs it.

**Jumpy points indoors.** Raise `distanceFilter`, ignore points with large `accuracy` values, and on Android consider `networkFallback: true` only if coarse fixes are acceptable.

**Mock locations in a delivery app.** Each `Location` has a `simulated` flag. For stricter checks, add [`@capgo/capacitor-mock-location-detector`](/plugins/capacitor-mock-location-detector/).

## Choosing

Pick Transistorsoft if you need motion based auto start, reboot persistence, an offline queue and polygon geofences, and the license cost fits. Pick `@capgo/background-geolocation` if your tracking is session based, you want readable code and no per app license, and you are fine owning queueing in your app. If you are replacing several paid native SDKs at once, the [Ionic enterprise plugin alternatives](/ionic-enterprise-plugins/) page lists the other Capgo replacements.
