---
locale: en
---
# Using @capgo/capacitor-barometer

Capacitor plugin contract for working with the device barometer sensor.

## Install

```bash
bun add @capgo/capacitor-barometer
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getMeasurement` | Get the most recent barometer reading captured by the native layer. |
| `isAvailable` | Check if the current device includes a barometer sensor. |
| `startMeasurementUpdates` | Begin streaming barometer updates to the JavaScript layer. |
| `stopMeasurementUpdates` | Stop the continuous updates started via . |
| `checkPermissions` | Return the current permission state for accessing barometer data. |
| `requestPermissions` | Request permission to access barometer data if required by the platform. |

## Examples

### `getMeasurement()`

Get the most recent barometer reading captured by the native layer.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

const result = await CapacitorBarometer.getMeasurement();
console.log(result);
```

### `isAvailable()`

Check if the current device includes a barometer sensor.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

const result = await CapacitorBarometer.isAvailable();
console.log(result);
```

### `startMeasurementUpdates()`

Begin streaming barometer updates to the JavaScript layer.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

await CapacitorBarometer.startMeasurementUpdates();
```

### `stopMeasurementUpdates()`

Stop the continuous updates started via .

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

await CapacitorBarometer.stopMeasurementUpdates();
```

### `checkPermissions()`

Return the current permission state for accessing barometer data.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

const result = await CapacitorBarometer.checkPermissions();
console.log(result);
```

### `requestPermissions()`

Request permission to access barometer data if required by the platform.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

const result = await CapacitorBarometer.requestPermissions();
console.log(result);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorBarometer.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-barometer/)
- [Documentation](/docs/plugins/barometer/)
- [API reference](/docs/plugins/barometer/getting-started/)

## Keep going from Using @capgo/capacitor-barometer

If you are using **Using @capgo/capacitor-barometer** to plan dashboard and API operations, connect it with [@capgo/capacitor-barometer](/docs/plugins/barometer/) for the implementation detail in @capgo/capacitor-barometer, [Getting Started](/docs/plugins/barometer/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
