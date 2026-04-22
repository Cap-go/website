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
