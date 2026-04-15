---
locale: en
---
# Using @capgo/capacitor-proximity Package

The `@capgo/capacitor-proximity` package enables native proximity monitoring in Capacitor apps. It gives you a small API to check sensor availability, enable monitoring for a focused flow, disable it when the flow ends, and read the native plugin version for debugging.

This is useful for near-ear interfaces, privacy screens, or any experience that should react when the device is close to a face, hand, pocket, or flat surface.

## Installation

Install the package in your Capacitor project:

```bash
bun add @capgo/capacitor-proximity
bunx cap sync
```

## How the plugin behaves

### iOS

On iOS, the plugin toggles `UIDevice.isProximityMonitoringEnabled`. Once enabled, iOS manages the actual display behavior.

### Android

On Android, the plugin listens to `Sensor.TYPE_PROXIMITY`. When the sensor is covered, it dims the current app window. When the sensor is no longer covered, the window returns to normal.

### Web

The plugin is not available on the web, so `getStatus()` returns `available: false`.

## Basic usage

Import the plugin and check the current status before enabling it:

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

async function setupProximity() {
  const status = await CapacitorProximity.getStatus();

  if (!status.available) {
    console.warn('No proximity sensor on this device');
    return;
  }

  console.log('Platform:', status.platform);
  console.log('Already enabled:', status.enabled);
}
```

When you need the feature, enable it only for that flow:

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

async function startNearEarFlow() {
  const status = await CapacitorProximity.getStatus();

  if (!status.available) {
    return;
  }

  await CapacitorProximity.enable();

  try {
    console.log('Proximity monitoring enabled');
    // Handle the interaction here.
  } finally {
    await CapacitorProximity.disable();
  }
}
```

## Example service

Here is a small service you can reuse in an Ionic or Capacitor app:

```typescript
import { App } from '@capacitor/app';
import { CapacitorProximity } from '@capgo/capacitor-proximity';

export class ProximityService {
  private active = false;

  async init() {
    const status = await CapacitorProximity.getStatus();

    if (!status.available) {
      console.warn('Proximity sensor is unavailable');
      return false;
    }

    App.addListener('appStateChange', async ({ isActive }) => {
      if (!this.active) {
        return;
      }

      if (isActive) {
        await CapacitorProximity.enable();
        return;
      }

      await CapacitorProximity.disable();
    });

    return true;
  }

  async start() {
    if (this.active) {
      return;
    }

    await CapacitorProximity.enable();
    this.active = true;
  }

  async stop() {
    if (!this.active) {
      return;
    }

    await CapacitorProximity.disable();
    this.active = false;
  }

  async logVersion() {
    const { version } = await CapacitorProximity.getPluginVersion();
    console.log('Plugin version:', version);
  }
}
```

## API summary

### `enable()`

Turns proximity monitoring on.

```typescript
await CapacitorProximity.enable();
```

### `disable()`

Turns proximity monitoring off and restores the default app behavior.

```typescript
await CapacitorProximity.disable();
```

### `getStatus()`

Returns whether the sensor is available and whether monitoring is currently enabled.

```typescript
const status = await CapacitorProximity.getStatus();

interface ProximityStatusResult {
  available: boolean;
  enabled: boolean;
  platform: 'ios' | 'android' | 'web';
}
```

### `getPluginVersion()`

Returns the native plugin version string.

```typescript
const { version } = await CapacitorProximity.getPluginVersion();
```

## Best practices

### Check support before enabling

Always verify the device exposes a proximity sensor:

```typescript
const status = await CapacitorProximity.getStatus();
if (!status.available) {
  return;
}
```

### Keep the feature scoped

Do not leave proximity monitoring enabled for the entire app session unless you really need it. Start it for the exact flow, then stop it.

### Test on real hardware

Most simulators and desktop browsers do not provide a real proximity sensor, so test this feature on physical iOS and Android devices.

### Clean up on exit

Disable the plugin in cleanup paths, page teardown, or when the app goes to the background:

```typescript
await CapacitorProximity.disable();
```

## Conclusion

`@capgo/capacitor-proximity` gives your Capacitor app a small, native-first way to react to proximity events without building separate platform code yourself. Use it when you need near-ear flows, privacy dimming, or controlled proximity monitoring in iOS and Android.

For more details, read the [official documentation](https://capgo.app/docs/plugins/proximity/) or visit the [GitHub repository](https://github.com/Cap-go/capacitor-proximity).
