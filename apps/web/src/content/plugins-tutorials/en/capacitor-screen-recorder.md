---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-screen-recorder for iOS and Android Mobile Apps

The `@capgo/capacitor-screen-recorder` package provides native screen recorder functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating screen recorder features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings screen recorder capabilities to both iOS and Android mobile platforms.

## Why Use screen recorder in Your Capacitor Mobile App?

The @capgo/capacitor-screen-recorder plugin enables your iOS and Android mobile applications to leverage native screen recorder functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native screen recorder performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# @capgo/capacitor-screen-recorder
A Capacitor plugin for recording the device's screen.

## Installation
To install the package, run the following command:
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```
Make sure to add the necessary permissions and configurations for the plugin to work properly.

## Usage
To start recording the screen, use the `start()` method:
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```

To stop the recording, use the `stop()` method:
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```

That's it! You can now record the screen of your device using the Capacitor Screen Recorder plugin.
## Android

Add this permissions
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

## Compatibility
This plugin is compatible with Capacitor 4 and above.

## Contributing
Contributions to this plugin are greatly appreciated. If you encounter any issues or have any suggestions, please feel free to submit a pull request or create an issue on the GitHub repository.

## License
This package is licensed under the MIT License.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for screen recorder functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for screen recorder functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this screen recorder plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-screen-recorder into your Capacitor mobile application for iOS and Android. This plugin provides native screen recorder capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced screen recorder features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-screen-recorder).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this screen recorder plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
