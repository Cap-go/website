---
locale: en
---
# Using @capgo/capacitor-accelerometer

Capacitor plugin contract for working with the device accelerometer.

## Install

```bash
bun add @capgo/capacitor-accelerometer
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getMeasurement` | Get the most recent accelerometer sample that was recorded by the native layer. |
| `isAvailable` | Check if the current device includes an accelerometer sensor. |
| `startMeasurementUpdates` | Begin streaming accelerometer updates to the JavaScript layer. |
| `stopMeasurementUpdates` | Stop streaming accelerometer updates started via . |
| `checkPermissions` | Return the current permission state for accessing motion data. |
| `requestPermissions` | Request permission to access motion data if supported by the platform. |

## Examples

### `getMeasurement()`

Get the most recent accelerometer sample that was recorded by the native layer.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

const result = await CapacitorAccelerometer.getMeasurement();
console.log(result);
```

### `isAvailable()`

Check if the current device includes an accelerometer sensor.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

const result = await CapacitorAccelerometer.isAvailable();
console.log(result);
```

### `startMeasurementUpdates()`

Begin streaming accelerometer updates to the JavaScript layer.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

await CapacitorAccelerometer.startMeasurementUpdates();
```

### `stopMeasurementUpdates()`

Stop streaming accelerometer updates started via .

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

await CapacitorAccelerometer.stopMeasurementUpdates();
```

### `checkPermissions()`

Return the current permission state for accessing motion data.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

const result = await CapacitorAccelerometer.checkPermissions();
console.log(result);
```

### `requestPermissions()`

Request permission to access motion data if supported by the platform.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

const result = await CapacitorAccelerometer.requestPermissions();
console.log(result);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorAccelerometer.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-accelerometer/)
- [Documentation](/docs/plugins/accelerometer/)
- [API reference](/docs/plugins/accelerometer/getting-started/)

## Keep going from Using @capgo/capacitor-accelerometer

If you are using **Using @capgo/capacitor-accelerometer** to plan dashboard and API operations, connect it with [@capgo/capacitor-accelerometer](/docs/plugins/accelerometer/) for the implementation detail in @capgo/capacitor-accelerometer, [Getting Started](/docs/plugins/accelerometer/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
