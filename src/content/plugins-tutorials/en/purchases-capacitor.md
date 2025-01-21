# @revenuecat/purchases-capacitor Tutorial

This tutorial will guide you through the process of implementing in-app purchases and subscriptions in your Ionic Capacitor app using the `@revenuecat/purchases-capacitor` package.

## Prerequisites

Before we start, make sure you have the following:

- An Ionic Capacitor project set up
- A RevenueCat account (sign up at https://app.revenuecat.com/signup)
- In-app products or subscriptions configured in your app store accounts (Apple App Store and/or Google Play Store)

## Installation

1. Open your terminal or command prompt and navigate to your project directory.

2. Run the following command to install the package:

```bash
npm install @revenuecat/purchases-capacitor
```

3. After installation, sync your Capacitor project:

```bash
npx cap sync
```

## Configuration

1. Import the Purchases module in your app's main TypeScript file (e.g., `app.component.ts`):

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';
```

2. Configure the SDK with your RevenueCat API key:

```typescript
async function initializePurchases() {
  await Purchases.configure({
    apiKey: 'YOUR_REVENUECAT_API_KEY',
  });
}
```

Call this function when your app starts, for example in the `ngOnInit()` method of your main component.

## Basic Usage

### Fetching Available Products

To get the list of available products:

```typescript
async function getProducts() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      const products = offerings.current.availablePackages;
      console.log('Available products:', products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
```

### Making a Purchase

To initiate a purchase:

```typescript
async function purchasePackage(package: PurchasesPackage) {
  try {
    const { customerInfo, productIdentifier } = await Purchases.purchasePackage({ aPackage: package });
    console.log('Purchase successful:', productIdentifier);
    console.log('Customer Info:', customerInfo);
  } catch (error) {
    console.error('Error making purchase:', error);
  }
}
```

### Checking Subscription Status

To check the user's current subscription status:

```typescript
async function checkSubscriptionStatus() {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const activeSubscriptions = customerInfo.activeSubscriptions;
    console.log('Active subscriptions:', activeSubscriptions);
  } catch (error) {
    console.error('Error checking subscription status:', error);
  }
}
```

### Restoring Purchases

To restore a user's previous purchases:

```typescript
async function restorePurchases() {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    console.log('Purchases restored:', customerInfo);
  } catch (error) {
    console.error('Error restoring purchases:', error);
  }
}
```

## Advanced Features

### Identifying Users

If you have your own user ID system, you can identify users to RevenueCat:

```typescript
async function identifyUser(userId: string) {
  try {
    const { customerInfo } = await Purchases.logIn({ appUserID: userId });
    console.log('User identified:', customerInfo);
  } catch (error) {
    console.error('Error identifying user:', error);
  }
}
```

### Checking Introductory Price Eligibility

To check if a user is eligible for an introductory price:

```typescript
async function checkIntroEligibility(productIdentifiers: string[]) {
  try {
    const eligibility = await Purchases.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers });
    console.log('Introductory price eligibility:', eligibility);
  } catch (error) {
    console.error('Error checking eligibility:', error);
  }
}
```

### Setting Attributes

You can set custom attributes for users:

```typescript
async function setUserAttributes() {
  try {
    await Purchases.setAttributes({
      'user_level': '5',
      'user_type': 'premium'
    });
    console.log('Attributes set successfully');
  } catch (error) {
    console.error('Error setting attributes:', error);
  }
}
```

## Conclusion

This tutorial covered the basics of implementing in-app purchases and subscriptions using the `@revenuecat/purchases-capacitor` package. Remember to handle errors appropriately and test your implementation thoroughly.

For more advanced usage and detailed API documentation, refer to the RevenueCat documentation at https://docs.revenuecat.com/.

Don't forget to configure your products in the RevenueCat dashboard and link them to your app store products. Also, make sure to test your implementation in a sandbox environment before releasing to production.
