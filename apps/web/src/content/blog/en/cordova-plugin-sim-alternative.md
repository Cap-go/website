---
slug: cordova-plugin-sim-alternative
title: "cordova-plugin-sim Alternative for Capacitor"
description: "cordova-plugin-sim alternative for Capacitor: read carrier, MCC, MNC and dual-SIM data with @capgo/capacitor-sim and Capacitor permission helpers."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-27T09:00:00.000Z
updated_at: 2026-11-27T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a SIM card information plugin guide"
keywords: cordova-plugin-sim alternative, capacitor sim card, @capgo/capacitor-sim, READ_PHONE_STATE
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-sim alternative in Capacitor?"
    answer: "@capgo/capacitor-sim maps getSimInfo to getSimCards with a typed SimCard array, adds checkPermissions and requestPermissions, and documents iOS placeholder values on recent iOS versions."
  - question: "Does cordova-plugin-sim support dual SIM?"
    answer: "Cordova returns one object from getSimInfo; extended multi-SIM fields need Android READ_PHONE_STATE and newer TelephonyManager APIs. Capgo returns simCards[] so dual-SIM devices surface one entry per subscription."
  - question: "Is cordova-plugin-sim still maintained?"
    answer: "npm lists cordova-plugin-sim at version 1.3.3. The last version publish on the registry timeline is 4 January 2017. Source: pbakondy/cordova-plugin-sim on GitHub."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/sim/, npm @capgo/capacitor-sim, and GitHub Cap-go/capacitor-sim."
---

The practical **cordova-plugin-sim alternative** for a Capacitor app is [`@capgo/capacitor-sim`](/plugins/capacitor-sim/). It replaces `window.plugins.sim.getSimInfo` callbacks with `Sim.getSimCards()`, returns one `SimCard` per subscription on dual-SIM Android phones, and uses Capacitor permission APIs instead of Cordova-only permission shims. This guide lists npm facts, install steps, usage, field mapping, and migration examples.

## Why leave cordova-plugin-sim in Capacitor

**cordova-plugin-sim** on npm is version **1.3.3**. The last numbered release on the npm `time` object is **4 January 2017**. The registry `modified` timestamp is **7 November 2023** (metadata only, not a new plugin version). The npm repository URL points to [pbakondy/cordova-plugin-sim](https://github.com/pbakondy/cordova-plugin-sim).

The JavaScript bridge in `www/sim.js` exposes:

- `getSimInfo(success, error)` returning one object with `carrierName`, `countryCode`, `mcc`, and `mnc`
- On Android, `hasReadPermission` and `requestReadPermission` live in `www/android/sim.js`

Extra Android fields such as phone number and a `cards` array require `READ_PHONE_STATE` and are documented in the upstream README, but the core Cordova API is still callback based.

[`@capgo/capacitor-sim`](https://www.npmjs.com/package/@capgo/capacitor-sim) latest on npm is **8.0.55** with a `modified` date of **13 November 2026**. `src/definitions.ts` documents `getSimCards`, `checkPermissions`, `requestPermissions`, and optional Android-only `number`, `subscriptionId`, and `simSlotIndex`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

The command below installs the npm **8.x** line for **Capacitor 8** (`@capacitor/core` >= 8). Capgo plugin majors track Capacitor majors. On Capacitor 7, install the matching **7.x** release instead (see the plugin README).

```bash
bun add @capgo/capacitor-sim
bunx cap sync
```

On Android 6+, declare `READ_PHONE_STATE` in the manifest and call `requestPermissions()` before reading SIM data. iOS does not prompt; carrier fields can be placeholders on iOS 16.4+ (see Capgo `definitions.ts` and upstream iOS discussion).

## Usage example

```ts
import { Sim } from '@capgo/capacitor-sim';

export async function logCarrierInfo() {
  const status = await Sim.checkPermissions();
  if (status.readSimCard !== 'granted') {
    const requested = await Sim.requestPermissions();
    if (requested.readSimCard !== 'granted') return;
  }

  const { simCards } = await Sim.getSimCards();
  for (const sim of simCards) {
    console.log(sim.carrierName, sim.isoCountryCode, sim.mobileCountryCode, sim.mobileNetworkCode);
  }
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
window.plugins.sim.getSimInfo(
  (info) => console.log(info.carrierName, info.mcc, info.mnc),
  (err) => console.error(err),
);
```

```ts
// After (Capacitor)
import { Sim } from '@capgo/capacitor-sim';

const { simCards } = await Sim.getSimCards();
if (simCards.length === 0) return;
const primary = simCards[0];
console.log(primary.carrierName, primary.mobileCountryCode, primary.mobileNetworkCode);
```

```js
// Before (Cordova Android permissions)
window.plugins.sim.requestReadPermission(success, error);
```

```ts
// After (Capacitor)
await Sim.requestPermissions();
```

### API mapping table

| cordova-plugin-sim (`window.plugins.sim`) | @capgo/capacitor-sim |
| --- | --- |
| `getSimInfo(success, error)` | `getSimCards()` returns `{ simCards: SimCard[] }` |
| `info.carrierName` | `sim.carrierName` |
| `info.countryCode` | `sim.isoCountryCode` |
| `info.mcc` | `sim.mobileCountryCode` |
| `info.mnc` | `sim.mobileNetworkCode` |
| `info.allowsVOIP` (iOS, Cordova README) | `sim.allowsVOIP` |
| Android `hasReadPermission` | `checkPermissions()` returns `{ readSimCard }` |
| Android `requestReadPermission` | `requestPermissions()` |
| Single SIM object | `simCards[0]` or iterate all slots |
| `info.cards[]` (Android, `READ_PHONE_STATE`) | `{ simCards }` array |
| `info.phoneNumber` or `cards[].phoneNumber` (Android, README) | `sim.number` |
| `cards[].subscriptionId` (Android, README) | `sim.subscriptionId` |
| `cards[].simSlotIndex` (Android, README) | `sim.simSlotIndex` |
| Not in Cordova | `getPluginVersion()` |
| Cordova plugin install | `bun add @capgo/capacitor-sim` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/sim/](/docs/plugins/sim/)
- Marketing page: [/plugins/capacitor-sim/](/plugins/capacitor-sim/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-sim](https://www.npmjs.com/package/@capgo/capacitor-sim)
- GitHub: [https://github.com/Cap-go/capacitor-sim/](https://github.com/Cap-go/capacitor-sim/)
- Cordova upstream: [https://github.com/pbakondy/cordova-plugin-sim](https://github.com/pbakondy/cordova-plugin-sim)

SIM reads use platform telephony APIs in the native binary. Use [Capgo Build](/native-build/) for store builds, then ship permission UX tweaks with [Capgo live updates](/live-update/) where allowed. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).