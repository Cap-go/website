---
slug: cordova-launch-review-alternative
title: "cordova-launch-review Alternative for Capacitor"
description: "cordova-launch-review alternative for Capacitor: in-app store rating prompts and review pages with @capgo/capacitor-in-app-review."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-28T09:00:00.000Z
updated_at: 2026-11-28T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an in-app review plugin guide"
keywords: cordova-launch-review alternative, capacitor in app review, @capgo/capacitor-in-app-review, SKStoreReviewController
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-launch-review alternative in Capacitor?"
    answer: "@capgo/capacitor-in-app-review maps LaunchReview.rating to requestReview with native SKStoreReviewController on iOS and Play In-App Review on Android."
  - question: "Does cordova-launch-review still open the write-review URL?"
    answer: "Cordova exposes LaunchReview.launch for the App Store write-review page. Capgo focuses on the native in-app prompt via requestReview. Deep links to store review pages can use NativeMarket or platform URLs."
  - question: "Is cordova-launch-review still maintained?"
    answer: "npm lists cordova-launch-review at version 4.2.0 with a last version publish on 22 April 2026. Source: dpa99c/cordova-launch-review on GitHub."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/in-app-review/, npm @capgo/capacitor-in-app-review, and GitHub Cap-go/capacitor-in-app-review."
---

The practical **cordova-launch-review alternative** for a Capacitor app is [`@capgo/capacitor-in-app-review`](/plugins/capacitor-in-app-review/). It replaces `LaunchReview.rating` callbacks with `CapgoInAppReview.requestReview()`, uses the same native store review APIs Apple and Google document, and drops the Cordova `isRatingSupported` and `launch` wiring when you only need the in-app prompt. This guide lists npm facts, install steps, usage, and a Cordova to Capacitor API map.

## Why leave cordova-launch-review in Capacitor

**cordova-launch-review** on npm is version **4.2.0**. The last numbered release on the npm `time` object is **22 April 2026**. The npm repository URL points to [dpa99c/cordova-launch-review](https://github.com/dpa99c/cordova-launch-review).

The published `www/LaunchReview.js` module exposes:

- `isRatingSupported()` to gate iOS 10.3+ before calling rating
- `rating(successCallback, errorCallback)` for the in-app dialog or Play review flow
- `launch(appId?, successCallback, errorCallback)` to open the write-review store page

`rating` uses `cordova.exec` and returns status strings such as `requested`. The README warns that `shown` and `dismissed` callbacks are unreliable. `launch` supports the legacy signature without `appId`.

[`@capgo/capacitor-in-app-review`](https://www.npmjs.com/package/@capgo/capacitor-in-app-review) latest on npm is **8.2.11** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `requestReview()` and notes that the dialog may not appear every call under Apple and Google quotas. The promise still resolves when the flow finishes. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

The command below installs the npm **8.x** line for **Capacitor 8** (`@capacitor/core` >= 8). Capgo plugin majors track Capacitor majors. On Capacitor 7, install the matching **7.x** release instead (see the plugin README).

```bash
bun add @capgo/capacitor-in-app-review
bunx cap sync
```

Call `requestReview()` after meaningful success, not on a button labeled Rate us. After you ship review timing in JavaScript, validate store behavior with the [checklist for validating Capacitor app updates](https://capgo.app/blog/checklist-for-validating-capacitor-app-updates/).

## Usage example

```ts
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

export async function maybeAskForReview(completedSessions: number) {
  if (completedSessions < 5) return;
  await CapgoInAppReview.requestReview();
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
if (LaunchReview.isRatingSupported()) {
  LaunchReview.rating(
    (status) => console.log(status),
    (err) => console.error(err),
  );
}
```

```ts
// After (Capacitor)
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

await CapgoInAppReview.requestReview();
```

```js
// Before (Cordova) write-review page
LaunchReview.launch(appStoreId, onSuccess, onError);
```

```ts
// After (Capacitor) in-app prompt only
await CapgoInAppReview.requestReview();
// For a store write-review URL, open a trusted https link or NativeMarket instead.
```

### API mapping table

| cordova-launch-review (`LaunchReview`) | @capgo/capacitor-in-app-review |
| --- | --- |
| `isRatingSupported()` | Platform handles minimum OS; call `requestReview()` when timing is right |
| `rating(success, error)` | `requestReview()` |
| Status string `requested` / `shown` / `dismissed` | Promise resolves when flow ends; no status payload |
| `launch(appId?, success, error)` | Not exposed; use store URLs or `@capgo/capacitor-native-market` |
| `errorCallback` | Promise rejection on start failure |
| Not in Cordova | `getPluginVersion()` |
| Cordova plugin install | `bun add @capgo/capacitor-in-app-review` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/in-app-review/](/docs/plugins/in-app-review/)
- Marketing page: [/plugins/capacitor-in-app-review/](/plugins/capacitor-in-app-review/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-in-app-review](https://www.npmjs.com/package/@capgo/capacitor-in-app-review)
- GitHub: [https://github.com/Cap-go/capacitor-in-app-review/](https://github.com/Cap-go/capacitor-in-app-review/)
- Cordova upstream: [https://github.com/dpa99c/cordova-launch-review](https://github.com/dpa99c/cordova-launch-review/)

Review prompts need a new native build when you add the plugin. Use [Capgo Build](/native-build/), then tune when you call `requestReview()` with [Capgo live updates](/live-update/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).