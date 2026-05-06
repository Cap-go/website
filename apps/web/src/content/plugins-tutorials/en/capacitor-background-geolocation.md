---
locale: en
---
# Using @capgo/background-geolocation

Accurate background geolocation and native geofencing for Capacitor apps on iOS and Android. Use it to stream precise location updates, monitor circular regions, and deliver geofence enter/exit transitions to JavaScript or your backend.

## Install

```bash
bun add @capgo/background-geolocation
bunx cap sync
```

## What This Plugin Exposes

- `start` - Stream accurate foreground or background location updates.
- `stop` - Stop active location tracking.
- `openSettings` - Open native settings when users need to fix location permissions.
- `setPlannedRoute` - Play a native sound when the user leaves a planned route.
- `setupGeofencing` - Configure native geofence defaults and optional transition webhook delivery.
- `addGeofence` - Monitor a circular iOS or Android geofence region.
- `removeGeofence` / `removeAllGeofences` - Stop monitoring one or all registered regions.
- `getMonitoredGeofences` - List monitored region identifiers.
- `geofenceTransition` listener - Receive enter and exit events while the app is active.

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

### Native geofencing

Monitor stores, job sites, delivery zones, campuses, or check-in areas with native iOS and Android geofences. Add a `url` to let native code POST transition payloads while the WebView is suspended.

```typescript
import { BackgroundGeolocation } from '@capgo/background-geolocation';

await BackgroundGeolocation.setupGeofencing({
  url: 'https://api.example.com/geofences',
  notifyOnEntry: true,
  notifyOnExit: true,
  payload: { userId: '123' },
});

await BackgroundGeolocation.addGeofence({
  identifier: 'warehouse',
  latitude: 40.7128,
  longitude: -74.006,
  radius: 200,
});

const listener = await BackgroundGeolocation.addListener(
  'geofenceTransition',
  (event) => console.log(event.identifier, event.transition),
);

await BackgroundGeolocation.removeGeofence({ identifier: 'warehouse' });
await listener.remove();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-background-geolocation/
- Docs: /docs/plugins/background-geolocation/
