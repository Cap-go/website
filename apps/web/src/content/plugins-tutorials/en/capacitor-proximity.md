---
locale: en
---
# Using @capgo/capacitor-proximity

Capacitor plugin for enabling proximity monitoring in mobile apps.

## Install

```bash
bun add @capgo/capacitor-proximity
bunx cap sync
```

## What This Plugin Exposes

- `enable` - Enable proximity monitoring.
- `disable` - Disable proximity monitoring.
- `getStatus` - Get the current sensor availability and plugin enabled state.

## Example Usage

### `enable`

Enable proximity monitoring.

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

await CapacitorProximity.enable();
```

### `disable`

Disable proximity monitoring.

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

await CapacitorProximity.disable();
```

### `getStatus`

Get the current sensor availability and plugin enabled state.

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

const status = await CapacitorProximity.getStatus();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-proximity/
- Docs: /docs/plugins/proximity/
