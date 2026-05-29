---
slug: ios-spm-vs-cocoapods-capacitor-migration-guide
title: "How to Migrate a Capacitor App to Swift Package Manager"
description: >-
  Learn how to migrate an existing Capacitor iOS app from CocoaPods to Swift Package Manager, what changes in the iOS project, and how to verify the migration.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-01-15T00:00:00.000Z
updated_at: 2026-05-29T11:34:25.000Z
head_image: /capacitor-spm-migration-guide.jpg
head_image_alt: Capacitor app migration from CocoaPods to Swift Package Manager
keywords: Swift Package Manager, SPM, CocoaPods, Capacitor, iOS, migration, dependency management, Xcode, CapApp-SPM
tag: Tutorial
published: true
locale: en
next_blog: ''
---

Capacitor 8 creates new iOS projects with Swift Package Manager (SPM) by default. Existing apps that still use CocoaPods can migrate too, but the safest path depends on how much native iOS customization your app has.

This guide walks through what changes, what to back up, and the two practical migration paths: using the Capacitor migration assistant or re-scaffolding the iOS project with SPM.

## Why migrate now

CocoaPods is moving toward a read-only trunk. The current plan is for CocoaPods trunk to stop accepting new podspecs on **December 2, 2026**. Existing builds should keep working, but new releases and dependency updates that rely on trunk will not be published there after the switch.

SPM is also the direction Capacitor is moving. Capacitor has supported choosing CocoaPods or SPM since Capacitor 6, and Capacitor 8 now creates iOS SPM projects as the default template.

## What changes in a Capacitor SPM project

Migrating from CocoaPods to SPM replaces the iOS dependency layer. The web app, Android project, and most Capacitor workflow commands stay the same.

### CapApp-SPM replaces the Podfile

In a CocoaPods app, iOS dependencies are wired through `ios/App/Podfile`, `Podfile.lock`, `Pods/`, and the generated `.xcworkspace`.

In an SPM app, Capacitor creates a local package named `CapApp-SPM`. This package becomes the central place where Capacitor references your native iOS plugin dependencies. The Capacitor CLI updates `CapApp-SPM` when you sync plugins, so treat it as generated output and avoid editing it by hand.

### debug.xcconfig replaces Pods configuration

The migration assistant also creates a generated `debug.xcconfig`. This file carries build settings that CocoaPods used to provide through its generated xcconfig files.

After migration, you may need to add `debug.xcconfig` to the Xcode project configuration if the assistant tells you to do so.

### Every plugin must support SPM

You cannot mix CocoaPods and SPM in the same Capacitor iOS project. Before migrating, check every Capacitor and Cordova plugin in `package.json`.

If a plugin does not support SPM yet, update it, replace it, or migrate the plugin first. Simple Swift plugins can often be converted with Ionic's `capacitor-plugin-converter`, but plugins with more complex Objective-C and Swift layouts may need manual work.

## What to back up first

Start from a clean git branch and commit your current state before touching the iOS project. Then list the native files your app depends on.

Common files to preserve from `ios/App/` include:

- `App/Info.plist`
- `App/AppDelegate.swift`
- `App/SceneDelegate.swift`, if your app has one
- `App/Assets.xcassets/`
- `App/Base.lproj/`
- `App/App.entitlements`
- `App/GoogleService-Info.plist`, if you use Firebase
- Custom `.xcconfig` files
- Signing settings, bundle identifier, team ID, and provisioning profile settings

Also preserve any native Swift, Objective-C, framework, extension, or SDK files you added outside the standard Capacitor template.

## Option 1: Use the Capacitor migration assistant

Use this path when your iOS project has custom native edits that you do not want to lose.

Run the assistant from the root of your Capacitor project:

```bash
bunx cap spm-migration-assistant
```

The assistant removes the CocoaPods infrastructure, creates the local `CapApp-SPM` package, generates package references from your installed plugins, and creates the generated SPM configuration files.

When it finishes, open the project:

```bash
bunx cap open ios
```

Then follow the manual Xcode steps printed by the assistant. In most projects this means:

1. Add `CapApp-SPM` as a local package dependency.
2. Add the generated `debug.xcconfig` to the app configuration.
3. Resolve any warnings about plugins that could not be converted to SPM.
4. Build the app from Xcode once before updating CI.

After the Xcode project builds, sync again:

```bash
bunx cap sync ios
```

## Option 2: Re-scaffold the iOS project with SPM

Use this path when your `ios/` directory is close to the default Capacitor template and you can safely restore custom files afterward.

First, make sure the files listed in the backup section are committed or copied somewhere safe. Then remove and recreate the iOS project with SPM:

```bash
rm -rf ios
bunx cap add ios --packagemanager SPM
bunx cap sync ios
```

Restore the native files your app needs, then open the project:

```bash
bunx cap open ios
```

This path is often cleaner than an in-place migration because it gives you a fresh Capacitor 8 iOS template. The tradeoff is that you must carefully reapply signing, entitlements, Firebase files, native source changes, and any custom Xcode settings.

## New Capacitor apps

For a new app, Capacitor 8 uses SPM by default when adding iOS:

```bash
bunx cap add ios
```

If you need to be explicit, you can still pass the package manager option:

```bash
bunx cap add ios --packagemanager SPM
```

## Update CI after migration

Once the app builds locally, update CI/CD so it no longer assumes CocoaPods.

Remove steps that run:

```bash
pod install
```

Also remove caches for:

- `ios/App/Pods`
- `ios/App/Podfile.lock`
- CocoaPods specs repositories, if your workflow cached them only for this app

Keep your regular web build and Capacitor sync steps. A typical iOS job should install JavaScript dependencies, build the web assets, sync Capacitor, and then build with Xcode:

```bash
bun install --frozen-lockfile
bun run build
bunx cap sync ios
```

## Migration checklist

Before migration:

- [ ] Create a new git branch.
- [ ] Commit the current working app.
- [ ] Verify every installed plugin supports SPM.
- [ ] Record custom iOS files and signing settings.
- [ ] Confirm the app builds before the migration.

During migration:

- [ ] Run `bunx cap spm-migration-assistant` or re-scaffold `ios/`.
- [ ] Add `CapApp-SPM` in Xcode if required.
- [ ] Add `debug.xcconfig` in Xcode if required.
- [ ] Restore app-specific native files.
- [ ] Run `bunx cap sync ios`.

After migration:

- [ ] Build and run the app in Xcode.
- [ ] Remove leftover CocoaPods files.
- [ ] Remove `pod install` from CI.
- [ ] Verify release signing still works.
- [ ] Run the app on at least one simulator and one real device before shipping.

## Troubleshooting

If Xcode cannot resolve packages, reset package caches from Xcode and run `bunx cap sync ios` again.

If the migration fails because of a plugin, check whether the plugin has a newer release with SPM support. For plugins you maintain, migrate the plugin package first and then return to the app migration.

When the app builds locally but CI fails, check for old CocoaPods assumptions. Common causes are a forced `.xcworkspace` build path, a stale `pod install` command, or caching `Pods/` from previous builds.

## Conclusion

Migrating a Capacitor app to Swift Package Manager is mostly about replacing the iOS dependency wiring. `CapApp-SPM` takes over the dependency references, `debug.xcconfig` replaces generated CocoaPods build configuration, and CI no longer needs `pod install`.

For customized iOS projects, start with `bunx cap spm-migration-assistant`. For projects close to the default template, a clean SPM re-scaffold is often faster and easier to reason about.

## Resources

- [Capacitor Swift Package Manager documentation](https://capacitorjs.com/docs/ios/spm)
- [Capacitor 8 update guide](https://capacitorjs.com/docs/updating/8-0)
- [CocoaPods trunk read-only plan](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)
- [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)

## Keep going from How to Migrate a Capacitor App to Swift Package Manager

If you are using **How to Migrate a Capacitor App to Swift Package Manager** to plan migration and enterprise operations, connect it with [Capgo Enterprise](/enterprise/) for the product workflow in Capgo Enterprise, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, [Capgo Alternatives](/alternatives/) for the product workflow in Capgo Alternatives, [Capgo Consulting](/consulting/) for the product workflow in Capgo Consulting, and [Capgo Premium Support](/premium-support/) for the product workflow in Capgo Premium Support.
