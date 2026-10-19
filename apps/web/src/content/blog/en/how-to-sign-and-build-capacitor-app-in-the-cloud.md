---
slug: how-to-sign-and-build-capacitor-app-in-the-cloud
title: "How to Sign and Build a Capacitor App in the Cloud"
description: "Sign and build your Capacitor app in the cloud: create the Android keystore and iOS certificate, store credentials safely, and run signed builds from CI."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /certificates.webp
head_image_alt: "iOS certificates and Android keystore used to sign a Capacitor app in a cloud build"
keywords: sign Capacitor app, Capacitor cloud build, Capacitor code signing, iOS certificate CI, Android keystore CI, build Capacitor without Mac, Capgo Build, TestFlight upload Capacitor
tag: Tutorial, Cloud, Security
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What files do I need to sign a Capacitor app in the cloud?"
    answer: "For Android, a keystore (.jks or .keystore) with its alias and passwords, plus a Google Play service account JSON if you want automatic uploads. For iOS, an Apple Distribution certificate exported as .p12, a provisioning profile for each app target, and an App Store Connect API key (.p8) for uploads."
  - question: "Can I create an iOS distribution certificate without a Mac?"
    answer: "Yes. Generate a private key and certificate signing request with OpenSSL or a browser tool, upload the request in the Apple Developer portal, then combine the downloaded certificate with your key into a .p12. Capgo's onboarding can also create the certificate and profile for you."
  - question: "Does Capgo store my signing keys?"
    answer: "No. The Capgo CLI keeps credentials on your machine or in your CI secrets. They are sent over HTTPS for each build, used only during that build, and deleted when it completes."
  - question: "What happens when my iOS certificate expires?"
    answer: "Apps already on the App Store keep working, but new builds fail to sign. Create a new Apple Distribution certificate, regenerate the provisioning profiles that reference it, save the new files with the Capgo CLI, and update your CI secrets."
  - question: "Do I need separate credentials for development and production?"
    answer: "For iOS, yes: App Store builds use an App Store Connect profile, test builds on registered devices use an Ad Hoc profile, both signed with the same distribution certificate. For Android, one upload keystore covers all Play tracks, and debug builds use the default debug key."
---

To sign and build a Capacitor app in the cloud, you create your signing material once (an Android keystore, an iOS distribution certificate and provisioning profile), give it to a cloud build service, and then trigger builds from your terminal or CI. The service compiles the native project, signs it, and can upload it straight to TestFlight or Google Play. This guide covers each signing file, how to create it without a Mac, how to set it up with Capgo Build, and how to automate signed builds safely.

## What "signing in the cloud" means

Both stores only accept signed binaries. Signing proves the build came from you and that nobody changed it afterwards. Locally, Xcode and Android Studio hide most of this. In the cloud, nothing is implicit, so you need to know exactly which files are involved:

| Platform | File | What it is | Used for |
| --- | --- | --- | --- |
| Android | `.jks` / `.keystore` | Keystore holding your upload key | Signing the AAB or APK |
| Android | Service account `.json` | Google Cloud credentials | Uploading to Google Play |
| iOS | `.p12` | Apple Distribution certificate plus private key | Signing the IPA |
| iOS | `.mobileprovision` | Provisioning profile tying bundle ID, certificate, and capabilities | Allowing the app to run and be distributed |
| iOS | `.p8` + key ID + issuer ID | App Store Connect API key | Uploading to TestFlight, reading build numbers |

Keep these out of Git. Everything below stores them in your local credential file or your CI's secret store.

## Android signing

### Create the upload keystore

If the app is already on Google Play, reuse the existing keystore. Signing an update with a different key is rejected unless you go through Play Console's upload key reset.

For a new app:

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore release.jks \
  -alias upload \
  -keyalg RSA -keysize 2048 \
  -validity 10000
```

Notes:

- Google Play requires the key to be valid until at least October 22, 2033. `-validity 10000` (about 27 years) covers that.
- With the PKCS12 store type, the key password is the same as the store password.
- No JDK at hand? The [Android keystore generator](/tools/android-keystore-generator/) produces the same file in the browser.

### Play App Signing and the upload key

New apps on Google Play use Play App Signing. Google holds the **app signing key** and re-signs what users download. Your keystore is the **upload key**. If you lose it, Play Console support can register a new upload key, which is why losing it is a delay, not a disaster. Back it up anyway.

### Service account for uploads

To upload from the cloud, create a service account in Google Cloud, enable the Google Play Android Developer API, download its JSON key, and invite the service account in Play Console under **Users and permissions** with release permissions for your app. Capgo's onboarding can do this through Google sign-in, as shown below.

## iOS signing

### The three Apple pieces

- **Apple Distribution certificate.** One per team is enough, valid for a year. Apple limits how many you can have, so do not create one per developer.
- **Provisioning profile.** Links the bundle ID, the certificate, and capabilities such as push notifications. Use an **App Store Connect** profile for TestFlight and the App Store, and an **Ad Hoc** profile for installs on registered devices. Each app extension (widget, share extension, notification service) needs its own profile.
- **App Store Connect API key.** Created under **Users and Access > Integrations** with App Manager access. The `.p8` file downloads only once.

You need admin or account holder rights on the Apple Developer team to create these.

### Create a certificate without a Mac

The Keychain Access flow needs macOS, but OpenSSL works anywhere:

```bash
# 1. Private key and certificate signing request
openssl req -new -newkey rsa:2048 -nodes \
  -keyout dist.key -out dist.csr \
  -subj "/emailAddress=dev@example.com/CN=Example Inc/C=US"

# 2. Upload dist.csr at developer.apple.com > Certificates > + > Apple Distribution
#    and download distribution.cer

# 3. Convert and bundle into a .p12
openssl x509 -inform DER -in distribution.cer -out distribution.pem
openssl pkcs12 -export -legacy \
  -inkey dist.key -in distribution.pem \
  -out distribution.p12 -passout pass:choose-a-password
```

The `-legacy` flag matters with OpenSSL 3: without it, macOS build machines may fail to import the `.p12` with "MAC verification failed". The browser-based [iOS certificate generator](/tools/ios-certificate-generator/) does the same steps if you prefer not to use a terminal.

Then create the provisioning profile in the developer portal (**Profiles > + > App Store Connect**), select your app ID and the new certificate, and download it.

## Set up signing with Capgo Build

[Capgo Build](/native-build/) compiles and signs Capacitor apps on Capgo-managed machines, so you can build iOS from Windows or Linux. Start by logging in and registering the app:

```bash
bunx @capgo/cli@latest login
bunx @capgo/cli@latest app add
```

### Option A: guided onboarding (recommended)

```bash
bunx @capgo/cli@latest build init --platform ios
bunx @capgo/cli@latest build init --platform android
```

On iOS, the onboarding creates or reuses the distribution certificate and the App Store provisioning profile with your App Store Connect API key. On macOS it can also walk you through creating that API key. On Android, it creates or imports the keystore and can provision the Google Cloud service account and the Play Console invite through Google sign-in. At the end it offers to start the first build.

### Option B: save existing files

If you already have the files from the previous sections:

```bash
# iOS
bunx @capgo/cli@latest build credentials save \
  --platform ios \
  --certificate ./distribution.p12 \
  --p12-password "choose-a-password" \
  --ios-provisioning-profile ./AppStore.mobileprovision \
  --apple-key ./AuthKey_ABC1234567.p8 \
  --apple-key-id ABC1234567 \
  --apple-issuer-id 00000000-0000-0000-0000-000000000000 \
  --apple-team-id TEAM123456

# Android
bunx @capgo/cli@latest build credentials save \
  --platform android \
  --keystore ./release.jks \
  --keystore-alias upload \
  --keystore-key-password "store-password" \
  --keystore-store-password "store-password" \
  --play-config ./play-service-account.json
```

For apps with extensions, repeat `--ios-provisioning-profile` with a `bundleId=path` mapping for each target:

```bash
  --ios-provisioning-profile com.example.app=./App.mobileprovision \
  --ios-provisioning-profile com.example.app.widget=./Widget.mobileprovision
```

Credentials are stored in `~/.capgo-credentials/credentials.json`, keyed by app ID and platform. Add `--local` to store them in `.capgo-credentials.json` in the project instead, and add that file to `.gitignore`. Check what is saved with `bunx @capgo/cli@latest build credentials list`.

## Trigger a signed build

Prepare the native project, then request the build:

```bash
bun run build
bunx cap sync

# iOS: sign with the App Store profile and upload to TestFlight
bunx @capgo/cli@latest build request com.example.app --platform ios --build-mode release

# Android: sign the AAB and upload to the internal track
bunx @capgo/cli@latest build request com.example.app --platform android --build-mode release --android-track internal
```

Logs stream into your terminal. A pre-build scan checks certificate expiry, passwords, and profile pairing before anything is uploaded, so most signing mistakes fail in seconds instead of minutes. Run it on its own with `bunx @capgo/cli@latest build prescan --platform ios`.

Useful variations:

| Goal | Flags |
| --- | --- |
| Test build on registered iPhones | `--ios-distribution ad_hoc --ios-provisioning-profile ./adhoc.mobileprovision --output-upload` |
| APK for MDM or kiosk devices | `--platform android --no-playstore-upload --output-upload` |
| Submit straight to App Review | `--submit-to-store-review --store-release-name 2.4.0` |
| Keep your own build number | `--skip-build-number-bump` |
| Clean build without cache | `--no-cache` |

For ad hoc builds, collect device UDIDs first with the [iOS UDID finder](/tools/ios-udid-finder/) and add them to the profile.

## Automate signed builds in CI

In CI, pass credentials as environment variables instead of a credentials file. The CLI exports exactly what you need:

```bash
bunx @capgo/cli@latest build credentials manage --appId com.example.app
# choose "Export to .env"
```

On GitHub, push every line to repository secrets in one command, then delete the file:

```bash
gh secret set -f .env.capgo.com.example.app
gh secret set CAPGO_TOKEN --body "your-capgo-api-key"
rm .env.capgo.com.example.app
```

A release workflow that signs and ships both platforms on a tag:

```yaml
name: Signed release
on:
  push:
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        platform: [ios, android]
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - run: bunx cap sync ${{ matrix.platform }}
      - run: bunx @capgo/cli@latest build request com.example.app --platform ${{ matrix.platform }} --build-mode release
        env:
          CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
          BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
          CAPGO_IOS_PROVISIONING_MAP_BASE64: ${{ secrets.CAPGO_IOS_PROVISIONING_MAP_BASE64 }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
```

The job runs on Linux. No macOS runner, no keychain commands, no fastlane. The same environment variables work in any CI: GitLab CI/CD variables, Bitbucket secured variables, Gitea secrets, or Azure DevOps variable groups. Platform-specific walkthroughs: [Bitbucket Pipelines](/blog/build-and-deploy-ios-apps-with-bitbucket-pipelines/), [Gitea Actions](/blog/build-and-deploy-ios-apps-with-gitea-actions/), and the [GitHub Actions docs](/docs/builder/github-actions/).

## How your keys are handled

A fair question before you hand signing keys to any cloud service. With Capgo Build:

- Credentials live on your machine (`~/.capgo-credentials/`) or in your CI secret store. Capgo does not keep a vault of your keys.
- For each build, the CLI sends them over HTTPS. They are used only during that build and deleted when it completes.
- Only the prepared native project is uploaded. Your web source, `.git`, and `.env` files are not.
- Built apps go to App Store Connect or Google Play directly, or to a time-limited download link if you ask for one.

The trade-off: rotating a credential means updating your CI secrets yourself. Re-export with `build credentials manage` and push the file again.

## Expiry and rotation

| Item | Lifetime | What to do |
| --- | --- | --- |
| Apple Distribution certificate | 1 year | Create a new one, regenerate profiles, re-save, update CI |
| Provisioning profile | 1 year, or until its certificate is revoked | Regenerate and re-save |
| App Store Connect API key | Until revoked | Revoke when someone with access leaves |
| Android upload keystore | As long as its validity (set it to decades) | Back it up; reset via Play Console if lost |
| Play service account key | Until deleted | Rotate yearly or when access changes |

Put the Apple dates in a shared calendar. An expired certificate does not affect apps already on users' devices, but it blocks every new build.

## Troubleshooting

| Error | Cause and fix |
| --- | --- |
| `Provisioning profile doesn't include signing certificate` | Profile was generated for a different certificate. Regenerate it with the current one. |
| `Provisioning profile doesn't match bundle ID` | Profile created for another app ID or missing an extension target. Add a `bundleId=path` mapping for each target. |
| `MAC verification failed` | Wrong `.p12` password, or OpenSSL 3 export without `-legacy`. |
| `Keystore was tampered with, or password was incorrect` | Wrong store password, or the file was corrupted by base64 line breaks. |
| `Key alias not found` | Alias differs from the one in the keystore. List it with `keytool -list -keystore release.jks`. |
| App Store Connect authentication failed | Wrong key ID or issuer ID, revoked key, or a skewed system clock on the machine that signs the token. |
| Play upload: caller does not have permission | Service account not invited in Play Console, or the Android Developer API not enabled. |

More fixes are in the [Capgo Build troubleshooting guide](/docs/builder/troubleshooting/) and [CI/CD for Capacitor: common pitfalls](/blog/ci-cd-for-capacitor-common-pitfalls/).

## After the first signed build

Signed native builds are only needed when native code changes. For JavaScript, CSS, and HTML changes, ship a [live update](/live-update/) to installed apps instead and keep store builds for releases that touch plugins or native configuration. If you are coming from a Mac-based setup, [Build an iOS app from Windows with Capgo Build](/blog/build-ios-app-from-windows-capacitor-capgo-build/) shows the full workflow without macOS.
