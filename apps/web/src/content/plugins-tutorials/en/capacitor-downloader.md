---
locale: en
---
# Using @capgo/capacitor-downloader

Capacitor plugin for downloading files with background support. Provides resumable downloads with progress tracking.

## Install

```bash
bun add @capgo/capacitor-downloader
bunx cap sync
```

## What This Plugin Exposes

- `download` - Start a new download task.
- `pause` - Pause an active download. Download can be resumed later from the same position.
- `resume` - Resume a paused download. Continues from where it was paused.
- `stop` - Stop and cancel a download permanently. Downloaded data will be deleted.

## Example Usage

### `download`

Start a new download task.

```typescript
import { CapacitorDownloader } from '@capgo/capacitor-downloader';

const task = await Downloader.download({
  id: 'my-download',
  url: 'https://example.com/file.pdf',
  destination: 'downloads/file.pdf'
});
```

### `pause`

Pause an active download. Download can be resumed later from the same position.

```typescript
import { CapacitorDownloader } from '@capgo/capacitor-downloader';

await CapacitorDownloader.pause({} as { id: string });
```

### `resume`

Resume a paused download. Continues from where it was paused.

```typescript
import { CapacitorDownloader } from '@capgo/capacitor-downloader';

await CapacitorDownloader.resume({} as { id: string });
```

### `stop`

Stop and cancel a download permanently. Downloaded data will be deleted.

```typescript
import { CapacitorDownloader } from '@capgo/capacitor-downloader';

await CapacitorDownloader.stop({} as { id: string });
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-downloader/
- Docs: /docs/plugins/downloader/
