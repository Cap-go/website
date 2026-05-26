---
locale: en
---
# Using @capgo/capacitor-screen-orientation

Capacitor Screen Orientation Plugin interface.

## Install

```bash
bun add @capgo/capacitor-screen-orientation
bunx cap sync
```

## What This Plugin Exposes

- `orientation` - Get the current screen orientation.
- `lock` - Lock the screen orientation to a specific type.
- `unlock` - Unlock the screen orientation.
- `startOrientationTracking` - Start tracking device orientation using motion sensors.

## Example Usage

### `orientation`

Get the current screen orientation.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

const result = await ScreenOrientation.orientation();
console.log('Current orientation:', result.type);
```

### `lock`

Lock the screen orientation to a specific type.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

// Standard lock
await ScreenOrientation.lock({ orientation: 'landscape' });

// Lock with motion tracking on iOS
await ScreenOrientation.lock({
  orientation: 'portrait',
  bypassOrientationLock: true
});
```

### `unlock`

Unlock the screen orientation.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

await ScreenOrientation.unlock();
```

### `startOrientationTracking`

Start tracking device orientation using motion sensors.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

await ScreenOrientation.startOrientationTracking({
  bypassOrientationLock: true
});

// Listen for changes
ScreenOrientation.addListener('screenOrientationChange', (result) => {
  console.log('Orientation changed:', result.type);
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-screen-orientation/
- Docs: /docs/plugins/screen-orientation/

## Keep going from Using @capgo/capacitor-screen-orientation

If you are using **Using @capgo/capacitor-screen-orientation** to plan native media and interface behavior, connect it with [@capgo/capacitor-screen-orientation](/docs/plugins/screen-orientation/) for the implementation detail in @capgo/capacitor-screen-orientation, [Getting Started](/docs/plugins/screen-orientation/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
