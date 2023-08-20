# Using @capgo/capacitor-purchases package tutorial

This tutorial will guide you through the process of using the @capgo/capacitor-purchases package for in-app purchases in Capacitor.

## Step 1: Install the package

To install the @capgo/capacitor-purchases package, open your terminal and run the following command:

```bash
npm install @capgo/capacitor-purchases
pnpm dlx cap sync
```

## Step 2: Configure the Android platform

If you're targeting the Android platform, you need to add some configuration to the android/app/src/main/AndroidManifest.xml file. Open the file and add the following code snippet:

```xml
<!-- Add your configuration here -->
```

## Step 3: Set up the package

To set up the @capgo/capacitor-purchases package, use the `setup` method with your API key and an optional app user ID. Here's an example:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const setupPurchases = async () => {
  const apiKey = "YOUR_API_KEY";
  const appUserID = "OPTIONAL_APP_USER_ID";

  await CapacitorPurchases.setup({ apiKey, appUserID });
};

setupPurchases();
```

## Step 4: Handle purchases update event

You can listen to the "purchasesUpdate" event to get notified when there's a change in the user's purchases. Here's an example of how to add a listener for the event:

```typescript
import { Plugins, PluginListenerHandle } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const addPurchasesUpdateListener = (): PluginListenerHandle => {
  return CapacitorPurchases.addListener(
    "purchasesUpdate",
    (data: { purchases: Package; customerInfo: CustomerInfo }) => {
      // Handle purchases update here
    }
  );
};

const purchasesUpdateListener = addPurchasesUpdateListener();
```

## Step 5: Fetch available offerings

You can use the `getOfferings` method to fetch the available offerings for the user. Here's an example:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const getOfferings = async () => {
  const offerings = await CapacitorPurchases.getOfferings();
  console.log(offerings);
};

getOfferings();
```

## Step 6: Purchase a package

To make a purchase, use the `purchasePackage` method with the package ID. Here's an example:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const purchasePackage = async (packageId: string) => {
  await CapacitorPurchases.purchasePackage({ packageId });
};

purchasePackage("PACKAGE_ID");
```

## Step 7: Restore purchases

If you want to restore the user's purchases, use the `restorePurchases` method. Here's an example:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const restorePurchases = async () => {
  await CapacitorPurchases.restorePurchases();
};

restorePurchases();
```

## That's it!

You've successfully learned how to use the @capgo/capacitor-purchases package for in-app purchases in Capacitor. Happy coding!