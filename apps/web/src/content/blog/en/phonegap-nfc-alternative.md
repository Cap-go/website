---
slug: phonegap-nfc-alternative
title: "phonegap-nfc Alternative for Capacitor"
description: "phonegap-nfc alternative for Capacitor: replace Cordova NFC callbacks with @capgo/capacitor-nfc, NDEF read and write, tag sessions, and Android P2P."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-12T09:00:00.000Z
updated_at: 2026-11-12T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an NFC plugin guide"
keywords: phonegap-nfc alternative, cordova nfc plugin capacitor, capacitor nfc read write, @capgo/capacitor-nfc, phonegap nfc migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the phonegap-nfc alternative for Capacitor?"
    answer: "@capgo/capacitor-nfc is a modern Capacitor port of phonegap-nfc. It exposes startScanning, write, erase, makeReadOnly, and listener-based NDEF events on iOS and Android."
  - question: "Is phonegap-nfc still maintained?"
    answer: "npm lists version 1.2.0 with a last modified date of 23 June 2020. The chariotsolutions/phonegap-nfc GitHub repository last committed in July 2020. It targets Cordova callback APIs and older multi-platform stacks."
  - question: "Does @capgo/capacitor-nfc work on web?"
    answer: "No. The README states iOS and Android only. Core NFC and NfcAdapter are not available in the browser."
  - question: "How do I read and write on iOS?"
    answer: "Call startScanning with invalidateAfterFirstRead false when you need to write after a read. Add NFCReaderUsageDescription to Info.plist. For raw tag UIDs use iosSessionType tag and the Tag Reader entitlement documented in the README."
  - question: "Which Android permission is required?"
    answer: "Declare android.permission.NFC in AndroidManifest.xml as described in the install section of the plugin README."
  - question: "Where are full docs?"
    answer: "Capgo docs at https://capgo.app/docs/plugins/nfc/, npm https://www.npmjs.com/package/@capgo/capacitor-nfc, GitHub https://github.com/Cap-go/capacitor-nfc/."
---

The maintained **phonegap-nfc alternative** for new Capacitor work is [`@capgo/capacitor-nfc`](/plugins/capacitor-nfc/). The Capgo plugin is described in its README as a **modern Capacitor port of the battle-tested phonegap-nfc plugin**, with promise-based scanning, NDEF read and write, and Capacitor event listeners instead of global `nfc.*` callbacks. This guide explains why teams migrate, how to install it, a minimal read/write sample, and an API map from PhoneGap NFC to Capgo.

## Why leave phonegap-nfc

`phonegap-nfc` on npm is version **1.2.0**. The registry `modified` timestamp is **23 June 2020**. The [chariotsolutions/phonegap-nfc](https://github.com/chariotsolutions/phonegap-nfc) repository's latest commit on the default branch dates from **July 2020**.

The plugin README still documents BlackBerry, Windows Phone, and legacy Cordova 2.x flows. Maintenance activity and npm releases stopped years ago, while NFC APIs on iOS (Core NFC tag sessions, NDEF writing on iOS 13+) continued to evolve.

In a Capacitor app, phonegap-nfc also means:

- Cordova install (`cordova plugin add phonegap-nfc`) and script tag globals.
- Mixed callback and promise APIs (`nfc.scanNdef` on newer iOS, listeners elsewhere).
- No first-class Capacitor permission or listener lifecycle.

[`@capgo/capacitor-nfc`](https://www.npmjs.com/package/@capgo/capacitor-nfc) focuses on **iOS and Android**, aligns plugin major versions with Capacitor (v8.x for Capacitor 8), and documents platform setup in the README (NFC permission, `NFCReaderUsageDescription`, optional Tag Reader entitlement for `iosSessionType: 'tag'`).

## Install

```bash
bun add @capgo/capacitor-nfc
bunx cap sync
```

**Android:** ensure `android/app/src/main/AndroidManifest.xml` includes:

```xml
<uses-permission android:name="android.permission.NFC" />
```

**iOS:** add `NFCReaderUsageDescription` to `Info.plist`. When you set `iosSessionType: 'tag'` in `startScanning`, add the Near Field Communication Tag Reader Session Formats entitlement (`com.apple.developer.nfc.readersession.formats`) with `TAG` and optionally `NDEF`, as documented in the README.

Rebuild native projects after entitlement or manifest edits.

## Usage example

```ts
import { CapacitorNfc } from '@capgo/capacitor-nfc';

export async function scanOnce() {
  const { supported } = await CapacitorNfc.isSupported();
  if (!supported) {
    return;
  }

  await CapacitorNfc.startScanning({
    invalidateAfterFirstRead: true,
    alertMessage: 'Hold a tag near the top of your device.',
  });

  const listener = await CapacitorNfc.addListener('nfcEvent', (event) => {
    console.log(event.type, event.tag?.ndefMessage);
  });

  // Stop when your UI flow ends
  await CapacitorNfc.stopScanning();
  await listener.remove();
}
```

Use `getStatus()` when you need to prompt the user to enable NFC in system settings, then `showSettings()` to open the NFC page.

## Migrating from Cordova to Capacitor

Remove `phonegap-nfc` from Cordova config and the `nfc` global. Import `CapacitorNfc` and register listeners with `addListener`. Replace per-scan Cordova calls with one `startScanning` session per user action on iOS, matching Core NFC expectations described in both READMEs.

### API mapping table

| phonegap-nfc (Cordova) | @capgo/capacitor-nfc |
| --- | --- |
| `nfc.addNdefListener(cb)` | `addListener('ndefDiscovered', ...)` or `addListener('nfcEvent', ...)` |
| `nfc.addTagDiscoveredListener(cb)` | `addListener('tagDiscovered', ...)` |
| `nfc.addMimeTypeListener(mime, cb)` | `addListener('ndefMimeDiscovered', ...)` |
| `nfc.addNdefFormatableListener(cb)` | `addListener('ndefFormatableDiscovered', ...)` |
| `nfc.scanNdef(...)` (iOS) | `startScanning()` (NDEF session default) |
| `nfc.scanTag(...)` (iOS 13+) | `startScanning({ iosSessionType: 'tag' })` |
| `nfc.cancelScan()` | `stopScanning()` |
| `nfc.beginSession` / `invalidateSession` (deprecated) | `startScanning()` / `stopScanning()` |
| `nfc.write(message, ...)` | `write({ records, allowFormat })` |
| `nfc.erase(...)` | `erase()` |
| `nfc.makeReadOnly(...)` | `makeReadOnly()` (Android per README feature list) |
| `nfc.share(...)` / `nfc.unshare()` | `share(...)` / `unshare()` (Android P2P, Android only) |
| `nfc.enabled(...)` / adapter state | `getStatus()`, `addListener('nfcStateChange', ...)` |
| `nfc.showSettings()` | `showSettings()` |
| `nfc.transceive(...)` with active tag | `transceive({ data })` while session keeps tag open |
| `nfc.readerMode` / `disableReaderMode` | Use `startScanning` options and `stopScanning` |

NDEF record layout (`tnf`, `type`, `id`, `payload`) matches the byte arrays phonegap-nfc used. The Capgo README includes a full text record write example with `TextEncoder`.

On iOS, keep `invalidateAfterFirstRead: false` when you call `write()` after a read in the same session, as shown in the plugin README.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/nfc/](/docs/plugins/nfc/)
- Marketing page: [/plugins/capacitor-nfc/](/plugins/capacitor-nfc/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-nfc](https://www.npmjs.com/package/@capgo/capacitor-nfc)
- GitHub: [https://github.com/Cap-go/capacitor-nfc/](https://github.com/Cap-go/capacitor-nfc/)
- PhoneGap upstream: [https://github.com/chariotsolutions/phonegap-nfc](https://github.com/chariotsolutions/phonegap-nfc)

Ship native NFC entitlement changes through [Capgo Build](/native-build/) or your own pipeline, then deliver JavaScript UX updates with [Capgo live updates](/live-update/). For the broader migration path, see [migrating Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/).
