---
locale: en
---
# Using @capgo/background-geolocation

Main plugin interface for background geolocation functionality. Provides methods to manage location updates and access device settings.

## Install

```bash
bun add @capgo/background-geolocation
bunx cap sync
```

## What This Plugin Exposes

- `start` - To start listening for changes in the device's location, call this method. A Promise is returned to indicate that it finished the call. The callback will be called every time a new location is available, or if there was an error when calling this method. Don't rely on promise rejection for this.
- `stop` - Stops location updates.
- `openSettings` - Opens the device's location settings page. Useful for directing users to enable location services or adjust permissions.
- `setPlannedRoute` - Plays a sound file when the user deviates from the planned route. This should be used to play a sound (in the background too, only for native).

## Example Usage

### `start`

To start listening for changes in the device's location, call this method. A Promise is returned to indicate that it finished the call. The callback will be called every time a new location is available, or if there was an error when calling this method. Don't rely on promise rejection for this.

```typescript
import { BackgroundGeolocation } from '@capgo/background-geolocation';

await BackgroundGeolocation.start(
  {
    backgroundMessage: "App is using your location in the background",
    backgroundTitle: "Location Service",
    requestPermissions: true,
    stale: false,
    distanceFilter: 10
  },
  (location, error) => {
    if (error) {
      console.error('Location error:', error);
      return;
    }
    if (location) {
      console.log('New location:', location.latitude, location.longitude);
    }
  }
);
```

### `stop`

Stops location updates.

```typescript
import { BackgroundGeolocation } from '@capgo/background-geolocation';

await BackgroundGeolocation.stop();
```

### `openSettings`

Opens the device's location settings page. Useful for directing users to enable location services or adjust permissions.

```typescript
import { BackgroundGeolocation } from '@capgo/background-geolocation';

// Direct user to location settings
await BackgroundGeolocation.openSettings();
```

### `setPlannedRoute`

Plays a sound file when the user deviates from the planned route. This should be used to play a sound (in the background too, only for native).

```typescript
import { BackgroundGeolocation } from '@capgo/background-geolocation';

await BackgroundGeolocation.setPlannedRoute({
  soundFile: "notification.mp3",
  route: [[-74.0060, 40.7128], [-118.2437, 34.0522]]
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-background-geolocation/
- Docs: /docs/plugins/background-geolocation/
