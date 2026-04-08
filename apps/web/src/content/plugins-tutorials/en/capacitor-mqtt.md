---
locale: en
---
# Using @capgo/capacitor-mqtt

`@capgo/capacitor-mqtt` enables MQTT messaging in Capacitor apps.

## Install

```bash
npm install @capgo/capacitor-mqtt
npx cap sync
```

## Connect and subscribe

```typescript
import { CapacitorMqtt } from '@capgo/capacitor-mqtt';

await CapacitorMqtt.connect({
  brokerUrl: 'wss://broker.hivemq.com:8884/mqtt',
  clientId: 'my-device-id',
});

await CapacitorMqtt.subscribe({
  topic: 'myapp/events',
  qos: 1,
});
```

## Publish

```typescript
await CapacitorMqtt.publish({
  topic: 'myapp/commands',
  message: JSON.stringify({ reboot: true }),
  qos: 1,
});
```
