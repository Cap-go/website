---
slug: capacitor-development-on-windows
title: "Capacitor Development on Windows: The Complete Setup Guide"
description: >-
  Set up Capacitor on Windows 11: Node or Bun, JDK 21, Android Studio and the
  emulator, USB debugging, PowerShell fixes, long path issues, and iOS builds
  without a Mac using Capgo Build.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-10-08T09:10:00.000Z
updated_at: 2026-10-08T09:10:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor Development on Windows setup guide Capgo blog illustration"
keywords: Capacitor Windows, Windows 11 Capacitor, Android Studio Windows, Capacitor without Mac, iOS from Windows, PowerShell execution policy, Capgo Build
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I build a Capacitor app on Windows?"
    answer: "Yes. Windows runs the full web toolchain and the full Android toolchain, including Android Studio, the emulator and Gradle release builds. iOS compilation needs macOS, so Windows developers use a cloud macOS build such as Capgo Build to produce the signed IPA and submit to TestFlight."
  - question: "Do I need WSL to develop Capacitor apps on Windows?"
    answer: "No. Native Windows with PowerShell or Windows Terminal works for Node, Bun, Gradle and Android Studio. WSL2 is optional and mostly useful if your team scripts assume a Linux shell. If you use WSL2, keep the Android emulator on the Windows side and bridge adb."
  - question: "Can I build an iOS app on Windows?"
    answer: "Not locally. Xcode does not run on Windows. Generate the ios/ project with Capacitor, run cap sync, and send it to Capgo Build. It compiles and signs on macOS hardware in the cloud and can upload straight to TestFlight."
  - question: "Why does bunx cap or npx cap fail with 'running scripts is disabled' on Windows?"
    answer: "PowerShell blocks .ps1 shims by default. Run Set-ExecutionPolicy -Scope CurrentUser RemoteSigned once, or use the .cmd shims by calling bunx.cmd or npx.cmd."
---

Most Capacitor documentation assumes a Mac. If you develop on Windows, the web layer and Android work the same, with a few Windows-specific traps around PowerShell, path lengths and the emulator. iOS is the one piece Windows cannot compile, and the fix is a cloud macOS build.

This guide is the complete Windows 11 setup, from a blank machine to an Android build on a device and an iOS build in TestFlight through [Capgo Build](/docs/builder/).

## What works on Windows and what does not

| Task | Windows |
| --- | --- |
| Web development, Vite, framework tooling | Yes |
| `cap add android`, `cap sync`, Gradle builds | Yes |
| Android emulator | Yes, with Hyper-V or WHPX |
| Physical Android device over USB | Yes |
| Chrome DevTools remote debugging | Yes |
| `cap add ios`, `cap sync ios` (generate and copy) | Yes, with a CocoaPods warning |
| Compile, sign, archive iOS | No, needs macOS. Use Capgo Build |
| iOS Simulator | No |
| Safari Web Inspector for iOS WebView | No |

## 1) Install Node or Bun

Use `winget` from PowerShell:

```powershell
winget install OpenJS.NodeJS.LTS
# Or Bun
winget install Oven-sh.Bun
```

Open a new terminal and confirm:

```powershell
node --version
bun --version
```

### Fix the PowerShell execution policy

`bunx cap`, `npx cap` and most CLI shims are `.ps1` scripts. A fresh Windows blocks them with `running scripts is disabled on this system`. Allow local scripts once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## 2) Install JDK 21

Capacitor 7 and 8 require JDK 21. Android Studio ships its own JBR, but a system JDK avoids surprises when running Gradle from a terminal.

```powershell
winget install Microsoft.OpenJDK.21
```

Set `JAVA_HOME` for your user. From PowerShell:

```powershell
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Microsoft\jdk-21.0.8.9-hotspot", "User")
```

Adjust the folder to the version you installed. Restart the terminal afterwards.

## 3) Install Android Studio and the SDK

```powershell
winget install Google.AndroidStudio
```

Launch Android Studio and let the setup wizard install the SDK to `C:\Users\<you>\AppData\Local\Android\Sdk`. Then set the environment variables Gradle and Capacitor look for:

```powershell
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdk, "User")
$path = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$path;$sdk\platform-tools;$sdk\emulator", "User")
```

Open Android Studio's SDK Manager and install the platform that matches your Capacitor version: API 36 for Capacitor 8, API 35 for Capacitor 7.

## 4) Make the emulator fast

The emulator needs hardware virtualization. On Windows 11 the emulator uses the Windows Hypervisor Platform. Enable it:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform
```

Reboot. If Android Studio's Device Manager still warns about acceleration, check that virtualization is enabled in your BIOS or UEFI and that Core Isolation (Memory Integrity) is not blocking it on older CPUs.

Create a device in Device Manager, or from a terminal:

```powershell
sdkmanager "system-images;android-36;google_apis;x86_64"
avdmanager create avd -n pixel8 -k "system-images;android-36;google_apis;x86_64" -d pixel_8
emulator -avd pixel8
```

## 5) USB debugging on Windows

Enable Developer options and USB debugging on the phone. Most phones no longer need a driver, but if `adb devices` stays empty, install Google's USB driver through the SDK Manager (SDK Tools tab) or the vendor driver for Samsung devices.

```powershell
adb devices
```

Accept the fingerprint prompt on the phone the first time.

## 6) Windows-specific project fixes

Three settings save hours on Windows:

**Long paths.** Gradle and `node_modules` can exceed the 260-character limit. Enable long paths once:

```powershell
git config --global core.longpaths true
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

The second command needs an elevated PowerShell.

**Defender exclusions.** Real-time scanning of `node_modules`, the Gradle cache and the Android SDK slows builds noticeably. Exclude those folders in Windows Security, or from an elevated PowerShell:

```powershell
Add-MpPreference -ExclusionPath "$env:USERPROFILE\.gradle"
Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\Android\Sdk"
Add-MpPreference -ExclusionPath "C:\dev"
```

Keep your projects in a short path such as `C:\dev\my-app`, not under OneDrive-synced Documents.

**Line endings.** Gradle's `gradlew` shell script must keep LF endings or Linux CI breaks. Add a `.gitattributes`:

```text
*.sh text eol=lf
gradlew text eol=lf
```

## 7) Create the Capacitor project

```powershell
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

`cap add ios` on Windows warns that CocoaPods is not available. That is expected; the `ios/` folder is still generated and committed, and the cloud build runs `pod install` later.

Run on the emulator or a USB device:

```powershell
bunx cap run android
```

Debug the WebView in Chrome at `chrome://inspect`.

## 8) Android release builds

```powershell
keytool -genkeypair -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release
cd android
.\gradlew.bat bundleRelease
```

The AAB is in `android\app\build\outputs\bundle\release\`. For a team, the keystore is better off saved once in Capgo and built in the cloud; see [Capgo Build for Android](/docs/builder/android/).

## 9) iOS from Windows with Capgo Build

Xcode is macOS only, so the iOS compile happens on Capgo's Mac infrastructure. From your Windows terminal:

```powershell
bun run build
bunx cap sync ios

bunx @capgo/cli@latest login
bunx @capgo/cli@latest build init --platform ios
bunx @capgo/cli@latest build request com.example.app --platform ios --build-mode release
```

`build init` collects your signing material. On Windows the App Store Connect API key is created manually in the Apple portal, following the [iOS build guide](/docs/builder/ios/). The distribution certificate does not need Keychain Access: create the CSR and `.p12` with OpenSSL (`winget install ShiningLight.OpenSSL.Light`) or the browser-based [iOS certificate generator](/tools/ios-certificate-generator/). The step-by-step is in [Build an iOS app from Windows with Capacitor and Capgo Build](/blog/build-ios-app-from-windows-capacitor-capgo-build/).

When the build finishes, Capgo can push it to TestFlight so you install it on a real iPhone minutes later.

## 10) Ship web changes without rebuilding

With both stores live, use [Capgo Live Updates](/docs/live-updates/) for JavaScript, HTML and CSS changes:

```powershell
bunx @capgo/cli@latest init
bun run build
bunx @capgo/cli@latest bundle upload --channel production
```

Native rebuilds are only needed for plugins, permissions and Capacitor upgrades.

## Common Windows issues

- **`running scripts is disabled on this system`**: execution policy. See step 1.
- **`SDK location not found`**: `ANDROID_HOME` not set for the terminal running Gradle. Restart the terminal after setting it, or create `android\local.properties` with `sdk.dir=C\:\\Users\\you\\AppData\\Local\\Android\\Sdk`.
- **`Filename too long` from Git or Gradle**: enable long paths, step 6.
- **Emulator stuck at boot**: hypervisor not enabled or BIOS virtualization off.
- **`gradlew: bad interpreter` in CI**: `gradlew` was committed with CRLF endings. Fix with the `.gitattributes` above and renormalize.
- **`EPERM` or locked files during `bun install`**: Defender or a running Gradle daemon holding files. Stop the daemon with `.\gradlew.bat --stop` and add the exclusions.

## Summary

Windows covers Android and the web layer end to end. For iOS, generate the project locally, sync, and hand the `ios/` folder to Capgo Build. Add Live Updates on top and your Windows team ships to both stores without a single Mac in the office. If you prefer a Linux shell on Windows, read the companion guide on [using WSL2 for Capacitor development](/blog/capacitor-wsl2-windows-setup/).
