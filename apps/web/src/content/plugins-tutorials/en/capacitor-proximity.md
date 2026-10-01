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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';
```

## API at a glance

| Method | Description |
| --- | --- |
| `enable` | Enable proximity monitoring. |
| `disable` | Disable proximity monitoring. |
| `getStatus` | Get the current sensor availability and plugin enabled state. |

## Examples

### `enable()`

Enable proximity monitoring.

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

await CapacitorProximity.enable();
```

### `disable()`

Disable proximity monitoring.

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

await CapacitorProximity.disable();
```

### `getStatus()`

Get the current sensor availability and plugin enabled state.

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

const status = await CapacitorProximity.getStatus();
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-proximity/)
- [Documentation](/docs/plugins/proximity/)
- [API reference](/docs/plugins/proximity/getting-started/)

## Keep going from Using @capgo/capacitor-proximity

If you are using **Using @capgo/capacitor-proximity** to plan native plugin work, connect it with [@capgo/capacitor-proximity](/docs/plugins/proximity/) for the implementation detail in @capgo/capacitor-proximity, [Getting Started](/docs/plugins/proximity/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
