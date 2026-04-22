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
