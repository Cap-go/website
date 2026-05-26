---
locale: en
---
# Using @capgo/capacitor-compass

Capacitor Compass Plugin interface for reading device compass heading.

## Install

```bash
bun add @capgo/capacitor-compass
bunx cap sync
```

## What This Plugin Exposes

- `getCurrentHeading` - Get the current compass heading in degrees. On iOS, the heading is updated in the background, and the latest value is returned. On Android, the heading is calculated when the method is called using accelerometer and magnetometer sensors. Not implemented on Web.
- `startListening` - Start listening for compass heading changes via events. This starts the compass sensors and emits 'headingChange' events.
- `stopListening` - Stop listening for compass heading changes. This stops the compass sensors and stops emitting events.
- `checkPermissions` - Check the current permission status for accessing compass data. On iOS, this checks location permission status. On Android, this always returns 'granted' as no permissions are required.

## Example Usage

### `getCurrentHeading`

Get the current compass heading in degrees. On iOS, the heading is updated in the background, and the latest value is returned. On Android, the heading is calculated when the method is called using accelerometer and magnetometer sensors. Not implemented on Web.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

const { value } = await CapgoCompass.getCurrentHeading();
console.log('Compass heading:', value, 'degrees');
```

### `startListening`

Start listening for compass heading changes via events. This starts the compass sensors and emits 'headingChange' events.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

// With default throttling (100ms interval, 2° minimum change)
await CapgoCompass.startListening();

// With custom throttling for high-frequency updates
await CapgoCompass.startListening({
  minInterval: 50,      // 50ms between events
  minHeadingChange: 1.0 // 1° minimum change
});

CapgoCompass.addListener('headingChange', (event) => {
  console.log('Heading:', event.value);
});
```

### `stopListening`

Stop listening for compass heading changes. This stops the compass sensors and stops emitting events.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

await CapgoCompass.stopListening();
```

### `checkPermissions`

Check the current permission status for accessing compass data. On iOS, this checks location permission status. On Android, this always returns 'granted' as no permissions are required.

```typescript
import { CapgoCompass } from '@capgo/capacitor-compass';

const status = await CapgoCompass.checkPermissions();
console.log('Compass permission:', status.compass);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-compass/
- Docs: /docs/plugins/compass/

## Keep going from Using @capgo/capacitor-compass

If you are using **Using @capgo/capacitor-compass** to plan dashboard and API operations, connect it with [@capgo/capacitor-compass](/docs/plugins/compass/) for the implementation detail in @capgo/capacitor-compass, [Getting Started](/docs/plugins/compass/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
