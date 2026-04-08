---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-inappbrowser for iOS and Android Mobile Apps

The `@capgo/capacitor-inappbrowser` package provides native inappbrowser functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating inappbrowser features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings inappbrowser capabilities to both iOS and Android mobile platforms.

## Why Use inappbrowser in Your Capacitor Mobile App?

The @capgo/capacitor-inappbrowser plugin enables your iOS and Android mobile applications to leverage native inappbrowser functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native inappbrowser performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# @capgo/inappbrowser Package Tutorial

The `@capgo/inappbrowser` package is a Capacitor plugin that allows you to open a URL in an in-app browser window. Here's a step-by-step guide on how to use this package:

## Installation

To install the package, run the following command in your project's root directory:

```bash
npm install @capgo/inappbrowser
npx cap sync
```

## Usage

1. Import the `InAppBrowser` class from the `@capgo/inappbrowser` package:

   ```javascript
   import { InAppBrowser } from '@capgo/inappbrowser';
   ```

2. Use the `InAppBrowser.open` method to open a URL in a new fullscreen window:

   ```javascript
   InAppBrowser.open("YOUR_URL");
   ```

   Replace `"YOUR_URL"` with the URL you want to open.

3. You can also use other methods provided by the `InAppBrowser` class:

   - `clearCookies`: Clear all cookies.
   - `close`: Close the in-app browser window.
   - `openWebView`: Open a URL in a new webview with toolbars.
   - `setUrl`: Set the URL of the in-app browser.

   Refer to the API section below for more details on these methods.

## API

The `@capgo/inappbrowser` package provides the following API methods:

- `open(options: OpenOptions)`: Open a URL in a new fullscreen window. Takes an `OpenOptions` object as a parameter.
- `clearCookies()`: Clear all cookies.
- `close()`: Close the in-app browser window.
- `openWebView(options: OpenWebViewOptions)`: Open a URL in a new webview with toolbars. Takes an `OpenWebViewOptions` object as a parameter.
- `setUrl(options: { url: string; })`: Set the URL of the in-app browser. Takes an object with a `url` property as a parameter.
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: Listen for URL change events. Takes a `UrlChangeListener` function as a parameter.
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: Listen for close events. Takes a `UrlChangeListener` function as a parameter.
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: Listen for confirm button click events. Takes a `UrlChangeListener` function as a parameter.
- `removeAllListeners()`: Remove all event listeners.

For more information on the parameters and return values of these methods, refer to the package documentation.

And that's it! You've learned how to use the `@capgo/inappbrowser` package to open URLs in an in-app browser window in Capacitor. Happy coding!

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for inappbrowser functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for inappbrowser functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this inappbrowser plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-inappbrowser into your Capacitor mobile application for iOS and Android. This plugin provides native inappbrowser capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced inappbrowser features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-inappbrowser).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this inappbrowser plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
