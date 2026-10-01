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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';
```

## API at a glance

| Method | Description |
| --- | --- |
| `create` | See the source definitions for current behavior. |
| `start` | See the source definitions for current behavior. |
| `cast` | See the source definitions for current behavior. |
| `getCastStatus` | See the source definitions for current behavior. |
| `pause` | See the source definitions for current behavior. |
| `delete` | See the source definitions for current behavior. |
| `getUrl` | See the source definitions for current behavior. |
| `getState` | See the source definitions for current behavior. |
| `setPlayerPosition` | See the source definitions for current behavior. |
| `getPlayerPosition` | See the source definitions for current behavior. |
| `setAutoQuality` | See the source definitions for current behavior. |
| `getAutoQuality` | See the source definitions for current behavior. |
| `setPip` | See the source definitions for current behavior. |
| `getPip` | See the source definitions for current behavior. |
| `setFrame` | Set the frame of the player view, all number have to be positive and integers. |
| `getFrame` | See the source definitions for current behavior. |
| `setBackgroundState` | See the source definitions for current behavior. |
| `getBackgroundState` | See the source definitions for current behavior. |
| `setMute` | See the source definitions for current behavior. |
| `getMute` | See the source definitions for current behavior. |
| `setQuality` | See the source definitions for current behavior. |
| `getQuality` | See the source definitions for current behavior. |
| `getQualities` | See the source definitions for current behavior. |

## Examples

### `create()`

See the API reference for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.create({ url: 'https://example.com' });
```

### `start()`

See the API reference for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.start();
```

### `cast()`

See the API reference for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.cast();
```

### `getCastStatus()`

See the API reference for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

const result = await CapacitorIvsPlayer.getCastStatus();
console.log(result);
```

### `pause()`

See the API reference for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.pause();
```

### `delete()`

See the API reference for the current contract.

```typescript
import { CapacitorIvsPlayer } from '@capgo/capacitor-ivs-player';

await CapacitorIvsPlayer.delete();
```

The table above lists the 23 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-ivs-player/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorIvsPlayer.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-ivs-player/)
- [Documentation](/docs/plugins/ivs-player/)
- [API reference](/docs/plugins/ivs-player/getting-started/)

## Keep going from Using @capgo/capacitor-ivs-player

If you are using **Using @capgo/capacitor-ivs-player** to plan native plugin work, connect it with [@capgo/capacitor-ivs-player](/docs/plugins/ivs-player/) for the implementation detail in @capgo/capacitor-ivs-player, [Getting Started](/docs/plugins/ivs-player/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
