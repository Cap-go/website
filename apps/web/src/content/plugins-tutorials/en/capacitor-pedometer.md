---
locale: en
---
# Using @capgo/capacitor-pedometer

Capacitor plugin for accessing pedometer data including steps, distance, pace, cadence, and floors.

## Install

```bash
bun add @capgo/capacitor-pedometer
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getMeasurement` | Get pedometer measurements for a specified time range. |
| `isAvailable` | Check which pedometer features are available on this device. |
| `startMeasurementUpdates` | Start receiving real-time pedometer measurement updates. |
| `stopMeasurementUpdates` | Stop receiving real-time pedometer measurement updates. |
| `checkPermissions` | Check permission to access pedometer data. |
| `requestPermissions` | Request permission to access pedometer data. |

## Examples

### `getMeasurement()`

Get pedometer measurements for a specified time range.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

const result = await CapacitorPedometer.getMeasurement();
console.log(result);
```

### `isAvailable()`

Check which pedometer features are available on this device.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

const result = await CapacitorPedometer.isAvailable();
console.log(result);
```

### `startMeasurementUpdates()`

Start receiving real-time pedometer measurement updates.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

await CapacitorPedometer.startMeasurementUpdates();
```

### `stopMeasurementUpdates()`

Stop receiving real-time pedometer measurement updates.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

await CapacitorPedometer.stopMeasurementUpdates();
```

### `checkPermissions()`

Check permission to access pedometer data.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

const result = await CapacitorPedometer.checkPermissions();
console.log(result);
```

### `requestPermissions()`

Request permission to access pedometer data.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

const result = await CapacitorPedometer.requestPermissions();
console.log(result);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorPedometer.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-pedometer/)
- [Documentation](/docs/plugins/pedometer/)
- [API reference](/docs/plugins/pedometer/getting-started/)

## Keep going from Using @capgo/capacitor-pedometer

If you are using **Using @capgo/capacitor-pedometer** to plan native plugin work, connect it with [@capgo/capacitor-pedometer](/docs/plugins/pedometer/) for the implementation detail in @capgo/capacitor-pedometer, [Getting Started](/docs/plugins/pedometer/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
