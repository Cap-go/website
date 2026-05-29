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

## What This Plugin Exposes

- `setMetadata` - Sets metadata of the currently playing media.
- `setPlaybackState` - Updates the playback state of the media session.
- `setActionHandler` - Registers a handler for a media session action.
- `setPositionState` - Updates position state for the active media session.

## Example Usage

### `setMetadata`

Sets metadata of the currently playing media.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setMetadata({} as MetadataOptions);
```

### `setPlaybackState`

Updates the playback state of the media session.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setPlaybackState({} as PlaybackStateOptions);
```

### `setActionHandler`

Registers a handler for a media session action.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setActionHandler({} as ActionHandlerOptions, {} as ActionHandler | null);
```

### `setPositionState`

Updates position state for the active media session.

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

await MediaSession.setPositionState({} as PositionStateOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-media-session/
- Docs: /docs/plugins/media-session/

## Keep going from Using @capgo/capacitor-media-session

If you are using **Using @capgo/capacitor-media-session** to plan dashboard and API operations, connect it with [@capgo/capacitor-media-session](/docs/plugins/media-session/) for the implementation detail in @capgo/capacitor-media-session, [Getting Started](/docs/plugins/media-session/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
