---
locale: en
---
# Using @capgo/capacitor-rich-notifications

Local notifications with Android channels, progress layouts, action buttons, scheduling, and iOS interruption levels.

## Install

```bash
bun add @capgo/capacitor-rich-notifications
bunx cap sync
```

## What This Plugin Exposes

- `checkPermission` - Check local notification permission status.
- `requestPermission` - Request local notification permission.
- `createChannel` - Create an Android notification channel.
- `createChannelGroup` - Create an Android channel group.
- `deleteChannel` - Delete an Android notification channel.
- `display` - Display a local notification immediately.
- `schedule` - Schedule a local notification for later.
- `cancel` - Cancel one notification by id.
- `cancelAll` - Cancel every notification managed by this plugin.
- `getDisplayed` - List notifications shown in the shade or center.
- `getPending` - List scheduled notifications not yet shown.
- `getInitialNotification` - Return the notification that opened the app, if any.
- `setBadge` - Set the app icon badge count on iOS.
- `registerActions` - Register a reusable action category.
- `getPluginVersion` - Returns the platform implementation version marker.
- `addListener` - Listen for press and dismiss events.

## Example Usage

### `requestPermission` and `display`

```typescript
import { RichNotifications } from '@capgo/capacitor-rich-notifications';

await RichNotifications.requestPermission();

await RichNotifications.createChannel({
  id: 'messages',
  name: 'Messages',
  importance: 'high',
});

await RichNotifications.display({
  title: 'Hello',
  body: 'Tap to open the app',
  channelId: 'messages',
});
```

### `schedule`

```typescript
import { RichNotifications } from '@capgo/capacitor-rich-notifications';

await RichNotifications.schedule({
  notification: {
    id: 'reminder-1',
    title: 'Reminder',
    body: 'Your appointment starts soon',
    channelId: 'messages',
  },
  trigger: { type: 'timestamp', timestamp: Date.now() + 60_000 },
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-rich-notifications/
- Docs: /docs/plugins/rich-notifications/
