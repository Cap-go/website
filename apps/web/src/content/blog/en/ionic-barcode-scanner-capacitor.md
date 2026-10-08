---
slug: ionic-barcode-scanner-capacitor
title: "How to Build an Ionic Barcode Scanner with Capacitor"
description: "Build an Ionic barcode scanner with Capacitor 8: set up the app, add @capacitor/barcode-scanner, scan QR codes and barcodes on iOS, Android, and web."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /blog-images/barcode-scanner-cordova.webp
head_image_alt: "Illustration of a phone scanning a barcode inside a hybrid mobile app"
keywords: Ionic barcode scanner, Capacitor barcode scanner, Ionic QR code scanner, @capacitor/barcode-scanner, Capacitor 8 barcode, Ionic Angular scanner, ML Kit barcode Capacitor
tag: Tutorial, Capacitor, Mobile
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does the Capacitor barcode scanner work on the web?"
    answer: "Yes. @capacitor/barcode-scanner ships a web implementation based on html5-qrcode, so the same scanBarcode call opens a camera scanner in the browser. The page must be served over HTTPS or localhost for camera access."
  - question: "Why does the app crash when I tap scan on iOS?"
    answer: "The Info.plist is missing NSCameraUsageDescription. iOS terminates apps that access the camera without a usage description. Add the key with a clear sentence and rebuild."
  - question: "How do I scan only QR codes?"
    answer: "Pass hint: CapacitorBarcodeScannerTypeHint.QR_CODE. Restricting the format speeds up detection and avoids false reads from other barcodes in view."
  - question: "Can I scan several barcodes continuously?"
    answer: "scanBarcode returns one result per call and closes the scanner. For continuous scanning, call it in a loop, or build a custom screen with a camera preview plugin and a frame decoder."
  - question: "Which Android minimum SDK does the scanner need?"
    answer: "Android API 26. Capacitor 8 defaults to minSdkVersion 24, so raise it to 26 in android/variables.gradle before building."
---

To build an Ionic barcode scanner with Capacitor, create an Ionic app with the Capacitor integration, install the official `@capacitor/barcode-scanner` plugin, raise Android's `minSdkVersion` to 26, add the iOS camera usage description, and call `CapacitorBarcodeScanner.scanBarcode()` from a button. The plugin opens a native full-screen scanner on iOS and Android, a browser scanner on the web, and returns the decoded text and format.

This tutorial builds a working scanner app in Ionic Angular on Capacitor 8, then covers format filtering, error handling, Android scanning engines, continuous scanning, enterprise hardware scanners, and common failures.

## What you will build

A single-page Ionic app with a scan button that:

- opens the camera scanner,
- shows each result with its format,
- lets you copy or open the scanned value,
- handles cancel and permission errors cleanly.

The code uses Angular standalone components. The plugin calls are identical in React or Vue, so only the template syntax changes.

## Prerequisites

- Node.js LTS and Bun.
- For Android: Android Studio with an SDK and a device or emulator with a camera.
- For iOS: a Mac with Xcode 26, which App Store Connect requires for uploads since April 2026.
- A physical device is best. Emulators can scan with a virtual camera, but real lighting and focus matter for barcodes.

## Step 1: Create the Ionic app

```bash
bunx @ionic/cli start barcode-scanner blank --type=angular-standalone --capacitor
cd barcode-scanner
```

The Ionic CLI scaffolds the Angular app with `@capacitor/core` and `@capacitor/cli` already installed. Check `capacitor.config.ts`: `appId` should be your reverse-domain ID, for example `com.example.scanner`, and `webDir` should match the build output (`www` for Ionic Angular).

Build once so the native platforms have something to copy:

```bash
bun run build
```

## Step 2: Add Android and iOS

```bash
bun add @capacitor/android @capacitor/ios
bunx cap add android
bunx cap add ios
```

Capacitor 8 creates new iOS projects with Swift Package Manager. If you are upgrading an older app instead, follow the [Capacitor 8 upgrade guide](/blog/upgrade-capacitor-app-to-capacitor-8/) first.

## Step 3: Install the barcode scanner plugin

```bash
bun add @capacitor/barcode-scanner
bunx cap sync
```

`@capacitor/barcode-scanner` is the Capacitor team's official scanner. Version 3.x supports Capacitor 8.

### Android configuration

The plugin requires Android API 26 or higher. Capacitor 8 defaults to 24, so edit `android/variables.gradle`:

```groovy
ext {
    minSdkVersion = 26
    // keep the other values Capacitor generated
}
```

On Android you can choose the decoding engine per scan: ZXing (default, supports every format the plugin lists) or Google ML Kit (fast on difficult codes, but no MaxiCode, RSS-14, RSS Expanded, or UPC/EAN extension).

### iOS configuration

Add a camera usage description to `ios/App/App/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>The camera is used to scan barcodes and QR codes.</string>
```

Without it, iOS terminates the app on the first camera access. Write the sentence for the user, since App Review reads it too. iOS uses Apple's Vision framework, which supports every listed format except MaxiCode and UPC/EAN extension, and does not distinguish UPC-A from EAN-13.

## Step 4: Write the scanner service

Keeping plugin calls in a service makes them easy to reuse and test.

```typescript
// src/app/services/scanner.service.ts
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerAndroidScanningLibrary,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerScanOrientation,
  CapacitorBarcodeScannerTypeHint,
  CapacitorBarcodeScannerTypeHintALLOption,
} from '@capacitor/barcode-scanner';

export interface ScanResult {
  value: string;
  format: string;
  scannedAt: Date;
}

export type ScanOutcome =
  | { status: 'ok'; result: ScanResult }
  | { status: 'cancelled' }
  | { status: 'denied' }
  | { status: 'error'; message: string };

@Injectable({ providedIn: 'root' })
export class ScannerService {
  async scan(onlyQr = false): Promise<ScanOutcome> {
    try {
      const { ScanResult, format } = await CapacitorBarcodeScanner.scanBarcode({
        hint: onlyQr
          ? CapacitorBarcodeScannerTypeHint.QR_CODE
          : CapacitorBarcodeScannerTypeHintALLOption.ALL,
        scanInstructions: 'Point the camera at a barcode',
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
        cancelButtonAccessibilityLabel: 'Cancel scanning',
        torchButtonOnAccessibilityLabel: 'Turn flashlight off',
        torchButtonOffAccessibilityLabel: 'Turn flashlight on',
        android: {
          scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.MLKIT,
        },
        web: {
          showCameraSelection: true,
        },
      });

      return {
        status: 'ok',
        result: {
          value: ScanResult,
          format: CapacitorBarcodeScannerTypeHint[format] ?? String(format),
          scannedAt: new Date(),
        },
      };
    } catch (err: any) {
      const code: string = err?.code ?? '';
      if (code.endsWith('0006')) return { status: 'cancelled' };
      if (code.endsWith('0007')) return { status: 'denied' };
      return { status: 'error', message: err?.message ?? 'Scan failed' };
    }
  }

  get platform() {
    return Capacitor.getPlatform();
  }
}
```

The plugin returns errors with codes in the form `OS-PLUG-BARC-XXXX`. On iOS, `0006` means the user cancelled and `0007` means camera access was denied. Treat cancel as a normal outcome, not an error. Log the raw code on Android during testing to confirm the same mapping on your target devices.

The `format` in the result is a numeric enum value. `CapacitorBarcodeScannerTypeHint[format]` turns it back into a name such as `QR_CODE` or `EAN_13`.

## Step 5: Build the page

```typescript
// src/app/home/home.page.ts
import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonFab, IonFabButton, IonIcon, IonToggle, IonNote, ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { scanOutline } from 'ionicons/icons';
import { ScannerService, ScanResult } from '../services/scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    DatePipe, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonLabel, IonFab, IonFabButton, IonIcon, IonToggle, IonNote,
  ],
})
export class HomePage {
  private scanner = inject(ScannerService);
  private toast = inject(ToastController);

  results = signal<ScanResult[]>([]);
  onlyQr = signal(false);
  scanning = signal(false);

  constructor() {
    addIcons({ scanOutline });
  }

  async scan() {
    if (this.scanning()) return;
    this.scanning.set(true);
    const outcome = await this.scanner.scan(this.onlyQr());
    this.scanning.set(false);

    if (outcome.status === 'ok') {
      this.results.update((list) => [outcome.result, ...list]);
    } else if (outcome.status === 'denied') {
      await this.show('Camera access is off. Enable it in Settings to scan.');
    } else if (outcome.status === 'error') {
      await this.show(outcome.message);
    }
  }

  private async show(message: string) {
    const t = await this.toast.create({ message, duration: 3000 });
    await t.present();
  }
}
```

```html
<!-- src/app/home/home.page.html -->
<ion-header>
  <ion-toolbar>
    <ion-title>Barcode Scanner</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item>
      <ion-toggle [checked]="onlyQr()" (ionChange)="onlyQr.set($event.detail.checked)">
        QR codes only
      </ion-toggle>
    </ion-item>

    @for (r of results(); track r.scannedAt) {
      <ion-item>
        <ion-label>
          <h2>{{ r.value }}</h2>
          <p>{{ r.format }} · {{ r.scannedAt | date: 'shortTime' }}</p>
        </ion-label>
      </ion-item>
    } @empty {
      <ion-item lines="none">
        <ion-note>No scans yet. Tap the button to scan.</ion-note>
      </ion-item>
    }
  </ion-list>

  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button (click)="scan()" [disabled]="scanning()" aria-label="Scan a barcode">
      <ion-icon name="scan-outline" aria-hidden="true"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</ion-content>
```

## Step 6: Run on devices

```bash
bun run build
bunx cap sync
bunx cap run android
bunx cap run ios
```

For the web version, `bun run start` serves the app on localhost, where browsers allow camera access. Over a LAN IP you need HTTPS.

To iterate faster, use live reload on a device: `bunx cap run android --livereload --external` reloads the app whenever you save.

## Supported formats

| Format | Android ZXing | Android ML Kit | iOS |
| --- | --- | --- | --- |
| QR Code, Aztec, Data Matrix, PDF417 | Yes | Yes | Yes |
| EAN-13, EAN-8, UPC-A, UPC-E | Yes | Yes | Yes (UPC-A and EAN-13 treated alike) |
| Code 128, Code 39, Code 93, Codabar, ITF | Yes | Yes | Yes |
| RSS-14, RSS Expanded | Yes | No | Yes |
| MaxiCode | Yes | No | No |
| UPC/EAN extension | Yes | No | No |

If you pass an unsupported format as `hint`, the plugin falls back to scanning any format.

## Handling scanned values safely

A barcode is untrusted input. Before acting on it:

- Validate URLs before opening them, and show the domain to the user first.
- Do not run scanned strings as code or inject them into HTML.
- For product codes, validate the check digit before calling your backend.
- Rate limit backend lookups if users can scan quickly.

## Beyond the basic scanner

`scanBarcode` is a one-shot, full-screen flow. That covers most apps. Other needs call for other tools:

- **Continuous scanning in your own UI.** Run a camera feed behind your web UI with [@capgo/camera-preview](/plugins/capacitor-camera-preview/), grab frames with `captureSample`, and decode them in JavaScript with a library such as `zxing-wasm`.
- **Rugged enterprise devices.** Zebra handhelds have hardware scanners. [@capgo/capacitor-zebra-datawedge](/plugins/capacitor-zebra-datawedge/) manages DataWedge profiles and scan triggers, which is faster and more reliable than the camera on those devices.
- **Document capture.** For receipts and paper forms, a document scanner plugin fits better than a barcode reader. See the [plugin directory](/plugins/).

Coming from Cordova? Our [Cordova barcode scanner guide](/blog/barcode-scanner-cordova/) covers the old plugins and a migration path.

## Troubleshooting

**iOS app closes when scanning starts.** `NSCameraUsageDescription` is missing from `Info.plist`.

**Android build fails with a manifest merger or minSdk error.** `minSdkVersion` is still 24. Set it to 26 in `android/variables.gradle` and sync.

**Scanner opens but never reads the code.** Try the other Android engine, improve lighting, use the torch, and restrict `hint` to the format you expect. Very small or damaged codes need the camera closer.

**Permission denied every time.** The user denied camera access earlier. Show a message that explains how to enable it in system settings. The OS will not show the prompt again.

**Web scanner does not start.** The page is not served over HTTPS or localhost, or another tab holds the camera.

**Orientation setting ignored on tablets.** Starting with apps that target Android SDK 36, Android 16 ignores fixed orientations on large screens. Use `ADAPTIVE`.

## Ship fixes without waiting on review

Once the scanner is live, most changes, such as new validation rules, UI tweaks, or a different backend lookup, are web code. [Capgo live updates](/live-update/) push those to installed apps within minutes, while plugin upgrades and `Info.plist` changes still go through the stores. When you need a new native build without a local Mac setup, [Capgo Build](/native-build/) produces signed iOS and Android binaries in the cloud.

## Wrap-up

An Ionic barcode scanner on Capacitor 8 takes one official plugin, two native config changes (Android `minSdkVersion` 26 and the iOS camera usage string), and a single `scanBarcode` call. Restrict formats when you can, treat cancel and permission errors as normal outcomes, validate everything you scan, and reach for a camera preview or DataWedge when the one-shot flow is not enough.
