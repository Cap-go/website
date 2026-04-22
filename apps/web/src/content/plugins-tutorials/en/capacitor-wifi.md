---
locale: en
---
# Using @capgo/capacitor-wifi

WiFi plugin for managing device WiFi connectivity.

## Install

```bash
bun add @capgo/capacitor-wifi
bunx cap sync
```

## What This Plugin Exposes

- `addNetwork` - Show a system dialog to add a Wi-Fi network to the device. On Android SDK 30+, this opens the system Wi-Fi settings with the network pre-filled. On iOS, this connects to the network directly.
- `connect` - Connect to a Wi-Fi network. On Android, this creates a temporary connection that doesn't route traffic through the network by default. Set autoRouteTraffic to true to bind app traffic to the connected network (useful for local/device-hosted APs). For a persistent connection on Android, use addNetwork() instead. On iOS, this creates a persistent connection.
- `disconnect` - Disconnect from the current Wi-Fi network. On iOS, only disconnects from networks that were added via this plugin.
- `getAvailableNetworks` - Get a list of available Wi-Fi networks from the last scan. Only available on Android.

## Example Usage

### `addNetwork`

Show a system dialog to add a Wi-Fi network to the device. On Android SDK 30+, this opens the system Wi-Fi settings with the network pre-filled. On iOS, this connects to the network directly.

```typescript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

await CapacitorWifi.addNetwork({
  ssid: 'MyNetwork',
  password: 'mypassword',
  isHiddenSsid: false,
  securityType: NetworkSecurityType.WPA2_PSK
});
```

### `connect`

Connect to a Wi-Fi network. On Android, this creates a temporary connection that doesn't route traffic through the network by default. Set autoRouteTraffic to true to bind app traffic to the connected network (useful for local/device-hosted APs). For a persistent connection on Android, use addNetwork() instead. On iOS, this creates a persistent connection.

```typescript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

await CapacitorWifi.connect({
  ssid: 'MyNetwork',
  password: 'mypassword',
  autoRouteTraffic: true // Android only: route app traffic through this network
});
```

### `disconnect`

Disconnect from the current Wi-Fi network. On iOS, only disconnects from networks that were added via this plugin.

```typescript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

await CapacitorWifi.disconnect();
```

### `getAvailableNetworks`

Get a list of available Wi-Fi networks from the last scan. Only available on Android.

```typescript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

const { networks } = await CapacitorWifi.getAvailableNetworks();
networks.forEach(network => {
  console.log(`SSID: ${network.ssid}, Signal: ${network.rssi} dBm`);
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-wifi/
- Docs: /docs/plugins/wifi/
