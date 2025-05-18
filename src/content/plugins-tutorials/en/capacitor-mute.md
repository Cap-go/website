---
locale: en
---
# Using @capgo/capacitor-mute Package

The `@capgo/capacitor-mute` package is a Capacitor plugin that allows you to detect if the mute switch is enabled or disabled on a device. It provides a simple API for checking the device's mute status.

## Installation

You can install the `@capgo/capacitor-mute` package using npm:

```bash
npm install @capgo/capacitor-mute
npx cap sync
```

## Usage

To use the `@capgo/capacitor-mute` package, you need to import it and call the `isMuted()` method.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  console.log('Mute status:', result);
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

The `isMuted()` method returns a promise that resolves to a boolean value indicating whether the device is muted or not. If the promise is rejected, an error message is displayed.

## Example

Here is an example of how you can use the `@capgo/capacitor-mute` package to check the device's mute status and display a message based on the result.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  if (result) {
    console.log('The device is currently muted');
    // Display a message or perform some actions for muted device
  } else {
    console.log('The device is not muted');
    // Display a message or perform some actions for non-muted device
  }
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

In this example, if the device is muted, a message "The device is currently muted" is displayed. If the device is not muted, a message "The device is not muted" is displayed.

## Possible Issues

Please note that on iOS devices with Xcode 14, the `@capgo/capacitor-mute` library may not be configured as expected by Apple. This issue is currently being addressed by the library developers. To resolve this issue, you can follow the instructions provided in the [known issue](https://github.com/CocoaPods/CocoaPods/issues/8891/) section of the package's documentation.

## Conclusion

The `@capgo/capacitor-mute` package is a useful Capacitor plugin that allows you to detect the mute status of a device. By following the installation and usage steps outlined in this tutorial, you can easily integrate this package into your Capacitor project and utilize its API for checking the mute status.
