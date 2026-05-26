---
locale: en
---
# Using @capgo/capacitor-facebook-analytics

Meta/Facebook App Events analytics for Capacitor apps on iOS and Android.

## Install

```bash
bun add @capgo/capacitor-facebook-analytics
bunx cap sync
```

## What This Plugin Exposes

- `initAppEvents` - Activate Facebook App Events manually.
- `logEvent` - Log standard or custom App Events with parameters, value, and currency.
- `logPurchase` - Log purchase events with amount and currency.
- `enableAdvertiserTracking` - Enable native advertiser tracking where supported.
- `disableAdvertiserTracking` - Disable native advertiser tracking where supported.
- `getAdvertiserTrackingStatus` - Read the current advertiser tracking status.
- `getPluginVersion` - Read the native plugin version.

## Example Usage

### `logEvent`

Log a standard event with Facebook parameters.

```typescript
import {
  FacebookAnalytics,
  FacebookEventName,
  FacebookEventParameterName,
} from '@capgo/capacitor-facebook-analytics';

await FacebookAnalytics.logEvent({
  event: FacebookEventName.CompletedRegistration,
  params: {
    [FacebookEventParameterName.RegistrationMethod]: 'email',
  },
});
```

### `logEvent` with value and currency

Send value-bearing standard events with the `fb_currency` parameter.

```typescript
import {
  FacebookAnalytics,
  FacebookEventName,
  FacebookEventParameterName,
} from '@capgo/capacitor-facebook-analytics';

await FacebookAnalytics.logEvent({
  event: FacebookEventName.AddedToCart,
  valueToSum: 19.99,
  currency: 'USD',
  params: {
    [FacebookEventParameterName.ContentType]: 'product',
    [FacebookEventParameterName.ContentId]: 'sku-123',
  },
});
```

### `logPurchase`

Log a purchase event.

```typescript
import { FacebookAnalytics } from '@capgo/capacitor-facebook-analytics';

await FacebookAnalytics.logPurchase({
  amount: 9.99,
  currency: 'USD',
});
```

## Full Reference

- [GitHub](https://github.com/Cap-go/capacitor-facebook-analytics/)
- [Docs](/docs/plugins/facebook-analytics/)

## Keep going from Using @capgo/capacitor-facebook-analytics

If you are using **Using @capgo/capacitor-facebook-analytics** to plan native plugin work, connect it with [@capgo/capacitor-facebook-analytics](/docs/plugins/facebook-analytics/) for the implementation detail in @capgo/capacitor-facebook-analytics, [Getting Started](/docs/plugins/facebook-analytics/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
