---
slug: cordova-plugin-insomnia-alternative
title: "cordova-plugin-insomnia Alternative for Capacitor"
description: "cordova-plugin-insomnia alternative for Capacitor: prevent screen sleep during navigation or kiosks with @capgo/capacitor-keep-awake."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-19T09:00:00.000Z
updated_at: 2026-11-19T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a keep awake plugin guide"
keywords: cordova-plugin-insomnia alternative, capacitor keep awake, @capgo/capacitor-keep-awake, window.plugins.insomnia
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-insomnia alternative in Capacitor?"
    answer: "@capgo/capacitor-keep-awake maps window.plugins.insomnia keepAwake and allowSleepAgain to keepAwake and allowSleep promises and adds isKeptAwake and isSupported."
  - question: "Is cordova-plugin-insomnia still maintained?"
    answer: "npm lists cordova-plugin-insomnia at version 4.3.0 with a registry modified date of 14 June 2022. Source: EddyVerbruggen/Insomnia-PhoneGap-Plugin on GitHub."
  - question: "Should I remove the wake lock on route change?"
    answer: "Yes. Call allowSleep when the user leaves a screen that called keepAwake, including before backgrounding, so the OS can dim again and battery tests stay predictable."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/keep-awake/, npm @capgo/capacitor-keep-awake, and GitHub Cap-go/capacitor-keep-awake."
---

The practical **cordova-plugin-insomnia alternative** for a Capacitor app is [`@capgo/capacitor-keep-awake`](/plugins/capacitor-keep-awake/). It maps `window.plugins.insomnia` `keepAwake` and `allowSleepAgain` callbacks to `KeepAwake` promises, adds `isKeptAwake` and `isSupported`, and drops the Cordova exec bridge. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-insomnia in Capacitor

**cordova-plugin-insomnia** on npm is version **4.3.0**. The registry `modified` timestamp is **14 June 2022**. The npm repository URL points to [EddyVerbruggen/Insomnia-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin).

The README and `www/Insomnia.js` document `window.plugins.insomnia` with:

- `keepAwake(successCallback, errorCallback)`
- `allowSleepAgain(successCallback, errorCallback)`

In a Capacitor codebase the Cordova plugin still waits for `deviceready` and uses success or error callbacks with no typed status helpers.

[`@capgo/capacitor-keep-awake`](https://www.npmjs.com/package/@capgo/capacitor-keep-awake) latest on npm is **8.1.22** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `keepAwake()`, `allowSleep()`, `isKeptAwake()`, and `isSupported()`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-keep-awake
bunx cap sync
```

No manifest entries are required beyond what Capacitor already declares for wake lock on each platform.

## Usage example

```ts
import { KeepAwake } from '@capgo/capacitor-keep-awake';

export async function startGuidedWalkthrough() {
  const { isSupported } = await KeepAwake.isSupported();
  if (!isSupported) return;

  await KeepAwake.keepAwake();
  const { isKeptAwake } = await KeepAwake.isKeptAwake();
  console.log('screen held awake', isKeptAwake);
}

export async function endGuidedWalkthrough() {
  await KeepAwake.allowSleep();
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
window.plugins.insomnia.keepAwake(
  function () {
    console.log('awake');
  },
  function (err) {
    console.error(err);
  },
);
```

```ts
// After (Capacitor)
import { KeepAwake } from '@capgo/capacitor-keep-awake';

await KeepAwake.keepAwake();
console.log('awake');
```

```js
// Before (Cordova)
window.plugins.insomnia.allowSleepAgain(success, error);
```

```ts
// After (Capacitor)
await KeepAwake.allowSleep();
```

### API mapping table

| cordova-plugin-insomnia (`window.plugins.insomnia`) | @capgo/capacitor-keep-awake |
| --- | --- |
| `keepAwake(success, error)` | `keepAwake()` |
| `allowSleepAgain(success, error)` | `allowSleep()` |
| Not in Cordova www | `isKeptAwake()` returns `{ isKeptAwake }` |
| Not in Cordova www | `isSupported()` returns `{ isSupported }` |
| `cordova.plugins.brightness.setKeepScreenOn` | Also maps here; see [cordova-plugin-brightness alternative](/blog/cordova-plugin-brightness-alternative/) |
| Cordova plugin install | `bun add @capgo/capacitor-keep-awake` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/keep-awake/](/docs/plugins/keep-awake/)
- Marketing page: [/plugins/capacitor-keep-awake/](/plugins/capacitor-keep-awake/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-keep-awake](https://www.npmjs.com/package/@capgo/capacitor-keep-awake)
- GitHub: [https://github.com/Cap-go/capacitor-keep-awake/](https://github.com/Cap-go/capacitor-keep-awake/)
- Cordova upstream: [https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin)

Wake lock calls ship in the native binary. Use [Capgo Build](/native-build/) for store builds. After release, regression test kiosk and navigation flows that toggle awake state, including backgrounding, using the [checklist for validating Capacitor app updates](https://capgo.app/blog/checklist-for-validating-capacitor-app-updates/). UI-only timing changes can ship with [Capgo live updates](/live-update/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).