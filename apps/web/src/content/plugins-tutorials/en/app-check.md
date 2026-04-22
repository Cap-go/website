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
