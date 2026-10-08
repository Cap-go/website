---
slug: google-fit-to-health-connect-migration-in-capacitor
title: "Google Fit to Health Connect Migration in Capacitor"
description: "Migrate a Capacitor app from Google Fit to Health Connect before the Fit APIs end in 2026: data type mapping, permissions, queries, and Play review."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Migrating a Capacitor fitness app from Google Fit to Health Connect"
keywords: google fit to health connect, google fit deprecation, health connect capacitor, capacitor health plugin, google fit api shutdown 2026, ionic health connect, healthkit capacitor, capacitor google fit migration
tag: Migration, Android, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "When do the Google Fit APIs stop working?"
    answer: "Google closed new developer sign-ups on May 1, 2024, and states that the Google Fit APIs, including the REST API, are deprecated in 2026 and supported until the end of 2026. Google has not published an exact turn-off day, so finish the migration well before December 2026."
  - question: "What replaces Google Fit in a Capacitor app?"
    answer: "Health Connect for on-device data on Android, and HealthKit on iOS. The @capgo/capacitor-health plugin wraps both behind one API, so the same readSamples, queryAggregated, queryWorkouts and saveSample calls work on both platforms."
  - question: "Can I read old Google Fit data through Health Connect?"
    answer: "Not directly. Health Connect only holds data that apps wrote to it. The Google Fit app syncs much of its data to Health Connect when the user enables it, but cloud history from the Fit REST API is not imported automatically. Export what you need from Fit before the shutdown and store it on your backend."
  - question: "Do I still need a Google Cloud project and OAuth for Health Connect?"
    answer: "No. Health Connect is an on-device store with Android runtime permissions. You remove the Fit OAuth client, the fitness scopes and the play-services-fitness dependency. You do need a Health Connect declaration in Play Console instead."
  - question: "Does Health Connect work on iOS or the web?"
    answer: "No. Health Connect is Android only. On iOS, use HealthKit, which @capgo/capacitor-health supports with the same API. There is no web equivalent; for web or server access Google points to the cloud-based Google Health API."
---

The Google Fit to Health Connect migration means replacing every Fit API call in your Capacitor app with Health Connect on Android, and with HealthKit on iOS if you ship there too. Google stopped new Fit sign-ups on May 1, 2024, and supports the Fit APIs only until the end of 2026. This guide maps Fit data types and calls to Health Connect, shows the replacement code with `@capgo/capacitor-health`, and covers the Play Console review that comes with health permissions.

## Google Fit deprecation timeline

| Date | What happened |
| --- | --- |
| May 1, 2024 | No new developer sign-ups for Google Fit APIs |
| 2024 to 2026 | Existing Fit integrations keep working, Google directs developers to Health Connect |
| 2026 | Fit APIs, including the REST API, are deprecated |
| End of 2026 | End of support. Google has not published an exact shutdown day |

Google's migration FAQ says there is no alternative to the Fit REST API with the same shape: on-device apps move to Health Connect, and cloud integrations move to the account-based Google Health API. If you see a precise shutdown date quoted somewhere, check it against Google's own FAQ before planning around it.

## What changes when you move to Health Connect

| | Google Fit | Health Connect |
| --- | --- | --- |
| Where data lives | Google account, in the cloud | On the device |
| Auth | OAuth 2.0 with fitness scopes, Google Sign-In | Android runtime permissions per data type |
| Setup | Cloud project, OAuth client, SHA-1 fingerprints | Manifest permissions, privacy policy screen |
| Availability | Any Android device with Play services | Built into Android 14+, an app from Google Play on older versions |
| History | Full account history | Last 30 days by default, older data with `READ_HEALTH_DATA_HISTORY` |
| Web/server access | REST API | None (use Google Health API for cloud) |
| iOS | Not supported | Not supported, use HealthKit |
| Store review | OAuth verification for sensitive scopes | Play Console Health Connect declaration |

The biggest product change is the device-centric model. Health Connect data on one phone is not visible on another. If your app shows history across devices, sync readings to your own backend.

## Map Fit data types to Health Connect

| Google Fit data type | Health Connect record | `@capgo/capacitor-health` type |
| --- | --- | --- |
| `com.google.step_count.delta` | `StepsRecord` | `steps` |
| `com.google.distance.delta` | `DistanceRecord` | `distance` |
| `com.google.calories.expended` | `TotalCaloriesBurnedRecord` / `ActiveCaloriesBurnedRecord` | `totalCalories` / `calories` |
| `com.google.calories.bmr` | `BasalMetabolicRateRecord` | `basalCalories` |
| `com.google.heart_rate.bpm` | `HeartRateRecord` | `heartRate` |
| `com.google.weight` | `WeightRecord` | `weight` |
| `com.google.height` | `HeightRecord` | `height` |
| `com.google.body.fat.percentage` | `BodyFatRecord` | `bodyFat` |
| `com.google.sleep.segment` | `SleepSessionRecord` with stages | `sleep` |
| `com.google.oxygen_saturation` | `OxygenSaturationRecord` | `oxygenSaturation` |
| `com.google.blood_pressure` | `BloodPressureRecord` | `bloodPressure` |
| `com.google.blood_glucose` | `BloodGlucoseRecord` | `bloodGlucose` |
| `com.google.body.temperature` | `BodyTemperatureRecord` | `bodyTemperature` |
| `com.google.hydration` | `HydrationRecord` | `dietaryWater` |
| `com.google.nutrition` | `NutritionRecord` | `dietaryEnergyConsumed` (energy only) |
| `com.google.activity.segment` and Sessions API | `ExerciseSessionRecord` | `workouts` (read via `queryWorkouts`) |

### Fit types without a direct equivalent

- **Heart Points** (`com.google.heart_minutes`) and **Move Minutes** (`com.google.active_minutes`) were Google Fit scores. Health Connect stores raw data, not these scores. Recompute your own metric from heart rate and exercise sessions.
- **Activity samples** with per-second activity types are replaced by exercise sessions with segments.
- **Location samples** inside workouts become `ExerciseRoute` data in Health Connect, which needs a separate permission and is not exposed by the plugin.
- **Cadence, speed and power** exist in Health Connect (`StepsCadenceRecord`, `SpeedRecord`, `PowerRecord`) but are not covered by the plugin's types. If you depend on them, a small custom native method is the fastest path.

Audit before you write code: list every `DataType` and every API you call (History, Recording, Sessions, Sensors, Config, REST), and mark each one as mapped, recomputed, or dropped.

## Step 1: Remove Google Fit

Delete the Fit integration from your Android project and JavaScript:

- Remove `com.google.android.gms:play-services-fitness` and, if only used for Fit, `play-services-auth` from `build.gradle`.
- Remove the Fit OAuth client from Google Cloud and the fitness scopes from your consent screen.
- Uninstall the old community Google Fit Capacitor plugin you used, then run `bunx cap sync`.

Keep the Fit code in a branch until the new version is live, so you can export historical data if users ask.

## Step 2: Install the health plugin

```bash
bun add @capgo/capacitor-health
bunx cap sync
```

[`@capgo/capacitor-health`](/plugins/capacitor-health/) supports Capacitor 8, uses Health Connect on Android and HealthKit on iOS, and requires Android `minSdk` 26.

### Android setup

The plugin merges the Health Connect read and write permissions for its supported types into your manifest, plus the `<queries>` entry for the Health Connect package and the permission rationale activity. You need to:

1. **Provide a privacy policy.** Health Connect opens it from the permission sheet. Either add `android/app/src/main/assets/public/privacypolicy.html`, or set a URL in `android/app/src/main/res/values/strings.xml`:

```xml
<string name="health_connect_privacy_policy_url">https://example.com/privacy</string>
```

2. **Trim permissions.** Google Play reviews every Health Connect permission you declare. If you only read steps and heart rate, remove the rest with `tools:node="remove"`:

```xml
<uses-permission
    android:name="android.permission.health.WRITE_BLOOD_GLUCOSE"
    tools:node="remove" />
```

3. **Add history access if you need it.** Health Connect limits reads to roughly the last 30 days unless the user grants `READ_HEALTH_DATA_HISTORY`:

```xml
<uses-permission android:name="android.permission.health.READ_HEALTH_DATA_HISTORY" />
```

### iOS setup

Enable the HealthKit capability in Xcode and add usage strings to `Info.plist`:

```xml
<key>NSHealthShareUsageDescription</key>
<string>Show your steps and workouts in the app.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>Save the workouts you record in the app.</string>
```

## Step 3: Check availability

Google Fit worked anywhere Play services existed. Health Connect may be missing on Android 13 and older, or need an update.

```typescript
import { Health } from '@capgo/capacitor-health';

export async function ensureHealthAvailable() {
  const result = await Health.isAvailable();
  if (result.available) return true;

  // On Android, send the user to install or update Health Connect
  if (result.platform === 'android') {
    await Health.openHealthConnectSettings();
  }
  console.warn('Health store unavailable:', result.reason);
  return false;
}
```

Show a short explanation screen before redirecting. Users who never heard of Health Connect are confused when the Play Store opens unprompted.

## Step 4: Replace OAuth with permissions

The Fit flow was: Google Sign-In, request fitness scopes, then call APIs. The new flow is a single permission sheet:

```typescript
const status = await Health.requestAuthorization({
  read: ['steps', 'distance', 'calories', 'heartRate', 'sleep', 'workouts'],
  write: ['weight'],
  requestHistoryAccess: true, // Android only
});

if (status.readDenied.length > 0) {
  // explain what will not work and offer openHealthConnectSettings()
}
if (status.historyAccessAvailable === false) {
  // provider too old: only the last 30 days are readable
}
```

Permissions are per data type and the user can grant any subset. Use `checkAuthorization` with the same options on every app start, because users can revoke access in Health Connect settings at any time. On iOS, HealthKit hides read denials for privacy, so an empty result can mean "no data" or "no access".

## Step 5: Replace History API reads

A Fit `readData` call for raw samples becomes `readSamples`:

```typescript
const end = new Date();
const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

const { samples } = await Health.readSamples({
  dataType: 'heartRate',
  startDate: start.toISOString(),
  endDate: end.toISOString(),
  limit: 500,
  ascending: true,
});

for (const s of samples) {
  console.log(s.startDate, s.value, s.unit, s.sourceName, s.deviceType);
}
```

`sourceName` and, on Android, `deviceType` (`watch`, `phone`, `chestStrap`, and so on) replace Fit's data source objects. Use them to prefer watch data over phone data when both exist.

## Step 6: Replace bucketed and aggregate reads

Fit's `bucketByTime` plus `aggregate` becomes `queryAggregated`:

```typescript
const { samples: daily } = await Health.queryAggregated({
  dataType: 'steps',
  startDate: new Date(Date.now() - 7 * 86_400_000).toISOString(),
  endDate: new Date().toISOString(),
  bucket: 'day',          // 'hour' | 'day' | 'week' | 'month'
  aggregation: 'sum',
});

const { samples: hr } = await Health.queryAggregated({
  dataType: 'heartRate',
  bucket: 'hour',
  aggregation: ['min', 'average', 'max'],
  startDate: new Date(Date.now() - 86_400_000).toISOString(),
  endDate: new Date().toISOString(),
});
// hr[i].values.min, hr[i].values.average, hr[i].values.max
```

Always aggregate steps instead of summing raw samples. Health Connect deduplicates overlapping data from several apps during aggregation, and raw sums often double count when a watch and a phone both record steps.

## Step 7: Replace the Sessions API

Fit sessions map to exercise sessions:

```typescript
const { workouts, anchor } = await Health.queryWorkouts({
  workoutType: 'running',
  startDate: new Date(Date.now() - 30 * 86_400_000).toISOString(),
  endDate: new Date().toISOString(),
  limit: 50,
});

for (const w of workouts) {
  console.log(w.workoutType, w.duration, w.totalDistance, w.totalEnergyBurned);
}
// pass `anchor` back to fetch the next page
```

Request `workouts` in `read` permissions first. The plugin reads workouts but does not write exercise sessions, so if your app records workouts, write the underlying samples (distance, calories, heart rate) and keep the session itself in your backend, or add a native method for `ExerciseSessionRecord`.

## Step 8: Replace inserts

Fit's `insertData` becomes `saveSample`:

```typescript
await Health.saveSample({
  dataType: 'weight',
  value: 72.4, // kilograms
  startDate: new Date().toISOString(),
});

await Health.saveSample({
  dataType: 'bloodPressure',
  value: 120,
  systolic: 120,
  diastolic: 80,
  startDate: new Date().toISOString(),
});
```

Values must use the default unit of each type (kilograms, meters, kilocalories, bpm). The `metadata` option is ignored by Health Connect.

## Step 9: Pass Google Play review

Health permissions trigger extra review:

1. In Play Console, open **App content** and complete the **Health apps** declaration and the Health Connect permissions form. Justify every permission you request.
2. Make sure the privacy policy linked in Play Console and the one shown in the Health Connect sheet describe health data use.
3. Update the **Data safety** form: health and fitness data, collected or not, shared or not.
4. Submit a build that only declares the permissions you justified. Extra declared permissions are the most common rejection.

Plan for review to take longer than a normal update. Ship the migration as its own release, not mixed with unrelated features.

## Step 10: Migrate user expectations

- Tell users their history now comes from Health Connect, and that older data may be limited to 30 days until they grant history access.
- If your app used Fit as its cloud sync, move that responsibility to your backend now.
- Remove "Connect Google Fit" buttons and rename them "Connect Health Connect" on Android and "Connect Apple Health" on iOS.

## Troubleshooting

**`isAvailable()` returns false on Android 13**: Health Connect is not installed or outdated. Call `openHealthConnectSettings()`.

**The permission sheet never appears**: the permission is not declared in the merged manifest, or you removed it with `tools:node="remove"`. Check `android/app/build/intermediates/merged_manifests`.

**Reads return only 30 days**: request `requestHistoryAccess: true` and declare `READ_HEALTH_DATA_HISTORY`.

**Step totals are higher than Google Fit**: you summed raw samples. Use `queryAggregated`.

**Empty results on iOS**: either no data or read permission denied. HealthKit does not tell you which.

**Play Console rejects the update**: remove undeclared or unjustified Health Connect permissions and resubmit with a clear justification.

## Ship the migration in stages

The native part (plugin, manifest, HealthKit capability) needs a store release. After that, queries, UI and data mapping are JavaScript, which you can iterate on with [Capgo live updates](/live-update/) while users test the new flow. If you also read live sensor data, see our guide to [building a heart rate monitor with Capacitor](/blog/how-to-build-a-heart-rate-monitor-with-capacitor/), and the [health plugin docs](/docs/plugins/health/) for every data type.
