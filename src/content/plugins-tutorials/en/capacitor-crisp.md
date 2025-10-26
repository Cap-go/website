---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-crisp for iOS and Android Mobile Apps

The `@capgo/capacitor-crisp` package provides native crisp functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating crisp features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings crisp capabilities to both iOS and Android mobile platforms.

## Why Use crisp in Your Capacitor Mobile App?

The @capgo/capacitor-crisp plugin enables your iOS and Android mobile applications to leverage native crisp functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native crisp performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# Using @capgo/capacitor-crisp Package

The `@capgo/capacitor-crisp` package allows you to integrate Crisp, a native SDK, into your Capacitor app. It provides methods for configuring Crisp, opening the chatbox, setting user details, sending events, and more.

To get started with the `@capgo/capacitor-crisp` package, follow these steps:

## Installation

1. Open your terminal and navigate to your Capacitor app's root directory.
2. Run the following command to install the package:

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Initialize Crisp

Before using any of the methods provided by the `@capgo/capacitor-crisp` package, you need to configure Crisp with your website ID. Add the following code to your project:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

Replace `'******-****-****-****-********'` with your actual Crisp website ID.

### iOS Integration

If you're targeting iOS, you need to add the following permissions to your app's Info.plist file:

- Privacy - Camera Usage Description (NSCameraUsageDescription)
- Privacy - Photo Library Additions Usage Description (NSPhotoLibraryAddUsageDescription)

Make sure to provide a description for each permission explaining why your app needs it.

### Android Integration

There are no additional steps required for Android integration.

## Open the Chatbox

To open the Crisp chatbox in your app, use the `openMessenger` method provided by the `@capgo/capacitor-crisp` package. Add the following code to your project:

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

This will open the Crisp chatbox for users to start a conversation with your support team.

## Additional Functionality

The `@capgo/capacitor-crisp` package provides several other methods for customizing and interacting with Crisp. Here are some of the available methods:

- `setTokenID`: Set the token ID for the user.
- `setUser`: Set the user's details such as nickname, phone number, email, and avatar.
- `pushEvent`: Send a custom event to Crisp.
- `setCompany`: Set the company details including name, URL, description, employment, and geolocation.
- `setInt`: Set a custom integer value.
- `setString`: Set a custom string value.
- `sendMessage`: Send a chat message to Crisp.
- `setSegment`: Set the segment for the user.
- `reset`: Reset the Crisp configuration.

For more information on these methods and their parameters, refer to the official documentation of the `@capgo/capacitor-crisp` package.

That's it! You've learned how to use the `@capgo/capacitor-crisp` package to integrate Crisp into your Capacitor app. Enjoy seamless communication with your users through the Crisp chatbox.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for crisp functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for crisp functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this crisp plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-crisp into your Capacitor mobile application for iOS and Android. This plugin provides native crisp capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced crisp features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-crisp).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this crisp plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
