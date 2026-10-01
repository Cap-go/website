---
locale: en
---
# Using @capgo/capacitor-health

Capacitor plugin to interact with data from Apple HealthKit and Health Connect.

## Install

```bash
bun add @capgo/capacitor-health
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { Health } from '@capgo/capacitor-health';
```

## API at a glance

| Method | Description |
| --- | --- |
| `isAvailable` | Returns whether the current platform supports the native health SDK. |
| `requestAuthorization` | Requests read/write access to the provided data types. |
| `checkAuthorization` | Checks authorization status for the provided data types without prompting the user. |
| `readSamples` | Reads samples for the given data type within the specified time frame. |
| `saveSample` | Writes a single sample to the native health store. |
| `openHealthConnectSettings` | Opens the Health Connect settings screen (Android only). On iOS, this method does nothing. |
| `showPrivacyPolicy` | Shows the app's privacy policy for Health Connect (Android only). On iOS, this method does nothing. |
| `queryWorkouts` | Queries workout sessions from the native health store. Supported on iOS (HealthKit) and Android (Health Connect). |
| `queryAggregated` | Queries aggregated health data from the native health store. Aggregates data into time buckets (hour, day, week, month) with operations like sum, average, min, or max. This is more efficient than fetching individual samples for large date ranges. |

## Examples

### `isAvailable()`

Returns whether the current platform supports the native health SDK.

```typescript
import { Health } from '@capgo/capacitor-health';

const result = await Health.isAvailable();
console.log(result);
```

### `requestAuthorization()`

Requests read/write access to the provided data types.

```typescript
import { Health } from '@capgo/capacitor-health';

const result = await Health.requestAuthorization({});
console.log(result);
```

### `checkAuthorization()`

Checks authorization status for the provided data types without prompting the user.

```typescript
import { Health } from '@capgo/capacitor-health';

const result = await Health.checkAuthorization({});
console.log(result);
```

### `readSamples()`

Reads samples for the given data type within the specified time frame.

```typescript
import { Health } from '@capgo/capacitor-health';

const result = await Health.readSamples({ dataType: 'steps' });
console.log(result);
```

### `saveSample()`

Writes a single sample to the native health store.

```typescript
import { Health } from '@capgo/capacitor-health';

await Health.saveSample({
  dataType: 'steps',
  value: 1,
});
```

### `openHealthConnectSettings()`

Opens the Health Connect settings screen (Android only). On iOS, this method does nothing.

```typescript
import { Health } from '@capgo/capacitor-health';

await Health.openHealthConnectSettings();
```

The [API reference](/docs/plugins/health/getting-started/) covers the other 3 methods.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-health/)
- [Documentation](/docs/plugins/health/)
- [API reference](/docs/plugins/health/getting-started/)

## Keep going from Using @capgo/capacitor-health

If you are using **Using @capgo/capacitor-health** to plan native plugin work, connect it with [@capgo/capacitor-health](/docs/plugins/health/) for the implementation detail in @capgo/capacitor-health, [Getting Started](/docs/plugins/health/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
