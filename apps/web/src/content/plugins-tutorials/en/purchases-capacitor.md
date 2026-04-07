---
locale: en
---

# Complete Tutorial: Using @revenuecat/purchases-capacitor for iOS and Android Mobile Apps

The `@revenuecat/purchases-capacitor` package provides native purchases capacitor functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating purchases capacitor features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings purchases capacitor capabilities to both iOS and Android mobile platforms.

## Why Use purchases capacitor in Your Capacitor Mobile App?

The @revenuecat/purchases-capacitor plugin enables your iOS and Android mobile applications to leverage native purchases capacitor functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native purchases capacitor performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# Using @revenuecat/purchases-capacitor

The `@revenuecat/purchases-capacitor` package provides in-app subscriptions made easy with RevenueCat SDK. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @revenuecat/purchases-capacitor
npx cap sync
```

## Usage

### Configure RevenueCat

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

await Purchases.configure({
  apiKey: 'YOUR_REVENUECAT_API_KEY',
});
```

### Get Offerings

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

const offerings = await Purchases.getOfferings();
console.log('Available offerings:', offerings);
```

### Purchase Package

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';

const result = await Purchases.purchasePackage({
  packageToPurchase: offerings.current.monthly,
});

console.log('Purchase result:', result);
```

That's it! You have successfully integrated RevenueCat purchases into your Capacitor app.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for purchases capacitor functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for purchases capacitor functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this purchases capacitor plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @revenuecat/purchases-capacitor into your Capacitor mobile application for iOS and Android. This plugin provides native purchases capacitor capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced purchases capacitor features for mobile app development, visit the [GitHub repository](https://github.com/RevenueCat/purchases-capacitor).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this purchases capacitor plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
