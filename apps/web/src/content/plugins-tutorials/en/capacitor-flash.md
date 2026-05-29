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

## Keep going from Using @capgo/capacitor-flash

If you are using **Using @capgo/capacitor-flash** to plan dashboard and API operations, connect it with [@capgo/capacitor-flash](/docs/plugins/flash/) for the implementation detail in @capgo/capacitor-flash, [Getting Started](/docs/plugins/flash/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
