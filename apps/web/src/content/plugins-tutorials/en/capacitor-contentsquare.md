---
locale: en
---
# Using @capgo/capacitor-contentsquare

Internal native bridge contract implemented by Capacitor.

## Install

```bash
bun add @capgo/capacitor-contentsquare
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';
```

## API at a glance

| Method | Description |
| --- | --- |
| `optIn` | See the source definitions for current behavior. |
| `optOut` | See the source definitions for current behavior. |
| `sendScreenName` | See the source definitions for current behavior. |
| `sendTransaction` | See the source definitions for current behavior. |
| `sendDynamicVarWithStringValue` | See the source definitions for current behavior. |
| `sendDynamicVarWithIntValue` | See the source definitions for current behavior. |
| `onReady` | See the source definitions for current behavior. |
| `excludeURLForReplay` | See the source definitions for current behavior. |
| `setPIISelectors` | See the source definitions for current behavior. |
| `setCapturedElementsSelector` | See the source definitions for current behavior. |
| `collect` | See the source definitions for current behavior. |

## Examples

### `optIn()`

See the API reference for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.optIn();
```

### `optOut()`

See the API reference for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.optOut();
```

### `sendScreenName()`

See the API reference for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.sendScreenName({ name: 'example' });
```

### `sendTransaction()`

See the API reference for the current contract.

```typescript
import { Contentsquare, CurrencyCode } from '@capgo/capacitor-contentsquare';

await Contentsquare.sendTransaction({
  transactionValue: 1,
  transactionCurrency: CurrencyCode.USD,
});
```

### `sendDynamicVarWithStringValue()`

See the API reference for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.sendDynamicVarWithStringValue({
  dynVarKey: 'dyn-var-key-123',
  dynVarValue: 'dyn-var-value',
});
```

### `sendDynamicVarWithIntValue()`

See the API reference for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.sendDynamicVarWithIntValue({
  dynVarKey: 'dyn-var-key-123',
  dynVarValue: 'dyn-var-value',
});
```

The table above lists all 11 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-contentsquare/) for the full contract of each one.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-contentsquare/)
- [Documentation](/docs/plugins/contentsquare/)
- [API reference](/docs/plugins/contentsquare/getting-started/)

## Keep going from Using @capgo/capacitor-contentsquare

If you are using **Using @capgo/capacitor-contentsquare** to plan native plugin work, connect it with [@capgo/capacitor-contentsquare](/docs/plugins/contentsquare/) for the implementation detail in @capgo/capacitor-contentsquare, [Getting Started](/docs/plugins/contentsquare/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
