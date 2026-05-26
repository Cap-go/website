---
locale: en
---
# Using @revenuecat/purchases-capacitor

Capacitor in-app purchases and subscriptions made easy. Support for iOS and Android.

## Install

```bash
bun add @revenuecat/purchases-capacitor
bunx cap sync
```

## What This Plugin Exposes

- `configure` - Sets up Purchases with your API key and an app user id.
- `getVirtualCurrencies` - Fetches the virtual currencies for the current subscriber.
- `invalidateVirtualCurrenciesCache` - Invalidates the cache for virtual currencies.
- `getCachedVirtualCurrencies` - The currently cached if one is available. This value will remain null until virtual currencies have been fetched at least once with or an equivalent function.

## Example Usage

### `configure`

Sets up Purchases with your API key and an app user id.

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

await Purchases.configure({} as PurchasesConfiguration);
```

### `getVirtualCurrencies`

Fetches the virtual currencies for the current subscriber.

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

await Purchases.getVirtualCurrencies();
```

### `invalidateVirtualCurrenciesCache`

Invalidates the cache for virtual currencies.

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

await Purchases.invalidateVirtualCurrenciesCache();
```

### `getCachedVirtualCurrencies`

The currently cached if one is available. This value will remain null until virtual currencies have been fetched at least once with or an equivalent function.

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

await Purchases.getCachedVirtualCurrencies();
```

## Full Reference

- GitHub: https://github.com/RevenueCat/purchases-capacitor/

## Keep going from Using @revenuecat/purchases-capacitor

If you are using **Using @revenuecat/purchases-capacitor** to plan payments and purchases, connect it with [Capgo Pricing](/pricing/) for the product workflow in Capgo Pricing, [Payment system](/docs/webapp/payment/) for the implementation detail in Payment system, [@capgo/native-purchases](/docs/plugins/native-purchases/) for the implementation detail in @capgo/native-purchases, [Getting Started](/docs/plugins/native-purchases/getting-started/) for the implementation detail in Getting Started, and [Revenue Playbook](/docs/plugins/native-purchases/revenue-playbook/) for the implementation detail in Revenue Playbook.
