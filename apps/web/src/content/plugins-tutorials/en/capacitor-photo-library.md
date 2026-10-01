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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';
```

## API at a glance

| Method | Description |
| --- | --- |
| `checkAuthorization` | Returns the current authorization status without prompting the user. |
| `requestAuthorization` | Requests access to the photo library if needed. |
| `getAlbums` | Retrieves the available albums. |
| `getLibrary` | Retrieves library assets along with URLs that can be displayed in the web view. |
| `getPhotoUrl` | Retrieves a displayable URL for the full resolution version of the asset. If you already called `getLibrary` with `includeFullResolutionData`, you normally do not need this method. |
| `getThumbnailUrl` | Retrieves a displayable URL for a resized thumbnail of the asset. |
| `pickMedia` | Opens the native system picker so the user can select media without granting full photo library access. The selected files are copied into the application cache and returned with portable URLs. |

## Examples

### `checkAuthorization()`

Returns the current authorization status without prompting the user.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

const result = await PhotoLibrary.checkAuthorization();
console.log(result);
```

### `requestAuthorization()`

Requests access to the photo library if needed.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

const result = await PhotoLibrary.requestAuthorization();
console.log(result);
```

### `getAlbums()`

Retrieves the available albums.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

const result = await PhotoLibrary.getAlbums();
console.log(result);
```

### `getLibrary()`

Retrieves library assets along with URLs that can be displayed in the web view.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

const result = await PhotoLibrary.getLibrary();
console.log(result);
```

### `getPhotoUrl()`

Retrieves a displayable URL for the full resolution version of the asset. If you already called `getLibrary` with `includeFullResolutionData`, you normally do not need this method.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

const result = await PhotoLibrary.getPhotoUrl({ id: 'id-123' });
console.log(result);
```

### `getThumbnailUrl()`

Retrieves a displayable URL for a resized thumbnail of the asset.

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

const result = await PhotoLibrary.getThumbnailUrl({ id: 'id-123' });
console.log(result);
```

The table above lists the 7 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-photo-library/).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-photo-library/)
- [Documentation](/docs/plugins/photo-library/)
- [API reference](/docs/plugins/photo-library/getting-started/)

## Keep going from Using @capgo/capacitor-photo-library

If you are using **Using @capgo/capacitor-photo-library** to plan native media and interface behavior, connect it with [@capgo/capacitor-photo-library](/docs/plugins/photo-library/) for the implementation detail in @capgo/capacitor-photo-library, [Getting Started](/docs/plugins/photo-library/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
