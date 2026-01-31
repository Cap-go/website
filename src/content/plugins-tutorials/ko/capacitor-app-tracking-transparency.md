---
locale: ko
---
# Using @capgo/capacitor-app-tracking-transparency Package

The `@capgo/capacitor-app-tracking-transparency` package allows you to request and check iOS App Tracking Transparency (ATT) permission in your Capacitor app. This is required for apps that access the device's advertising identifier (IDFA) on iOS 14+.

## Installation

To install the package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-app-tracking-transparency
npx cap sync
```

## iOS Setup

Add the `NSUserTrackingUsageDescription` key to your app's `Info.plist` file:

```xml
<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads to you.</string>
```

This message will be shown to users when requesting tracking permission. Customize it to explain why your app needs tracking authorization.

## Android & Web

App Tracking Transparency is an iOS-only framework. On Android and Web, this plugin returns `authorized` status automatically, allowing transparent cross-platform usage without conditional code.

## API

The `@capgo/capacitor-app-tracking-transparency` package provides the following API methods:

### getStatus()

Gets the current tracking authorization status without prompting the user.

```javascript
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

async function checkTrackingStatus() {
  const { status } = await AppTrackingTransparency.getStatus();
  console.log('Tracking status:', status);
  // Possible values: 'authorized', 'denied', 'notDetermined', 'restricted'
}
```

### requestPermission()

Requests user authorization to access app-related data for tracking. Shows the native iOS permission dialog.

```javascript
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

async function requestTrackingPermission() {
  const { status } = await AppTrackingTransparency.requestPermission();
  if (status === 'authorized') {
    console.log('User authorized tracking');
    // Initialize your tracking/analytics SDKs
  } else {
    console.log('User denied tracking:', status);
    // Use non-personalized alternatives
  }
}
```

> **Note:** The permission dialog is only shown once per app install. Subsequent calls return the stored status.

## Complete Example

```javascript
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

async function handleTracking() {
  const { status } = await AppTrackingTransparency.getStatus();

  if (status === 'notDetermined') {
    const result = await AppTrackingTransparency.requestPermission();
    if (result.status === 'authorized') {
      initializeTracking();
    }
  } else if (status === 'authorized') {
    initializeTracking();
  }
}

function initializeTracking() {
  // Initialize your ad SDKs, analytics, etc.
  console.log('Tracking initialized');
}
```

That's it! You have successfully learned how to use the `@capgo/capacitor-app-tracking-transparency` package to handle App Tracking Transparency in your Capacitor app.
