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
