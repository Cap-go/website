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
