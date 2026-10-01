---
locale: en
---
# Using @capgo/capacitor-firebase-analytics

Capacitor plugin for Firebase Analytics.

## Install

```bash
bun add @capgo/capacitor-firebase-analytics
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getAppInstanceId` | Retrieves the app instance id. |
| `getSessionId` | Retrieves the current session id (`ga_session_id`). |
| `setConsent` | Sets the user's consent mode. |
| `setUserId` | Sets the user ID property. |
| `setUserProperty` | Sets a custom user property to a given value. |
| `setCurrentScreen` | Sets the current screen name. |
| `logEvent` | Logs an app event. |
| `setSessionTimeoutDuration` | Sets the duration of inactivity that terminates the current session. |
| `setEnabled` | Enables/disables automatic data collection. The value does not apply until the next run of the app. |
| `isEnabled` | Returns whether or not automatic data collection is enabled. |
| `resetAnalyticsData` | Clears all analytics data for this app from the device. Resets the app instance id. |
| `logTransaction` | Logs a StoreKit 2 transaction. |
| `initiateOnDeviceConversionMeasurementWithEmailAddress` | Initiates on-device conversion measurement with an email address. |
| `initiateOnDeviceConversionMeasurementWithPhoneNumber` | Initiates on-device conversion measurement with a phone number. |
| `initiateOnDeviceConversionMeasurementWithHashedEmailAddress` | Initiates on-device conversion measurement with a hashed email address. |
| `initiateOnDeviceConversionMeasurementWithHashedPhoneNumber` | Initiates on-device conversion measurement with a hashed phone number. |

## Examples

### `getAppInstanceId()`

Retrieves the app instance id.

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

const result = await FirebaseAnalytics.getAppInstanceId();
console.log(result);
```

### `getSessionId()`

Retrieves the current session id (`ga_session_id`).

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

const result = await FirebaseAnalytics.getSessionId();
console.log(result);
```

### `setConsent()`

Sets the user's consent mode.

```typescript
import { FirebaseAnalytics, ConsentStatus, ConsentType } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.setConsent({
  type: ConsentType.AdPersonalization,
  status: ConsentStatus.Granted,
});
```

### `setUserId()`

Sets the user ID property.

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.setUserId({ userId: 'user-id-123' });
```

### `setUserProperty()`

Sets a custom user property to a given value.

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.setUserProperty({
  key: 'key-123',
  value: 'value',
});
```

### `setCurrentScreen()`

Sets the current screen name.

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.setCurrentScreen({ screenName: 'screen' });
```

The table above lists all 16 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/analytics) for the full contract of each one.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/analytics)
- [Documentation](/docs/plugins/firebase-analytics/)
- [API reference](/docs/plugins/firebase-analytics/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-analytics

If you are using **Using @capgo/capacitor-firebase-analytics** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
