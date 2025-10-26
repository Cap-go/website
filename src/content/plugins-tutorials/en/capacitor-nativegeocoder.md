---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-nativegeocoder for iOS and Android Mobile Apps

The `@capgo/capacitor-nativegeocoder` package provides native nativegeocoder functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating nativegeocoder features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings nativegeocoder capabilities to both iOS and Android mobile platforms.

## Why Use nativegeocoder in Your Capacitor Mobile App?

The @capgo/capacitor-nativegeocoder plugin enables your iOS and Android mobile applications to leverage native nativegeocoder functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native nativegeocoder performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
## Using @capgo/nativegeocoder for Geocoding

The `@capgo/nativegeocoder` package is a Capacitor plugin that provides native forward and reverse geocoding functionality. Geocoding is the process of converting addresses into geographic coordinates (latitude and longitude) and vice versa.

To use the `@capgo/nativegeocoder` package, follow the steps below:

### Step 1: Install the package

Install the package using npm:

```bash
npm install @capgo/nativegeocoder
```

### Step 2: Sync your project

Run the following command to sync your project:

```bash
npx cap sync
```

### Step 3: Import the plugin

In your code, import the `NativeGeocoder` from `@capgo/nativegeocoder`:

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

### Step 4: Implement geocoding functionality

The `@capgo/nativegeocoder` plugin provides two main methods for geocoding:

#### Reverse Geocoding

Reverse geocoding is the process of converting geographic coordinates (latitude and longitude) into an address.

```typescript
const reverseOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const address = NativeGeocoder.reverseGeocode(reverseOptions);
console.log(address);
```

The `reverseGeocode` method takes an object with the latitude and longitude properties. It returns the address as a result.

#### Forward Geocoding

Forward geocoding is the process of converting an address into geographic coordinates (latitude and longitude).

```typescript
const forwardOptions = {
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
};

const coordinates = NativeGeocoder.forwardGeocode(forwardOptions);
console.log(coordinates);
```

The `forwardGeocode` method takes an object with the address property. It returns the coordinates as a result.

### Conclusion

The `@capgo/nativegeocoder` package provides a simple and efficient way to perform geocoding in your Capacitor project. By following the steps outlined in this tutorial, you can easily integrate geocoding functionality into your application.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for nativegeocoder functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for nativegeocoder functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this nativegeocoder plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-nativegeocoder into your Capacitor mobile application for iOS and Android. This plugin provides native nativegeocoder capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced nativegeocoder features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-nativegeocoder).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this nativegeocoder plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
