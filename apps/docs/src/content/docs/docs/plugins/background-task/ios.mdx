---
title: iOS setup
description: "Configure BGTaskScheduler for @capgo/capacitor-background-task on iOS."
sidebar:
  order: 3
---

iOS background processing uses `BGTaskScheduler`. The app must declare the background mode and the permitted task identifier before scheduling can work on a physical device.

## Info.plist

Add these keys to `ios/App/App/Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>processing</string>
</array>
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
  <string>app.capgo.backgroundtask.processing</string>
</array>
```

## Sync

```bash
npx cap sync ios
```

## Behavior

- `minimumInterval` is mapped to `earliestBeginDate`.
- iOS decides the actual run time based on battery, network, usage patterns, and system policy.
- Background task execution does not run reliably in the simulator. Test on a physical device.
- The plugin re-schedules the next background processing request after each task launch.

## Expiration

Use `addExpirationListener` when work needs cleanup if iOS ends the task early.

```typescript
const handle = await BackgroundTask.addExpirationListener((event) => {
  console.warn('Task expired', event.taskName);
});

await handle.remove();
```

## Keep going from iOS setup

If you are using **iOS setup** to plan native plugin work, connect it with [Using @capgo/capacitor-background-task](/plugins/capacitor-background-task/) for the native capability in Using @capgo/capacitor-background-task, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
