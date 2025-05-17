---
locale: en
---
# Using @capgo/native-purchases Package

The @capgo/native-purchases package is a plugin for Capacitor that provides easy in-app purchase functionality. In this tutorial, we will walk through the steps of installing and using the package in your Capacitor project.

## Installation

To install the @capgo/native-purchases package, open your terminal and run the following command:

```bash
npm install @capgo/native-purchases
npx cap sync
```

This will install the package and sync the native files with your project.

### Android Setup

If you are using Android, you need to add some configuration to your AndroidManifest.xml file. Open the file located at `android/app/src/main/AndroidManifest.xml` and add the following code:

```xml
<!-- Add any necessary configuration here -->
```

### iOS Setup

If you are using iOS, no further steps are needed.

## Using the Package

The @capgo/native-purchases package provides several methods for handling in-app purchases. Here are some examples of how to use these methods:

### Restoring Purchases

To restore a user's previous purchases, use the `restorePurchases()` method:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.restorePurchases();
```

### Purchasing a Product

To initiate a purchase for a specific product, use the `purchaseProduct()` method:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.purchaseProduct({ productIdentifier: 'com.example.product' });
```

### Getting Product Information

To retrieve information about a specific product, use the `getProducts()` method:

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.getProducts({ productIdentifiers: ['com.example.product'] });
```

These are just a few examples of how to use the @capgo/native-purchases package. For more detailed information on the available methods and their parameters, refer to the package documentation.

## Conclusion

In this tutorial, we covered the installation process and basic usage of the @capgo/native-purchases package. By following the steps outlined here, you should be able to integrate in-app purchasing functionality into your Capacitor project.
