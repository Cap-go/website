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

## Keep going from Using @capgo/capacitor-document-scanner

If you are using **Using @capgo/capacitor-document-scanner** to plan native plugin work, connect it with [@capgo/capacitor-document-scanner](/docs/plugins/document-scanner/) for the implementation detail in @capgo/capacitor-document-scanner, [Getting Started](/docs/plugins/document-scanner/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
