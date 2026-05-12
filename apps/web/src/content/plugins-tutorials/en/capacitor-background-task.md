---
locale: en
---
# Using @capgo/capacitor-background-task

Schedule periodic background fetch work in a Capacitor app with named tasks, persistent registration, status checks, unregistering, and a development trigger. The plugin uses Android WorkManager and iOS BGTaskScheduler.

## Install

```bash
npm install @capgo/capacitor-background-task
npx cap sync
```

## iOS Setup

Add background processing support to `ios/App/App/Info.plist`:

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

Then run:

```bash
npx cap sync ios
```

## What This Plugin Exposes

- `defineTask` - Define the JavaScript callback for a named task.
- `registerTaskAsync` - Persist and schedule a periodic task.
- `unregisterTaskAsync` - Cancel one task.
- `isTaskRegisteredAsync` - Check one task's registration state.
- `getRegisteredTasksAsync` - List registered task names.
- `getStatusAsync` - Check native background task availability.
- `triggerTaskWorkerForTestingAsync` - Trigger registered tasks immediately for development.
- `addExpirationListener` - React when iOS expires a task.

## Example Usage

Define the task at module scope so it is available when the OS wakes the app:

```typescript
import { BackgroundTask, BackgroundTaskResult } from '@capgo/capacitor-background-task';

const SYNC_TASK = 'sync-offline-data';

BackgroundTask.defineTask(SYNC_TASK, async () => {
  try {
    await fetch('https://api.example.com/sync', { method: 'POST' });
    return BackgroundTaskResult.Success;
  } catch {
    return BackgroundTaskResult.Failed;
  }
});

await BackgroundTask.registerTaskAsync(SYNC_TASK, {
  minimumInterval: 30,
  requiresNetwork: true,
});
```

Check status and registered task names:

```typescript
const status = await BackgroundTask.getStatusAsync();
const tasks = await BackgroundTask.getRegisteredTasksAsync();

console.log({ status, tasks });
```

Trigger a development run:

```typescript
await BackgroundTask.triggerTaskWorkerForTestingAsync();
```

Cancel the task:

```typescript
await BackgroundTask.unregisterTaskAsync(SYNC_TASK);
```

## Platform Notes

- Background task schedules are opportunistic, not exact timers.
- Android periodic work has a 15 minute minimum interval.
- iOS treats `minimumInterval` as an earliest begin date and may run later.
- Test iOS background processing on a physical device.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-background-task/
- Docs: /docs/plugins/background-task/
