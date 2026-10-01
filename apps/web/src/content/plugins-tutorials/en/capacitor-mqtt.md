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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';
```

## API at a glance

| Method | Description |
| --- | --- |
| `connect` | See the source definitions for current behavior. |
| `disconnect` | See the source definitions for current behavior. |
| `subscribe` | See the source definitions for current behavior. |
| `publish` | See the source definitions for current behavior. |

## Examples

### `connect()`

See the API reference for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

const result = await MqttBridge.connect({
  serverURI: 'https://example.com',
  port: 1,
  clientId: 'client-id-123',
  username: 'example',
  password: 'password',
  setCleanSession: true,
  connectionTimeout: 1,
  keepAliveInterval: 1,
  setAutomaticReconnect: true,
});
console.log(result);
```

### `disconnect()`

See the API reference for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

const result = await MqttBridge.disconnect();
console.log(result);
```

### `subscribe()`

See the API reference for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

const result = await MqttBridge.subscribe({
  topic: 'topic',
  qos: 1,
});
console.log(result);
```

### `publish()`

See the API reference for the current contract.

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

const result = await MqttBridge.publish({
  topic: 'topic',
  payload: 'payload',
  qos: 1,
  retained: true,
});
console.log(result);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `MqttBridge.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-mqtt/)
- [Documentation](/docs/plugins/mqtt/)
- [API reference](/docs/plugins/mqtt/getting-started/)

## Keep going from Using @capgo/capacitor-mqtt

If you are using **Using @capgo/capacitor-mqtt** to plan native plugin work, connect it with [@capgo/capacitor-mqtt](/docs/plugins/mqtt/) for the implementation detail in @capgo/capacitor-mqtt, [Getting Started](/docs/plugins/mqtt/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
