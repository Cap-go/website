---
slug: cordova-plugin-screen-orientation-alternative
title: "cordova-plugin-screen-orientation Alternative for Capacitor"
description: "cordova-plugin-screen-orientation alternative for Capacitor: lock and unlock orientation with @capgo/capacitor-screen-orientation, motion tracking, and foldable APIs."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-17T09:00:00.000Z
updated_at: 2026-11-17T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a screen orientation plugin guide"
keywords: cordova-plugin-screen-orientation alternative, capacitor screen orientation, lock orientation capacitor, @capgo/capacitor-screen-orientation
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-screen-orientation alternative in Capacitor?"
    answer: "@capgo/capacitor-screen-orientation exposes lock(), unlock(), orientation(), and addListener('screenOrientationChange') with the same lock types as the Cordova Screen Orientation API."
  - question: "Is cordova-plugin-screen-orientation still maintained?"
    answer: "npm lists cordova-plugin-screen-orientation at version 3.0.4 with a registry modified date of 5 November 2023. The source is apache/cordova-plugin-screen-orientation."
  - question: "Does the Capgo plugin bypass the system orientation lock?"
    answer: "No. The bypassOrientationLock option only affects motion-based orientation tracking; the UI still respects the user orientation lock."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/screen-orientation/, npm @capgo/capacitor-screen-orientation, and GitHub Cap-go/capacitor-screen-orientation."
---

The practical **cordova-plugin-screen-orientation alternative** for a Capacitor app is [`@capgo/capacitor-screen-orientation`](/plugins/capacitor-screen-orientation/). It maps the Cordova `window.screen.orientation` lock and unlock calls to typed `ScreenOrientation` promises, adds `isOrientationLocked()` and foldable helpers from `definitions.ts`, and removes the Cordova exec bridge. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-screen-orientation in Capacitor

**cordova-plugin-screen-orientation** on npm is version **3.0.4**. The registry `modified` timestamp is **5 November 2023**. The source lives at [apache/cordova-plugin-screen-orientation](https://github.com/apache/cordova-plugin-screen-orientation). The README documents these `window.screen.orientation` APIs from `www/screenorientation.js`:

- `screen.orientation.lock(orientation)` returns a Promise
- `screen.orientation.unlock()`
- `screen.orientation` for the current orientation value
- `screen.orientation.onchange` listener support

Supported lock strings match the W3C Screen Orientation API: `portrait-primary`, `portrait-secondary`, `landscape-primary`, `landscape-secondary`, combined `portrait` and `landscape`, and `any`.

In a Capacitor codebase the Cordova plugin still means a global `screen.orientation` shim installed through `cordova plugin add`, with no TypeScript surface and no foldable or motion sensor helpers.

[`@capgo/capacitor-screen-orientation`](https://www.npmjs.com/package/@capgo/capacitor-screen-orientation) latest on npm is **8.4.5** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `lock()`, `unlock()`, `orientation()`, `isOrientationLocked()`, `addListener('screenOrientationChange')`, and optional `bypassOrientationLock` on `OrientationLockOptions`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-screen-orientation
bunx cap sync
```

Match your Android `AndroidManifest.xml` activity `screenOrientation` defaults to your lock policy. The Cordova plugin historically relied on `config.xml` `orientation` preferences; set the same values in native projects or lock at runtime from JavaScript.

## Usage example

```ts
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

export async function lockGameLandscape() {
  const handle = await ScreenOrientation.addListener('screenOrientationChange', ({ type }) => {
    console.log('orientation', type);
  });

  await ScreenOrientation.lock({ orientation: 'landscape' });
  const { type } = await ScreenOrientation.orientation();
  console.log('current', type);

  // Later
  await ScreenOrientation.unlock();
  await handle.remove();
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
await screen.orientation.lock('portrait');
screen.orientation.unlock();
```

```ts
// After (Capacitor)
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

await ScreenOrientation.lock({ orientation: 'portrait' });
await ScreenOrientation.unlock();
```

### API mapping table

| cordova-plugin-screen-orientation (`screen.orientation`) | @capgo/capacitor-screen-orientation |
| --- | --- |
| `lock('portrait-primary')` etc. | `lock({ orientation: 'portrait-primary' })` |
| `unlock()` | `unlock()` |
| `screen.orientation` value | `orientation()` returns `{ type }` |
| `screen.orientation.onchange` | `addListener('screenOrientationChange', ...)` |
| Not in Cordova www | `isOrientationLocked()` with physical vs UI orientation |
| Not in Cordova www | `startOrientationTracking()` / `stopOrientationTracking()` when `bypassOrientationLock` is needed for events only |
| Cordova plugin install | `bun add @capgo/capacitor-screen-orientation` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/screen-orientation/](/docs/plugins/screen-orientation/)
- Marketing page: [/plugins/capacitor-screen-orientation/](/plugins/capacitor-screen-orientation/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-screen-orientation](https://www.npmjs.com/package/@capgo/capacitor-screen-orientation)
- GitHub: [https://github.com/Cap-go/capacitor-screen-orientation/](https://github.com/Cap-go/capacitor-screen-orientation/)
- Cordova upstream: [https://github.com/apache/cordova-plugin-screen-orientation](https://github.com/apache/cordova-plugin-screen-orientation)

Orientation locks ship in the native binary, so plan a store build after you swap plugins. Use [Capgo Build](/native-build/) for cloud builds, then ship UI logic with [Capgo live updates](/live-update/) only where orientation handling stays in JavaScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).