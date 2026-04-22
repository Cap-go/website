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
- `purchaseProduct` - Started purchase process for the given product.

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

Started purchase process for the given product.

```typescript
import { NativePurchases } from '@capgo/native-purchases';

await NativePurchases.purchaseProduct({} as {
    productIdentifier: string;
    planIdentifier?: string;
    productType?: PURCHASE_TYPE;
    quantity?: number;
    appAccountToken?: string;
    isConsumable?: boolean;
    autoAcknowledgePurchases?: boolean;
  });
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-purchases/
- Docs: /docs/plugins/native-purchases/
