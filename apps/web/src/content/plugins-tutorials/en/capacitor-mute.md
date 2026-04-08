---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-mute for iOS and Android Mobile Apps

The `@capgo/capacitor-mute` package provides native mute functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating mute features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings mute capabilities to both iOS and Android mobile platforms.

## Why Use mute in Your Capacitor Mobile App?

The @capgo/capacitor-mute plugin enables your iOS and Android mobile applications to leverage native mute functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native mute performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

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

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for mute functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for mute functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this mute plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-mute into your Capacitor mobile application for iOS and Android. This plugin provides native mute capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced mute features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-mute).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this mute plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
