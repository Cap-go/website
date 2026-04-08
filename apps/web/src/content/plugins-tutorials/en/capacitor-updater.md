---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-updater for iOS and Android Mobile Apps

The `@capgo/capacitor-updater` package provides native updater functionality for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating updater features into your iOS and Android mobile apps built with Capacitor or Cordova, enabling cross-platform mobile app development with native capabilities.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings updater capabilities to both iOS and Android mobile platforms.

## Why Use updater in Your Capacitor Mobile App?

The @capgo/capacitor-updater plugin enables your iOS and Android mobile applications to leverage native updater functionality without writing platform-specific code. This Capacitor plugin provides a unified JavaScript API that works seamlessly on both iOS and Android mobile devices, making it perfect for cross-platform mobile app development.

Benefits for iOS and Android mobile applications:
- Native updater performance on iOS and Android devices
- Unified API for both iOS and Android mobile platforms
- No need for separate native iOS or Android code
- Works with Capacitor and Cordova mobile frameworks
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---
locale: en
---
# @capgo/capacitor-updater Package Tutorial

This tutorial will guide you through the process of using the `@capgo/capacitor-updater` package to enable auto-updates in your Ionic Capacitor app.

## Prerequisites

Before we start, make sure you have the following installed:

- Node.js
- npm

## Installation

To install the `@capgo/capacitor-updater` package, open your terminal or command prompt and run the following command:

```
npm install @capgo/capacitor-updater
```

This will download and install the package in your project.

### Install the plugin

You should end up with this code added to your app :

`npm i @capgo/capacitor-updater && npx cap sync`
To install the plugin into your Capacitor app.

And then add to your app this code to notify the native plugin that the JS bundle is healthy, the native plugin will rollback to the previous version, if you fail to do so :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

This will tell the native plugin the installation as succeeded.

Then do a `npm run build && npx cap copy` to update your app.

### Login to Capgo CLOUD

First, use the `all` [apikey](https://console.capgo.app/dashboard/apikeys/) present in your account to log in with the CLI:

`npx @capgo/cli@latest login YOU_KEY`

### Add your first app

Let's get started by first creating an app in Capgo Cloud with the CLI.

`npx @capgo/cli@latest app add`

This command will use all variables defined in the Capacitor config file to create the app.

### Upload your first version

Run the command to build your code and send it to Capgo with:
`npx @capgo/cli@latest bundle upload`

By default, the version name will be the one in your `package.json` file.

Check in [Capgo](https://console.capgo.app/) if the build is present.

You can even test it with my [mobile sandbox app](https://capgo.app/app_mobile/).

### Make channel default

After you have sent your app to Capgo, you need to make your channel `default` to let apps receive updates from Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Receive a Live Update on a Device

For your application to receive a live update from Deploy, you'll need to run the app on a device or an emulator. The easiest way to do this is simply to use the following command to launch your local app in an emulator or a device connected to your computer.

    npx cap run [ios | android]

Open the app, put it in the background and open it again, you should see in the logs the app did the update.

Congrats! 🎉 You have successfully deployed your first Live Update. This is just the start of what you can do with Live Updates. To learn more, view the complete [Live Updates docs](/docs/plugin/cloud-mode/getting-started/).


> If you need to stop receive in local the update run this command
`npx @capgo/cli@latest channel set`


## Conclusion

Congratulations! You have successfully learned how to use the `@capgo/capacitor-updater` package to enable auto-updates in your Ionic Capacitor app. Whether you choose the auto-update or manual setup, you now have the tools to keep your app up-to-date with ease.

## Platform-Specific Notes for iOS and Android

### iOS Mobile Platform

- Compatible with iOS 10.0+ mobile devices (iPhone and iPad)
- Uses native iOS APIs for updater functionality
- Optimized performance on iOS mobile platform
- Full support for latest iOS versions

### Android Mobile Platform

- Compatible with Android 5.0 (API 21)+ mobile devices
- Uses native Android APIs for updater functionality
- Works across all Android device manufacturers
- Optimized for Android mobile platform

## Capacitor vs Cordova for Mobile Development

While this updater plugin works with both Capacitor and Cordova mobile frameworks, Capacitor offers significant advantages for iOS and Android mobile app development:

- **Modern Architecture**: Better performance on iOS and Android mobile platforms
- **Direct Native Access**: Easier integration with iOS and Android native APIs
- **Improved Tooling**: Superior development experience for mobile apps
- **Active Development**: Regular updates for iOS and Android compatibility
- **Better Documentation**: Comprehensive guides for mobile app development

## Conclusion

You have successfully integrated @capgo/capacitor-updater into your Capacitor mobile application for iOS and Android. This plugin provides native updater capabilities for both iOS and Android mobile platforms, enabling professional mobile app development with a unified codebase.

For detailed API documentation and advanced updater features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-updater).

Whether you're building native iOS apps, Android mobile applications, or cross-platform Capacitor mobile apps, this updater plugin provides the native capabilities you need for professional mobile app development on iOS and Android platforms.
