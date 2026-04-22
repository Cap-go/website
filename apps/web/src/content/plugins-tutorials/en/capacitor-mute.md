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
