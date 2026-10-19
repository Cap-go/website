---
locale: en
---
# Using @capgo/capacitor-live-activities

Capacitor Live Activities Plugin interface for managing iOS Live Activities.

## Install

```bash
bun add @capgo/capacitor-live-activities
bunx cap sync
```

## iOS Setup

Installing and syncing the plugin does not create the native Live Activity UI. Before calling `startActivity`, configure ActivityKit in Xcode:

1. Run `bunx cap open ios`.
2. Add a **Widget Extension** target and enable **Include Live Activity**.
3. Set the app and Widget Extension deployment targets to iOS 16.1 or later.
4. Ensure the extension is embedded in the main app.
5. Keep an `ActivityConfiguration` registered in the extension's `WidgetBundle`, with Lock Screen and all Dynamic Island presentations.
6. Add `NSSupportsLiveActivities` to the main app target's `Info.plist`.

```xml
<key>NSSupportsLiveActivities</key>
<true/>
```

Adding the target alone is not sufficient. The native app or plugin must call ActivityKit's request, update, and end APIs. The Widget Extension must contain SwiftUI code that can decode and render the same `ActivityAttributes` and content state used by those calls. Include shared ActivityKit models in both the main app and Widget Extension targets. The Xcode-generated Live Activity template does not automatically render the JSON layouts passed to this plugin; the extension also needs a compatible native layout renderer.

### Shared Images

When using the image-management methods, add the **App Groups** capability to the main app and Widget Extension targets. Enable the same group on both targets using the exact identifier expected by the plugin:

```text
group.<MAIN_APP_BUNDLE_ID>.liveactivities
```

Live Activity extensions cannot access the network. Download remote images in the main app, save them to the shared App Group with `saveImage`, and then reference the saved image from the layout. Bundled assets must also belong to the Widget Extension target.

### Deep Links and Push Updates

- Register any custom URL scheme used by `behavior.widgetUrl` or `tapUrl` under the main app target's **Info > URL Types** settings.
- For server-driven updates, add the **Push Notifications** capability and implement ActivityKit push-token handling with APNs.
- Add `NSSupportsLiveActivitiesFrequentUpdates` only when the app requires frequent ActivityKit push updates.

Enabling the Push Notifications capability alone is not sufficient; server-driven updates require native token handling and an APNs backend.

ActivityKit limits the combined static and dynamic Live Activity data to 4 KB. The Dynamic Island is only visible on supported device models; other devices use the Lock Screen presentation.

## What This Plugin Exposes

- `areActivitiesSupported` - Check if Live Activities are supported on this device. Requires iOS 16.1+ and device support.
- `startActivity` - Start a new Live Activity with the specified layout and data.
- `updateActivity` - Update an existing Live Activity with new data.
- `endActivity` - End a Live Activity.

## Example Usage

### `areActivitiesSupported`

Check if Live Activities are supported on this device. Requires iOS 16.1+ and device support.

```typescript
import { CapgoLiveActivities } from '@capgo/capacitor-live-activities';

const { supported, reason } = await CapgoLiveActivities.areActivitiesSupported();
if (supported) {
  console.log('Live Activities are supported!');
} else {
  console.log('Not supported:', reason);
}
```

### `startActivity`

Start a new Live Activity with the specified layout and data.

```typescript
import { CapgoLiveActivities } from '@capgo/capacitor-live-activities';

const { activityId } = await CapgoLiveActivities.startActivity({
  layout: {
    type: 'container',
    direction: 'horizontal',
    children: [
      { type: 'text', content: 'Order #{{orderNumber}}', fontSize: 16, fontWeight: 'bold' },
      { type: 'text', content: '{{status}}', fontSize: 14, color: '#666666' }
    ]
  },
  dynamicIslandLayout: {
    expanded: {
      leading: { type: 'image', source: 'sfSymbol', value: 'box.truck' },
      trailing: { type: 'text', content: '{{eta}}' },
      center: { type: 'text', content: '{{status}}' },
      bottom: { type: 'progress', value: 'progress' }
    },
    compactLeading: { type: 'image', source: 'sfSymbol', value: 'box.truck' },
    compactTrailing: { type: 'text', content: '{{eta}}' },
    minimal: { type: 'image', source: 'sfSymbol', value: 'box.truck' }
  },
  data: {
    orderNumber: '12345',
    status: 'On the way',
    eta: '10 min',
    progress: 0.6
  }
});
console.log('Started activity:', activityId);
```

### `updateActivity`

Update an existing Live Activity with new data.

```typescript
import { CapgoLiveActivities } from '@capgo/capacitor-live-activities';

await CapgoLiveActivities.updateActivity({
  activityId: 'abc123',
  data: {
    status: 'Arrived!',
    eta: 'Now',
    progress: 1.0
  },
  alertConfiguration: {
    title: 'Delivery Update',
    body: 'Your order has arrived!'
  }
});
```

### `endActivity`

End a Live Activity.

```typescript
import { CapgoLiveActivities } from '@capgo/capacitor-live-activities';

await CapgoLiveActivities.endActivity({
  activityId: 'abc123',
  data: { status: 'Delivered' },
  dismissalPolicy: 'after',
  dismissAfter: Date.now() + 3600000 // 1 hour from now
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-live-activities/
- Docs: /docs/plugins/live-activities/

## Keep going from Using @capgo/capacitor-live-activities

If you are using **Using @capgo/capacitor-live-activities** to plan native media and interface behavior, connect it with [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, [Getting Started](/docs/plugins/live-activities/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player, [@capgo/capacitor-video-player](/docs/plugins/video-player/) for the implementation detail in @capgo/capacitor-video-player, and [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for the native capability in Using @capgo/capacitor-native-navigation.
