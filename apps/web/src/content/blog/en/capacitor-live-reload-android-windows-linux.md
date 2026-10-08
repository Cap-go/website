---
slug: capacitor-live-reload-android-windows-linux
title: "Capacitor Live Reload on Android from Windows and Linux"
description: >-
  Get instant reload on an Android emulator or USB phone from a Windows or
  Linux machine: server.url config, 10.0.2.2, adb reverse, firewall rules,
  cleartext traffic, and how to avoid shipping the dev config.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-10-08T10:00:00.000Z
updated_at: 2026-10-08T13:30:13.000Z
head_image: /capacitor-guide.webp
head_image_alt: "Capacitor live reload on Android from Windows and Linux Capgo blog illustration"
keywords: Capacitor live reload, Android live reload, cap run live reload, 10.0.2.2, adb reverse, Windows firewall Vite, Linux ufw, cleartext, hot reload Capacitor
tag: Tutorial, Capacitor, Android
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I enable live reload in a Capacitor app on Android?"
    answer: "Start your dev server bound to all interfaces, set server.url in capacitor.config.ts to the address the device can reach, add cleartext: true for plain http, run cap sync android and launch the app. The WebView loads from the dev server and reloads on every save."
  - question: "What address does the Android emulator use to reach my computer?"
    answer: "10.0.2.2. It is the emulator's alias for the host machine's loopback. A physical phone needs your computer's LAN IP, or adb reverse to map a device port to the host over USB."
  - question: "Why does live reload work on the emulator but not on my phone?"
    answer: "The phone reaches your computer over Wi-Fi, so the dev server port must be open in the Windows Defender or Linux firewall and both devices must be on the same network. adb reverse over USB bypasses the network entirely."
  - question: "Is it safe to leave server.url in capacitor.config.ts?"
    answer: "No. A release build with server.url set loads your app from a dev machine that is not there. Keep the dev config in a separate file or an environment switch and build releases without it."
---

Live reload turns the slow build, sync, run loop into save and look. On a Mac the Capacitor CLI's `--live-reload` flag mostly just works. On Windows and Linux the same flag works too, but firewalls, emulator networking and USB routing cause most of the "it does not reload" reports. This guide covers each case.

## How live reload works in Capacitor

The native app normally loads `dist/` from inside the APK. With `server.url` set, the WebView loads from a URL instead, which is your Vite or framework dev server. Hot module replacement then works exactly like in a desktop browser. Nothing native changes; only the page origin does.

Two consequences:

- The device needs network access to your computer.
- Plain `http://` needs `cleartext: true`, because Android blocks cleartext traffic by default.

## Option A: the CLI flag

The Capacitor CLI can set this up for one run:

```bash
bun run dev -- --host 0.0.0.0 &
bunx cap run android --live-reload --host 192.168.1.20 --port 5173
```

Replace the host with your computer's LAN IP. The CLI writes a temporary config, launches the app and restores the config afterwards. If your dev server uses a different port, pass it.

This is the quickest path. The rest of this guide uses the explicit config, which is easier to debug and works with any framework's dev server.

## Option B: explicit config

Start the dev server bound to all interfaces:

```bash
# Vite
bun run dev -- --host 0.0.0.0
# Angular
bunx ng serve --host 0.0.0.0
# Next.js
bun run dev -- -H 0.0.0.0
```

Then create a dev-only Capacitor config. Capacitor reads `capacitor.config.ts`, so switch on an environment variable:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const liveReloadUrl = process.env.CAP_LIVE_RELOAD_URL;

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  ...(liveReloadUrl
    ? { server: { url: liveReloadUrl, cleartext: true } }
    : {}),
};

export default config;
```

Run with the variable set:

```bash
CAP_LIVE_RELOAD_URL=http://10.0.2.2:5173 bunx cap sync android
bunx cap run android
```

On Windows PowerShell:

```powershell
$env:CAP_LIVE_RELOAD_URL="http://10.0.2.2:5173"; bunx cap sync android
bunx cap run android
```

Without the variable, `cap sync` writes a normal config and release builds are safe.

## Emulator: use 10.0.2.2

Inside the Android emulator, `10.0.2.2` is your computer. It works on Windows and Linux without any firewall change, because the traffic never leaves the machine. If it still fails, confirm the dev server is bound to `0.0.0.0` and not only `127.0.0.1`; a server bound to loopback is not reachable from the emulator's virtual network.

## USB phone: adb reverse

The cleanest option for a physical device, and it needs no Wi-Fi and no firewall rule:

```bash
adb reverse tcp:5173 tcp:5173
```

Now `localhost:5173` on the phone points at your computer. Set the URL accordingly:

```bash
CAP_LIVE_RELOAD_URL=http://localhost:5173 bunx cap sync android
```

`adb reverse` is cleared when the device reconnects, so rerun it after unplugging. The CLI can do it for you: `bunx cap run android --live-reload --host localhost --port 5173 --forwardPorts 5173:5173`. Linux users need the udev rule from the [Linux setup guide](/blog/capacitor-development-on-linux/#5-usb-access-for-physical-devices) before `adb` sees the phone.

## Wi-Fi phone: LAN IP plus firewall

If USB is not an option, use your computer's LAN IP and open the port.

Find the IP:

```bash
# Linux
ip -4 addr show | grep inet
# Windows
ipconfig
```

Open the port on Windows. From an elevated PowerShell:

```powershell
netsh advfirewall firewall add rule name="Vite dev server" dir=in action=allow protocol=TCP localport=5173
```

Public network profiles on Windows block incoming connections even with a rule in some corporate setups; switch the Wi-Fi network to Private in Settings if the phone still cannot connect.

On Linux with ufw:

```bash
sudo ufw allow 5173/tcp
```

On Fedora with firewalld:

```bash
sudo firewall-cmd --add-port=5173/tcp
```

Then:

```bash
CAP_LIVE_RELOAD_URL=http://192.168.1.20:5173 bunx cap sync android
bunx cap run android
```

Both devices must be on the same subnet. Guest Wi-Fi networks often isolate clients, which looks exactly like a firewall problem.

## WSL2 specifics

When Vite runs inside WSL2, the Windows host does not automatically expose the port. Enable mirrored networking in `.wslconfig` or add a port proxy on Windows. The details are in the [WSL2 guide](/blog/capacitor-wsl2-windows-setup/#6-live-reload-across-the-boundary).

## HMR websocket issues

The page loads but changes do not apply? The HMR websocket is trying to connect to the wrong host. Tell Vite the public address:

```ts
// vite.config.ts
export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: {
      host: '192.168.1.20', // or 10.0.2.2 for the emulator
      port: 5173,
    },
  },
});
```

Angular and Next.js have equivalent options; the symptom is identical and the fix is to pin the websocket host.

## Debugging with Chrome DevTools

Open `chrome://inspect` in Chrome or Edge on your computer. The WebView appears under the device with the dev server URL. You get console, network, sources and breakpoints, on Windows and Linux alike. If the device does not appear, check `adb devices` and that USB debugging is accepted.

## Never ship the dev config

A release build with `server.url` set loads from a machine that is not there, and the app shows a blank screen. Guard against it:

- Use the environment variable pattern above so the default config has no `server` block.
- Add a CI check that fails if the built `android/app/src/main/assets/capacitor.config.json` contains `"url"`.
- If you also use [Capgo Live Updates](/docs/live-updates/), be aware that a `server.url` config overrides the updater's bundle; keep the two workflows separate.

## Summary

Live reload on Android works from Windows and Linux with three details right: bind the dev server to all interfaces, choose the address the device can actually reach (`10.0.2.2` for the emulator, `adb reverse` for USB, LAN IP with a firewall rule for Wi-Fi), and keep the dev config out of release builds. Once the iteration loop is fast on Android, the shared web layer is already tested before it reaches iOS through [Capgo Build](/docs/builder/).
