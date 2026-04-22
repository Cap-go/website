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

## What This Plugin Exposes

- `getMeasurement` - Get the most recent accelerometer sample that was recorded by the native layer.
- `isAvailable` - Check if the current device includes an accelerometer sensor.
- `startMeasurementUpdates` - Begin streaming accelerometer updates to the JavaScript layer.
- `stopMeasurementUpdates` - Stop streaming accelerometer updates started via .

## Example Usage

### `getMeasurement`

Get the most recent accelerometer sample that was recorded by the native layer.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

await CapacitorAccelerometer.getMeasurement();
```

### `isAvailable`

Check if the current device includes an accelerometer sensor.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

await CapacitorAccelerometer.isAvailable();
```

### `startMeasurementUpdates`

Begin streaming accelerometer updates to the JavaScript layer.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

await CapacitorAccelerometer.startMeasurementUpdates();
```

### `stopMeasurementUpdates`

Stop streaming accelerometer updates started via .

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

await CapacitorAccelerometer.stopMeasurementUpdates();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-accelerometer/
- Docs: /docs/plugins/accelerometer/
