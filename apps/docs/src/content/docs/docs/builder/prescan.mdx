---
title: Build prescan checks
description: Full list of Capgo Cloud Build prescan checks and how to skip or warn on specific rules.
sidebar:
  order: 12
  label: Prescan checks
---

import { Aside, LinkCard, CardGrid } from '@astrojs/starlight/components';

Before Capgo Cloud Build uploads your project, the CLI runs a **prescan** that catches credential, project, and store-config problems locally.

It also runs standalone:

```bash
npx @capgo/cli@latest build prescan <appId> --platform ios
```

There are **80** checks today. Prefer ignoring individual check ids over turning the whole scan off.

## Ignore specific checks

```bash
# Skip one check entirely (example: intentional Capacitor server.url / Next.js shell)
npx @capgo/cli@latest build request <appId> --platform ios \
  --prescan-skip ios/capacitor-server-url-shipped

# Run the check but never block on it (error becomes warning)
npx @capgo/cli@latest build request <appId> --platform ios \
  --prescan-warn ios/capacitor-server-url-shipped

# Repeatable or comma-separated
npx @capgo/cli@latest build request <appId> --platform ios \
  --prescan-skip ios/capacitor-server-url-shipped \
  --prescan-warn ios/capacitor-allow-navigation-wildcard,ios/plist-ats-arbitrary-loads
```

Standalone aliases on `build prescan`:

```bash
npx @capgo/cli@latest build prescan <appId> --platform ios \
  --skip ios/capacitor-server-url-shipped \
  --warn ios/capacitor-server-cleartext
```

Unknown check ids fail fast with a clear error.

<Aside type="tip">
Requires `@capgo/cli@latest` with per-check override support. Prefer `--prescan-skip` / `--prescan-warn` so every other check still protects your build.
</Aside>

## Global escapes (use sparingly)

| Flag | Effect |
| --- | --- |
| `--no-prescan` | Skip the entire scan |
| `--prescan-ignore-fatal` (or `--ignore-fatal` on `build prescan`) | Run scan, print report, never block |
| `--fail-on-warnings` | Treat warnings as fatal (CI) |

`--no-prescan` and `--prescan-ignore-fatal` hide or bypass **all** remaining checks. Use per-check overrides instead when you only disagree with one rule.

## Check catalog

Use the exact id in `--prescan-skip` / `--prescan-warn`.

**Gradual enforce** means the finding is information-only until `2026-08-14`, then it can block builds.

### Shared

| Id | Platforms | What it checks | Gradual enforce |
| --- | --- | --- | --- |
| `shared/apikey-permission` | ios, android | API key can request native builds | — |
| `shared/app-exists` | ios, android | App id exists and is visible to the API key | — |
| `shared/credentials-saved` | ios, android | Required iOS/Android credentials are saved locally | — |
| `shared/cap-sync-stale` | ios, android | Web assets built and Capacitor plugins synced | — |
| `shared/node-linker-layout` | ios, android | node_modules layout works with Capacitor native paths | — |
| `shared/bundle-id-consistency` | ios, android | Capacitor appId matches native bundle id / applicationId | — |

### iOS

| Id | Platforms | What it checks | Gradual enforce |
| --- | --- | --- | --- |
| `ios/p12-opens` | ios | iOS .p12 opens with the provided password | — |
| `ios/p12-expiry` | ios | iOS signing certificate is not expired | — |
| `ios/profile-expiry` | ios | Provisioning profile is not expired | — |
| `ios/profile-bundle-match` | ios | Provisioning profile bundle id matches the app | — |
| `ios/profile-type-vs-mode` | ios | Profile type matches app_store / ad_hoc mode | — |
| `ios/cert-profile-pairing` | ios | Certificate is embedded in the provisioning profile | — |
| `ios/targets-covered` | ios | All iOS targets have a provisioning profile | — |
| `ios/infoplist-sanity` | ios | Info.plist has required version / identity keys | — |
| `ios/asc-key-valid` | ios | App Store Connect API key fields look valid | — |
| `ios/asc-key-access` | ios | ASC API key can access the app (remote) | — |
| `ios/plist-bundle-id-format` | ios | CFBundleIdentifier format is valid | Yes |
| `ios/plist-version-short-format` | ios | CFBundleShortVersionString format is valid | Yes |
| `ios/plist-version-build-format` | ios | CFBundleVersion format is valid | Yes |
| `ios/plist-encryption-compliance` | ios | ITSAppUsesNonExemptEncryption is declared | Yes |
| `ios/plist-ats-arbitrary-loads` | ios | NSAllowsArbitraryLoads is not enabled for production | Yes |
| `ios/plist-launch-storyboard` | ios | Launch screen is declared | Yes |
| `ios/plist-orientations-multitasking` | ios | Orientation / multitasking settings are consistent | Yes |
| `ios/plist-orientations-present` | ios | UISupportedInterfaceOrientations is declared | Yes |
| `ios/plist-display-name` | ios | Display name is set | Yes |
| `ios/plist-background-modes-sanity` | ios | UIBackgroundModes values look valid | Yes |
| `ios/xcode-deployment-target-capacitor` | ios | iOS deployment target meets Capacitor requirements | Yes |
| `ios/xcode-signing-team` | ios | Signing team is set | Yes |
| `ios/xcode-bundle-id-mismatch-across-configs` | ios | Bundle id is consistent across Xcode configs | Yes |
| `ios/xcode-enable-bitcode-leftover` | ios | ENABLE_BITCODE leftover is removed | Yes |
| `ios/xcode-swift-version-sanity` | ios | Swift version setting looks sane | Yes |
| `ios/xcode-no-app-target` | ios | Xcode project has an application target | Yes |
| `ios/xcode-multiple-app-targets` | ios | Multiple app targets are handled intentionally | Yes |
| `ios/entitlements-vs-profile-capability` | ios | Entitlements match profile capabilities | Yes |
| `ios/entitlements-aps-environment-vs-mode` | ios | aps-environment matches distribution mode | Yes |
| `ios/entitlements-associated-domains-format` | ios | Associated Domains format is valid | Yes |
| `ios/entitlements-app-groups-format` | ios | App Groups format is valid | Yes |
| `ios/capacitor-server-url-shipped` | ios | server.url is not left as a live-reload / remote shell endpoint for store builds | Yes |
| `ios/capacitor-server-cleartext` | ios | server.cleartext is not enabled for production | Yes |
| `ios/capacitor-allow-navigation-wildcard` | ios | server.allowNavigation is not a blanket wildcard | Yes |
| `ios/pods-not-installed` | ios | CocoaPods Pods / workspace are present when using Pods | Yes |
| `ios/pods-lock-missing` | ios | Podfile.lock pins pod versions | Yes |
| `ios/pods-capacitor-missing` | ios | Podfile wires Capacitor | Yes |
| `ios/spm-package-resolved-missing` | ios | SPM Package.resolved is present | Yes |
| `ios/spm-capacitor-dependency-missing` | ios | Package.swift declares Capacitor | Yes |
| `ios/appicon-empty-or-placeholder` | ios | AppIcon.appiconset exists and is not empty | Yes |
| `ios/appicon-referenced-file-missing` | ios | Contents.json icon files exist on disk | Yes |
| `ios/appicon-marketing-missing` | ios | 1024×1024 marketing icon exists | Yes |
| `ios/spm-deployment-target-consistency` | ios | SPM deployment target is consistent | Yes |

### Android

| Id | Platforms | What it checks | Gradual enforce |
| --- | --- | --- | --- |
| `android/keystore-opens` | android | Android keystore opens with provided passwords | — |
| `android/keystore-expiry` | android | Android signing cert is not expired | — |
| `android/cordova-vars-present` | android | cordova.variables.gradle is present after cap sync | — |
| `android/gradle-props-heuristics` | android | gradle.properties heuristics for common build breaks | — |
| `android/play-sa-json` | android | Play service-account JSON is present when configured | — |
| `android/flavor-exists` | android | Requested product flavor exists | — |
| `android/agp8-package-attr` | android | Manifest package= attribute removed for AGP 8+ | — |
| `android/manifest-well-formed` | android | AndroidManifest.xml parses | — |
| `android/manifest-tag-typo` | android | Common manifest tag typos | — |
| `android/manifest-namespace-uri` | android | xmlns:android namespace URI is correct | — |
| `android/manifest-missing-prefix` | android | Android attributes use the android: prefix | — |
| `android/manifest-exported-missing` | android | android:exported is set where required | — |
| `android/manifest-multiple-uses-sdk` | android | Only one uses-sdk element | — |
| `android/manifest-duplicate-component` | android | No duplicate components | — |
| `android/manifest-unique-permission` | android | Custom permissions are unique | — |
| `android/manifest-hardcoded-debuggable` | android | debuggable=true not shipped | — |
| `android/manifest-mock-location` | android | ACCESS_MOCK_LOCATION not shipped | — |
| `android/manifest-exported-unprotected` | android | Exported components are protected | — |
| `android/manifest-query-all-packages` | android | QUERY_ALL_PACKAGES justification | — |
| `android/manifest-deeplink-valid` | android | Deeplink intent-filters look valid | — |
| `android/applicationid-present` | android | applicationId is declared in app/build.gradle | — |
| `android/capacitor-build-gradle-applied` | android | capacitor.build.gradle exists when applied | — |
| `android/gradle-wrapper-present` | android | Gradle wrapper files are present | — |
| `android/flavor-dimensions` | android | Flavor dimensions are declared when flavors exist | — |
| `android/google-services-file` | android | google-services.json present when plugin applied | — |
| `android/local-properties-committed` | android | local.properties is not committed with secrets | — |
| `android/sdk-floors` | android | min/compile/target SDK floors look valid | — |
| `android/target-sdk-play` | android | targetSdk meets Play requirements | — |
| `android/min-sdk-capacitor` | android | minSdk meets Capacitor requirements | — |
| `android/version-fields` | android | versionCode / versionName are present | — |
| `android/play-sa-access` | android | Play service account can access the app (remote) | — |

## Example: remote Next.js / server.url shell

Shipping a native shell that loads a production `server.url` is a supported Capacitor pattern. Prescan flags `ios/capacitor-server-url-shipped` because it is often a live-reload leftover.

Acknowledge it without disabling other checks:

```bash
npx @capgo/cli@latest build request <appId> --platform ios \
  --prescan-skip ios/capacitor-server-url-shipped
```

Or keep visibility as a warning:

```bash
npx @capgo/cli@latest build request <appId> --platform ios \
  --prescan-warn ios/capacitor-server-url-shipped
```

## Related

<CardGrid>
  <LinkCard
    title="Getting Started"
    description="Create your first Capgo Cloud Build."
    href="/docs/builder/getting-started/"
  />
  <LinkCard
    title="Troubleshooting"
    description="Common Cloud Build failures and fixes."
    href="/docs/builder/troubleshooting/"
  />
  <LinkCard
    title="CLI build reference"
    description="Full build request / prescan command options."
    href="/docs/cli/reference/build/"
  />
</CardGrid>
