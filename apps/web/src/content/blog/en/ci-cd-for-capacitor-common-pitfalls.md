---
slug: ci-cd-for-capacitor-common-pitfalls
title: "CI/CD for Capacitor: Common Pitfalls and Fixes"
description: "The CI/CD pitfalls that break Capacitor builds: iOS signing, macOS runners, Xcode 26, stale cap sync, version codes, store rejections, and fixes for each."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /code_signing_identities.webp
head_image_alt: "Code signing identities and failing CI steps in a Capacitor pipeline"
keywords: Capacitor CI/CD pitfalls, Capacitor CI build fails, iOS code signing CI, cap sync CI, Capacitor GitHub Actions errors, Xcode 26 CI, Android versionCode CI, Capacitor build troubleshooting
tag: CI/CD, Best Practices, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Why does my Capacitor iOS build work locally but fail in CI?"
    answer: "Usually signing. Xcode on your Mac manages certificates and profiles through your keychain and fixes them silently. CI has no keychain state, so an expired certificate, a profile that does not match the bundle ID, or a locked keychain fails the build. Import the certificate into a temporary keychain or use a build service that handles signing."
  - question: "Do I need a native build on every commit?"
    answer: "No. Run native builds on release tags or merges to main, and ship web-only changes as live updates. The Capgo CLI build needed command tells your pipeline whether native dependencies changed since the last release."
  - question: "What is the most common reason store uploads fail after a green build?"
    answer: "A reused build number or version code. App Store Connect and Google Play reject any upload whose build number was already used. Derive it from the CI run number, or let a build service read the latest value from the store and increment it."
  - question: "Which tool versions does a Capacitor 8 pipeline need?"
    answer: "Node.js 22 or newer, JDK 21 for Android, and Xcode 26 for iOS. Xcode 26 is also what App Store Connect requires for uploads since April 28, 2026."
  - question: "Can I build iOS in CI without macOS runners?"
    answer: "For Capacitor apps, yes. A Linux job builds the web layer and runs cap sync ios, then the Capgo CLI sends the native project to Capgo Build, which compiles and signs it on Macs and uploads to TestFlight."
---

Most Capacitor CI/CD failures come from the same short list: iOS code signing, missing or outdated macOS tooling, a web build that never made it into the native project, reused build numbers, and store requirements that only fail at upload time. Each has a known cause and a fix you can apply once. This guide groups the pitfalls by pipeline stage, with the error you will see, why it happens, and what to change.

If you are setting up a pipeline from scratch, read [Setting up CI/CD for Capacitor apps](/blog/setting-up-cicd-for-capacitor-apps/) first, then use this list to harden it.

## Stage 1: Building the web layer

### Pitfall: the native app ships an old web build

**Symptom:** CI succeeds, the app installs, but it shows yesterday's UI.

**Cause:** `cap sync` copies whatever is in `webDir` at that moment. If the pipeline runs `cap sync` before the web build, or the web build writes to a different folder than `webDir` in `capacitor.config.ts`, the native project gets stale files.

**Fix:** always run the steps in this order, and fail if the output folder is empty.

```bash
bun install --frozen-lockfile
bun run build
test -f dist/index.html || { echo "web build missing"; exit 1; }
bunx cap sync
```

Make sure `webDir` matches your bundler output (`dist` for Vite, `www` for Angular with Ionic, `build` for some React setups).

### Pitfall: dev server URL left in the config

**Symptom:** the release build shows a blank screen or tries to load `http://192.168.x.x:5173`.

**Cause:** `server.url` in `capacitor.config.ts` was set for live reload and committed.

**Fix:** never commit `server.url`. Read it from an environment variable that CI never sets:

```ts
import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  ...(process.env.LIVE_RELOAD_URL && {
    server: { url: process.env.LIVE_RELOAD_URL, cleartext: true },
  }),
}

export default config
```

### Pitfall: environment variables baked in at the wrong time

**Symptom:** the production app talks to the staging API.

**Cause:** Vite, webpack, and Angular inline environment variables at build time. The value present when `bun run build` ran is the one in the binary, and in any live update built from the same job.

**Fix:** set environment-specific variables before the web build, per job, and build separate bundles for staging and production. Do not try to swap them after `cap sync`.

### Pitfall: lockfile drift

**Symptom:** a plugin version in CI differs from the one on your machine, and native compilation fails with missing symbols.

**Fix:** commit the lockfile and install with `bun install --frozen-lockfile` (or `npm ci`). Pin `@capacitor/core`, `@capacitor/ios`, `@capacitor/android`, and `@capacitor/cli` to the same version. Mismatched versions are a frequent source of native errors; see [Fix Capacitor version mismatch errors](/blog/fix-capacitor-version-mismatch-errors/).

## Stage 2: The native toolchain

### Pitfall: wrong Node, JDK, or Xcode version

**Symptom:** `Unsupported class file major version`, `The engine "node" is incompatible`, or Xcode errors about SDK features.

**Cause:** hosted runner images change, and Capacitor 8 has firm minimums.

| Tool | Capacitor 8 requirement |
| --- | --- |
| Node.js | 22 or newer |
| JDK | 21 |
| Xcode | 26 or newer |
| iOS deployment target | 15.0 |
| Android `minSdkVersion` / `targetSdkVersion` | 24 / 36 |

**Fix:** pin every version explicitly in the pipeline instead of trusting `latest`:

```yaml
- uses: actions/setup-node@v6
  with:
    node-version-file: .nvmrc
- uses: actions/setup-java@v4
  with:
    distribution: temurin
    java-version: '21'
- uses: maxim-lobanov/setup-xcode@v1
  with:
    xcode-version: '26'
```

### Pitfall: building against an Xcode Apple no longer accepts

**Symptom:** the upload fails with a message that the app was built with an unsupported SDK.

**Cause:** since April 28, 2026, App Store Connect requires Xcode 26 and the iOS 26 SDK. Self-hosted Macs and older runner images still default to Xcode 16.

**Fix:** select a `macos-26` image or install Xcode 26 on your runners. Details in [Apple's Xcode 26 requirement for Capacitor apps](/blog/xcode-26-requirement-for-capacitor-apps/).

### Pitfall: CocoaPods and SPM confusion

**Symptom:** `xcodebuild: error: 'App.xcworkspace' does not exist`, or pods not found.

**Cause:** new Capacitor 8 projects use Swift Package Manager and build `ios/App/App.xcodeproj`. Older projects use CocoaPods and build `ios/App/App.xcworkspace` after `pod install`. Pipelines copied from older tutorials assume the workspace.

**Fix:** check which one your project uses and build the right file. If you are migrating, see [How to migrate your Capacitor app to SPM](/blog/how-to-migrate-your-capacitor-app-to-spm/).

### Pitfall: Android plugin builds break after a Gradle upgrade

**Symptom:** `Namespace not specified`, `package attribute is deprecated`, or errors from a plugin's `build.gradle` after updating Android Studio.

**Fix:** pin the Android Gradle Plugin in `android/build.gradle`, upgrade on a branch, and update plugins first. Specific errors are covered in [Fix Capacitor plugin build errors with AGP 9](/blog/fix-capacitor-plugin-build-errors-with-agp-9/).

## Stage 3: Code signing

### Pitfall: iOS signing works on your Mac only

**Symptom:** `No signing certificate "iOS Distribution" found`, `No profiles for 'com.example.app' were found`, or `errSecInternalComponent`.

**Cause:** your Mac's keychain holds the certificate and Xcode downloads profiles for you. A CI runner has neither, and its keychain is locked in a non-interactive session.

**Fix:** import the certificate into a temporary unlocked keychain and install the profile where Xcode 16 and later look for it:

```bash
security create-keychain -p "$KEYCHAIN_PASSWORD" ci.keychain
security set-keychain-settings -lut 21600 ci.keychain
security unlock-keychain -p "$KEYCHAIN_PASSWORD" ci.keychain
security import dist.p12 -k ci.keychain -P "$P12_PASSWORD" -T /usr/bin/codesign
security set-key-partition-list -S apple-tool:,apple: -s -k "$KEYCHAIN_PASSWORD" ci.keychain
security list-keychains -d user -s ci.keychain login.keychain

PROFILES="$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles"
mkdir -p "$PROFILES"
cp app.mobileprovision "$PROFILES/"
```

Use the identity name `Apple Distribution`, not the legacy `iOS Distribution`. fastlane's `setup_ci` plus `match` automates this. Capgo Build takes the certificate and profile as environment variables and does the keychain work on its own machines, so the Linux job never touches `security`.

### Pitfall: expired or revoked certificates

**Symptom:** a pipeline that worked for a year fails overnight.

**Cause:** Apple distribution certificates and provisioning profiles expire after a year. A teammate creating a new certificate in Xcode can also invalidate the profile your CI uses.

**Fix:** put the expiry dates in your team calendar, keep one shared distribution certificate for CI, and check before building. `bunx @capgo/cli@latest build prescan --platform ios` checks certificate expiry, password, and profile pairing before anything is uploaded.

### Pitfall: Apple ID logins and two-factor prompts

**Symptom:** fastlane hangs waiting for a 6-digit code.

**Fix:** use an App Store Connect API key (`.p8`, key ID, issuer ID) instead of an Apple ID and password. It does not require two-factor authentication and can be scoped to App Manager. If authentication still fails with a correct key, check the runner clock: the token is signed with the local time, and Apple rejects tokens with a skewed timestamp.

### Pitfall: base64 secrets that do not decode

**Symptom:** `MAC verification failed`, `invalid keystore format`, or `base64: invalid input`.

**Cause:** line breaks added when copying the base64 value, or a `.p12` created with OpenSSL 3 defaults that macOS cannot read.

**Fix:** encode on one line, and use `-legacy` when creating a `.p12` with OpenSSL 3:

```bash
base64 -i dist.p12 | tr -d '\n' > dist.p12.b64
openssl pkcs12 -export -legacy -inkey key.pem -in cert.pem -out dist.p12
```

### Pitfall: a lost Android keystore

**Symptom:** you cannot sign an update because nobody has the keystore.

**Fix:** with Play App Signing, the keystore is the upload key, and Play Console support can register a new one. Store the keystore in your CI secrets and in an offline backup. Never let it live only on one laptop. The [Android keystore generator](/tools/android-keystore-generator/) creates a new one if you are starting fresh.

## Stage 4: Pipeline design

### Pitfall: native builds on every pull request

**Symptom:** slow PR checks and a large macOS minutes bill.

**Cause:** iOS builds on hosted macOS runners are the most expensive minutes in most CI plans, and most commits only touch JavaScript.

**Fix:** run lint, tests, and the web build on every PR. Run native builds on release tags or merges to `main`. For PR previews, ship the web bundle to a Capgo channel instead of building a binary, as described in [Comparing CI/CD platforms for Capacitor apps](/blog/comparing-ci-cd-platforms-for-capacitor-apps/).

### Pitfall: building iOS and Android sequentially

**Fix:** use a matrix so both platforms build in parallel, and set `fail-fast: false` so an iOS signing problem does not cancel a good Android build.

```yaml
strategy:
  fail-fast: false
  matrix:
    platform: [ios, android]
```

### Pitfall: no caching, or the wrong cache

**Symptom:** every build downloads Gradle dependencies and CocoaPods from scratch, or a staging build ships production config from a stale cache.

**Fix:** cache `~/.gradle/caches`, `~/.gradle/wrapper`, and `ios/App/Pods` keyed on the lockfiles. Partition caches by environment. With Capgo Build, the per-app build cache can be split with `--cache-key prod` and `--cache-key staging`, or skipped with `--no-cache` for a clean build.

### Pitfall: monorepo paths

**Symptom:** `could not find capacitor.config` or plugins missing from the native project.

**Fix:** run Capacitor commands from the app package, and point tools at hoisted `node_modules`. The Capgo CLI accepts `--path` and `--node-modules` for this.

## Stage 5: Store submission

### Pitfall: reused build numbers

**Symptom:** "The bundle version must be higher than the previously uploaded version" on iOS, or "Version code has already been used" on Google Play.

**Fix:** generate the number in CI. With fastlane, read the latest TestFlight build and add one. With Capgo Build, this is the default: it fetches the latest build number from App Store Connect or the highest `versionCode` from Google Play and increments it.

### Pitfall: builds stuck in TestFlight

**Symptom:** upload succeeds but testers never see the build.

**Cause:** missing export compliance answer.

**Fix:** declare it once in `ios/App/App/Info.plist` if you only use standard encryption:

```xml
<key>ITSAppUsesNonExemptEncryption</key>
<false/>
```

### Pitfall: privacy manifest rejections

**Symptom:** email from Apple about missing required reason API declarations (ITMS-91053).

**Fix:** add a `PrivacyInfo.xcprivacy` to the app target and update plugins that ship their own. See the [privacy manifest guide for Capacitor apps](/blog/privacy-manifest-for-capacitor-apps-guide/).

### Pitfall: wrong artifact type

**Fix:** Google Play needs an AAB (`bundleRelease`), not an APK. `bundleRelease` still succeeds without a `release` signing config and produces an unsigned AAB that Play rejects, so configure `signingConfigs.release` in `android/app/build.gradle` first. iOS needs an App Store export, not a development or ad hoc IPA. Check the export method in your build step.

## Stage 6: Live updates

### Pitfall: shipping a live update that needs a new native build

**Symptom:** after an over-the-air update, the app crashes calling a plugin method that does not exist in the installed binary.

**Cause:** the web bundle depends on a plugin version newer than the one compiled into the app on users' devices.

**Fix:** let the pipeline decide. `build needed` exits 0 when native dependencies match what is live on the channel and 1 when a new binary is required:

```bash
if bunx @capgo/cli@latest build needed com.example.app --channel production; then
  bunx @capgo/cli@latest bundle upload com.example.app --channel production
else
  bunx cap sync
  bunx @capgo/cli@latest build request com.example.app --platform ios
  bunx @capgo/cli@latest build request com.example.app --platform android
fi
```

Also force the native path when files under `ios/`, `android/`, or `capacitor.config.*` change. The complete pattern is in [Auto choose live update or native build](/docs/builder/ci-ota-or-native/), and the compatibility rules are in [native compatibility](/docs/live-updates/compatibility/).

## The fix that removes the most pitfalls

If you only change one thing, move iOS compilation and signing out of your CI runners. Keychain setup, Xcode upgrades, macOS costs, and profile installation all disappear from your pipeline when a Linux job hands the prepared project to [Capgo Build](/native-build/):

```bash
bun install --frozen-lockfile && bun run build
bunx cap sync ios
bunx @capgo/cli@latest build request com.example.app --platform ios --build-mode release
```

The pitfalls in stages 1, 5, and 6 still apply, because they are about your project, not the runner. For more on debugging failing jobs, see [Fixing build failures in Capacitor CI/CD pipelines](/blog/fixing-build-failures-in-capacitor-ci-cd-pipelines/).

## Quick reference

| Error | Pitfall | Section |
| --- | --- | --- |
| Old UI in a new build | `cap sync` before web build | Stage 1 |
| `No profiles for ... were found` | Profile not installed or mismatched | Stage 3 |
| `errSecInternalComponent` | Locked keychain | Stage 3 |
| `MAC verification failed` | Wrong password or OpenSSL 3 `.p12` | Stage 3 |
| `Unsupported class file major version` | Wrong JDK | Stage 2 |
| SDK too old on upload | Xcode older than 26 | Stage 2 |
| Bundle version must be higher | Reused build number | Stage 5 |
| Version code already used | Reused `versionCode` | Stage 5 |
| Crash after live update | Native change shipped over the air | Stage 6 |
