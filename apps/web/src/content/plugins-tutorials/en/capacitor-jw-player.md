---
locale: en
---
# Using @capgo/capacitor-jw-player

Playes videos from jwplayer.com.

## Install

```bash
bun add @capgo/capacitor-jw-player
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Initialize the JW Player.
- `play` - Play a video.
- `pause` - Pause the currently playing media.
- `resume` - Resume the currently paused media.

## Example Usage

### `initialize`

Initialize the JW Player.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.initialize({} as { licenseKey: string; playerUrl?: string });
```

### `play`

Play a video.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.play({} as { mediaUrl: string; mediaType: 'video' | 'playlist'; autostart?: boolean });
```

### `pause`

Pause the currently playing media.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.pause();
```

### `resume`

Resume the currently paused media.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.resume();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-jw-player/
- Docs: /docs/plugins/jw-player/
