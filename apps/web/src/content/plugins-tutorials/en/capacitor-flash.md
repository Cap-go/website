---
locale: en
---
# Using @capgo/capacitor-flash

Capacitor Flash Plugin for controlling device flashlight/torch.

## Install

```bash
bun add @capgo/capacitor-flash
bunx cap sync
```

## What This Plugin Exposes

- `isAvailable` - Checks if flashlight is available on the device.
- `switchOn` - Turns the flashlight on.
- `switchOff` - Turns the flashlight off.
- `isSwitchedOn` - Checks if the flashlight is currently turned on or off.

## Example Usage

### `isAvailable`

Checks if flashlight is available on the device.

```typescript
import { CapacitorFlash } from '@capgo/capacitor-flash';

const { value } = await CapacitorFlash.isAvailable();
if (value) {
  console.log('Flashlight is available');
}
```

### `switchOn`

Turns the flashlight on.

```typescript
import { CapacitorFlash } from '@capgo/capacitor-flash';

// Turn on at full brightness
await CapacitorFlash.switchOn({ intensity: 1.0 });

// Turn on at half brightness
await CapacitorFlash.switchOn({ intensity: 0.5 });
```

### `switchOff`

Turns the flashlight off.

```typescript
import { CapacitorFlash } from '@capgo/capacitor-flash';

await CapacitorFlash.switchOff();
```

### `isSwitchedOn`

Checks if the flashlight is currently turned on or off.

```typescript
import { CapacitorFlash } from '@capgo/capacitor-flash';

const { value } = await CapacitorFlash.isSwitchedOn();
console.log('Flashlight is on:', value);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-flash/
- Docs: /docs/plugins/flash/
