---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-native-purchases for iOS and Android Mobile Apps

The `@capgo/capacitor-native-purchases` package provides native native purchases functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating native purchases features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings native purchases capabilities to both iOS and Android mobile platforms.

## Why Use native purchases in Your Capacitor Mobile App?

The @capgo/capacitor-native-purchases plugin enables your iOS and Android mobile applications to leverage native native purchases functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native native purchases performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

# Using @capgo/native-purchases

The `@capgo/native-purchases` package provides in-app purchases and subscriptions with a unified API. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/native-purchases
npx cap sync
```

## Usage

### Initialize

```typescript
import { NativePurchases } from '@capgo/native-purchases';

await NativePurchases.initialize({
  apiKey: 'YOUR_API_KEY',
});
```

### Get Products

```typescript
import { NativePurchases } from '@capgo/native-purchases';

const products = await NativePurchases.getProducts({
  productIdentifiers: ['product_1', 'product_2'],
});

console.log('Available products:', products);
```

### Purchase Product

```typescript
import { NativePurchases } from '@capgo/native-purchases';

const result = await NativePurchases.purchaseProduct({
  productIdentifier: 'product_1',
});

console.log('Purchase result:', result);
```

That's it! You have successfully integrated in-app purchases into your Capacitor app.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for native purchases functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for native purchases functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this native purchases plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-native-purchases into your Capacitor mobile application for iOS and Android. This plugin provides native native purchases capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced native purchases features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-native-purchases).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this native purchases plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.

---

# Native Purchases with Capacitor

`@capgo/native-purchases` is the official Capgo plugin for integrating in-app purchases and subscriptions on iOS (StoreKit 2) and Android (Google Play Billing 7). The latest release ships a modern TypeScript API with platform-specific safeguards such as mandatory `planIdentifier` values for Android subscriptions, optional `appAccountToken` support, listeners for StoreKit transaction updates, and helpers like `manageSubscriptions()` to open the system subscription screen.

## Why use this plugin?
- Battle-tested StoreKit 2 implementation with transaction listeners
- Google Play Billing 7 with automatic acknowledgement/consumption
- Same API for in-app products and subscriptions
- Optional `appAccountToken` to link purchases to your users
- Helper utilities: `isBillingSupported`, `getPurchases`, `manageSubscriptions`, `getPluginVersion`

## Installation

```bash
npm install @capgo/native-purchases
npx cap sync
```

## Quick start flow

```typescript
import { NativePurchases, PURCHASE_TYPE } from '@capgo/native-purchases';

const monthlySubId = 'com.yourapp.premium.monthly';
const monthlyPlanId = 'monthly-plan'; // Base Plan ID from Play Console

async function initStore() {
  const { isBillingSupported } = await NativePurchases.isBillingSupported();
  if (!isBillingSupported) {
    throw new Error('Billing not supported on this device');
  }

  const { products } = await NativePurchases.getProducts({
    productIdentifiers: [monthlySubId, 'com.yourapp.premium.lifetime'],
    productType: PURCHASE_TYPE.SUBS,
  });

  products.forEach((product) => {
    console.log(`${product.title} — ${product.priceString}`);
  });
}

async function buyMonthlySubscription(appAccountToken?: string) {
  const transaction = await NativePurchases.purchaseProduct({
    productIdentifier: monthlySubId,
    planIdentifier: monthlyPlanId, // REQUIRED for Android subscriptions, ignored on iOS
    productType: PURCHASE_TYPE.SUBS,
    quantity: 1,
    appAccountToken, // UUID required on iOS, any obfuscated string (<=64 chars) on Android
  });

  console.log('Transaction ID', transaction.transactionId);
}

async function restore() {
  await NativePurchases.restorePurchases();
}
```

## Handling purchase status

Use `getPurchases()` to inspect what the stores currently report:

```typescript
import { PURCHASE_TYPE } from '@capgo/native-purchases';

const { purchases } = await NativePurchases.getPurchases({
  productType: PURCHASE_TYPE.SUBS,
});

purchases.forEach((purchase) => {
  if (purchase.isActive === true && purchase.expirationDate) {
    console.log('iOS sub active until', purchase.expirationDate);
  }

  if (purchase.purchaseState === 'PURCHASED' && purchase.isAcknowledged) {
    console.log('Android purchase acknowledged for', purchase.productIdentifier);
  }
});
```

Key differences:
- iOS subscriptions populate `isActive`, `expirationDate`, and `willCancel`. Validate receipts server-side for final authority.
- Android never sets `isActive`/`expirationDate`; rely on `purchaseState` plus backend validation with the Google Play Developer API.
- In-app products on both platforms only prove ownership after receipt/purchase token validation on your server.

## Managing subscriptions

- `restorePurchases()` replays StoreKit history (iOS) / Google Play purchases (Android) and links them to the current device.
- `manageSubscriptions()` opens the native subscription dashboard so users can upgrade/cancel.
- `addListener('transactionUpdated', ...)` surfaces StoreKit pending transactions at app launch for iOS 15+.

## Server-side validation

Always validate purchases on your backend:
1. Send the `receipt` (iOS) or `purchaseToken` (Android) from the `Transaction` returned by `purchaseProduct`.
2. For iOS, call Apple's receipt validation or App Store Server API and track `isActive`/`revocationReason`.
3. For Android, call the Google Play Developer API with the `purchaseToken` to confirm state, expiration, and cancellations.
4. Keep a copy of `appAccountToken` to detect fraud and map store events to user accounts.

Capgo ships a Cloudflare Worker example inside the plugin repository’s `validator/` folder that you can adapt to your backend.

## Additional references

- [Full README and API docs](https://github.com/Cap-go/capacitor-native-purchases)
- [Android testing guide](/docs/plugins/native-purchases/android-sandbox-testing/)
- [iOS testing guide](/docs/plugins/native-purchases/ios-sandbox-testing/)
