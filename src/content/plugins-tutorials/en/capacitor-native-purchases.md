---
locale: en
---
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
