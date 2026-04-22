---
locale: en
---
# Using @capgo/capacitor-video-player

Capacitor plugin to play video in native player.

## Install

```bash
bun add @capgo/capacitor-video-player
bunx cap sync
```

## What This Plugin Exposes

- `initPlayer` - Initialize a video player.
- `isPlaying` - Return if a given playerId is playing.
- `play` - Play the current video from a given playerId.
- `pause` - Pause the current video from a given playerId.

## Example Usage

### `initPlayer`

Initialize a video player.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

await VideoPlayer.initPlayer({} as capVideoPlayerOptions);
```

### `isPlaying`

Return if a given playerId is playing.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

await VideoPlayer.isPlaying({} as capVideoPlayerIdOptions);
```

### `play`

Play the current video from a given playerId.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

await VideoPlayer.play({} as capVideoPlayerIdOptions);
```

### `pause`

Pause the current video from a given playerId.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

await VideoPlayer.pause({} as capVideoPlayerIdOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-video-player/
- Docs: /docs/plugins/video-player/
