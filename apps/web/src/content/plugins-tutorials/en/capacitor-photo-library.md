---
locale: en
---
# Using @capgo/capacitor-photo-library

Capacitor plugin Displays photo gallery as web page, or boring native screen which you cannot modify but require no authorization.

## Install

```bash
bun add @capgo/capacitor-photo-library
bunx cap sync
```

## What This Plugin Exposes

- `checkAuthorization` - Returns the current authorization status without prompting the user.
- `requestAuthorization` - Requests access to the photo library if needed.
- `getAlbums` - Retrieves the available albums.
- `getLibrary` - Retrieves library assets along with URLs that can be displayed in the web view.

## Example Usage

### `checkAuthorization`

Returns the current authorization status without prompting the user.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

await PhotoLibrary.checkAuthorization();
```

### `requestAuthorization`

Requests access to the photo library if needed.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

await PhotoLibrary.requestAuthorization();
```

### `getAlbums`

Retrieves the available albums.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

await PhotoLibrary.getAlbums();
```

### `getLibrary`

Retrieves library assets along with URLs that can be displayed in the web view.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

await PhotoLibrary.getLibrary();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-photo-library/
- Docs: /docs/plugins/photo-library/

## Keep going from Using @capgo/capacitor-photo-library

If you are using **Using @capgo/capacitor-photo-library** to plan native media and interface behavior, connect it with [@capgo/capacitor-photo-library](/docs/plugins/photo-library/) for the implementation detail in @capgo/capacitor-photo-library, [Getting Started](/docs/plugins/photo-library/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
