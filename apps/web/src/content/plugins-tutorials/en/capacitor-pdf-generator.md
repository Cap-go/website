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

## Keep going from Using @capgo/capacitor-pdf-generator

If you are using **Using @capgo/capacitor-pdf-generator** to plan storage and file handling, connect it with [@capgo/capacitor-pdf-generator](/docs/plugins/pdf-generator/) for the implementation detail in @capgo/capacitor-pdf-generator, [Getting Started](/docs/plugins/pdf-generator/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, and [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file.
