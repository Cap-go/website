---
slug: cordova-plugin-tracking-transparency-alternative
title: "cordova-plugin-tracking-transparency Alternative for Capacitor"
description: "cordova-plugin-tracking-transparency alternative for Capacitor: request and read iOS App Tracking Transparency status with @capgo/capacitor-app-tracking-transparency."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-28T09:00:00.000Z
updated_at: 2026-11-28T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an App Tracking Transparency plugin guide"
keywords: cordova-plugin-tracking-transparency alternative, capacitor ATT, @capgo/capacitor-app-tracking-transparency, IDFA iOS
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-tracking-transparency alternative in Capacitor?"
    answer: "@capgo/capacitor-app-tracking-transparency maps ImpacTracking requestTracking to requestPermission and adds getStatus with authorized, denied, restricted, and notDetermined values."
  - question: "Does this work on Android?"
    answer: "No. App Tracking Transparency is iOS only in both the Cordova plugin and the Capgo Capacitor port."
  - question: "Is cordova-plugin-tracking-transparency still maintained?"
    answer: "npm lists cordova-plugin-tracking-transparency at version 1.0.4. The last version publish on the registry timeline is 11 June 2021. Source: ImpacGroup/Cordova-Plugin-Tracking-Transparency on GitHub."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/app-tracking-transparency/, npm @capgo/capacitor-app-tracking-transparency, and GitHub Cap-go/capacitor-app-tracking-transparency."
---

The practical **cordova-plugin-tracking-transparency alternative** for a Capacitor app is [`@capgo/capacitor-app-tracking-transparency`](/plugins/capacitor-app-tracking-transparency/). It replaces `window.plugins.impacTracking` callbacks with `AppTrackingTransparency.getStatus()` and `requestPermission()` on iOS, returns typed status strings, and fits Capacitor permission flows before you enable ad or attribution SDKs. This guide lists npm facts, install steps, usage, and a Cordova to Capacitor API map.

## Why leave cordova-plugin-tracking-transparency in Capacitor

**cordova-plugin-tracking-transparency** on npm is version **1.0.4**. The last numbered release on the npm `time` object is **11 June 2021**. The registry `modified` timestamp is **27 April 2022** (metadata only, not a new plugin version). The npm repository URL points to [ImpacGroup/Cordova-Plugin-Tracking-Transparency](https://github.com/ImpacGroup/Cordova-Plugin-Tracking-Transparency).

The published `www/tracking.js` bridge registers `window.plugins.impacTracking` with:

- `canRequestTracking(successCallback)`
- `trackingAvailable(successCallback)`
- `requestTracking(info, successCallback, errorCallback)`

All three use `cordova.exec` without promises. The Cordova plugin targets iOS 14.5+ for the ATT framework.

[`@capgo/capacitor-app-tracking-transparency`](https://www.npmjs.com/package/@capgo/capacitor-app-tracking-transparency) latest on npm is **8.1.23** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `getStatus()`, `requestPermission()`, and `getPluginVersion()` with `authorized`, `denied`, `restricted`, and `notDetermined` status values. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

The command below installs the npm **8.x** line for **Capacitor 8** (`@capacitor/core` >= 8). Capgo plugin majors track Capacitor majors. On Capacitor 7, install the matching **7.x** release instead (see the plugin README).

```bash
bun add @capgo/capacitor-app-tracking-transparency
bunx cap sync
```

Add `NSUserTrackingUsageDescription` to `Info.plist` before calling `requestPermission()`. See the [App Tracking Transparency plugin docs](/docs/plugins/app-tracking-transparency/).

## Usage example

```ts
import { Capacitor } from '@capacitor/core';
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

export async function ensureTrackingConsent() {
  if (Capacitor.getPlatform() !== 'ios') return 'unavailable';

  const { status: current } = await AppTrackingTransparency.getStatus();
  if (current === 'authorized') return current;
  if (current !== 'notDetermined') return current;

  const { status } = await AppTrackingTransparency.requestPermission();
  return status;
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
window.plugins.impacTracking.canRequestTracking((can) => {
  if (can) {
    window.plugins.impacTracking.requestTracking(
      {},
      (result) => console.log(result),
      (err) => console.error(err),
    );
  }
});
```

```ts
// After (Capacitor)
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

const { status } = await AppTrackingTransparency.getStatus();
if (status === 'notDetermined') {
  await AppTrackingTransparency.requestPermission();
}
```

### API mapping table

| cordova-plugin-tracking-transparency (`window.plugins.impacTracking`) | @capgo/capacitor-app-tracking-transparency |
| --- | --- |
| `canRequestTracking(success)` | `getStatus()` then check `status === 'notDetermined'` |
| `trackingAvailable(success)` | `getStatus()`; compare to `authorized` before enabling trackers |
| `requestTracking(info, success, error)` | `requestPermission()` returns `{ status }` |
| Callback result payloads | `authorized`, `denied`, `restricted`, `notDetermined` |
| `cordova.addConstructor` install | Standard Capacitor import |
| Not in Cordova | `getPluginVersion()` |
| Cordova plugin install | `bun add @capgo/capacitor-app-tracking-transparency` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/app-tracking-transparency/](/docs/plugins/app-tracking-transparency/)
- Marketing page: [/plugins/capacitor-app-tracking-transparency/](/plugins/capacitor-app-tracking-transparency/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-app-tracking-transparency](https://www.npmjs.com/package/@capgo/capacitor-app-tracking-transparency)
- GitHub: [https://github.com/Cap-go/capacitor-app-tracking-transparency/](https://github.com/Cap-go/capacitor-app-tracking-transparency/)
- Cordova upstream: [https://github.com/ImpacGroup/Cordova-Plugin-Tracking-Transparency](https://github.com/ImpacGroup/Cordova-Plugin-Tracking-Transparency)

ATT strings ship in the native binary. Use [Capgo Build](/native-build/) for App Store releases, then adjust consent gating in [Capgo live updates](/live-update/) where JavaScript alone can change flows. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).