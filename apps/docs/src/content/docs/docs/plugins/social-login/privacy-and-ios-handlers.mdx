---
title: Privacy Manifest and iOS URL Handlers
description: Add app-level privacy manifests and combine Facebook and Google URL callbacks for @capgo/capacitor-social-login.
sidebar:
  order: 7
---

## Privacy manifest for app developers

If you use Google, Facebook, or Apple login, declare the data collected by those SDKs in your app's `PrivacyInfo.xcprivacy` file. Add the file in your app at `ios/App/PrivacyInfo.xcprivacy`.

Do not add this file to the plugin package. Adjust the data types to match your app's usage and the provider SDK documentation.

### Google Sign-In example

```json
{
  "NSPrivacyCollectedDataTypes": [
    { "NSPrivacyCollectedDataType": "EmailAddress", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false },
    { "NSPrivacyCollectedDataType": "Name", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false },
    { "NSPrivacyCollectedDataType": "UserID", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false }
  ]
}
```

### Facebook Login example

```json
{
  "NSPrivacyCollectedDataTypes": [
    { "NSPrivacyCollectedDataType": "EmailAddress", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false },
    { "NSPrivacyCollectedDataType": "Name", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false },
    { "NSPrivacyCollectedDataType": "UserID", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false },
    { "NSPrivacyCollectedDataType": "FriendsList", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false }
  ]
}
```

### Apple Sign-In example

```json
{
  "NSPrivacyCollectedDataTypes": [
    { "NSPrivacyCollectedDataType": "EmailAddress", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false },
    { "NSPrivacyCollectedDataType": "Name", "NSPrivacyCollectedDataTypeLinked": true, "NSPrivacyCollectedDataTypeTracking": false }
  ]
}
```

Review [Apple's privacy manifest documentation](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/) for all allowed keys and values.

## Combine Facebook and Google URL handlers

When an iOS app uses both Facebook and Google login, route the callback URL to both SDKs before passing it back to Capacitor.

In `ios/App/App/AppDelegate.swift`:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    // Return true if the URL was handled by either Facebook or Google authentication.
    if FBSDKCoreKit.ApplicationDelegate.shared.application(
        app,
        open: url,
        sourceApplication: options[UIApplication.OpenURLOptionsKey.sourceApplication] as? String,
        annotation: options[UIApplication.OpenURLOptionsKey.annotation]
    ) || GIDSignIn.sharedInstance.handle(url) {
        return true
    }

    return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
}
```

Make sure `AppDelegate.swift` imports the SDKs used by your app:

```swift
import Capacitor
import FBSDKCoreKit
import GoogleSignIn
import UIKit
```

## Related docs

- [Facebook Login Setup](/docs/plugins/social-login/facebook/)
- [Google Login on iOS](/docs/plugins/social-login/google/ios/)
- [Troubleshooting](/docs/plugins/social-login/troubleshooting/)
