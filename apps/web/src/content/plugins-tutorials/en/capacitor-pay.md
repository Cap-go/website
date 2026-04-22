---
locale: en
---
# Using @capgo/capacitor-pay

Capacitor plugin to trigger native payment for iOS(Apple pay) and Android(Google Pay).

## Install

```bash
bun add @capgo/capacitor-pay
bunx cap sync
```

## What This Plugin Exposes

- `isPayAvailable` - Checks whether native pay is available on the current platform. On iOS this evaluates Apple Pay, on Android it evaluates Google Pay.
- `requestPayment` - Presents the native pay sheet for the current platform. Provide the Apple Pay configuration on iOS and the Google Pay configuration on Android.

## Example Usage

### `isPayAvailable`

Checks whether native pay is available on the current platform. On iOS this evaluates Apple Pay, on Android it evaluates Google Pay.

```typescript
import { Pay } from '@capgo/capacitor-pay';

await Pay.isPayAvailable();
```

### `requestPayment`

Presents the native pay sheet for the current platform. Provide the Apple Pay configuration on iOS and the Google Pay configuration on Android.

```typescript
import { Pay } from '@capgo/capacitor-pay';

await Pay.requestPayment({} as PayPaymentOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-pay/
- Docs: /docs/plugins/pay/
