---
locale: en
---
# Using @capgo/capacitor-stripe

Capacitor plugin for Stripe Payment Sheet, Apple Pay, and Google Pay.

## Install

```bash
bun add @capgo/capacitor-stripe
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Set the Stripe publishable key and optional Connect account.
- `createPaymentSheet` - Create a Payment Sheet from your backend client secret.
- `presentPaymentSheet` - Present the native Stripe Payment Sheet.
- `updateApplePaySheet` - Update Apple Pay line items after shipping contact selection.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-stripe/
- Docs: /docs/plugins/stripe/

## Related plugins

- Subscriptions: [@capgo/native-purchases](/docs/plugins/native-purchases/)
- Wallet-only payments: [@capgo/capacitor-pay](/docs/plugins/pay/)
