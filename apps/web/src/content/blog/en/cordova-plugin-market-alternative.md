---
slug: cordova-plugin-market-alternative
title: "cordova-plugin-market Alternative for Capacitor"
description: "cordova-plugin-market alternative for Capacitor: open Play Store and App Store listings, developer pages, and search with @capgo/capacitor-native-market."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-28T09:00:00.000Z
updated_at: 2026-11-28T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a native market plugin guide"
keywords: cordova-plugin-market alternative, capacitor open app store, @capgo/capacitor-native-market, play store deep link
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-market alternative in Capacitor?"
    answer: "@capgo/capacitor-native-market maps market.open to openStoreListing, adds openDevPage, openCollection, openEditorChoicePage, and search with promises instead of cordova.exec callbacks."
  - question: "Does cordova-plugin-market support Play Store search?"
    answer: "Yes. The Cordova module exposes market.search(key). Capgo adds NativeMarket.search on Android only with typed options."
  - question: "Is cordova-plugin-market still maintained?"
    answer: "npm lists cordova-plugin-market at version 1.2.0. The last version publish on the registry timeline is 31 August 2017. Source: xmartlabs/cordova-plugin-market on GitHub."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/native-market/, npm @capgo/capacitor-native-market, and GitHub Cap-go/capacitor-native-market."
---

The practical **cordova-plugin-market alternative** for a Capacitor app is [`@capgo/capacitor-native-market`](/plugins/capacitor-native-market/). It replaces the global `market` object and `cordova.exec` callbacks with `NativeMarket` promises, keeps `open` and `search` behavior, and adds Play Store developer pages, collections, and editor choice deep links on Android. This guide lists npm facts, install steps, usage, and a Cordova to Capacitor API map.

## Why leave cordova-plugin-market in Capacitor

**cordova-plugin-market** on npm is version **1.2.0**. The last numbered release on the npm `time` object is **31 August 2017**. The registry `modified` timestamp is **14 June 2022** (metadata only, not a new plugin version). The npm repository URL points to [xmartlabs/cordova-plugin-market](https://github.com/xmartlabs/cordova-plugin-market).

The published `www/market.js` module exposes:

- `market.open(appId, callbackContext)` to open a store listing
- `market.search(key, callbackContext)` to search the store (Android behavior in the native implementation)

Both calls route through `cordova.exec` with optional success and error callbacks on `callbackContext`. There is no typed promise surface and no extra Play Store marketing URLs beyond open and search.

[`@capgo/capacitor-native-market`](https://www.npmjs.com/package/@capgo/capacitor-native-market) latest on npm is **8.0.60** with a `modified` date of **13 November 2026**. `src/definitions.ts` documents `openStoreListing`, `openDevPage`, `openCollection`, `openEditorChoicePage`, `search`, and `getPluginVersion`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

The command below installs the npm **8.x** line for **Capacitor 8** (`@capacitor/core` >= 8). Capgo plugin majors track Capacitor majors. On Capacitor 7, install the matching **7.x** release instead (see the plugin README).

```bash
bun add @capgo/capacitor-native-market
bunx cap sync
```

Use the bundle identifier on iOS and the application id on Android when opening your own listing. See the [native market plugin docs](/docs/plugins/native-market/).

## Usage example

```ts
import { Capacitor } from '@capacitor/core';
import { NativeMarket } from '@capgo/capacitor-native-market';

export async function openOurStorePage() {
  await NativeMarket.openStoreListing({ appId: 'app.capgo.demo' });
}

export async function findSimilarApps() {
  if (Capacitor.getPlatform() !== 'android') return;
  await NativeMarket.search({ terms: 'capacitor plugins' });
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
market.open('com.example.app', {
  success: () => console.log('opened'),
  error: (err) => console.error(err),
});
market.search('photo editor', { success: () => {} });
```

```ts
// After (Capacitor)
import { Capacitor } from '@capacitor/core';
import { NativeMarket } from '@capgo/capacitor-native-market';

await NativeMarket.openStoreListing({ appId: 'com.example.app' });

if (Capacitor.getPlatform() === 'android') {
  await NativeMarket.search({ terms: 'photo editor' });
}
```

### API mapping table

| cordova-plugin-market (`market` global) | @capgo/capacitor-native-market |
| --- | --- |
| `open(appId, callbackContext)` | `openStoreListing({ appId, country? })` |
| `search(key, callbackContext)` | `search({ terms })` (Android only) |
| `callbackContext.success` / `error` | Promise resolve / reject |
| Not in Cordova | `openDevPage({ devId })` (Android only) |
| Not in Cordova | `openCollection({ name })` (Android only) |
| Not in Cordova | `openEditorChoicePage({ editorChoice })` (Android only) |
| Not in Cordova | `getPluginVersion()` |
| Cordova plugin install | `bun add @capgo/capacitor-native-market` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/native-market/](/docs/plugins/native-market/)
- Marketing page: [/plugins/capacitor-native-market/](/plugins/capacitor-native-market/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-native-market](https://www.npmjs.com/package/@capgo/capacitor-native-market)
- GitHub: [https://github.com/Cap-go/capacitor-native-market/](https://github.com/Cap-go/capacitor-native-market/)
- Cordova upstream: [https://github.com/xmartlabs/cordova-plugin-market](https://github.com/xmartlabs/cordova-plugin-market)

Store deep links ship in the native binary. Use [Capgo Build](/native-build/) for releases, then adjust call-to-action copy with [Capgo live updates](/live-update/) where allowed. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).