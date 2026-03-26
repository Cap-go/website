---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-contentsquare in Capacitor 8 Apps

`@capgo/capacitor-contentsquare` wires the Contentsquare mobile SDK into Capacitor 8 projects with a Capgo-friendly plugin surface. This tutorial focuses on the integration decisions you typically need to make (consent boundaries, naming strategy, event timing, and ownership), while the step-by-step API snippets live in the plugin docs.

## Start with the plugin docs

- Getting started: [Contentsquare Getting Started](/docs/plugins/contentsquare/getting-started/)
- iOS setup notes: [Contentsquare iOS Setup](/docs/plugins/contentsquare/ios/)
- Android notes: [Contentsquare Android Notes](/docs/plugins/contentsquare/android/)

If you only need installation and the basic API examples, those pages are the canonical reference.

## Install and sync (Bun)

```bash
bun add @capgo/capacitor-contentsquare
bunx cap sync
```

## Decide what owns consent

Treat consent as a product feature, not an analytics toggle. The simplest rule is:

- The consent UI (or your privacy layer) is the only code allowed to call `optIn()` or `optOut()`.
- Everyone else can only call tracking methods when the privacy layer says tracking is allowed.

This keeps you from accidentally emitting events before consent is granted.

## Choose a screen naming strategy

For clean analysis, define names as stable templates (not user-specific content). A practical approach:

- Build a centralized set of constants: `Screen.Home`, `Screen.ProductDetail`, `Screen.Checkout`.
- Keep names consistent across iOS and Android route stacks.
- Reuse names when only parameters change (for example, item ID).

## Track transactions where the truth happens

Only emit purchase tracking once the app has a confirmed result (for example, a server receipt or a finalized payment state). Avoid firing on UI intent (button press) unless you explicitly label it as an attempt.

## Recommended app structure

A low-friction way to integrate is to centralize it behind an analytics service and keep the plugin API out of UI components:

```ts
import { ContentsquarePlugin, CurrencyCode } from '@capgo/capacitor-contentsquare';

export class CsAnalyticsService {
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

  async setContext(key: string, value: string | number) {
    await ContentsquarePlugin.sendDynamicVar({
      dynVarKey: key,
      dynVarValue: value,
    });
  }
}
```

## Replay privacy checklist

Before enabling replay in production:

- Decide what should never be captured (inputs, payment fields, identity screens).
- Add capture selectors intentionally (favor explicit allow-listing).
- Keep the selector list owned by the same team that owns privacy compliance.

For the specific helper methods, use the examples in the plugin docs.

## Final notes

This plugin is a Capgo-maintained Capacitor 8 port of the current Contentsquare Capacitor API surface. Pair it with your existing consent policy and the official Contentsquare documentation for product-level guidance around replay, privacy, and debugging.
