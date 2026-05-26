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

## What This Plugin Exposes

- `navigate` - Navigate to a location using latitude and longitude.
- `isAppAvailable` - Check if a specific navigation app is available.
- `getAvailableApps` - Get list of available navigation apps on the device.
- `getSupportedApps` - Get list of supported apps for the current platform.

## Example Usage

### `navigate`

Navigate to a location using latitude and longitude.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

await LaunchNavigator.navigate({} as {
    /**
     * Destination coordinates [latitude, longitude]
     */
    destination: [number, number];

    /**
     * Optional navigation options
     */
    options?: NavigateOptions;
  });
```

### `isAppAvailable`

Check if a specific navigation app is available.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

await LaunchNavigator.isAppAvailable({} as {
    /**
     * App identifier to check
     */
    app: IOSNavigationApp | AndroidNavigationApp | string;
  });
```

### `getAvailableApps`

Get list of available navigation apps on the device.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

await LaunchNavigator.getAvailableApps();
```

### `getSupportedApps`

Get list of supported apps for the current platform.

```typescript
import { LaunchNavigator } from '@capgo/capacitor-launch-navigator';

await LaunchNavigator.getSupportedApps();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-launch-navigator/
- Docs: /docs/plugins/launch-navigator/

## Keep going from Using @capgo/capacitor-launch-navigator

If you are using **Using @capgo/capacitor-launch-navigator** to plan native plugin work, connect it with [@capgo/capacitor-launch-navigator](/docs/plugins/launch-navigator/) for the implementation detail in @capgo/capacitor-launch-navigator, [Getting Started](/docs/plugins/launch-navigator/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
