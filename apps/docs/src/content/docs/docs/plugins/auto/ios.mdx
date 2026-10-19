---
title: iOS setup
description: "Configure CarPlay for @capgo/capacitor-auto."
sidebar:
  order: 3
---

iOS car support uses CarPlay templates. Apple must approve the CarPlay entitlement for your app category before the app can ship with CarPlay support.

## Info.plist scene

Add a CarPlay scene configuration to `ios/App/App/Info.plist` and point it to the plugin scene delegate.

For Swift Package Manager, use:

```xml
<key>UIApplicationSceneManifest</key>
<dict>
  <key>UIApplicationSupportsMultipleScenes</key>
  <true/>
  <key>UISceneConfigurations</key>
  <dict>
    <key>CPTemplateApplicationSceneSessionRoleApplication</key>
    <array>
      <dict>
        <key>UISceneClassName</key>
        <string>CPTemplateApplicationScene</string>
        <key>UISceneDelegateClassName</key>
        <string>AutoPlugin.AutoCarPlaySceneDelegate</string>
      </dict>
    </array>
  </dict>
</dict>
```

For CocoaPods, the delegate module is commonly:

```xml
<string>CapgoCapacitorAuto.AutoCarPlaySceneDelegate</string>
```

## Entitlement

Request the CarPlay entitlement for the app category that matches your use case. The plugin renders a simple `CPListTemplate`, but Apple still decides which templates and categories are allowed for production distribution.

## Sync

```bash
npx cap sync ios
```

## Behavior

- `setRootTemplate` updates the CarPlay list template when the car display is connected.
- CarPlay row selection emits `carAction` to JavaScript.
- If CarPlay connects before the WebView listener is ready, retained events are delivered when the plugin attaches.

## Limits

CarPlay does not render your Capacitor WebView. Keep car rows short and use them as native intent triggers for phone app logic.

## Keep going from iOS setup

If you are using **iOS setup** to plan native plugin work, connect it with [Using @capgo/capacitor-auto](/plugins/capacitor-auto/) for the native capability in Using @capgo/capacitor-auto, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
