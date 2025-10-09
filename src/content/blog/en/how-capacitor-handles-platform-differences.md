---
slug: how-capacitor-handles-platform-differences
title: How Capacitor Handles Platform Differences
description: Learn how to effectively manage platform differences in mobile app development using a single codebase for iOS and Android.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-03-25T02:08:36.160Z
updated_at: 2025-10-09T00:13:34.000Z
head_image: https://assets.seobotai.com/capgo.app/67e200987856e801f1f26fa8-1742868536741.jpg
head_image_alt: Mobile Development
keywords: Capacitor, mobile development, cross-platform, iOS, Android, custom plugins, UI design, live updates
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

[Capacitor](https://capacitorjs.com/) helps developers build apps for iOS and Android using the same codebase, while addressing platform-specific differences. It simplifies native feature integration, ensures compliance with platform guidelines, and optimizes performance. Key highlights:

-   **Platform Detection**: Use `Capacitor.getPlatform()` to apply platform-specific code.
-   **Built-in Plugins**: Unified APIs for features like Camera, Storage, and Geolocation.
-   **Custom Plugins**: Add native code for unique requirements.
-   **UI Adjustments**: Follow design rules for iOS (e.g., [SF Symbols](https://developer.apple.com/sf-symbols/), rounded buttons) and Android (e.g., [Material Icons](https://developers.google.com/fonts/docs/material_icons), left-aligned buttons).
-   **Configuration**: Adjust settings in `capacitor.config.json` for both platforms.
-   **Live Updates with [Capgo](https://capgo.app/)**: Deploy updates instantly without app store delays, achieving up to 95% user adoption within 24 hours.

### Quick Comparison

| Feature | iOS | Android |
| --- | --- | --- |
| **Navigation** | Bottom tab bars, back button left | Top navigation drawer, bottom nav |
| **Typography** | San Francisco font | Roboto font |
| **Plugins (e.g., Camera)** | [AVFoundation](https://developer.apple.com/documentation/avfoundation/) | [Camera2 API](https://developer.android.com/media/camera/camera2) |
| **Build Output** | `.ipa` file | `.aab` or `.apk` file |

Capacitor bridges the gap between web and native app development, making it easier to create cross-platform apps while maintaining platform-specific optimizations.

## Cross-Platform Development: Exploring CapacitorJS with ...

<iframe src="https://www.youtube.com/embed/73YWZ1G_DX4" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## How [Capacitor](https://capacitorjs.com/) Handles Platform Code

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-25.jpg?auto=compress)

Capacitor offers tools to manage platform-specific code, allowing developers to create tailored experiences for iOS and Android using a single API.

### Detect Platforms in Code

With Capacitor's built-in platform API, detecting the current platform is simple. The `Capacitor.getPlatform()` method identifies the running environment, making it easy to apply conditional logic:

```typescript
import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform();
if (platform === 'ios') {
  // Code specific to iOS
} else if (platform === 'android') {
  // Code specific to Android
}
```

This approach is especially handy for features like [biometric authentication](https://capgo.app/plugins/capacitor-native-biometric/), where iOS might use [Face ID](https://en.wikipedia.org/wiki/Face_ID) and Android relies on Fingerprint Authentication. Along with platform detection, Capacitor's built-in plugins simplify native integration.

### Built-in Platform Features

Capacitor comes with a set of core plugins that handle platform-specific differences seamlessly. These plugins manage the complexities of native implementations while providing a consistent JavaScript interface:

| Plugin | iOS Implementation | Android Implementation |
| --- | --- | --- |
| Camera | AVFoundation | Camera2 API |
| Storage | UserDefaults | SharedPreferences |
| Geolocation | CoreLocation | LocationManager |

Each plugin automatically uses the platform's native APIs, ensuring smooth performance and functionality.

### Build Custom Platform Plugins

For cases where built-in plugins don't meet your needs, you can create custom plugins to access specific native APIs. Here's how:

1.  **Define the Plugin**
    
    ```typescript
    @Plugin({
      name: 'CustomFeature',
      platforms: ['ios', 'android']
    })
    ```
    
2.  **Add Native Code**
    
    ```typescript
    @PluginMethod()
    async customFunction(): Promise<void> {
      if (Capacitor.getPlatform() === 'ios') {
        // Add iOS-specific code
      } else {
        // Add Android-specific code
      }
    }
    ```
    
3.  **Implement Platform Handlers**
    
    -   **iOS (Swift):**
        
        ```swift
        @objc func customFunction(_ call: CAPPluginCall) {
          // Add native iOS functionality
        }
        ```
        
    -   **Android (Kotlin):**
        
        ```kotlin
        @PluginMethod
        fun customFunction(call: PluginCall) {
          // Add native Android functionality
        }
        ```
        

Custom plugins allow access to native features while keeping the API consistent and easy to use. This ensures performance and functionality without complicating the development process.

## Platform-Specific UI Guidelines

### iOS vs Android Design Rules

When designing for iOS and Android, it's important to follow native design patterns. Users on each platform have different expectations for things like navigation, typography, buttons, headers, and icons. Here's how they compare:

| Design Element | iOS | Android |
| --- | --- | --- |
| **Navigation** | Bottom tab bars, back button on the left | Top navigation drawer, bottom navigation |
| **Typography** | San Francisco font | Roboto font |
| **Buttons** | Rounded rectangles, centered text | Material Design buttons, left-aligned text |
| **Headers** | Large titles, centered | App bars, left-aligned |
| **Icons** | SF Symbols | Material Icons |

### Cross-Platform Design Standards

While each platform has its own rules, maintaining a cohesive brand identity across both is key. Here’s how you can ensure consistency:

```typescript
const sharedStyles = {
  primaryColor: '#007AFF', // iOS blue
  androidPrimaryColor: '#6200EE', // Material Design purple
  borderRadius: Capacitor.getPlatform() === 'ios' ? '10px' : '4px'
};

:root {
  --app-header-height: var(--platform-header-height, 56px);
  --app-safe-area-top: var(--platform-safe-area-top, 0px);
}
```

Using Capacitor, you can integrate platform-specific UI components while keeping functionality consistent. It also helps manage system-wide settings like Dark Mode and Dynamic Type. To complete the process, make sure your platform-specific build settings align with these guidelines.

## Platform Setup and Config

After managing your platform code, proper configuration is essential to ensure your app runs smoothly on both iOS and Android.

### Platform Settings in `capacitor.config.json`

Use the `capacitor.config.json` file to define key platform-specific settings:

```json
{
  "appId": "com.example.app",
  "appName": "MyApp",
  "ios": {
    "contentInset": "always",
    "backgroundColor": "#ffffff",
    "scheme": "myapp",
    "preferredContentMode": "mobile"
  },
  "android": {
    "backgroundColor": "#FFFFFF",
    "allowMixedContent": true,
    "captureInput": true,
    "webContentsDebuggingEnabled": true
  }
}
```

Here are some configuration options to consider:

| Option | iOS | Android |
| --- | --- | --- |
| **Deep Links** | `scheme` property | `androidScheme` property |
| **Status Bar** | `statusBar.style` | `statusBar.backgroundColor` |
| **Keyboard** | `keyboard.resize` | `keyboard.resize`, `keyboard.style` |
| **Splash Screen** | `splashScreen.launchShowDuration` | `splashScreen.layoutName` |

Once runtime settings are in place, adjust your build settings to enhance performance for each platform.

### Platform-Specific Build Settings

Fine-tune build settings to optimize your app for iOS and Android.

For iOS, update the `Info.plist` file:

```xml
<key>NSCameraUsageDescription</key>
<string>Required for document scanning</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Required for store locator</string>
```

For Android, modify `android/app/build.gradle`:

```kotlin
android {
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt')
        }
    }
}
```

Here are some key build considerations:

| Aspect | iOS | Android |
| --- | --- | --- |
| **Permissions** | Add entries in `Info.plist` | Define in `AndroidManifest.xml` |
| **Icons** | Sizes from 20px to 1024px | Densities from mdpi to xxxhdpi |
| **Splash Screen** | Storyboard-based | Layout XML-based |
| **Build Output** | `.ipa` file | `.aab` or `.apk` file |

## Update Apps with [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-25.jpg?auto=compress)

Keeping [Capacitor apps](https://capgo.app/blog/capacitor-comprehensive-guide/) updated efficiently for both iOS and Android is crucial. Capgo offers a live update system that aligns with the guidelines of both platforms.

### Capgo Features

| Feature | Description | Platform Benefit |
| --- | --- | --- |
| **Live Updates** | Deploy instantly without app store review | Ensures a unified experience on iOS and Android |
| **End-to-End Encryption** | Secures update delivery | Meets security requirements of both platforms |
| **[Channel System](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** | Targets specific user groups | Supports beta testing and phased rollouts |
| **Partial Updates** | Downloads only modified content | Saves bandwidth and speeds up updates |

Capgo has delivered 23.5 million updates, achieving a 95% active user update rate within 24 hours [\[1\]](https://capgo.app/). These features make [update management](https://capgo.app/docs/plugin/cloud-mode/manual-update/) smoother and more efficient across platforms.

### Capgo Platform Management

Capgo's channel system makes updates easier to manage. Developers can test iOS-specific features with beta users, roll out Android updates in stages, and track performance metrics seamlessly.

The platform adheres to Apple and Google’s over-the-air update requirements [\[1\]](https://capgo.app/).

Currently, 750 production apps rely on Capgo, maintaining an 82% global update success rate [\[1\]](https://capgo.app/). Its CI/CD integration simplifies deployments, while the rollback feature allows developers to revert to previous versions instantly if issues arise. Real-time analytics provide insights into update performance and help maintain app stability.

## Conclusion

### Platform Management Benefits

Managing platform differences effectively in Capacitor enhances cross-platform development. Its built-in tools for platform detection and configuration allow developers to create smooth experiences for both iOS and Android, all while respecting the unique design standards and features of each platform.

By focusing on proper platform management, development teams can release updates faster and improve user satisfaction. Tools like Capgo have shown how consistent platform handling can lead to higher update success rates and better user experiences [\[1\]](https://capgo.app/).

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!"  
> – Rodrigo Mantica [\[1\]](https://capgo.app/)

These insights can guide you in making practical improvements.

### Next Steps

To maximize these benefits, consider implementing the following strategies:

| Action Item | Benefit |
| --- | --- |
| Enable Platform Detection | Automatically adjusts to iOS and Android needs |
| Implement Live Updates | Avoids app store delays for urgent fixes |
| Set Up Analytics | Tracks performance metrics for each platform |
| Enable Rollback Support | Quickly resolves platform-specific issues |

For developers aiming to improve their workflow, tools like Capgo can simplify the process. Features such as end-to-end encryption and CI/CD integration help teams maintain consistency while efficiently deploying updates.

Success in platform management depends on using the right tools and adhering to platform-specific guidelines. By focusing on robust detection and management strategies, developers can ensure their apps perform seamlessly across both iOS and Android.