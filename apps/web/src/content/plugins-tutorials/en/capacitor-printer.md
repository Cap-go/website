---
locale: en
---
# Using @capgo/capacitor-printer

Capacitor plugin for printing documents, HTML, PDFs, images and web views.

## Install

```bash
bun add @capgo/capacitor-printer
bunx cap sync
```

## What This Plugin Exposes

- `printBase64` - Presents the printing UI to print files encoded as base64 strings.
- `printFile` - Presents the printing UI to print device files.
- `printHtml` - Presents the printing UI to print HTML documents.
- `printPdf` - Presents the printing UI to print PDF documents.

## Example Usage

### `printBase64`

Presents the printing UI to print files encoded as base64 strings.

```typescript
import { Printer } from '@capgo/capacitor-printer';

// Print a base64 encoded PDF
await Printer.printBase64({
  name: 'Invoice #12345',
  data: 'base64-encoded-pdf-data',
  mimeType: 'application/pdf',
});

// Print a base64 encoded image
await Printer.printBase64({
  name: 'Product Photo',
  data: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDA...',
  mimeType: 'image/jpeg',
});
```

### `printFile`

Presents the printing UI to print device files.

```typescript
import { Printer } from '@capgo/capacitor-printer';

// iOS: Print from app documents directory
await Printer.printFile({
  name: 'Contract',
  path: 'file:///var/mobile/Containers/Data/Application/.../Documents/contract.pdf',
});

// Android: Print from content URI
await Printer.printFile({
  name: 'Receipt',
  path: 'content://com.android.providers.downloads.documents/document/123',
  mimeType: 'application/pdf',
});

// Android: Print from file path
await Printer.printFile({
  name: 'Photo',
  path: 'file:///storage/emulated/0/Download/photo.jpg',
  mimeType: 'image/jpeg',
});
```

### `printHtml`

Presents the printing UI to print HTML documents.

```typescript
import { Printer } from '@capgo/capacitor-printer';

// Simple HTML document
await Printer.printHtml({
name: 'Sales Report',
html: '<html><body><h1>Q4 Sales Report</h1><p>Revenue: $125,000</p></body></html>',
});

// HTML with print-specific CSS
await Printer.printHtml({
name: 'Styled Invoice',
html: `
<html>
<head>
<style>
```

### `printPdf`

Presents the printing UI to print PDF documents.

```typescript
import { Printer } from '@capgo/capacitor-printer';

// Print PDF from app storage
await Printer.printPdf({
  name: 'Annual Report 2024',
  path: 'file:///var/mobile/Containers/Data/Application/.../Documents/report.pdf',
});

// Print PDF from Android downloads
await Printer.printPdf({
  name: 'Downloaded Document',
  path: 'content://com.android.providers.downloads.documents/document/123',
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-printer/
- Docs: /docs/plugins/printer/

## Keep going from Using @capgo/capacitor-printer

If you are using **Using @capgo/capacitor-printer** to plan native plugin work, connect it with [@capgo/capacitor-printer](/docs/plugins/printer/) for the implementation detail in @capgo/capacitor-printer, [Getting Started](/docs/plugins/printer/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
