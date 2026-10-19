---
locale: en
---
# Using @capgo/capacitor-stripe-identity

Capacitor plugin for Stripe Identity verification.

## Why Capgo?

Capgo maintains official forks of [@capacitor-community/stripe](https://github.com/capacitor-community/stripe). We monitor upstream issues and pull requests, merge relevant fixes, and ship updates on current Stripe SDKs with example apps and documentation.

If you use the community package today, the Capgo Stripe plugins are the maintained path with faster turnaround on bugs and platform changes.

## Install

```bash
bun add @capgo/capacitor-stripe-identity
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Load Stripe with your publishable key.
- `create` - Create a verification sheet from your backend session.
- `present` - Present the Identity verification flow.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-stripe-identity/
- Docs: /docs/plugins/stripe-identity/

## Related plugins

- Subscriptions: [@capgo/native-purchases](/docs/plugins/native-purchases/)
- Wallet-only payments: [@capgo/capacitor-pay](/docs/plugins/pay/)
