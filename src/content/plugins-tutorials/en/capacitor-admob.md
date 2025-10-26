---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-admob for iOS and Android Mobile Apps

The `@capgo/capacitor-admob` package provides native admob functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating admob features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings admob capabilities to both iOS and Android mobile platforms.

## Why Use admob in Your Capacitor Mobile App?

The @capgo/capacitor-admob plugin enables your iOS and Android mobile applications to leverage native admob functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native admob performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# Using @capgo/capacitor-admob

The `@capgo/capacitor-admob` package allows you to integrate Google AdMob ads into your Capacitor app. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/capacitor-admob
npx cap sync
```

## Configuration

### Android Setup

Add the following to your `AndroidManifest.xml`:

```xml
<meta-data
  android:name="com.google.android.gms.ads.APPLICATION_ID"
  android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
```

### iOS Setup

Add your AdMob App ID to your `Info.plist`:

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy</string>
```

## Usage

### Initialize AdMob

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.initialize({
  requestTrackingAuthorization: true,
  testingDevices: ['YOUR_DEVICE_ID'],
});
```

### Show Banner Ad

```typescript
import { AdMob, BannerAdSize, BannerAdPosition } from '@capgo/capacitor-admob';

await AdMob.showBanner({
  adId: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  adSize: BannerAdSize.BANNER,
  position: BannerAdPosition.BOTTOM_CENTER,
});
```

### Show Interstitial Ad

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.prepareInterstitial({
  adId: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
});

await AdMob.showInterstitial();
```

That's it! You have successfully integrated AdMob into your Capacitor app.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for admob functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for admob functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this admob plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-admob into your Capacitor mobile application for iOS and Android. This plugin provides native admob capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced admob features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-admob).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this admob plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
