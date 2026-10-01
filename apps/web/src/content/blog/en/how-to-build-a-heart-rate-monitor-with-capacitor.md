---
slug: how-to-build-a-heart-rate-monitor-with-capacitor
title: "How to Build a Heart Rate Monitor with Capacitor"
description: "Build a heart rate monitor with Capacitor and Bluetooth Low Energy: scan for 0x180D sensors, parse BPM and RR intervals, and save readings to Health."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Capacitor app showing live heart rate from a Bluetooth chest strap"
keywords: capacitor heart rate monitor, capacitor bluetooth low energy, ble heart rate service, 0x180D, 0x2A37 heart rate measurement, ionic ble, capacitor ble plugin, polar h10 capacitor
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Which heart rate sensors work with this Capacitor app?"
    answer: "Any sensor that implements the standard Bluetooth SIG Heart Rate Service (UUID 0x180D), which covers most chest straps (Polar H9 and H10, Garmin HRM series, Wahoo TICKR) and many armbands. Many smartwatches can broadcast heart rate over BLE too, but usually only when the user enables a broadcast mode."
  - question: "Do I need a real device to build a BLE heart rate monitor?"
    answer: "Yes. The iOS Simulator has no Bluetooth, and Android emulators do not expose a real BLE radio. Test on a physical phone with the sensor worn, since most chest straps only advertise when they detect skin contact."
  - question: "Why is my heart rate value wrong above 255 bpm or always 0?"
    answer: "Check bit 0 of the flags byte. When it is 1, the value is a 16-bit little-endian integer in bytes 1 and 2, so bpm = byte1 | (byte2 << 8). Reading it big-endian or always as 8-bit gives wrong results. A value of 0 usually means the sensor has no skin contact."
  - question: "Can the monitor keep running with the screen off?"
    answer: "On iOS, add bluetooth-central to UIBackgroundModes and notifications keep arriving in the background. On Android, the connection survives while the process lives, but for long workouts you should keep the app in the foreground with a screen wake lock or run your own connectedDevice foreground service."
  - question: "Can I read heart rate from the phone itself without a sensor?"
    answer: "Phones have no heart rate sensor. You can read heart rate that a watch already wrote to Apple Health or Health Connect with @capgo/capacitor-health, but that data arrives with a delay and is not a live stream."
---

To build a heart rate monitor with Capacitor, connect to a Bluetooth Low Energy sensor that exposes the standard Heart Rate Service (`0x180D`), subscribe to the Heart Rate Measurement characteristic (`0x2A37`), and decode each notification into beats per minute. This tutorial does that with `@capgo/capacitor-bluetooth-low-energy` on Capacitor 8, including RR intervals, sensor contact, reconnection, and saving readings to Apple Health or Health Connect.

## How BLE heart rate sensors work

Bluetooth Low Energy splits devices into two roles. Your phone is the **central**: it scans, connects and asks for data. The chest strap is the **peripheral**: it advertises and serves data.

A peripheral exposes **services**, and each service holds **characteristics**, small values you can read, write or subscribe to. Standard services have 16-bit UUIDs assigned by the Bluetooth SIG:

| UUID | Name | Access | What it gives you |
| --- | --- | --- | --- |
| `0x180D` | Heart Rate Service | Service | Container for the items below |
| `0x2A37` | Heart Rate Measurement | Notify | BPM, sensor contact, energy expended, RR intervals |
| `0x2A38` | Body Sensor Location | Read | Chest, wrist, finger, hand, ear lobe, foot |
| `0x2A39` | Heart Rate Control Point | Write | `0x01` resets the energy expended counter |
| `0x180F` | Battery Service | Service | Battery level of the strap |
| `0x2A19` | Battery Level | Read / Notify | 0 to 100 percent |

A 16-bit UUID is shorthand for the full 128-bit form `0000XXXX-0000-1000-8000-00805F9B34FB`. The Capgo plugin accepts both forms.

## Prerequisites

- A Capacitor 8 app (any framework: Angular, React, Vue, Svelte, or plain TypeScript)
- A physical iPhone or Android phone. Simulators and emulators have no usable Bluetooth radio
- A BLE heart rate strap such as a Polar H10, Garmin HRM-Pro, or Wahoo TICKR. Wet the electrodes and wear it, many straps stay asleep without skin contact

If you are starting from scratch:

```bash
bun create vite heart-rate --template vanilla-ts
cd heart-rate
bun add @capacitor/core @capacitor/ios @capacitor/android
bun add -d @capacitor/cli
bunx cap init "Heart Rate" com.example.heartrate --web-dir dist
bun run build
bunx cap add ios
bunx cap add android
```

## Install the Bluetooth Low Energy plugin

```bash
bun add @capgo/capacitor-bluetooth-low-energy
bunx cap sync
```

### iOS configuration

Add the Bluetooth usage strings to `ios/App/App/Info.plist`, and the `bluetooth-central` background mode if you want readings while the screen is locked:

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Connect to your heart rate sensor during workouts.</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>Connect to your heart rate sensor during workouts.</string>
<key>UIBackgroundModes</key>
<array>
  <string>bluetooth-central</string>
</array>
```

### Android configuration

The plugin merges the permissions it needs into your manifest: `BLUETOOTH_SCAN` (with `neverForLocation`), `BLUETOOTH_CONNECT` and `BLUETOOTH_ADVERTISE` for Android 12+, plus the legacy `BLUETOOTH`, `BLUETOOTH_ADMIN` and location permissions for Android 11 and lower. On Android 12+ you still need to request them at runtime, which `requestPermissions()` does.

It also declares `android.hardware.bluetooth_le` as required, which hides your app on Google Play for devices without BLE. If heart rate is an optional feature in your app, override it in `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <uses-feature
        android:name="android.hardware.bluetooth_le"
        android:required="false"
        tools:replace="android:required" />
</manifest>
```

## Decode the Heart Rate Measurement

Do this part first, because it is where most implementations go wrong. The characteristic value is a byte array:

| Byte(s) | Meaning |
| --- | --- |
| 0 | Flags |
| 1 or 1-2 | Heart rate: UINT8 if flag bit 0 is 0, UINT16 little-endian if 1 |
| next 2 (optional) | Energy expended in kJ, present if flag bit 3 is 1 |
| rest (optional) | RR intervals, UINT16 little-endian, unit 1/1024 s, present if flag bit 4 is 1 |

Flag bits 1 and 2 describe skin contact: bit 2 says whether the sensor supports contact detection, bit 1 says whether contact is detected.

```typescript
export interface HeartRateMeasurement {
  bpm: number;
  contactDetected: boolean | null; // null when the sensor does not report contact
  energyExpendedKj?: number;
  rrIntervalsMs: number[];
}

export function parseHeartRate(bytes: number[]): HeartRateMeasurement {
  const data = Uint8Array.from(bytes);
  const view = new DataView(data.buffer);
  const flags = data[0];
  let offset = 1;

  const is16Bit = (flags & 0x01) !== 0;
  const bpm = is16Bit ? view.getUint16(offset, true) : view.getUint8(offset);
  offset += is16Bit ? 2 : 1;

  const contactSupported = (flags & 0x04) !== 0;
  const contactDetected = contactSupported ? (flags & 0x02) !== 0 : null;

  let energyExpendedKj: number | undefined;
  if (flags & 0x08) {
    energyExpendedKj = view.getUint16(offset, true);
    offset += 2;
  }

  const rrIntervalsMs: number[] = [];
  if (flags & 0x10) {
    for (; offset + 1 < data.length; offset += 2) {
      rrIntervalsMs.push(Math.round((view.getUint16(offset, true) / 1024) * 1000));
    }
  }

  return { bpm, contactDetected, energyExpendedKj, rrIntervalsMs };
}
```

The `true` argument to `getUint16` means little-endian, as the Bluetooth specification requires. Code that shifts the first byte left (`byte1 << 8 | byte2`) reads 16-bit values backwards.

A quick sanity test:

```typescript
parseHeartRate([0x16, 0x48, 0x00, 0x04]);
// flags 0x16: 8-bit value, contact supported and detected, RR present
// => { bpm: 72, contactDetected: true, rrIntervalsMs: [1000] }
```

## Connect to the sensor

The following module scans for devices that advertise the Heart Rate Service, connects to the first one, and streams parsed readings to a callback.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';
import type { PluginListenerHandle } from '@capacitor/core';
import { parseHeartRate, type HeartRateMeasurement } from './heart-rate-parser';

const HEART_RATE_SERVICE = '180D';
const HEART_RATE_MEASUREMENT = '2A37';
const BODY_SENSOR_LOCATION = '2A38';
const BATTERY_SERVICE = '180F';
const BATTERY_LEVEL = '2A19';

// iOS reports short UUIDs ("2A37"), Android reports the full 128-bit form
const isUuid = (value: string, short: string) =>
  value.toUpperCase() === short || value.toUpperCase().startsWith(`0000${short}-`);

let listeners: PluginListenerHandle[] = [];
let connectedId: string | null = null;

export async function startHeartRate(onReading: (m: HeartRateMeasurement) => void) {
  await BluetoothLowEnergy.initialize({ mode: 'central' });

  const { available } = await BluetoothLowEnergy.isAvailable();
  if (!available) throw new Error('This device has no Bluetooth LE');

  const perms = await BluetoothLowEnergy.requestPermissions();
  if (perms.bluetooth !== 'granted') throw new Error('Bluetooth permission denied');

  const { enabled } = await BluetoothLowEnergy.isEnabled();
  if (!enabled) {
    await BluetoothLowEnergy.openBluetoothSettings();
    throw new Error('Bluetooth is off. Turn it on and tap Connect again.');
  }

  listeners.push(
    await BluetoothLowEnergy.addListener('characteristicChanged', (event) => {
      if (isUuid(event.characteristic, HEART_RATE_MEASUREMENT)) {
        onReading(parseHeartRate(event.value));
      }
    }),
    await BluetoothLowEnergy.addListener('deviceDisconnected', ({ deviceId }) => {
      if (deviceId === connectedId) void reconnect(deviceId);
    }),
  );

  try {
    const device = await scanForSensor(10_000);
    try {
      await connectTo(device.deviceId);
    } catch (error) {
      // connect() may have succeeded before a later step failed: release the half-open link
      await BluetoothLowEnergy.disconnect({ deviceId: device.deviceId }).catch(() => undefined);
      throw error;
    }
  } catch (error) {
    // Don't leave listeners behind, or each retry would handle every event again
    await Promise.all(listeners.map((l) => l.remove()));
    listeners = [];
    throw error;
  }
}

function scanForSensor(timeoutMs: number) {
  return new Promise<{ deviceId: string; name: string | null }>((resolve, reject) => {
    let handle: PluginListenerHandle | undefined;
    let settled = false;

    const finish = (error: Error | null, device?: { deviceId: string; name: string | null }) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      void handle?.remove();
      void BluetoothLowEnergy.stopScan().catch(() => undefined);
      if (error) reject(error);
      else resolve(device!);
    };

    const timer = setTimeout(
      () => finish(new Error('No heart rate sensor found. Is the strap worn and moist?')),
      timeoutMs,
    );

    BluetoothLowEnergy.addListener('deviceScanned', ({ device }) => finish(null, device))
      .then((h) => {
        handle = h;
        if (settled) {
          void h.remove();
          return;
        }
        return BluetoothLowEnergy.startScan({ services: [HEART_RATE_SERVICE] });
      })
      .catch((error) => finish(error instanceof Error ? error : new Error(String(error))));
  });
}

async function connectTo(deviceId: string) {
  await BluetoothLowEnergy.connect({ deviceId });
  await BluetoothLowEnergy.discoverServices({ deviceId });
  await BluetoothLowEnergy.startCharacteristicNotifications({
    deviceId,
    service: HEART_RATE_SERVICE,
    characteristic: HEART_RATE_MEASUREMENT,
  });
  connectedId = deviceId;
  localStorage.setItem('hr-sensor', deviceId);
}

async function reconnect(deviceId: string, attempt = 0) {
  // stopHeartRate() clears connectedId, which ends any pending retry chain
  if (attempt > 5 || connectedId !== deviceId) return;
  try {
    await connectTo(deviceId);
  } catch {
    setTimeout(() => void reconnect(deviceId, attempt + 1), 2000 * (attempt + 1));
  }
}

export async function stopHeartRate() {
  if (connectedId) {
    await BluetoothLowEnergy.stopCharacteristicNotifications({
      deviceId: connectedId,
      service: HEART_RATE_SERVICE,
      characteristic: HEART_RATE_MEASUREMENT,
    }).catch(() => undefined);
    const id = connectedId;
    connectedId = null; // prevents the disconnect listener from reconnecting
    await BluetoothLowEnergy.disconnect({ deviceId: id });
  }
  await Promise.all(listeners.map((l) => l.remove()));
  listeners = [];
}
```

Why it is written this way:

- **Filter the scan by service.** `startScan({ services: ['180D'] })` only returns heart rate sensors, so you do not match on device names, which differ between models and firmware versions.
- **Register listeners before subscribing**, otherwise the first notifications can arrive before your handler exists.
- **Stop scanning once connected.** Scanning drains battery and slows connections on some Android phones.
- **Device IDs differ per platform**: a MAC address on Android, a per-app UUID on iOS. Store whatever you get and reuse it on the same device only.

## Read sensor location and battery

```typescript
const LOCATIONS = ['Other', 'Chest', 'Wrist', 'Finger', 'Hand', 'Ear lobe', 'Foot'];

export async function readSensorInfo(deviceId: string) {
  const location = await BluetoothLowEnergy.readCharacteristic({
    deviceId,
    service: HEART_RATE_SERVICE,
    characteristic: BODY_SENSOR_LOCATION,
  }).catch(() => null);

  const battery = await BluetoothLowEnergy.readCharacteristic({
    deviceId,
    service: BATTERY_SERVICE,
    characteristic: BATTERY_LEVEL,
  }).catch(() => null);

  return {
    location: location ? LOCATIONS[location.value[0]] ?? 'Unknown' : 'Unknown',
    batteryPercent: battery ? battery.value[0] : null,
  };
}
```

Both are optional in the spec, so wrap the reads and handle missing values.

## Build the screen

A minimal UI with a connect button, the live BPM, and a contact warning:

```html
<main>
  <h1>Heart rate</h1>
  <p id="bpm" aria-live="polite">--</p>
  <p id="status"></p>
  <button id="connect" type="button">Connect sensor</button>
</main>
```

```typescript
import { startHeartRate } from './heart-rate';

const bpmEl = document.getElementById('bpm')!;
const statusEl = document.getElementById('status')!;

document.getElementById('connect')!.addEventListener('click', async () => {
  statusEl.textContent = 'Searching...';
  try {
    await startHeartRate((m) => {
      bpmEl.textContent = m.contactDetected === false ? '--' : `${m.bpm} bpm`;
      statusEl.textContent = m.contactDetected === false ? 'Check strap contact' : 'Connected';
    });
  } catch (e) {
    statusEl.textContent = (e as Error).message;
  }
});
```

Start the scan from a button tap, not on page load. Both iOS and Android show permission prompts the first time, and users accept them more often when they understand why.

Run it on a device:

```bash
bun run build
bunx cap run android
bunx cap run ios
```

## Use RR intervals for HRV

RR intervals are the time between beats. They let you compute heart rate variability, which apps use for recovery and stress scores. RMSSD over a rolling window is the common metric:

```typescript
export function rmssd(rr: number[]): number | null {
  if (rr.length < 2) return null;
  let sum = 0;
  for (let i = 1; i < rr.length; i++) sum += (rr[i] - rr[i - 1]) ** 2;
  return Math.sqrt(sum / (rr.length - 1));
}
```

Collect at least a minute of intervals at rest, and drop outliers (for example intervals that differ by more than 20 percent from the previous one) caused by movement artifacts.

## Save readings to Apple Health or Health Connect

To make readings available to other apps, write them with [`@capgo/capacitor-health`](/plugins/capacitor-health/). Average over a short window rather than writing every notification:

```typescript
import { Health } from '@capgo/capacitor-health';

await Health.requestAuthorization({ write: ['heartRate'] });

export async function saveAverage(bpm: number, start: Date, end: Date) {
  await Health.saveSample({
    dataType: 'heartRate',
    value: bpm,
    unit: 'bpm',
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  });
}
```

HealthKit needs the HealthKit capability and usage strings on iOS. Health Connect needs permissions declared in the manifest and a privacy policy screen on Android. Our [Google Fit to Health Connect migration guide](/blog/google-fit-to-health-connect-migration-in-capacitor/) covers that setup.

## Keep the monitor running during workouts

- **iOS**: with `bluetooth-central` in `UIBackgroundModes`, notifications keep arriving when the app is in the background and the screen is locked. iOS may still end the connection under memory pressure, so keep the reconnect logic.
- **Android**: a connected GATT session keeps delivering notifications while your process lives. For workouts longer than a few minutes with the screen off, Android can freeze or kill the app. The simple fix is to keep the screen on during an active session with [`@capgo/capacitor-keep-awake`](/plugins/capacitor-keep-awake/) (`KeepAwake.keepAwake()` and `KeepAwake.allowSleep()`). For true background recording, add your own foreground service with `android:foregroundServiceType="connectedDevice"` and the `FOREGROUND_SERVICE_CONNECTED_DEVICE` permission.

## Troubleshooting

**No devices found**: the strap is not worn or the electrodes are dry. Many straps also allow only one connection, so disconnect them from a watch, a bike computer or another app first.

**`requestPermissions` returns denied on Android 11 or lower**: BLE scanning on those versions needs location permission and location services on. Check `isLocationEnabled()` and call `openLocationSettings()`.

**Scanning finds nothing on Android 12+ but works on 11**: the user denied "Nearby devices". Send them to `openAppSettings()`.

**Heart rate is always 0**: no skin contact. Check `contactDetected`.

**Values above 255 bpm or random numbers**: you are ignoring flag bit 0 or reading 16-bit values big-endian. Use the parser above.

**Notifications stop after the phone locks on Android**: battery optimization. Keep the screen awake during sessions or use a foreground service.

**The app is missing on some devices in Google Play**: the plugin's `uses-feature` for BLE is required by default. Override it as shown in the Android configuration section.

## Next steps

The same pattern works for other standard GATT profiles: Cycling Speed and Cadence (`0x1816`), Running Speed and Cadence (`0x1814`), and Cycling Power (`0x1818`). Only the parser changes. See the [Bluetooth Low Energy plugin docs](/docs/plugins/bluetooth-low-energy/) for writes, MTU requests and peripheral mode. Once the native app is in the stores, parsing fixes and UI changes are JavaScript, so you can ship them with [Capgo live updates](/live-update/) instead of waiting for review.
