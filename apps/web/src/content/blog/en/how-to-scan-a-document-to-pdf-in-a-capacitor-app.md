---
slug: how-to-scan-a-document-to-pdf-in-a-capacitor-app
title: "How to Scan a Document to PDF in a Capacitor App"
description: "Scan a document to PDF in a Capacitor app: capture pages with the native scanner, build one PDF, then save, share, open, or print it on iOS and Android."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Scanning a paper document into a PDF inside a Capacitor mobile app"
keywords: capacitor document scanner, scan document to pdf capacitor, capacitor pdf, ionic document scanner, visionkit capacitor, ml kit document scanner, capacitor scan to pdf
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I scan a document to PDF in a Capacitor app?"
    answer: "Call DocumentScanner.scanDocument() from @capgo/capacitor-document-scanner to get one JPEG per page, then combine the pages into a single PDF with pdf-lib (or render them through @capgo/capacitor-pdf-generator), write it with @capacitor/filesystem, and share, open, or print the file."
  - question: "Does the Capacitor document scanner work on the Android emulator?"
    answer: "No. The Android side uses the Google ML Kit document scanner, which is delivered through Google Play services and does not run on emulators. Test on a physical Android device. On iOS, VisionKit also needs a real device with a camera."
  - question: "Is the PDF searchable?"
    answer: "Not by default. The scanner returns images, so the PDF contains one image per page with no text layer. If you need search or copy and paste, run OCR on the images (for example with ML Kit Text Recognition or Apple Vision) and store the text next to the PDF or upload it to a server-side OCR service."
  - question: "How many pages can one scan contain?"
    answer: "The maxNumDocuments option controls it. On Android the plugin clamps it between 1 and 24 and defaults to 20. On iOS VisionKit caps a session at 24 pages. Split longer documents into several scans and merge the PDFs with pdf-lib."
  - question: "Can I make the scan-to-PDF flow work on the web?"
    answer: "The native scanner only runs on iOS and Android. On the web, use a file input with capture=environment or getUserMedia to take a photo, then build the PDF with the same pdf-lib code, which runs in any browser."
---

To scan a document to PDF in a Capacitor app, open the native scanner with [`@capgo/capacitor-document-scanner`](/plugins/capacitor-document-scanner/), take the JPEG pages it returns, and combine them into one PDF with `pdf-lib`. From there you write the PDF with `@capacitor/filesystem` and hand it to the share sheet, a PDF viewer, or the system print dialog. This guide walks through the full flow with code that runs on Capacitor 8, on both iOS and Android.

## How scan-to-PDF works on iOS and Android

Both platforms ship a system document scanner, so you do not need to build edge detection or perspective correction yourself:

| | iOS | Android |
| --- | --- | --- |
| Native scanner | VisionKit `VNDocumentCameraViewController` | Google ML Kit Document Scanner (Play services) |
| Edge detection and crop | Yes | Yes |
| Filters / cleanup | VisionKit built-in | `base`, `base_with_filter`, `full` modes (stain and finger removal in `full`) |
| Page limit per session | 24 | 1 to 24, default 20 |
| Camera permission prompt | Yes, needs `NSCameraUsageDescription` | No, the scanner runs in Play services |
| Works on emulator / simulator | No | No |
| Output from the plugin | JPEG pages | JPEG pages |

The plugin returns images, not a PDF. That is a deliberate split: you control the page size, compression, and file name, and the same PDF code works for photos picked from the gallery or files received from your backend.

## Install the plugins

```bash
bun add @capgo/capacitor-document-scanner @capacitor/filesystem pdf-lib
bunx cap sync
```

The scanner plugin follows Capacitor major versions, so plugin v8 targets Capacitor 8. `pdf-lib` is a pure JavaScript library with no native code, which means it runs in the WebView and needs no sync.

### iOS setup

Add a camera usage string to `ios/App/App/Info.plist`. VisionKit opens the camera, and iOS terminates the app if the key is missing:

```xml
<key>NSCameraUsageDescription</key>
<string>We use the camera to scan your documents.</string>
```

The plugin's Swift package targets iOS 15 or later, which matches the Capacitor 8 minimum. Remember that App Store uploads now require Xcode 26, so build with it before you submit. If you do not own a Mac, [Capgo Build](/native-build/) can produce the signed iOS binary in the cloud.

### Android setup

Nothing to add to `AndroidManifest.xml`. The ML Kit scanner is a Google Play services module that downloads on first use and handles the camera itself, so your app does not request `CAMERA`. The device needs Google Play services, which rules out most emulators and de-Googled phones. Plan a fallback (a plain camera capture) if you ship to markets where Play services is missing.

## Scan the pages

Start with a function that opens the scanner and returns the page paths, or `null` when the user cancels:

```typescript
import {
  DocumentScanner,
  ResponseType,
  ScannerMode,
  ScanDocumentResponseStatus,
} from '@capgo/capacitor-document-scanner';

export async function scanPages(): Promise<string[] | null> {
  const result = await DocumentScanner.scanDocument({
    responseType: ResponseType.ImageFilePath,
    maxNumDocuments: 20,
    letUserAdjustCrop: true,
    scannerMode: ScannerMode.Full, // Android only
    croppedImageQuality: 90,       // Android only
  });

  if (result.status === ScanDocumentResponseStatus.Cancel) {
    return null;
  }
  return result.scannedImages ?? [];
}
```

A few options are worth knowing:

- `responseType`: `ImageFilePath` (default) returns file paths, `Base64` returns base64 strings. Prefer file paths for multi-page documents. Base64 strings for 20 high resolution pages can reach tens of megabytes and every byte crosses the Capacitor bridge.
- `maxNumDocuments`: set it to `1` for single-page flows like receipts or ID cards.
- `reviewCapturedDocument`: shows each captured page before continuing, useful when users scan important paperwork.
- `brightness` and `contrast`: post-processing applied to the images. A contrast of `1.2` to `1.5` often helps with faded receipts.
- `scannerMode` (Android): `Full` adds ML-based cleanup, `Base` is faster and keeps the image untouched.

Where the files land differs per platform. On Android, pages go to the app cache directory. On iOS, the plugin writes them to the app's Documents directory. Neither location is a good long-term home, so the flow below builds the PDF, stores it where you want it, and deletes the page images.

## Combine the pages into one PDF

`pdf-lib` can embed JPEGs directly without re-encoding them, so the PDF size stays close to the sum of the page sizes. Read each page through `Capacitor.convertFileSrc`, which turns a native path into a URL the WebView can fetch:

```typescript
import { Capacitor } from '@capacitor/core';
import { PDFDocument } from 'pdf-lib';

const A4 = { width: 595.28, height: 841.89 }; // points

export async function pagesToPdf(paths: string[]): Promise<string> {
  const pdf = await PDFDocument.create();
  pdf.setTitle('Scanned document');
  pdf.setCreator('My Capacitor App');

  for (const path of paths) {
    const bytes = await fetch(Capacitor.convertFileSrc(path)).then((r) => r.arrayBuffer());
    const image = await pdf.embedJpg(bytes);

    // Fit the image inside an A4 page, keeping its aspect ratio
    const scale = Math.min(A4.width / image.width, A4.height / image.height);
    const width = image.width * scale;
    const height = image.height * scale;

    const page = pdf.addPage([A4.width, A4.height]);
    page.drawImage(image, {
      x: (A4.width - width) / 2,
      y: (A4.height - height) / 2,
      width,
      height,
    });
  }

  // Base64 without the data URI prefix, ready for Filesystem.writeFile
  return pdf.saveAsBase64();
}
```

If you prefer pages that match the scanned paper exactly, replace the A4 logic with `pdf.addPage([image.width, image.height])` and draw the image at full size. Receipts look better this way because they are long and narrow.

### Alternative: render the PDF natively

If your app already builds PDFs from HTML (invoices, reports), you can reuse that path with [`@capgo/capacitor-pdf-generator`](/plugins/capacitor-pdf-generator/). It renders an HTML string with the platform's print engine and returns base64:

```typescript
import { PdfGenerator } from '@capgo/capacitor-pdf-generator';
import { Capacitor } from '@capacitor/core';

const html = `
  <html><body style="margin:0">
    ${paths
      .map((p) => `<img src="${Capacitor.convertFileSrc(p)}" style="width:100%;page-break-after:always" />`)
      .join('')}
  </body></html>`;

const result = await PdfGenerator.fromData({
  data: html,
  documentSize: 'A4',
  orientation: 'portrait',
  type: 'base64',
});

if (result.type === 'base64') {
  // result.base64 contains the PDF
}
```

This is handy when you want a cover page, a title, or a footer with a date on each page. For pure image-to-PDF, `pdf-lib` gives you more control over page geometry and image compression.

## Save the PDF

Write the base64 output with `@capacitor/filesystem`. Pick the directory based on how long the file should live:

| Directory | Android | iOS | Use it for |
| --- | --- | --- | --- |
| `Directory.Cache` | App cache, can be cleared by the OS | `Library/Caches`, can be cleared by the OS | PDFs you upload or share right away |
| `Directory.Data` | Private app files, removed on uninstall | App `Documents` folder, backed up to iCloud | PDFs your app manages and shows again later |
| `Directory.LibraryNoCloud` | Private app files | `Library/NoCloud`, not backed up | Large PDFs you can download again |

On iOS, `Directory.Data` and `Directory.Documents` point to the same folder. Add `UIFileSharingEnabled` and `LSSupportsOpeningDocumentsInPlace` to `Info.plist` if users should see those PDFs in the Files app.

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';

export async function savePdf(base64: string, name: string) {
  const fileName = `${name.replace(/[^a-z0-9-_]/gi, '_')}.pdf`;
  const { uri } = await Filesystem.writeFile({
    path: `scans/${fileName}`,
    data: base64,
    directory: Directory.Data,
    recursive: true,
  });
  return uri; // file:// URI you can share, open, or print
}

export async function deletePages(paths: string[]) {
  await Promise.all(
    paths.map((path) => Filesystem.deleteFile({ path }).catch(() => undefined)),
  );
}
```

On native platforms, `writeFile` treats a string without an `encoding` option as base64 and writes the binary bytes. Do not pass `Encoding.UTF8` for PDFs, or the file will be corrupt.

If the user should be able to find the PDF in their Downloads folder on Android, use [`@capgo/capacitor-file-sharer`](/plugins/capacitor-file-sharer/)'s `save()` method, which writes to MediaStore Downloads without any storage permission on Android 10+. On iOS the same call opens the share sheet so the user can choose "Save to Files".

## Put the whole flow together

```typescript
export async function scanToPdf(title: string) {
  const pages = await scanPages();
  if (!pages || pages.length === 0) return null;

  try {
    const base64 = await pagesToPdf(pages);
    return await savePdf(base64, title);
  } finally {
    await deletePages(pages);
  }
}
```

Wire it to a button and show a spinner while `pagesToPdf` runs. On a mid-range Android phone, 10 pages typically take well under a few seconds since the JPEG data is copied, not decoded.

## Share, open, or print the PDF

### Share with the system share sheet

```typescript
import { FileSharer } from '@capgo/capacitor-file-sharer';

await FileSharer.share({
  filename: 'contract.pdf',
  path: pdfUri,
  contentType: 'application/pdf',
  subject: 'Signed contract',
});
```

`@capgo/capacitor-file-sharer` copies the file into its own cache folder and serves it through its own `FileProvider` on Android, so you do not need to edit `file_paths.xml`, even if the PDF lives in `Directory.Data`. If you use the official `@capacitor/share` plugin instead, its `files` option works out of the box only for the cache directory on Android. Other folders must be added to `android/app/src/main/res/xml/file_paths.xml`.

### Open in the user's PDF app

For a quick preview, the community file opener hands the file to Quick Look on iOS or to the default PDF viewer on Android:

```bash
bun add @capacitor-community/file-opener
bunx cap sync
```

```typescript
import { FileOpener } from '@capacitor-community/file-opener';

await FileOpener.open({
  filePath: pdfUri,
  contentType: 'application/pdf',
});
```

### Print

[`@capgo/capacitor-printer`](/plugins/capacitor-printer/) opens `UIPrintInteractionController` on iOS and `PrintManager` on Android:

```typescript
import { Printer } from '@capgo/capacitor-printer';

await Printer.printPdf({
  name: 'Signed contract',
  path: pdfUri,
});
```

The `name` becomes the print job name and the default file name if the user picks "Save as PDF" in the print dialog.

## Upload the PDF

To send the PDF to your backend, read it back as a `Blob` and post it with `fetch`, or use a native uploader for large files so the upload continues when the app goes to the background:

```typescript
import { Uploader } from '@capgo/capacitor-uploader';

const { id } = await Uploader.startUpload({
  filePath: pdfUri,
  serverUrl: 'https://api.example.com/documents',
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  mimeType: 'application/pdf',
});
```

See the [Capacitor uploader plugin](/plugins/capacitor-uploader/) for progress events and multipart uploads.

## Make scanned PDFs searchable

Image-only PDFs cannot be searched or copied from. If users expect to search their scans:

1. Run OCR on each page image before you delete it. On-device options include ML Kit Text Recognition on Android and the Vision framework on iOS, both reachable through community Capacitor plugins, or a server-side OCR service.
2. Store the recognized text in your database next to the PDF path and search there.
3. If the PDF itself must contain text, generate it server-side with an OCR tool that writes an invisible text layer, such as OCRmyPDF.

For most apps, step 2 is enough and avoids shipping a second large model in the app.

## Troubleshooting

**"Document scanner is not supported on Android emulators"**: expected. Use a physical device with Google Play services.

**The app crashes on iOS the moment the scanner opens**: `NSCameraUsageDescription` is missing from `Info.plist`, or the user denied camera access earlier. Check Settings, Privacy, Camera.

**`embedJpg` throws "SOI not found"**: the bytes are not a JPEG. This happens if you passed a base64 data URL where pdf-lib expected raw bytes, or fetched a path that returned an HTML error page. Log `Capacitor.convertFileSrc(path)` and open it in the Safari or Chrome inspector.

**The PDF is huge**: lower `croppedImageQuality` (Android) or re-compress pages with [`@capgo/capacitor-file-compressor`](/plugins/capacitor-file-compressor/) before embedding. A quality of 70 to 80 is usually readable for text documents.

**Pages appear rotated**: rotate inside pdf-lib with `page.setRotation(degrees(90))` or let the user fix rotation in the scanner review screen with `reviewCapturedDocument: true`.

**Sharing fails on Android with `FileUriExposedException` or "Failed to find configured root"**: you passed a path outside the folders declared in `file_paths.xml` to `@capacitor/share`. Use the file sharer plugin or copy the PDF to `Directory.Cache` first.

**Old page images fill up storage on iOS**: the scanner writes JPEGs to the Documents directory. Delete them after building the PDF, as shown in `scanToPdf`.

## Shipping updates to the scan flow

Most of this feature lives in TypeScript: the PDF layout, file naming, upload logic, and UI. Changes to those parts do not need a new store release. With [Capgo live updates](/live-update/) you can ship a fix to the PDF layout or upload endpoint to every user the same day, while native changes (adding the plugin, editing `Info.plist`) still go through a normal build. The [document scanner docs](/docs/plugins/document-scanner/) list every option if you need to tune the scanner further.
