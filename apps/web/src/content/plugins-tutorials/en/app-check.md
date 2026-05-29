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

## What This Plugin Exposes

- `getToken` - Get the current App Check token.
- `initialize` - Activate App Check for the given app. Can be called only once per app.
- `setTokenAutoRefreshEnabled` - Set whether the App Check token should be refreshed automatically or not.

## Example Usage

### `getToken`

Get the current App Check token.

```typescript
import { FirebaseAppCheck } from '@capgo/capacitor-firebase-app-check';

await FirebaseAppCheck.getToken();
```

### `initialize`

Activate App Check for the given app. Can be called only once per app.

```typescript
import { FirebaseAppCheck } from '@capgo/capacitor-firebase-app-check';

await FirebaseAppCheck.initialize();
```

### `setTokenAutoRefreshEnabled`

Set whether the App Check token should be refreshed automatically or not.

```typescript
import { FirebaseAppCheck } from '@capgo/capacitor-firebase-app-check';

await FirebaseAppCheck.setTokenAutoRefreshEnabled({} as SetTokenAutoRefreshEnabledOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app-check
- Docs: /docs/plugins/firebase-app-check/

## Keep going from Using @capgo/capacitor-firebase-app-check

If you are using **Using @capgo/capacitor-firebase-app-check** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
