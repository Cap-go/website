---
title: Getting Started
description: "Install @capgo/capacitor-device-info and read or stream device metrics in JavaScript."
sidebar:
  order: 2
---

## Compatibility

`@capgo/capacitor-device-info` requires Capacitor 8 or later (`@capacitor/core >=8.0.0`).

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-device-info` plugin in my project.
```

For a manual setup, install the package and sync the native projects:

```bash
npm install @capgo/capacitor-device-info
npx cap sync
```

## Import

```typescript
import { DeviceInfo } from '@capgo/capacitor-device-info';
```

## Read one snapshot

```typescript
const snapshot = await DeviceInfo.getInfo();

console.log(snapshot.cpu.cores);
console.log(snapshot.memory.usedPercent);
console.log(snapshot.storage.freeBytes);
console.log(snapshot.sensors?.pressureHpa);
```

`cpu.usagePercent` is delta-based. The first native sample can omit it; call `getInfo()` again later or use monitoring to receive populated CPU usage after the second sample.

## Stream updates

```typescript
const handle = await DeviceInfo.addListener('deviceInfoUpdate', (sample) => {
  console.log(sample.sequence, sample.elapsedMs);
  console.log(sample.cpu.usagePercent);
  console.log(sample.sensors?.readings);
});

const session = await DeviceInfo.startMonitoring({
  intervalMs: 1000,
  emitImmediately: true,
});

console.log(session.intervalMs, session.startedAt);
```

### Monitoring behavior

- `intervalMs` defaults to `1000` milliseconds. Values below `250` milliseconds are clamped to `250`.
- `emitImmediately` defaults to `true`.
- Set `durationMs` or `sampleCount` to stop monitoring automatically.
- Calling `startMonitoring()` while monitoring is active restarts the session with the new options.
- Every `deviceInfoUpdate` includes a one-based `sequence`, the session's `startedAt` timestamp, and `elapsedMs`.

## Stop updates and remove listeners

```typescript
await DeviceInfo.stopMonitoring();
await handle.remove();

// Or remove every listener registered on this plugin:
await DeviceInfo.removeAllListeners();
```

## Check monitoring state

```typescript
const state = await DeviceInfo.isMonitoring();

if (state.monitoring) {
  console.log(state.samplesEmitted);
}
```

## Onboard sensor fields

```typescript
const { sensors, cpu, gpu } = await DeviceInfo.getInfo();

console.log(cpu.temperatureCelsius);
console.log(gpu?.temperatureCelsius);
console.log(sensors?.batteryTemperatureCelsius);
console.log(sensors?.ambientTemperatureCelsius);
console.log(sensors?.relativeHumidityPercent);
console.log(sensors?.pressureHpa);
console.log(sensors?.illuminanceLux);
console.log(sensors?.proximityDistanceCm);
console.log(sensors?.availableSensors);
```

Sensor fields are optional. They are present only when the device, OS, and app sandbox expose that metric.

## Platform notes

- iOS requires no permissions for the exposed metrics. It reports CoreMotion sensor availability but not raw CPU or GPU temperature.
- Android requires no permissions for the exposed metrics. CPU and GPU temperatures are best-effort thermal-zone reads.
- Web support is best effort and reports empty onboard sensor arrays because browsers do not expose native device sensors consistently.

## API reference

| Method | Returns | Notes |
| --- | --- | --- |
| `getInfo()` | `Promise<DeviceInfoSnapshot>` | Reads one snapshot. |
| `startMonitoring(options?)` | `Promise<StartMonitoringResult>` | Starts periodic snapshots, or restarts an active session with new options. |
| `stopMonitoring()` | `Promise<StopMonitoringResult>` | Stops the active session. |
| `isMonitoring()` | `Promise<MonitoringState>` | Returns current session state. |
| `addListener('deviceInfoUpdate', listener)` | `Promise<PluginListenerHandle>` | Registers a periodic snapshot listener. |
| `removeAllListeners()` | `Promise<void>` | Removes every listener registered on the plugin. |
| `getPluginVersion()` | `Promise<PluginVersionResult>` | Reads the native plugin version. |

`PluginListenerHandle` is provided by Capacitor and has `remove()` for removing that individual listener.

### Snapshot types

```typescript
interface CpuInfo {
  cores: number;
  activeCores?: number;
  architecture?: string;
  model?: string;
  usagePercent?: number | null;
  maxFrequencyHz?: number;
  temperatureCelsius?: number;
}

interface MemoryInfo {
  totalBytes?: number;
  freeBytes?: number;
  usedBytes?: number;
  usedPercent?: number;
  appUsedBytes?: number;
  appLimitBytes?: number;
  lowMemory?: boolean;
  pressure?: 'normal' | 'warning' | 'critical' | 'unknown';
}

interface StorageInfo {
  totalBytes?: number;
  freeBytes?: number;
  usedBytes?: number;
  usedPercent?: number;
}

interface GpuInfo {
  api?: 'metal' | 'opengl' | 'webgl' | 'unknown';
  vendor?: string;
  renderer?: string;
  version?: string;
  maxTextureSize?: number;
  temperatureCelsius?: number;
}

type ThermalState = 'nominal' | 'fair' | 'serious' | 'critical' | 'unknown';

interface DeviceInfoSnapshot {
  timestamp: number;
  platform: 'ios' | 'android' | 'web';
  cpu: CpuInfo;
  memory: MemoryInfo;
  storage: StorageInfo;
  gpu?: GpuInfo;
  thermalState?: ThermalState;
  lowPowerMode?: boolean;
  sensors?: OnboardSensorsInfo;
}
```

Sizes are bytes, `maxFrequencyHz` is hertz, and temperature values are Celsius. `usagePercent` can be `null` until the platform has enough samples to calculate it.

### Sensor types

```typescript
interface OnboardSensorDescriptor {
  type: string;
  name?: string;
  vendor?: string;
  platformType?: number;
  maximumRange?: number;
  resolution?: number;
  powerMilliamp?: number;
  minDelayMicroseconds?: number;
  wakeUp?: boolean;
}

interface OnboardSensorReading {
  type: string;
  unit: string;
  value: number;
  name?: string;
  timestamp?: number;
}

interface OnboardSensorsInfo {
  availableSensors?: OnboardSensorDescriptor[];
  readings?: OnboardSensorReading[];
  batteryTemperatureCelsius?: number;
  ambientTemperatureCelsius?: number;
  relativeHumidityPercent?: number;
  pressureHpa?: number;
  illuminanceLux?: number;
  proximityDistanceCm?: number;
}
```

Sensor-reading timestamps are Unix epoch milliseconds. Common units are Celsius, percent, hPa, lux, and centimeters.

### Monitoring types

```typescript
interface MonitoringOptions {
  intervalMs?: number;
  durationMs?: number;
  sampleCount?: number;
  emitImmediately?: boolean;
}

interface StartMonitoringResult {
  monitoring: boolean;
  intervalMs: number;
  startedAt: number;
}

interface StopMonitoringResult {
  monitoring: boolean;
}

interface MonitoringState {
  monitoring: boolean;
  intervalMs?: number;
  startedAt?: number;
  samplesEmitted?: number;
}

interface DeviceInfoUpdate extends DeviceInfoSnapshot {
  sequence: number;
  startedAt: number;
  elapsedMs: number;
}

interface PluginVersionResult {
  version: string;
}
```

`startedAt`, `timestamp`, and `elapsedMs` are milliseconds. `sequence` starts at `1` for each monitoring session.

## Source of truth

This reference follows the public API in the plugin's [`src/definitions.ts`](https://github.com/Cap-go/capacitor-device-info/blob/main/src/definitions.ts). Update this page when that source changes.

## Keep going from Getting Started

If you are using **Getting Started** for device diagnostics, connect it with [@capgo/capacitor-device-info](/docs/plugins/device-info/) for the overview, [Using @capgo/capacitor-device-info](/plugins/capacitor-device-info/) for the tutorial page, [@capgo/capacitor-barometer](/docs/plugins/barometer/) for focused pressure readings, and [@capgo/capacitor-light-sensor](/docs/plugins/light-sensor/) for focused light sensor readings.
