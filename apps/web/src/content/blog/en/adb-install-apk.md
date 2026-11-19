---
slug: adb-install-apk
title: 'ADB Install APK: Command, Flags, and Troubleshooting'
description: >-
  Install an APK with adb install path/to/app.apk. Enable USB debugging, verify
  with adb devices, use -r -d -g -t flags, Wi-Fi install, split APKs, launch,
  uninstall, and fix common failure messages.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-07-02T09:27:56.807Z
updated_at: 2026-11-11T16:57:00.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/7605a097-3d24-4730-801e-be555fdef352/adb-install-apk-guide.jpg'
head_image_alt: 'ADB Install APK command, flags, and troubleshooting Capgo blog'
keywords: >-
  adb install apk, adb apk install, install apk via adb, apk guide, adb enable
  new apk, adb run apk, android debug bridge install, sideload apk adb
tag: 'Mobile, Capacitor, Android'
published: true
locale: en
origin: ai
next_blog: ''
faq:
  - question: What is the adb install apk command?
    answer: >-
      Run adb install followed by the path to your APK file, for example adb
      install path/to/app.apk. ADB copies the package to the device and calls
      the system package installer. If the app is already installed, add -r to
      replace it while keeping data when possible.
  - question: How do I install an APK via adb step by step?
    answer: >-
      Install Android SDK Platform Tools on your computer, enable USB debugging
      on the phone, connect with USB, run adb devices and accept the RSA prompt,
      then run adb install your-app.apk. You should see Performing Streamed
      Install and Success when the install completes.
  - question: What does adb install -r do?
    answer: >-
      The -r flag reinstalls or updates an existing app. Without it, adb install
      often fails when the same package name is already on the device. Daily
      debug builds usually use adb install -r app-debug.apk.
  - question: How do I install an APK over Wi-Fi with adb?
    answer: >-
      On Android 11 and later, pair once with adb pair IP:PORT and the pairing
      code from Wireless debugging in Developer options, then adb connect
      IP:PORT. Older workflows use adb tcpip 5555 over USB first. After connect,
      adb install works the same as over USB.
  - question: How do I install split APKs with adb?
    answer: >-
      For a bundle extract, use adb install-multiple with the base APK plus the
      splits that match the device (ABI, density, language) and any install-time
      feature APKs, or run bundletool install-apks on an .apks set. For Gradle
      per-ABI standalone APKs, install only the one file that matches the device
      CPU with adb install. Add -r when updating an existing install.
  - question: Why does adb install say failure INSTALL_FAILED_TEST_ONLY?
    answer: >-
      The APK is marked testOnly and the device blocks a normal install. Use adb
      install -t to allow test-only packages. Use that only for builds you trust,
      not for random APKs from unknown sources.
---
**Quick answer:** Connect a phone with USB debugging on, confirm it with `adb devices`, then run `adb install path/to/app.apk`. For an update over an existing install, use `adb install -r path/to/app.apk`.

```bash
adb install path/to/app.apk
adb install -r path/to/app.apk
```

Minimum steps:

1. Install [SDK Platform Tools](https://developer.android.com/tools/releases/platform-tools) and ensure `adb` is on your PATH.
2. On the phone, enable [Developer options and USB debugging](https://capgo.app/blog/how-to-enable-developer-options-on-android/).
3. Connect USB, unlock the phone, accept **Allow USB debugging**.
4. Run `adb devices` and confirm the serial shows `device`, not `unauthorized`.
5. Run `adb install path/to/app.apk`.

If you ship Android builds from Capacitor or Ionic, this loop is how you put a fresh APK on hardware without waiting on Play Console. For store rollout after testing, see [Google Play staged rollouts](https://capgo.app/blog/google-play-staged-rollouts-how-it-works/).

## Table of Contents

- [Install Platform Tools and verify adb](#install-platform-tools-and-verify-adb)
- [Core adb install apk workflow](#core-adb-install-apk-workflow)
- [adb install flags](#adb-install-flags)
- [Multiple devices with -s](#multiple-devices-with--s)
- [Install APK over Wi-Fi](#install-apk-over-wi-fi)
- [Split APKs with install-multiple](#split-apks-with-install-multiple)
- [Launch the app after install](#launch-the-app-after-install)
- [Uninstall with adb](#uninstall-with-adb)
- [Capacitor example](#capacitor-example)
- [Troubleshooting install errors](#troubleshooting-install-errors)

<a id="install-platform-tools-and-verify-adb"></a>

## Install Platform Tools and verify adb

You do not need the full Android Studio download for `adb install`. You need **Platform Tools** from Google.

1. Download Platform Tools for your OS.
2. Unzip to a fixed folder.
3. Add that folder to your PATH.

Verify:

```bash
adb version
```

On the device, turn on USB debugging as described in the [Android developer options guide](https://capgo.app/blog/how-to-enable-developer-options-on-android/). Some OEM skins (Xiaomi MIUI is a common case) also require **Install via USB** or similar under developer settings.

Use a data cable. Charging-only cables produce empty `adb devices` lists and waste time.

<a id="core-adb-install-apk-workflow"></a>

## Core adb install apk workflow

Always check the connection before you install.

```bash
adb devices
```

Expected healthy output:

```text
List of devices attached
XXXXXXXX    device
```

Install:

```bash
adb install path/to/your-app.apk
```

Quote paths that contain spaces. From the APK directory:

```bash
adb install app-debug.apk
```

A successful run typically prints **Performing Streamed Install** and **Success**. Under the hood, `adb install` pushes the file to `/data/local/tmp`, runs `pm install`, and removes the temp file. That is simpler than manual `adb push` plus a shell `pm install` for everyday testing.

For Capacitor environment setup beyond ADB, see [Android setup for Capacitor apps](https://capgo.app/blog/android-setup-for-capacitor-apps/).

<a id="adb-install-flags"></a>

## adb install flags

| Flag | Meaning | When to use |
| --- | --- | --- |
| `-r` | Replace existing app, keep data when possible | Debug rebuilds, same package name |
| `-d` | Allow downgrade on debuggable apps only | Rolling back a debug build over a newer debug build |
| `-g` | Grant all runtime permissions at install | Faster QA when permissions block launch |
| `-t` | Allow test-only APKs | Internal testOnly builds from CI |

Common combinations:

```bash
adb install -r app-debug.apk
adb install -r -g app-debug.apk
adb install -r -d older-build.apk
adb install -r -t internal-test.apk
```

**`-r`** is the default habit for iterative development. Without it, Android often returns `INSTALL_FAILED_ALREADY_EXISTS` when the package is already present.

**`-d`** allows downgrades only when the installed package is debuggable. It does not downgrade a non-debuggable release from Play. Without `-d`, a lower `versionCode` triggers `INSTALL_FAILED_VERSION_DOWNGRADE`.

**`-g`** skips the permission dialog on install. It does not remove the need to test permission flows on a clean install.

**`-t`** is required when the manifest sets `android:testOnly="true"`. Without it you get `INSTALL_FAILED_TEST_ONLY`.

Release builds must be signed consistently. If you generate a new upload key, the [Android keystore generator](https://capgo.app/tools/android-keystore-generator/) documents fingerprints and PKCS#12 output. Signing with a different key than the installed app produces `INSTALL_FAILED_UPDATE_INCOMPATIBLE`.

<a id="multiple-devices-with--s"></a>

## Multiple devices with -s

When more than one device or emulator is attached, `adb install` may fail with **more than one device/emulator**. List serials:

```bash
adb devices
```

Target one serial with `-s`:

```bash
adb -s SERIAL install -r app-debug.apk
```

Replace `SERIAL` with the value from the first column of `adb devices`.

<a id="install-apk-over-wi-fi"></a>

## Install APK over Wi-Fi

**Android 11 and later (Wireless debugging):**

Put the phone and computer on the same Wi-Fi network.

1. On the phone: **Settings → Developer options → Wireless debugging → Pair device with pairing code**. Note the pairing IP, port, and six-digit code.
2. On the computer, pair:

```bash
adb pair IP:PAIRING_PORT
```

Enter the pairing code when prompted.

1. Connect to the debug port shown on the Wireless debugging screen:

```bash
adb connect IP:DEBUG_PORT
adb devices
```

1. Unplug USB if both USB and Wi-Fi devices appear in `adb devices`, or target Wi-Fi explicitly:

```bash
adb -s IP:DEBUG_PORT install -r app-debug.apk
```

**Older Android (USB first):**

```bash
adb tcpip 5555
adb connect PHONE_IP:5555
```

Unplug USB after `adb devices` shows the TCP endpoint. Firewall and network isolation can block Wi-Fi ADB on corporate LANs.

<a id="split-apks-with-install-multiple"></a>

## Split APKs with install-multiple

Play Store App Bundles unpack to a **base APK plus configuration splits** (density, ABI, language) and sometimes install-time feature modules. Install the base APK and every split that matches the target device in one command:

```bash
adb install-multiple -r base.apk split_config.xxhdpi.apk split_config.arm64_v8a.apk
```

Pass only splits from the same bundle extract that fit the connected device. A missing or wrong split causes `INSTALL_FAILED_INVALID_APK` or incomplete installs.

To sideload from a `.apks` archive, `bundletool install-apks --apks=app.apks` is often simpler than listing files by hand.

That is different from **ABI split APKs** when Gradle builds separate standalone APKs per architecture (`app-armeabi-v7a-debug.apk`, `app-arm64-v8a-debug.apk`, and so on). Each of those files is a full app. Pick the one that matches the device CPU and run `adb install -r` on that single file. Do not pass every APK in the output folder to `install-multiple`.

<a id="launch-the-app-after-install"></a>

## Launch the app after install

**Known launcher activity** (from `AndroidManifest.xml`):

```bash
adb shell am start -n com.example.app/.MainActivity
```

**Quick smoke test** when you only know the package name:

```bash
adb shell monkey -p com.example.app -c android.intent.category.LAUNCHER 1
```

`monkey` fires one launch intent. It is not a full UI test, but it confirms the app opens after install.

View logs:

```bash
adb logcat
```

<a id="uninstall-with-adb"></a>

## Uninstall with adb

Remove by package name (not APK path):

```bash
adb uninstall com.example.app
```

This removes the app and its data. Use it for first-launch tests and before fixing a signing mismatch.

To remove the app but leave user data on the device:

```bash
adb uninstall -k com.example.app
```

`-k` can make the next install reuse old preferences or databases, so skip it when you need a true clean install. Use `adb install -r` when you only need a faster update loop over an existing install.

<a id="capacitor-example"></a>

## Capacitor example

Typical Capacitor loop:

```bash
npx cap sync android
```

Build the debug APK, then:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

Sign release APKs with your **upload key** before Play upload. With Play App Signing, store downloads use Google's **app signing certificate**, which may differ from your upload certificate. You can update over ADB only when the APK certificate matches the installed app and normal update rules pass. Compare signing certificates before you uninstall. If they differ, test with an APK from an internal testing track (signed like the Play build) instead of a local upload-signed file. Uninstalling the Play build removes app data.

<a id="troubleshooting-install-errors"></a>

## Troubleshooting install errors

| Error or symptom | Likely cause | What to try |
| --- | --- | --- |
| `unauthorized` in `adb devices` | RSA prompt not accepted | Unlock phone, approve USB debugging, `adb kill-server` then `adb start-server` |
| `no devices/emulators found` | Cable, driver, or debugging off | New cable, enable USB debugging, Windows Google USB driver if needed |
| `INSTALL_FAILED_ALREADY_EXISTS` | Same package without `-r` | `adb install -r app.apk` or `adb uninstall` first |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Different signing key | Uninstall old app, or install build signed with same key |
| `INSTALL_FAILED_VERSION_DOWNGRADE` | Lower versionCode on non-debuggable app | Uninstall, bump version, or use `-d` only on debuggable packages |
| `INSTALL_FAILED_INSUFFICIENT_STORAGE` | Low disk space | Free space on device, remove unused apps |
| `INSTALL_FAILED_TEST_ONLY` | testOnly APK | `adb install -t app.apk` for trusted test builds only |
| `INSTALL_FAILED_INVALID_APK` | Corrupt or wrong split set | Rebuild APK, pass all splits to `install-multiple` |
| `more than one device/emulator` | Several targets connected | `adb -s SERIAL install ...` |

### device unauthorized

`adb devices` shows:

```text
XXXXXXXX    unauthorized
```

Fix on the phone, not only in the terminal:

1. Replug USB and dismiss the lock screen.
2. Tap **Allow** on **Allow USB debugging?**
3. Check **Always allow from this computer** for your dev machine.
4. Restart ADB:

```bash
adb kill-server
adb start-server
adb devices
```

### no devices/emulators found

- Confirm USB debugging is on (see [developer options](https://capgo.app/blog/how-to-enable-developer-options-on-android/)).
- Try another USB port and cable.
- On Windows, install the Google USB driver from SDK Manager if the OEM driver is missing.
- For emulators, start the AVD before `adb install`.

### INSTALL_FAILED_UPDATE_INCOMPATIBLE

The installed app was signed with a different certificate than the APK you are pushing. Common when mixing debug and release, when Play App Signing holds a different key than your upload APK, or after key rotation.

First confirm you are installing a build signed with the same certificate as the app on the device. Use a Play testing-track APK when you need to match a production install.

If you must replace the install, uninstall deletes app data. Back up anything you need, then:

```bash
adb uninstall com.example.app
adb install app.apk
```

### INSTALL_FAILED_VERSION_DOWNGRADE

The APK `versionCode` is lower than the installed version.

For debuggable packages only, intentional rollback testing:

```bash
adb install -r -d older.apk
```

On release builds from Play, uninstall first or raise `versionCode` instead of using `-d`.

### INSTALL_FAILED_INSUFFICIENT_STORAGE

The device cannot allocate space for the package. Remove apps or media, then retry. Very large APKs on low-storage test phones hit this often.

### INSTALL_FAILED_TEST_ONLY

The build is marked test-only. For your own CI artifacts:

```bash
adb install -t -r app.apk
```

Do not use `-t` to sideload untrusted APKs.

---

For Capacitor teams that fix JavaScript, styles, and config without waiting on store review, [Capgo](https://capgo.app/) supports signed live updates, channels, and rollbacks alongside native store releases.
