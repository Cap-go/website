---
locale: en
---
# Using @capgo/capacitor-pdf-viewer

Native PDF viewing on iOS (PDFKit), Android (Pdfium), and web with paths, URLs, base64, and inline mode.

## Install

```bash
bun add @capgo/capacitor-pdf-viewer
bunx cap sync
```

## What This Plugin Exposes

- `open` - Open a PDF from a file, path, URL, or base64 source.
- `close` - Close the active viewer and remove any overlay.
- `goToPage` - Jump to a 1-based page number.
- `setZoom` - Set the zoom scale multiplier.
- `getPluginVersion` - Get the native or web implementation version marker.
- `addListener` - Listen for load, pageChange, error, close, and linkTap events.

## Example Usage

### `open`

```typescript
import { PdfViewer } from '@capgo/capacitor-pdf-viewer';

// See getting started: /docs/plugins/pdf-viewer/getting-started/
```

### `goToPage`

```typescript
import { PdfViewer } from '@capgo/capacitor-pdf-viewer';

// See getting started: /docs/plugins/pdf-viewer/getting-started/
```

### `close`

```typescript
import { PdfViewer } from '@capgo/capacitor-pdf-viewer';

// See getting started: /docs/plugins/pdf-viewer/getting-started/
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-pdf-viewer/
- Docs: /docs/plugins/pdf-viewer/
