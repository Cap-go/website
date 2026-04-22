---
locale: en
---
# Using @capgo/capacitor-pdf-generator

Generate PDF files from HTML strings or URLs on iOS and Android.

## Install

```bash
bun add @capgo/capacitor-pdf-generator
bunx cap sync
```

## What This Plugin Exposes

- `fromURL` - Generates a PDF from the provided URL.
- `fromData` - Generates a PDF from a raw HTML string.

## Example Usage

### `fromURL`

Generates a PDF from the provided URL.

```typescript
import { PdfGenerator } from '@capgo/capacitor-pdf-generator';

await PdfGenerator.fromURL({} as PdfGeneratorFromUrlOptions);
```

### `fromData`

Generates a PDF from a raw HTML string.

```typescript
import { PdfGenerator } from '@capgo/capacitor-pdf-generator';

await PdfGenerator.fromData({} as PdfGeneratorFromDataOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-pdf-generator/
- Docs: /docs/plugins/pdf-generator/
