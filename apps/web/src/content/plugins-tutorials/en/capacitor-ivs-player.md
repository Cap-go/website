---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-ivs-player for iOS and Android Mobile Apps

The `@capgo/capacitor-ivs-player` package provides native ivs player functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating ivs player features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings ivs player capabilities to both iOS and Android mobile platforms.

## Why Use ivs player in Your Capacitor Mobile App?

The @capgo/capacitor-ivs-player plugin enables your iOS and Android mobile applications to leverage native ivs player functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native ivs player performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# Using @capgo/ivs-player

The `@capgo/ivs-player` package provides Amazon IVS player integration for ultra-low latency live streaming. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/ivs-player
npx cap sync
```

## Usage

### Create Player

```typescript
import { IvsPlayer } from '@capgo/ivs-player';

await IvsPlayer.create({
  url: 'https://your-stream-url.m3u8',
});
```

### Start Playback

```typescript
import { IvsPlayer } from '@capgo/ivs-player';

await IvsPlayer.start();
```

### Pause Playback

```typescript
import { IvsPlayer } from '@capgo/ivs-player';

await IvsPlayer.pause();
```

That's it! You have successfully integrated Amazon IVS player into your Capacitor app.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for ivs player functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for ivs player functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this ivs player plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-ivs-player into your Capacitor mobile application for iOS and Android. This plugin provides native ivs player capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced ivs player features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-ivs-player).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this ivs player plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
