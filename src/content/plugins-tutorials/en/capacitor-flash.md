# Using @capgo/capacitor-flash Package

The `@capgo/capacitor-flash` package allows you to switch the flashlight/torch of your device on and off. In this tutorial, we will guide you through the process of installing and using this package in your Ionic Capacitor app.

## Installation

To install the `@capgo/capacitor-flash` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-flash
npx cap sync
```

## iOS Setup

The `@capgo/capacitor-flash` package works out of the box on iOS, so no additional setup is required.

## Android Setup

For Android, you need to declare the necessary permissions in your app's `AndroidManifest.xml` file. Add the following lines inside the `<manifest>` tag:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

## API

The `@capgo/capacitor-flash` package provides the following API methods:

### isAvailable()

This method checks if the flashlight is available on the device.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightAvailability() {
  const isAvailable = await CapacitorFlash.isAvailable();
  console.log('Flashlight availability:', isAvailable);
}
```

### switchOn(options)

This method turns on the flashlight of the device. You can pass options to adjust the intensity of the flashlight.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOnFlashlight() {
  const options = {
    intensity: 100, // Set the intensity to 100%
  };
  await CapacitorFlash.switchOn(options);
  console.log('Flashlight switched on');
}
```

### switchOff()

This method turns off the flashlight of the device.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
  console.log('Flashlight switched off');
}
```

### isSwitchedOn()

This method checks if the flashlight is currently turned on or off.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightStatus() {
  const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
  console.log('Flashlight status:', isSwitchedOn ? 'ON' : 'OFF');
}
```

### toggle()

This method toggles the flashlight, i.e., if it is switched on, it will switch it off, and vice versa.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function toggleFlashlight() {
  await CapacitorFlash.toggle();
  console.log('Flashlight toggled');
}
```

That's it! You have successfully learned how to use the `@capgo/capacitor-flash` package in your Ionic Capacitor app to control the flashlight/torch of your device.