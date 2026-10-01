---
locale: en
---
# Using @capgo/capacitor-media-session

Capacitor plugin to expose media session controls of the device.

## Install

```bash
bun add @capgo/capacitor-media-session
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';
```

## API at a glance

| Method | Description |
| --- | --- |
| `setMetadata` | Sets metadata of the currently playing media. |
| `setPlaybackState` | Updates the playback state of the media session. |
| `setActionHandler` | Registers a handler for a media session action. |
| `setPositionState` | Updates position state for the active media session. |

## Examples

### `setMetadata()`

Sets metadata of the currently playing media.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setMetadata({ album: 'album' });
```

### `setPlaybackState()`

Updates the playback state of the media session.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setPlaybackState({ playbackState: 'none' });
```

### `setActionHandler()`

Registers a handler for a media session action.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setActionHandler({ action: 'play' }, (details) => {
  console.log(details);
});
```

### `setPositionState()`

Updates position state for the active media session.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setPositionState({ duration: 1000 });
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-media-session/)
- [Documentation](/docs/plugins/media-session/)
- [API reference](/docs/plugins/media-session/getting-started/)

## Keep going from Using @capgo/capacitor-media-session

If you are using **Using @capgo/capacitor-media-session** to plan dashboard and API operations, connect it with [@capgo/capacitor-media-session](/docs/plugins/media-session/) for the implementation detail in @capgo/capacitor-media-session, [Getting Started](/docs/plugins/media-session/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
