---
locale: en
---
# Using @capgo/capacitor-bluetooth-low-energy Package

The `@capgo/capacitor-bluetooth-low-energy` package provides comprehensive Bluetooth Low Energy (BLE) functionality for Capacitor apps. This tutorial will guide you through scanning for devices, connecting, and communicating with BLE peripherals.

## Installation

To install the `@capgo/capacitor-bluetooth-low-energy` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-bluetooth-low-energy
npx cap sync
```

## iOS Setup

Add the following usage descriptions to your `Info.plist`:

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>This app uses Bluetooth to communicate with BLE devices.</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>This app uses Bluetooth to communicate with BLE devices.</string>
```

For background BLE support, also add:

```xml
<key>UIBackgroundModes</key>
<array>
    <string>bluetooth-central</string>
    <string>bluetooth-peripheral</string>
</array>
```

## Android Setup

The plugin automatically adds required permissions to your `AndroidManifest.xml`. For Android 12+, you need to request runtime permissions:

```typescript
await BluetoothLowEnergy.requestPermissions();
```

## API

The `@capgo/capacitor-bluetooth-low-energy` package provides the following API methods:

### initialize()

Initialize the BLE plugin. Must be called before any other method.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function initBLE() {
  await BluetoothLowEnergy.initialize();
  console.log('BLE initialized');
}
```

### isAvailable() / isEnabled()

Check if Bluetooth is available and enabled on the device.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function checkBluetooth() {
  const { available } = await BluetoothLowEnergy.isAvailable();
  const { enabled } = await BluetoothLowEnergy.isEnabled();

  console.log('Bluetooth available:', available);
  console.log('Bluetooth enabled:', enabled);
}
```

### requestPermissions()

Request Bluetooth permissions (required for Android 12+).

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function requestBLEPermissions() {
  const status = await BluetoothLowEnergy.requestPermissions();
  console.log('Permission status:', status);
}
```

### startScan(options?) / stopScan()

Start and stop scanning for BLE devices.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function scanForDevices() {
  // Listen for discovered devices
  BluetoothLowEnergy.addListener('deviceScanned', (event) => {
    console.log('Found device:', event.device.name, event.device.deviceId);
  });

  // Start scanning with optional filters
  await BluetoothLowEnergy.startScan({
    services: ['180d'], // Filter by Heart Rate service
    timeout: 10000,     // Stop after 10 seconds
    allowDuplicates: false,
  });
}

async function stopScanning() {
  await BluetoothLowEnergy.stopScan();
  console.log('Scanning stopped');
}
```

### connect(options) / disconnect(options)

Connect to and disconnect from a BLE device.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function connectToDevice(deviceId: string) {
  // Listen for connection events
  BluetoothLowEnergy.addListener('deviceConnected', (event) => {
    console.log('Connected to:', event.deviceId);
  });

  BluetoothLowEnergy.addListener('deviceDisconnected', (event) => {
    console.log('Disconnected from:', event.deviceId);
  });

  await BluetoothLowEnergy.connect({ deviceId });
}

async function disconnectFromDevice(deviceId: string) {
  await BluetoothLowEnergy.disconnect({ deviceId });
  console.log('Disconnected');
}
```

### discoverServices(options) / getServices(options)

Discover and retrieve services from a connected device.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function discoverDeviceServices(deviceId: string) {
  // Discover services
  await BluetoothLowEnergy.discoverServices({ deviceId });

  // Get the discovered services
  const { services } = await BluetoothLowEnergy.getServices({ deviceId });

  services.forEach((service) => {
    console.log('Service:', service.uuid);
    service.characteristics.forEach((char) => {
      console.log('  Characteristic:', char.uuid);
      console.log('  Properties:', char.properties);
    });
  });
}
```

### readCharacteristic(options)

Read a value from a characteristic.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function readCharacteristicValue(
  deviceId: string,
  service: string,
  characteristic: string
) {
  const { value } = await BluetoothLowEnergy.readCharacteristic({
    deviceId,
    service,
    characteristic,
  });

  console.log('Read value:', value); // Array of bytes
}
```

### writeCharacteristic(options)

Write a value to a characteristic.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function writeCharacteristicValue(
  deviceId: string,
  service: string,
  characteristic: string,
  data: number[]
) {
  await BluetoothLowEnergy.writeCharacteristic({
    deviceId,
    service,
    characteristic,
    value: data,
    type: 'withResponse', // or 'withoutResponse'
  });

  console.log('Value written');
}
```

### startCharacteristicNotifications(options) / stopCharacteristicNotifications(options)

Subscribe to and unsubscribe from characteristic notifications.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

async function subscribeToNotifications(
  deviceId: string,
  service: string,
  characteristic: string
) {
  // Listen for value changes
  BluetoothLowEnergy.addListener('characteristicChanged', (event) => {
    console.log('Value changed:', event.value);
  });

  await BluetoothLowEnergy.startCharacteristicNotifications({
    deviceId,
    service,
    characteristic,
  });

  console.log('Subscribed to notifications');
}

async function unsubscribeFromNotifications(
  deviceId: string,
  service: string,
  characteristic: string
) {
  await BluetoothLowEnergy.stopCharacteristicNotifications({
    deviceId,
    service,
    characteristic,
  });

  console.log('Unsubscribed from notifications');
}
```

## Complete Example

Here's a complete example showing how to scan, connect, and read data from a Heart Rate Monitor:

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

const HEART_RATE_SERVICE = '180d';
const HEART_RATE_MEASUREMENT = '2a37';

class HeartRateMonitor {
  private deviceId: string | null = null;

  async initialize() {
    await BluetoothLowEnergy.initialize();

    const { available } = await BluetoothLowEnergy.isAvailable();
    if (!available) {
      throw new Error('Bluetooth not available');
    }

    await BluetoothLowEnergy.requestPermissions();
  }

  async scanAndConnect(): Promise<void> {
    return new Promise((resolve) => {
      BluetoothLowEnergy.addListener('deviceScanned', async (event) => {
        if (event.device.name?.includes('Heart')) {
          await BluetoothLowEnergy.stopScan();
          this.deviceId = event.device.deviceId;
          await BluetoothLowEnergy.connect({ deviceId: this.deviceId });
          await BluetoothLowEnergy.discoverServices({ deviceId: this.deviceId });
          resolve();
        }
      });

      BluetoothLowEnergy.startScan({
        services: [HEART_RATE_SERVICE],
        timeout: 15000,
      });
    });
  }

  async startMonitoring(onHeartRate: (bpm: number) => void) {
    if (!this.deviceId) throw new Error('Not connected');

    BluetoothLowEnergy.addListener('characteristicChanged', (event) => {
      if (event.characteristic === HEART_RATE_MEASUREMENT) {
        const flags = event.value[0];
        const is16Bit = (flags & 0x01) !== 0;
        const heartRate = is16Bit
          ? (event.value[2] << 8) | event.value[1]
          : event.value[1];
        onHeartRate(heartRate);
      }
    });

    await BluetoothLowEnergy.startCharacteristicNotifications({
      deviceId: this.deviceId,
      service: HEART_RATE_SERVICE,
      characteristic: HEART_RATE_MEASUREMENT,
    });
  }

  async disconnect() {
    if (this.deviceId) {
      await BluetoothLowEnergy.stopCharacteristicNotifications({
        deviceId: this.deviceId,
        service: HEART_RATE_SERVICE,
        characteristic: HEART_RATE_MEASUREMENT,
      });
      await BluetoothLowEnergy.disconnect({ deviceId: this.deviceId });
      this.deviceId = null;
    }
  }
}

// Usage
const monitor = new HeartRateMonitor();
await monitor.initialize();
await monitor.scanAndConnect();
await monitor.startMonitoring((bpm) => {
  console.log('Heart Rate:', bpm, 'BPM');
});
```

That's it! You have successfully learned how to use the `@capgo/capacitor-bluetooth-low-energy` package to communicate with Bluetooth Low Energy devices in your Capacitor app.
