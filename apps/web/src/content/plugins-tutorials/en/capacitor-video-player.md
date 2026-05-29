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

## Keep going from Using @capgo/capacitor-video-player

If you are using **Using @capgo/capacitor-video-player** to plan native media and interface behavior, connect it with [@capgo/capacitor-video-player](/docs/plugins/video-player/) for the implementation detail in @capgo/capacitor-video-player, [Getting Started](/docs/plugins/video-player/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for the native capability in Using @capgo/capacitor-native-navigation.
