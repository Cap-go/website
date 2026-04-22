---
locale: en
---
# Using @capgo/capacitor-ivs-player

Ivs player for capacitor app.

## Install

```bash
bun add @capgo/capacitor-ivs-player
bunx cap sync
```

## What This Plugin Exposes

- `create`
- `start`
- `cast`
- `getCastStatus`

## Example Usage

### `create`

See the upstream definitions for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.create({} as {
    url: string;
    pip?: boolean;
    title?: string;
    subtitle?: string;
    cover?: string;
    autoPlay?: boolean;
    toBack?: boolean;
    x?: number;
    y?: number;
    width?: number;

    height?: number;
  });
```

### `start`

See the upstream definitions for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.start();
```

### `cast`

See the upstream definitions for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.cast();
```

### `getCastStatus`

See the upstream definitions for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.getCastStatus();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-ivs-player/
- Docs: /docs/plugins/ivs-player/
