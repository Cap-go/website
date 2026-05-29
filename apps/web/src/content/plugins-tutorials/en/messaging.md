---
locale: en
---
# Using @capgo/capacitor-firebase-messaging

Capacitor plugin for Firebase Cloud Messaging (FCM).

## Install

```bash
bun add @capgo/capacitor-firebase-messaging
bunx cap sync
```

## What This Plugin Exposes

- `checkPermissions` - Check permission to receive push notifications.
- `requestPermissions` - Request permission to receive push notifications.
- `isSupported` - Checks if all required APIs exist.
- `getToken` - Register the app to receive push notifications. Returns a FCM token that can be used to send push messages to that Messaging instance.

## Example Usage

### `checkPermissions`

Check permission to receive push notifications.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.checkPermissions();
```

### `requestPermissions`

Request permission to receive push notifications.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.requestPermissions();
```

### `isSupported`

Checks if all required APIs exist.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.isSupported();
```

### `getToken`

Register the app to receive push notifications. Returns a FCM token that can be used to send push messages to that Messaging instance.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.getToken();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/messaging
- Docs: /docs/plugins/firebase-messaging/

## Keep going from Using @capgo/capacitor-firebase-messaging

If you are using **Using @capgo/capacitor-firebase-messaging** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
