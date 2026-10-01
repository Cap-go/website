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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';
```

## API at a glance

| Method | Description |
| --- | --- |
| `checkPermissions` | Check permission to receive push notifications. |
| `requestPermissions` | Request permission to receive push notifications. |
| `isSupported` | Checks if all required APIs exist. |
| `getToken` | Register the app to receive push notifications. Returns a FCM token that can be used to send push messages to that Messaging instance. |
| `deleteToken` | Delete the FCM token and unregister the app to stop receiving push notifications. Can be called, for example, when a user signs out. |
| `getDeliveredNotifications` | Get a list of notifications that are visible on the notifications screen. |
| `removeDeliveredNotifications` | Remove specific notifications from the notifications screen. |
| `removeAllDeliveredNotifications` | Remove all notifications from the notifications screen. |
| `subscribeToTopic` | Subscribes to topic in the background. |
| `unsubscribeFromTopic` | Unsubscribes from topic in the background. |
| `createChannel` | Create a notification channel. |
| `deleteChannel` | Delete a notification channel. |
| `listChannels` | List the available notification channels. |

## Examples

### `checkPermissions()`

Check permission to receive push notifications.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.checkPermissions();
console.log(result);
```

### `requestPermissions()`

Request permission to receive push notifications.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.requestPermissions();
console.log(result);
```

### `isSupported()`

Checks if all required APIs exist.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.isSupported();
console.log(result);
```

### `getToken()`

Register the app to receive push notifications. Returns a FCM token that can be used to send push messages to that Messaging instance.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.getToken();
// The result holds sensitive values: use it without logging it.
```

### `deleteToken()`

Delete the FCM token and unregister the app to stop receiving push notifications. Can be called, for example, when a user signs out.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.deleteToken();
```

### `getDeliveredNotifications()`

Get a list of notifications that are visible on the notifications screen.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.getDeliveredNotifications();
console.log(result);
```

The table above lists all 13 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/messaging) for the full contract of each one.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `FirebaseMessaging.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/messaging)
- [Documentation](/docs/plugins/firebase-messaging/)
- [API reference](/docs/plugins/firebase-messaging/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-messaging

If you are using **Using @capgo/capacitor-firebase-messaging** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
