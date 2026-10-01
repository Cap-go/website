---
locale: en
---
# Using @capgo/capacitor-launch-navigator

Main plugin interface.

## Install

```bash
bun add @capgo/capacitor-launch-navigator
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';
```

## API at a glance

| Method | Description |
| --- | --- |
| `navigate` | Navigate to a location using latitude and longitude. |
| `isAppAvailable` | Check if a specific navigation app is available. |
| `getAvailableApps` | Get list of available navigation apps on the device. |
| `getSupportedApps` | Get list of supported apps for the current platform. |
| `getDefaultApp` | Get the name of the default app for navigation. |
| `getAppIcons` | Fetch provider icons and cache them locally. |
| `refreshAppIcons` | Refresh provider icons, ignoring the cache age. |
| `clearIconCache` | Clear cached provider icons. |

## Examples

### `navigate()`

Navigate to a location using latitude and longitude.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

await LaunchNavigator.navigate({ destination: [48.8566, 2.3522] });
```

### `isAppAvailable()`

Check if a specific navigation app is available.

```typescript
import { LaunchNavigator, IOSNavigationApp } from '@capgo/capacitor-launch-navigator';

const result = await LaunchNavigator.isAppAvailable({ app: IOSNavigationApp.APPLE_MAPS });
console.log(result);
```

### `getAvailableApps()`

Get list of available navigation apps on the device.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

const result = await LaunchNavigator.getAvailableApps();
console.log(result);
```

### `getSupportedApps()`

Get list of supported apps for the current platform.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

const result = await LaunchNavigator.getSupportedApps();
console.log(result);
```

### `getDefaultApp()`

Get the name of the default app for navigation.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

const result = await LaunchNavigator.getDefaultApp();
console.log(result);
```

### `getAppIcons()`

Fetch provider icons and cache them locally.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

const result = await LaunchNavigator.getAppIcons();
console.log(result);
```

The table above lists the 8 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-launch-navigator/).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-launch-navigator/)
- [Documentation](/docs/plugins/launch-navigator/)
- [API reference](/docs/plugins/launch-navigator/getting-started/)

## Keep going from Using @capgo/capacitor-launch-navigator

If you are using **Using @capgo/capacitor-launch-navigator** to plan native plugin work, connect it with [@capgo/capacitor-launch-navigator](/docs/plugins/launch-navigator/) for the implementation detail in @capgo/capacitor-launch-navigator, [Getting Started](/docs/plugins/launch-navigator/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
