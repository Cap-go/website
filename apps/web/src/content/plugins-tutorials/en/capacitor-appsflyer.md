---
locale: en
---
# Using @capgo/capacitor-appsflyer

Capacitor plugin for AppsFlyer attribution, analytics, and deep links.

## Install

```bash
bun add @capgo/capacitor-appsflyer
bunx cap sync
```

## What This Plugin Exposes

- `initSDK` - Use this method to initialize and start AppsFlyer SDK. This API should be called as soon as the app launched.
- `startSDK` - Use this method to start AppsFlyer SDK, only on manual start mode.
- `logEvent` - Log an in-app event.
- `setCustomerUserId` - Setting your own customer ID enables you to cross-reference your own unique ID with AppsFlyer's unique ID and other devices' IDs. This ID is available in raw-data reports and in the Postback APIs for cross-referencing with your internal IDs.

## Example Usage

### `initSDK`

Use this method to initialize and start AppsFlyer SDK. This API should be called as soon as the app launched.

```typescript
import { AppsFlyer } from '@capgo/capacitor-appsflyer';

await AppsFlyer.initSDK({} as AFInit);
```

### `startSDK`

Use this method to start AppsFlyer SDK, only on manual start mode.

```typescript
import { AppsFlyer } from '@capgo/capacitor-appsflyer';

await AppsFlyer.startSDK();
```

### `logEvent`

Log an in-app event.

```typescript
import { AppsFlyer } from '@capgo/capacitor-appsflyer';

await AppsFlyer.logEvent({} as AFEvent);
```

### `setCustomerUserId`

Setting your own customer ID enables you to cross-reference your own unique ID with AppsFlyer's unique ID and other devices' IDs. This ID is available in raw-data reports and in the Postback APIs for cross-referencing with your internal IDs.

```typescript
import { AppsFlyer } from '@capgo/capacitor-appsflyer';

await AppsFlyer.setCustomerUserId({} as AFCuid);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-appsflyer/
- Docs: /docs/plugins/appsflyer/
