---
slug: cordova-plugin-launch-navigator-alternative
title: "cordova-plugin-launch-navigator Alternative for Capacitor"
description: "cordova-plugin-launch-navigator alternative for Capacitor: open Apple Maps, Google Maps or Waze with @capgo/capacitor-launch-navigator and coordinate-based navigation."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-13T09:00:00.000Z
updated_at: 2026-11-13T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a launch navigator guide"
keywords: cordova-plugin-launch-navigator alternative, phonegap launch navigator capacitor, open maps directions, @capgo/capacitor-launch-navigator, launchnavigator migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What replaces uk.co.workingedge.phonegap.plugin.launchnavigator in Capacitor?"
    answer: "@capgo/capacitor-launch-navigator is a Capacitor port of phonegap-launch-navigator with navigate, getAvailableApps, isAppAvailable, and provider icon helpers."
  - question: "Can I pass a street address to navigate()?"
    answer: "Not in the Capgo plugin. It accepts latitude and longitude pairs only. Geocode addresses first with @capgo/capacitor-nativegeocoder forwardGeocode()."
  - question: "Is the PhoneGap plugin still maintained?"
    answer: "npm lists uk.co.workingedge.phonegap.plugin.launchnavigator at 5.0.7 with modified 3 December 2024. The cordova-plugin-launch-navigator package on npm is at 13.20.0 with modified 27 October 2026. Both trace to the dpa99c phonegap-launch-navigator project."
  - question: "Do I need a Google API key on Android?"
    answer: "The Cordova plugin required a key when geocoding addresses on Android. The Capgo plugin does not geocode, so you only need coordinates unless you call a geocoder yourself."
  - question: "What must I add on iOS?"
    answer: "LSApplicationQueriesSchemes entries for each maps app you want to detect, as listed in the Capgo plugin README."
  - question: "Where are docs and source?"
    answer: "https://capgo.app/docs/plugins/launch-navigator/, npm @capgo/capacitor-launch-navigator, GitHub Cap-go/capacitor-launch-navigator."
---

If you need a **cordova-plugin-launch-navigator alternative** (or the equivalent `uk.co.workingedge.phonegap.plugin.launchnavigator` Cordova package), use [`@capgo/capacitor-launch-navigator`](/plugins/capacitor-launch-navigator/). The Capgo README describes it as a **Capacitor port of phonegap-launch-navigator**, opening turn-by-turn apps from `[latitude, longitude]` pairs with promises instead of `launchnavigator.navigate` callbacks. This guide covers maintenance facts, install steps, a coordinate-only example, and an API map.

## Why migrate from PhoneGap Launch Navigator

The historic npm id is **uk.co.workingedge.phonegap.plugin.launchnavigator** version **5.0.7**, last modified **3 December 2024** on npm. The related **cordova-plugin-launch-navigator** package is at **13.20.0**, modified **27 October 2026**. Source and issues live at [dpa99c/phonegap-launch-navigator](https://github.com/dpa99c/phonegap-launch-navigator).

The Cordova plugin fits Cordova lifecycle:

- `launchnavigator.navigate("London, UK")` geocodes free-form addresses on Android through Google's Geocoding API, which required a `GOOGLE_API_KEY_FOR_ANDROID` install variable.
- Callbacks such as `launchnavigator.availableApps(function(results){...})` instead of promises.
- Installation with `cordova plugin add uk.co.workingedge.phonegap.plugin.launchnavigator`.

[`@capgo/capacitor-launch-navigator`](https://www.npmjs.com/package/@capgo/capacitor-launch-navigator) aligns with **Capacitor 8** and documents coordinates-only navigation. That removes embedded geocoding and API key handling from the navigation plugin itself. Geocode with [`@capgo/capacitor-nativegeocoder`](/plugins/capacitor-nativegeocoder/) when users type addresses. Capgo maintains the port with the same open source workflow where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-launch-navigator
bunx cap sync
```

**iOS:** add `LSApplicationQueriesSchemes` for each navigation app you detect, for example `comgooglemaps`, `waze`, and `citymapper`, following the list in the [README](https://github.com/Cap-go/capacitor-launch-navigator/).

**Android:** the README states no extra manifest work is required because package queries merge from the plugin AAR.

## Usage example

```ts
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

export async function openDirectionsToStore(lat: number, lng: number) {
  const { apps } = await LaunchNavigator.getAvailableApps();
  const preferred = apps.find((a) => a.id === 'google_maps') ?? apps[0];

  await LaunchNavigator.navigate({
    destination: [lat, lng],
    options: { app: preferred?.id ?? 'user_select' },
  });
}
```

When users enter a street address, geocode first:

```ts
import { NativeGeocoder } from '@capgo/capacitor-nativegeocoder';

const { addresses } = await NativeGeocoder.forwardGeocode({ addressString: '1 Market St, San Francisco' });
const first = addresses[0];
await LaunchNavigator.navigate({ destination: [first.latitude, first.longitude] });
```

## Migrating from Cordova to Capacitor

Replace the global `launchnavigator` object with `LaunchNavigator` imports. Convert address strings to coordinates before `navigate()`.

### API mapping table

| uk.co.workingedge.phonegap.plugin.launchnavigator | @capgo/capacitor-launch-navigator |
| --- | --- |
| `launchnavigator.navigate(dest, options)` | `navigate({ destination: [lat, lng], options })` |
| `launchnavigator.navigate("lat, lng", { start: "..." })` | `navigate({ destination, options: { start: [lat, lng] } })` |
| `options.app = launchnavigator.APP.GOOGLE_MAPS` | `options: { app: 'google_maps' }` |
| `launchnavigator.APP.USER_SELECT` | `app: 'user_select'` |
| `launchnavigator.isAppAvailable(app, cb)` | `isAppAvailable({ app })` |
| `launchnavigator.availableApps(cb)` | `getAvailableApps()` |
| `launchnavigator.getAppsForPlatform(platform)` | `getSupportedApps()` |
| `launchnavigator.getAppDisplayName(app)` | `AvailableApp.name` from `getAvailableApps()` |
| Address string destinations | `forwardGeocode()` via `@capgo/capacitor-nativegeocoder` |
| `setApiKey(key)` for Android geocoding | Not needed on Capgo navigation plugin |
| `enableDebug()` | Use Capacitor WebView logging during development |

Capgo adds `getDefaultApp()`, `getAppIcons()`, `refreshAppIcons()`, and `clearIconCache()` for custom app chooser UIs. PhoneGap app id aliases such as `garmin_navigon` and `here` remain accepted per the README.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/launch-navigator/](/docs/plugins/launch-navigator/)
- Marketing page: [/plugins/capacitor-launch-navigator/](/plugins/capacitor-launch-navigator/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-launch-navigator](https://www.npmjs.com/package/@capgo/capacitor-launch-navigator)
- GitHub: [https://github.com/Cap-go/capacitor-launch-navigator/](https://github.com/Cap-go/capacitor-launch-navigator/)
- PhoneGap upstream: [https://github.com/dpa99c/phonegap-launch-navigator](https://github.com/dpa99c/phonegap-launch-navigator)

After you add iOS query schemes, ship a native build through [Capgo Build](/native-build/). JavaScript chooser flows can iterate with [live updates](/live-update/). Full platform migration: [migrating Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/).
