---
slug: how-to-put-a-web-app-on-the-app-store
title: "How to Put a Web App on the App Store in 11 Steps"
description: "How to put a web app on the App Store and Google Play in 11 steps with Capacitor: native shell, plugins, accounts, signing, testing, review, live updates."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Turning a web app into iOS and Android apps with Capacitor"
keywords: web app to app store, convert web app to mobile app, put web app on app store, web app to ios app, web app to android app, capacitor, publish web app google play, wrap web app native
tag: Capacitor, App Store, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I put my web app on the App Store?"
    answer: "Yes. Wrap the built web app in a native iOS and Android shell with Capacitor, add native features where they make sense, sign the app, and submit it through App Store Connect and Google Play Console. Apple rejects apps that are only a website in a frame, so the app must feel like an app."
  - question: "Do I need a Mac to publish an iOS app?"
    answer: "You need macOS and Xcode to build the iOS binary, but it does not have to be your computer. Cloud build services such as Capgo Build run Xcode on hosted Macs, so you can build, sign and upload to TestFlight from Windows or Linux."
  - question: "How long does it take to get a web app on the App Store?"
    answer: "The code work can take a few days to a few weeks. Calendar time is often longer: Apple organization enrollment can take one to two weeks, new personal Google Play accounts must run a 14-day closed test with 12 testers, and first reviews take one to several days."
  - question: "Will Apple reject an app built with Capacitor?"
    answer: "Not for using Capacitor. Apple rejects apps that offer little beyond a website (guideline 4.2), that sell digital goods without the required in-app purchase options, or that crash and have broken flows. Many large apps in the App Store are Capacitor apps."
  - question: "Can I update the app without going through review again?"
    answer: "For changes to your web code, yes. Live update tools like Capgo replace the JavaScript, HTML and CSS bundle on installed apps, which Apple and Google allow as long as you do not change the app's primary purpose. Native code changes still need a new store release."
---

To put a web app on the App Store and Google Play, wrap your built web app in a native project with Capacitor, add a few native features, create Apple and Google developer accounts, sign and build the iOS and Android binaries, test them with real users, prepare the store listings and submit for review. Your existing HTML, CSS and JavaScript keeps running inside a native WebView, so you do not rewrite the app.

Below are the 11 steps in the order that avoids waiting, with commands for Capacitor 8 and the store rules that apply in October 2026.

## What you need

- A web app that builds to static files (React, Vue, Angular, Svelte, Next.js static export, Nuxt generate, plain HTML, or an app made with an AI builder such as Lovable or Bolt).
- Node.js 22 or later (Capacitor 8 requirement) and Bun or another package manager.
- Android Studio for Android builds.
- Xcode 26 on macOS for iOS builds, or a cloud build service if you do not have a Mac.
- 99 USD per year for Apple and 25 USD once for Google.

## Realistic timeline

| Phase | Typical time | Can run in parallel? |
| --- | --- | --- |
| Developer account enrollment | Hours (individual) to 2 weeks (organization with new D-U-N-S) | Yes, start on day one |
| Capacitor setup and first device run | 1 day | |
| Mobile polish and native features | 3 days to 3 weeks | |
| Signing and first builds | 1 day | |
| Google Play closed test (new personal accounts) | 14 days minimum, then production access review | Yes, with iOS TestFlight |
| Store listing | 1 to 2 days | Yes |
| App Review | Apple usually 1 to 2 days, Google from hours to several days | |

## Step 1: Start developer account enrollment today

Account verification is the step you cannot speed up, so do it before coding.

- **Apple Developer Program**: 99 USD per year. Individuals need an Apple Account with two-factor authentication and their legal name. Organizations also need a D-U-N-S number, a company website and a work email on that domain.
- **Google Play Console**: 25 USD once. Organizations need a D-U-N-S number. Expect ID verification.

If you enroll on Google Play as an individual, your account is subject to the closed testing rule (Step 9). Full walkthrough: [how to create Apple and Google Play developer accounts](/blog/how-to-create-apple-developer-and-google-play-developer-accounts/).

## Step 2: Make the web app ready for a phone

Capacitor runs your app in a WebView. Things that are fine in a browser tab feel wrong in an app:

- **Static build output.** Capacitor loads files from the app bundle. Server-side rendering does not run on the phone. Use your framework's static output (`next build` with `output: 'export'`, `nuxt generate`, Vite `build`). API calls go to your backend over HTTPS as before.
- **Client-side routing that works from a file origin.** Use history routing (Capacitor serves the app from `https://localhost` on Android and `capacitor://localhost` on iOS, so it works) and make sure deep URLs fall back to `index.html`.
- **CORS.** Add the Capacitor origins to your API's allowed origins: `capacitor://localhost` (iOS) and `https://localhost` (Android).
- **Touch, not hover.** Remove hover-only menus. Make tap targets at least 44 x 44 points.
- **Safe areas.** Add `viewport-fit=cover` to the viewport meta tag and pad headers and bottom bars with `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
- **Offline and slow networks.** Show a proper state instead of a blank screen. Reviewers test on flaky Wi-Fi.
- **No "download our app" banners** and no links that send users to your website to do core tasks.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

## Step 3: Add Capacitor

From your web project root:

```bash
bun add @capacitor/core
bun add -d @capacitor/cli
bunx cap init "My App" com.example.myapp --web-dir dist
bun add @capacitor/ios @capacitor/android
bun run build
bunx cap add ios
bunx cap add android
```

Use the real output folder for `--web-dir`: `dist` for Vite, `out` for Next.js static export, `.output/public` for Nuxt generate, `build` for Create React App, `dist/<project>/browser` for Angular.

The bundle ID (`com.example.myapp`) is permanent once the app is on the stores. Use a reverse domain you control.

Your `capacitor.config.ts` now looks like:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My App',
  webDir: 'dist',
};

export default config;
```

Capacitor 8 creates the iOS project with Swift Package Manager by default, so you do not need CocoaPods. Every time you change web code:

```bash
bun run build
bunx cap sync
```

Run it:

```bash
bunx cap run ios
bunx cap run android
```

Commit the `ios/` and `android/` folders. They are source code you will edit (permissions, icons, signing). For more background, see [how easy it is to make a web app into a mobile app with Capacitor](/blog/how-easy-is-it-to-make-web-app-into-mobile-app-with-capacitor/), and if you built with an AI tool, our [Lovable to mobile guide](/blog/transform-lovable-dev-app-to-mobile-with-capacitor/).

## Step 4: Add native features that justify an app

Apple's guideline 4.2 (Minimum Functionality) rejects apps that are just a website in a shell. You do not need dozens of native features, but you need the app to behave like an app. Common, useful additions:

| Feature | Plugin |
| --- | --- |
| Push notifications | `@capacitor/push-notifications` |
| Native Google, Apple and Facebook sign-in | [`@capgo/capacitor-social-login`](/plugins/capacitor-social-login/) |
| Face ID / fingerprint unlock | [`@capgo/capacitor-native-biometric`](/plugins/capacitor-native-biometric/) |
| Camera and photos | `@capacitor/camera` |
| In-app purchases and subscriptions | [`@capgo/capacitor-native-purchases`](/plugins/capacitor-native-purchases/) |
| Native share sheet | `@capacitor/share` |
| Haptics | `@capacitor/haptics` |
| Status bar and splash screen | `@capacitor/status-bar`, `@capacitor/splash-screen` |
| Rate the app prompt | [`@capgo/capacitor-in-app-review`](/plugins/capacitor-in-app-review/) |
| Live updates | [`@capgo/capacitor-updater`](/plugins/capacitor-updater/) |

Example: show the native share sheet instead of a "copy link" button.

```typescript
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export async function shareLink(url: string, title: string) {
  if (Capacitor.isNativePlatform()) {
    await Share.share({ title, url });
  } else {
    await navigator.clipboard.writeText(url);
  }
}
```

If you sell digital content or subscriptions, plan payments now. Apple and Google require their in-app purchase systems for digital goods in most cases. In the US App Store, apps may also link to external web checkout after the 2025 court ruling; other regions have their own rules. Physical goods and services (deliveries, rides) can use Stripe or any payment provider. See [in-app purchases with Capacitor](/blog/in-app-purchases-capacitor/).

The full catalog of Capgo plugins is on the [plugins page](/plugins/).

## Step 5: Icons, splash screen and permission strings

Generate all icon and splash sizes from two source images:

```bash
bun add -d @capacitor/assets
# assets/icon.png 1024x1024, assets/splash.png 2732x2732
bunx capacitor-assets generate
```

On iOS, every permission you use needs a usage description in `ios/App/App/Info.plist`, or the app crashes when it asks and Apple rejects it:

```xml
<key>NSCameraUsageDescription</key>
<string>Take a photo of your receipt to attach it to an expense.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Choose receipt photos from your library.</string>
```

Write specific reasons. "This app needs the camera" gets rejected.

On Android, plugins add most permissions to the manifest themselves. Remove permissions you do not use; Google asks you to justify sensitive ones.

Also add a **privacy manifest** (`PrivacyInfo.xcprivacy`) if your code uses required-reason APIs. See the [privacy manifest guide for Capacitor](/blog/privacy-manifest-for-capacitor-apps-guide/).

## Step 6: Set up signing

**iOS.** You need an Apple Distribution certificate (with its private key, usually exported as `.p12`) and an App Store Connect provisioning profile for your bundle ID. Xcode can create them automatically, or you can create them yourself, even without a Mac. Read [iOS certificates and provisioning profiles explained](/blog/ios-certificates-and-provisioning-profiles-explained/); the [iOS certificate generator](/tools/ios-certificate-generator/) handles the CSR step in the browser.

**Android.** Create an upload keystore and keep it backed up. Google Play uses Play App Signing, so Google holds the final app signing key and you sign uploads with yours.

```bash
keytool -genkeypair -v -keystore upload-keystore.jks -alias upload \
  -keyalg RSA -keysize 2048 -validity 10000
```

Or use the [Android keystore generator](/tools/android-keystore-generator/).

## Step 7: Build the release binaries

### Locally

**iOS** (on a Mac with Xcode 26, required for App Store uploads since April 2026):

1. `bunx cap open ios`
2. Select the **App** target, set the version and build number, pick your team under Signing & Capabilities.
3. Choose **Any iOS Device (arm64)**, then **Product > Archive**.
4. In the Organizer, **Distribute App > App Store Connect > Upload**.

**Android:**

```bash
bun run build
bunx cap sync android
cd android
./gradlew bundleRelease
```

The AAB is in `android/app/build/outputs/bundle/release/`. Configure `signingConfigs` in `android/app/build.gradle` with your keystore, loading passwords from environment variables.

Make sure `targetSdkVersion` is 36. Since August 31, 2026 Google Play requires new apps and updates to target Android 16 (API 36), which is the Capacitor 8 default.

### In the cloud

If you do not have a Mac, or you want builds reproducible from CI, [Capgo Build](/native-build/) builds both platforms on hosted machines and can upload directly to TestFlight and Google Play:

```bash
bunx @capgo/cli@latest build credentials save --appId com.example.myapp --platform ios
bunx @capgo/cli@latest build credentials save --appId com.example.myapp --platform android
bunx @capgo/cli@latest build request com.example.myapp --platform ios --path .
bunx @capgo/cli@latest build request com.example.myapp --platform android --path .
```

Credentials are used only for the build and are not stored on Capgo servers. See the [Capgo Build docs](/docs/builder/).

## Step 8: Distribute to testers

Put the build on real phones before anyone at Apple or Google sees it.

- **iOS**: upload to TestFlight. Internal testers (up to 100 team members) get it right after processing; external testers (up to 10,000) after a short Beta App Review.
- **Android**: create an internal testing release in Play Console and share the opt-in link.

Test sign-up and login, payments in sandbox, push notifications, offline behavior, the keyboard covering inputs, and back-button behavior on Android. Details for each option: [how to distribute iOS and Android apps to testers](/blog/distribute-ios-and-android-apps-to-testers/).

## Step 9: Run Google Play's closed test (new personal accounts)

If your Play account is a personal account created after November 13, 2023, you cannot publish to production until you have run a **closed test with at least 12 testers opted in for 14 consecutive days**. Then you apply for production access in the Play Console dashboard, which Google usually reviews within a week.

Start this as soon as you have a usable Android build. Use a Google Group as the tester list so people can join themselves. Ship updates during the 14 days and collect feedback, since Google asks what you learned. Organization accounts are exempt.

## Step 10: Prepare the store listings and submit

You need for both stores: app name, descriptions, screenshots in the accepted sizes, icon, privacy policy URL, privacy disclosures (Apple App Privacy and Google Data safety), age rating questionnaire, support contact, and a demo account if the app has a login. Google also needs a 1024 x 500 feature graphic. Specs and limits: [how to prepare your App Store and Google Play listing](/blog/how-to-prepare-app-store-and-google-play-listing/).

**Submitting on iOS:** in App Store Connect, create the version, select the TestFlight build, fill in App Review Information (demo account, notes), and click **Add for Review**, then **Submit**.

**Submitting on Android:** create a production release with the AAB (or promote the tested one from a testing track), complete every **App content** declaration, set countries, and send for review.

The rejections that hit web apps most often:

1. **4.2 Minimum Functionality**: the app is just your website. Add native value and remove browser-like UI.
2. **Login required but no demo account**, or the account does not work.
3. **No privacy-focused login option** when you offer Google or Facebook login on iOS. Guideline 4.8 requires an equivalent option that limits data collection; Sign in with Apple is the usual choice.
4. **No account deletion** inside the app when users can create accounts.
5. **Digital purchases through Stripe** where in-app purchase is required.
6. **Broken iPad layout** because the project supports iPad by default.
7. **Missing or vague permission strings.**

Our [first-time app review guide](/blog/first-time-app-review-guide/) and [iOS app submission guide](/blog/ios-app-submission/) go through each in detail.

## Step 11: Ship updates without waiting for review

After launch, most of your changes will still be in the web code. Instead of a new store build for every fix, add live updates. The Capgo updater downloads new web bundles from Capgo and applies them on the next launch, with automatic rollback if the new bundle fails to start.

```bash
bun add @capgo/capacitor-updater
bunx cap sync
bunx @capgo/cli@latest init
```

Call `notifyAppReady()` when your app has started so the updater knows the bundle is healthy:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

CapacitorUpdater.notifyAppReady();
```

Then each release of web code is one command:

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel production
```

Both stores allow this for interpreted code as long as the update does not change the app's main purpose or bypass their payment rules. Native changes (new plugins, new permissions, Capacitor upgrades) still go through the stores. Read more on [Capgo live updates](/live-update/) and the [updater docs](/docs/plugins/updater/).

Add the plugin before your first store submission. It has to be in the binary users install, otherwise your first live update can only reach users after a second store release.

Finally, automate: build and upload on every tag from GitHub Actions or GitLab CI, push live updates on every merge to `main`, and keep native releases for native changes.

## Pre-launch checklist

- [ ] Apple and Google accounts approved, agreements accepted
- [ ] App works offline or shows a clear offline state
- [ ] Safe areas, keyboard and Android back button handled
- [ ] At least a few native features that a website cannot offer
- [ ] Icons, splash, permission strings, privacy manifest
- [ ] Distribution certificate, App Store profile, upload keystore backed up
- [ ] Target SDK 36 on Android, built with Xcode 26 on iOS
- [ ] TestFlight and Play internal testing done on real devices
- [ ] Google Play closed test finished (personal accounts)
- [ ] Listings complete on both stores, demo account added
- [ ] In-app account deletion if users can sign up
- [ ] Live updates plugin included in the first binary

## Troubleshooting

**White screen on launch.** `webDir` points to the wrong folder or you forgot `bunx cap sync` after building. Check `ios/App/App/public` and `android/app/src/main/assets/public` contain `index.html`.

**API calls fail only in the app.** CORS: allow `capacitor://localhost` and `https://localhost`. Also check you are not calling `http://` URLs, which iOS blocks by default.

**Routes 404 after refresh or deep link.** Use a router that falls back to `index.html`, or hash routing for older setups.

**Xcode signing errors.** See the error list in [iOS certificates and provisioning profiles explained](/blog/ios-certificates-and-provisioning-profiles-explained/).

**Gradle build fails after upgrading.** Capacitor 8 needs Android Studio Otter (2025.2.1) or newer and JDK 21, as listed in the [Capacitor 8 upgrade guide](/blog/upgrade-capacitor-app-to-capacitor-8/). For other Gradle errors, see [how to resolve Android build errors in Capacitor](/blog/how-to-resolve-android-build-errors-in-capacitor/).

**Google Play upload rejected for target SDK.** Set `targetSdkVersion = 36` in `android/variables.gradle`.
