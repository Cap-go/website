---
slug: cordova-plugin-nativegeocoder-alternative
title: "cordova-plugin-nativegeocoder Alternative for Capacitor"
description: "cordova-plugin-nativegeocoder alternative for Capacitor: forward and reverse geocode with native iOS and Android APIs via @capgo/capacitor-nativegeocoder."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-14T09:00:00.000Z
updated_at: 2026-11-14T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a native geocoder guide"
keywords: cordova-plugin-nativegeocoder alternative, capacitor geocoding, reverse geocode capacitor, @capgo/capacitor-nativegeocoder, nativegeocoder migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What replaces cordova-plugin-nativegeocoder in Capacitor?"
    answer: "@capgo/capacitor-nativegeocoder exposes reverseGeocode and forwardGeocode with useLocale, defaultLocale, and maxResults options aligned with the Cordova plugin."
  - question: "Do I need a Google Geocoding API key?"
    answer: "Not on iOS or Android native geocoding. The Cordova and Capgo plugins use Core Location and Android Geocoder. Web in Capgo uses Google Geocoding only when you run the web implementation with an apiKey."
  - question: "Is cordova-plugin-nativegeocoder still maintained?"
    answer: "npm shows version 3.5.1 with modified 8 March 2023. The sebastianbaar/cordova-plugin-nativegeocoder GitHub repository last committed in March 2023."
  - question: "Which permissions are required?"
    answer: "Android ACCESS_COARSE_LOCATION and ACCESS_FINE_LOCATION in AndroidManifest.xml. iOS NSLocationWhenInUseUsageDescription and optionally NSLocationAlwaysAndWhenInUseUsageDescription per the Capgo README."
  - question: "How many results can I request?"
    answer: "maxResults between 1 and 5, same as the Cordova plugin documentation."
  - question: "Where are docs?"
    answer: "https://capgo.app/docs/plugins/nativegeocoder/, npm @capgo/capacitor-nativegeocoder, GitHub Cap-go/capacitor-nativegeocoder."
---

The **cordova-plugin-nativegeocoder alternative** for Capacitor is [`@capgo/capacitor-nativegeocoder`](/plugins/capacitor-nativegeocoder/). It keeps the same promise as the Cordova plugin: geocode on device through **Core Location on iOS** and **Android Geocoder**, without routing every lookup through a paid HTTP geocoding bill. Replace callback-style `nativegeocoder.reverseGeocode` with `NativeGeocoder.reverseGeocode()` and use the same option names where they overlap.

## Why leave cordova-plugin-nativegeocoder

`cordova-plugin-nativegeocoder` is at **3.5.1** on npm with `modified` **8 March 2023**. The source repository is [sebastianbaar/cordova-plugin-nativegeocoder](https://github.com/sebastianbaar/cordova-plugin-nativegeocoder). The README still documents `cordova plugin add cordova-plugin-nativegeocoder` and callback signatures with separate latitude and longitude arguments.

Capacitor migrations hit friction because:

- The global `nativegeocoder` object is Cordova-specific.
- Success handlers return field names like `administrativeArea` and `addressLines` that your TypeScript models must mirror manually.
- The plugin does not ship as a Capacitor package on npm.

[`@capgo/capacitor-nativegeocoder`](https://www.npmjs.com/package/@capgo/capacitor-nativegeocoder) targets **Capacitor 8** in the maintained v8 line. It adds a **web** implementation that calls the Google Geocoding API when you supply `apiKey`, while iOS and Android stay on the OS geocoder. Capgo fixes ship in the public repo where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-nativegeocoder
bunx cap sync
```

**Android** (`android/app/src/main/AndroidManifest.xml`):

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

**iOS:** set `NSLocationWhenInUseUsageDescription` in `Info.plist` (and the always string if your flow requires it). iOS geocoding needs network access even though coordinates come from the native APIs.

## Usage example

```ts
import { NativeGeocoder } from '@capgo/capacitor-nativegeocoder';

export async function lookupAddress(lat: number, lng: number) {
  const { addresses } = await NativeGeocoder.reverseGeocode({
    latitude: lat,
    longitude: lng,
    useLocale: true,
    maxResults: 1,
  });

  return addresses[0]?.locality;
}
```

Forward geocode before opening maps navigation:

```ts
const { addresses } = await NativeGeocoder.forwardGeocode({
  addressString: '1 Infinite Loop, Cupertino, CA',
  maxResults: 1,
});
const { latitude, longitude } = addresses[0];
```

Pair with [`@capgo/capacitor-launch-navigator`](/plugins/capacitor-launch-navigator/) which expects coordinate pairs, not free-form addresses.

## Migrating from Cordova to Capacitor

Drop `nativegeocoder.*` callbacks. Pass one options object per call and read `addresses` from the resolved promise.

### API mapping table

| cordova-plugin-nativegeocoder | @capgo/capacitor-nativegeocoder |
| --- | --- |
| `nativegeocoder.reverseGeocode(success, error, lat, lng, options)` | `reverseGeocode({ latitude, longitude, useLocale?, defaultLocale?, maxResults? })` |
| `nativegeocoder.forwardGeocode(success, error, addressString, options)` | `forwardGeocode({ addressString, useLocale?, defaultLocale?, maxResults? })` |
| Success `Array<Result>` | Promise `{ addresses: [...] }` |
| Result `latitude` / `longitude` strings | Same fields on address objects |
| `administrativeArea`, `locality`, `postalCode`, ... | Same placemark style fields in results |
| `addressLines` (Android) | Preserved on Android results per native formatter |
| `options.useLocale` | `useLocale: boolean` |
| `options.defaultLocale` | `defaultLocale: string` |
| `options.maxResults` (1 to 5) | `maxResults` (1 to 5) |
| Cordova install + global | `import { NativeGeocoder } from '@capgo/capacitor-nativegeocoder'` |

Read the Cordova [Known Issues](https://github.com/sebastianbaar/cordova-plugin-nativegeocoder#known-issues) section when you debug locale-specific formatting. Capgo returns the same underlying platform data.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/nativegeocoder/](/docs/plugins/nativegeocoder/)
- Marketing page: [/plugins/capacitor-nativegeocoder/](/plugins/capacitor-nativegeocoder/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-nativegeocoder](https://www.npmjs.com/package/@capgo/capacitor-nativegeocoder)
- GitHub: [https://github.com/Cap-go/capacitor-nativegeocoder/](https://github.com/Cap-go/capacitor-nativegeocoder/)
- Cordova upstream: [https://github.com/sebastianbaar/cordova-plugin-nativegeocoder](https://github.com/sebastianbaar/cordova-plugin-nativegeocoder)

Permission changes require a native build via [Capgo Build](/native-build/). Geocoding UI logic can ship faster with [live updates](/live-update/). Full Cordova exit path: [migrating Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/).