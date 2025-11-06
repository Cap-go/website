---
locale: en
---
# Using @capgo/capacitor-android-kiosk Package

The `@capgo/capacitor-android-kiosk` package provides Android Kiosk Mode functionality for Capacitor apps, allowing you to lock devices into kiosk mode with full control over hardware buttons and launcher functionality. This tutorial will guide you through installation, configuration, and usage.

**Important**: This plugin is Android-only. For iOS kiosk mode, use the device's built-in [Guided Access](https://support.apple.com/en-us/HT202612) feature.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-android-kiosk
npx cap sync android
```

## Prerequisites

- Android device running Android 6.0 (API 23) or higher
- Supports up to Android 15 (API 35)
- Physical device recommended for testing (emulators may have limitations)

## Features

- **Kiosk Mode**: Hide system UI and enter immersive fullscreen mode
- **Launcher Integration**: Set your app as the device launcher/home app
- **Hardware Key Control**: Block or allow specific hardware buttons
- **Status Detection**: Check if kiosk mode is active or if app is set as launcher
- **Wide Android Support**: Compatible with Android 6.0+ through Android 15

## Basic Usage

### Importing the Plugin

```typescript
import { CapacitorAndroidKiosk } from '@capgo/capacitor-android-kiosk';
```

### Entering and Exiting Kiosk Mode

The simplest way to use the plugin is to enter and exit kiosk mode:

```typescript
async function enableKioskMode() {
  try {
    await CapacitorAndroidKiosk.enterKioskMode();
    console.log('Kiosk mode activated');
  } catch (error) {
    console.error('Failed to enter kiosk mode:', error);
  }
}

async function disableKioskMode() {
  try {
    await CapacitorAndroidKiosk.exitKioskMode();
    console.log('Kiosk mode deactivated');
  } catch (error) {
    console.error('Failed to exit kiosk mode:', error);
  }
}
```

### Checking Kiosk Mode Status

You can check if kiosk mode is currently active:

```typescript
async function checkKioskStatus() {
  const { isInKioskMode } = await CapacitorAndroidKiosk.isInKioskMode();
  console.log('Kiosk mode active:', isInKioskMode);
  return isInKioskMode;
}
```

## Launcher Functionality

For full kiosk mode functionality (blocking home button, preventing task switching), your app must be set as the device launcher.

### Setting Your App as Launcher

```typescript
async function setupAsLauncher() {
  try {
    // Check if app is already the launcher
    const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();

    if (!isLauncher) {
      // Open system settings for user to select your app as launcher
      await CapacitorAndroidKiosk.setAsLauncher();
      alert('Please select this app as your Home app from the list');
    } else {
      console.log('App is already set as launcher');
    }
  } catch (error) {
    console.error('Failed to set as launcher:', error);
  }
}
```

### Checking Launcher Status

```typescript
async function checkLauncherStatus() {
  const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();
  console.log('App is launcher:', isLauncher);
  return isLauncher;
}
```

## Hardware Key Control

Control which hardware buttons are allowed to function in kiosk mode:

### Blocking All Keys (Default)

```typescript
async function blockAllKeys() {
  await CapacitorAndroidKiosk.setAllowedKeys({});
  console.log('All hardware keys blocked');
}
```

### Allowing Specific Keys

```typescript
async function allowVolumeKeys() {
  await CapacitorAndroidKiosk.setAllowedKeys({
    volumeUp: true,
    volumeDown: true,
    back: false,
    home: false,
    recent: false,
    power: false
  });
  console.log('Volume keys allowed, other keys blocked');
}
```

### Available Key Options

The `setAllowedKeys` method accepts the following options:

- `volumeUp` (boolean): Allow volume up button
- `volumeDown` (boolean): Allow volume down button
- `back` (boolean): Allow back button
- `home` (boolean): Allow home button
- `recent` (boolean): Allow recent apps button
- `power` (boolean): Allow power button
- `camera` (boolean): Allow camera button (if present)
- `menu` (boolean): Allow menu button (if present)

All options default to `false` (blocked).

## Complete Implementation Example

Here's a complete example showing how to set up a kiosk application:

```typescript
import { CapacitorAndroidKiosk } from '@capgo/capacitor-android-kiosk';

class KioskManager {
  private isInitialized = false;

  async initialize() {
    try {
      // Step 1: Check if app is set as launcher
      const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();

      if (!isLauncher) {
        // Prompt user to set app as launcher
        await CapacitorAndroidKiosk.setAsLauncher();
        alert('Please select this app as your Home app to enable kiosk mode');
        return false;
      }

      // Step 2: Configure allowed hardware keys
      await CapacitorAndroidKiosk.setAllowedKeys({
        volumeUp: true,
        volumeDown: true,
        back: false,
        home: false,
        recent: false,
        power: false,
        camera: false,
        menu: false
      });

      // Step 3: Enter kiosk mode
      await CapacitorAndroidKiosk.enterKioskMode();

      this.isInitialized = true;
      console.log('Kiosk mode initialized successfully');
      return true;

    } catch (error) {
      console.error('Failed to initialize kiosk mode:', error);
      return false;
    }
  }

  async exit() {
    try {
      await CapacitorAndroidKiosk.exitKioskMode();
      this.isInitialized = false;
      console.log('Exited kiosk mode');
    } catch (error) {
      console.error('Failed to exit kiosk mode:', error);
    }
  }

  async getStatus() {
    const { isInKioskMode } = await CapacitorAndroidKiosk.isInKioskMode();
    const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();

    return {
      kioskMode: isInKioskMode,
      launcher: isLauncher,
      initialized: this.isInitialized
    };
  }
}

// Usage
const kioskManager = new KioskManager();

// Initialize kiosk mode
await kioskManager.initialize();

// Check status
const status = await kioskManager.getStatus();
console.log('Kiosk Status:', status);

// Exit kiosk mode
await kioskManager.exit();
```

## Android Configuration

### 1. MainActivity Setup

To enable full hardware key blocking, you need to override `dispatchKeyEvent` in your `MainActivity.java`:

```java
package your.package.name;

import android.os.Bundle;
import android.view.KeyEvent;
import com.getcapacitor.BridgeActivity;
import ee.forgr.plugin.android_kiosk.CapacitorAndroidKioskPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        // Get the kiosk plugin
        CapacitorAndroidKioskPlugin kioskPlugin = (CapacitorAndroidKioskPlugin)
            this.getBridge().getPlugin("CapacitorAndroidKiosk").getInstance();

        if (kioskPlugin != null && kioskPlugin.shouldBlockKey(event.getKeyCode())) {
            return true; // Block the key
        }

        return super.dispatchKeyEvent(event);
    }

    @Override
    public void onBackPressed() {
        // Don't call super.onBackPressed() to disable back button
        // The plugin will handle this based on setAllowedKeys configuration
    }
}
```

### 2. AndroidManifest.xml

Add launcher intent filter to make your app selectable as a launcher:

```xml
<activity
    android:name=".MainActivity"
    android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
    android:label="@string/title_activity_main"
    android:launchMode="singleTask"
    android:theme="@style/AppTheme.NoActionBarLaunch">

    <!-- Existing intent filter -->
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>

    <!-- Add this to make app selectable as launcher -->
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.HOME" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

## Best Practices

### 1. Always Check Launcher Status First

```typescript
async function setupKiosk() {
  const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();

  if (!isLauncher) {
    await CapacitorAndroidKiosk.setAsLauncher();
    // Wait for user to set app as launcher before proceeding
    return;
  }

  await CapacitorAndroidKiosk.enterKioskMode();
}
```

### 2. Provide Exit Mechanism

Always provide a way for authorized users to exit kiosk mode:

```typescript
async function exitWithConfirmation() {
  // Implement your authentication logic here
  const isAuthorized = await authenticateAdmin();

  if (isAuthorized) {
    await CapacitorAndroidKiosk.exitKioskMode();
  }
}

// Example: Secret tap pattern
let tapCount = 0;
let tapTimer: NodeJS.Timeout;

function handleSecretTap() {
  tapCount++;
  clearTimeout(tapTimer);

  if (tapCount === 5) {
    exitWithConfirmation();
    tapCount = 0;
  } else {
    tapTimer = setTimeout(() => {
      tapCount = 0;
    }, 2000);
  }
}
```

### 3. Handle App Lifecycle

Re-enter kiosk mode when app resumes:

```typescript
import { App } from '@capacitor/app';

App.addListener('resume', async () => {
  const { isInKioskMode } = await CapacitorAndroidKiosk.isInKioskMode();
  const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();

  if (isLauncher && !isInKioskMode) {
    await CapacitorAndroidKiosk.enterKioskMode();
  }
});
```

### 4. Error Handling

Always handle errors gracefully:

```typescript
async function safeEnterKioskMode() {
  try {
    await CapacitorAndroidKiosk.enterKioskMode();
    return true;
  } catch (error) {
    console.error('Failed to enter kiosk mode:', error);
    // Notify user or log to analytics
    return false;
  }
}
```

## Common Use Cases

### Retail Kiosk

```typescript
async function setupRetailKiosk() {
  // Block all keys except volume
  await CapacitorAndroidKiosk.setAllowedKeys({
    volumeUp: true,
    volumeDown: true
  });

  await CapacitorAndroidKiosk.enterKioskMode();

  // Keep screen on
  // Implement auto-reset after inactivity
}
```

### Digital Signage

```typescript
async function setupDigitalSignage() {
  // Block all keys
  await CapacitorAndroidKiosk.setAllowedKeys({});

  await CapacitorAndroidKiosk.enterKioskMode();

  // Auto-refresh content
  // Implement scheduled updates
}
```

### Educational Device

```typescript
async function setupEducationalDevice() {
  // Allow volume control for accessibility
  await CapacitorAndroidKiosk.setAllowedKeys({
    volumeUp: true,
    volumeDown: true
  });

  await CapacitorAndroidKiosk.enterKioskMode();

  // Restrict access to educational apps only
}
```

## API Reference

### checkAgeSignals()

Get the native Capacitor plugin version.

```typescript
const { version } = await CapacitorAndroidKiosk.getPluginVersion();
console.log('Plugin version:', version);
```

## Important Notes

1. **Launcher Requirement**: For full kiosk mode functionality (blocking home button, preventing task switching), your app must be set as the device launcher.

2. **Testing**: When testing, you can exit kiosk mode programmatically or by setting another app as the launcher through device settings.

3. **Android Versions**: The plugin uses modern Android APIs for Android 11+ and falls back to older methods for compatibility with Android 6.0+.

4. **Security**: This plugin is designed for legitimate kiosk applications. Always provide authorized users with a way to exit kiosk mode.

5. **Battery**: Kiosk mode may keep the screen on. Consider implementing your own screen timeout or brightness management to save battery.

6. **Permissions**: No special permissions are required in AndroidManifest.xml, but the launcher intent filter is necessary for full functionality.

## iOS Alternative

For iOS devices, use the built-in [Guided Access](https://support.apple.com/en-us/HT202612) feature:

1. Go to Settings > Accessibility > Guided Access
2. Turn on Guided Access and set a passcode
3. Open your app
4. Triple-click the side button (or home button on older devices)
5. Adjust settings and tap Start

## Troubleshooting

### Home Button Still Works

Make sure your app is set as the device launcher:

```typescript
const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();
if (!isLauncher) {
  await CapacitorAndroidKiosk.setAsLauncher();
}
```

### Keys Not Being Blocked

Ensure you've implemented the `dispatchKeyEvent` override in MainActivity.java as shown in the Android Configuration section.

### Kiosk Mode Exits Unexpectedly

Add app lifecycle listeners to re-enter kiosk mode on resume:

```typescript
App.addListener('resume', async () => {
  await CapacitorAndroidKiosk.enterKioskMode();
});
```

## Conclusion

The `@capgo/capacitor-android-kiosk` plugin provides a comprehensive solution for creating kiosk applications on Android devices. By combining launcher functionality with hardware key control, you can create secure, locked-down experiences for retail, education, digital signage, and other kiosk use cases.

For more information and updates, visit the [GitHub repository](https://github.com/Cap-go/capacitor-android-kiosk).
