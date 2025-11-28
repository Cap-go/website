---
locale: en
---
# Using @capgo/capacitor-screen-orientation Package

The `@capgo/capacitor-screen-orientation` package allows you to control and detect screen orientation in your Capacitor app, with the unique ability to detect true physical device orientation using motion sensors - even when the device orientation lock is enabled.

## Installation

To install the `@capgo/capacitor-screen-orientation` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-screen-orientation
npx cap sync
```

## iOS Setup

To detect physical device orientation using motion sensors on iOS, you need to add the Motion Usage Description to your `Info.plist`:

```xml
<key>NSMotionUsageDescription</key>
<string>This app uses motion sensors to detect the true physical orientation of your device.</string>
```

## Android Setup

The `@capgo/capacitor-screen-orientation` package works out of the box on Android, so no additional setup is required.

## API

The `@capgo/capacitor-screen-orientation` package provides the following API methods:

### orientation()

Get the current screen orientation.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

async function getCurrentOrientation() {
  const result = await ScreenOrientation.orientation();
  console.log('Current orientation:', result.type);
  // Returns: 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'
}
```

### lock(options)

Lock the screen orientation to a specific type.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

// Lock to landscape
async function lockToLandscape() {
  await ScreenOrientation.lock({ orientation: 'landscape' });
  console.log('Orientation locked to landscape');
}

// Lock to portrait with physical orientation tracking
async function lockToPortraitWithTracking() {
  await ScreenOrientation.lock({
    orientation: 'portrait',
    bypassOrientationLock: true
  });
  console.log('Locked to portrait with motion tracking enabled');
}
```

Available orientation options:
- `'any'` - Any orientation
- `'natural'` - Natural orientation of the device
- `'landscape'` - Landscape mode
- `'portrait'` - Portrait mode
- `'portrait-primary'` - Portrait with home button at bottom
- `'portrait-secondary'` - Portrait upside down
- `'landscape-primary'` - Landscape with home button on right
- `'landscape-secondary'` - Landscape with home button on left

### unlock()

Unlock the screen orientation and allow it to rotate freely.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

async function unlockOrientation() {
  await ScreenOrientation.unlock();
  console.log('Orientation unlocked');
}
```

### startOrientationTracking(options)

Start tracking device orientation using motion sensors. This allows you to detect the true physical orientation of the device.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

async function startTracking() {
  await ScreenOrientation.startOrientationTracking({
    bypassOrientationLock: true
  });
  console.log('Motion-based orientation tracking started');
}
```

### stopOrientationTracking()

Stop the motion-based orientation tracking.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

async function stopTracking() {
  await ScreenOrientation.stopOrientationTracking();
  console.log('Motion-based orientation tracking stopped');
}
```

### isOrientationLocked()

Check if the device orientation lock is currently enabled by comparing physical vs UI orientation.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

async function checkOrientationLock() {
  const result = await ScreenOrientation.isOrientationLocked();

  if (result.locked) {
    console.log('Orientation lock is enabled');
    console.log('Physical orientation:', result.physicalOrientation);
    console.log('UI orientation:', result.uiOrientation);
  } else {
    console.log('Orientation lock is disabled or motion tracking not active');
  }
}
```

### addListener('screenOrientationChange', callback)

Listen for orientation changes.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

async function listenToOrientationChanges() {
  const listener = await ScreenOrientation.addListener(
    'screenOrientationChange',
    (result) => {
      console.log('Orientation changed to:', result.type);
    }
  );

  // Later, to remove the listener:
  await listener.remove();
}
```

### removeAllListeners()

Remove all registered listeners.

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

async function cleanup() {
  await ScreenOrientation.removeAllListeners();
  console.log('All listeners removed');
}
```

## Complete Example

Here's a complete example showing how to use all features of the plugin:

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

export class OrientationService {
  private listener: any = null;

  async initialize() {
    // Get current orientation
    const current = await ScreenOrientation.orientation();
    console.log('Initial orientation:', current.type);

    // Set up orientation change listener
    this.listener = await ScreenOrientation.addListener(
      'screenOrientationChange',
      (result) => {
        console.log('Orientation changed:', result.type);
        this.handleOrientationChange(result.type);
      }
    );

    // Start motion tracking to detect physical orientation
    await ScreenOrientation.startOrientationTracking({
      bypassOrientationLock: true
    });
  }

  handleOrientationChange(orientation: string) {
    // Update your UI based on orientation
    if (orientation.includes('landscape')) {
      // Show landscape-optimized UI
    } else {
      // Show portrait-optimized UI
    }
  }

  async lockToLandscape() {
    await ScreenOrientation.lock({ orientation: 'landscape' });
  }

  async lockToPortrait() {
    await ScreenOrientation.lock({ orientation: 'portrait' });
  }

  async unlock() {
    await ScreenOrientation.unlock();
  }

  async checkIfLocked() {
    const result = await ScreenOrientation.isOrientationLocked();
    return result.locked;
  }

  async cleanup() {
    await ScreenOrientation.stopOrientationTracking();
    if (this.listener) {
      await this.listener.remove();
    }
  }
}
```

## Key Features

1. **Physical Orientation Detection**: Unlike other screen orientation plugins, this one can detect the true physical orientation of the device using motion sensors, even when the user has enabled orientation lock on their device.

2. **Orientation Lock Detection**: By comparing the physical orientation (from sensors) with the UI orientation (from the system), you can determine if the user has enabled orientation lock.

3. **Cross-Platform Support**: Works on iOS (using Core Motion framework), Android (using accelerometer sensor), and Web.

4. **Real-time Updates**: Get instant notifications when the device orientation changes.

That's it! You have successfully learned how to use the `@capgo/capacitor-screen-orientation` package to control and detect screen orientation in your Capacitor app.
