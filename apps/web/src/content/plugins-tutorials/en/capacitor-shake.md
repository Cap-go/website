---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-shake for iOS and Android Mobile Apps

The `@capgo/capacitor-shake` package provides native shake functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating shake features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings shake capabilities to both iOS and Android mobile platforms.

## Why Use shake in Your Capacitor Mobile App?

The @capgo/capacitor-shake plugin enables your iOS and Android mobile applications to leverage native shake functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native shake performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# Using @capgo/capacitor-shake

The `@capgo/capacitor-shake` package allows you to detect shake gestures on a device. Here is a tutorial on how to use this package in your Capacitor app.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## Add the Listener

To detect shake gestures, you need to add a listener for the `shake` event. Here is an example of how to do it:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

In this example, we import the `CapacitorShake` plugin from `@capacitor/core` and use the `addListener` method to add a listener for the `shake` event. When the shake gesture is detected, the callback function will be executed.

## Remove the Listener

If you want to remove the `shake` event listener, you can use the `removeAllListeners` method:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

In this example, we use the `removeAllListeners` method to remove all `shake` event listeners.

That's it! You have successfully integrated the `@capgo/capacitor-shake` package into your Capacitor app. You can now detect shake gestures on the device.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for shake functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for shake functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this shake plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-shake into your Capacitor mobile application for iOS and Android. This plugin provides native shake capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced shake features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-shake).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this shake plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
