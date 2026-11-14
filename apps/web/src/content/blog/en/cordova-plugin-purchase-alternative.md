---
slug: cordova-plugin-purchase-alternative
title: "cordova-plugin-purchase Alternative for Capacitor"
description: "cordova-plugin-purchase alternative for Capacitor: sell subscriptions and in-app products with @capgo/native-purchases, StoreKit 2, and Google Play Billing 7."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-13T09:00:00.000Z
updated_at: 2026-11-13T13:04:33.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an in-app purchase plugin guide"
keywords: cordova-plugin-purchase alternative, capacitor in app purchase, CdvPurchase migration, @capgo/native-purchases, storekit capacitor
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-purchase alternative from Capgo?"
    answer: "@capgo/native-purchases calls StoreKit 2 on iOS and Google Play Billing 7 on Android with getProducts, purchaseProduct, restorePurchases, and transactionUpdated listeners."
  - question: "Is cordova-plugin-purchase abandoned?"
    answer: "No. npm lists cordova-plugin-purchase at 13.20.0 with modified 27 October 2026. The README documents Capacitor support through capacitor-plugin-cdv-purchase and the CdvPurchase store API."
  - question: "Why switch if CdvPurchase already supports Capacitor?"
    answer: "Teams that want a smaller promise-based surface, direct store receipts, and Capgo's StoreKit 2 plus Play Billing 7 stack often migrate away from the CdvPurchase state machine and store.when() chains."
  - question: "Does @capgo/native-purchases validate receipts?"
    answer: "It exposes receipt data and purchase tokens. You still validate on your backend. The README documents validation patterns and transactionUpdated events for iOS."
  - question: "What Android permission is required?"
    answer: "Add com.android.vending.BILLING to AndroidManifest.xml as shown in the plugin README."
  - question: "Where are docs?"
    answer: "https://capgo.app/docs/plugins/native-purchases/, npm @capgo/native-purchases, GitHub Cap-go/capacitor-native-purchases."
---

The **cordova-plugin-purchase alternative** many Capacitor teams adopt when they outgrow the `CdvPurchase.store` workflow is [`@capgo/native-purchases`](/plugins/native-purchases/). It talks to **StoreKit 2 on iOS** and **Google Play Billing 7 on Android** through promise methods such as `getProducts`, `purchaseProduct`, and `restorePurchases`, with `transactionUpdated` listeners instead of `store.when()` chains. This guide explains when that trade-off makes sense, how to install the plugin, and how to map common `cordova-plugin-purchase` calls.

## Why teams leave cordova-plugin-purchase in new Capacitor code

`cordova-plugin-purchase` is actively maintained. npm shows version **13.20.0** with a last `modified` date of **27 October 2026**. The README states the plugin supports Capacitor through **`capacitor-plugin-cdv-purchase`** and the global `CdvPurchase.store` facade with product registration, `store.initialize()`, and `store.when()` approved handlers.

Reasons teams still pick `@capgo/native-purchases` on a Capacitor migration:

- **Simpler API shape.** Capgo exposes one method per store action (`purchaseProduct`, `getPurchases`, `acknowledgePurchase`) instead of the FSM-style `store.when().productUpdated().approved()` pipeline.
- **Native billing stacks called out in the README.** StoreKit 2 on iOS 15+ and Google Play Billing 7.x on Android, plus iOS subscription commitment helpers documented under `/docs/plugins/native-purchases/`.
- **Capacitor-first packaging.** Install with `npm install @capgo/native-purchases` and `cap sync` without carrying Cordova globals or the separate `capacitor-plugin-cdv-purchase` bridge unless you still need Braintree payment requests from CdvPurchase.
- **Open source maintenance.** Capgo fixes ship through the public repo where a human still reviews, tests and merges 50+ pull requests daily.

If you rely on CdvPurchase-only features such as Braintree payment requests or the Iaptic validator shortcut, stay on `cordova-plugin-purchase` or run both plugins temporarily while you port checkout flows.

## Install

```bash
bun add @capgo/native-purchases
bunx cap sync
```

**Android:** add billing permission:

```xml
<uses-permission android:name="com.android.vending.BILLING" />
```

Configure products in App Store Connect and Google Play Console, then follow the platform testing guides linked from the [plugin README](https://github.com/Cap-go/capacitor-native-purchases/) (`docs/iOS_TESTING_GUIDE.md` and `docs/ANDROID_TESTING_GUIDE.md`).

## Usage example

```ts
import { NativePurchases, PURCHASE_TYPE } from '@capgo/native-purchases';

const productId = 'com.example.premium.monthly';

export async function buySubscription() {
  const { isBillingSupported } = await NativePurchases.isBillingSupported();
  if (!isBillingSupported) {
    throw new Error('Billing unavailable');
  }

  await NativePurchases.addListener('transactionUpdated', (event) => {
    console.log('Transaction', event.transaction?.transactionId);
  });

  const { products } = await NativePurchases.getProducts({
    productIdentifiers: [productId],
    productType: PURCHASE_TYPE.SUBS,
  });

  await NativePurchases.purchaseProduct({
    productIdentifier: productId,
    productType: PURCHASE_TYPE.SUBS,
    planIdentifier: 'monthly-plan',
    quantity: 1,
  });
}
```

Call `restorePurchases()` from your settings screen and `manageSubscriptions()` when users need the store subscription UI.

## Migrating from Cordova to Capacitor

Uninstall Cordova `cordova-plugin-purchase` or keep it only on screens you have not ported. Import `NativePurchases` and replace `store` orchestration with explicit async flows. Finish or acknowledge transactions per platform rules using `finishTransaction()` on iOS and `acknowledgePurchase()` or `consumePurchase()` on Android where the README requires it.

### API mapping table

| cordova-plugin-purchase (`CdvPurchase.store`) | @capgo/native-purchases |
| --- | --- |
| `store.register([{ id, type }])` | `getProducts({ productIdentifiers, productType })` |
| `store.initialize([Platform.APPLE, Platform.GOOGLE])` | `isBillingSupported()` then `getProducts()` |
| `store.ready()` / `store.update()` | `await getProducts()` after billing check |
| `store.get(productId)` | `getProduct({ productIdentifier, productType })` |
| `store.order(offer)` / `product.getOffer().order()` | `purchaseProduct({ productIdentifier, productType, planIdentifier, quantity })` |
| `store.requestPayment(...)` (Braintree) | Not in Capgo plugin, keep CdvPurchase or Stripe |
| `store.restore()` | `restorePurchases()` |
| `store.owned(productId)` | Inspect `getPurchases()` results or server entitlements |
| `store.when().approved(handler)` | `addListener('transactionUpdated', ...)` |
| `store.validator = url` | Validate receipt or purchase token on your server |
| `store.refresh()` | `getProducts()` or `getPurchases()` |
| `product.transaction.finish()` | `finishTransaction({ transactionIdentifier })` |
| Consumable consume | `consumePurchase({ purchaseToken })` (Android) |

`PURCHASE_TYPE.INAPP` maps to consumable and non-consumable products. `PURCHASE_TYPE.SUBS` maps to paid subscriptions. Android base plan ids from Play Console pass through `planIdentifier` on `purchaseProduct()`, as documented in the getting started guide.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/native-purchases/](/docs/plugins/native-purchases/)
- Marketing page: [/plugins/native-purchases/](/plugins/native-purchases/)
- npm: [https://www.npmjs.com/package/@capgo/native-purchases](https://www.npmjs.com/package/@capgo/native-purchases)
- GitHub: [https://github.com/Cap-go/capacitor-native-purchases/](https://github.com/Cap-go/capacitor-native-purchases/)
- cordova-plugin-purchase: [https://github.com/j3k0/cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase)

Billing rule changes require a native rebuild. Use [Capgo Build](/native-build/) for signed artifacts. Paywall copy and pricing UI can ship faster with [Capgo live updates](/live-update/) once store binaries are current. See [migrating Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/) for the wider migration checklist.
