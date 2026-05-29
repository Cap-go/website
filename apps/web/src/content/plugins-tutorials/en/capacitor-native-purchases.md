---
locale: en
---
# Using @capgo/native-purchases

In-app Subscriptions Made Easy.

## Install

```bash
bun add @capgo/native-purchases
bunx cap sync
```

## What This Plugin Exposes

- `restorePurchases` - Restores a user's previous and links their appUserIDs to any user's also using those .
- `getAppTransaction` - Gets the App Transaction information, which provides details about when the user originally downloaded or purchased the app.
- `isEntitledToOldBusinessModel` - Compares the original app version from the App Transaction against a target version to determine if the user is entitled to features from an earlier business model.
- `getProducts` - Loads store product metadata, including supported iOS subscription pricing terms.
- `purchaseProduct` - Starts the purchase process for the selected product and billing plan.

## Example Usage

### `restorePurchases`

Restores a user's previous and links their appUserIDs to any user's also using those .

```typescript
import { NativePurchases } from '@capgo/native-purchases';

await NativePurchases.restorePurchases();
```

### `getAppTransaction`

Gets the App Transaction information, which provides details about when the user originally downloaded or purchased the app.

```typescript
import { NativePurchases } from '@capgo/native-purchases';

const { appTransaction } = await NativePurchases.getAppTransaction();

// Check if user downloaded before version 2.0.0 (when subscription was added)
if (compareVersions(appTransaction.originalAppVersion, '2.0.0') < 0) {
  // User gets free access - they downloaded before subscriptions
  grantFreeAccess();
}
```

### `isEntitledToOldBusinessModel`

Compares the original app version from the App Transaction against a target version to determine if the user is entitled to features from an earlier business model.

```typescript
import { NativePurchases } from '@capgo/native-purchases';

// Check if user downloaded before version 2.0.0/build 42 (when subscription was added)
const result = await NativePurchases.isEntitledToOldBusinessModel({
  targetVersion: '2.0.0',
  targetBuildNumber: '42'
});

if (result.isOlderVersion) {
  console.log(`User downloaded v${result.originalAppVersion}, granting free access`);
  grantFreeAccess();
}
```

### `purchaseProduct`

Start the purchase process for the given product. For Android subscriptions, pass the Google Play base plan ID as `planIdentifier`. For supported iOS subscriptions that offer monthly billing with a 12-month commitment, pass `billingPlanType: 'monthly'`.

```typescript
import { NativePurchases, PURCHASE_TYPE } from '@capgo/native-purchases';

await NativePurchases.purchaseProduct({
  productIdentifier: 'com.example.premium.monthly',
  planIdentifier: 'monthly-plan',
  productType: PURCHASE_TYPE.SUBS,
});
```

### iOS monthly commitment subscriptions

On supported iOS versions, StoreKit can expose a monthly billing plan with a 12-month commitment through `pricingTerms`. Show these terms on your paywall before purchase:

```typescript
import { NativePurchases, PURCHASE_TYPE } from '@capgo/native-purchases';

const { products } = await NativePurchases.getProducts({
  productIdentifiers: ['com.example.premium.yearly'],
  productType: PURCHASE_TYPE.SUBS,
});

const yearlyProduct = products.find(
  (product) => product.identifier === 'com.example.premium.yearly',
);
const monthlyCommitment = yearlyProduct?.pricingTerms?.find(
  (term) => term.billingPlanType === 'monthly',
);

if (yearlyProduct && monthlyCommitment) {
  console.log('Monthly price:', monthlyCommitment.billingDisplayPrice);
  console.log('Total commitment:', monthlyCommitment.commitmentInfo?.priceString);

  const transaction = await NativePurchases.purchaseProduct({
    productIdentifier: yearlyProduct.identifier,
    productType: PURCHASE_TYPE.SUBS,
    billingPlanType: 'monthly',
  });

  console.log('Billing plan:', transaction.billingPlanType);
  console.log('Commitment ends:', transaction.commitmentInfo?.expirationDate);
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-purchases/
- Docs: /docs/plugins/native-purchases/
- iOS monthly commitment guide: /docs/plugins/native-purchases/ios-monthly-commitment/

## Keep going from Using @capgo/native-purchases

If you are using **Using @capgo/native-purchases** to plan payments and purchases, connect it with [@capgo/native-purchases](/docs/plugins/native-purchases/) for the implementation detail in @capgo/native-purchases, [Getting Started](/docs/plugins/native-purchases/getting-started/) for the implementation detail in Getting Started, [Capgo Pricing](/pricing/) for the product workflow in Capgo Pricing, [Payment system](/docs/webapp/payment/) for the implementation detail in Payment system, and [Revenue Playbook](/docs/plugins/native-purchases/revenue-playbook/) for the implementation detail in Revenue Playbook.
