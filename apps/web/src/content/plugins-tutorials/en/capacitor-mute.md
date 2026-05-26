---
locale: en
---
# Using @capgo/capacitor-mute

Capacitor Mute Plugin for detecting device mute status.

## Install

```bash
bun add @capgo/capacitor-mute
bunx cap sync
```

## What This Plugin Exposes

- `isMuted` - Check if the device mute switch is enabled.

## Example Usage

### `isMuted`

Check if the device mute switch is enabled.

```typescript
import { Mute } from '@capgo/capacitor-mute';

const { value } = await Mute.isMuted();
if (value) {
  console.log('Device is muted');
} else {
  console.log('Device is not muted');
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-mute/
- Docs: /docs/plugins/mute/

## Keep going from Using @capgo/capacitor-mute

If you are using **Using @capgo/capacitor-mute** to plan dashboard and API operations, connect it with [@capgo/capacitor-mute](/docs/plugins/mute/) for the implementation detail in @capgo/capacitor-mute, [Getting Started](/docs/plugins/mute/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
