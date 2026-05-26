---
title: iOS Setup
description: Configure Microsoft Intune MAM and MSAL on iOS for @capgo/capacitor-intune.
sidebar:
  order: 3
---

## iOS Support Matrix

- Intune iOS SDK bundled by this plugin: `21.5.1`
- Minimum iOS version: `17.0`
- Recommended Xcode line: `26.x`

Ionic's Intune docs currently note that apps built with Xcode 26 must use Intune iOS SDK `21.1.0+` starting on January 19, 2026. This plugin is already on that newer SDK line.

## 1. Add Intune and MSAL settings to `Info.plist`

Add an `IntuneMAMSettings` dictionary:

```xml
<key>IntuneMAMSettings</key>
<dict>
  <key>ADALClientId</key>
  <string>YOUR_CLIENT_ID</string>
  <key>ADALRedirectUri</key>
  <string>msauth.com.example.app://auth</string>
  <key>ADALAuthority</key>
  <string>https://login.microsoftonline.com/common</string>
</dict>
```

The plugin reads:

- `ADALClientId`
- `ADALRedirectUri`
- `ADALRedirectScheme` as a fallback if you prefer storing only the scheme
- `ADALAuthority` as an optional authority override

## 2. Forward the MSAL callback in `AppDelegate`

```swift
import MSAL

func application(
  _ app: UIApplication,
  open url: URL,
  options: [UIApplication.OpenURLOptionsKey: Any] = [:]
) -> Bool {
  return MSALPublicClientApplication.handleMSALResponse(
    url,
    sourceApplication: options[.sourceApplication] as? String
  )
}
```

## 3. Configure URL schemes and entitlements

Follow Microsoft's and Ionic's Intune guidance for:

- the `msauth...` redirect URI scheme
- keychain sharing / keychain access groups
- `LSApplicationQueriesSchemes`
- `NSFaceIDUsageDescription` if your flow needs biometrics

These are app-specific and cannot be inferred by the plugin.

## 4. Run `IntuneMAMConfigurator`

Microsoft requires running `IntuneMAMConfigurator` against your final app `Info.plist` and entitlements. Use the latest configurator from the official Intune iOS SDK and rerun it whenever those files materially change.

## 5. Keep the deployment target aligned

Because the bundled Intune iOS SDK is on the current `21.x` line, your app target should remain at iOS `17.0` or later.

## Keep going from iOS Setup

If you are using **iOS Setup** to plan native plugin work, connect it with [Using @capgo/capacitor-intune](/plugins/capacitor-intune/) for the native capability in Using @capgo/capacitor-intune, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
