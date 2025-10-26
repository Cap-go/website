---
locale: en
---
# Using @revenuecat/purchases-capacitor

The `@revenuecat/purchases-capacitor` package provides in-app subscriptions made easy with RevenueCat SDK. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @revenuecat/purchases-capacitor
npx cap sync
```

## Usage

### Configure RevenueCat

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

await Purchases.configure({
  apiKey: 'YOUR_REVENUECAT_API_KEY',
});
```

### Get Offerings

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

const offerings = await Purchases.getOfferings();
console.log('Available offerings:', offerings);
```

### Purchase Package

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

const result = await Purchases.purchasePackage({
  packageToPurchase: offerings.current.monthly,
});

console.log('Purchase result:', result);
```

That's it! You have successfully integrated RevenueCat purchases into your Capacitor app.
