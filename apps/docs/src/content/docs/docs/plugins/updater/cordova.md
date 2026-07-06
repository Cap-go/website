---
title: "Cordova / Electron"
description: "Capgo live updates for Cordova and Electron apps with dedicated client plugins and the same cloud backend as Capacitor."
sidebar:
  order: 8
  label: "Cordova / Electron"
---

import { LinkCard, CardGrid, Aside } from '@astrojs/starlight/components';

Capacitor is the primary path documented in this updater section, but Capgo also ships dedicated clients for **Cordova** and **Electron**. Each plugin uses the same Capgo Cloud backend, channels, bundle signing, and `@capgo/cli` upload flow.

<Aside type="tip">
  You can keep the same Capgo app ID and channels when you support multiple runtimes. Only the client plugin package changes per stack.
</Aside>

## Cordova

`@capgo/cordova-updater` mirrors the `@capgo/capacitor-updater` JavaScript API for Cordova iOS 7+ and Android 13+. Install it with `cordova plugin add`, call `cordova.plugins.Updater.notifyAppReady()` after `deviceready`, and upload bundles the same way you would for Capacitor.

Do not combine the plugin with `cordova-plugin-ionic-webview` — it bypasses Cordova scheme handlers and downloaded bundles will not apply.

<LinkCard
  title="Cordova updater docs"
  href="/docs/plugins/cordova-updater/getting-started/"
  description="Install plugin variables, configure iOS/Android WebView requirements, and ship your first bundle."
/>

## Electron

`@capgo/electron-updater` brings the same live-update model to desktop apps. Initialize the updater in the Electron main process, expose the preload bridge, call `notifyAppReady()` from the renderer, and manage releases from the same Capgo dashboard you use for mobile.

<LinkCard
  title="Electron updater docs"
  href="/docs/plugins/electron-updater/getting-started/"
  description="Wire main process, preload, and renderer setup for OTA on desktop."
/>

## Capacitor path

If you are on Capacitor already, stay on the main updater guide:

<LinkCard
  title="Capacitor updater docs"
  href="/docs/plugins/updater/getting-started/"
  description="Default install path for Capacitor iOS and Android apps."
/>
