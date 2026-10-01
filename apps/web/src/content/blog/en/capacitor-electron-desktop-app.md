---
slug: capacitor-electron-desktop-app
title: "Build a Desktop App with Capacitor and Electron (2026)"
description: "Turn your Capacitor app into a desktop app with Electron: secure shell setup, plugin strategy, packaging for macOS, Windows, Linux, and live updates."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_banner.webp
head_image_alt: "Capgo banner for a guide on building a desktop app from a Capacitor project with Electron"
keywords: Capacitor Electron, Capacitor desktop app, Electron Capacitor, Ionic desktop app, capacitor-community electron, Electron live updates, electron-builder Capacitor
tag: Tutorial, Development, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Is @capacitor-community/electron still maintained?"
    answer: "No. Its README marks it as unmaintained, and its last npm release, 5.0.1, dates from September 2023 and targets Capacitor 5 and Electron 26. For a Capacitor 8 app, a small Electron shell you own is the safer choice."
  - question: "Do Capacitor plugins work in Electron?"
    answer: "Plugins with a web implementation work, because the Electron renderer is Chromium. Plugins that only have iOS and Android code do not. Replace those with Electron main-process code exposed through a preload script."
  - question: "What does Capacitor.getPlatform() return in Electron?"
    answer: "With a plain Electron shell it returns 'web', since there is no Capacitor native bridge. Expose your own flag from the preload script to detect the desktop build."
  - question: "Can I ship live updates to an Electron app?"
    answer: "Yes. @capgo/electron-updater downloads new web bundles from Capgo, with channels and automatic rollback, using the same bundle upload command as the mobile app."
  - question: "Do I need a separate build for each operating system?"
    answer: "Yes. Electron packages per OS and CPU architecture. Build macOS on a Mac for signing and notarization, and use CI runners for Windows and Linux."
---

To build a desktop app from a Capacitor app, wrap the same web build (`webDir`) in an Electron shell: a main process that opens a `BrowserWindow`, a preload script that exposes a small desktop API, and electron-builder to produce installers for macOS, Windows, and Linux. Your UI and business logic stay shared with iOS and Android, and desktop-only features live in the Electron main process.

This guide covers the current state of Capacitor on Electron in 2026, a secure setup that works with Capacitor 8, how plugins behave, packaging and signing, and how to ship web updates without new installers.

## The state of Capacitor on Electron in 2026

For years the default answer was `@capacitor-community/electron`, which plugged Electron into the Capacitor CLI as a platform. That project is now marked unmaintained in its own README. Its last npm release, 5.0.1, shipped in September 2023, requires Capacitor 5.4 or later, and was built against Electron 26. Electron has shipped many major versions since, and only the latest three majors receive security fixes.

You can still use it on old projects, but for a Capacitor 8 app the comparison looks like this:

| Approach | Pros | Cons |
| --- | --- | --- |
| Your own Electron shell (this guide) | Current Electron, full control, no extra abstraction | You write about 60 lines of main and preload code |
| `@capacitor-community/electron` | Familiar `cap` commands | Unmaintained, pinned to old Capacitor and Electron |

The shell approach is less work than it sounds, because Capacitor already produces a static web build. Electron only needs to load it.

## How plugins behave in Electron

Electron's renderer is Chromium, so your Capacitor app runs there like it runs in a browser. Capacitor's core detects no native bridge and falls back to each plugin's web implementation.

| Plugin type | Works in Electron? | What to do |
| --- | --- | --- |
| Plugin with a web implementation (Preferences, Share, Clipboard, many Capgo plugins) | Yes, using the web version | Test the web behavior |
| Native-only plugin (no web implementation) | No, rejects as unimplemented | Write an Electron equivalent behind a preload API |
| Pure JS libraries | Yes | Nothing |

`Capacitor.getPlatform()` returns `'web'` in this setup and `Capacitor.isNativePlatform()` returns `false`. We will expose an explicit desktop flag from the preload script so your code can branch cleanly.

## Prerequisites

- A Capacitor app whose `bun run build` outputs a static folder (the `webDir` in `capacitor.config.ts`, often `dist` or `www`).
- Bun and a current LTS Node.js, since Electron tooling still runs on Node.
- For macOS distribution, an Apple Developer ID certificate. For Windows, a code signing certificate.

## Step 1: Install Electron and the packager

```bash
bun add -d electron electron-builder
```

Add an `electron/` folder at the project root:

```text
my-app/
  capacitor.config.ts
  dist/              # web build, shared with iOS and Android
  electron/
    main.ts
    preload.ts
  electron-builder.yml
```

## Step 2: Make the web build load from disk

Electron loads files with the `file://` protocol in production. Two settings matter:

1. **Relative asset paths.** With Vite, set `base: './'` so the built `index.html` references `./assets/...` instead of `/assets/...`.
2. **Routing.** Deep links like `/settings` do not exist as files. Use hash routing for the desktop build, or make sure your router only navigates client-side after loading `index.html`.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
});
```

Relative paths also work on iOS and Android, so you do not need a separate build.

## Step 3: Write the main process

```typescript
// electron/main.ts
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';

const isDev = !app.isPackaged;

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.once('ready-to-show', () => win.show());

  // Open external links in the default browser, never inside the app.
  // Only allow https: so a script cannot launch file: or other protocol handlers.
  win.webContents.setWindowOpenHandler(({ url }) => {
    try {
      if (new URL(url).protocol === 'https:') void shell.openExternal(url);
    } catch {
      // invalid URL: ignore
    }
    return { action: 'deny' };
  });

  if (isDev) {
    await win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    await win.loadFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
  }
}

ipcMain.handle('desktop:get-version', () => app.getVersion());

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
```

Keep `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`. Your web app may load third-party scripts, and none of them should get Node.js access.

## Step 4: Expose a small desktop API from the preload

```typescript
// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('desktop', {
  isElectron: true,
  platform: process.platform,
  getVersion: () => ipcRenderer.invoke('desktop:get-version') as Promise<string>,
});
```

Type it in your web code and use it the same way you would use a plugin:

```typescript
// src/desktop.ts
declare global {
  interface Window {
    desktop?: {
      isElectron: boolean;
      platform: string;
      getVersion: () => Promise<string>;
    };
  }
}

export const isDesktop = () => Boolean(window.desktop?.isElectron);
```

Each native-only feature you need on desktop becomes one `ipcMain.handle` in the main process and one function in the preload. Validate arguments in the main process, since the renderer is untrusted.

## Step 5: Build and run

Compile the Electron files with Bun. The preload runs sandboxed, so bundle it as a single CommonJS file:

```json
{
  "main": "electron/dist/main.js",
  "scripts": {
    "build": "vite build",
    "electron:compile": "bun build electron/main.ts --outdir electron/dist --target node --format cjs --external electron && bun build electron/preload.ts --outdir electron/dist --target node --format cjs --external electron",
    "electron:dev": "bun run electron:compile && electron .",
    "electron:pack": "bun run build && bun run electron:compile && electron-builder"
  }
}
```

During development, start your dev server in one terminal (`bun run dev`) and `bun run electron:dev` in another. You get hot reload in the desktop window.

## Step 6: Package installers with electron-builder

```yaml
# electron-builder.yml
appId: com.example.myapp
productName: My App
directories:
  output: release
files:
  - dist/**/*
  - electron/dist/**/*
  - package.json
mac:
  target: [dmg, zip]
  category: public.app-category.productivity
  hardenedRuntime: true
win:
  target: [nsis]
linux:
  target: [AppImage, deb]
  category: Utility
```

Run `bun run electron:pack`. electron-builder builds for the OS you run it on. Use a matrix of macOS, Windows, and Linux runners in CI to produce all three.

| OS | Common targets | Signing |
| --- | --- | --- |
| macOS | `.dmg`, `.zip` | Developer ID certificate plus notarization, or Gatekeeper blocks the app |
| Windows | NSIS `.exe`, MSI | Code signing certificate to avoid SmartScreen warnings |
| Linux | AppImage, `.deb`, `.rpm` | Optional |

Electron apps are larger than mobile builds because they include Chromium and Node.js. Expect installers around 80 to 150 MB depending on targets.

## Step 7: Ship web updates without new installers

Most changes in a Capacitor app are web changes. On mobile you can ship those with [Capgo live updates](/live-update/). On desktop, `@capgo/electron-updater` does the same job with the same model: channels, a built-in bundle, downloaded bundles, and automatic rollback if the new bundle does not call `notifyAppReady()`.

```bash
bun add @capgo/electron-updater
```

Update the main process to let the updater pick the bundle to load:

```typescript
// electron/main.ts (production branch)
import { ElectronUpdater, setupIPCHandlers, setupEventForwarding } from '@capgo/electron-updater';

const updater = new ElectronUpdater({
  appId: 'com.example.myapp',
  autoUpdate: true,
});

// inside createWindow(), instead of loading dist/index.html directly
const builtinPath = path.join(__dirname, '..', '..', 'dist', 'index.html');
await updater.initialize(win, builtinPath);
setupIPCHandlers(updater);
setupEventForwarding(updater, win);
await win.loadFile(updater.getCurrentBundlePath());
```

Add the updater bridge to the same preload file:

```typescript
// electron/preload.ts (next to the desktop API)
import { exposeUpdaterAPI } from '@capgo/electron-updater/preload';

exposeUpdaterAPI();
```

And confirm a healthy launch from the web app, only on desktop:

```typescript
import { isDesktop } from './desktop';

if (isDesktop()) {
  const { requireUpdater } = await import('@capgo/electron-updater/renderer');
  await requireUpdater().notifyAppReady();
}
```

Upload a new bundle with the same CLI you use for mobile:

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel=production
```

Web updates cannot change Electron itself, the main process, or the preload. For those, ship a new installer with a binary auto-updater. Our guide on [Electron auto-updates](/blog/electron-app-auto-update/) covers that path, and the [electron-updater plugin page](/plugins/electron-updater/) and [docs](/docs/plugins/electron-updater/) cover every option.

## Troubleshooting

**Blank window in the packaged app.** Assets use absolute paths. Set `base: './'` and rebuild. Open DevTools in the packaged app to confirm 404s on `file:///assets/...`.

**Routes show a blank page after reload.** The router tried to load `/route` from disk. Switch to hash routing for desktop.

**`require is not defined` or preload errors.** The sandboxed preload cannot load arbitrary packages at runtime. Bundle it into one file, as in the compile script above.

**A plugin call rejects with "not implemented on web".** That plugin has no web implementation. Add an IPC handler in the main process and call it through `window.desktop`.

**macOS says the app is damaged or from an unidentified developer.** The app is not signed and notarized. Configure a Developer ID certificate and notarization in electron-builder.

**Updates roll back right after install.** `notifyAppReady()` was not called within the timeout (10 seconds by default). Call it early in your app startup.

## Wrap-up

You do not need a dedicated Capacitor platform package to reach the desktop. A short Electron main process, a preload that exposes a typed API, relative asset paths, and electron-builder give you installers for all three operating systems from the same web build. Add `@capgo/electron-updater` and the desktop app gets the same live update workflow as your iOS and Android builds. If you are still choosing a desktop runtime, read our [Electron vs Tauri comparison](/blog/electron-vs-tauri-capacitor/).
