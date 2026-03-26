---
locale: en
---

# Using @capgo/capacitor-rudderstack

The `@capgo/capacitor-rudderstack` package brings RudderStack analytics, identity management, screen tracking, and delivery controls to Capacitor apps with native iOS and Android SDK support. Its main value is preserving the familiar Rudder Cordova call shape while moving the implementation to a Capacitor-native bridge.

## Installation

Install the plugin and sync native projects:

```bash
bun add @capgo/capacitor-rudderstack
bunx cap sync
```

## Migration checklist

When moving from `rudder-sdk-cordova`, keep the migration simple:

1. Replace the Cordova import with `RudderStack` from `@capgo/capacitor-rudderstack`.
2. Initialize once during app startup with your `writeKey` and `dataPlaneUrl`.
3. Keep your existing `identify`, `group`, `track`, `screen`, and `alias` call order where possible.
4. Wire consent and sign-out flows to `optOut()` and `reset()`.
5. Use `flush()` for critical transitions when you want events delivered faster before backgrounding.

## Example application flow

The following pattern works well for most apps:

```ts
import { RudderStack } from '@capgo/capacitor-rudderstack';

const rudderConfig = {
  writeKey: 'YOUR_WRITE_KEY',
  dataPlaneUrl: 'https://your-dataplane.rudderstack.com',
};

await RudderStack.initialize(rudderConfig.writeKey, {
  dataPlaneUrl: rudderConfig.dataPlaneUrl,
  trackLifecycleEvents: true,
});

await RudderStack.identify('user_123', {
  plan: 'pro',
  source: 'mobile-app',
});

await RudderStack.track('Subscription Viewed', {
  placement: 'paywall',
  experiment: 'spring-pricing',
});
```

Keep destination routing or external IDs on the individual calls that need them instead of trying to centralize every integration rule at initialization time.

## Platform behavior

### Native apps

- The plugin packages native RudderStack SDK support for both iOS and Android.
- Common config values such as `trackLifecycleEvents`, `recordScreenViews`, `flushQueueSize`, and `logLevel` are set from JavaScript.

### Web builds

- The web target is a compatibility shim for development.
- It preserves the API shape but does not send live analytics events.

### Current limitation

- `config.factories` from the Cordova plugin is intentionally ignored in this first Capacitor release.

## Next steps

- Read the full [Getting started guide](https://capgo.app/docs/plugins/rudderstack/getting-started/).
- Browse the plugin source and native packaging details on [github.com/Cap-go/capacitor-rudderstack](https://github.com/Cap-go/capacitor-rudderstack).
