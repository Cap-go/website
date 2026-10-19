---
locale: en
---
# Using @capgo/capacitor-firebase-crashlytics

Capacitor plugin for Firebase Crashlytics.

## Install

```bash
bun add @capgo/capacitor-firebase-crashlytics
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';
```

## API at a glance

| Method | Description |
| --- | --- |
| `crash` | Forces a crash to test the implementation. |
| `setCustomKey` | Sets a custom key and value that is associated with subsequent fatal and non-fatal reports. |
| `setUserId` | Sets a user ID (identifier) that is associated with subsequent fatal and non-fatal reports. |
| `log` | Adds a custom log message that is sent with your crash data to give yourself more context for the events leading up to a crash. |
| `setEnabled` | Enables/disables automatic data collection. The value does not apply until the next run of the app. |
| `isEnabled` | Returns whether or not automatic data collection is enabled. |
| `didCrashOnPreviousExecution` | Returns whether the app crashed during the previous execution. |
| `sendUnsentReports` | Uploads any unsent reports to Crashlytics at next startup. |
| `deleteUnsentReports` | Deletes any unsent reports on the device. |
| `recordException` | Records a non-fatal report to send to Crashlytics. |

## Examples

### `crash()`

Forces a crash to test the implementation.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.crash({ message: 'Hello from Capacitor' });
```

### `setCustomKey()`

Sets a custom key and value that is associated with subsequent fatal and non-fatal reports.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.setCustomKey({
  key: 'key-123',
  value: 'value',
  type: 'string',
});
```

### `setUserId()`

Sets a user ID (identifier) that is associated with subsequent fatal and non-fatal reports.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.setUserId({ userId: 'user-id-123' });
```

### `log()`

Adds a custom log message that is sent with your crash data to give yourself more context for the events leading up to a crash.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.log({ message: 'Hello from Capacitor' });
```

### `setEnabled()`

Enables/disables automatic data collection. The value does not apply until the next run of the app.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.setEnabled({ enabled: true });
```

### `isEnabled()`

Returns whether or not automatic data collection is enabled.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

const result = await FirebaseCrashlytics.isEnabled();
console.log(result);
```

The table above lists the 10 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/crashlytics).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/crashlytics)
- [Documentation](/docs/plugins/firebase-crashlytics/)
- [API reference](/docs/plugins/firebase-crashlytics/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-crashlytics

If you are using **Using @capgo/capacitor-firebase-crashlytics** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
