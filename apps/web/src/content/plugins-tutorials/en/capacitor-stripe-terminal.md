---
locale: en
---
# Using @capgo/capacitor-stripe-terminal

Capacitor plugin for Stripe Terminal in-person payments.

## Install

```bash
bun add @capgo/capacitor-stripe-terminal
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Initialize Terminal with a connection token provider endpoint.
- `discoverReaders` - Discover Tap to Pay, Bluetooth, or Internet readers.
- `cancelDiscoverReaders` - Cancel an in-flight reader discovery session.
- `connectReader` - Connect to a discovered reader.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-stripe-terminal/
- Docs: /docs/plugins/stripe-terminal/

## Related plugins

- Subscriptions: [@capgo/native-purchases](/docs/plugins/native-purchases/)
- Wallet-only payments: [@capgo/capacitor-pay](/docs/plugins/pay/)
