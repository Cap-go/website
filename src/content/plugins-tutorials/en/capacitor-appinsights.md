---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-appinsights for iOS and Android Analytics

The `@capgo/capacitor-appinsights` package brings powerful native application analytics and insights to your Capacitor mobile applications. This comprehensive tutorial will guide you through integrating the Apptopia AppInsights SDK into your iOS and Android mobile apps built with Capacitor or Cordova. Whether you're developing a native mobile app, hybrid Capacitor application, or migrating from Cordova to Capacitor, this plugin provides cross-platform analytics for both iOS and Android platforms.

## What is Capacitor?

Capacitor is Ionic's native runtime that enables web developers to build iOS, Android, and Progressive Web Apps with a single codebase. Unlike traditional Cordova plugins, Capacitor provides modern native mobile app development with direct access to native iOS and Android APIs. This makes Capacitor ideal for building production-ready mobile applications that leverage native iOS features and Android capabilities.

## Why Use AppInsights in Your Capacitor Mobile App?

Application analytics are critical for understanding user behavior in mobile applications. The @capgo/capacitor-appinsights plugin enables you to:

- Track user engagement across iOS and Android mobile platforms
- Monitor application performance in native iOS and Android environments
- Collect behavioral data from your Capacitor mobile app users
- Analyze user journeys in both iOS apps and Android apps
- Make data-driven decisions for your mobile application development

This Capacitor plugin wraps the Apptopia AppInsights SDK, providing a unified JavaScript API that works seamlessly on both iOS and Android mobile platforms, eliminating the need to write platform-specific native code for iOS or Android.

## Installation for iOS and Android

To install the @capgo/capacitor-appinsights package in your Capacitor mobile app, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-appinsights
npx cap sync
```

The `npx cap sync` command synchronizes the Capacitor plugin with your native iOS and Android projects, ensuring the AppInsights SDK is properly configured for both mobile platforms.

## iOS Platform Configuration

For iOS mobile apps, the plugin works out of the box. The Capacitor plugin automatically integrates the AppInsights SDK into your native iOS application. However, ensure your iOS app has proper tracking permissions configured in your `Info.plist` if you're tracking user data on iOS devices.

## Android Platform Configuration

For Android mobile applications, the plugin integrates seamlessly with your native Android project. Capacitor handles the Android configuration automatically, but you may need to ensure your Android app has appropriate permissions in `AndroidManifest.xml` for analytics tracking on Android devices.

## Basic Usage in Capacitor Mobile Apps

### Initializing AppInsights in Your Mobile Application

Import the plugin and initialize it with your AppInsights credentials. This works identically on both iOS and Android mobile platforms:

```typescript
import { CapacitorAppinsights } from '@capgo/capacitor-appinsights';

// Initialize AppInsights for iOS and Android
async function initializeAnalytics() {
  await CapacitorAppinsights.init({
    partnerId: 'your-partner-id',
    partnerKey: 'your-partner-key'
  });
  console.log('AppInsights initialized for mobile app');
}

// Call initialization when your Capacitor app starts
initializeAnalytics();
```

### Setting User ID for Mobile App Analytics

Track individual users across iOS and Android platforms by setting a unique user ID:

```typescript
import { CapacitorAppinsights } from '@capgo/capacitor-appinsights';

// Set user ID for iOS and Android analytics
async function identifyUser(userId: string) {
  await CapacitorAppinsights.setUserId({ userId });
  console.log(`User ${userId} identified in mobile app`);
}

// Example: Identify user after login in your Capacitor mobile app
identifyUser('user_123456');
```

### Checking SDK State in iOS and Android

Monitor the AppInsights SDK status on both iOS and Android platforms:

```typescript
import { CapacitorAppinsights } from '@capgo/capacitor-appinsights';

// Check SDK state on iOS or Android device
async function checkAnalyticsState() {
  const state = await CapacitorAppinsights.getState();

  console.log('AppInsights SDK State:');
  console.log('Initialization complete:', state.initCompleted);
  console.log('Job scheduled:', state.jobScheduled);
  console.log('Permission acquired:', state.permissionAcquired);

  return state;
}

// Use in your Capacitor mobile application
checkAnalyticsState();
```

### Getting Plugin Version for Mobile Platforms

Verify the Capacitor plugin version running on iOS or Android:

```typescript
import { CapacitorAppinsights } from '@capgo/capacitor-appinsights';

// Get version on iOS and Android
async function getPluginInfo() {
  const { version } = await CapacitorAppinsights.getPluginVersion();
  console.log('AppInsights plugin version:', version);
}
```

## Advanced Implementation for iOS and Android Mobile Apps

### Complete Analytics Service for Capacitor Applications

Here's a production-ready analytics service for your iOS and Android mobile app:

```typescript
import { CapacitorAppinsights } from '@capgo/capacitor-appinsights';

export class MobileAnalyticsService {
  private initialized = false;

  /**
   * Initialize analytics for iOS and Android mobile platforms
   */
  async initialize(partnerId: string, partnerKey: string) {
    try {
      // Initialize AppInsights SDK for native mobile app
      await CapacitorAppinsights.init({
        partnerId,
        partnerKey
      });

      // Verify initialization on iOS or Android
      const state = await CapacitorAppinsights.getState();
      this.initialized = state.initCompleted;

      if (this.initialized) {
        console.log('Mobile analytics ready for iOS and Android');
      }

      return state;
    } catch (error) {
      console.error('Failed to initialize mobile analytics:', error);
      throw error;
    }
  }

  /**
   * Identify user in mobile application
   */
  async trackUser(userId: string) {
    if (!this.initialized) {
      throw new Error('Analytics not initialized for mobile app');
    }

    await CapacitorAppinsights.setUserId({ userId });
    console.log(`User ${userId} tracked on mobile device`);
  }

  /**
   * Get analytics status for iOS or Android
   */
  async getStatus() {
    const state = await CapacitorAppinsights.getState();

    return {
      ready: state.initCompleted && state.permissionAcquired,
      tracking: state.jobScheduled,
      platform: this.getPlatform(),
      state
    };
  }

  /**
   * Detect if running on iOS or Android
   */
  private getPlatform(): 'ios' | 'android' | 'web' {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1) {
      return 'ios';
    } else if (userAgent.indexOf('android') > -1) {
      return 'android';
    }
    return 'web';
  }
}

// Usage in your Capacitor mobile application
const analytics = new MobileAnalyticsService();

// Initialize for iOS and Android
await analytics.initialize('your-partner-id', 'your-partner-key');

// Track users on mobile platforms
await analytics.trackUser('mobile_user_123');

// Check status on iOS or Android device
const status = await analytics.getStatus();
console.log('Analytics status on mobile app:', status);
```

## Best Practices for Mobile App Analytics

### 1. Initialize Early in Mobile App Lifecycle

For accurate tracking on iOS and Android, initialize AppInsights early:

```typescript
// In your Capacitor app initialization
import { CapacitorAppinsights } from '@capgo/capacitor-appinsights';

async function initMobileApp() {
  // Initialize analytics first for mobile platforms
  await CapacitorAppinsights.init({
    partnerId: process.env.APPINSIGHTS_PARTNER_ID,
    partnerKey: process.env.APPINSIGHTS_PARTNER_KEY
  });

  // Continue with mobile app initialization
  console.log('Mobile app ready for iOS and Android');
}
```

### 2. Handle Errors in Mobile Applications

Implement error handling for both iOS and Android platforms:

```typescript
async function safeAnalyticsInit() {
  try {
    await CapacitorAppinsights.init({
      partnerId: 'your-id',
      partnerKey: 'your-key'
    });
  } catch (error) {
    console.error('Analytics failed on mobile device:', error);
    // Continue mobile app operation
  }
}
```

### 3. Identify Users After Authentication

Track authenticated users in your mobile application:

```typescript
// After user logs into your iOS or Android app
async function onUserLogin(user) {
  await CapacitorAppinsights.setUserId({
    userId: user.id
  });
  console.log('User identified on mobile platform');
}
```

## Capacitor vs Cordova for Mobile Analytics

While this plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers advantages:

- **Modern API**: Better TypeScript support for mobile app development
- **Native Performance**: Direct access to iOS and Android APIs
- **Easier Updates**: Simpler plugin updates for mobile platforms
- **Better Tooling**: Improved development experience for iOS and Android

If you're building a new mobile application, Capacitor is recommended over Cordova for iOS and Android development.

## Platform-Specific Notes

### iOS Mobile App Considerations

- Requires iOS 10.0 or later for native mobile app
- AppInsights SDK integrates with native iOS analytics frameworks
- Respects iOS privacy settings and tracking permissions
- Works on iPhone and iPad mobile devices

### Android Mobile App Considerations

- Requires Android 5.0 (API 21) or later for mobile app
- Integrates with Android analytics services
- May require usage stats permission on Android devices
- Works across all Android mobile device manufacturers

### Web Platform Compatibility

Note: This plugin is designed for native mobile apps on iOS and Android. Web platform support is limited as it's intended for Capacitor mobile applications.

## Troubleshooting Mobile App Analytics

### Analytics Not Tracking on Mobile Device

1. Verify SDK initialization on iOS or Android
2. Check permissions in mobile app settings
3. Ensure partner credentials are correct
4. Test on physical iOS and Android devices

### iOS-Specific Issues

- Check Info.plist permissions for iOS app
- Verify iOS deployment target version
- Test on actual iOS mobile device

### Android-Specific Issues

- Check AndroidManifest.xml permissions
- Verify Android API level compatibility
- Test on real Android mobile device

## Conclusion

You have successfully integrated the @capgo/capacitor-appinsights plugin into your Capacitor mobile application. This plugin provides comprehensive analytics for both iOS and Android mobile platforms, enabling you to track user behavior and application performance in your native mobile app.

For detailed API documentation and advanced features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-appinsights).

Whether you're building a new Capacitor mobile app or migrating from Cordova, this analytics solution works seamlessly across iOS and Android platforms, providing the insights you need for successful mobile application development.
