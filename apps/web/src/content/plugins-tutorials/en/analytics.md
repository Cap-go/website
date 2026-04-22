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

## What This Plugin Exposes

- `getAppInstanceId` - Retrieves the app instance id.
- `getSessionId` - Retrieves the current session id (`ga_session_id`).
- `setConsent` - Sets the user's consent mode.
- `setUserId` - Sets the user ID property.

## Example Usage

### `getAppInstanceId`

Retrieves the app instance id.

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.getAppInstanceId();
```

### `getSessionId`

Retrieves the current session id (`ga_session_id`).

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.getSessionId();
```

### `setConsent`

Sets the user's consent mode.

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.setConsent({} as SetConsentOptions);
```

### `setUserId`

Sets the user ID property.

```typescript
import { FirebaseAnalytics } from '@capgo/capacitor-firebase-analytics';

await FirebaseAnalytics.setUserId({} as SetUserIdOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/analytics
- Docs: /docs/plugins/firebase-analytics/
