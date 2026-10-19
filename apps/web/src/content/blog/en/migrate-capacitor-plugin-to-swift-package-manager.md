---
slug: migrate-capacitor-plugin-to-swift-package-manager
title: "Migrate a Capacitor Plugin to Swift Package Manager"
description: "Add Swift Package Manager support to a Capacitor plugin: Package.swift naming rules, CAPBridgedPlugin, Sources layout, resources, Obj-C code and cap2spm."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor-spm-migration-guide.jpg
head_image_alt: "Illustration for migrating a Capacitor plugin from CocoaPods to Swift Package Manager"
keywords: Capacitor plugin SPM, migrate Capacitor plugin to Swift Package Manager, Package.swift Capacitor plugin, CAPBridgedPlugin, cap2spm, capacitor-plugin-converter, CocoaPods to SPM
tag: Capacitor, iOS, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I keep the Plugin.m and Plugin.h files and add Package.swift next to them?"
    answer: "Not in the same target. SwiftPM does not allow Swift and Objective-C sources in one target, and the CAP_PLUGIN macro file is Objective-C. Move the registration into Swift with CAPBridgedPlugin and delete the bridge files. If you have real Objective-C code, put it in its own target."
  - question: "What name must my Package.swift use?"
    answer: "The Capacitor CLI derives it from the npm package name: remove @, replace / and - with _, then camel-case each part. @capgo/capacitor-updater becomes CapgoCapacitorUpdater. The package name and the library product name must both match that value."
  - question: "Do I still need the podspec after adding SPM?"
    answer: "Yes, keep it. Apps that still use CocoaPods install your plugin through the podspec. Point s.source_files at ios/Sources so both package managers compile the same files."
  - question: "What happens if I forget a method in pluginMethods?"
    answer: "The build succeeds, but JavaScript calls to that method fail at runtime because the bridge never registered it. Compare the list against every @objc func that takes a CAPPluginCall."
  - question: "Is cap2spm safe to run?"
    answer: "It works for most plugins that are Swift-only apart from the bridge files, but the maintainers mark it as under heavy development. Run it on a clean git tree and review the diff."
---

To migrate a Capacitor plugin to Swift Package Manager, add a `Package.swift` at the plugin root whose package and product name match what the Capacitor CLI expects, move the iOS code into `ios/Sources/<Target>`, replace the Objective-C `CAP_PLUGIN` bridge files with `CAPBridgedPlugin` conformance in Swift, and add `Package.swift` to the npm `files` list. Keep the podspec so CocoaPods apps keep working.

Since Capacitor 8, `cap add ios` creates SPM projects by default. A plugin without `Package.swift` gets skipped in those apps with the warning "Some installed Capacitor plugins are not compatible with SPM", and users then see "plugin is not implemented" at runtime. This guide covers the manual migration, the converter tool, and the parts most guides skip: naming rules, resources, Objective-C code and third-party dependencies.

App teams moving their own project should read [How to Migrate Your Capacitor App to SPM](/blog/how-to-migrate-your-capacitor-app-to-spm/) instead.

## How Capacitor consumes your package

On `bunx cap sync ios`, the CLI rewrites `ios/App/CapApp-SPM/Package.swift` in the app. For each Capacitor plugin that has a `Package.swift`, it adds two lines:

```swift
.package(name: "CapgoCapacitorUpdater", path: "../../../node_modules/@capgo/capacitor-updater")
// ...
.product(name: "CapgoCapacitorUpdater", package: "CapgoCapacitorUpdater")
```

Two consequences:

1. **Your package is consumed by local path from `node_modules`**, not from a git URL. Your `Package.swift` must sit at the npm package root, and everything it references must be published to npm.
2. **The name is derived from the npm name**, not from your podspec. The CLI strips `@`, turns `/` and `-` into `_`, then camel-cases each segment and capitalizes the first letter:

| npm package | Required package and product name |
| --- | --- |
| `@capacitor/haptics` | `CapacitorHaptics` |
| `@capgo/capacitor-updater` | `CapgoCapacitorUpdater` |
| `capacitor-my-plugin` | `CapacitorMyPlugin` |
| `@acme/capacitor-scanner` | `AcmeCapacitorScanner` |

If your `Package.swift` uses another name or product name, the app fails to resolve packages with an error like `product 'X' required by package 'capapp-spm' target 'CapApp-SPM' not found`.

## Step 1: write Package.swift

This is the layout the official plugins use. Here is the real manifest from `@capacitor/haptics` 8:

```swift
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorHaptics",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapacitorHaptics",
            targets: ["HapticsPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "HapticsPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/HapticsPlugin"),
        .testTarget(
            name: "HapticsPluginTests",
            dependencies: ["HapticsPlugin"],
            path: "ios/Tests/HapticsPluginTests")
    ]
)
```

Notes:

- Keep `swift-tools-version: 5.9` unless you need a newer feature. The app's generated package also uses 5.9 by default, and Capacitor 8 doesn't officially support Swift 6 yet.
- Use `from: "8.0.0"` for `capacitor-swift-pm`. The app pins an exact version that matches its installed `@capacitor/ios`, and a range lets SPM resolve both. `branch:` or `exact:` will cause resolution conflicts.
- The target name can be anything, but it becomes the Swift module name. Avoid generic names like `Plugin` that collide with other plugins.

## Step 2: move the sources

SPM expects one folder per target. The converter and the official template use:

```text
my-plugin/
├── Package.swift
├── MyPlugin.podspec
├── ios/
│   ├── Sources/
│   │   └── MyPlugin/
│   │       ├── MyPlugin.swift
│   │       └── MyPluginImplementation.swift
│   └── Tests/
│       └── MyPluginTests/
│           └── MyPluginTests.swift
└── package.json
```

Then remove what SPM doesn't need: `ios/Plugin.xcodeproj`, `ios/Plugin.xcworkspace`, `ios/Podfile`, `ios/Plugin/Info.plist` and `ios/PluginTests/Info.plist`.

Update the podspec so CocoaPods compiles the same files:

```ruby
s.source_files = 'ios/Sources/**/*.{swift,h,m,c,cc,mm,cpp}'
s.ios.deployment_target = '15.0'
s.dependency 'Capacitor'
s.swift_version = '5.1'
```

## Step 3: replace the Objective-C bridge with CAPBridgedPlugin

Old plugins register methods in `Plugin.m`:

```objc
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyPlugin, "MyPlugin",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(startScan, CAPPluginReturnCallback);
)
```

SwiftPM can't mix Objective-C and Swift in one target, so this moves into the Swift class:

```swift
import Foundation
import Capacitor

@objc(MyPlugin)
public class MyPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "MyPlugin"
    public let jsName = "MyPlugin"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startScan", returnType: CAPPluginReturnCallback)
    ]

    @objc func echo(_ call: CAPPluginCall) {
        call.resolve(["value": call.getString("value") ?? ""])
    }

    @objc func startScan(_ call: CAPPluginCall) {
        call.keepAlive = true
        // ...
    }
}
```

Mapping rules:

- `identifier` is the first argument of `CAP_PLUGIN` (the class name).
- `jsName` is the second argument, the name used in `registerPlugin('MyPlugin')` in your TypeScript.
- Each `CAP_PLUGIN_METHOD` becomes one `CAPPluginMethod`, keeping the same return type (`CAPPluginReturnPromise`, `CAPPluginReturnCallback` or `CAPPluginReturnNone`).

A method missing from `pluginMethods` compiles fine and fails only when JavaScript calls it. Grep for `@objc func` with a `CAPPluginCall` parameter and count them against the array. Then delete `Plugin.h` and `Plugin.m`.

`CAPBridgedPlugin` works with CocoaPods too, so the same Swift file serves both package managers.

## Step 4: update package.json and .gitignore

```json
{
  "files": [
    "android/src/main/",
    "android/build.gradle",
    "dist/",
    "ios/Sources",
    "ios/Tests",
    "Package.swift",
    "MyPlugin.podspec"
  ],
  "scripts": {
    "verify:ios": "xcodebuild -scheme CapacitorMyPlugin -destination generic/platform=iOS"
  }
}
```

The `-scheme` value is your package name. Forgetting `Package.swift` or `ios/Sources` in `files` is the most common reason a plugin works from a git checkout and breaks after `npm publish`. Run `bun pm pack --dry-run` and check the file list.

Add SPM build output to `.gitignore`:

```gitignore
.build/
Package.resolved
/Packages
.swiftpm/
```

## Step 5: handle what the converter won't

### Third-party dependencies

A podspec line like `s.dependency 'Alamofire', '~> 5.9'` becomes a package dependency and a product on your target:

```swift
dependencies: [
    .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0"),
    .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.9.0")
],
targets: [
    .target(
        name: "MyPlugin",
        dependencies: [
            .product(name: "Capacitor", package: "capacitor-swift-pm"),
            .product(name: "Cordova", package: "capacitor-swift-pm"),
            .product(name: "Alamofire", package: "Alamofire")
        ],
        path: "ios/Sources/MyPlugin")
]
```

If the SDK only ships an `.xcframework`, ship it inside the npm package and use a binary target:

```swift
.binaryTarget(name: "VendorSDK", path: "ios/Frameworks/VendorSDK.xcframework")
```

If a vendor offers no SPM package and no xcframework, you can't add SPM support yet. Keep the plugin CocoaPods-only and say so in the README.

Keep version ranges in `Package.swift` and the podspec aligned. Two plugins in the same app that require incompatible versions of one SDK will fail resolution in either package manager.

### Resources and privacy manifests

Images, JSON, storyboards and `PrivacyInfo.xcprivacy` must be declared:

```swift
.target(
    name: "MyPlugin",
    dependencies: [/* ... */],
    path: "ios/Sources/MyPlugin",
    resources: [
        .process("Resources"),
        .copy("PrivacyInfo.xcprivacy")
    ])
```

CocoaPods needs the same files declared in the podspec. Put them in a named resource bundle:

```ruby
s.resource_bundles = {
  'MyPluginResources' => [
    'ios/Sources/MyPlugin/Resources/**/*',
    'ios/Sources/MyPlugin/PrivacyInfo.xcprivacy'
  ]
}
```

In code, SPM resources live in `Bundle.module`, while CocoaPods puts them in that `MyPluginResources.bundle`, next to the plugin class. Switch with the `SWIFT_PACKAGE` flag, which SwiftPM defines automatically:

```swift
#if SWIFT_PACKAGE
let resourceBundle = Bundle.module
#else
let resourceBundle: Bundle = {
    let classBundle = Bundle(for: MyPlugin.self)
    guard let url = classBundle.url(forResource: "MyPluginResources", withExtension: "bundle"),
          let bundle = Bundle(url: url) else {
        return classBundle
    }
    return bundle
}()
#endif
```

### Real Objective-C code

If part of the plugin is Objective-C (not just the bridge), put it in its own target with public headers in an `include` folder, and make the Swift target depend on it:

```swift
.target(
    name: "MyPluginObjC",
    path: "ios/Sources/MyPluginObjC",
    publicHeadersPath: "include"),
.target(
    name: "MyPlugin",
    dependencies: [
        "MyPluginObjC",
        .product(name: "Capacitor", package: "capacitor-swift-pm")
    ],
    path: "ios/Sources/MyPlugin")
```

The Swift code then does `import MyPluginObjC`.

## The automated route: cap2spm

The Ionic team's [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) builds a `cap2spm` binary that reads `Plugin.m` and `Plugin.h`, adds `CAPBridgedPlugin` conformance to your Swift class, generates `Package.swift`, moves files to `Sources` and `Tests`, updates the podspec and `package.json`, and removes the old Xcode project files.

```bash
curl -OL https://github.com/ionic-team/capacitor-plugin-converter/releases/latest/download/cap2spm.zip
unzip cap2spm.zip
xattr -d com.apple.quarantine ./cap2spm   # binary is unsigned
./cap2spm --backup /path/to/my-plugin
```

It's designed for plugins that are Swift-only apart from the bridge files. Run it on a clean git tree and then do Step 5 by hand.

Other options:

- **Scaffold a fresh plugin** with `bun create @capacitor/plugin` and copy your implementation in. The template already supports SPM and CocoaPods. This is often faster for small plugins.
- **Use an agent.** The `capacitor-plugin-spm-support` skill in [Capgo Skills](/skills/) walks through Package.swift, bridge cleanup, resources and `package.json`. Install with `bunx skills add Cap-go/capgo-skills`.

## Test in a real SPM app

```bash
bun create @capacitor/app spm-test
cd spm-test
bun add @capacitor/ios
bun add ../my-plugin
bun run build
bunx cap add ios          # SPM is the default in Capacitor 8
bunx cap sync ios
```

Check that `ios/App/CapApp-SPM/Package.swift` lists your package, and that sync printed "All Capacitor plugins have a Package.swift file". Then build on a device and call each method. Repeat in an app created with `bunx cap add ios --packagemanager CocoaPods` to confirm the podspec still works.

## Troubleshooting

**`product 'X' required by package 'capapp-spm' ... not found`.** Package or product name doesn't match the name derived from your npm name. See the table above.

**`"MyPlugin" plugin is not implemented on ios`.** Either `Package.swift` wasn't published, `jsName` doesn't match `registerPlugin`, or the class lacks `CAPBridgedPlugin`. Inspect the plugin folder in `node_modules`.

**`Multiple targets named 'Plugin'` or duplicate module errors.** Two plugins use the same target name. Rename yours to something unique. App teams can also work around it with `experimental.ios.spm.packageOptions` (`moduleAliases` or `symlink`) in the Capacitor config, available since CLI 8.4.

**`target 'X' contains mixed language source files`.** Objective-C and Swift files share a folder. Split them into two targets.

**Xcode shows stale package errors after fixes.** Use **File > Packages > Reset Package Caches**, then build again.

If you also need optional features toggled per app, read [how to use SPM package traits in Capacitor](/blog/spm-package-traits-in-capacitor/). For apps that must stay on CocoaPods for now, see [how to use CocoaPods with Capacitor 8](/blog/use-cocoapods-with-capacitor-8/), and for the bigger picture, [SPM vs CocoaPods for Capacitor](/blog/ios-spm-vs-cocoapods-capacitor-migration-guide/).
