---
locale: en
---
# Using @capgo/capacitor-compass Package

The `@capgo/capacitor-compass` package allows you to read device compass heading data in degrees (0-360) on iOS and Android. In this tutorial, we will guide you through the process of installing and using this package in your Ionic Capacitor app.

## Installation

To install the `@capgo/capacitor-compass` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-compass
npx cap sync
```

## iOS Setup

On iOS, the compass requires location permission because heading data is accessed through Core Location. Add the following to your `Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need location permission to access the compass</string>
```

## Android Setup

The `@capgo/capacitor-compass` package works out of the box on Android using the device's magnetometer and accelerometer sensors. No additional setup is required.

## API

The `@capgo/capacitor-compass` package provides the following API methods:

### checkPermissions()

Check the current permission status for compass access.

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function checkCompassPermissions() {
  const status = await CapgoCompass.checkPermissions();
  console.log('Compass permission:', status.compass);
  // Returns: 'prompt', 'granted', or 'denied'
}
```

### requestPermissions()

Request permission to access compass data. On iOS, this requests location permission. On Android, this always returns 'granted' as no permissions are required.

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function requestCompassPermissions() {
  const status = await CapgoCompass.requestPermissions();
  if (status.compass === 'granted') {
    console.log('Compass access granted');
  }
}
```

### getCurrentHeading()

Get the current compass heading in degrees (0-360).

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function getHeading() {
  const { value } = await CapgoCompass.getCurrentHeading();
  console.log('Current heading:', value, 'degrees');
}
```

### startListening()

Start listening for continuous compass heading updates.

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function startCompass() {
  await CapgoCompass.startListening();
  console.log('Compass listening started');
}
```

### stopListening()

Stop listening for compass heading updates.

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function stopCompass() {
  await CapgoCompass.stopListening();
  console.log('Compass listening stopped');
}
```

### addListener('headingChange', callback)

Add a listener for heading change events.

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function watchHeading() {
  const handle = await CapgoCompass.addListener('headingChange', (event) => {
    console.log('Heading:', event.value, 'degrees');
  });

  // Later, to remove the listener:
  // await handle.remove();
}
```

### removeAllListeners()

Remove all registered event listeners.

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function cleanup() {
  await CapgoCompass.removeAllListeners();
}
```

### getPluginVersion()

Get the native plugin version.

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

async function getVersion() {
  const { version } = await CapgoCompass.getPluginVersion();
  console.log('Plugin version:', version);
}
```

## Complete Example

Here's a complete example showing how to use the compass plugin:

```javascript
import { CapgoCompass } from '@capgo/capacitor-compass';

class CompassDemo {
  listenerHandle = null;

  async init() {
    // Check and request permissions
    const status = await CapgoCompass.checkPermissions();
    if (status.compass !== 'granted') {
      const result = await CapgoCompass.requestPermissions();
      if (result.compass !== 'granted') {
        console.error('Compass permission denied');
        return false;
      }
    }
    return true;
  }

  async start() {
    // Start the compass
    await CapgoCompass.startListening();

    // Listen for heading changes
    this.listenerHandle = await CapgoCompass.addListener(
      'headingChange',
      (event) => {
        const heading = event.value;
        const direction = this.getDirection(heading);
        console.log(`Heading: ${heading.toFixed(1)}° (${direction})`);
      }
    );
  }

  async stop() {
    if (this.listenerHandle) {
      await this.listenerHandle.remove();
      this.listenerHandle = null;
    }
    await CapgoCompass.stopListening();
  }

  getDirection(heading) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  }
}

// Usage
const compass = new CompassDemo();
await compass.init();
await compass.start();

// Later...
await compass.stop();
```

That's it! You have successfully learned how to use the `@capgo/capacitor-compass` package in your Ionic Capacitor app to read compass heading data.
