---
slug: capacitor-wsl2-windows-setup
title: "Capacitor Development with WSL2 on Windows"
description: >-
  Run your Capacitor web toolchain inside WSL2 while the Android emulator and
  devices stay on Windows: adb bridging, mirrored networking, file system
  performance, live reload, and iOS builds with Capgo Build.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-10-08T09:20:00.000Z
updated_at: 2026-10-08T13:30:13.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor development with WSL2 on Windows Capgo blog illustration"
keywords: WSL2 Capacitor, WSL Android emulator, adb WSL2, Capacitor Windows Linux, usbipd, mirrored networking, Capgo Build
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I run the Android emulator inside WSL2?"
    answer: "Technically possible but not recommended. WSL2 has no nested virtualization by default and no GPU passthrough for the emulator. Run the emulator on Windows and connect to it from WSL2 by pointing the WSL adb client at the Windows adb server."
  - question: "How do I use adb from WSL2 with a phone plugged into Windows?"
    answer: "Either forward the USB device into WSL2 with usbipd-win, or keep adb on Windows and set ADB_SERVER_SOCKET in WSL2 to the Windows host IP on port 5037. The second option is simpler and also works for the emulator."
  - question: "Where should my Capacitor project live, in WSL2 or on the Windows drive?"
    answer: "Inside the WSL2 file system, for example /home/you/dev. Projects under /mnt/c are several times slower for node_modules and Gradle, and file watchers for live reload often miss changes there."
  - question: "Can I build iOS from WSL2?"
    answer: "Not locally, since Xcode needs macOS. WSL2 runs the Capacitor CLI and cap sync ios fine, then Capgo Build compiles and signs the ios/ project in the cloud and can submit to TestFlight."
---

WSL2 gives Windows developers a real Linux shell, which matters when your team's scripts, Dockerfiles and CI all assume bash. For Capacitor it works well, with one rule: keep the web toolchain in WSL2 and keep the Android emulator, USB devices and Android Studio on Windows. Then bridge the two with adb.

This guide shows that setup, the networking details that trip people up, and how iOS fits in through [Capgo Build](/docs/builder/).

## When WSL2 is worth it

Use WSL2 when:

- Your repo has bash scripts, Makefiles or Husky hooks that break in PowerShell.
- You run the same Docker images locally and in CI.
- You want the Linux `node_modules` layout so lockfiles match your Linux CI.

Skip WSL2 when you only need Android Studio and a terminal. The [native Windows guide](/blog/capacitor-development-on-windows/) is simpler in that case.

## 1) Install WSL2 and a distribution

From an elevated PowerShell:

```powershell
wsl --install -d Ubuntu
```

Reboot, open Ubuntu, create your Linux user. Update and install the basics:

```bash
sudo apt update && sudo apt install -y build-essential unzip openjdk-21-jdk
curl -fsSL https://bun.sh/install | bash
```

## 2) Keep the project in the Linux file system

Create your projects under your Linux home, not under `/mnt/c`:

```bash
mkdir -p ~/dev && cd ~/dev
bun create vite@latest my-app
cd my-app
bun install
```

Access the files from Windows tools through `\\wsl$\Ubuntu\home\you\dev\my-app`. VS Code with the WSL extension opens it directly with `code .`.

Why this matters: cross-file-system access through `/mnt/c` is slow for the thousands of small files in `node_modules`, and inotify watchers used by Vite do not fire reliably for files on the Windows drive.

## 3) Decide where the Android SDK lives

Two workable layouts:

**Layout A (recommended): SDK on Windows, Gradle in WSL2 pointing at a Linux SDK copy.** Install Android Studio on Windows for the emulator and GUI tools, and install a separate command line SDK inside WSL2 for Gradle:

```bash
mkdir -p ~/Android/Sdk/cmdline-tools && cd ~/Android/Sdk/cmdline-tools
# download commandlinetools-linux-*.zip from the Android developer site
unzip commandlinetools-linux-*.zip && mv cmdline-tools latest
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
sdkmanager --licenses
```

Yes, it duplicates a few hundred megabytes. In exchange, Gradle runs at Linux speed and never touches `/mnt/c`.

**Layout B: everything on Windows, WSL2 only for the web build.** You run `bun run build` in WSL2 and `cap sync` plus `gradlew` from PowerShell on the same files through `\\wsl$`. It works but is slower and mixes two shells. Only pick it if you cannot install anything in WSL2.

The rest of this guide assumes Layout A.

## 4) Bridge adb between WSL2 and Windows

The emulator and USB phones are attached to Windows. The WSL2 Gradle build and `cap run android` need to reach them. Keep a single adb server on Windows and let WSL2 be a client.

On Windows, start the adb server listening on all interfaces. Use the adb from the Windows SDK:

```powershell
adb kill-server
adb -a -P 5037 nodaemon server
```

Leave that window open. Allow port 5037 through the Windows firewall for the WSL virtual adapter if prompted.

In WSL2, point the adb client at the Windows host:

```bash
export WSL_HOST=$(ip route show default | awk '{print $3}')
export ADB_SERVER_SOCKET=tcp:$WSL_HOST:5037
adb devices
```

The emulator or your phone now shows up inside WSL2. The two adb binaries must be the same major version, so update `platform-tools` on both sides at the same time.

### Mirrored networking simplifies this

On Windows 11 22H2 or newer, enable mirrored networking so WSL2 shares the Windows network stack. Create or edit `%USERPROFILE%\.wslconfig`:

```ini
[wsl2]
networkingMode=mirrored
```

Run `wsl --shutdown`, reopen Ubuntu, then use `ADB_SERVER_SOCKET=tcp:127.0.0.1:5037`. The host IP no longer changes at every reboot, and live reload gets simpler too.

### Alternative: pass the USB device into WSL2

If you want adb fully inside WSL2 for a physical phone, use usbipd-win:

```powershell
winget install usbipd
usbipd list
usbipd bind --busid 2-3
usbipd attach --wsl --busid 2-3
```

Then add the udev rule from the [Linux guide](/blog/capacitor-development-on-linux/#5-usb-access-for-physical-devices) inside WSL2. This does not help for the emulator, which stays a network connection.

## 5) Run the app

With adb bridged, Capacitor works like on Linux:

```bash
bun add @capacitor/core @capacitor/android @capacitor/ios
bun add -d @capacitor/cli
bunx cap init
bun run build
bunx cap add android
bunx cap add ios
bunx cap run android
```

`cap open android` wants Android Studio on the same machine. Instead, open the `android/` folder in Windows Android Studio through `\\wsl$\Ubuntu\home\you\dev\my-app\android`. Studio's bundled Gradle then builds on Windows while your terminal builds in WSL2; both share the same source files.

## 6) Live reload across the boundary

Vite runs in WSL2, the app runs on a Windows emulator or a phone. The emulator must reach the dev server.

Start Vite bound to all interfaces:

```bash
bun run dev -- --host 0.0.0.0
```

Point Capacitor at it in `capacitor.config.ts`:

```ts
const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  server: {
    url: 'http://10.0.2.2:5173',
    cleartext: true,
  },
};
```

`10.0.2.2` is the emulator's alias for the host machine. With mirrored networking the WSL2 port is visible on the Windows host, so this address reaches Vite. Without mirrored networking, forward the port on Windows first:

```powershell
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=$(wsl hostname -I)
```

For a USB phone, replace the URL with your Windows LAN IP and allow port 5173 through the Windows firewall. Run `bunx cap sync android` after changing the config, and remove the `server` block before building a release.

## 7) iOS from WSL2 with Capgo Build

Xcode needs macOS, so WSL2 handles everything up to the native compile and Capgo does the rest:

```bash
bun run build
bunx cap sync ios
bunx @capgo/cli@latest login
bunx @capgo/cli@latest build init --platform ios
bunx @capgo/cli@latest build request com.example.app --platform ios --build-mode release
```

The CLI uploads the prepared `ios/` project and streams logs back into your WSL2 terminal. Signing material is created without a Mac, with OpenSSL or the [iOS certificate generator](/tools/ios-certificate-generator/). Full details are in [Build an iOS app from Linux with Capacitor and Capgo Build](/blog/build-ios-app-from-linux-capacitor-capgo-build/), which applies to WSL2 unchanged.

## 8) Avoid native builds for daily changes

Once both apps are in the stores, [Capgo Live Updates](/docs/live-updates/) push web changes from WSL2 without touching Gradle or Capgo Build:

```bash
bunx @capgo/cli@latest bundle upload --channel production
```

## Common WSL2 issues

- **`adb: device offline` or empty list in WSL2**: the Windows adb server is not running with `-a`, or the versions differ. Restart it and compare `adb version` on both sides.
- **Host IP changed after reboot**: expected without mirrored networking. Put the `WSL_HOST` export in `~/.bashrc` so it is recomputed, or switch to mirrored mode.
- **Vite does not see file changes**: project is under `/mnt/c`. Move it to the Linux home.
- **Gradle extremely slow**: same cause, or the Gradle cache is on `/mnt/c`. Keep `~/.gradle` in WSL2.
- **Clock drift breaks Apple API authentication during `build init`**: WSL2 clocks drift after sleep. Run `sudo hwclock -s` and retry.
- **`cap open android` fails**: Studio is on Windows. Open the folder from Studio instead.

## Summary

WSL2 is a good home for the Capacitor web toolchain when your team lives in bash. Keep the emulator and devices on Windows, bridge them with one adb server, keep files in the Linux file system, and let Capgo Build take the iOS compile. The result is a Linux workflow on a Windows laptop that still ships to both app stores.
