---
title: "Sandbox App"
sidebar:
  order: 4
---

Capgo sandbox app goal:

* Manage your version and channel
* test versions directly in it.
* Allow other teammates to test versions.

It’s the same code as the web app.

## Install

[app mobile](https://capgo.app/app\_mobile)

Download the app:

* [Android](https://play.google.com/store/apps/details?id=ee.forgr.capacitor\_go\&hl=en\_US\&gl=US)
* [iOS](https://play.google.com/store/apps/details?id=ee.forgr.capacitor\_go\&hl=en\_US\&gl=US)

## Demo

https://user-images.githubusercontent.com/4084527/163660659-df47248e-ebfb-4c54-846e-281fe3248dac.mov

### Test your app

Connect your account.

#### You should see your first app

Like below

![](https://user-images.githubusercontent.com/4084527/163660693-fb5446ea-ec37-48c4-b6a7-f3a9d1870bf5.png)

#### Then click on it to see all versions uploaded:

![](https://user-images.githubusercontent.com/4084527/163660706-71d10686-a576-4dc4-be2c-a42ce813a198.png)

If you click on one, you can test the version directly in the test app

⚠️ You cannot test add with module not listed below, or if they require Cordova module.

### Stop testing

Shake your phone at any time to see the menu below

![](https://user-images.githubusercontent.com/4084527/163660713-dbfd8d37-494d-4ce2-a696-67faa02f4b01.png)

## Available native API

#### All official plugins are installed and preconfigured

* [Action Sheet](https://github.com/ionic-team/capacitor-plugins/tree/main/action-sheet) - Provides access to native Action Sheets.
* [App](https://github.com/ionic-team/capacitor-plugins/tree/main/app) - Handles high-level App state and events.
* [App Launcher](https://github.com/ionic-team/capacitor-plugins/tree/main/app-launcher) - Allows to check if an app can be opened and open it.
* [Browser](https://github.com/ionic-team/capacitor-plugins/tree/main/browser) - Provides the ability to open an in-app browser and subscribe to browser events.
* [Camera](https://github.com/ionic-team/capacitor-plugins/tree/main/camera) - Provides the ability to take a photo with the camera or choose an existing one from the photo album.
* [Clipboard](https://github.com/ionic-team/capacitor-plugins/tree/main/clipboard) - Enables copy and pasting to/from the system clipboard.
* [Device](https://github.com/ionic-team/capacitor-plugins/tree/main/device) - Exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.
* [Dialog](https://github.com/ionic-team/capacitor-plugins/tree/main/dialog) - Provides methods for triggering native dialog windows for alerts, confirmations, and input prompts.
* [File system](https://github.com/ionic-team/capacitor-plugins/tree/main/filesystem) - Provides a NodeJS-like API for working with files on the device.
* [Geolocation](https://github.com/ionic-team/capacitor-plugins/tree/main/geolocation) - Provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.
* [Haptics](https://github.com/ionic-team/capacitor-plugins/tree/main/haptics) - Provides physical feedback to the user through touch or vibration.
* [Keyboard](https://github.com/ionic-team/capacitor-plugins/tree/main/keyboard) - Provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.
* [Local Notifications](https://github.com/ionic-team/capacitor-plugins/tree/main/local-notifications) - Provides a way to schedule device notifications locally (i.e. without a server sending push notifications).
* [Motion](https://github.com/ionic-team/capacitor-plugins/tree/main/motion) - Tracks accelerometer and device orientation (compass heading, etc.).
* [Network](https://github.com/ionic-team/capacitor-plugins/tree/main/network) - Provides network and connectivity information.
* [Push Notifications](https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications) - Provides access to native push notifications.
* [Screen Reader](https://github.com/ionic-team/capacitor-plugins/tree/main/screen-reader) - Provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.
* [Share](https://github.com/ionic-team/capacitor-plugins/tree/main/share) - Provides methods for sharing content in any sharing-enabled apps the user may have installed.
* [Splash Screen](https://github.com/ionic-team/capacitor-plugins/tree/main/splash-screen) - Provides methods for showing or hiding a Splash image.
* [Status Bar](https://github.com/ionic-team/capacitor-plugins/tree/main/status-bar) - Provides methods for configuring the style of the Status Bar, along with showing or hiding it.
* [Storage](https://github.com/ionic-team/capacitor-plugins/tree/main/preferences)(preferences) - Provides a simple key/value persistent store for lightweight data.
* [Text Zoom](https://github.com/ionic-team/capacitor-plugins/tree/main/text-zoom) - Provides the ability to change Web View text size for visual accessibility.
* [Toast](https://github.com/ionic-team/capacitor-plugins/tree/main/toast) - Provides a notification pop-up for displaying important information to a user. Just like real toast!

#### Some unofficial plugins are installed and preconfigured too

* [@robingenz/capacitor-file-picker](https://github.com/robingenz/capacitor-file-picker) - Capacitor plugin that allows the user to select a file.
* [@robingenz/capacitor-screen-orientation](https://github.com/robingenz/capacitor-screen-orientation) - Capacitor plugin to lock/unlock the screen orientation.
* [@teamhive/capacitor-video-recorder](https://github.com/TeamMaestro/capacitor-video-recorder) - Video recorder plugin for Capacitor
* [capacitor-crisp](https://github.com/riderx/capacitor-crisp) - Crisp native SDK for capacitor
* [capacitor-flash](https://github.com/riderx/capacitor-flash) - Switch the Flashlight / Torch of your device.
* [capacitor-mute](https://github.com/riderx/capacitor-mute) - Detect if the mute switch is enabled/disabled on a device
* [capacitor-native-audio](https://github.com/capacitor-community/native-audio) - Capacitor plugin for native audio engine.
* [capacitor-native-biometric](https://github.com/epicshaggy/capacitor-native-biometric) - Use biometrics to confirm device owner presence or authenticate users.
* [capacitor-purchases](https://github.com/riderx/capacitor-purchases) - In-app Subscriptions Made Easy with RevenueCat SDK
* [capacitor-rate-app](https://github.com/Nodonisko/capacitor-rate-app) - Let users rate your app using native review app dialog for both Android and iOS.
* [capacitor-screen-recorder](https://github.com/TeamMaestro/capacitor-video-recorder) - A video recording plugin for Capacitor that allows applications to use the native camera and microphone and display the recording interface either below or above their application.
* [capacitor-updater](https://github.com/riderx/capacitor-updater) - OTA update for capacitor

> ⚠️ All other Native APIs you use that are not in this list will raise errors.

> 💡 If you need a capacitor plugin to test your app open issue in [GitHub](https://github.com/Cap-go/capgo) I will add it to the next build.

> ⛔ Cordova plugins are not supported in the sandbox test app

## Troubleshooting

If your app uses a module, there are not installed in the sandbox app, your app may crash. If that happens, you could be in a situation where you cannot go out back to the app.\
If that happens, uninstall the sandbox app and install it again.\
I am searching better solution for the future.
