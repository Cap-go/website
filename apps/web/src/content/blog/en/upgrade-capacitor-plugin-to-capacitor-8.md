---
slug: upgrade-capacitor-plugin-to-capacitor-8
title: "How to Upgrade a Capacitor Plugin to Capacitor 8"
description: "Upgrade a Capacitor plugin to Capacitor 8: peer dependencies, SDK 36, AGP 8.13, Kotlin 2.2 compilerOptions, Java 21, iOS 15, Package.swift and release steps."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Capgo plugins logo on a dark blue background for the Capacitor 8 plugin upgrade guide"
keywords: upgrade Capacitor plugin to Capacitor 8, Capacitor plugin migration, plugin-migration-v7-to-v8, Capacitor 8 plugin, Kotlin 2.2 compilerOptions, Package.swift, capacitor-swift-pm 8
tag: Capacitor, Migration, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Which peer dependency range should a Capacitor 8 plugin declare?"
    answer: "The official guide uses >=8.0.0 for @capacitor/core in peerDependencies and ^8.0.0 for the Capacitor devDependencies. Many maintainers prefer ^8.0.0 for the peer to avoid claiming support for Capacitor 9 before testing it. Pick one deliberately and document it."
  - question: "Does the Capacitor 8 plugin upgrade require Swift Package Manager support?"
    answer: "No. A CocoaPods-only plugin still works in CocoaPods apps after you bump its podspec to iOS 15. But new Capacitor 8 apps default to SPM, and SPM apps cannot load a plugin without a Package.swift, so adding SPM support is strongly recommended."
  - question: "Is Java 21 mandatory for Capacitor 8 plugins?"
    answer: "Building any Capacitor 8 app requires a JDK 21 because @capacitor/android compiles with Java 21. For your plugin's own sourceCompatibility, Java 21 is recommended and Java 17 is still accepted, as long as your jvmTarget matches."
  - question: "What version number should my plugin use after the upgrade?"
    answer: "Ship a new major version. The peer dependency change and minSdk 24 / iOS 15 floors are breaking for consumers. The official migration tool sets the plugin version to 8.0.0, which also makes the supported Capacitor major obvious."
---

To upgrade a Capacitor plugin to Capacitor 8, run `bunx @capacitor/plugin-migration-v7-to-v8@latest` from the plugin root, then review the diff: Capacitor dependencies move to 8.x, Android targets SDK 36 with minSdk 24, AGP 8.13 and Gradle 8.14.3, Kotlin goes to 2.2.20 with `compilerOptions`, and iOS moves to a 15.0 deployment target with `capacitor-swift-pm` 8. Finish by building the example app on both platforms and publishing a new major version.

This guide is for plugin maintainers. App teams should follow [How to Upgrade Your Capacitor App to Capacitor 8](/blog/upgrade-capacitor-app-to-capacitor-8/).

## What changes for plugin authors

| File | Change |
| --- | --- |
| `package.json` | `@capacitor/core` peer to `>=8.0.0`, dev deps `@capacitor/cli`, `core`, `android`, `ios` to `^8.0.0` |
| `android/build.gradle` | `compileSdk = 36`, `minSdkVersion = 24`, `targetSdkVersion = 36`, AndroidX bumps |
| `android/build.gradle` (buildscript) | AGP `8.13.0`, `google-services` `4.4.4`, Kotlin `2.2.20` |
| `android/gradle/wrapper/gradle-wrapper.properties` | Gradle `8.14.3` |
| All Gradle files | `=` assignment syntax, `kotlinOptions` replaced by `compilerOptions` |
| `*.podspec` | `s.ios.deployment_target = '15.0'` |
| `Package.swift` | `.iOS(.v15)` and `capacitor-swift-pm` `from: "8.0.0"` |

Platform tooling you need locally and in CI: Node.js 22+, Xcode 26+, Android Studio Otter (2025.2.1) or later, and a JDK 21.

## Option 1: run the official migration tool

From the plugin root, on a clean git tree:

```bash
bunx @capacitor/plugin-migration-v7-to-v8@latest
```

The tool:

- Updates the Capacitor dependencies and sets your package version to `8.0.0`.
- Updates dev tooling that the official template uses: `@capacitor/docgen`, Rollup, TypeScript, `@types/node`, and Prettier (from v2 to v3 if you use `@ionic/prettier-config`, plus `prettier-plugin-java`).
- Deletes `node_modules/@capacitor` and `package-lock.json`, then runs `npm install`. If you use Bun, that step fails with a warning. Run `bun install` yourself afterwards and commit `bun.lock`.
- Regenerates the Gradle wrapper with `./gradlew wrapper --gradle-version 8.14.3`.
- Rewrites `build.gradle`: SDK levels, AndroidX versions, AGP, Kotlin version, Java 21 compatibility, and `kotlinOptions` to `compilerOptions`.
- Raises the podspec deployment target from 14.0 to 15.0, and in `Package.swift` sets `.iOS(.v15)` and `from: "8.0.0"` for `capacitor-swift-pm`.

When a string it expects is missing, it logs `Unable to find "..." in <file>. Try updating it manually`. Every one of those lines is a manual step for you. Plugins with custom Gradle logic, non-standard folders or renamed files produce the most of them.

If Prettier moved from v2 to v3, run your format and lint scripts after the migration. The formatting diff can be large, so commit it separately from the functional changes.

## Option 2: upgrade manually

Use this when the tool can't parse your files, or when you want to review each change. The steps follow the [official plugin upgrade guide](https://capacitorjs.com/docs/updating/plugins/8-0).

### 1. Dependencies

```json
{
  "devDependencies": {
    "@capacitor/android": "^8.0.0",
    "@capacitor/cli": "^8.0.0",
    "@capacitor/core": "^8.0.0",
    "@capacitor/ios": "^8.0.0"
  },
  "peerDependencies": {
    "@capacitor/core": ">=8.0.0"
  }
}
```

### 2. Android SDK levels and Gradle syntax

```groovy
android {
    namespace = "com.example.plugin"
    compileSdk = project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 36
    defaultConfig {
        minSdkVersion = project.hasProperty('minSdkVersion') ? rootProject.ext.minSdkVersion : 24
        targetSdkVersion = project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 36
    }
    lintOptions {
        abortOnError = false
    }
}
```

Keep the `project.hasProperty(...) ? rootProject.ext... : default` pattern. It lets the host app's `variables.gradle` control the values, which avoids the "compile against version 36" class of errors in apps.

The `=` syntax applies to properties only. Method calls like `mavenCentral()` stay unchanged, and `maven { url = "..." }` needs the `=`.

### 3. AndroidX defaults

Only bump libraries your plugin actually uses. The Capacitor 8 defaults are:

```groovy
ext {
    junitVersion = project.hasProperty('junitVersion') ? rootProject.ext.junitVersion : '4.13.2'
    androidxAppCompatVersion = project.hasProperty('androidxAppCompatVersion') ? rootProject.ext.androidxAppCompatVersion : '1.7.1'
    androidxJunitVersion = project.hasProperty('androidxJunitVersion') ? rootProject.ext.androidxJunitVersion : '1.3.0'
    androidxEspressoCoreVersion = project.hasProperty('androidxEspressoCoreVersion') ? rootProject.ext.androidxEspressoCoreVersion : '3.7.0'
    androidxCoreVersion = project.hasProperty('androidxCoreVersion') ? rootProject.ext.androidxCoreVersion : '1.17.0'
    androidxActivityVersion = project.hasProperty('androidxActivityVersion') ? rootProject.ext.androidxActivityVersion : '1.11.0'
    androidxWebkitVersion = project.hasProperty('androidxWebkitVersion') ? rootProject.ext.androidxWebkitVersion : '1.14.0'
}
```

Others from the official list: `androidxCoordinatorLayoutVersion` 1.3.0, `androidxFragmentVersion` 1.8.9, `firebaseMessagingVersion` 25.0.1, `androidxBrowserVersion` 1.9.0, `androidxMaterialVersion` 1.13.0, `androidxExifInterfaceVersion` 1.4.1, `coreSplashScreenVersion` 1.2.0.

### 4. AGP and the Gradle wrapper

```groovy
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:8.13.0'
    }
}
```

```bash
cd android
./gradlew wrapper --distribution-type all --gradle-version 8.14.3
```

If your plugin uses Firebase or other Google Services, set `com.google.gms:google-services` to `4.4.4`.

### 5. Java 21 and Kotlin 2.2

Java 21 is recommended for AGP 8.13 and SDK 36. Java 17 still works for the plugin itself.

```groovy
compileOptions {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}
```

For Kotlin plugins, update the default version and move `jvmTarget` out of `kotlinOptions`. Kotlin 2.2 makes the old block an error:

```groovy
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

buildscript {
    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '2.2.20'
}

android {
    // remove: kotlinOptions { jvmTarget = '17' }
}

kotlin {
    compilerOptions {
        jvmTarget = JvmTarget.JVM_21
    }
}
```

Keep `jvmTarget` and `targetCompatibility` on the same Java version, or Gradle stops with an "Inconsistent JVM-target compatibility" error. If you still apply `kotlin-android-extensions`, remove it. Use `kotlin-parcelize` for `@Parcelize` and view binding for synthetic view access.

### 6. iOS deployment target

Podspec:

```ruby
s.ios.deployment_target = '15.0'
```

`Package.swift`:

```swift
platforms: [.iOS(.v15)],
dependencies: [
    .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
],
```

Use `from:`, not `branch:` or `exact:`. The app's generated `CapApp-SPM` package pins `capacitor-swift-pm` to the exact version of `@capacitor/ios` the app installed, and a range lets SPM resolve your plugin against it.

Plugins with the old Xcode project layout also need the deployment target raised in the project's **Build Settings** and in `ios/Podfile` (`platform :ios, '15.0'`).

If your plugin has no `Package.swift` yet, do that next. Apps created with Capacitor 8 default to SPM and will skip your plugin with a "not compatible with SPM" warning. Follow [How to Migrate a Capacitor Plugin to Swift Package Manager](/blog/migrate-capacitor-plugin-to-swift-package-manager/).

## Option 3: let an agent do it

The open [Capgo Skills](/skills/) include `capacitor-plugin-upgrade-v7-to-v8`, `capacitor-plugin-upgrades` for multi-version jumps, and `capacitor-plugin-spm-support`. Install with `bunx skills add Cap-go/capgo-skills` and ask your agent to upgrade the plugin. The skill runs the official tool, then handles the steps the tool logs as skipped. Review the diff the same way you would review a teammate's PR.

## Which approach to use

| Approach | Good fit | Watch out for |
| --- | --- | --- |
| Migration tool | Plugins generated from the official template | Skipped steps on customized files, `npm install` step with Bun |
| Manual | Heavily customized Gradle or Xcode setup | Easy to miss one AndroidX or Kotlin change |
| Agent + skill | Many plugins to upgrade, or mixed layouts | You still own the review |

Start with the tool in almost every case. Its log tells you exactly what's left.

## Verify before you publish

1. `bun install && bun run build` (or your `verify` script).
2. Android: `cd android && ./gradlew clean build test`. Build with JDK 21.
3. iOS with CocoaPods: `cd ios && pod install && xcodebuild -workspace Plugin.xcworkspace -scheme Plugin -destination generic/platform=iOS` (new layout plugins use `xcodebuild -scheme <YourPackageName> -destination generic/platform=iOS`).
4. iOS with SPM: `swift package resolve`, then build the scheme.
5. Install the plugin in a fresh Capacitor 8 app (`bunx cap add ios` gives you SPM by default) and in a CocoaPods app. Call every public method on a real device.
6. Run `bunx cap doctor` in the test app.

## Release

- Bump to a new major (the tool uses `8.0.0`). Raising minSdk and the iOS floor is a breaking change for consumers.
- Write a short `BREAKING.md` or changelog entry: new peer range, minSdk 24, iOS 15, Java 21 for builds, any API behavior changes.
- Keep a `7.x` branch if you still ship fixes for Capacitor 7 users, and publish those under a dist-tag such as `latest-7`.
- Update the README install section and the compatibility table.

Capgo maintains a large set of plugins on this cycle, with each `@capgo/*` major tracking a Capacitor major. You can browse them in the [plugin directory](/plugins/).

## Troubleshooting

**`invalid source release: 21`.** Gradle is running on JDK 17 or older. Use the JDK 21 bundled with Android Studio Otter and set `JAVA_HOME` in CI.

**`Unsupported class file major version 65`.** The opposite problem: you run JDK 21 with an old Gradle wrapper that can't read Java 21 class files. Regenerate the wrapper at 8.14.3.

**`Namespace not specified`.** AGP 8+ requires `namespace = "..."` in the plugin's `android` block. Older plugins only had a `package` attribute in `AndroidManifest.xml`. Move it to Gradle and remove `package` from the manifest.

**`'compileDebugJavaWithJavac' task (current target is 21) and 'compileDebugKotlin' task (current target is 17)`.** Your Kotlin `jvmTarget` doesn't match `targetCompatibility`. Set both to 21 or both to 17.

**Errors mentioning `proguard-android.txt` with AGP 9.** Some apps already run AGP 9. Switch to `proguard-android-optimize.txt` so your plugin builds in those apps too. Details are in [fix Capacitor plugin build errors with AGP 9](/blog/fix-capacitor-plugin-build-errors-with-agp-9/).

**SPM: `product 'Capacitor' required by package ... not found`.** Your `Package.swift` dependency line has a typo or uses a version that doesn't exist. Use `from: "8.0.0"` against `https://github.com/ionic-team/capacitor-swift-pm.git`.

**16 KB page size warnings in Play Console.** If your plugin ships native `.so` libraries, rebuild them with 16 KB alignment. See [Android 16 KB page size and Capacitor plugins](/blog/android-16kb-page-size-capacitor-plugins/).

Once the plugin is on 8, the next step is getting ready for 9. [Preparing for Capacitor 9](/blog/preparing-for-capacitor-9/) lists the changes plugin teams can make now without breaking Capacitor 8 users.
