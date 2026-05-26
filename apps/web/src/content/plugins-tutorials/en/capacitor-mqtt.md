---
locale: en
---
# Using @capgo/capacitor-mqtt

Capacitor plugin for MQTT connectivity on Android and iOS.

## Install

```bash
bun add @capgo/capacitor-mqtt
bunx cap sync
```

## What This Plugin Exposes

- `connect`
- `disconnect`
- `subscribe`
- `publish`

## Example Usage

### `connect`

See the upstream definitions for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

await MqttBridge.connect({} as {
    serverURI: string;
    port: number;
    clientId: string;
    username: string;
    password: string;
    setCleanSession: boolean;
    connectionTimeout: number;
    keepAliveInterval: number;
    setAutomaticReconnect: boolean;
    setLastWill?: {
      willTopic: string;
      willPayload: string;
      willQoS: number;
      setRetained: boolean;
    };
  });
```

### `disconnect`

See the upstream definitions for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

await MqttBridge.disconnect();
```

### `subscribe`

See the upstream definitions for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

await MqttBridge.subscribe({} as { topic: string; qos: number });
```

### `publish`

See the upstream definitions for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

await MqttBridge.publish({} as { topic: string; payload: string; qos: number; retained: boolean });
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-mqtt/
- Docs: /docs/plugins/mqtt/

## Keep going from Using @capgo/capacitor-mqtt

If you are using **Using @capgo/capacitor-mqtt** to plan native plugin work, connect it with [@capgo/capacitor-mqtt](/docs/plugins/mqtt/) for the implementation detail in @capgo/capacitor-mqtt, [Getting Started](/docs/plugins/mqtt/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
