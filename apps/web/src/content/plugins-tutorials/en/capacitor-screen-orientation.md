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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';
```

## API at a glance

| Method | Description |
| --- | --- |
| `orientation` | Get the current screen orientation. |
| `lock` | Lock the screen orientation to a specific type. |
| `unlock` | Unlock the screen orientation. |
| `startOrientationTracking` | Start tracking device orientation using motion sensors. |
| `stopOrientationTracking` | Stop tracking device orientation using motion sensors. |
| `isOrientationLocked` | Check if device orientation lock is currently enabled. |
| `isDeviceFoldable` | Listen for screen orientation changes. |
| `getFoldState` | Read the current fold. |
| `getHingeAngle` | Read the hinge angle in degrees. |
| `getReservedRegions` | Read the fold and anything covering the screen. |
| `getBarPlacement` | Read where iPhone Duo puts native tab bars and toolbars. |
| `setVerticalBarBehavior` | Choose whether iPhone Duo may move this app's bars to the side. |
| `getSizeClass` | Read the window size classes. |

## Examples

### `orientation()`

Get the current screen orientation.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

const result = await ScreenOrientation.orientation();
console.log('Current orientation:', result.type);
```

### `lock()`

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

### `unlock()`

Unlock the screen orientation.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

await ScreenOrientation.unlock();
```

### `startOrientationTracking()`

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

### `stopOrientationTracking()`

Stop tracking device orientation using motion sensors.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

await ScreenOrientation.stopOrientationTracking();
```

### `isOrientationLocked()`

Check if device orientation lock is currently enabled.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

// Start motion tracking first
await ScreenOrientation.startOrientationTracking({
  bypassOrientationLock: true
});

// Check lock status
const status = await ScreenOrientation.isOrientationLocked();
if (status.locked) {
  console.log('Orientation lock is ON');
  console.log('Physical:', status.physicalOrientation);
  console.log('UI:', status.uiOrientation);
}
```

The [API reference](/docs/plugins/screen-orientation/getting-started/) covers the other 7 methods.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `ScreenOrientation.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-screen-orientation/)
- [Documentation](/docs/plugins/screen-orientation/)
- [API reference](/docs/plugins/screen-orientation/getting-started/)

## Keep going from Using @capgo/capacitor-screen-orientation

If you are using **Using @capgo/capacitor-screen-orientation** to plan native media and interface behavior, connect it with [@capgo/capacitor-screen-orientation](/docs/plugins/screen-orientation/) for the implementation detail in @capgo/capacitor-screen-orientation, [Getting Started](/docs/plugins/screen-orientation/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
