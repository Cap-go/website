---
locale: en
---
# Using @capgo/capacitor-native-map

Google Maps on Android, Apple MapKit on iOS, and Google Maps JS on web with one TypeScript API for markers, camera, shapes, clustering, and events.

## Install

```bash
bun add @capgo/capacitor-native-map
bunx cap sync
```

## What This Plugin Exposes

- `create` — Embedded map in a DOM element, or `toBack: true` for a map behind transparent HTML.
- `updateLayout` — Resize and reposition the native map (CSS pixels).
- `setCamera` / `fitBounds` — Camera and viewport control.
- `addMarker` / `addMarkers` / `removeMarker` — Markers with tap and drag listeners.
- `enableClustering` — Group dense marker sets.
- `enableCurrentLocation` — User location dot when permission allows.
- Overlays — Polygons, polylines, circles, and tile layers (varies by platform).

## Example Usage

### Embedded map

```typescript
import { NativeMap } from '@capgo/capacitor-native-map';

const map = await NativeMap.create({
  id: 'main-map',
  element: document.getElementById('map')!,
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  config: {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12,
  },
});

map.setOnMapClickListener((e) => console.log(e.latitude, e.longitude));

// In a framework component, call `await map.destroy()` from your teardown/cleanup hook.
```

### Background map with HTML UI

```typescript
const map = await NativeMap.create({
  id: 'stores-map',
  toBack: true,
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  config: {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 11,
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

await map.updateLayout({ width: window.innerWidth, height: window.innerHeight });
```

Put interactive controls in HTML with `data-map-overlay` so taps stay on your UI; transparent areas pass gestures to the map.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-map/
- Docs: /docs/plugins/native-map/
