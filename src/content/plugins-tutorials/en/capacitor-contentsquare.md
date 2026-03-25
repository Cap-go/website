---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-contentsquare in Capacitor 8 Apps

`@capgo/capacitor-contentsquare` brings the Contentsquare mobile SDK to Capacitor 8 projects with a packaging layer that fits modern Capgo plugins. It lets you manage consent, send screenviews, track transactions, attach dynamic variables, and configure session replay masking from a single JavaScript API.

## Why use Contentsquare in a Capacitor app?

Contentsquare helps product and growth teams understand how users actually move through the app:

- Track screen-level behavior across onboarding, discovery, and checkout funnels.
- Associate revenue events with sessions using transaction tracking.
- Segment sessions using dynamic variables such as store, country, experiment bucket, or subscription tier.
- Configure replay masking and capture rules without rewriting native code.

## Install the plugin

Install the package in your Capacitor app, then sync native projects:

```bash
bun add @capgo/capacitor-contentsquare
bunx cap sync
```

## Handle consent correctly

Contentsquare users are opted out by default. After your consent UI grants analytics permission, start collection explicitly:

```ts
import { ContentsquarePlugin } from '@capgo/capacitor-contentsquare';

await ContentsquarePlugin.optIn();
```

If a user revokes consent later:

```ts
await ContentsquarePlugin.optOut();
```

## Send your first screenview

At least one screenview is required for a session to be useful in Contentsquare:

```ts
await ContentsquarePlugin.sendScreenName('Home');
```

Use stable screen template names rather than highly specific content labels. For example, prefer `Product Detail` over a full product title.

## Track purchases

Send the transaction once when the purchase is actually confirmed:

```ts
import { ContentsquarePlugin, CurrencyCode } from '@capgo/capacitor-contentsquare';

await ContentsquarePlugin.sendTransaction({
  transactionValue: 49.9,
  transactionCurrency: CurrencyCode.EUR,
  transactionId: 'order-4901',
});
```

## Add dynamic variables

Dynamic variables are useful for segmentation:

```ts
await ContentsquarePlugin.sendDynamicVar({
  dynVarKey: 'ab_variant',
  dynVarValue: 'checkout_redesign_b',
});

await ContentsquarePlugin.sendDynamicVar({
  dynVarKey: 'loyalty_level',
  dynVarValue: 3,
});
```

## Configure replay masking

Use replay helper APIs when screens contain sensitive content:

```ts
await ContentsquarePlugin.excludeURLForReplay('/payment/');

await ContentsquarePlugin.setCapturedElementsSelector('[data-cs-capture]');

await ContentsquarePlugin.setPIISelectors({
  PIISelectors: ['.email', '.credit-card'],
  Attributes: [
    { selector: 'input[name="email"]', attrName: 'value' },
    { selector: 'input[name="card"]', attrName: ['value', 'placeholder'] },
  ],
});
```

## iOS in-app features setup

On iOS, the host app must still expose the URL scheme expected by Contentsquare and forward deeplinks to `Contentsquare.handle(url:)`. Without that step, core tracking still works, but in-app tooling and some debugging features are incomplete.

## Recommended app structure

A simple way to integrate the plugin is to centralize it in an analytics service:

```ts
import { ContentsquarePlugin, CurrencyCode } from '@capgo/capacitor-contentsquare';

export class CsAnalyticsService {
  async grantConsent() {
    await ContentsquarePlugin.optIn();
  }

  async trackScreen(name: string) {
    await ContentsquarePlugin.sendScreenName(name);
  }

  async trackPurchase(total: number, orderId: string) {
    await ContentsquarePlugin.sendTransaction({
      transactionValue: total,
      transactionCurrency: CurrencyCode.EUR,
      transactionId: orderId,
    });
  }

  async setStore(store: string) {
    await ContentsquarePlugin.sendDynamicVar({
      dynVarKey: 'store',
      dynVarValue: store,
    });
  }
}
```

## Final notes

This plugin is a Capgo-maintained Capacitor 8 port of the current Contentsquare Capacitor API surface. For the latest product-level guidance around naming strategy, replay, privacy, and mobile debugging, pair this plugin with the official Contentsquare documentation and your own consent policy.
