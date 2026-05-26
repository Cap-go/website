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

## What This Plugin Exposes

- `getMeasurement` - Get the most recent barometer reading captured by the native layer.
- `isAvailable` - Check if the current device includes a barometer sensor.
- `startMeasurementUpdates` - Begin streaming barometer updates to the JavaScript layer.
- `stopMeasurementUpdates` - Stop the continuous updates started via .

## Example Usage

### `getMeasurement`

Get the most recent barometer reading captured by the native layer.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

await CapacitorBarometer.getMeasurement();
```

### `isAvailable`

Check if the current device includes a barometer sensor.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

await CapacitorBarometer.isAvailable();
```

### `startMeasurementUpdates`

Begin streaming barometer updates to the JavaScript layer.

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

await CapacitorBarometer.startMeasurementUpdates();
```

### `stopMeasurementUpdates`

Stop the continuous updates started via .

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

await CapacitorBarometer.stopMeasurementUpdates();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-barometer/
- Docs: /docs/plugins/barometer/

## Keep going from Using @capgo/capacitor-barometer

If you are using **Using @capgo/capacitor-barometer** to plan dashboard and API operations, connect it with [@capgo/capacitor-barometer](/docs/plugins/barometer/) for the implementation detail in @capgo/capacitor-barometer, [Getting Started](/docs/plugins/barometer/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
