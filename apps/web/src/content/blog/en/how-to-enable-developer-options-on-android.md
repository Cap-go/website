---
slug: how-to-enable-developer-options-on-android
title: "How to Enable Developer Options on Android (2026)"
description: "Enable Android developer mode on Pixel, Samsung, Xiaomi, OnePlus and Huawei, turn on USB and wireless debugging, fix adb issues, and turn it off again."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /android-studio-run.webp
head_image_alt: "Running an app from Android Studio on a device with developer options enabled"
keywords: enable android developer mode, android developer options, usb debugging, wireless debugging, adb pair, enable developer mode samsung, enable developer options xiaomi, turn off developer options
tag: Android, Tutorial, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I enable developer mode on Android?"
    answer: "Open Settings, go to About phone, and tap Build number seven times. Enter your PIN if asked. A message confirms you are now a developer, and Developer options appears under Settings > System (Pixel) or at the bottom of Settings (Samsung)."
  - question: "Is it safe to enable developer options?"
    answer: "Yes, enabling the menu changes nothing by itself. The risk comes from individual settings such as USB debugging, which lets an authorized computer install apps and read data. Turn USB debugging off when you are not developing and revoke old authorizations."
  - question: "Do I need developer options to install an APK?"
    answer: "No. Installing an APK from a file only requires allowing the source app (browser, file manager) to install unknown apps. Developer options and USB debugging are needed when you install from a computer with adb, Android Studio or the Capacitor CLI."
  - question: "Why is my phone not showing up in adb devices?"
    answer: "Check that USB debugging is on, the cable supports data, the USB mode is not charge-only, and that you accepted the RSA fingerprint prompt on the phone. On Windows install the OEM USB driver. Then run adb kill-server and adb devices again."
  - question: "Can I use wireless debugging instead of a cable?"
    answer: "Yes, on Android 11 and later. Enable Wireless debugging in Developer options, choose Pair device with pairing code, run adb pair with the shown IP, port and code, then adb connect to the IP and port shown on the Wireless debugging screen. Both devices must be on the same Wi-Fi network."
---

To enable developer mode on Android, open **Settings > About phone** and tap **Build number** seven times, then enter your PIN. A **Developer options** menu appears, where you can turn on **USB debugging** or **Wireless debugging** so Android Studio, `adb` or `bunx cap run android` can install and debug your app. The exact path to Build number depends on the manufacturer, so the steps for each brand are below.

## What developer options do (and what they don't)

Developer options is a hidden settings menu meant for app developers. Turning it on does nothing by itself. It only reveals switches such as:

- **USB debugging**: lets a trusted computer run `adb` commands, install builds and read logs.
- **Wireless debugging**: same thing over Wi-Fi (Android 11+).
- **Stay awake**: screen stays on while charging, handy during testing.
- **Animation scale**: speed up or turn off system animations, useful for UI tests.
- **Don't keep activities**: destroys activities when you leave them, a good way to test state restoration in a Capacitor app.
- **Show taps / Pointer location**: useful for recording demos and checking touch targets.

You do **not** need developer options to install an APK from a browser or file manager, to use most apps, or to receive an over-the-air update.

## Enable developer options by brand

| Brand | Where to tap 7 times | Where the menu appears afterwards |
| --- | --- | --- |
| Google Pixel / stock Android | Settings > About phone > **Build number** | Settings > System > Developer options |
| Samsung (One UI) | Settings > About phone > Software information > **Build number** | Settings > Developer options (bottom of list) |
| Xiaomi, Redmi, POCO (HyperOS) | Settings > About phone > **OS version** | Settings > Additional settings > Developer options |
| Xiaomi (older MIUI) | Settings > About phone > **MIUI version** | Settings > Additional settings > Developer options |
| OnePlus (OxygenOS) | Settings > About device > Version > **Build number** | Settings > System settings > Developer options |
| OPPO / realme (ColorOS / realme UI) | Settings > About device > Version > **Build number** | Settings > Additional settings > Developer options |
| Motorola | Settings > About phone > **Build number** | Settings > System > Developer options |
| Huawei / Honor (EMUI / MagicOS) | Settings > About phone > **Build number** | Settings > System & updates > Developer options |

Menus move between OS versions. If you cannot find Build number, open Settings and use the search field: type "build number". On almost every Android device search finds it directly.

### Google Pixel (Android 14, 15, 16)

1. Open **Settings** and scroll to **About phone**.
2. Scroll to the bottom and tap **Build number** seven times. After a few taps you see a countdown toast.
3. Enter your PIN, pattern or password.
4. Go back to **Settings > System > Developer options**.

### Samsung Galaxy

1. Open **Settings > About phone > Software information**.
2. Tap **Build number** seven times and confirm with your PIN.
3. **Developer options** now appears at the very bottom of the main Settings list, below About phone.

### Xiaomi, Redmi and POCO

1. Open **Settings > About phone**.
2. Tap **OS version** (HyperOS) or **MIUI version** (older devices) seven times.
3. Go to **Settings > Additional settings > Developer options**.

Xiaomi adds two extra switches you usually need for development: **Install via USB** and **USB debugging (Security settings)**. Without "Install via USB", `adb install` fails with `INSTALL_FAILED_USER_RESTRICTED`. Turning these on may require signing in to a Xiaomi account and having a SIM card inserted.

### OnePlus, OPPO and realme

1. Open **Settings > About device > Version**.
2. Tap **Build number** seven times.
3. Open **Settings > System settings > Developer options** (OnePlus) or **Settings > Additional settings > Developer options** (OPPO, realme).

### Huawei and Honor

1. Open **Settings > About phone**.
2. Tap **Build number** seven times.
3. Go to **Settings > System & updates > Developer options**.

On Huawei devices, also set the USB connection mode to **File transfer** when you plug in, otherwise `adb` may not see the device. If you plan to ship to these phones, read [how to publish a Capacitor app on Huawei AppGallery](/blog/publish-capacitor-app-on-huawei-appgallery/), because many of them have no Google Play services.

### Work profiles and managed devices

If your company manages the phone, the admin can block developer options. You will see "Developer options are not available for this user". Ask IT for a test device rather than trying to work around the policy.

## Turn on USB debugging

1. Open **Developer options** and switch on **USB debugging**.
2. Connect the phone with a USB cable that supports data (many cheap cables are charge-only).
3. On the phone, accept the **Allow USB debugging?** dialog. Tick **Always allow from this computer** on your own machine.
4. On the computer, check the connection:

```bash
adb devices
```

You should see:

```text
List of devices attached
R5CT1234ABC	device
```

`unauthorized` means you did not accept the prompt. `offline` usually means a bad cable or port, or an `adb` server from an old SDK.

`adb` ships with the Android SDK Platform-Tools. If Android Studio is installed it lives in `~/Library/Android/sdk/platform-tools` on macOS or `%LOCALAPPDATA%\Android\Sdk\platform-tools` on Windows. Add that folder to your `PATH`. New to the Android toolchain? Our [Android setup for Capacitor apps](/blog/android-setup-for-capacitor-apps/) covers it.

## Turn on wireless debugging (Android 11 and later)

Wireless debugging removes the cable. Your computer and phone must be on the same Wi-Fi network, and some corporate or hotel networks block device-to-device traffic.

1. In **Developer options**, switch on **Wireless debugging** and accept the network prompt.
2. Tap **Wireless debugging** to open it, then **Pair device with pairing code**. Keep this screen open.
3. On the computer, pair using the IP address and port shown in the pairing dialog:

```bash
adb pair 192.168.1.42:37145
# Enter pairing code: 482913
```

4. Connect using the IP and port shown on the main Wireless debugging screen (a different port from the pairing port):

```bash
adb connect 192.168.1.42:41827
adb devices
```

Android Studio also has **Pair Devices Using Wi-Fi** in the device manager, which shows a QR code you scan from the Wireless debugging screen.

The port changes every time wireless debugging restarts, so you will repeat `adb connect` after reboots. Pairing itself is remembered.

On Android 10 and earlier, use the older method: connect once by USB, run `adb tcpip 5555`, unplug, and `adb connect <phone-ip>:5555`.

## Run your Capacitor app on the device

With the device listed in `adb devices`, the Capacitor CLI can build and install directly:

```bash
bun run build
bunx cap sync android
bunx cap run android --list        # show connected devices and emulators
bunx cap run android --target R5CT1234ABC
```

For a faster loop, use live reload so the app loads your dev server over the network:

```bash
bunx cap run android -l --external
```

The phone needs to reach your machine's IP for this to work. When you want testers outside your network to see changes without reinstalling, look at [Capgo live updates](/live-update/) instead of a dev server.

To read native logs while the app runs:

```bash
adb logcat | grep -i -E "capacitor|chromium"
```

And to debug the WebView, open `chrome://inspect` in desktop Chrome while the debug build is running. Debug builds of Capacitor apps enable WebView debugging by default.

## Troubleshooting

**Build number tapping does nothing.** You may be tapping the wrong field (for example Android version instead of Build number), or the device is managed by an organization. Some Xiaomi devices need you to tap OS version, not Build number.

**Device missing from `adb devices`.**

```bash
adb kill-server
adb start-server
adb devices
```

Then try a different cable and a port directly on the computer instead of a hub. Switch the USB mode notification to **File transfer**.

**Windows does not see the phone.** Install the OEM USB driver (Samsung, Xiaomi and others publish their own) or the Google USB Driver from the SDK Manager for Pixel devices.

**`INSTALL_FAILED_UPDATE_INCOMPATIBLE`.** The installed app was signed with a different key (for example a Play Store build versus your debug build). Uninstall it first: `adb uninstall com.example.app`.

**`INSTALL_FAILED_USER_RESTRICTED` on Xiaomi.** Enable **Install via USB** in Developer options.

**Wireless debugging keeps turning off.** Android turns it off when you change Wi-Fi network. Some battery savers also stop it. Keep the phone on the same network and charging during long sessions.

**Unauthorized after updating Android Studio.** The adb key in `~/.android/adbkey` changed. In Developer options tap **Revoke USB debugging authorizations**, reconnect and accept the prompt again.

## How to turn developer options off

1. Open **Developer options**.
2. Toggle **Use developer options** (or **Developer options** on Samsung) at the top to off.

The menu stays visible on some devices but every switch inside resets to default. To hide the menu completely, go to **Settings > Apps > Settings > Storage** and clear storage for the Settings app. That resets other settings preferences too, so it is rarely worth it.

Before handing a test phone to someone else, also tap **Revoke USB debugging authorizations** so old computers can no longer connect.

## Security notes

- USB debugging lets an authorized computer install apps and read app data from debuggable builds. Do not accept the RSA prompt on public charging stations or computers you do not trust.
- Some banking and payment apps refuse to run while developer options or USB debugging are on. Turn them off on your personal phone when you are done.
- Never ship a release build with `android:debuggable="true"`. Capacitor release builds are not debuggable by default.

## The iOS equivalent

iPhones have their own **Developer Mode** switch that you need before running development or ad hoc builds. See [how to enable Developer Mode on iOS](/blog/enable-ios-developer-mode-ios16/). To get builds onto testers' phones without cables, read [how to distribute iOS and Android apps to testers](/blog/distribute-ios-and-android-apps-to-testers/).
