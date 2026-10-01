---
locale: en
---
# Using @capgo/capacitor-zip

Capacitor Zip Plugin for compressing and extracting zip archives.

## Install

```bash
bun add @capgo/capacitor-zip
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorZip } from '@capgo/capacitor-zip';
```

## API at a glance

| Method | Description |
| --- | --- |
| `zip` | Compress a file or directory to create a ZIP archive. |
| `unzip` | Extract a ZIP archive to a specified destination directory. |

## Examples

### `zip()`

Compress a file or directory to create a ZIP archive.

```typescript
import { CapacitorZip } from '@capgo/capacitor-zip';

// Compress a directory without password
await CapacitorZip.zip({
  source: '/path/to/my-folder',
  destination: '/path/to/output.zip'
});
```

### `unzip()`

Extract a ZIP archive to a specified destination directory.

```typescript
import { CapacitorZip } from '@capgo/capacitor-zip';

// Extract a standard ZIP archive
await CapacitorZip.unzip({
  source: '/path/to/archive.zip',
  destination: '/path/to/extract-folder'
});
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-zip/)
- [Documentation](/docs/plugins/zip/)
- [API reference](/docs/plugins/zip/getting-started/)

## Keep going from Using @capgo/capacitor-zip

If you are using **Using @capgo/capacitor-zip** to plan native plugin work, connect it with [@capgo/capacitor-zip](/docs/plugins/zip/) for the implementation detail in @capgo/capacitor-zip, [Getting Started](/docs/plugins/zip/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
