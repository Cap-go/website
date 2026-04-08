---
locale: en
---

# Using @capgo/capacitor-widget-kit

`@capgo/capacitor-widget-kit` brings WidgetKit and Live Activities to Capacitor through a generic SVG-template bridge. You store template definitions and state in the app, let the widget extension render them, and process action events back in JavaScript.

## Installation

```bash
bun add @capgo/capacitor-widget-kit
bunx cap sync
```

## iOS requirements

- Add the same App Group to the main app target and the widget extension target.
- Set `CapgoWidgetKitAppGroup` in both `Info.plist` files.
- Add `NSSupportsLiveActivities` to the app `Info.plist`.
- iOS 17 or later is recommended for interactive widget actions.

## Check support

```typescript
import { CapgoWidgetKit } from '@capgo/capacitor-widget-kit';

const { supported, reason } = await CapgoWidgetKit.areActivitiesSupported();

if (!supported) {
  console.warn(reason);
}
```

## Start a template activity

```typescript
import { CapgoWidgetKit } from '@capgo/capacitor-widget-kit';

const { activity } = await CapgoWidgetKit.startTemplateActivity({
  activityId: 'session-1',
  openUrl: 'widgetkitdemo://session/session-1',
  state: {
    title: 'Chest Day',
    count: 0,
    restDurationMs: 90000,
  },
  definition: {
    id: 'generic-session-card',
    timers: [
      {
        id: 'rest',
        durationPath: 'state.restDurationMs',
      },
    ],
    actions: [
      {
        id: 'complete-set',
        eventName: 'workout.set.completed',
        patches: [{ op: 'increment', path: 'count', amount: 1 }],
      },
    ],
    layouts: {
      lockScreen: {
        width: 100,
        height: 40,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40">
  <rect x="0" y="0" width="100" height="40" rx="6" fill="#05070b" />
  <text x="6" y="10" fill="#ffffff">{{state.title}}</text>
  <text x="6" y="30" fill="#00d69c">{{timers.rest.remainingText}}</text>
</svg>`,
      },
    },
  },
});
```

## Trigger an action and read the event log

```typescript
await CapgoWidgetKit.performTemplateAction({
  activityId: activity.activityId,
  actionId: 'complete-set',
  sourceId: 'app-complete-set-button',
});

const pendingEvents = await CapgoWidgetKit.listTemplateEvents({
  activityId: activity.activityId,
  unacknowledgedOnly: true,
});

console.log(pendingEvents.events);
```

## Practical advice

- Treat the widget extension as a renderer and keep business state in the app.
- Reuse the same declarative actions for widget hotspots and in-app buttons.
- Keep SVG templates simple and driven by state placeholders so updates stay predictable.
