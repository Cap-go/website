---
locale: en
---
# Using @capgo/capacitor-firebase-app-check

Capacitor plugin for Firebase App Check.

## Install

```bash
bun add @capgo/capacitor-firebase-app-check
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseAppCheck } from '@capgo/capacitor-firebase-app-check';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getToken` | Get the current App Check token. |
| `initialize` | Activate App Check for the given app. Can be called only once per app. |
| `setTokenAutoRefreshEnabled` | Set whether the App Check token should be refreshed automatically or not. |

## Examples

### `getToken()`

Get the current App Check token.

```typescript
import { FirebaseAppCheck } from '@capgo/capacitor-firebase-app-check';

const result = await FirebaseAppCheck.getToken();
// The result holds sensitive values: use it without logging it.
```

### `initialize()`

Activate App Check for the given app. Can be called only once per app.

```typescript
import { FirebaseAppCheck } from '@capgo/capacitor-firebase-app-check';

await FirebaseAppCheck.initialize();
```

### `setTokenAutoRefreshEnabled()`

Set whether the App Check token should be refreshed automatically or not.

```typescript
import { FirebaseAppCheck } from '@capgo/capacitor-firebase-app-check';

await FirebaseAppCheck.setTokenAutoRefreshEnabled({ enabled: true });
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `FirebaseAppCheck.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app-check)
- [Documentation](/docs/plugins/firebase-app-check/)
- [API reference](/docs/plugins/firebase-app-check/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-app-check

If you are using **Using @capgo/capacitor-firebase-app-check** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
