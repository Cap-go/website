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

## What This Plugin Exposes

- `optIn`
- `optOut`
- `sendScreenName`
- `sendTransaction`

## Example Usage

### `optIn`

See the upstream definitions for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.optIn();
```

### `optOut`

See the upstream definitions for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.optOut();
```

### `sendScreenName`

See the upstream definitions for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.sendScreenName({} as { name: string });
```

### `sendTransaction`

See the upstream definitions for the current contract.

```typescript
import { Contentsquare } from '@capgo/capacitor-contentsquare';

await Contentsquare.sendTransaction({} as TransactionItem);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-contentsquare/
- Docs: /docs/plugins/contentsquare/

## Keep going from Using @capgo/capacitor-contentsquare

If you are using **Using @capgo/capacitor-contentsquare** to plan native plugin work, connect it with [@capgo/capacitor-contentsquare](/docs/plugins/contentsquare/) for the implementation detail in @capgo/capacitor-contentsquare, [Getting Started](/docs/plugins/contentsquare/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
