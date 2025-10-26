---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-home-indicator for iOS and Android Mobile Apps

The `@capgo/capacitor-home-indicator` package provides native home indicator functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating home indicator features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings home indicator capabilities to both iOS and Android mobile platforms.

## Why Use home indicator in Your Capacitor Mobile App?

The @capgo/capacitor-home-indicator plugin enables your iOS and Android mobile applications to leverage native home indicator functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native home indicator performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# Using @capgo/home-indicator

The `@capgo/home-indicator` package allows you to control iOS home indicator visibility. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/home-indicator
npx cap sync
```

## Usage

### Hide Home Indicator

```typescript
import { HomeIndicator } from '@capgo/home-indicator';

await HomeIndicator.hide();
```

### Show Home Indicator

```typescript
import { HomeIndicator } from '@capgo/home-indicator';

await HomeIndicator.show();
```

That's it! You have successfully integrated home indicator control into your iOS app.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for home indicator functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for home indicator functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this home indicator plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-home-indicator into your Capacitor mobile application for iOS and Android. This plugin provides native home indicator capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced home indicator features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-home-indicator).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this home indicator plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
