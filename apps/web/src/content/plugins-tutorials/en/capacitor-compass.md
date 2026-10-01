---
locale: en
---
# Using @capgo/capacitor-compass

Capacitor Compass Plugin interface for reading device compass heading.

## Install

```bash
bun add @capgo/capacitor-compass
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getCurrentHeading` | Get the current compass heading in degrees. On iOS, the heading is updated in the background, and the latest value is returned. On Android, the heading is calculated when the method is called using accelerometer and magnetometer sensors. Not implemented on Web. |
| `startListening` | Start listening for compass heading changes via events. This starts the compass sensors and emits 'headingChange' events. |
| `stopListening` | Stop listening for compass heading changes. This stops the compass sensors and stops emitting events. |
| `checkPermissions` | Check the current permission status for accessing compass data. On iOS, this checks location permission status. On Android, this always returns 'granted' as no permissions are required. |
| `requestPermissions` | Request permission to access compass data. On iOS, this requests location permission (required for heading data). On Android, this resolves immediately as no permissions are required. |
| `watchAccuracy` | Start monitoring compass accuracy. On Android, this monitors the magnetometer accuracy and emits accuracyChange events. Developers can listen to these events and implement their own UI for calibration prompts. On iOS and Web, this method does nothing as compass accuracy monitoring is not available. |
| `unwatchAccuracy` | Stop monitoring compass accuracy. This stops the accuracy monitoring. |
| `getAccuracy` | Get the current compass accuracy level. On Android, returns the current magnetometer sensor accuracy. On iOS and Web, always returns CompassAccuracy.UNKNOWN as accuracy monitoring is not available. |

## Examples

### `getCurrentHeading()`

Get the current compass heading in degrees. On iOS, the heading is updated in the background, and the latest value is returned. On Android, the heading is calculated when the method is called using accelerometer and magnetometer sensors. Not implemented on Web.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

const { value } = await CapgoCompass.getCurrentHeading();
console.log('Compass heading:', value, 'degrees');
```

### `startListening()`

Start listening for compass heading changes via events. This starts the compass sensors and emits 'headingChange' events.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

// With default throttling (100ms interval, 2° minimum change)
await CapgoCompass.startListening();

// With custom throttling for high-frequency updates
await CapgoCompass.startListening({
  minInterval: 50,      // 50ms between events
  minHeadingChange: 1.0 // 1° minimum change
});

CapgoCompass.addListener('headingChange', (event) => {
  console.log('Heading:', event.value);
});
```

### `stopListening()`

Stop listening for compass heading changes. This stops the compass sensors and stops emitting events.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

await CapgoCompass.stopListening();
```

### `checkPermissions()`

Check the current permission status for accessing compass data. On iOS, this checks location permission status. On Android, this always returns 'granted' as no permissions are required.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

const status = await CapgoCompass.checkPermissions();
console.log('Compass permission:', status.compass);
```

### `requestPermissions()`

Request permission to access compass data. On iOS, this requests location permission (required for heading data). On Android, this resolves immediately as no permissions are required.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

const status = await CapgoCompass.requestPermissions();
if (status.compass === 'granted') {
  // Can now use compass
}
```

### `watchAccuracy()`

Start monitoring compass accuracy. On Android, this monitors the magnetometer accuracy and emits accuracyChange events. Developers can listen to these events and implement their own UI for calibration prompts. On iOS and Web, this method does nothing as compass accuracy monitoring is not available.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

// Start monitoring accuracy
await CapgoCompass.watchAccuracy();

// Listen for accuracy changes and implement custom UI
CapgoCompass.addListener('accuracyChange', (event) => {
  console.log('Accuracy changed to:', event.accuracy);
  if (event.accuracy < CompassAccuracy.MEDIUM) {
    // Show your custom calibration UI
  }
});
```

The table above lists all 8 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-compass/) for the full contract of each one.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapgoCompass.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-compass/)
- [Documentation](/docs/plugins/compass/)
- [API reference](/docs/plugins/compass/getting-started/)

## Keep going from Using @capgo/capacitor-compass

If you are using **Using @capgo/capacitor-compass** to plan dashboard and API operations, connect it with [@capgo/capacitor-compass](/docs/plugins/compass/) for the implementation detail in @capgo/capacitor-compass, [Getting Started](/docs/plugins/compass/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
