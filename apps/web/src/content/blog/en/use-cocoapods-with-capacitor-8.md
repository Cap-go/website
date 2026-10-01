---
slug: use-cocoapods-with-capacitor-8
title: "How to Use CocoaPods with Capacitor 8 (and When Not To)"
description: "Use CocoaPods with Capacitor 8: create a CocoaPods iOS project, manage the Podfile, fix pod install errors, and plan for the CocoaPods trunk read-only date."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor-app-spm-migration-guide.jpg
head_image_alt: "Illustration of a Capacitor iOS project choosing between CocoaPods and Swift Package Manager"
keywords: CocoaPods Capacitor, Capacitor 8 CocoaPods, cap add ios packagemanager CocoaPods, Podfile Capacitor, pod install error, CocoaPods trunk read-only, SPM vs CocoaPods
tag: Capacitor, iOS, Configuration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Is CocoaPods still supported in Capacitor 8?"
    answer: "Yes. Capacitor 8 supports both CocoaPods and Swift Package Manager. Only the default for new iOS platforms changed to SPM. Existing CocoaPods apps keep working, and you can create a new one with bunx cap add ios --packagemanager CocoaPods."
  - question: "What happens to my app when CocoaPods trunk becomes read-only?"
    answer: "The CocoaPods team plans to make trunk read-only on December 2, 2026. Existing pod versions stay installable, so builds keep working. No new versions are published through trunk afterwards, so dependencies such as SDKs pulled from trunk stop receiving updates there. Capacitor plugins installed from npm use local paths and are not affected directly."
  - question: "Can one Capacitor app use SPM for some plugins and CocoaPods for others?"
    answer: "Not through the Capacitor CLI. The CLI manages plugins with one package manager per iOS project. In an SPM project, plugins without a Package.swift are skipped with a warning. If you depend on a CocoaPods-only plugin, the whole iOS project needs CocoaPods until that plugin adds SPM support."
  - question: "How do I switch an existing Capacitor app from SPM back to CocoaPods?"
    answer: "There is no automatic command. Back up the ios folder, delete it, run bunx cap add ios --packagemanager CocoaPods, then reapply your native changes such as Info.plist keys, entitlements, signing, app icons and extensions."
  - question: "Should I run pod install myself?"
    answer: "Usually not. bunx cap sync ios rewrites the Capacitor section of the Podfile and runs pod install for you, using bundle exec when a Gemfile is present. Run pod commands yourself only for repo updates or targeted pod update calls."
---

To use CocoaPods with Capacitor 8, create the iOS platform with `bunx cap add ios --packagemanager CocoaPods`, install CocoaPods (Homebrew or a Gemfile with Bundler), and let `bunx cap sync ios` manage the Podfile and run `pod install`. Capacitor 8 still fully supports CocoaPods. Only the default for new projects changed to Swift Package Manager.

CocoaPods is no longer the long-term direction, and its trunk goes read-only on December 2, 2026. So the real question is when it's still the right choice, how to keep it working, and how to leave it cleanly. This guide covers all three.

## When CocoaPods is still the right choice

Stay on, or pick, CocoaPods when one of these is true:

- **A plugin you need has no `Package.swift`.** In an SPM project the CLI warns "Some installed Capacitor plugins are not compatible with SPM" and leaves that plugin out, so it fails at runtime with "plugin is not implemented".
- **A vendor SDK is distributed only as a pod.** Some analytics, payment and identity SDKs still ship CocoaPods-only, or ship an xcframework you'd have to wrap yourself.
- **A Cordova plugin relies on pods.** Capacitor generates a Swift package for Cordova plugins in SPM projects, but complex ones with `<podspec>` dependencies tend to work better with CocoaPods.
- **You rely on podspec subspecs** to pick SDK variants. SPM has package traits now, and Capacitor supports them experimentally since CLI 8.3 (see [SPM package traits in Capacitor](/blog/spm-package-traits-in-capacitor/)), but the plugin has to define traits first.
- **A large, customized Xcode project** where a migration is not worth the risk this release cycle.

Package identity collisions used to be another reason. Since CLI 8.4 you can work around them in SPM with `experimental.ios.spm.packageOptions` (`symlink` or `moduleAliases`) in your Capacitor config.

If none of these apply, use SPM. It needs no Ruby toolchain, no Podfile and no `.xcworkspace`.

## CocoaPods vs SPM in Capacitor 8

| | CocoaPods | Swift Package Manager |
| --- | --- | --- |
| Default for new `cap add ios` | No | Yes |
| Extra tooling | Ruby + CocoaPods gem | None, built into Xcode |
| Project to open | `ios/App/App.xcworkspace` | `ios/App/App.xcodeproj` |
| Plugin requirement | `.podspec` | `Package.swift` |
| Generated file | `def capacitor_pods` block in `Podfile` | `ios/App/CapApp-SPM/Package.swift` |
| Optional features | Subspecs | Package traits (experimental in Capacitor) |
| Future | Trunk read-only from Dec 2, 2026 | Apple-supported |

## Install CocoaPods

Pick one approach and use it everywhere, including CI.

**Homebrew** (simplest for one developer):

```bash
brew install cocoapods
pod --version
```

**Bundler** (pins the version for the whole team, recommended for CI). Create a `Gemfile` in the project root or in `ios/App`:

```ruby
source 'https://rubygems.org'
gem 'cocoapods', '~> 1.16'
```

```bash
bundle install
```

When the Capacitor CLI finds a `Gemfile` that mentions CocoaPods, it runs `bundle exec pod install` instead of `pod install`. If `pod` lives somewhere unusual, set `CAPACITOR_COCOAPODS_PATH` to the binary.

## Create a Capacitor 8 app with CocoaPods

```bash
bun add @capacitor/ios
bun run build
bunx cap add ios --packagemanager CocoaPods
bunx cap open ios
```

`cap open ios` opens `App.xcworkspace`. Always build from the workspace. Opening `App.xcodeproj` directly gives you `No such module 'Capacitor'`.

## The Podfile, explained

This is the Podfile Capacitor 8 generates:

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '15.0'
use_frameworks!

install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'App' do
  capacitor_pods
  # Add your Pods here
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

What you can and can't touch:

- **`def capacitor_pods ... end` belongs to the CLI.** On every sync it replaces the whole block with one `pod` line per plugin, pointing to the plugin's folder in `node_modules`. Anything you add inside is lost.
- **Add your own pods under `target 'App'`**, after `capacitor_pods`.
- **`assertDeploymentTarget`** raises any pod with a deployment target below 15.0 up to 15.0, which avoids Xcode warnings about unsupported targets. Keep it, and add your own `post_install` logic inside the same block.
- **`platform :ios`** must be at least 15.0 for Capacitor 8.

Example with an extra pod and a build setting fix:

```ruby
target 'App' do
  capacitor_pods
  pod 'GoogleMLKit/BarcodeScanning', '~> 7.0'
end

post_install do |installer|
  assertDeploymentTarget(installer)
  installer.pods_project.targets.each do |target|
    if target.respond_to?(:product_type) && target.product_type == 'com.apple.product-type.bundle'
      target.build_configurations.each do |config|
        config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
      end
    end
  end
end
```

The loop disables code signing for resource bundle targets. It fixes `Signing for "X" requires a development team` on pods that ship resource bundles. Only add it if you hit that error.

## Day-to-day commands

```bash
# After installing or removing a plugin
bunx cap sync ios

# Use the exact versions in Podfile.lock (good for CI)
bunx cap sync ios --deployment

# Refresh the spec repo when a new pod version isn't found
cd ios/App && pod repo update && pod install

# Update one pod past its locked version
cd ios/App && pod update FirebaseMessaging
```

`cap sync ios` also runs `xcodebuild clean` on the project after `pod install`, so you don't need a manual clean after adding plugins.

Commit `Podfile` and `Podfile.lock`. Don't commit `ios/App/Pods/`. It's regenerated by `pod install`.

## Switching an existing app from SPM to CocoaPods

There's no reverse migration command. Do it by hand:

1. Commit, then copy `ios/` somewhere safe.
2. Delete `ios/`.
3. Run `bunx cap add ios --packagemanager CocoaPods`.
4. Reapply native changes: `Info.plist` keys, entitlements and capabilities, signing team, bundle identifier, app icons and splash assets, URL schemes, extensions (widgets, notification service), and any custom Swift in `AppDelegate`.
5. `bunx cap sync ios` and build.

Diffing the old and new `ios/App/App` folders is the fastest way to catch what you missed.

## Fixing common CocoaPods errors

**`CocoaPods could not find compatible versions for pod "X"`.** Either your local spec repo is stale or two pods require incompatible versions. Run `pod install --repo-update` in `ios/App`. If it still fails, read the dependency chain in the error, find the plugin with the strict pin, upgrade it or [patch its podspec](/blog/how-to-patch-a-capacitor-plugin/).

**`The sandbox is not in sync with the Podfile.lock. Run 'pod install'`.** The `Pods` folder doesn't match the lock file, usually after switching branches. Run `bunx cap sync ios`.

**`[!] Unable to find a specification for 'X'`.** The spec repo cache is stale or the pod name is wrong. Run `pod repo update`.

**`Unable to find compatibility version string for object version '70'`** (or `77`). Your Xcode project uses a newer format than your CocoaPods/xcodeproj gem understands. Update CocoaPods to the latest release. If you can't, back up `project.pbxproj` and set `objectVersion` to a value your CocoaPods supports.

**`Sandbox: rsync(...) deny(1) file-write-create`.** Xcode's user script sandboxing blocks the CocoaPods embed script. In **Build Settings**, set **User Script Sandboxing** (`ENABLE_USER_SCRIPT_SANDBOXING`) to **No** for the App target.

**`No such module 'Capacitor'`.** You opened `App.xcodeproj`. Open `App.xcworkspace`, or run `bunx cap open ios`.

**`pod: command not found` in CI.** Install CocoaPods in the job, or use Bundler with a cached `vendor/bundle`. Without it, the CLI logs "Skipping pod install because CocoaPods is not installed" and the build fails later.

More iOS build errors are covered in the [Capacitor iOS troubleshooting guide](/blog/troubleshooting-capacitor-ios-build-errors/).

## The CocoaPods trunk read-only date

The CocoaPods maintainers announced that trunk, the central spec repository, becomes read-only on December 2, 2026, after a test run in early November 2026. What that means for a Capacitor app:

- **Existing builds keep working.** Every published podspec stays available.
- **No new versions through trunk.** SDKs you pull from trunk (Firebase, Google ML Kit, vendor SDKs) stop getting updates there. Security fixes and new iOS SDK support will only ship through SPM or other channels.
- **Capacitor plugins themselves are not affected directly.** They're installed from npm and referenced by `:path` in the Podfile. Their transitive pod dependencies are.

Treat CocoaPods as a bridge. List which dependency keeps you on it, and revisit when that dependency adds SPM support.

## Moving off CocoaPods

When you're ready:

```bash
bunx cap spm-migration-assistant
```

It runs `pod deintegrate`, removes the `Podfile`, `Podfile.lock` and `App.xcworkspace`, creates `CapApp-SPM`, and writes a `debug.xcconfig`. You then add `CapApp-SPM` as a local package in Xcode and set `debug.xcconfig` as the Debug configuration file. The full walkthrough is in [how to migrate your Capacitor app to SPM](/blog/how-to-migrate-your-capacitor-app-to-spm/), and the trade-offs are covered in [SPM vs CocoaPods for Capacitor](/blog/ios-spm-vs-cocoapods-capacitor-migration-guide/).

Plugin authors who need to add SPM support should read [migrate a Capacitor plugin to SPM](/blog/migrate-capacitor-plugin-to-swift-package-manager/).

If managing Ruby, CocoaPods and Xcode versions on build machines is the painful part, [Capgo Build](/native-build/) builds CocoaPods and SPM projects in the cloud on current Xcode.
