---
slug: capacitor-development-on-linux
title: "Capacitor Development on Linux: The Complete Setup Guide"
description: >-
  Set up a full Capacitor workflow on Ubuntu, Fedora or Arch: Node or Bun, JDK,
  Android SDK, emulator with KVM, USB devices with udev rules, and iOS builds
  without a Mac using Capgo Build.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-10-08T09:00:00.000Z
updated_at: 2026-10-08T09:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor Development on Linux setup guide Capgo blog illustration"
keywords: Capacitor Linux, Ubuntu Capacitor, Android SDK Linux, Capacitor without Mac, Linux mobile development, KVM emulator, udev adb, Capgo Build
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I develop Capacitor apps on Linux?"
    answer: "Yes. Linux is a first-class environment for the web layer and for Android. You install Node or Bun, a JDK, the Android SDK and optionally Android Studio. The only thing Linux cannot do locally is compile and sign the iOS app, because Xcode only runs on macOS. Capgo Build handles iOS builds in the cloud from a Linux machine."
  - question: "Do I need Android Studio on Linux to build a Capacitor app?"
    answer: "No. The Android command line tools (sdkmanager, platform-tools, build-tools) plus a JDK are enough to run cap sync, Gradle builds and the emulator. Android Studio is useful for the visual debugger, profiler and emulator manager, but it is optional."
  - question: "Can I build an iOS app from Linux?"
    answer: "You cannot run Xcode on Linux, so you cannot compile or sign iOS locally. You can generate the ios/ project with Capacitor, sync your web assets into it, and send it to Capgo Build, which compiles and signs it on macOS hardware and can submit it to TestFlight."
  - question: "Why does the Android emulator run slowly on Linux?"
    answer: "The emulator needs hardware acceleration through KVM. Check that virtualization is enabled in your BIOS, install the KVM packages, and add your user to the kvm group. Without KVM the emulator falls back to software rendering and is unusable."
---

Linux is a great platform for Capacitor work. The web layer is just Node tooling, Android tooling runs natively, and the Linux emulator with KVM is often faster than the same emulator on Windows. The single gap is iOS: Xcode only exists on macOS, so you need a cloud build service for that part.

This guide walks through a complete Linux setup, tested on Ubuntu 24.04, Fedora 42 and Arch. It ends with an iOS build from Linux using [Capgo Build](/docs/builder/), so you can ship both stores without owning a Mac.

## What works on Linux and what does not

| Task | Linux |
| --- | --- |
| Web development, Vite, framework tooling | Yes |
| `cap add android`, `cap sync`, Gradle builds | Yes |
| Android emulator | Yes, with KVM |
| Physical Android device over USB | Yes, with udev rules |
| Chrome DevTools remote debugging | Yes |
| `cap add ios`, `cap sync ios` (generate and copy) | Yes, with a warning that CocoaPods is skipped |
| Compile, sign, archive iOS | No, needs macOS. Use Capgo Build |
| iOS Simulator | No |
| Safari Web Inspector for iOS WebView | No |

Everything in the "No" rows moves to the cloud or to a real iPhone with TestFlight. We cover that at the end.

## 1) Install Node or Bun

Capacitor's CLI needs Node 20 or newer. Bun works as a runtime and package manager and is faster for installs.

```bash
# Bun (recommended)
curl -fsSL https://bun.sh/install | bash

# Or Node via your package manager
# Ubuntu / Debian
sudo apt install -y nodejs npm
# Fedora
sudo dnf install -y nodejs
# Arch
sudo pacman -S nodejs npm
```

Check versions:

```bash
bun --version
node --version
```

## 2) Install a JDK

Capacitor 7 and 8 require JDK 21. Distribution packages are fine.

```bash
# Ubuntu / Debian
sudo apt install -y openjdk-21-jdk

# Fedora
sudo dnf install -y java-21-openjdk-devel

# Arch
sudo pacman -S jdk21-openjdk
```

Set `JAVA_HOME` in `~/.bashrc` or `~/.zshrc`. The path depends on the distribution:

```bash
# Ubuntu / Debian
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
# Fedora
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
# Arch
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
```

If you have more than one JDK installed, Gradle picks whichever `JAVA_HOME` points to. A wrong version shows up as `Unsupported class file major version` during `cap run android`.

## 3) Install the Android SDK

You have two options. Android Studio gives you the GUI tools. The command line tools alone are lighter and enough for building.

### Option A: Android Studio

Download the Linux tarball from the Android Studio site and extract it:

```bash
sudo tar -xzf android-studio-*.tar.gz -C /opt
/opt/android-studio/bin/studio.sh
```

On first launch the setup wizard installs the SDK into `~/Android/Sdk`.

Capacitor's `cap open android` needs to know where Studio lives:

```bash
export CAPACITOR_ANDROID_STUDIO_PATH=/opt/android-studio/bin/studio.sh
```

### Option B: Command line tools only

```bash
mkdir -p ~/Android/Sdk/cmdline-tools
cd ~/Android/Sdk/cmdline-tools
# Download "Command line tools only" for Linux from the Android developer site, then:
unzip commandlinetools-linux-*.zip
mv cmdline-tools latest
```

Add the SDK to your shell profile:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

Install what Capacitor needs and accept the licenses:

```bash
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0" "emulator"
sdkmanager --licenses
```

Match the platform version to the `compileSdkVersion` in your generated `android/variables.gradle`. Capacitor 8 uses 36; Capacitor 7 uses 35.

## 4) Enable KVM for the emulator

Without KVM the emulator is unusable. Check that your CPU exposes virtualization:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

A result above 0 means it is supported. Install KVM and give your user access:

```bash
# Ubuntu / Debian
sudo apt install -y qemu-kvm
# Fedora
sudo dnf install -y qemu-kvm
# Arch
sudo pacman -S qemu-base

sudo usermod -aG kvm $USER
```

Log out and back in. Create and start a device:

```bash
sdkmanager "system-images;android-36;google_apis;x86_64"
avdmanager create avd -n pixel8 -k "system-images;android-36;google_apis;x86_64" -d pixel_8
emulator -avd pixel8
```

If the emulator complains about `/dev/kvm` permissions, your group change did not apply yet. Reboot.

## 5) USB access for physical devices

Linux does not let regular users talk to USB devices by default. Add a udev rule:

```bash
sudo tee /etc/udev/rules.d/51-android.rules > /dev/null <<'EOF'
SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTR{idVendor}=="2a70", MODE="0666", GROUP="plugdev"
EOF
sudo udevadm control --reload-rules
sudo usermod -aG plugdev $USER
```

The vendor IDs above cover Google, Samsung and OnePlus. Find yours with `lsusb` if your phone is not listed. Enable USB debugging on the phone, plug it in, accept the fingerprint prompt, then:

```bash
adb devices
```

## 6) Create the Capacitor project

```bash
bun create vite@latest my-app
cd my-app
bun install
bun add @capacitor/core @capacitor/android @capacitor/ios
bun add -d @capacitor/cli
bunx cap init
bun run build
bunx cap add android
bunx cap add ios
```

`cap add ios` on Linux prints a warning that CocoaPods is unavailable. That is expected. The `ios/` folder is still created and is what Capgo Build compiles later.

Run on the emulator or device:

```bash
bunx cap run android
```

Debug the WebView in Chrome at `chrome://inspect`.

## 7) Release builds on Linux

Android release builds are fully local. Generate a keystore with the JDK's `keytool`:

```bash
keytool -genkeypair -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release
```

Then build:

```bash
cd android
./gradlew bundleRelease
```

The AAB lands in `android/app/build/outputs/bundle/release/`. If you prefer not to keep signing keys on laptops, [Capgo Build for Android](/docs/builder/android/) stores the keystore once and builds in the cloud from the same CLI you use for iOS.

## 8) iOS from Linux with Capgo Build

This is the step Linux cannot do alone. The workflow:

1. Build your web assets and sync them into `ios/`.
2. Save your iOS signing credentials once.
3. Request a cloud build. Capgo compiles, signs and can upload to TestFlight.

```bash
bun run build
bunx cap sync ios

bunx @capgo/cli@latest login
bunx @capgo/cli@latest build init --platform ios
bunx @capgo/cli@latest build request com.example.app --platform ios --build-mode release
```

`build init` walks you through credentials. On Linux you create the App Store Connect API key manually in the Apple portal; the [iOS build guide](/docs/builder/ios/) shows every click. For the distribution certificate you never need Keychain Access: generate the CSR and `.p12` with OpenSSL as described in [iOS certificates and provisioning profiles explained](/blog/ios-certificates-and-provisioning-profiles-explained/), or use the [iOS certificate generator](/tools/ios-certificate-generator/).

Logs stream live into your terminal. The full Linux to TestFlight flow is detailed in [Build an iOS app from Linux with Capacitor and Capgo Build](/blog/build-ios-app-from-linux-capacitor-capgo-build/).

## 9) Skip native rebuilds with Live Updates

Once the native shells are in the stores, most day-to-day changes are JavaScript, HTML and CSS. Those can ship from Linux in seconds with [Capgo Live Updates](/docs/live-updates/):

```bash
bunx @capgo/cli@latest init
bun run build
bunx @capgo/cli@latest bundle upload --channel production
```

Reserve native builds for plugin changes, permission changes and Capacitor upgrades.

## Common Linux issues

- **`SDK location not found`**: `ANDROID_HOME` is not exported in the shell that runs Gradle. Add it to your profile and open a new terminal, or create `android/local.properties` with `sdk.dir=/home/you/Android/Sdk`.
- **`Unsupported class file major version`**: wrong JDK. Point `JAVA_HOME` to JDK 21.
- **Emulator black screen or very slow**: KVM is not active. Check `ls -l /dev/kvm` and your group membership.
- **`adb devices` shows `no permissions`**: udev rule missing or not reloaded. Unplug and replug after reloading.
- **Gradle daemon runs out of memory**: add `org.gradle.jvmargs=-Xmx4g` to `android/gradle.properties`.
- **Wayland and Android Studio glitches**: launch Studio with `_JAVA_AWT_WM_NONREPARENTING=1` if windows stay blank.

## Summary

Linux handles the full Capacitor loop for Android and the web layer natively, and often faster than other desktops. For iOS, generate the project locally, sync your assets, and let Capgo Build do the macOS part. Pair that with Live Updates and the only time you think about Xcode is when Apple changes its minimum SDK.
