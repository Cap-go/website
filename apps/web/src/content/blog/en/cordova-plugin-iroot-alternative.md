---
slug: cordova-plugin-iroot-alternative
title: "cordova-plugin-iroot Alternative for Capacitor"
description: "cordova-plugin-iroot alternative for Capacitor: detect rooted Android and jailbroken iOS with @capgo/capacitor-is-root, granular RootBeer checks, and promise APIs."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-15T09:00:00.000Z
updated_at: 2026-11-15T13:07:38.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a root detection plugin guide"
keywords: cordova-plugin-iroot alternative, capacitor root detection, jailbreak detection capacitor, @capgo/capacitor-is-root, IRoot cordova
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-iroot alternative in Capacitor?"
    answer: "@capgo/capacitor-is-root exposes isRooted(), isRootedWithBusyBox(), and dozens of Android RootBeer checks with Capacitor promises instead of IRoot callback APIs."
  - question: "Is cordova-plugin-iroot still maintained?"
    answer: "npm lists cordova-plugin-iroot at version 3.2.1 with a registry modified date of 21 October 2025. The upstream repo is WuglyakBolgoink/cordova-plugin-iroot."
  - question: "Does @capgo/capacitor-is-root work on the iOS simulator?"
    answer: "The README states the simulator always reports not jailbroken for isRooted(). Test jailbreak logic on a physical device."
  - question: "What iOS setup does Cordova require?"
    answer: "The cordova-plugin-iroot README requires adding cydia to LSApplicationQueriesSchemes in Info.plist so canOpenURL checks work."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/is-root/, npm @capgo/capacitor-is-root, and GitHub Cap-go/capacitor-is-root."
---

The practical **cordova-plugin-iroot alternative** for a Capacitor app is [`@capgo/capacitor-is-root`](/plugins/capacitor-is-root/). It replaces the Cordova `IRoot` callbacks with promise-based `IsRoot` calls, keeps the same high level `isRooted()` and `isRootedWithBusyBox()` entry points, and adds granular Android RootBeer checks plus optional emulator signals the Cordova plugin never documented. This guide covers verifiable npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-iroot in Capacitor

**cordova-plugin-iroot** on npm is version **3.2.1**. The registry `modified` timestamp is **21 October 2025** (version **3.2.1** shipped **21 October 2025**, and **3.2.0** on **10 October 2025**). The source lives at [WuglyakBolgoink/cordova-plugin-iroot](https://github.com/WuglyakBolgoink/cordova-plugin-iroot). The README documents only two JavaScript calls:

- `IRoot.isRooted(successCallback, failureCallback)` on iOS and Android
- `IRoot.isRootedWithBusyBox(successCallback, failureCallback)` on Android

The README credits RootBeer and Shmoopi Anti-Piracy style checks for Android and jailbreak heuristics for iOS, and it requires `cydia` in `LSApplicationQueriesSchemes` on iOS.

In a Capacitor codebase the Cordova plugin still means:

- `cordova plugin add cordova-plugin-iroot` and the global `IRoot` namespace
- success and failure callbacks instead of `async`/`await`
- no typed surface for per-check Android tuning

[`@capgo/capacitor-is-root`](https://www.npmjs.com/package/@capgo/capacitor-is-root) latest on npm is **8.2.8** with a `modified` date of **12 November 2026**. The README targets Capacitor 8, documents `isRooted()`, BusyBox variants, RootBeer helpers, and emulator helpers on Android. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-is-root
bunx cap sync
```

**iOS:** if you rely on `cydia://` style jailbreak detection, keep `cydia` under `LSApplicationQueriesSchemes` in `Info.plist`, as the Cordova README describes. The Capgo README lists the iOS signals `isRooted()` runs on device.

**Android:** no extra manifest entries are required for the default checks. Call granular helpers only when your risk model needs them.

## Usage example

```ts
import { IsRoot } from '@capgo/capacitor-is-root';

export async function enforceDeviceTrust() {
  const { result } = await IsRoot.isRooted();
  if (result) {
    showRootedDeviceWarning();
    return;
  }

  // Optional deeper audit on Android
  const { result: suBinary } = await IsRoot.checkForSuBinary();
  if (suBinary) {
    showRootedDeviceWarning();
  }
}
```

For BusyBox aware detection on Android, use `IsRoot.isRootedWithBusyBox()` the same way you used `IRoot.isRootedWithBusyBox`.

## Migrating from Cordova to Capacitor

Cordova code calls `IRoot.isRooted(onSuccess, onError)` and reads a boolean in the success callback. Capacitor code awaits `IsRoot.isRooted()` and reads `{ result: boolean }`.

```js
// Before (Cordova)
IRoot.isRooted(
  (isRooted) => {
    if (isRooted) blockLogin();
  },
  (err) => console.error(err),
);
```

```ts
// After (Capacitor)
import { IsRoot } from '@capgo/capacitor-is-root';

const { result } = await IsRoot.isRooted();
if (result) blockLogin();
```

### API mapping table

| cordova-plugin-iroot (`IRoot`) | @capgo/capacitor-is-root |
| --- | --- |
| `isRooted(success, failure)` | `isRooted()` returns `{ result: boolean }` |
| `isRootedWithBusyBox(success, failure)` (Android) | `isRootedWithBusyBox()` returns `{ result: boolean }` |
| No per-check APIs in README | `checkForSuBinary()`, `detectRootManagementApps()`, `detectPotentiallyDangerousApps()`, `checkForRootNative()`, and other Android helpers in [plugin docs](/docs/plugins/is-root/) |
| Callback error string | Promise rejection from Capacitor |
| Cordova plugin install | `bun add @capgo/capacitor-is-root` plus `bunx cap sync` |

Capgo adds Android-only emulator helpers such as `isRunningOnEmulator()` and scored variants like `isRootedWithEmulator()` that have no equivalent in the Cordova README. Map them when policy must treat emulators differently from rooted hardware.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/is-root/](/docs/plugins/is-root/)
- Marketing page: [/plugins/capacitor-is-root/](/plugins/capacitor-is-root/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-is-root](https://www.npmjs.com/package/@capgo/capacitor-is-root)
- GitHub: [https://github.com/Cap-go/capacitor-is-root/](https://github.com/Cap-go/capacitor-is-root/)
- Cordova upstream: [https://github.com/WuglyakBolgoink/cordova-plugin-iroot](https://github.com/WuglyakBolgoink/cordova-plugin-iroot)

Root checks ship inside a native binary, so plan a store build after you swap plugins. Use [Capgo Build](/native-build/) for cloud builds, then ship detection tuning with [Capgo live updates](/live-update/) only where logic stays in JavaScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).