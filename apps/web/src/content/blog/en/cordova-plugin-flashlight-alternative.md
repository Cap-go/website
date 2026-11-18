---
slug: cordova-plugin-flashlight-alternative
title: "cordova-plugin-flashlight Alternative for Capacitor"
description: "cordova-plugin-flashlight alternative for Capacitor: torch on/off, toggle, and intensity with @capgo/capacitor-flash for QR and camera companion apps."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-18T09:00:00.000Z
updated_at: 2026-11-18T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a flashlight plugin guide"
keywords: cordova-plugin-flashlight alternative, capacitor flashlight, @capgo/capacitor-flash, window.plugins.flashlight, torch capacitor
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-flashlight alternative in Capacitor?"
    answer: "@capgo/capacitor-flash exposes isAvailable, switchOn with optional intensity, switchOff, toggle, and isSwitchedOn as typed promises, matching window.plugins.flashlight from cordova-plugin-flashlight."
  - question: "Is cordova-plugin-flashlight still maintained?"
    answer: "npm lists cordova-plugin-flashlight at version 3.2.0. The registry modified timestamp is 14 June 2022. Source: EddyVerbruggen/Flashlight-PhoneGap-Plugin on GitHub."
  - question: "Does intensity work on Android?"
    answer: "The Cordova README states intensity 0.0 to 1.0 affects brightness only on iOS. @capgo/capacitor-flash documents intensity on switchOn; verify behavior on your target Android devices in QA."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/flash/, npm @capgo/capacitor-flash, and GitHub Cap-go/capacitor-flash."
---

The practical **cordova-plugin-flashlight alternative** for a Capacitor app is [`@capgo/capacitor-flash`](/plugins/capacitor-flash/). It maps `window.plugins.flashlight` callbacks to `CapacitorFlash` promises with `isAvailable`, `switchOn`, `switchOff`, `toggle`, and `isSwitchedOn`, which is the same surface area documented in the Cordova README since version 3.2.0. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-flashlight in Capacitor

**cordova-plugin-flashlight** on npm is version **3.2.0**. The registry `modified` timestamp is **14 June 2022**. The npm repository URL points to [EddyVerbruggen/Flashlight-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin).

The README documents `window.plugins.flashlight` with:

- `available(callback)` to learn if the device has a torch
- `switchOn(success, error, { intensity })` with intensity between 0.0 and 1.0 on iOS
- `switchOff(success, error)`
- `toggle(success, error, { intensity })`
- `isSwitchedOn()` returning a boolean (synchronous in Cordova)
- A note that Android may lock the camera if the torch stays on after exit via the back button

In a Capacitor codebase the Cordova plugin still routes through `cordova.exec` with success and error callbacks instead of typed errors.

[`@capgo/capacitor-flash`](https://www.npmjs.com/package/@capgo/capacitor-flash) latest on npm is **8.0.54** with a `modified` date of **13 November 2026**. `src/definitions.ts` documents `isAvailable()`, `switchOn({ intensity })`, `switchOff()`, `toggle()`, and `isSwitchedOn()`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-flash
bunx cap sync
```

No extra native permissions are required beyond what the OS attaches to camera torch access. On Android, turn the torch off when the user leaves the screen so another app can use the camera.

## Usage example

```ts
import { CapacitorFlash } from '@capgo/capacitor-flash';

export async function pulseTorch() {
  const { value: available } = await CapacitorFlash.isAvailable();
  if (!available) {
    throw new Error('Flashlight not available');
  }

  await CapacitorFlash.switchOn({ intensity: 0.5 });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await CapacitorFlash.switchOff();
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
window.plugins.flashlight.available(function (isAvailable) {
  if (!isAvailable) return;
  window.plugins.flashlight.switchOn(
    function () {},
    function () {},
    { intensity: 0.3 },
  );
});
```

```ts
// After (Capacitor)
import { CapacitorFlash } from '@capgo/capacitor-flash';

const { value: available } = await CapacitorFlash.isAvailable();
if (!available) return;
await CapacitorFlash.switchOn({ intensity: 0.3 });
```

```js
// Before (Cordova back button)
document.addEventListener('backbutton', function () {
  window.plugins.flashlight.switchOff(exitApp, exitApp);
}, false);
```

```ts
// After (Capacitor, use App plugin or router guard)
import { App } from '@capacitor/app';

await App.addListener('backButton', async () => {
  await CapacitorFlash.switchOff();
});
```

### API mapping table

| cordova-plugin-flashlight (`window.plugins.flashlight`) | @capgo/capacitor-flash |
| --- | --- |
| `available(callback)` | `isAvailable()` returns `{ value: boolean }` |
| `switchOn(success, error, { intensity })` | `switchOn({ intensity?: number })` |
| `switchOff(success, error)` | `switchOff()` |
| `toggle(success, error, { intensity })` | `toggle()` returns `{ value: boolean }` |
| `isSwitchedOn()` (sync boolean) | `isSwitchedOn()` returns `Promise<{ value: boolean }>` |
| Cordova plugin install | `bun add @capgo/capacitor-flash` plus `bunx cap sync` |
| Not in Cordova | `getPluginVersion()` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/flash/](/docs/plugins/flash/)
- Marketing page: [/plugins/capacitor-flash/](/plugins/capacitor-flash/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-flash](https://www.npmjs.com/package/@capgo/capacitor-flash)
- GitHub: [https://github.com/Cap-go/capacitor-flash/](https://github.com/Cap-go/capacitor-flash/)
- Cordova upstream: [https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin)

Torch control ships in the native binary, so plan a store build after you swap plugins. Use [Capgo Build](/native-build/) for cloud builds, then ship scanner UI with [Capgo live updates](/live-update/) where the logic stays in JavaScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).