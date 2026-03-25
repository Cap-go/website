---
locale: en
---

# Using @capgo/capacitor-appsflyer

The `@capgo/capacitor-appsflyer` package adds AppsFlyer attribution, event analytics, and deep-link handling to Capacitor apps with native iOS and Android SDK support. Use this guide to install the plugin, initialize it early in app startup, and listen for conversion and deep-link callbacks.

## Installation

Install the plugin and sync native projects:

```bash
bun add @capgo/capacitor-appsflyer
bunx cap sync
```

## Initialize AppsFlyer

Initialize the SDK as early as possible and register listeners before startup:

```ts
import { AppsFlyer, AFConstants } from '@capgo/capacitor-appsflyer';

await AppsFlyer.addListener(AFConstants.CONVERSION_CALLBACK, (event) => {
  console.log('Conversion callback', event);
});

await AppsFlyer.addListener(AFConstants.UDL_CALLBACK, (event) => {
  console.log('Deep link callback', event);
});

await AppsFlyer.initSDK({
  devKey: 'YOUR_DEV_KEY',
  appID: '1234567890',
  registerConversionListener: true,
  registerOnDeepLink: true,
  waitForATTUserAuthorization: 10,
});
```

If you need to delay startup until after your own consent flow, use manual mode:

```ts
await AppsFlyer.initSDK({
  devKey: 'YOUR_DEV_KEY',
  appID: '1234567890',
  manualStart: true,
  registerConversionListener: true,
  registerOnDeepLink: true,
});

await AppsFlyer.startSDK();
```

## Track events

Send AppsFlyer events with custom revenue or campaign parameters:

```ts
await AppsFlyer.logEvent({
  eventName: 'af_purchase',
  eventValue: {
    af_revenue: 19.99,
    af_currency: 'USD',
    af_content_id: 'plan_pro_monthly',
  },
});
```

## Common setup notes

- `appID` is required for iOS and must be the numeric App Store app ID.
- `waitForATTUserAuthorization` lets AppsFlyer wait for your ATT flow before continuing initialization.
- `AFConstants.CONVERSION_CALLBACK`, `AFConstants.OAOA_CALLBACK`, and `AFConstants.UDL_CALLBACK` cover the main attribution and deep-link listener channels.
- `disableSKAdNetwork()` is iOS-only and `disableAppSetId()` is Android-only.

## Useful APIs

The plugin also exposes methods for:

- `setCustomerUserId`
- `setAdditionalData`
- `setConsentData`
- `generateInviteLink`
- `updateServerUninstallToken`
- `sendPushNotificationData`
- `getAppsFlyerUID`

For the complete API surface and advanced setup details, check the plugin repository:
[github.com/Cap-go/capacitor-appsflyer](https://github.com/Cap-go/capacitor-appsflyer)
