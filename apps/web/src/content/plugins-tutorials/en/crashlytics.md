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

## What This Plugin Exposes

- `crash` - Forces a crash to test the implementation.
- `setCustomKey` - Sets a custom key and value that is associated with subsequent fatal and non-fatal reports.
- `setUserId` - Sets a user ID (identifier) that is associated with subsequent fatal and non-fatal reports.
- `log` - Adds a custom log message that is sent with your crash data to give yourself more context for the events leading up to a crash.

## Example Usage

### `crash`

Forces a crash to test the implementation.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.crash({} as CrashOptions);
```

### `setCustomKey`

Sets a custom key and value that is associated with subsequent fatal and non-fatal reports.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.setCustomKey({} as SetCustomKeyOptions);
```

### `setUserId`

Sets a user ID (identifier) that is associated with subsequent fatal and non-fatal reports.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.setUserId({} as SetUserIdOptions);
```

### `log`

Adds a custom log message that is sent with your crash data to give yourself more context for the events leading up to a crash.

```typescript
import { FirebaseCrashlytics } from '@capgo/capacitor-firebase-crashlytics';

await FirebaseCrashlytics.log({} as LogOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/crashlytics
- Docs: /docs/plugins/firebase-crashlytics/

## Keep going from Using @capgo/capacitor-firebase-crashlytics

If you are using **Using @capgo/capacitor-firebase-crashlytics** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
