---
title: iOS Setup
description: Configure the required iOS deeplink hooks for Contentsquare in-app features in Capacitor apps.
sidebar:
  order: 3
---

Contentsquare tracking starts automatically once the plugin is installed, but iOS in-app features such as SDK logs, screenshot capture, and replay configuration still need the upstream URL handling setup.

## 1. Add the URL scheme

Add `cs-$(PRODUCT_BUNDLE_IDENTIFIER)` to your app URL schemes in Xcode or your host app's `Info.plist`.

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>cs-$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    </array>
  </dict>
</array>
```

## 2. Forward Contentsquare deeplinks

Wherever your Capacitor host app handles incoming URLs, forward them to the native SDK:

### AppDelegate

```swift
import ContentsquareModule

func application(
  _ app: UIApplication,
  open url: URL,
  options: [UIApplication.OpenURLOptionsKey : Any] = [:]
) -> Bool {
  Contentsquare.handle(url: url)
  return true
}
```

### SceneDelegate

```swift
import ContentsquareModule

func scene(_ scene: UIScene, openURLContexts urlContexts: Set<UIOpenURLContext>) {
  if let url = urlContexts.first?.url {
    Contentsquare.handle(url: url)
  }
}
```

### SwiftUI

```swift
import ContentsquareModule

.onOpenURL { url in
  Contentsquare.handle(url: url)
}
```

## 3. Validate the installation

- Launch the app on a device or simulator.
- Filter Xcode or Console logs with `CSLIB`.
- Open the Contentsquare mobile tooling and trigger in-app features to confirm the deeplink is handled.

## Keep going from iOS Setup

If you are using **iOS Setup** to plan native plugin work, connect it with [Using @capgo/capacitor-contentsquare](/plugins/capacitor-contentsquare/) for the native capability in Using @capgo/capacitor-contentsquare, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
