---
locale: en
---
# Using @capgo/capacitor-light-sensor

Capacitor plugin for accessing the device's ambient light sensor.

## Install

```bash
bun add @capgo/capacitor-light-sensor
bunx cap sync
```

## What This Plugin Exposes

- `isAvailable` - Check if the light sensor is available on the current device. You should always check sensor availability before attempting to use it.
- `start` - Start listening to light sensor updates. This will begin sensor measurements at the specified interval. Use `addListener` to receive the sensor data.
- `stop` - Stop listening to light sensor updates. This will stop the sensor and conserve battery.
- `checkPermissions` - Check the current permission status for high sampling rate sensors. On Android 12+, the HIGH_SAMPLING_RATE_SENSORS permission is required for sensor update intervals below 200ms.

## Example Usage

### `isAvailable`

Check if the light sensor is available on the current device. You should always check sensor availability before attempting to use it.

```typescript
import { LightSensor } from '@capgo/capacitor-light-sensor';

const { available } = await LightSensor.isAvailable();
```

### `start`

Start listening to light sensor updates. This will begin sensor measurements at the specified interval. Use `addListener` to receive the sensor data.

```typescript
import { LightSensor } from '@capgo/capacitor-light-sensor';

await LightSensor.start({ updateInterval: 500 });
```

### `stop`

Stop listening to light sensor updates. This will stop the sensor and conserve battery.

```typescript
import { LightSensor } from '@capgo/capacitor-light-sensor';

await LightSensor.stop();
```

### `checkPermissions`

Check the current permission status for high sampling rate sensors. On Android 12+, the HIGH_SAMPLING_RATE_SENSORS permission is required for sensor update intervals below 200ms.

```typescript
import { LightSensor } from '@capgo/capacitor-light-sensor';

const status = await LightSensor.checkPermissions();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-light-sensor/
- Docs: /docs/plugins/light-sensor/

## Keep going from Using @capgo/capacitor-light-sensor

If you are using **Using @capgo/capacitor-light-sensor** to plan dashboard and API operations, connect it with [@capgo/capacitor-light-sensor](/docs/plugins/light-sensor/) for the implementation detail in @capgo/capacitor-light-sensor, [Getting Started](/docs/plugins/light-sensor/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
