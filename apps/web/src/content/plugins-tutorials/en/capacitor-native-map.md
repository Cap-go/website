---
locale: en
---
# Using @capgo/capacitor-native-map

Google Maps on Android, Apple MapKit on iOS, and Google Maps JS on web with one TypeScript API for markers, camera, and overlays.

## Install

```bash
bun add @capgo/capacitor-native-map
bunx cap sync
```

## What This Plugin Exposes

- `create` - Create a map bound to a DOM element.
- `destroy` - Destroy the map instance and release native resources.
- `setCamera` - Move or animate the map camera.
- `addMarker` - Add one marker and return its id.
- `addMarkers` - Add several markers in one call.
- `removeMarker` - Remove one marker by id.
- `fitBounds` - Fit the viewport to latitude and longitude bounds.
- `enableCurrentLocation` - Show the user location dot when permission allows.
- `enableClustering` - Enable marker clustering with an optional minimum cluster size.
- `setOnMapClickListener` - Listen for taps on the map surface.
- `setOnMarkerClickListener` - Listen for marker taps.

## Example Usage

### `create`

```typescript
import { NativeMap } from '@capgo/capacitor-native-map';

// See getting started: /docs/plugins/native-map/getting-started/
```

### `addMarker`

```typescript
import { NativeMap } from '@capgo/capacitor-native-map';

// See getting started: /docs/plugins/native-map/getting-started/
```

### `setCamera`

```typescript
import { NativeMap } from '@capgo/capacitor-native-map';

// See getting started: /docs/plugins/native-map/getting-started/
```

### `destroy`

```typescript
import { NativeMap } from '@capgo/capacitor-native-map';

// See getting started: /docs/plugins/native-map/getting-started/
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-map/
- Docs: /docs/plugins/native-map/
