---
title: Getting Started
description: "Install @capgo/capacitor-firebase-messaging and start using its current Capacitor API."
sidebar:
  order: 2
---

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-firebase-messaging` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
bun add @capgo/capacitor-firebase-messaging
bunx cap sync
```

## Import

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';
```

## API Overview

### `checkPermissions`

Check permission to receive push notifications.

On **Android**, this method only needs to be called on Android 13+.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.checkPermissions();
console.log(result);
```

### `requestPermissions`

Request permission to receive push notifications.

On **Android**, this method only needs to be called on Android 13+.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.requestPermissions();
console.log(result);
```

### `isSupported`

Checks if all required APIs exist.

Always returns `true` on Android and iOS.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.isSupported();
console.log(result);
```

### `getToken`

Register the app to receive push notifications.
Returns a FCM token that can be used to send push messages to that Messaging instance.

This method also re-enables FCM auto-init.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.getToken();
// The result holds sensitive values: use it without logging it.
```

### `deleteToken`

Delete the FCM token and unregister the app to stop receiving push notifications.
Can be called, for example, when a user signs out.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.deleteToken();
```

### `getDeliveredNotifications`

Get a list of notifications that are visible on the notifications screen.

Note: This will return all delivered notifications, including local notifications, and not just FCM notifications.

On Android, the data field of the FCM notification will NOT be included.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.getDeliveredNotifications();
console.log(result);
```

### `removeDeliveredNotifications`

Remove specific notifications from the notifications screen.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.removeDeliveredNotifications({ notifications: [] });
```

### `removeAllDeliveredNotifications`

Remove all notifications from the notifications screen.

Note: This will remove all delivered notifications, including local notifications, and not just FCM notifications.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.removeAllDeliveredNotifications();
```

### `subscribeToTopic`

Subscribes to topic in the background.

Only available for Android and iOS.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.subscribeToTopic({ topic: 'topic' });
```

### `unsubscribeFromTopic`

Unsubscribes from topic in the background.

Only available for Android and iOS.

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.unsubscribeFromTopic({ topic: 'topic' });
```

### `createChannel`

Create a notification channel.

Only available for Android (SDK 26+).

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.createChannel({
  id: 'id-123',
  name: 'example',
});
```

### `deleteChannel`

Delete a notification channel.

Only available for Android (SDK 26+).

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

await FirebaseMessaging.deleteChannel({ id: 'id-123' });
```

### `listChannels`

List the available notification channels.

Only available for Android (SDK 26+).

```typescript
import { FirebaseMessaging } from '@capgo/capacitor-firebase-messaging';

const result = await FirebaseMessaging.listChannels();
console.log(result);
```

## Type Reference

### `PermissionStatus`
```typescript
export interface PermissionStatus {
  /**
   * @since 0.2.2
   */
  receive: PermissionState;
}
```

### `IsSupportedResult`
```typescript
export interface IsSupportedResult {
  /**
   * @since 0.3.1
   */
  isSupported: boolean;
}
```

### `GetTokenOptions`
```typescript
export interface GetTokenOptions {
  /**
   * Your VAPID public key, which is required to retrieve the current registration token on the web.
   *
   * Only available for Web.
   */
  vapidKey?: string;
  /**
   * The service worker registration for receiving push messaging.
   * If the registration is not provided explicitly, you need to have a `firebase-messaging-sw.js` at your root location.
   *
   * Only available for Web.
   */
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}
```

### `GetTokenResult`
```typescript
export interface GetTokenResult {
  /**
   * @since 0.2.2
   */
  token: string;
}
```

### `GetDeliveredNotificationsResult`
```typescript
export interface GetDeliveredNotificationsResult {
  /**
   * @since 0.2.2
   */
  notifications: Notification[];
}
```

### `RemoveDeliveredNotificationsOptions`
```typescript
export interface RemoveDeliveredNotificationsOptions {
  /**
   * @since 0.4.0
   */
  notifications: Notification[];
}
```

### `SubscribeToTopicOptions`
```typescript
export interface SubscribeToTopicOptions {
  /**
   * The name of the topic to subscribe.
   *
   * @since 0.2.2
   */
  topic: string;
}
```

### `UnsubscribeFromTopicOptions`
```typescript
export interface UnsubscribeFromTopicOptions {
  /**
   * The name of the topic to unsubscribe from.
   *
   * @since 0.2.2
   */
  topic: string;
}
```

### `CreateChannelOptions`
```typescript
export type CreateChannelOptions = Channel;
```

### `DeleteChannelOptions`
```typescript
export interface DeleteChannelOptions {
  /**
   * The channel identifier.
   *
   * @since 1.4.0
   */
  id: string;
}
```

### `ListChannelsResult`
```typescript
export interface ListChannelsResult {
  channels: Channel[];
}
```

### `TokenReceivedListener`
Callback to receive the token received event.
```typescript
export type TokenReceivedListener = (event: TokenReceivedEvent) => void;
```

## Source Of Truth

This page is generated from the plugin's `src/definitions.ts`. Re-run the sync when the public API changes upstream.

## Keep going from Getting Started

If you are using **Getting Started** to plan dashboard and API operations, connect it with [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, [Devices](/docs/public-api/devices/) for the implementation detail in Devices, and [Bundles](/docs/public-api/bundles/) for the implementation detail in Bundles.
