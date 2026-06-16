---
slug: how-to-migrate-a-capacitor-plugin-to-spm
title: "How to Migrate a Capacitor Plugin to Swift Package Manager"
description: >-
  Learn how to migrate a Capacitor iOS plugin from CocoaPods-only support to Swift Package Manager with a practical Package.swift, dependency mapping, and testing checklist.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-06-16T00:00:00.000Z
updated_at: 2026-06-16T00:00:00.000Z
head_image: /capacitor-spm-migration-guide.jpg
head_image_alt: Capacitor plugin migration from CocoaPods to Swift Package Manager
keywords: Swift Package Manager, SPM, CocoaPods, Capacitor plugin, iOS plugin, Package.swift, capacitor-swift-pm, plugin migration
tag: Tutorial
published: true
locale: en
next_blog: ''
---

Swift Package Manager is now the safer default for Capacitor iOS dependency management. If you maintain a Capacitor plugin that only works through CocoaPods, app teams migrating to SPM will eventually hit your plugin as the blocker.

This guide shows how to add SPM support to an existing Capacitor plugin without rewriting the whole package. The goal is small: keep the JavaScript and Android layers unchanged, make the iOS source build as a Swift package, and verify the plugin in a real Capacitor app.

## What changes for a plugin

A CocoaPods-only Capacitor plugin usually exposes iOS code through a `.podspec` file. An SPM-compatible plugin also needs a root `Package.swift` that describes:

- The plugin library product.
- The iOS platform version.
- The Capacitor Swift package dependency.
- Any native SDK dependencies that used to live in the podspec.
- The target path where the plugin Swift or Objective-C source lives.

You can keep the `.podspec` while adding SPM support. That is the least disruptive path if existing users still install the plugin through CocoaPods.

## Start with an audit

Create a branch and inspect the current iOS surface before changing files:

```bash
git status
find ios -maxdepth 3 -type f
find . -maxdepth 2 -name "*.podspec" -print
```

Then open the podspec and list everything it contributes:

```ruby
s.dependency 'Capacitor'
s.dependency 'SomeNativeSDK', '~> 2.4'
s.source_files = 'ios/Plugin/**/*.{swift,h,m,mm}'
s.resources = 'ios/Plugin/Assets/**/*'
s.frameworks = 'StoreKit', 'UserNotifications'
```

Every dependency, source path, resource bundle, and system framework needs an SPM equivalent or an explicit decision to keep it CocoaPods-only.

## Add Package.swift

For a simple Swift plugin, a good first `Package.swift` looks like this:

```swift
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorExamplePlugin",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorExamplePlugin",
            targets: ["ExamplePlugin"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "ExamplePlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Plugin"
        )
    ]
)
```

Adjust the package name, target name, iOS deployment target, and Capacitor package version to match the Capacitor major version your plugin supports.

Keep the target path aligned with your current plugin layout. Most Capacitor plugin templates use `ios/Plugin`; older plugins may use a custom folder.

## Map podspec dependencies to SPM

If the podspec includes third-party SDKs, move those references into `Package.swift`.

For example, a podspec dependency like this:

```ruby
s.dependency 'FirebaseFirestore', '~> 11.8'
```

becomes package and product dependencies:

```swift
dependencies: [
    .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
    .package(url: "https://github.com/firebase/firebase-ios-sdk.git", from: "11.8.0")
],
targets: [
    .target(
        name: "ExamplePlugin",
        dependencies: [
            .product(name: "Capacitor", package: "capacitor-swift-pm"),
            .product(name: "Cordova", package: "capacitor-swift-pm"),
            .product(name: "FirebaseCore", package: "firebase-ios-sdk"),
            .product(name: "FirebaseFirestore", package: "firebase-ios-sdk")
        ],
        path: "ios/Plugin"
    )
]
```

If an SDK does not support SPM, do not guess. Check whether the vendor publishes an official Swift package, binary target, or XCFramework distribution. If there is no SPM-compatible artifact, document that limitation and keep that plugin version CocoaPods-only until the dependency can move.

## Handle resources and headers

Swift-only plugins are usually straightforward. Plugins with resources, Objective-C, or mixed Swift and Objective-C need more care.

For resources, add them to the target:

```swift
.target(
    name: "ExamplePlugin",
    dependencies: [
        .product(name: "Capacitor", package: "capacitor-swift-pm")
    ],
    path: "ios/Plugin",
    resources: [
        .process("Assets")
    ]
)
```

For Objective-C headers, keep public headers under an include directory and declare it:

```swift
.target(
    name: "ExamplePlugin",
    dependencies: [
        .product(name: "Capacitor", package: "capacitor-swift-pm")
    ],
    path: "ios/Plugin",
    publicHeadersPath: "include"
)
```

Avoid moving files unless the existing structure makes SPM impossible. Smaller diffs are easier for plugin users to review and easier to backport.

## Update the Swift plugin bridge

Current Capacitor plugins should expose their iOS bridge through `CAPPlugin` and `CAPBridgedPlugin`:

```swift
import Foundation
import Capacitor

@objc(ExamplePlugin)
public class ExamplePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ExamplePlugin"
    public let jsName = "Example"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }
}
```

The names matter. `identifier`, `jsName`, TypeScript registration, and native class names should agree with the public plugin API. Do not rename the JavaScript API as part of the SPM migration unless you are intentionally shipping a breaking change.

## Test the package by itself

Before installing the plugin in a sample app, verify that SwiftPM can resolve and describe the package:

```bash
swift package resolve
swift package describe
```

If this fails, fix the package manifest first. A Capacitor app cannot paper over an invalid Swift package.

## Test in a Capacitor SPM app

Create a small test app and install the plugin package:

```bash
npm init @capacitor/app@latest spm-plugin-test
cd spm-plugin-test
npm install ../path-to-your-plugin
npm install @capacitor/ios
npm run build
npx cap add ios --packagemanager SPM
npx cap sync ios
npx cap open ios
```

In Xcode, confirm that:

- The app resolves packages without CocoaPods.
- The plugin appears in the package graph.
- The app target links the plugin product.
- The plugin method can be called from JavaScript.
- A clean build works after deleting derived data.

Then run the same plugin in a CocoaPods app if you are keeping podspec support. Dual support only counts if both paths build.

## Update CI

Add an SPM test path to the plugin repository. At minimum, CI should validate package resolution and a sample app sync:

```bash
swift package resolve
npm install
npm run build
npx cap sync ios
```

If your plugin repository already has an example app, convert that example to SPM or add a second iOS example that uses SPM. Keep the CI job small: install dependencies, build web assets, sync iOS, and run an Xcode build when runners are available.

## Release checklist

Before publishing the migrated plugin:

- [ ] `Package.swift` is committed at the package root.
- [ ] The package target points at the real iOS source path.
- [ ] Capacitor and Cordova products are declared when the plugin needs them.
- [ ] Native SDK dependencies are mapped to official SPM packages.
- [ ] Resources and public headers are declared explicitly.
- [ ] The TypeScript API did not change accidentally.
- [ ] A fresh SPM Capacitor app can install, sync, and build the plugin.
- [ ] CocoaPods support still builds if the `.podspec` remains published.
- [ ] The release notes call out SPM support and the minimum Capacitor/iOS versions.

## Common failures

**Xcode cannot find `Capacitor`**
Check that `Package.swift` depends on `capacitor-swift-pm` and that the target lists `.product(name: "Capacitor", package: "capacitor-swift-pm")`.

**The plugin builds but JavaScript cannot call it**
Check `identifier`, `jsName`, `pluginMethods`, and the TypeScript `registerPlugin()` name. SPM changes packaging, not the bridge contract.

**Duplicate symbols appear**
The same native SDK is probably being linked through both CocoaPods and SPM. In a migrated app, remove the CocoaPods copy of that dependency.

**A dependency has no SPM package**
Do not vendor random source into the plugin just to make the build pass. Prefer an official SPM package, an official binary target, or a documented limitation until the dependency supports SPM.

## Keep going

After the plugin supports SPM, migrate the host app with the [Capacitor app SPM migration guide](/blog/ios-spm-vs-cocoapods-capacitor-migration-guide/). If you use AI coding agents for the work, start from [Capgo Skills](/skills/) for Capacitor plugin, testing, CI/CD, and native debugging guidance.

## Resources

- [Capacitor Swift Package Manager documentation](https://capacitorjs.com/docs/ios/spm)
- [Capacitor iOS plugin guide](https://capacitorjs.com/docs/plugins/creating-plugins/ios-guide)
- [Swift Package Manager documentation](https://swift.org/package-manager/)
