---
slug: ci-cd-for-cordova-apps
title: "CI/CD for Cordova Apps in 2026: A Complete Setup Guide"
description: "Set up CI/CD for Cordova apps in 2026: signed Android AAB and iOS IPA builds, store uploads, live update options, and when to move to Capacitor."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /cordova.webp
head_image_alt: "Apache Cordova app moving through a CI/CD pipeline to the App Store and Google Play"
keywords: Cordova CI/CD, Cordova build pipeline, Cordova GitHub Actions, Cordova iOS build, Cordova Android AAB, Cordova live updates, App Center Cordova replacement, Cordova to Capacitor
tag: CI/CD, Migration, Guides
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Is Apache Cordova still usable in 2026?"
    answer: "Yes. Cordova still ships platform releases and many production apps run on it. What changed is the tooling around it: App Center retired on March 31, 2025, and Ionic Appflow only serves existing customers until December 31, 2027, so most Cordova teams need to own their build pipeline."
  - question: "Which CI service can build a Cordova app?"
    answer: "Any CI with a Linux runner can build the Android app, and any CI with macOS runners can build iOS: GitHub Actions, GitLab CI, Bitrise, Codemagic, Appcircle, CircleCI, and Azure DevOps all work. Bitrise and Codemagic document Cordova specifically; the others run the Cordova CLI as a script."
  - question: "How do I sign a Cordova Android release in CI?"
    answer: "Decode the keystore from a CI secret, then run cordova build android --release with a build.json that sets keystore, alias, passwords, and packageType bundle. Google Play requires an AAB for new apps and uses Play App Signing, so your keystore acts as the upload key."
  - question: "Does Capgo support Cordova live updates?"
    answer: "Yes. The @capgo/cordova-updater plugin brings Capgo live updates to Cordova iOS 7+ and Cordova Android 13+ apps, with the same JavaScript API as the Capacitor updater. You upload bundles from CI with the Capgo CLI bundle upload command."
  - question: "What replaced App Center CodePush for Cordova?"
    answer: "Microsoft did not ship a hosted replacement. Options are a managed service with a Cordova client such as Capgo with @capgo/cordova-updater, Ionic Appflow until its end date for existing customers, or a self-hosted update server."
---

CI/CD for a Cordova app in 2026 means building and signing the Android AAB on a Linux runner, building and signing the iOS IPA on a macOS runner, and uploading both to the stores from the same pipeline. The managed services Cordova teams used for this are gone or closing, so most teams now run the Cordova CLI on a general-purpose CI. This guide gives you a working GitHub Actions setup, the same steps for other CIs, and an honest look at live updates and long-term options.

## What changed for Cordova teams

Three events shaped Cordova CI/CD:

- **PhoneGap Build** shut down on October 1, 2020.
- **Microsoft App Center** retired on March 31, 2025. Build, distribution, and the hosted CodePush service ended with it.
- **Ionic Appflow** stopped new sales in February 2025. Existing customers keep access until December 31, 2027.

Cordova itself still works. The Apache project ships `cordova-android` and `cordova-ios` releases, and plenty of internal and enterprise apps run on it. The gap is the managed layer: signing storage, store uploads, and over-the-air updates. You now assemble those from a CI service plus a few tools.

## Anatomy of a Cordova pipeline

| Stage | Android | iOS |
| --- | --- | --- |
| Runner | Linux | macOS with Xcode 26 |
| Restore | `cordova prepare` (platforms and plugins from `package.json`) | same |
| Web build | your bundler (Vite, webpack, Angular CLI) into `www/` | same |
| Native build | Gradle via `cordova build android --release` | `xcodebuild` via `cordova build ios --release --device` |
| Signing | upload keystore (`.jks`) | distribution certificate (`.p12`) and provisioning profile |
| Artifact | `.aab` for Google Play | `.ipa` for TestFlight and the App Store |
| Upload | Google Play Developer API (service account) | App Store Connect API key |

Two platform rules apply to every pipeline:

- Since April 28, 2026, App Store Connect only accepts builds made with Xcode 26 and the iOS 26 SDK or later. Check that your `cordova-ios` version supports it.
- Google Play requires AAB uploads for new apps, and raises its minimum target API level every year. Keep `cordova-android` current so its default `targetSdkVersion` follows.

## Step 1: Make the project reproducible

CI can only rebuild what is in the repository. Before writing any workflow:

1. Commit `package.json` and the lockfile. Cordova stores platforms and plugins in the `cordova` section of `package.json`, so `cordova prepare` restores them.
2. Do not commit `platforms/` or `plugins/`. They are generated.
3. Install the Cordova CLI as a dev dependency so every machine uses the same version:

```bash
bun add -d cordova
```

4. Move signing values out of `config.xml` and into a `build.json` that reads secrets at build time (next step).
5. Pin the Node.js version in `.nvmrc` or `package.json` `engines`.

## Step 2: Signing with build.json

Cordova reads signing settings from a `build.json` file. Commit a `build.template.json` with placeholders, generate the real `build.json` in CI from secrets, and never commit the generated file:

```json
{
  "android": {
    "release": {
      "keystore": "release.jks",
      "storePassword": "${KEYSTORE_STORE_PASSWORD}",
      "alias": "upload",
      "password": "${KEYSTORE_KEY_PASSWORD}",
      "packageType": "bundle"
    }
  },
  "ios": {
    "release": {
      "codeSignIdentity": "Apple Distribution",
      "developmentTeam": "ABCDE12345",
      "packageType": "app-store",
      "provisioningProfile": "com.example.app AppStore",
      "automaticProvisioning": false
    }
  }
}
```

The `${...}` placeholders are not expanded by Cordova. The workflow below writes the real values with `envsubst`.

If you do not have an Android keystore yet, create one with `keytool` or the browser-based [Android keystore generator](/tools/android-keystore-generator/). For iOS, the [iOS certificate generator](/tools/ios-certificate-generator/) creates a certificate signing request and `.p12` without a Mac.

## Step 3: A GitHub Actions workflow

This workflow builds both platforms in parallel on a version tag and uploads them to the internal testing tracks.

```yaml
# .github/workflows/cordova-release.yml
name: Cordova release

on:
  push:
    tags: ['v*']

jobs:
  android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
      - run: bun install --frozen-lockfile
      - run: bun run build            # outputs to www/
      - run: bunx cordova prepare android
      - name: Signing files
        env:
          KEYSTORE_BASE64: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
        run: |
          echo "$KEYSTORE_BASE64" | base64 --decode > release.jks
          envsubst < build.template.json > build.json
      - run: bunx cordova build android --release --buildConfig=build.json
      - uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.PLAY_SERVICE_ACCOUNT_JSON }}
          packageName: com.example.app
          releaseFiles: platforms/android/app/build/outputs/bundle/release/app-release.aab
          track: internal
          status: completed

  ios:
    runs-on: macos-26
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - run: bunx cordova prepare ios
      - name: Install certificate and profile
        env:
          P12_BASE64: ${{ secrets.IOS_P12_BASE64 }}
          P12_PASSWORD: ${{ secrets.IOS_P12_PASSWORD }}
          PROFILE_BASE64: ${{ secrets.IOS_PROFILE_BASE64 }}
          KEYCHAIN_PASSWORD: ${{ secrets.KEYCHAIN_PASSWORD }}
        run: |
          echo "$P12_BASE64" | base64 --decode > dist.p12
          security create-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
          security set-keychain-settings -lut 21600 build.keychain
          security unlock-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
          security import dist.p12 -k build.keychain -P "$P12_PASSWORD" -T /usr/bin/codesign
          security set-key-partition-list -S apple-tool:,apple: -s -k "$KEYCHAIN_PASSWORD" build.keychain
          security list-keychains -d user -s build.keychain login.keychain
          for dir in "$HOME/Library/MobileDevice/Provisioning Profiles" \
                     "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles"; do
            mkdir -p "$dir"
            echo "$PROFILE_BASE64" | base64 --decode > "$dir/app.mobileprovision"
          done
          cp build.template.json build.json   # iOS values hold no secrets
      - run: bunx cordova build ios --release --device --buildConfig=build.json
      - name: Upload to TestFlight
        env:
          API_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          API_ISSUER: ${{ secrets.APPLE_ISSUER_ID }}
          API_KEY_BASE64: ${{ secrets.APPLE_KEY_CONTENT }}
        run: |
          mkdir -p ~/.appstoreconnect/private_keys
          echo "$API_KEY_BASE64" | base64 --decode > ~/.appstoreconnect/private_keys/AuthKey_${API_KEY_ID}.p8
          IPA=$(find platforms/ios/build -name '*.ipa' | head -n 1)
          xcrun altool --upload-app -f "$IPA" -t ios --apiKey "$API_KEY_ID" --apiIssuer "$API_ISSUER"
      - name: Clean up keychain
        if: always()
        run: security delete-keychain build.keychain || true
```

Why some lines are there:

- **Two provisioning profile folders.** Xcode 16 and later read profiles from `~/Library/Developer/Xcode/UserData/Provisioning Profiles`. Older Xcode used `~/Library/MobileDevice/Provisioning Profiles`. Writing both avoids "No profiles for 'com.example.app' were found".
- **`set-key-partition-list`** stops macOS from prompting for keychain access, which would hang a CI job.
- **JDK version.** Use the JDK your `cordova-android` release documents. Recent releases build with JDK 17.
- **Build numbers.** Bump `android-versionCode` and `ios-CFBundleVersion` in `config.xml` before the build, for example from the CI run number, or the stores reject the upload as a duplicate.

You can swap the `altool` upload for fastlane's `upload_to_testflight` and the Play action for fastlane `supply` if your team already uses fastlane.

## Step 4: The same pipeline on other CI services

The commands do not change between CIs. Only the runner selection and secret syntax do.

| CI | Android runner | iOS runner | Notes |
| --- | --- | --- | --- |
| GitHub Actions | `ubuntu-latest` | `macos-26` / `macos-latest` | macOS minutes cost more than Linux on private repos |
| GitLab CI | any Linux runner | hosted macOS runners (beta, Premium and Ultimate) or self-hosted | images such as `macos-26-xcode-26` |
| Bitbucket Pipelines | Linux Docker image | self-hosted Mac only | see [Bitbucket iOS guide](/blog/build-and-deploy-ios-apps-with-bitbucket-pipelines/) |
| Gitea / Forgejo | Linux runner | self-hosted Mac in host mode | see [Gitea iOS guide](/blog/build-and-deploy-ios-apps-with-gitea-actions/) |
| Bitrise | Linux stacks | macOS stacks | ships Cordova steps (prepare, archive) |
| Codemagic | Linux | Mac mini instances | documents Ionic Cordova builds in `codemagic.yaml` |
| Azure DevOps | `ubuntu-latest` | `macOS-latest` | tasks to install certificates and profiles |

For a feature-by-feature view, read [Comparing CI/CD platforms for Cordova apps](/blog/comparing-ci-cd-platforms-for-cordova-apps/).

## Step 5: Live updates for Cordova

Live updates let you ship HTML, CSS, and JavaScript fixes without a store review. App Center CodePush ended in March 2025, Appflow Live Updates end on December 31, 2027, and the old community hot code push plugins are unmaintained. A maintained option is [Capgo live updates](/live-update/) with the [`@capgo/cordova-updater`](/plugins/cordova-updater/) plugin, which uses the same backend, channels, and CLI as the Capacitor updater.

### Requirements

- Cordova CLI 12+
- `cordova-android` 13+ and/or `cordova-ios` 7+ (the plugin relies on their default `https://localhost/` and `app://localhost/` schemes)
- Do not use `cordova-plugin-ionic-webview` with it. Ionic WebView bypasses Cordova's scheme handlers, so downloaded bundles would not load.

### Install the plugin

Create the app in Capgo the same way as for Capacitor, then install the plugin with your Capgo app ID:

```bash
cordova plugin add @capgo/cordova-updater \
  --variable APP_ID=com.example.app \
  --variable DEFAULT_CHANNEL=production
cordova prepare android ios
```

`DEFAULT_CHANNEL`, `UPDATE_URL`, and `AUTO_UPDATE` are optional install variables. Run `cordova prepare` again whenever you change them.

### Confirm each launch

After `deviceready`, the plugin is available as `cordova.plugins.Updater`. Call `notifyAppReady()` on every launch, or the plugin treats the new bundle as broken and rolls back:

```javascript
document.addEventListener('deviceready', async () => {
  const { Updater } = cordova.plugins

  await Updater.notifyAppReady()

  const latest = await Updater.getLatest()
  if (latest.url && !latest.error) {
    const bundle = await Updater.download({
      url: latest.url,
      version: latest.version,
      checksum: latest.checksum,
    })
    await Updater.next({ id: bundle.id })
  }
})
```

### Upload bundles from CI

Add a job that builds the web layer and uploads it, for web-only changes:

```yaml
  live-update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - run: bunx @capgo/cli@latest bundle upload --channel=production
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
```

Live updates only replace the web bundle. Adding, removing, or upgrading a Cordova plugin still needs a new store build. Capgo compares the native plugins recorded for the live bundle with your project and flags incompatible uploads; see [live update compatibility](/docs/live-updates/compatibility/). Full setup is in the [Cordova updater docs](/docs/plugins/cordova-updater/).

On the build side, the [Capgo Build](/native-build/) documentation covers Capacitor projects only (it uploads the native project produced by `cap sync`). Cordova binaries keep building on your CI as shown above.

## Optional: migrating to Capacitor later

You do not need to leave Cordova to get a working pipeline and live updates. Migration is a separate decision, worth it when:

- You want iOS builds without maintaining macOS runners. Capgo Build compiles Capacitor apps from a Linux CI job.
- Plugins you depend on stopped receiving Cordova updates, but have Capacitor equivalents.
- You want Swift Package Manager support and current Android Gradle Plugin versions without patching platforms.

The migration keeps your `www` code. You add Capacitor, move plugins over (most Cordova plugins work as is), and replace a few that have Capacitor-native equivalents. Your Capgo app ID and channels stay the same; only the updater plugin changes from `@capgo/cordova-updater` to `@capgo/capacitor-updater`. The steps are in [Migrating from Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/), and the [Cordova to Capacitor solution page](/solutions/cordova-to-capacitor/) covers getting help with it. After migration, the CI above shrinks to a web build, `cap sync`, and one `build request` call per platform, as described in [Comparing CI/CD platforms for Capacitor apps](/blog/comparing-ci-cd-platforms-for-capacitor-apps/).

## Troubleshooting Cordova builds in CI

| Error | Cause and fix |
| --- | --- |
| `Current working directory is not a Cordova-based project` | `config.xml` or `www/` missing. Run your web build before Cordova commands, or create an empty `www/`. |
| `No platforms added to this project` | Platforms are not listed in `package.json`. Run `cordova platform add` locally once and commit `package.json`. |
| `Could not find an installed version of Gradle` | Recent `cordova-android` uses the Gradle wrapper. Update the platform rather than installing Gradle globally. |
| `Unsupported class file major version` | JDK on the runner does not match the one `cordova-android` expects. Pin it with `setup-java`. |
| `No signing certificate "iOS Distribution" found` | Use `Apple Distribution` as the identity, and check that the `.p12` contains the private key. |
| `errSecInternalComponent` | Locked keychain or missing partition list. Re-run the keychain setup commands. |
| Upload rejected: SDK too old | Runner image uses Xcode older than 26. Select `macos-26` or set Xcode with `xcode-select`. |
| Play upload: `Version code has already been used` | Bump `android-versionCode` for every upload. |

## Summary

A Cordova pipeline in 2026 is a CI job per platform: a Linux runner for the Android AAB, a macOS runner with Xcode 26 for the IPA, secrets decoded into a generated `build.json`, and API keys for both stores. Any mainstream CI can run it. Add `@capgo/cordova-updater` and a `bundle upload` job for web-only fixes, and you have the build, store, and over-the-air pieces Appflow and App Center used to provide. Moving to Capacitor stays an option for later, not a requirement.
