---
title: "Cordova"
description: "Use @capgo/cordova-updater for Capgo live updates in Cordova iOS and Android apps."
sidebar:
  order: 8
---

import { LinkCard, CardGrid, Aside } from '@astrojs/starlight/components';

Capgo now ships a first-class Cordova client: [`@capgo/cordova-updater`](https://github.com/Cap-go/cordova-updater). It mirrors the `@capgo/capacitor-updater` JavaScript API and connects to the same Capgo Cloud backend, channels, and bundle signing flow.

<Aside type="tip">
  Staying on Cordova does not mean giving up instant updates. Install the Cordova plugin, keep your existing Cordova toolchain, and upload bundles with `@capgo/cli` exactly like a Capacitor app.
</Aside>

## Supported stacks

| Client plugin | Platforms |
| --- | --- |
| `@capgo/capacitor-updater` | Capacitor iOS, Android |
| `@capgo/cordova-updater` | Cordova iOS 7+, Android 13+ |
| `@capgo/electron-updater` | Electron desktop |

## Quick install

```bash
cordova plugin add @capgo/cordova-updater --variable APP_ID=YOUR_CAPGO_APP_ID
cordova prepare android ios
```

Then call `cordova.plugins.Updater.notifyAppReady()` after `deviceready`. See the full guide:

<CardGrid>
  <LinkCard title="Cordova updater docs" href="/docs/plugins/cordova-updater/getting-started/" description="Install, configure plugin variables, and ship your first bundle." />
  <LinkCard title="Capacitor updater docs" href="/docs/plugins/updater/getting-started/" description="Use this path when you migrate from Cordova to Capacitor." />
</CardGrid>

## WebView requirements

Cordova Android 13+ and Cordova iOS 7+ serve the app through Cordova's built-in schemes. The updater hooks those handlers to swap in downloaded bundles.

Do **not** combine the plugin with `cordova-plugin-ionic-webview` — it bypasses Cordova scheme routing and OTA bundles will not apply.

## Considering migration?

If you plan to move to Capacitor, you can keep the same Capgo app ID, channels, and uploaded bundles. Capgo's [Cordova → Capacitor consulting](https://capgo.app/consulting/) can help when you need native project migration, but OTA delivery works on Cordova today without waiting for a rewrite.
