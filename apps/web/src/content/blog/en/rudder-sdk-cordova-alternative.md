---
slug: rudder-sdk-cordova-alternative
title: "rudder-sdk-cordova Alternative for Capacitor"
description: "rudder-sdk-cordova alternative for Capacitor: RudderStack identify, track, screen, and flush with @capgo/capacitor-rudderstack and the same Cordova style initialize signature."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-15T11:00:00.000Z
updated_at: 2026-11-15T13:12:23.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a RudderStack analytics plugin guide"
keywords: rudder-sdk-cordova alternative, capacitor rudderstack, rudder cordova capacitor, @capgo/capacitor-rudderstack, RudderClient
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best rudder-sdk-cordova alternative in Capacitor?"
    answer: "@capgo/capacitor-rudderstack wraps the same RudderStack native SDKs with nativePlugin.initialize, identify, track, screen, and flush matching the Cordova RudderClient API."
  - question: "Is rudder-sdk-cordova still maintained?"
    answer: "npm lists rudder-sdk-cordova at version 1.4.0 with a registry modified date of 28 August 2026. The upstream repo is rudderlabs/rudder-sdk-cordova."
  - question: "Does the Capacitor port support Cordova destination factories?"
    answer: "The Capacitor definitions document config.factories as ignored. Cordova companion factory plugins are not implemented in this Capacitor release."
  - question: "Can I keep the Cordova initialize argument order?"
    answer: "Yes. nativePlugin.initialize accepts writeKey first and an optional RudderConfiguration or RudderOptions second argument, as documented for migration."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/rudderstack/, npm @capgo/capacitor-rudderstack, and GitHub Cap-go/capacitor-rudderstack."
---

The practical **rudder-sdk-cordova alternative** for a Capacitor app is [`@capgo/capacitor-rudderstack`](/plugins/capacitor-rudderstack/). It keeps the same RudderStack event surface as the Cordova `RudderClient` module (`initialize`, `identify`, `track`, `screen`, `flush`, and related helpers) while routing calls through Capacitor promises instead of `cordova.exec`. This guide lists verifiable npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave rudder-sdk-cordova in Capacitor

**rudder-sdk-cordova** on npm is version **1.4.0**. The registry `modified` timestamp is **28 August 2026**. The source lives at [rudderlabs/rudder-sdk-cordova](https://github.com/rudderlabs/rudder-sdk-cordova). The JavaScript entry in `www/RudderClient.js` documents:

- `RudderClient.initialize(writeKey, config, options)` as a Promise
- fire-and-forget `identify`, `group`, `track`, `screen`, `alias`, `reset`, and `flush`
- device and identity helpers `putDeviceToken`, `putAdvertisingId`, `putAnonymousId`, and `optOut`
- `RudderClient.LogLevel` constants for native verbosity

Cordova `initialize` can pass `config.factories` as an array of companion plugins that call `setup()` before native init.

In a Capacitor codebase the Cordova plugin still means:

- `cordova plugin add rudder-sdk-cordova` plus any per-destination factory packages
- mixing Cordova exec timing with Capacitor app bootstrap
- no typed Capacitor import in TypeScript apps

[`@capgo/capacitor-rudderstack`](https://www.npmjs.com/package/@capgo/capacitor-rudderstack) latest on npm is **8.1.19** with a `modified` date of **12 November 2026**. The Capacitor README and `src/definitions.ts` mirror the Cordova call shapes and document that `factories` on `RudderConfiguration` is **ignored** in the Capacitor port because Cordova factory plugins are not bundled yet. Capgo maintains the wrapper on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-rudderstack
bunx cap sync
```

Configure your RudderStack write key and data plane URL in application bootstrap code, not in `capacitor.config.ts`, unless you add your own env layer.

## Usage example

```ts
import { nativePlugin } from '@capgo/capacitor-rudderstack';

export async function startAnalytics() {
  await nativePlugin.initialize('YOUR_WRITE_KEY', {
    dataPlaneUrl: 'https://your.dataplane.rudderstack.com',
    trackLifecycleEvents: true,
    recordScreenViews: false,
    logLevel: nativePlugin.LogLevel.WARN,
  });

  await nativePlugin.identify('user_123', { email: 'user@example.com', plan: 'pro' });
  await nativePlugin.track('Signed Up', { source: 'mobile' });
  await nativePlugin.screen('Checkout', { step: 'payment' });
}

export async function onAppBackground() {
  await nativePlugin.flush();
}
```

Push tokens and privacy controls:

```ts
await nativePlugin.putDeviceToken(apnsOrFcmToken);
await nativePlugin.optOut(false);
```

## Migrating from Cordova to Capacitor

Cordova code requires `RudderClient` from the Cordova module and calls `initialize` before other methods. Capacitor code imports `nativePlugin` and uses the same ordering.

```js
// Before (Cordova)
const RudderClient = require('rudder-sdk-cordova/www/RudderClient');

await RudderClient.initialize('WRITE_KEY', {
  dataPlaneUrl: 'https://your.dataplane.rudderstack.com',
});
RudderClient.identify('user_123', { plan: 'pro' });
RudderClient.track('Order Completed', { revenue: 42 });
```

```ts
// After (Capacitor)
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.initialize('WRITE_KEY', {
  dataPlaneUrl: 'https://your.dataplane.rudderstack.com',
});
await nativePlugin.identify('user_123', { plan: 'pro' });
await nativePlugin.track('Order Completed', { revenue: 42 });
```

### API mapping table

| rudder-sdk-cordova (`RudderClient`) | @capgo/capacitor-rudderstack (`nativePlugin`) |
| --- | --- |
| `initialize(writeKey, config, options)` | `initialize(writeKey, config?, options?)` |
| `identify(userId, traits, options)` | `identify(userId, traits?, options?)` |
| `group(groupId, groupTraits, options)` | `group(groupId, groupTraits?, options?)` |
| `track(eventName, properties, options)` | `track(eventName, properties?, options?)` |
| `screen(screenName, properties, options)` | `screen(screenName, properties?, options?)` |
| `alias(newId, options)` | `alias(newId, options?)` |
| `reset()` | `reset()` |
| `flush()` | `flush()` |
| `putDeviceToken(token)` | `putDeviceToken(token)` |
| `putAdvertisingId(id)` / `setAdvertisingId` | `putAdvertisingId(id)` / `setAdvertisingId(id)` |
| `putAnonymousId(id)` / `setAnonymousId` | `putAnonymousId(id)` / `setAnonymousId(id)` |
| `optOut(boolean)` | `optOut(boolean)` |
| `RudderClient.LogLevel` | `nativePlugin.LogLevel` |
| `config.factories` companion plugins | Not supported (`factories` ignored in Capacitor) |
| Cordova exec (void returns on track) | Capacitor `await` on all calls |

If your Cordova app depended on a RudderStack Cordova factory plugin, plan a native destination integration outside this Capacitor wrapper or keep the Cordova factory until Capgo documents support.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/rudderstack/](/docs/plugins/rudderstack/)
- Marketing page: [/plugins/capacitor-rudderstack/](/plugins/capacitor-rudderstack/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-rudderstack](https://www.npmjs.com/package/@capgo/capacitor-rudderstack)
- GitHub: [https://github.com/Cap-go/capacitor-rudderstack/](https://github.com/Cap-go/capacitor-rudderstack/)
- Cordova upstream: [https://github.com/rudderlabs/rudder-sdk-cordova](https://github.com/rudderlabs/rudder-sdk-cordova)

Swapping the analytics bridge requires a new store build. Use [Capgo Build](/native-build/) for binaries, then ship event naming and property changes with [Capgo live updates](/live-update/) where logic stays in TypeScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).