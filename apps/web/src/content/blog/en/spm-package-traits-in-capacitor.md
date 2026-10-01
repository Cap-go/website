---
slug: spm-package-traits-in-capacitor
title: "How to Use SPM Package Traits in Capacitor 8"
description: "Use SPM package traits in Capacitor 8: enable optional plugin features with packageTraits, set swiftToolsVersion 6.1, and add traits to your own plugin."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capacitor-spm-migration-guide.jpg
head_image_alt: "Illustration for Swift Package Manager configuration in Capacitor iOS projects"
keywords: SPM package traits Capacitor, Swift package traits, SE-0450, packageTraits Capacitor, swiftToolsVersion Capacitor, Capacitor 8 SPM, CocoaPods subspecs alternative
tag: Capacitor, iOS, Configuration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Which Capacitor version supports SPM package traits?"
    answer: "Capacitor CLI 8.3.0 and later. The options are experimental.ios.spm.swiftToolsVersion and experimental.ios.spm.packageTraits in the Capacitor config. Traits require swiftToolsVersion 6.1 or higher, which needs Xcode 16.3 or later. Capacitor 8 already requires Xcode 26."
  - question: "Does enabling traits replace a plugin's default traits?"
    answer: "Yes. When you list traits for a package, SwiftPM uses exactly that list. To keep the plugin's defaults and add one, include .defaults in the array, for example [\".defaults\", \"SQLCipher\"]. An empty list is ignored by the Capacitor CLI."
  - question: "Will setting swiftToolsVersion to 6.1 switch my app to Swift 6 language mode?"
    answer: "The setting only changes the header of the generated CapApp-SPM Package.swift, which contains almost no code. Each plugin keeps its own tools version and language mode. Capacitor does not officially support Swift 6 yet, so test the app after changing it."
  - question: "Do traits work in CocoaPods projects?"
    answer: "No. Traits are a Swift Package Manager feature. Plugins that want the same choice in CocoaPods apps need to offer podspec subspecs, and CocoaPods users select the subspec in their Podfile."
  - question: "Can two traits of one plugin be mutually exclusive?"
    answer: "SwiftPM unifies traits across the whole dependency graph, so any combination can end up enabled. Traits should be additive. If two options really conflict, add a #error check so the build fails with a clear message."
---

To use SPM package traits in Capacitor 8, set `experimental.ios.spm.swiftToolsVersion` to `"6.1"` and list the traits per plugin under `experimental.ios.spm.packageTraits` in your Capacitor config, then run `bunx cap sync ios`. The CLI writes those traits into the generated `CapApp-SPM/Package.swift`, and SwiftPM builds the plugin with the matching optional dependencies and code paths. This needs Capacitor CLI 8.3.0 or later and only applies to iOS projects that use Swift Package Manager.

Traits close the last big feature gap between SPM and CocoaPods for plugins: optional native dependencies that used to be podspec subspecs. This guide covers the app side, the plugin author side, and the limits of the current experimental support.

## What package traits are

Package traits come from Swift Evolution proposal [SE-0450](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0450-swiftpm-package-traits.md), implemented in Swift 6.1 (Xcode 16.3 and later). A package declares named traits in its `Package.swift`. Consumers choose which ones to enable when they depend on the package. A trait can:

- make a dependency optional (`condition: .when(traits: [...])` on a target dependency),
- turn on code paths, since every enabled trait is available as a compilation condition (`#if TraitName`),
- toggle build settings such as defines or linker flags,
- enable other traits.

A package can also mark traits as default. They're on unless the consumer passes an explicit list.

If you know CocoaPods subspecs or Cargo features in Rust, it's the same idea.

## Why it matters in Capacitor

Capacitor generates the app's `Package.swift` for you, so you can't hand-edit dependency lines to pass traits. Before CLI 8.3, plugin authors with an optional native SDK had two bad choices on SPM: always link the SDK, increasing size and sometimes adding privacy or export compliance work, or publish a second plugin. Common cases:

- encrypted vs plain SQLite (SQLCipher),
- analytics SDKs with and without advertising identifier collection,
- an optional vendor SDK for one payment or login provider,
- debug-only tooling.

## Enable traits in your app

### 1. Check versions

```bash
bunx cap --version      # 8.3.0 or later
xcodebuild -version     # Xcode 26 (required by Capacitor 8 anyway)
```

The project must use SPM: `ios/App/CapApp-SPM` exists. If you're on CocoaPods, see [how to migrate your Capacitor app to SPM](/blog/how-to-migrate-your-capacitor-app-to-spm/).

### 2. Find the plugin's trait names

Open the plugin's `Package.swift` in `node_modules` and look for the `traits:` array, or check its README. Trait names are case-sensitive.

### 3. Configure Capacitor

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  experimental: {
    ios: {
      spm: {
        swiftToolsVersion: '6.1',
        packageTraits: {
          '@acme/capacitor-db': ['.defaults', 'SQLCipher'],
        },
      },
    },
  },
};

export default config;
```

The key is the plugin's npm package name. The value is the list of traits to enable.

### 4. Sync and check the output

```bash
bunx cap sync ios
```

The generated `ios/App/CapApp-SPM/Package.swift` now starts with `// swift-tools-version: 6.1` and the plugin's dependency line carries the traits:

```swift
.package(name: "AcmeCapacitorDb", path: "../../../node_modules/@acme/capacitor-db", traits: [.defaults, "SQLCipher"])
```

The CLI writes `.defaults` (or `defaults`, `.default`, `default` in any case) as the SwiftPM `.defaults` value, and every other name as a quoted string.

Build in Xcode. If Xcode still shows the old graph, use **File > Packages > Reset Package Caches**.

### Rules the CLI enforces

The Capacitor CLI validates the config during sync:

- If any plugin has a non-empty trait list and `swiftToolsVersion` is missing, sync stops with "Package traits require an explicit Swift tools version of 6.1 or higher."
- If `swiftToolsVersion` is lower than 6.1, sync stops and tells you the version is too low.
- `swiftToolsVersion` must look like `6.1` or `6.1.0`.
- Plugins with an empty array are treated as if they weren't listed.

### Keep or drop default traits

Listing traits replaces the defaults. Compare:

| Config value | Result |
| --- | --- |
| not listed | plugin's default traits |
| `['SQLCipher']` | only `SQLCipher`, defaults off |
| `['.defaults', 'SQLCipher']` | defaults plus `SQLCipher` |

Read the plugin docs before dropping defaults. A plugin might put its standard backend behind a default trait.

## Add traits to your own plugin

If you maintain a plugin with an optional SDK, here's a complete `Package.swift`. The package name must match the name the Capacitor CLI derives from your npm name (`@acme/capacitor-db` becomes `AcmeCapacitorDb`). See [migrate a Capacitor plugin to SPM](/blog/migrate-capacitor-plugin-to-swift-package-manager/) for the rule.

```swift
// swift-tools-version: 6.1
import PackageDescription

let package = Package(
    name: "AcmeCapacitorDb",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "AcmeCapacitorDb", targets: ["DbPlugin"])
    ],
    traits: [
        .trait(name: "SQLCipher", description: "Link SQLCipher and enable encrypted databases."),
        .default(enabledTraits: [])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0"),
        .package(url: "https://github.com/sqlcipher/SQLCipher.swift.git", from: "4.10.0")
    ],
    targets: [
        .target(
            name: "DbPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(
                    name: "SQLCipher",
                    package: "SQLCipher.swift",
                    condition: .when(traits: ["SQLCipher"])
                )
            ],
            path: "ios/Sources/DbPlugin"
        )
    ],
    swiftLanguageModes: [.v5]
)
```

Check the SDK's own repository for its current package URL, product name and version before you copy this.

Points that are easy to miss:

- **Tools version 6.x changes the default language mode to Swift 6** for your targets. Capacitor doesn't officially support Swift 6 yet, so keep `swiftLanguageModes: [.v5]` unless your code is ready for strict concurrency.
- **Raising your plugin's tools version to 6.1 means consumers need Xcode 16.3+.** Capacitor 8 apps already require Xcode 26, so that's not a new constraint.

### Use the trait in code

Enabled traits are compilation conditions in your package's targets:

```swift
#if SQLCipher
import SQLCipher
#endif

@objc func open(_ call: CAPPluginCall) {
    let key = call.getString("encryptionKey")
    #if SQLCipher
    // open with key
    #else
    if key != nil {
        call.unavailable("Encryption requires the SQLCipher trait. Enable it in experimental.ios.spm.packageTraits.")
        return
    }
    #endif
    // open without encryption
}
```

Return a clear error naming the trait when a feature is off. App developers otherwise see a silent failure and blame the plugin.

You can also define your own flag with `swiftSettings: [.define("ACME_SQLCIPHER", .when(traits: ["SQLCipher"]))]` if you prefer a prefixed name.

### Design traits to be additive

SwiftPM unifies traits across the dependency graph. If two packages depend on your plugin with different traits, the union is enabled. So:

- Enabling a trait should add capabilities, not remove API or change defaults.
- Avoid mutually exclusive traits. If you can't, fail the build loudly:

```swift
#if TraitA && TraitB
#error("TraitA and TraitB cannot be enabled together")
#endif
```

### Test every combination

`swift build` on its own builds for the Mac, and a plugin that depends on Capacitor only builds for iOS, so test the traits through a Capacitor test app built for an iOS Simulator. For each combination (no entry for the default traits, `['SQLCipher']`, `['.defaults', 'SQLCipher']` and so on), change `packageTraits` in the test app's config, then sync and build:

```bash
bunx cap sync ios
xcodebuild build \
  -project ios/App/App.xcodeproj \
  -scheme App \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO
```

Add each combination to CI as its own job.

### Keep CocoaPods users covered

Traits only exist in SPM. If your plugin also ships a podspec, offer the same choice as subspecs:

```ruby
s.default_subspec = 'Core'

s.subspec 'Core' do |core|
  core.source_files = 'ios/Sources/DbPlugin/**/*.swift'
  core.dependency 'Capacitor'
end

s.subspec 'SQLCipher' do |sc|
  sc.dependency 'AcmeCapacitorDb/Core'
  sc.dependency 'SQLCipher', '~> 4.10'
  sc.pod_target_xcconfig = { 'SWIFT_ACTIVE_COMPILATION_CONDITIONS' => '$(inherited) SQLCipher' }
end
```

Setting the same compilation condition name in the subspec lets you share one `#if SQLCipher` code path. CocoaPods apps then select the subspec in their Podfile. The Capacitor CLI writes one `pod` line per plugin inside `capacitor_pods`, so document the extra Podfile line in your README. [How to use CocoaPods with Capacitor 8](/blog/use-cocoapods-with-capacitor-8/) shows where custom pod lines go.

## Limitations

- **Experimental.** The options live under `experimental` and may move to `ios.spm.*` in a future major. Expect a config rename at some point.
- **Swift 6 not officially supported.** The CLI's own docs warn that setting `swiftToolsVersion` to 6.0 or higher may cause issues. Test the full app, especially plugins that ship binary xcframeworks.
- **iOS only.** Android has no equivalent in Capacitor. Plugins handle optional Android SDKs with Gradle variables in `variables.gradle` or separate artifacts.
- **Plugins must opt in.** Most plugins don't define traits yet. Check before you plan on one.

## Troubleshooting

**Sync fails with "Package traits require an explicit Swift tools version of 6.1 or higher".** Add `swiftToolsVersion: '6.1'` next to `packageTraits`.

**SwiftPM reports an unknown trait.** Trait names are case-sensitive and must exist in the plugin's `Package.swift` for the installed version.

**Feature still missing after enabling the trait.** Reset package caches in Xcode, clean the build folder, and confirm the generated `CapApp-SPM/Package.swift` has the `traits:` suffix. Editing that file by hand doesn't stick, since the CLI rewrites it on every sync.

**Errors in Swift code after raising the tools version.** That's Swift 6 language mode in a package you control. Add `swiftLanguageModes: [.v5]`.

**Name conflicts between plugins.** Since CLI 8.4, `experimental.ios.spm.packageOptions` lets you set `symlink` or `moduleAliases` per plugin. More on that in the [Capacitor iOS troubleshooting guide](/blog/troubleshooting-capacitor-ios-build-errors/).

For the bigger SPM picture, read [SPM vs CocoaPods for Capacitor](/blog/ios-spm-vs-cocoapods-capacitor-migration-guide/). If you want cloud builds that already run current Xcode for SPM projects, see [Capgo Build](/native-build/).
