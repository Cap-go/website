---
locale: en
---
# Using @capgo/capacitor-notifications

Send native iOS and Android push notifications from Capgo with user lookup, badges, foreground/open tracking, background callbacks, and silent Capgo live-update checks.

The plugin is built for the Capgo notification pipeline. Capgo stores platform credential metadata and campaign control data in Postgres, while active device state and delivery events are written to Cloudflare Analytics Engine.

## Install

This package is currently in private preview. Capgo must enable package access for your npm account before installation works.

Use the Capgo CLI for a guided setup:

```bash
npx @capgo/cli@latest notifications setup com.example.app
```

Manual install:

```bash
npm install @capgo/capacitor-notifications @capgo/capacitor-updater
npx cap sync
```

## Configure

```typescript
import { CapgoNotifications } from '@capgo/capacitor-notifications'

await CapgoNotifications.configure({
  appId: 'com.example.app',
  autoUpdater: true,
  updateInstallMode: 'next',
})
```

## Register A Signed User

Mint `identityProof` from your backend with `POST /notifications/recipients/proof`, then register the device after your own login succeeds.

```typescript
await CapgoNotifications.register({
  externalId: 'customer-user-123',
  identityProof,
  tags: ['paid'],
  attributes: { plan: 'team' },
  consent: true,
})
```

## Listen For Events

```typescript
await CapgoNotifications.addListener('notificationReceived', (notification) => {
  console.log('Received', notification)
})

await CapgoNotifications.addListener('notificationOpened', (event) => {
  console.log('Opened', event.notification.id)
})

await CapgoNotifications.addListener('backgroundNotification', async (event) => {
  try {
    console.log('Background payload', event.notification.data)
  } finally {
    await event.finish()
  }
})
```

## iOS Setup

Enable **Push Notifications** and **Background Modes > Remote notifications** in Xcode.

Forward remote notifications from `ios/App/App/AppDelegate.swift`:

```swift
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    NotificationCenter.default.post(name: Notification.Name("CapgoNotificationsRemoteNotification"), object: userInfo)
    completionHandler(.newData)
}
```

## Android Setup

Run `npx cap sync android`, configure Android platform credentials in Capgo, request notification permission on Android 13+, and test on a device or emulator with Google Play services.

## Debugging Checklist

- Run `npx @capgo/cli@latest notifications setup com.example.app` from the folder that contains `capacitor.config.*`.
- Search the recipient in Capgo by external customer ID.
- Confirm the device has platform `android` or `ios` and permission is granted.
- Add temporary listeners for `registrationChanged`, `notificationReceived`, `notificationOpened`, and `backgroundNotification`.
- Send a test notification from the dashboard.
- Check stats for queued, sent, received, and opened events.
- For silent update checks, verify `@capgo/capacitor-updater` is installed and `autoUpdater` is enabled.

## Full Reference

- Docs: /docs/plugins/notifications/
- Debugging: /docs/plugins/notifications/debugging/
- Source: https://github.com/Cap-go/capgo/tree/main/packages/capacitor-notifications/

## Keep going from Using @capgo/capacitor-notifications

If you are using **Using @capgo/capacitor-notifications** to plan native push messaging, connect it with [@capgo/capacitor-notifications](/docs/plugins/notifications/) for the implementation detail, [Debugging](/docs/plugins/notifications/debugging/) for troubleshooting, [@capgo/capacitor-updater](/docs/plugins/updater/) for silent update checks, and [Capgo Plugin Directory](/plugins/) for other native plugins.
