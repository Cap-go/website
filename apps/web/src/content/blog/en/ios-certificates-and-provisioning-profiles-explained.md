---
slug: ios-certificates-and-provisioning-profiles-explained
title: "How to Download .p12 and .mobileprovision for iOS"
description: "Download a .mobileprovision from Apple Developer, export a .p12 with your private key (or build one without a Mac), plus profile types, enterprise certs, and fixes."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-11-20T10:30:00.000Z
head_image: /certificates.webp
head_image_alt: "Apple signing certificates and provisioning profiles in the Apple Developer portal"
keywords: p12 certificate download, mobileprovision file download, ios certificates, provisioning profiles, ios code signing, enterprise certificate ios, apple provisioning profile, app store connect provisioning profile, create ios certificate without mac, udid
tag: iOS, Security, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Where do I download a .mobileprovision file?"
    answer: "Sign in at developer.apple.com, open Certificates, Identifiers & Profiles, choose Profiles in the sidebar, select the profile, then click Download. The file saves as a .mobileprovision for Xcode or your CI. If Xcode manages signing for you, profiles it creates may not appear in the portal: in Xcode open Settings > Accounts, select your team, and click Download Manual Profiles, or copy the profile from ~/Library/MobileDevice/Provisioning Profiles on your Mac."
  - question: "How do I get a .p12 certificate without a Mac?"
    answer: "Generate a private key and certificate signing request with OpenSSL or the Capgo iOS certificate generator, upload the CSR under Certificates in the Apple Developer portal, download the .cer Apple issues, then run openssl pkcs12 -export with your private key and the certificate PEM to create a .p12. Add -legacy only on OpenSSL 3.x so macOS can import the file; OpenSSL 1.1.x does not support that flag."
  - question: "Does a provisioning profile include the certificate?"
    answer: "The .mobileprovision file lists which Apple-issued certificates may sign the app and embeds the public certificate data, but it does not contain your private key. You still need the matching .p12 (or the certificate plus private key in Keychain) that pairs with one of the certificates named in the profile."
  - question: "What is an iOS enterprise certificate?"
    answer: "It is a distribution certificate issued through the Apple Developer Enterprise Program, separate from the standard Apple Developer Program. Teams use it with an In-House provisioning profile to distribute apps only inside their organization. You cannot submit Enterprise-signed apps to the App Store or TestFlight."
  - question: "Why is my provisioning profile invalid or expired?"
    answer: "Profiles expire after about one year or when an included certificate expires or is revoked. Xcode also marks a profile invalid if the App ID, devices, or capabilities changed and you did not regenerate it, or if the signing identity in your keychain is not one of the certificates listed in the profile. Download a fresh .mobileprovision after you renew certificates or edit the profile."
  - question: "What is the difference between a certificate and a provisioning profile?"
    answer: "A certificate proves who signed the app; it pairs a public key Apple issued with a private key you keep. A provisioning profile says what the signed app is allowed to do: which App ID it is, which certificates may sign it, which devices can run it, and which entitlements it has. Every iOS build needs both."
---

iOS code signing uses two pieces. A **certificate** proves who built the app, and a **provisioning profile** says which app it is, which devices may run it and which capabilities it can use. Xcode refuses to build for a device, and App Store Connect refuses uploads, unless the certificate, its private key and a matching profile all line up.

This guide starts with how to **download a .mobileprovision file** and **export or create a .p12 certificate**, then explains every piece, which combination you need for development, ad hoc, TestFlight, App Store and enterprise builds, and how to fix the errors you will hit.

## Quick answer: get a .p12 and download a .mobileprovision

If you came here to download signing files, follow these steps first. You need an Apple Developer account with the Account Holder or Admin role for distribution certificates and new profiles.

### Create or export a `.p12` (certificate plus private key)

**On a Mac (Keychain Access):**

If the certificate and private key are already in your login keychain (for example after a teammate imported a profile), skip to step 4 and export that identity. Creating a new certificate here will not match an existing provisioning profile that lists a different certificate.

1. Open **Keychain Access**, then **Certificate Assistant > Request a Certificate From a Certificate Authority**. Enter your email, choose **Saved to disk**, and continue. That creates a private key in your login keychain and a `.certSigningRequest` file on disk.
2. In [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources), open **Certificates**, click the add button (**+**), pick **Apple Distribution** or **Apple Development** (under **In-House and Ad Hoc** for the Enterprise Program), upload the CSR, and **Download** the `.cer`.
3. Double-click the `.cer` so Keychain Access pairs it with the private key from step 1.
4. Under **My Certificates**, right-click the certificate that shows a disclosure triangle (certificate plus private key), choose **Export**, pick **Personal Information Exchange (.p12)**, set a password, and save.

**Without a Mac:**

1. Create a private key and CSR with OpenSSL or the [iOS certificate generator](/tools/ios-certificate-generator/).
2. Upload the CSR under **Certificates** in the Apple Developer portal and download the `.cer`.
3. Convert the certificate and export a `.p12` with OpenSSL (see [Option 3: create them without a Mac](#option-3-create-them-without-a-mac) below). For a full walkthrough without Xcode, see [Capacitor development on Linux](/blog/capacitor-development-on-linux/) or [build an iOS app from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/).

### Download a `.mobileprovision` provisioning profile

**Download an existing profile:**

1. Sign in at [developer.apple.com/account/resources](https://developer.apple.com/account/resources) and open **Certificates, Identifiers & Profiles**.
2. Click **Profiles** in the sidebar, select the profile you need, then click **Download**. The file uses the `.mobileprovision` extension.

**Create a new profile, then download:**

1. In **Profiles**, click the add button (**+**).
2. Pick the profile type (for example **iOS App Development**, **Ad Hoc**, **App Store Connect**, or **In-House** for Enterprise).
3. Choose the App ID, one or more certificates, and devices when the type requires them.
4. Name the profile, click **Generate**, then click **Download**.

If you change devices, capabilities, or certificates later, edit or recreate the profile in the portal and **download it again**. Old files on disk do not update by themselves.

## Why Apple requires code signing

Apple only lets iPhones run code that Apple can trace back to a known developer. Signing gives Apple three guarantees:

1. **Identity**: the binary was signed by a member of a specific Apple Developer team.
2. **Integrity**: nobody modified the binary after signing. Changing one byte breaks the signature.
3. **Authorization**: the app is allowed on this device, with these entitlements (push, iCloud, Sign in with Apple, App Groups and so on).

Certificates provide the first two. Provisioning profiles provide the third.

## The building blocks

| Piece | What it is | File | Who owns it |
| --- | --- | --- | --- |
| Private key | Secret half of a key pair, generated on your machine | inside Keychain or `.key` / `.pem` | You. Apple never sees it |
| CSR | Certificate Signing Request containing your public key | `.certSigningRequest` / `.csr` | Temporary |
| Certificate | Apple-signed public key tied to your team | `.cer` | Apple issues, you download |
| Signing identity | Certificate + private key together | `.p12` when exported | You |
| App ID | Your bundle identifier plus enabled capabilities | Developer portal record | Team |
| Device | A registered iPhone or iPad UDID | Developer portal record | Team |
| Provisioning profile | Bundle of App ID, allowed certificates, devices, entitlements | `.mobileprovision` | Team |

The most common confusion: a `.cer` file is useless on its own. Signing needs the private key that created the CSR. If you lose that key, you create a new certificate.

## Certificate types

### Apple Development

Used to run builds on your own devices from Xcode during development. Development certificates belong to an individual developer, and Apple labels them with the computer name. Each developer on the team can have their own.

### Apple Distribution

Used to sign builds for Ad Hoc distribution, TestFlight and the App Store. Distribution certificates belong to the team, and only the Account Holder or Admin roles can create them. Apple limits how many a team can hold, so share one through a secure store rather than letting every developer create their own.

You may still see **iOS Development** and **iOS Distribution** in older accounts. Those are the pre-Xcode 11 types. Apple Development and Apple Distribution replace them and work across iOS, iPadOS, macOS, tvOS, watchOS and visionOS.

### Other certificate types you may meet

- **Developer ID Application / Installer**: for Mac apps distributed outside the Mac App Store. Not used for iOS.
- **Apple Push Notification service SSL**: legacy push certificates. Prefer an **APNs Auth Key** (`.p8`), which does not expire yearly and works for every app in the team. See our [APNs certificates guide](/blog/apple-push-notification-service-certificates/).
- **Apple Pay Merchant Identity**, **Pass Type ID**, **Website Push ID**: specific services.

## Provisioning profile types

| Profile type | Certificate | Devices | Used for |
| --- | --- | --- | --- |
| iOS App Development | Apple Development | Registered devices only | Running from Xcode, debugging |
| Ad Hoc | Apple Distribution | Registered devices only (up to 100 per device family per membership year) | Installing release builds on testers' devices via a link or file |
| App Store Connect | Apple Distribution | Any device, through Apple | TestFlight and App Store |
| In-House | Enterprise distribution certificate | Any device in the organization | Apple Developer Enterprise Program only |

A profile is tied to **one App ID**. If your app has extensions (a widget, a notification service extension, a share extension), each target has its own bundle ID and needs its own profile.

## iOS enterprise certificates (Enterprise Program)

An **iOS enterprise certificate** is not the same as an **Apple Distribution** certificate from the standard Apple Developer Program. It belongs to the **[Apple Developer Enterprise Program](https://developer.apple.com/programs/enterprise/)**, which is for large organizations that distribute proprietary apps to their own employees only.

- **Purpose**: sign **In-House** provisioning profiles so employees install internal apps without going through the App Store.
- **Not for**: public App Store releases, TestFlight, or sideloading to customers outside your organization.
- **Files**: you still create an enterprise distribution certificate in the portal, export a `.p12` the same way as other signing identities, and download an In-House `.mobileprovision` tied to your organization's App ID.

Apple reviews Enterprise Program membership strictly. Misuse (distributing consumer apps outside your company) can lead to certificate revocation. For public beta or store release, use Apple Distribution plus App Store Connect or Ad Hoc profiles instead.

## How the pieces fit together

When Xcode or a build service signs your Capacitor app it checks:

1. The bundle ID in your target (for example `com.example.app`) matches the App ID in the profile.
2. The certificate used to sign is one of the certificates listed in the profile.
3. The private key for that certificate is available in the keychain.
4. For development and ad hoc builds, the device's UDID is in the profile.
5. The entitlements file (push, associated domains, App Groups) is a subset of what the App ID and profile allow.

If any check fails you get a signing error, not a runtime crash, which is good: you find out before shipping.

## Which combination do I need?

| Goal | Certificate | Profile | Device registration |
| --- | --- | --- | --- |
| Run on my own iPhone from Xcode | Apple Development | iOS App Development | Yes |
| Send a build to a few testers without TestFlight | Apple Distribution | Ad Hoc | Yes, every tester's UDID |
| Beta test with TestFlight | Apple Distribution | App Store Connect | No |
| Release on the App Store | Apple Distribution | App Store Connect | No |
| Internal employee app, no App Store | Enterprise | In-House | No |

TestFlight uses the **same** signing as the App Store. There is no separate TestFlight profile. You upload one build and decide in App Store Connect whether it goes to testers, to review, or both.

## Creating certificates and profiles

### Option 1: let Xcode manage signing

For local development this is the easiest. Open `ios/App/App.xcworkspace` (or the `.xcodeproj` when your Capacitor 8 project uses Swift Package Manager), select the **App** target, open **Signing & Capabilities**, tick **Automatically manage signing** and pick your team. Xcode creates the development certificate, registers the connected device and generates profiles for you.

Automatic signing becomes painful in CI, because the build machine needs access to the team account and creates certificates on its own. Most teams switch to manual signing, or to a build service with API-key-based signing, for release builds.

### Option 2: create them manually on a Mac

1. Open **Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority**. Enter your email, choose **Saved to disk**. This creates the private key in your keychain and a `.certSigningRequest` file.
2. In the Apple Developer portal go to **Certificates, Identifiers & Profiles > Certificates > +**, choose **Apple Distribution** (or Apple Development) and upload the CSR.
3. Download the `.cer` and double-click it. Keychain Access pairs it with the private key.
4. To export for CI: in Keychain Access, under **My Certificates**, right-click the certificate, choose **Export**, save as `.p12` with a strong password.

### Option 3: create them without a Mac

You can do the whole flow with OpenSSL on Linux or Windows:

```bash
# 1. Private key and CSR
openssl genrsa -out ios_distribution.key 2048
openssl req -new -key ios_distribution.key -out ios_distribution.csr \
  -subj "/emailAddress=you@example.com/CN=Example Inc/C=US"

# 2. Upload ios_distribution.csr in the Apple Developer portal,
#    download the certificate as distribution.cer

# 3. Convert the .cer (DER) to PEM
openssl x509 -in distribution.cer -inform DER -out distribution.pem -outform PEM

# 4. Build the .p12 (signing identity)
openssl pkcs12 -export -inkey ios_distribution.key -in distribution.pem \
  -out ios_distribution.p12 -legacy
```

The `-legacy` flag matters with OpenSSL 3.x: without it, the `.p12` uses encryption algorithms that macOS keychain tools reject with an "invalid password" error even when the password is correct. On OpenSSL 1.1.x, omit `-legacy` because that option does not exist.

If you prefer not to install OpenSSL, the [iOS certificate generator](/tools/ios-certificate-generator/) creates the CSR and private key for you. They come from a stateless Capgo endpoint that does not store them, and only its `.cer` to `.p12` converter runs fully in your browser. If your policy requires the key to be generated on your machine, use the OpenSSL commands above.

### Creating the profile

1. **Identifiers > +**: register an App ID with your exact bundle ID and enable the capabilities you use (Push Notifications, Sign in with Apple, Associated Domains...).
2. **Devices > +**: for development and ad hoc profiles, register each tester's UDID. Testers can get it on the phone itself with the [iOS UDID finder](/tools/ios-udid-finder/), no Mac or cable needed.
3. **Profiles > +**: choose the profile type, the App ID, the certificate(s) and the devices. Name it clearly, for example `com.example.app AppStore 2026`.
4. Download the `.mobileprovision` file.

If you add a device or a capability later, you must regenerate and redownload the profile. Existing profiles do not update themselves.

## Inspecting a profile

A `.mobileprovision` file is a signed plist. On macOS you can read it:

```bash
security cms -D -i App_Store.mobileprovision > profile.plist
/usr/libexec/PlistBuddy -c "Print :Name" profile.plist
/usr/libexec/PlistBuddy -c "Print :ExpirationDate" profile.plist
/usr/libexec/PlistBuddy -c "Print :Entitlements" profile.plist
/usr/libexec/PlistBuddy -c "Print :ProvisionedDevices" profile.plist
```

On Linux, `openssl smime -inform der -verify -noverify -in App_Store.mobileprovision` prints the plist.

To check what a built `.ipa` was signed with:

```bash
unzip -q App.ipa -d ipa
codesign -dvv ipa/Payload/App.app
codesign -d --entitlements :- ipa/Payload/App.app
```

## Expiry and renewal

- **Certificates** are valid for one year from creation.
- **Provisioning profiles** expire after one year, or earlier if the certificate they include expires or is revoked.
- **App Store apps keep working** after the distribution certificate expires. Apple re-signs App Store downloads. You only need a new certificate to upload new builds.
- **Ad Hoc and development builds stop launching** once their profile expires. Testers see the app crash on launch.
- **TestFlight builds** expire 90 days after upload, independent of the certificate.
- **Enterprise apps stop working** on every device when the enterprise certificate expires or is revoked. Renew before expiry.
- **Device slots** reset once per membership year. Removing a device does not free its slot until the next membership year starts.

Put the certificate expiry date in a shared calendar. Our [certificate management guide](/blog/certificate-management/) covers monitoring and rotation in more depth.

## Common errors and fixes

**"No signing certificate 'iOS Distribution' found"** or **"Signing certificate is invalid"**: the private key is not in this keychain. Import the `.p12`, or create a new certificate if nobody has the key.

**"Provisioning profile doesn't include signing certificate"**: the profile was created with a different certificate. Edit the profile in the portal, tick the current certificate, regenerate and download.

**"Provisioning profile doesn't include the currently selected device"**: register the UDID, then regenerate the profile. Not needed for TestFlight or App Store.

**"Provisioning profile doesn't support the Push Notifications capability"**: enable the capability on the App ID, then regenerate the profile. Profiles are snapshots.

**"A valid provisioning profile for this executable was not found"** on install: the device is not in the ad hoc profile, or the profile expired.

More Xcode and Capacitor signing failures are covered in the [Capacitor iOS build errors guide](/blog/troubleshooting-capacitor-ios-build-errors/).

**App installs then closes immediately**: on iOS 16 and later, development and ad hoc builds require Developer Mode on the device. See [how to enable Developer Mode on iOS](/blog/enable-ios-developer-mode-ios16/).

**Extensions fail to sign**: each extension target needs its own App ID and profile. Check every target in Signing & Capabilities, not just App.

**"Invalid password" when importing a .p12 made on Linux**: rebuild it with `openssl pkcs12 -export ... -legacy`.

**Upload rejected for SDK version**: since April 2026 App Store Connect requires builds made with Xcode 26 and the iOS 26 SDK. Update Xcode or your CI image. Capacitor 8 already requires Xcode 26.

## Good practices for teams

- One Apple Distribution certificate per team, stored as a `.p12` in a password manager or secrets store, with the password stored separately.
- Never email `.p12` files or commit them to git.
- Use App Store Connect API keys (`.p8`) for uploads instead of Apple ID passwords.
- Name profiles with bundle ID, type and year.
- Revoke certificates of people who leave the team.
- Keep a written list of every bundle ID, extension and capability the app uses.

## Cloud signing for Capacitor apps

You do not need a Mac on every developer's desk to ship iOS builds. [Capgo Build](/native-build/) builds Capacitor apps in the cloud using a `.p12` and profile you provide. Credentials are used only for the build and not stored on Capgo servers. Save them once from the CLI:

```bash
bunx @capgo/cli@latest build credentials save --appId com.example.app --platform ios
bunx @capgo/cli@latest build request com.example.app --platform ios --path .
```

The [Capgo Build iOS docs](/docs/builder/ios/) list the exact credential options, including App Store Connect API keys for TestFlight upload and `ad_hoc` mode for tester builds.

Once your first build is in TestFlight, you can ship JavaScript and asset changes to users with [Capgo live updates](/live-update/) without re-signing a new binary for every fix. Native code changes and new capabilities still require a signed build through the store.

## Next steps

- Need accounts first? [How to create Apple and Google Play developer accounts](/blog/how-to-create-apple-developer-and-google-play-developer-accounts/).
- Ready to hand builds to testers? [How to distribute iOS and Android apps to testers](/blog/distribute-ios-and-android-apps-to-testers/).
- Submitting? Read our [iOS app submission guide](/blog/ios-app-submission/).
