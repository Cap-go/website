---
slug: cordova-plugin-brightness-alternative
title: "cordova-plugin-brightness Alternative for Capacitor"
description: "cordova-plugin-brightness alternative for Capacitor: get and set screen brightness with @capgo/capacitor-brightness and Android system controls."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-19T09:00:00.000Z
updated_at: 2026-11-19T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a screen brightness plugin guide"
keywords: cordova-plugin-brightness alternative, capacitor brightness, @capgo/capacitor-brightness, cordova.plugins.brightness
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-brightness alternative in Capacitor?"
    answer: "@capgo/capacitor-brightness maps cordova.plugins.brightness setBrightness and getBrightness to typed promises and adds Android system brightness, brightness mode, and WRITE_SETTINGS permission helpers."
  - question: "Does cordova-plugin-brightness handle keep awake?"
    answer: "Yes. cordova.plugins.brightness setKeepScreenOn lives in the same Cordova package. In Capacitor use @capgo/capacitor-keep-awake for wake lock, not the brightness plugin."
  - question: "Is cordova-plugin-brightness still maintained?"
    answer: "npm lists cordova-plugin-brightness at version 0.2.0 with a registry modified date of 13 June 2022. Source: mgcrea/cordova-plugin-brightness on GitHub."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/brightness/, npm @capgo/capacitor-brightness, and GitHub Cap-go/capacitor-brightness."
---

The practical **cordova-plugin-brightness alternative** for a Capacitor app is [`@capgo/capacitor-brightness`](/plugins/capacitor-brightness/). It replaces `cordova.plugins.brightness` callbacks with `CapgoBrightness` promises for values from 0 to 1, documents iOS and Android behavior in `definitions.ts`, and exposes Android system brightness APIs that the Cordova plugin never shipped. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-brightness in Capacitor

**cordova-plugin-brightness** on npm is version **0.2.0**. The registry `modified` timestamp is **13 June 2022**. The npm repository URL points to [mgcrea/cordova-plugin-brightness](https://github.com/mgcrea/cordova-plugin-brightness).

The `www/brightness.js` bridge exposes `cordova.plugins.brightness` with:

- `setBrightness(value, success, error)` with float **0 to 1**
- `getBrightness(success, error)` where success may return **-1** for system default
- `setKeepScreenOn(value, success, error)` on the same plugin object

In a Capacitor codebase the Cordova module still routes through `cordova.exec` and bundles screen wake with brightness even when you only need one concern.

[`@capgo/capacitor-brightness`](https://www.npmjs.com/package/@capgo/capacitor-brightness) latest on npm is **8.0.26** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `getBrightness`, `setBrightness`, `getSystemBrightness`, `setSystemBrightness`, `getSystemBrightnessMode`, `setSystemBrightnessMode`, `restoreSystemBrightness`, and `requestPermissions` for Android `WRITE_SETTINGS`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-brightness
bunx cap sync
```

On Android, `setSystemBrightness` needs the user to grant modify system settings. Call `requestPermissions()` and handle `denied` before you change system wide brightness.

## Usage example

```ts
import { CapgoBrightness } from '@capgo/capacitor-brightness';

export async function dimForNightMode() {
  const { brightness } = await CapgoBrightness.getBrightness();
  console.log('current', brightness);
  await CapgoBrightness.setBrightness({ brightness: 0.2 });
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
var brightness = cordova.plugins.brightness;
brightness.setBrightness(0.75, success, error);
brightness.getBrightness(success, error);
```

```ts
// After (Capacitor)
import { CapgoBrightness } from '@capgo/capacitor-brightness';

await CapgoBrightness.setBrightness({ brightness: 0.75 });
const { brightness } = await CapgoBrightness.getBrightness();
console.log(brightness);
```

```js
// Before (Cordova wake lock on brightness plugin)
cordova.plugins.brightness.setKeepScreenOn(true, success, error);
```

```ts
// After (Capacitor, dedicated plugin)
import { KeepAwake } from '@capgo/capacitor-keep-awake';

await KeepAwake.keepAwake();
```

### API mapping table

| cordova-plugin-brightness (`cordova.plugins.brightness`) | @capgo/capacitor-brightness |
| --- | --- |
| `setBrightness(value, success, error)` | `setBrightness({ brightness: value })` with **0 to 1** |
| `getBrightness(success, error)` | `getBrightness()` returns `{ brightness }` (no **-1** sentinel; use `restoreSystemBrightness` on Android) |
| `setKeepScreenOn(true, ...)` | Use [@capgo/capacitor-keep-awake](/plugins/capacitor-keep-awake/) `keepAwake()` |
| Not in Cordova | `getSystemBrightness`, `setSystemBrightness`, `getSystemBrightnessMode`, `setSystemBrightnessMode` |
| Not in Cordova | `isUsingSystemBrightness`, `restoreSystemBrightness`, `checkPermissions`, `requestPermissions` |
| Cordova plugin install | `bun add @capgo/capacitor-brightness` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/brightness/](/docs/plugins/brightness/)
- Marketing page: [/plugins/capacitor-brightness/](/plugins/capacitor-brightness/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-brightness](https://www.npmjs.com/package/@capgo/capacitor-brightness)
- GitHub: [https://github.com/Cap-go/capacitor-brightness/](https://github.com/Cap-go/capacitor-brightness/)
- Cordova upstream: [https://github.com/mgcrea/cordova-plugin-brightness](https://github.com/mgcrea/cordova-plugin-brightness)
- Keep awake: [/plugins/capacitor-keep-awake/](/plugins/capacitor-keep-awake/) and [keep awake plugin docs](/docs/plugins/keep-awake/)

Brightness changes ship in the native binary. Use [Capgo Build](/native-build/) for store builds, then tune reader or kiosk screens with [Capgo live updates](/live-update/) where the logic stays in JavaScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).