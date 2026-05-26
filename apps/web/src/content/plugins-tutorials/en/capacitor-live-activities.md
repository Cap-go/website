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
