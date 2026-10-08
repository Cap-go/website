---
locale: en
---
# Using @capgo/capacitor-bluetooth-low-energy

Capacitor Bluetooth Low Energy Plugin for BLE communication.

## Install

```bash
bun add @capgo/capacitor-bluetooth-low-energy
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initialize` | Initialize the BLE plugin. Must be called before any other method. |
| `shimWebBluetooth` | Install the Capacitor Web Bluetooth shim on `navigator.bluetooth`. Call this manually before using the Web Bluetooth API from a Capacitor native app. |
| `isAvailable` | Check if Bluetooth is available on the device. |
| `isEnabled` | Check if Bluetooth is enabled on the device. |
| `isLocationEnabled` | Check if location services are enabled (Android only). |
| `openAppSettings` | Open the app settings page. |
| `openBluetoothSettings` | Open the Bluetooth settings page (Android only). |
| `openLocationSettings` | Open the location settings page (Android only). |
| `checkPermissions` | Check the current permission status. |
| `requestPermissions` | Request Bluetooth permissions. |
| `startScan` | Start scanning for BLE devices. |
| `stopScan` | Stop scanning for BLE devices. |
| `connect` | Connect to a BLE device. |
| `disconnect` | Disconnect from a BLE device. |
| `createBond` | Create a bond with a BLE device (Android only). |
| `isBonded` | Check if a device is bonded (Android only). |
| `discoverServices` | Discover services on a connected device. |
| `getServices` | Get discovered services for a device. |
| `getConnectedDevices` | Get a list of connected devices. |
| `readCharacteristic` | Read a characteristic value. |
| `writeCharacteristic` | Write a value to a characteristic. |
| `startCharacteristicNotifications` | Start notifications for a characteristic. |
| `stopCharacteristicNotifications` | Stop notifications for a characteristic. |
| `readDescriptor` | Read a descriptor value. |
| `writeDescriptor` | Write a value to a descriptor. |
| `readRssi` | Read the RSSI (signal strength) of a connected device. |
| `requestMtu` | Request MTU size change (Android only). |
| `requestConnectionPriority` | Request connection priority (Android only). |
| `startAdvertising` | Start advertising as a peripheral (BLE server). |
| `stopAdvertising` | Stop advertising. |
| `addGattService` | Add a GATT service with characteristics to the local GATT server. Must be called in peripheral mode before starting advertising. |
| `removeGattService` | Remove a GATT service from the local GATT server. |
| `setGattCharacteristicValue` | Set the value of a local GATT characteristic. |
| `notifyGattCharacteristicChanged` | Notify connected centrals that a local GATT characteristic value changed. |
| `startForegroundService` | Start a foreground service to maintain BLE connections in background (Android only). |
| `stopForegroundService` | Stop the foreground service (Android only). |

## Examples

### `initialize()`

Initialize the BLE plugin. Must be called before any other method.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

await BluetoothLowEnergy.initialize({ mode: 'central' });
```

### `shimWebBluetooth()`

Install the Capacitor Web Bluetooth shim on `navigator.bluetooth`. Call this manually before using the Web Bluetooth API from a Capacitor native app.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

BluetoothLowEnergy.shimWebBluetooth();
```

### `isAvailable()`

Check if Bluetooth is available on the device.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

const { available } = await BluetoothLowEnergy.isAvailable();
```

### `isEnabled()`

Check if Bluetooth is enabled on the device.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

const { enabled } = await BluetoothLowEnergy.isEnabled();
```

### `isLocationEnabled()`

Check if location services are enabled (Android only).

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

const { enabled } = await BluetoothLowEnergy.isLocationEnabled();
```

### `openAppSettings()`

Open the app settings page.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

await BluetoothLowEnergy.openAppSettings();
```

The table above lists the 36 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-bluetooth-low-energy/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `BluetoothLowEnergy.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-bluetooth-low-energy/)
- [Documentation](/docs/plugins/bluetooth-low-energy/)
- [API reference](/docs/plugins/bluetooth-low-energy/getting-started/)

## Keep going from Using @capgo/capacitor-bluetooth-low-energy

If you are using **Using @capgo/capacitor-bluetooth-low-energy** to plan native plugin work, connect it with [@capgo/capacitor-bluetooth-low-energy](/docs/plugins/bluetooth-low-energy/) for the implementation detail in @capgo/capacitor-bluetooth-low-energy, [Getting Started](/docs/plugins/bluetooth-low-energy/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
