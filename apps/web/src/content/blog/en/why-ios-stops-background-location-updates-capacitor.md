---
slug: why-ios-stops-background-location-updates-capacitor
title: "Why iOS Stops Background Location Updates"
description: "Why iOS stops background location updates in Capacitor apps: suspension, background modes, authorization, auto pause, accuracy and how to fix each cause."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /blog-images/how-background-tasks-work-in-capacitor.webp
head_image_alt: "Illustration of an iPhone app running background tasks while tracking location"
keywords: ios stops background location updates, ios background location capacitor, allowsBackgroundLocationUpdates, pausesLocationUpdatesAutomatically, capacitor background geolocation ios, location updates stop when app in background
tag: iOS, Capacitor, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Why does iOS stop sending location updates a few minutes after my app goes to the background?"
    answer: "iOS suspends most apps shortly after they leave the foreground. Location keeps flowing only if the app declares the location background mode, sets allowsBackgroundLocationUpdates to true, and starts updates while it is still in the foreground."
  - question: "Do I need Always authorization for background location on iOS?"
    answer: "No. An app with When In Use authorization keeps receiving standard location updates in the background if background updates are enabled and started in the foreground. Always is needed for region monitoring, significant-change and visits, which can relaunch a terminated app."
  - question: "Does iOS deliver location updates after the user force quits the app?"
    answer: "Standard location updates stop when the user terminates the app from the app switcher. Only region monitoring, significant-change and visit services can relaunch an app, and only with Always authorization."
  - question: "Why do I get location in the background but not in JavaScript?"
    answer: "Native code can receive locations while the WebView is suspended or throttled. Send points from native code with the url option of @capgo/background-geolocation, so delivery does not depend on JavaScript running."
---

iOS stops background location updates because it suspends your app, not because Core Location fails. Unless the app declares the location background mode, enables background updates on its `CLLocationManager`, and starts them while it is still in the foreground, iOS freezes the process a few seconds after the user leaves and queues or drops the fixes. This guide lists every cause we see in Capacitor apps, with the fix for each, and shows how [`@capgo/background-geolocation`](/plugins/capacitor-background-geolocation/) handles them.

## How iOS treats a backgrounded app

When a user swipes home or locks the phone, iOS gives the app a short window, then suspends it. A suspended app gets no CPU time. For a Capacitor app this means both the native side and the WebView stop running, so your JavaScript callback stops firing too.

Apple makes an exception for apps that are actively using location. If the app is configured for background location and has an active location session started in the foreground, iOS keeps it running and keeps delivering updates. Everything below is about meeting that contract, and about the cases where the system breaks it on purpose.

## Cause 1: the location background mode is missing

Without `location` in `UIBackgroundModes`, no amount of code will keep updates flowing. Add it to `ios/App/App/Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>location</string>
</array>
```

You can also enable it in Xcode under Signing & Capabilities, Background Modes, Location updates. It is a plist key, not an entitlement, so no provisioning profile change is needed.

The native property behind it is `allowsBackgroundLocationUpdates`. Setting it to `true` without the background mode in the plist crashes the app. The Capgo plugin sets it for you when you pass `backgroundMessage` to `start()`, so the plist key must be there before you ship.

App Review checks that the background mode is justified. Explain in the review notes which feature uses it, and make sure the feature is visible to the reviewer.

## Cause 2: updates were started from the background

Apple's rule: background updates continue if they were started while the app was in the foreground. Trying to start a session from a silent push, a background fetch or a `BGTaskScheduler` task does not work for standard location updates.

Start tracking from a user action or on app resume:

```ts
import { App } from '@capacitor/app';
import { BackgroundGeolocation } from '@capgo/background-geolocation';

let tracking = false;

export async function startTracking() {
  if (tracking) return;
  tracking = true;
  await BackgroundGeolocation.start(
    {
      backgroundMessage: 'Recording your route',
      backgroundTitle: 'Route recording',
      requestPermissions: true,
      distanceFilter: 10,
      url: 'https://api.example.com/v1/points',
    },
    (location, error) => {
      if (error) return console.error(error);
      if (location) console.log(location.latitude, location.longitude);
    },
  );
}

// Re-arm when the user comes back, if the session should be active
App.addListener('appStateChange', ({ isActive }) => {
  if (isActive && shouldBeTracking()) startTracking();
});

declare function shouldBeTracking(): boolean;
```

## Cause 3: `backgroundMessage` was not passed

This is specific to the Capgo plugin and the most common bug report. If `backgroundMessage` is undefined, the plugin configures the location manager for foreground use only: `allowsBackgroundLocationUpdates` stays `false` and updates stop when the app is suspended. Pass a message on both platforms. On Android it also becomes the text of the foreground service notification.

## Cause 4: the wrong authorization level, or Allow Once

Many developers think they need Always to track in the background. They do not. Apple documents that an app with When In Use authorization keeps running in the background while it has active location services, as long as background updates are enabled.

Always matters for something else: relaunching a terminated app. Only region monitoring, significant-change location and visits can relaunch an app, and only with Always.

Two user choices quietly break background tracking:

- **Allow Once.** This is a temporary When In Use grant that expires when the app stops being used. The next session starts from "not determined" again.
- **While Using, then Always prompt never shown.** When you request Always, iOS may show the upgrade prompt later, at a moment it chooses, often when the app is not on screen.

Check the real state before you start a session:

```ts
import { BackgroundGeolocation } from '@capgo/background-geolocation';

const status = await BackgroundGeolocation.checkPermissions();

if (status.location !== 'granted') {
  await BackgroundGeolocation.requestPermissions({ permissions: ['location'] });
}

if (status.backgroundLocation === 'when_in_use') {
  // Background tracking still works for standard updates.
  // Explain why Always helps if you also rely on geofences.
}
```

On iOS, `backgroundLocation` returns `when_in_use` or `granted` / `always`, so you can show the right explanation instead of guessing.

## Cause 5: Core Location paused updates automatically

`CLLocationManager.pausesLocationUpdatesAutomatically` defaults to `true`. When iOS decides the user is not moving, it pauses updates to save battery. For a When In Use app, a pause ends location access until the app is launched again, and Core Location does not resume on its own.

The Capgo plugin sets `pausesLocationUpdatesAutomatically = false` in its native code, so this one is handled. If you write your own native code, or use another plugin, check this property first.

## Cause 6: the device is stationary and the filter is large

With a `distanceFilter` of 50 meters, a phone sitting on a desk produces no updates. That looks like "tracking stopped" in your logs but it is working as designed.

- If you need heartbeats while stationary, use a small or zero `distanceFilter`.
- Use `minIntervalMs` to cap how often native POSTs are sent, rather than a large distance filter.

```ts
await BackgroundGeolocation.start(
  {
    backgroundMessage: 'Vehicle tracking active',
    distanceFilter: 0,
    minIntervalMs: 120_000, // at most one native POST every 2 minutes
    url: 'https://api.example.com/v1/vehicle-points',
  },
  () => {},
);
```

## Cause 7: Precise Location is off

Since iOS 14 users can turn off Precise Location for your app. You still get updates, but they are approximate (several kilometers) and arrive much less often. Detect this in your data (large `accuracy` values) and explain to the user why precise location matters for your feature. If you ship a delivery or fitness app, show this in onboarding, not after a bad trip.

## Cause 8: the user terminated the app

If the user swipes the app away in the app switcher, iOS stops standard location updates. No plugin can keep them running. This is a common surprise for teams coming from Android, where a foreground service can keep running after the task is removed.

Options:

- Tell users not to force quit during a session. Most fleet apps do this in onboarding.
- Add geofences with Always authorization around important places so iOS can relaunch the app in the background on enter or exit.
- Send a push to remind the user to reopen the app when your server stops receiving points for a session.

## Cause 9: JavaScript is not running even though native is

A subtle one. Native code can receive a location while the WebView is suspended, or while it is still alive but not processing timers or network calls quickly. If you send points with `fetch` from the callback, they can arrive late or not at all.

Use the plugin's `url` option. Each point is POSTed from native code with the same JSON as the `Location` type plus `"source": "native"`, independent of the WebView. Keep the callback for UI updates only. Delivery is best effort with no on-disk queue, so if you cannot lose a point, also store it locally when the callback fires and reconcile later.

For background work beyond location, read [how background tasks work in Capacitor](/blog/how-background-tasks-work-in-capacitor/) and see [`@capgo/capacitor-background-task`](/plugins/capacitor-background-task/).

## Cause 10: Low Power Mode and thermal state

Low Power Mode reduces background activity across the system. Location still works, but other things your session depends on (network retries, background refresh) slow down. Test with Low Power Mode on before you sign off a release.

## The blue indicator

When an app with When In Use authorization uses location in the background, iOS shows a blue pill in the status bar. The Capgo plugin sets `showsBackgroundLocationIndicator` to `true` for background sessions, which is what users expect and what reviewers look for. Do not try to hide it, users trust it.

## A test plan that catches these bugs

Simulator testing is not enough for background location. Use a real iPhone and:

1. Build a release configuration, not just debug. Debug builds attached to Xcode get different lifecycle treatment.
2. Start a session in the foreground, lock the phone, walk or drive for 20 minutes.
3. Repeat with "Allow Once", with Precise Location off, with Low Power Mode on.
4. Check your server logs for `source: "native"` points, not just your in-app log.
5. Force quit during a session and confirm your app explains what happened on next launch.

If you need a device UDID for ad hoc builds, the [iOS UDID finder](/tools/ios-udid-finder/) gets it from Safari. If you do not have a Mac with Xcode 26 for builds, [Capgo Build](/native-build/) can produce signed iOS builds in the cloud.

## Troubleshooting checklist

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Stops seconds after locking | No `location` background mode or no `backgroundMessage` | Add the plist key and pass `backgroundMessage` |
| Crash on start | `allowsBackgroundLocationUpdates` without background mode | Add `UIBackgroundModes` → `location` |
| Works once, then not | User chose Allow Once | Explain and ask again, or send to `openSettings()` |
| Stops when parked | Large `distanceFilter` | Lower it, use `minIntervalMs` |
| Points far apart, low accuracy | Precise Location off | Ask the user to enable it |
| Stops after swipe away | User terminated the app | Expected on iOS, use geofences for relaunch |
| Native gets points, server does not | JavaScript `fetch` in callback | Use the `url` option |

## Shipping fixes

Most of these fixes touch `Info.plist` or native configuration, so they need a new App Store build. The JavaScript parts, such as permission explanations, onboarding copy and retry logic, can be shipped to existing users with [Capgo live updates](/live-update/) once the native build is out.

If you are deciding between plugins, our comparison of [Transistorsoft and the free Capgo plugin](/blog/transistorsoft-background-geolocation-alternative/) covers the trade-offs.
