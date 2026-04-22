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
