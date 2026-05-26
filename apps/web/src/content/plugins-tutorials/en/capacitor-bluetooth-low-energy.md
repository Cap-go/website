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

## What This Plugin Exposes

- `initialize` - Initialize the BLE plugin. Must be called before any other method.
- `shimWebBluetooth` - Install the Capacitor Web Bluetooth shim on `navigator.bluetooth`. Call this manually before using the Web Bluetooth API from a Capacitor native app.
- `isAvailable` - Check if Bluetooth is available on the device.
- `isEnabled` - Check if Bluetooth is enabled on the device.

## Example Usage

### `initialize`

Initialize the BLE plugin. Must be called before any other method.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

await BluetoothLowEnergy.initialize({ mode: 'central' });
```

### `shimWebBluetooth`

Install the Capacitor Web Bluetooth shim on `navigator.bluetooth`. Call this manually before using the Web Bluetooth API from a Capacitor native app.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

BluetoothLowEnergy.shimWebBluetooth();
```

### `isAvailable`

Check if Bluetooth is available on the device.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

const { available } = await BluetoothLowEnergy.isAvailable();
```

### `isEnabled`

Check if Bluetooth is enabled on the device.

```typescript
import { BluetoothLowEnergy } from '@capgo/capacitor-bluetooth-low-energy';

const { enabled } = await BluetoothLowEnergy.isEnabled();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-bluetooth-low-energy/
- Docs: /docs/plugins/bluetooth-low-energy/

## Keep going from Using @capgo/capacitor-bluetooth-low-energy

If you are using **Using @capgo/capacitor-bluetooth-low-energy** to plan native plugin work, connect it with [@capgo/capacitor-bluetooth-low-energy](/docs/plugins/bluetooth-low-energy/) for the implementation detail in @capgo/capacitor-bluetooth-low-energy, [Getting Started](/docs/plugins/bluetooth-low-energy/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
