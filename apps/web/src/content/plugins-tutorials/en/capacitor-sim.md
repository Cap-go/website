---
locale: en
---
# Using @capgo/capacitor-sim

Capacitor SIM Plugin for retrieving information from device SIM cards.

## Install

```bash
bun add @capgo/capacitor-sim
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { Sim } from '@capgo/capacitor-sim';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getSimCards` | Get information from the device's SIM cards. |
| `checkPermissions` | Check permission to access SIM card information. |
| `requestPermissions` | Request permission to access SIM card information. |

## Examples

### `getSimCards()`

Get information from the device's SIM cards.

```typescript
import { Sim } from '@capgo/capacitor-sim';

const result = await Sim.getSimCards();
console.log(result);
```

### `checkPermissions()`

Check permission to access SIM card information.

```typescript
import { Sim } from '@capgo/capacitor-sim';

const result = await Sim.checkPermissions();
console.log(result);
```

### `requestPermissions()`

Request permission to access SIM card information.

```typescript
import { Sim } from '@capgo/capacitor-sim';

const result = await Sim.requestPermissions();
console.log(result);
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-sim/)
- [Documentation](/docs/plugins/sim/)
- [API reference](/docs/plugins/sim/getting-started/)

## Keep going from Using @capgo/capacitor-sim

If you are using **Using @capgo/capacitor-sim** to plan dashboard and API operations, connect it with [@capgo/capacitor-sim](/docs/plugins/sim/) for the implementation detail in @capgo/capacitor-sim, [Getting Started](/docs/plugins/sim/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
