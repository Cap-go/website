---
locale: en
---

# Using @capgo/capacitor-live-activities

`@capgo/capacitor-live-activities` lets a Capacitor app start, update, and end iOS Live Activities with a JSON-based layout definition. It is a good fit for delivery tracking, timers, ride progress, sports scores, and any flow that needs persistent lock-screen or Dynamic Island state.

## Installation

```bash
bun add @capgo/capacitor-live-activities
bunx cap sync
```

## Before you write code

- Live Activities require iOS 16.1 or later.
- Create a Widget Extension target in Xcode and share an App Group between the main app and the widget extension.
- Add `NSSupportsLiveActivities` to your app `Info.plist`.

## Check device support

```typescript
import { CapgoLiveActivities } from '@capgo/capacitor-live-activities';

const { supported, reason } = await CapgoLiveActivities.areActivitiesSupported();

if (!supported) {
  console.warn('Live Activities unavailable:', reason);
}
```

## Start an activity

```typescript
import { CapgoLiveActivities } from '@capgo/capacitor-live-activities';

const { activityId } = await CapgoLiveActivities.startActivity({
  layout: {
    type: 'container',
    direction: 'vertical',
    spacing: 8,
    children: [
      { type: 'text', content: 'Order #{{orderNumber}}', fontSize: 16, fontWeight: 'bold' },
      { type: 'text', content: '{{status}}', fontSize: 14, color: '#666666' },
      { type: 'progress', value: 'progress', tint: '#34C759' },
    ],
  },
  dynamicIslandLayout: {
    expanded: {
      center: { type: 'text', content: '{{status}}' },
      trailing: { type: 'text', content: '{{eta}}' },
    },
    compactLeading: { type: 'text', content: 'ETA' },
    compactTrailing: { type: 'text', content: '{{eta}}' },
    minimal: { type: 'text', content: '{{eta}}' },
  },
  behavior: {
    widgetUrl: 'myapp://orders/12345',
  },
  data: {
    orderNumber: '12345',
    status: 'On the way',
    eta: '10 min',
    progress: 0.6,
  },
});
```

## Update the activity

```typescript
await CapgoLiveActivities.updateActivity({
  activityId,
  data: {
    status: 'Arriving soon',
    eta: '2 min',
    progress: 0.9,
  },
});
```

## End the activity

```typescript
await CapgoLiveActivities.endActivity({
  activityId,
  data: {
    status: 'Delivered',
    progress: 1,
  },
  dismissalPolicy: 'after',
  dismissAfter: Date.now() + 60 * 60 * 1000,
});
```

## Practical advice

- Build your layout from stable state keys so updates only change data, not structure.
- Keep the widget extension focused on rendering and let your Capacitor app own activity state transitions.
- Always gate the feature behind `areActivitiesSupported()` so unsupported devices fall back cleanly.
