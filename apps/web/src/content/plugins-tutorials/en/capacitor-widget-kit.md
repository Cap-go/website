---
locale: en
---
# Using @capgo/capacitor-widget-kit

`@capgo/capacitor-widget-kit` lets a Capacitor app drive WidgetKit and Live Activity experiences in two ways:

- Render resolved SVG template surfaces with frame switching, tap hotspots, and pause/play timers.
- Keep the widget fully native while the app and widget share JSON session state and async messages.

## Install

```bash
bun add @capgo/capacitor-widget-kit
bunx cap sync
```

## When To Use SVG Templates

Use SVG templates when the widget surface can be described as SVG. The app stores a template definition, the native bridge resolves placeholders, and widget taps can mutate state later.

Good fits include workout timers, delivery status cards, sports scores, or any compact UI where switching between named frames is enough.

```typescript
import { CapgoWidgetKit } from '@capgo/capacitor-widget-kit';

const { activity } = await CapgoWidgetKit.startTemplateActivity({
  activityId: 'session-1',
  state: {
    title: 'Chest Day',
    frame: 'summary',
    restDurationMs: 90000,
  },
  definition: {
    id: 'workout-card',
    timers: [{ id: 'rest', durationPath: 'state.restDurationMs' }],
    actions: [
      {
        id: 'next-frame',
        frameMutations: [{ op: 'next', path: 'frame', surface: 'lockScreen' }],
      },
      {
        id: 'toggle-rest',
        timerMutations: [{ op: 'toggle', timerId: 'rest' }],
      },
    ],
    layouts: {
      lockScreen: {
        width: 100,
        height: 40,
        frameIdPath: 'state.frame',
        frames: [
          {
            id: 'summary',
            hotspots: [{ id: 'switch', actionId: 'next-frame', x: 0, y: 0, width: 100, height: 40 }],
            svg: `<svg viewBox="0 0 100 40"><text x="6" y="22">{{state.title}}</text></svg>`,
          },
          {
            id: 'timer',
            hotspots: [{ id: 'pause-play', actionId: 'toggle-rest', x: 0, y: 0, width: 100, height: 40 }],
            svg: `<svg viewBox="0 0 100 40"><text x="6" y="22">{{timers.rest.remainingText}}</text></svg>`,
          },
        ],
      },
    },
  },
});
```

## Handle Widget Actions In The App

Widget actions are persisted as events. Read and acknowledge them when the app resumes or after a background sync step.

```typescript
const { events } = await CapgoWidgetKit.listTemplateEvents({
  activityId: activity.activityId,
  unacknowledgedOnly: true,
});

for (const event of events) {
  console.log(event.actionId, event.state, event.timers);
}

await CapgoWidgetKit.acknowledgeTemplateEvents({ activityId: activity.activityId });
```

## When To Use Full-Native Sessions

Use full-native sessions when the widget UI is better built directly in Swift, Kotlin, or Java. Capacitor still starts and stops the session, keeps shared state current, and queues work between app and widget code.

```typescript
const { session } = await CapgoWidgetKit.startWidgetSession({
  widgetId: 'native-session-1',
  kind: 'workout-controls',
  state: { isRunning: true, selectedSetId: 'set-1' },
  metadata: { accent: '#00d69c' },
});

await CapgoWidgetKit.updateWidgetSession({
  widgetId: session.widgetId,
  merge: true,
  state: { isRunning: false },
});
```

## Queue Async Work Between Widget And App

Messages can flow from app to widget or widget to app. They stay pending until acknowledged and completed.

```typescript
const { message } = await CapgoWidgetKit.sendWidgetMessage({
  widgetId: session.widgetId,
  direction: 'widgetToApp',
  name: 'syncWorkoutSet',
  payload: { setId: 'set-1' },
  expectsResponse: true,
});

await CapgoWidgetKit.acknowledgeWidgetMessages({ messageIds: [message.messageId] });

await CapgoWidgetKit.completeWidgetMessage({
  messageId: message.messageId,
  response: { synced: true },
});
```

If the job fails, complete the message with an error:

```typescript
await CapgoWidgetKit.completeWidgetMessage({
  messageId: message.messageId,
  error: 'Sync failed',
});
```

## Stop Sessions Cleanly

```typescript
await CapgoWidgetKit.endTemplateActivity({
  activityId: activity.activityId,
  state: { title: 'Workout complete', frame: 'summary' },
});

await CapgoWidgetKit.stopWidgetSession({
  widgetId: session.widgetId,
  state: { isRunning: false },
});
```

## Native Setup Notes

For iOS WidgetKit and Live Activities, configure an App Group on the app and widget extension targets and set `CapgoWidgetKitAppGroup` in both `Info.plist` files. Interactive buttons require a widget extension that wires the plugin-provided native bridge and action intent.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-widget-kit/
- Docs: /docs/plugins/widget-kit/

## Keep going from Using @capgo/capacitor-widget-kit

If you are using **Using @capgo/capacitor-widget-kit** to plan native plugin work, connect it with [@capgo/capacitor-widget-kit](/docs/plugins/widget-kit/) for the implementation detail in @capgo/capacitor-widget-kit, [Getting Started](/docs/plugins/widget-kit/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
