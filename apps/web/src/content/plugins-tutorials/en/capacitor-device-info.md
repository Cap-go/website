---
locale: en
---
# Using @capgo/capacitor-device-info

Read CPU, memory, GPU, storage, thermal, low-power, and onboard sensor metrics from a Capacitor app.

## Install

```bash
bun add @capgo/capacitor-device-info
bunx cap sync
```

## What This Plugin Exposes

- `getInfo` - Read one snapshot with CPU, memory, GPU, storage, thermal state, low-power mode, and onboard sensors.
- `startMonitoring` - Start periodic snapshots for charts and diagnostics dashboards.
- `stopMonitoring` - Stop the active stream.
- `isMonitoring` - Check stream status and emitted sample count.
- `deviceInfoUpdate` - Listener event emitted for each periodic sample.

## Example Usage

```typescript
import { DeviceInfo } from '@capgo/capacitor-device-info';

const snapshot = await DeviceInfo.getInfo();

console.log(snapshot.cpu.cores);
console.log(snapshot.memory.usedPercent);
console.log(snapshot.gpu?.renderer);
console.log(snapshot.sensors?.pressureHpa);
```

## Stream Metrics Into A Chart

```typescript
import { DeviceInfo } from '@capgo/capacitor-device-info';

const samples: number[] = [];

const handle = await DeviceInfo.addListener('deviceInfoUpdate', (sample) => {
  if (typeof sample.cpu.usagePercent === 'number') {
    samples.push(sample.cpu.usagePercent);
  }
});

await DeviceInfo.startMonitoring({
  intervalMs: 1000,
  emitImmediately: true,
});

// Later:
await DeviceInfo.stopMonitoring();
await handle.remove();
```

## Onboard Sensor Notes

Sensor readings are optional because devices expose different hardware. Android can report battery temperature, ambient temperature, humidity, barometric pressure, light, proximity, and best-effort CPU/GPU thermal-zone values when available. iOS reports CoreMotion sensor availability, thermal state, and low-power state, but public iOS APIs do not expose raw CPU or GPU temperature.

The plugin does not fetch weather data. Outside temperature and humidity require a separate location and weather API integration.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-device-info/
- Docs: /docs/plugins/device-info/

## Keep Going

If you are using **@capgo/capacitor-device-info** to build diagnostics or monitoring screens, connect it with [@capgo/capacitor-device-info](/docs/plugins/device-info/) for the overview, [Getting Started](/docs/plugins/device-info/getting-started/) for install and API examples, [Using @capgo/capacitor-barometer](/plugins/capacitor-barometer/) for dedicated pressure streaming, and [Using @capgo/capacitor-light-sensor](/plugins/capacitor-light-sensor/) for dedicated light readings.
