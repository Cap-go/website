---
slug: cordova-plugin-health-alternative
title: "cordova-plugin-health Alternative for Capacitor"
description: "cordova-plugin-health alternative for Capacitor: HealthKit and Health Connect with @capgo/capacitor-health, typed samples, and aggregation APIs."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-17T13:00:00.000Z
updated_at: 2026-11-17T13:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a health plugin guide"
keywords: cordova-plugin-health alternative, capacitor healthkit, health connect capacitor, @capgo/capacitor-health
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-health alternative in Capacitor?"
    answer: "@capgo/capacitor-health replaces cordova.plugins.health with Health.requestAuthorization(), readSamples(), and queryAggregated() from definitions.ts."
  - question: "Is cordova-plugin-health still maintained?"
    answer: "npm lists cordova-plugin-health at version 3.3.2 with a registry modified date of 27 October 2026. Version 3+ targets Health Connect on Android instead of deprecated Google Fit."
  - question: "Do I still need a privacy policy HTML file on Android?"
    answer: "Cordova required privacypolicy.html for Health Connect. Capgo exposes showPrivacyPolicy() and documents health_connect_privacy_policy_url in definitions.ts."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/health/, npm @capgo/capacitor-health, and GitHub Cap-go/capacitor-health."
---

The practical **cordova-plugin-health alternative** for a Capacitor app is [`@capgo/capacitor-health`](/plugins/capacitor-health/). It maps `cordova.plugins.health` callback queries to promise based `Health` calls on HealthKit and Health Connect with typed `HealthDataType` values in `definitions.ts`. This guide covers npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-health in Capacitor

**cordova-plugin-health** on npm is version **3.3.2**. The registry `modified` timestamp is **27 October 2026**. The source lives at [dariosalvi78/cordova-plugin-health](https://github.com/dariosalvi78/cordova-plugin-health). The README documents:

- `cordova.plugins.health.isAvailable()`
- `requestAuthorization(datatypes, success, error)` with read/write scopes
- `query()`, `queryAggregated()`, `store()`, `delete()`
- Android Health Connect permissions declared manually in `AndroidManifest.xml`
- Mandatory `privacypolicy.html` for Health Connect on Android
- Version 3+ drops Google Fit in favor of Health Connect

In a Capacitor codebase the Cordova plugin still means `cordova plugin add` variables, manual manifest edits that Capacitor may not merge automatically, and string based datatype names in `www/ios/health.js`.

[`@capgo/capacitor-health`](https://www.npmjs.com/package/@capgo/capacitor-health) latest on npm is **8.13.0** with a `modified` date of **14 November 2026**. `src/definitions.ts` documents `isAvailable()`, `requestAuthorization()`, `checkAuthorization()`, `readSamples()`, `saveSample()`, `queryAggregated()`, `queryWorkouts()`, `openHealthConnectSettings()`, and `showPrivacyPolicy()`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-health
bunx cap sync
```

**iOS:** Enable the HealthKit capability and set `NSHealthShareUsageDescription` and `NSHealthUpdateUsageDescription` in `Info.plist`.

**Android:** Add Health Connect permissions for each `HealthDataType` you read or write, plus `android.permission.health.READ_HEALTH_DATA_HISTORY` when you need more than roughly 30 days of history via `requestHistoryAccess: true` in `AuthorizationOptions` per definitions.ts.

## Usage example

```ts
import { Health } from '@capgo/capacitor-health';

export async function readTodaySteps() {
  const { available } = await Health.isAvailable();
  if (!available) return [];

  await Health.requestAuthorization({
    read: ['steps'],
    write: [],
  });

  const { samples } = await Health.readSamples({
    dataType: 'steps',
    startDate: new Date(Date.now() - 86400000).toISOString(),
    endDate: new Date().toISOString(),
    limit: 500,
  });
  return samples;
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
cordova.plugins.health.requestAuthorization(
  ['steps', 'distance'],
  () => {
    cordova.plugins.health.query(
      { startDate: start, endDate: end, dataType: 'steps' },
      (data) => console.log(data),
      console.error,
    );
  },
  console.error,
);
```

```ts
// After (Capacitor)
import { Health } from '@capgo/capacitor-health';

await Health.requestAuthorization({ read: ['steps', 'distance'] });
const { samples } = await Health.readSamples({
  dataType: 'steps',
  startDate: start.toISOString(),
  endDate: end.toISOString(),
});
console.log(samples);
```

### API mapping table

| cordova-plugin-health (`cordova.plugins.health`) | @capgo/capacitor-health |
| --- | --- |
| `isAvailable(success, error)` | `isAvailable()` returns `AvailabilityResult` |
| `requestAuthorization(datatypes, success, error)` | `requestAuthorization({ read, write, requestHistoryAccess? })` |
| `isAuthorized(datatypes, success, error)` | `checkAuthorization({ read, write })` |
| `query(opts, success, error)` | `readSamples({ dataType, startDate, endDate, limit, ascending })` |
| `queryAggregated(opts, success, error)` | `queryAggregated({ dataType, startDate, endDate, bucket, aggregation })` |
| `store(opts, success, error)` | `saveSample({ dataType, value, unit?, startDate, endDate, metadata? })` |
| `delete(opts, success, error)` | Use platform specific delete flows in docs where exposed |
| `openHealthSettings()` | `openHealthConnectSettings()` (Android) |
| `launchPrivacyPolicy()` (Android) | `showPrivacyPolicy()` |
| Cordova string datatypes like `heart_rate` | Typed `HealthDataType` like `heartRate` |
| Callback errors | Promise rejection |
| Cordova plugin install | `bun add @capgo/capacitor-health` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/health/](/docs/plugins/health/)
- Marketing page: [/plugins/capacitor-health/](/plugins/capacitor-health/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-health](https://www.npmjs.com/package/@capgo/capacitor-health)
- GitHub: [https://github.com/Cap-go/capacitor-health/](https://github.com/Cap-go/capacitor-health/)
- Cordova upstream: [https://github.com/dariosalvi78/cordova-plugin-health](https://github.com/dariosalvi78/cordova-plugin-health)

Health permissions live in the native binary. Plan a store build after you add types or entitlements. Use [Capgo Build](/native-build/). For Google Fit sunset context see [Google Fit to Health Connect migration](/blog/google-fit-to-health-connect-migration-in-capacitor/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).