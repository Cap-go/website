---
locale: en
---
# Using @capgo/capacitor-document-scanner

Capacitor plugin to scan document iOS and Android.

## Install

```bash
bun add @capgo/capacitor-document-scanner
bunx cap sync
```

## What This Plugin Exposes

- `scanDocument` - Opens the device camera and starts the document scanning experience.

## Example Usage

### `scanDocument`

Opens the device camera and starts the document scanning experience.

```typescript
import { DocumentScanner } from '@capgo/capacitor-document-scanner';

await DocumentScanner.scanDocument();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-document-scanner/
- Docs: /docs/plugins/document-scanner/
