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

## What This Plugin Exposes

- `getMeasurement` - Get pedometer measurements for a specified time range.
- `isAvailable` - Check which pedometer features are available on this device.
- `startMeasurementUpdates` - Start receiving real-time pedometer measurement updates.
- `stopMeasurementUpdates` - Stop receiving real-time pedometer measurement updates.

## Example Usage

### `getMeasurement`

Get pedometer measurements for a specified time range.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

await CapacitorPedometer.getMeasurement();
```

### `isAvailable`

Check which pedometer features are available on this device.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

await CapacitorPedometer.isAvailable();
```

### `startMeasurementUpdates`

Start receiving real-time pedometer measurement updates.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

await CapacitorPedometer.startMeasurementUpdates();
```

### `stopMeasurementUpdates`

Stop receiving real-time pedometer measurement updates.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

await CapacitorPedometer.stopMeasurementUpdates();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-pedometer/
- Docs: /docs/plugins/pedometer/
