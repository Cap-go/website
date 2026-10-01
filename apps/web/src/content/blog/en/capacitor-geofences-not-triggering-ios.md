---
slug: capacitor-geofences-not-triggering-ios
title: "Why Geofences Are Not Triggering on iOS"
description: "Geofences not triggering on iOS in your Capacitor app? Learn how region monitoring works, the permission, radius and limit rules, and how to debug each case."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /blog-images/how-to-add-geolocation-targeting-to-ota-updates.webp
head_image_alt: "Map with location boundaries illustrating geofencing in a Capacitor iOS app"
keywords: geofences not triggering ios, ios geofencing capacitor, region monitoring ios, capacitor geofence, geofence enter exit event, CLCircularRegion
tag: iOS, Capacitor, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Why are my geofences not triggering on iOS?"
    answer: "The most common causes are missing Always authorization, the device already being inside the region when it was added, a radius that is too small, the 20 region limit per app, and testing for too short a time. iOS also waits until the device has clearly crossed the boundary before reporting it."
  - question: "How many geofences can an iOS app monitor?"
    answer: "Core Location lets one app monitor up to 20 regions at the same time. If you need more, register only the closest regions and refresh the set as the user moves."
  - question: "What radius should I use for iOS geofences?"
    answer: "Use at least 100 to 200 meters for reliable results. Region monitoring relies heavily on Wi-Fi and cell data, so very small regions often fire late or not at all, especially indoors."
  - question: "Do iOS geofences fire if the app is not running?"
    answer: "With Always authorization, iOS can relaunch the app in the background to deliver a region event. In a Capacitor app the WebView may not be ready at that moment, so send transitions to your server from native code with the url option of setupGeofencing."
  - question: "Can I test geofences in the iOS Simulator?"
    answer: "You can simulate locations with a GPX file in Xcode to check your logic, but timing and reliability only show up on a real device moving through real places."
---

When geofences are not triggering on iOS, the cause is almost always one of a short list: the app lacks Always authorization, the device was already inside the region when you added it, the radius is too small for iOS to detect a crossing, the app hit the 20 region limit, or the test did not wait long enough. iOS geofencing works well, but it reports crossings on its own schedule. This guide explains how region monitoring decides when to fire, and how to debug a Capacitor app using [`@capgo/background-geolocation`](/plugins/capacitor-background-geolocation/), which includes native geofencing on iOS and Android.

## How iOS region monitoring works

On iOS, geofences are `CLCircularRegion` objects registered with Core Location. Once registered, the operating system monitors them, not your app. Your app can be suspended or not running and iOS still tracks the regions, using a mix of cell towers, Wi-Fi and GPS to keep battery use low.

When iOS decides the device crossed a boundary, it delivers an enter or exit event to the app, launching it in the background if needed and permitted. A few rules control that decision:

- iOS does not report a crossing the moment the device touches the boundary. Apple's guidance is that the device must cross, move a minimum distance past the boundary, and stay there for at least about 20 seconds before the event is delivered. This avoids firing on GPS jitter.
- Location accuracy for region monitoring depends on what radios are around. In a city with dense Wi-Fi, it can be quick. On a rural road, it can take minutes.
- Events are only for transitions. Being inside a region when monitoring starts does not count as an entry.

## Set up geofencing in a Capacitor app

Install the plugin and configure the iOS keys:

```bash
bun add @capgo/background-geolocation
bunx cap sync
```

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We use your location to detect when you arrive at a store.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We need Always access to notify you when you arrive, even when the app is closed.</string>
```

Then register regions:

```ts
import { BackgroundGeolocation } from '@capgo/background-geolocation';

await BackgroundGeolocation.setupGeofencing({
  url: 'https://api.example.com/v1/geofence-events',
  headers: { Authorization: 'Bearer <token>' },
  notifyOnEntry: true,
  notifyOnExit: true,
  payload: { userId: 'u-42' },
});

await BackgroundGeolocation.addGeofence({
  identifier: 'store-paris-11',
  latitude: 48.8606,
  longitude: 2.3795,
  radius: 150,
  payload: { storeId: 'paris-11' },
});

await BackgroundGeolocation.addListener('geofenceTransition', (event) => {
  console.log(`${event.transition} ${event.identifier}`, event.payload);
});

await BackgroundGeolocation.addListener('geofenceError', (event) => {
  console.error('Geofence error', event.identifier, event.code, event.message);
});
```

`setupGeofencing` asks for the permission geofencing needs by default (`requestPermissions` defaults to `true`). On iOS that means Always.

Now, the failure modes.

## 1. You do not have Always authorization

Region monitoring on iOS needs Always authorization. With While Using App only, your regions will not deliver events when the app is in the background or not running, which is the whole point of a geofence.

Check before you register regions, and explain the request in your own UI first:

```ts
const status = await BackgroundGeolocation.checkPermissions();

if (status.backgroundLocation !== 'always' && status.backgroundLocation !== 'granted') {
  // Show your own screen explaining the feature, then:
  const next = await BackgroundGeolocation.requestPermissions({
    permissions: ['backgroundLocation'],
  });
  if (next.backgroundLocation === 'when_in_use' || next.backgroundLocation === 'denied') {
    await BackgroundGeolocation.openSettings();
  }
}
```

Note that iOS may not show the Always upgrade prompt immediately. Users who picked "Allow While Using App" may only see the second prompt later. Users who picked "Allow Once" get a temporary grant that resets. If geofencing is a core feature, check the status at every app start and show a clear banner when it is not Always.

## 2. The device was already inside the region

If you add a geofence while the phone is inside it, iOS does not send an enter event. Nothing crossed. Teams hit this constantly when testing at their desk with a region around the office.

Fix it in your app: when you register a region, compare the current position with the region and handle "already inside" yourself.

```ts
import { Geolocation } from '@capacitor/geolocation';

function distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const region = { identifier: 'store-paris-11', latitude: 48.8606, longitude: 2.3795, radius: 150 };
await BackgroundGeolocation.addGeofence(region);

const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
if (distanceMeters(pos.coords.latitude, pos.coords.longitude, region.latitude, region.longitude) < region.radius) {
  handleAlreadyInside(region.identifier);
}

declare function handleAlreadyInside(id: string): void;
```

To test an enter event, walk or drive out well past the radius, wait, then come back.

## 3. The radius is too small

iOS accepts small radii, but reliability drops quickly below about 100 meters, because region monitoring leans on Wi-Fi and cell positioning. A 30 meter region around a shop door may fire late, fire after the customer has left, or not fire at all.

Practical values:

| Use case | Suggested radius |
| --- | --- |
| Store or restaurant arrival | 100 to 200 m |
| Office, campus, warehouse | 150 to 300 m |
| Neighborhood or city zone | 500 m and up |

If you need door level precision, combine a larger geofence with foreground location or a beacon once the user is inside. Capgo also has an [iBeacon plugin](/docs/plugins/ibeacon/) for indoor proximity.

## 4. You hit the 20 region limit

An iOS app can monitor at most 20 regions at once. When you add more, registration fails for the extra ones and you get a monitoring error.

Use `getMonitoredGeofences()` to see what is really registered, and keep a rolling set of the nearest regions:

```ts
const { regions } = await BackgroundGeolocation.getMonitoredGeofences();
console.log(`Monitoring ${regions.length} regions`, regions);
```

A common pattern:

1. Keep your full list of places on the server.
2. When the app starts, and when the user moves far (for example on exit of a large "refresh" region around the user), fetch the 19 nearest places.
3. Call `removeAllGeofences()`, then add the 19 nearest plus one large region centered on the user. Exiting that large region is your signal to refresh.

Android allows up to 100 geofences per app, so code that works on Android can fail on iOS for this reason alone.

## 5. The test was too short or too static

iOS reports transitions only after the device has clearly crossed and stayed on the other side. If you drive through a 150 meter region at 50 km/h, you spend about 20 seconds inside it. That may not be enough.

When testing:

- Stay outside for a minute, then go inside and stay at least a couple of minutes.
- Test with Wi-Fi turned on. Turning Wi-Fi off makes region monitoring much less accurate, even if you are not connected to any network.
- Do not rely on the Simulator for timing. Use it with a GPX route in Xcode to check your handlers, then test on a device.

## 6. The event fired, but your JavaScript did not run

When iOS relaunches your app in the background for a region event, the native plugin receives it, but the Capacitor WebView may not be loaded or may be suspended again quickly. The `geofenceTransition` listener only fires while the WebView is alive.

That is why `setupGeofencing` accepts a `url`. The plugin POSTs the transition from native code, including your merged `payload`, so your backend gets it even when JavaScript never runs. Headers are persisted with the setup so they still work after a relaunch, and you can rotate them with `updateHeaders()`.

Delivery is best effort, with no retry queue. Make the endpoint fast and idempotent, and log every request during testing.

## 7. Location Services or Background App Refresh are off

Check these on the test device:

- Settings, Privacy & Security, Location Services is on.
- Your app is set to Always.
- Precise Location is on for your app. Without it, small regions are unreliable.
- Low Power Mode is off during your first tests. It reduces background activity.

## 8. Reboots and app updates

iOS keeps monitored regions across app launches. After a device restart, monitoring resumes once the system is back up, but your app should still re-sync its regions on launch: compare `getMonitoredGeofences()` with what you expect and re-add missing ones. Do the same after an app update, and whenever the server changes the list of places.

On Android, geofences are removed after a reboot and in a few other situations (location turned off, app data cleared), so re-registering on launch is required there anyway. Doing it on both platforms keeps the logic simple.

## 9. Force quit

If a user force quits the app from the app switcher, iOS treats it as a strong signal that the user does not want the app running. Region relaunch behavior after a force quit has changed across iOS versions. Do not build a feature that only works if the app is relaunched after a force quit, and test it on the iOS versions your users run.

## Debugging checklist

| Check | How |
| --- | --- |
| Permission is Always | `checkPermissions()` returns `always` or `granted` for `backgroundLocation` |
| Region is registered | `getMonitoredGeofences()` lists the identifier |
| Under 20 regions | Count from `getMonitoredGeofences()` |
| Radius ≥ 100 m | Review your `addGeofence` calls |
| Not already inside | Compare current position on registration |
| Errors are logged | Listen to `geofenceError` |
| Backend receives events | Set `url` in `setupGeofencing` and log requests |
| Real movement test | Leave the region fully, wait, come back and stay |

## Android differences to keep in mind

If the same code works on Android but not iOS, the 20 region limit and the Always requirement are the usual reasons. If it works on iOS but not Android, check that you added `ACCESS_BACKGROUND_LOCATION` to your manifest and set `backgroundLocation: true` in `setupGeofencing`. The plugin does not add that permission for you, because Google Play requires a declaration for background location.

## Shipping changes

Permission strings and native configuration require a new build. Region lists, radius values and UI text can be changed server side or shipped through [Capgo live updates](/live-update/). For continuous tracking rather than enter and exit events, see [why iOS stops background location updates](/blog/why-ios-stops-background-location-updates-capacitor/), and the plugin [documentation](/docs/plugins/background-geolocation/) for the full API.
