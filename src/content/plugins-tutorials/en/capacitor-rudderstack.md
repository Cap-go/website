---
locale: en
---

# Using @capgo/capacitor-rudderstack

The `@capgo/capacitor-rudderstack` package brings RudderStack analytics, identity management, screen tracking, and delivery controls to Capacitor apps with native iOS and Android SDK support. It preserves the familiar Rudder Cordova call shape, which makes migration easier when you are moving an existing hybrid app to Capacitor.

## Installation

Install the plugin and sync native projects:

```bash
bun add @capgo/capacitor-rudderstack
bunx cap sync
```

## Initialize the SDK

Initialize RudderStack during app startup with your write key and data plane URL:

```ts
import { RudderStack } from '@capgo/capacitor-rudderstack';

await RudderStack.initialize('YOUR_WRITE_KEY', {
  dataPlaneUrl: 'https://your-dataplane.rudderstack.com',
  trackLifecycleEvents: true,
  logLevel: RudderStack.LogLevel.INFO,
});
```

## Identify and track

After authentication, attach identity traits and start sending events:

```ts
await RudderStack.identify('user_123', {
  email: 'user@example.com',
  plan: 'pro',
});

await RudderStack.track('Checkout Started', {
  cartValue: 49,
  currency: 'EUR',
});

await RudderStack.screen('Checkout', {
  step: 'payment',
});
```

## Control delivery and consent

The plugin also exposes helper APIs for device and privacy state:

```ts
await RudderStack.putDeviceToken('PUSH_TOKEN');
await RudderStack.putAdvertisingId('ADVERTISING_ID');
await RudderStack.flush();
await RudderStack.optOut(false);
```

Call `reset()` when a user signs out to clear the current Rudder identity.

## Important notes

- The web implementation is a compatibility shim and does not send live RudderStack events.
- `config.factories` from the Cordova plugin is not implemented in this first Capacitor release.
- Per-call options support `externalIds` and `integrations` for destination-specific routing.

For the full API surface and setup details, see the plugin repository:
[github.com/Cap-go/capacitor-rudderstack](https://github.com/Cap-go/capacitor-rudderstack)
